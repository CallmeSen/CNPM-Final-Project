import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ _id: false })
export class ReviewCustomer {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  customerId: string;
}

@Schema({ timestamps: true, collection: 'reviews' })
export class Review extends Document {
  @Prop({
    type: Types.ObjectId,
    ref: 'Restaurant',
    required: true,
    index: true,
  })
  restaurant: Types.ObjectId;

  @Prop({ required: true })
  order: string;

  @Prop({ type: ReviewCustomer, required: true })
  customer: ReviewCustomer;

  @Prop({ type: Types.ObjectId, ref: 'FoodItem', required: true })
  foodItem: Types.ObjectId;

  @Prop({ required: true, min: 1, max: 5, index: true })
  rating: number;

  @Prop({ required: true })
  comment: string;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
ReviewSchema.index({ restaurant: 1, createdAt: -1 });
ReviewSchema.index({ rating: 1 });
