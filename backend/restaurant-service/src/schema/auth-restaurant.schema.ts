import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// Schema for Restaurant from Auth database (read-only)
@Schema({ _id: false })
class RestaurantAdmin {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;
}

const RestaurantAdminSchema = SchemaFactory.createForClass(RestaurantAdmin);

@Schema({ timestamps: true, collection: 'restaurants' })
export class AuthRestaurant {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  ownerName: string;

  @Prop({ required: true })
  location: string;

  @Prop({ required: true })
  contactNumber: string;

  @Prop({ default: '' })
  profilePicture: string;

  @Prop({ type: RestaurantAdminSchema, required: true })
  admin: RestaurantAdmin;

  @Prop({ default: true })
  availability: boolean;
}

export type AuthRestaurantDocument = AuthRestaurant & Document;

export const AuthRestaurantSchema = SchemaFactory.createForClass(AuthRestaurant);
