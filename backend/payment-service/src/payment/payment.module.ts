import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { Payment, PaymentSchema } from '../schema/payment.schema';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { WebhookController } from './webhook.controller';
import { StripeService } from './stripe.service';
import { EmailService } from './email.service';
import { TwilioService } from './twilio.service';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([{ name: Payment.name, schema: PaymentSchema }]),
  ],
  controllers: [PaymentController, WebhookController],
  providers: [PaymentService, StripeService, EmailService, TwilioService],
  exports: [PaymentService],
})
export class PaymentModule {}
