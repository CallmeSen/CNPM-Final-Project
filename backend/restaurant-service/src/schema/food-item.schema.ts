import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true, collection: 'fooditems' })
export class FoodItem extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Restaurant', required: true })
  restaurant: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, min: 0 })
  price: number;

  @Prop()
  image?: string;

  @Prop()
  category?: string;

  @Prop({ default: true })
  availability: boolean;
}

export type FoodItemDocument = FoodItem & Document;

export const FoodItemSchema = SchemaFactory.createForClass(FoodItem);
