import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { Request, Response } from 'express';
import { PaymentService } from './payment.service';
import { EmailService } from './email.service';
import { TwilioService } from './twilio.service';

@Injectable()
export class StripeService {
  private readonly stripe: Stripe;
  private readonly logger = new Logger(StripeService.name);

  constructor(
    private readonly paymentService: PaymentService,
    private readonly emailService: EmailService,
    private readonly twilioService: TwilioService,
    private readonly configService: ConfigService,
  ) {
    this.stripe = new Stripe(
      this.configService.get<string>('STRIPE_SECRET_KEY')!,
      { apiVersion: '2023-10-16' },
    );
  }

  async handleWebhook(req: Request, res: Response) {
    this.logger.log('Webhook received');
    const sig = req.headers['stripe-signature'];
    let event;

    try {
      event = this.stripe.webhooks.constructEvent(
        req.body,
        sig as string,
        this.configService.get<string>('STRIPE_WEBHOOK_SECRET')!,
      );
      this.logger.log(`✅ Webhook event verified: ${event.type}`);
    } catch (err) {
      this.logger.error(
        '❌ Webhook signature verification failed:',
        err.message,
      );
      return res.status(400).send(`Webhook Error: ${(err as Error).message}`);
    }

    let paymentIntentId = null;
    if (
      event.type === 'payment_intent.succeeded' ||
      event.type === 'payment_intent.payment_failed'
    ) {
      paymentIntentId = event.data.object.id;
    } else {
      this.logger.log(`Unhandled event type: ${event.type}`);
      return res.json({ received: true });
    }

    const orderId = event.data.object.metadata?.orderId;
    if (!orderId) {
      this.logger.warn(
        `⚠️ Missing orderId in metadata for PaymentIntent ${paymentIntentId}`,
      );
    }
    this.logger.log(`🛠 Extracted orderId: ${orderId || 'UNKNOWN_ORDER'}`);

    try {
      let payment = null;

      if (orderId) {
        payment = await this.paymentService.findByOrderId(orderId);
      }
      if (!payment) {
        payment =
          await this.paymentService.findByPaymentIntentId(paymentIntentId);
      }
      if (!payment) {
        this.logger.warn(
          `⚠️ No payment record found for orderId: ${orderId} or PaymentIntent: ${paymentIntentId}`,
        );
        return res.status(404).json({ error: 'Payment record not found' });
      }

      this.logger.log(
        `Found payment record for order ${payment.orderId}, current status: ${payment.status}`,
      );

      const customerPhone = payment.phone;
      const customerEmail = payment.email;

      if (!customerPhone) {
        this.logger.warn(
          `⚠️ No phone number associated with Order ${payment.orderId}`,
        );
      }

      if (
        event.type === 'payment_intent.succeeded' &&
        payment.status !== 'Paid'
      ) {
        payment.status = 'Paid';
        await this.paymentService.updatePaymentByOrderId(payment.orderId, {
          status: 'Paid',
        } as any);
        this.logger.log(
          `✅ Payment for Order ${payment.orderId} updated to Paid.`,
        );

        if (customerPhone) {
          const smsMessage = `Your payment for Order ${payment.orderId} was successful!`;
          try {
            await this.twilioService.sendPaymentSMS(customerPhone, smsMessage);
          } catch (smsError) {
            this.logger.error(`❌ Twilio SMS error: ${smsError.message}`);
          }
        }

        if (customerEmail) {
          const emailSubject = 'Payment Confirmation for Your Order';
          const emailHtml = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 24px; background-color: #f9f9f9; border-radius: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.05);">
              <h2 style="color: #333;">Payment Confirmation</h2>
              <p style="color: #555; font-size: 16px;">Dear Customer,</p>
              <p style="color: #555; font-size: 16px;">
                We're happy to let you know that your payment for <strong style="color: #333;">Order #${payment.orderId}</strong> was successfully processed.
              </p>
              <div style="margin: 24px 0; padding: 16px; background-color: #ffffff; border: 1px solid #ddd; border-radius: 6px;">
                <p style="margin: 0; font-size: 16px;"><strong>Amount:</strong> $${payment.amount.toFixed(2)} ${payment.currency?.toUpperCase()}</p>
                <p style="margin: 0; font-size: 16px;"><strong>Status:</strong> ${payment.status}</p>
                <p style="margin: 0; font-size: 16px;"><strong>Date:</strong> ${new Date(payment.createdAt).toLocaleString()}</p>
              </div>
              <p style="color: #555; font-size: 16px;">Thank you for choosing our service. If you have any questions, feel free to reply to this email.</p>
              <p style="margin-top: 32px; color: #888; font-size: 14px;">— SkyDish Food Delivery Team</p>
            </div>
          `;
          try {
            await this.emailService.sendPaymentReceipt(
              customerEmail,
              emailSubject,
              emailHtml,
            );
          } catch (emailError) {
            this.logger.error(`❌ Email sending error: ${emailError.message}`);
          }
        }
      } else if (
        event.type === 'payment_intent.payment_failed' &&
        payment.status !== 'Failed'
      ) {
        payment.status = 'Failed';
        await this.paymentService.updatePaymentByOrderId(payment.orderId, {
          status: 'Failed',
        } as any);
        this.logger.log(
          `❌ Payment for Order ${payment.orderId} updated to Failed.`,
        );

        if (customerPhone) {
          const smsMessage = `Your payment for Order ${payment.orderId} failed. Please try again. ❌`;
          try {
            await this.twilioService.sendPaymentSMS(customerPhone, smsMessage);
          } catch (smsError) {
            this.logger.error(`❌ Twilio SMS error: ${smsError.message}`);
          }
        }

        if (customerEmail) {
          const emailSubject = 'Payment Failure for Your Order';
          const emailHtml = `<p>Dear Customer,</p>
                     <p>Unfortunately, your payment for Order <strong>${payment.orderId}</strong> failed. Please try again.</p>`;
          try {
            await this.emailService.sendPaymentReceipt(
              customerEmail,
              emailSubject,
              emailHtml,
            );
          } catch (emailError) {
            this.logger.error(`❌ Email sending error: ${emailError.message}`);
          }
        }
      } else {
        this.logger.log(
          `Payment for Order ${payment.orderId} already updated to ${payment.status}.`,
        );
      }
    } catch (err) {
      this.logger.error('❌ Error updating payment status in DB:', err.message);
      return res.status(500).json({ error: 'Database update failed' });
    }

    res.json({ received: true });
  }
}
