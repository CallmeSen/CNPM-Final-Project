import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { PaymentService } from './payment.service';
import { Payment } from '../schema/payment.schema';

@Controller('api/payment')
export class PaymentController {
  private readonly logger = new Logger(PaymentController.name);
  private readonly stripe: Stripe;

  constructor(
    private readonly paymentService: PaymentService,
    private readonly configService: ConfigService,
  ) {
    this.stripe = new Stripe(
      this.configService.get<string>('STRIPE_SECRET_KEY')!,
      { apiVersion: '2023-10-16' },
    );
  }

  @Post('process')
  async processPayment(@Body() body: any) {
    try {
      const {
        orderId,
        userId,
        amount,
        currency,
        email,
        phone: rawPhone,
      } = body;
      const sanitizedPhone =
        typeof rawPhone === 'string' ? rawPhone.trim() : '';

      this.logger.log(`🔵 Processing payment request for order ${orderId}`);
      this.logger.log(`📦 Full payment request body:`, JSON.stringify(body, null, 2));
      
      if (!sanitizedPhone) {
        this.logger.warn(
          `No phone number provided for order ${orderId}. SMS notifications will be skipped.`,
        );
      }

      let payment = await this.paymentService.findByOrderId(orderId);

      if (payment && payment.stripeClientSecret) {
        this.logger.log('Existing Payment Found:', payment);

        if (payment.status === 'Paid') {
          return {
            message: '✅ This order has already been paid successfully.',
            paymentStatus: 'Paid',
            disablePayment: true,
          };
        }

        try {
          const existingIntent = await this.stripe.paymentIntents.retrieve(
            payment.stripePaymentIntentId,
          );

          if (
            existingIntent &&
            existingIntent.status === 'requires_payment_method'
          ) {
            this.logger.log('✅ Reusing existing valid payment intent');
            return {
              clientSecret: payment.stripeClientSecret,
              paymentId: payment._id,
              disablePayment: false,
            };
          }
        } catch {
          this.logger.log(
            '⚠️ Old payment intent invalid or expired, creating new one',
          );
        }

        try {
          await this.stripe.paymentIntents.cancel(
            payment.stripePaymentIntentId,
          );
          this.logger.log('🗑️ Cancelled old payment intent');
        } catch {
          this.logger.log(
            'Could not cancel old payment intent (may already be expired)',
          );
        }

        await this.paymentService.deleteByOrderId(orderId);
        this.logger.log('🗑️ Deleted old payment record');
      }

      const amountInCents = Math.round(parseFloat(amount) * 100);
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount: amountInCents,
        currency: currency || 'usd',
        metadata: { orderId, userId },
        receipt_email: email,
      });

      this.logger.log('✅ Created PaymentIntent:', paymentIntent);

      payment = await this.paymentService.createPayment({
        orderId,
        userId,
        amount,
        currency: currency || 'usd',
        status: 'Pending',
        stripePaymentIntentId: paymentIntent.id,
        stripeClientSecret: paymentIntent.client_secret,
        ...(sanitizedPhone
          ? { phone: sanitizedPhone }
          : {}),
        email,
      } as Payment);

      this.logger.log('Stored Payment Record:', payment);

      return {
        clientSecret: paymentIntent.client_secret,
        paymentId: payment._id,
        disablePayment: false,
      };
    } catch (error) {
      if (error.code === 11000) {
        const existingPayment = await this.paymentService.findByOrderId(
          body.orderId,
        );

        if (existingPayment) {
          this.logger.warn(
            '⚠️ Duplicate detected; checking payment status:',
            existingPayment,
          );

          if (existingPayment.status === 'Paid') {
            return {
              message: '✅ This order has already been paid successfully.',
              paymentStatus: 'Paid',
              disablePayment: true,
            };
          }

          try {
            const existingIntent = await this.stripe.paymentIntents.retrieve(
              existingPayment.stripePaymentIntentId,
            );

            if (
              existingIntent &&
              existingIntent.status === 'requires_payment_method'
            ) {
              this.logger.log('✅ Returning valid existing payment intent');
              return {
                clientSecret: existingPayment.stripeClientSecret,
                paymentId: existingPayment._id,
                disablePayment: false,
              };
            }
          } catch {
            this.logger.log(
              '⚠️ Existing payment intent invalid, client should retry',
            );
            throw new HttpException(
              {
                error:
                  'Payment intent expired. Please refresh the page and try again.',
                shouldRetry: true,
              },
              HttpStatus.CONFLICT,
            );
          }
        }

        throw new HttpException(
          'Duplicate key error but no payment record found.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      this.logger.error('❌ Stripe Payment processing error:', error.message);
      throw new HttpException(
        '❌ Payment processing failed. Please try again.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('order/:orderId')
  async getByOrderId(@Param('orderId') orderId: string) {
    return this.paymentService.findByOrderId(orderId);
  }
}
