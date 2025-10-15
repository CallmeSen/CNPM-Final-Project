import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { OrderStatus } from '../common/enums/order-status.enum';

@Schema({ _id: false })
export class OrderItem {
  @Prop({ required: true })
  foodId: string;

  @Prop({ required: true, min: 1 })
  quantity: number;

  @Prop({ required: true, min: 0 })
  price: number;
}

export const OrderItemSchema = SchemaFactory.createForClass(OrderItem);

@Schema({ timestamps: true })
export class Order {
  @Prop({ required: true })
  customerId: string;

  @Prop({ required: true })
  restaurantId: string;

  @Prop({ type: [OrderItemSchema], required: true })
  items: OrderItem[];

  @Prop({ required: true, min: 0 })
  totalPrice: number;

  @Prop({
    type: String,
    enum: ['Pending', 'Paid', 'Failed'],
    default: 'Pending',
  })
  paymentStatus: 'Pending' | 'Paid' | 'Failed';

  @Prop({
    type: String,
    enum: Object.values(OrderStatus),
    default: OrderStatus.Pending,
  })
  status: OrderStatus;

  @Prop({ required: true })
  deliveryAddress: string;
}

export type OrderDocument = HydratedDocument<Order>;

export const OrderSchema = SchemaFactory.createForClass(Order);
