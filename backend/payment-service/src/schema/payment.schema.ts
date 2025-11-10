import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Payment extends Document {
  @Prop({ required: true, unique: true })
  orderId: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ default: 'usd' })
  currency: string;

  @Prop({ enum: ['Pending', 'Paid', 'Failed'], default: 'Pending' })
  status: string;

  @Prop({ required: true })
  email: string;

  @Prop({ default: null })
  phone?: string | null;

  @Prop({ unique: true, sparse: true })
  stripePaymentIntentId: string;

  @Prop()
  stripeClientSecret: string;

  createdAt?: Date;
  updatedAt?: Date;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
