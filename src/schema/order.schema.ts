import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ _id: false })
export class OrderItem {
  @Prop({ required: true })
  foodId: string;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  price: number;
}

@Schema({ timestamps: true, collection: 'orders' })
export class Order extends Document {
  @Prop({ required: true })
  customerId: string;

  @Prop({ required: true })
  restaurantId: string;

  @Prop({ type: [OrderItem], default: [] })
  items: OrderItem[];

  @Prop({ required: true })
  totalPrice: number;

  @Prop({
    type: String,
    enum: ['Pending', 'Paid', 'Failed'],
    default: 'Pending',
  })
  paymentStatus: string;

  @Prop({
    type: String,
    enum: [
      'Pending',
      'Confirmed',
      'Preparing',
      'Out for Delivery',
      'Delivered',
      'Canceled',
    ],
    default: 'Pending',
  })
  status: string;

  @Prop({ required: true })
  deliveryAddress: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
