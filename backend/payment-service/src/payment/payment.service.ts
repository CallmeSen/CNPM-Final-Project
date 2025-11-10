import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Payment } from '../schema/payment.schema';

@Injectable()
export class PaymentService {
  private readonly logger = new Logger(PaymentService.name);

  constructor(
    @InjectModel(Payment.name) private paymentModel: Model<Payment>,
  ) {}

  async createPayment(data: Partial<Payment>): Promise<Payment> {
    const payment = new this.paymentModel(data);
    return payment.save();
  }

  async updatePayment(id: string, update: Partial<Payment>): Promise<Payment> {
    return this.paymentModel.findByIdAndUpdate(id, update, { new: true });
  }

  async findByOrderId(orderId: string): Promise<Payment | null> {
    return this.paymentModel.findOne({ orderId });
  }

  async findByPaymentIntentId(intentId: string): Promise<Payment | null> {
    return this.paymentModel
      .findOne({ stripePaymentIntentId: intentId })
      .exec();
  }

  async deleteByOrderId(orderId: string): Promise<void> {
    await this.paymentModel.deleteOne({ orderId }).exec();
  }

  async updatePaymentByOrderId(
    orderId: string,
    update: Partial<Payment>,
  ): Promise<Payment> {
    return this.paymentModel
      .findOneAndUpdate({ orderId }, update, { new: true })
      .exec();
  }
}
