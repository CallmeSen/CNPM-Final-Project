import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Schema({ _id: false })
class RestaurantAdmin {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;
}

const RestaurantAdminSchema = SchemaFactory.createForClass(RestaurantAdmin);

@Schema({ timestamps: true, collection: 'restaurants' })
export class Restaurant {
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

export interface RestaurantDocument extends Restaurant, Document {
  compareAdminPassword(password: string): Promise<boolean>;
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);

RestaurantSchema.index({ 'admin.email': 1 }, { unique: true });

RestaurantSchema.pre<RestaurantDocument>(
  'save',
  async function encryptPassword(next) {
    if (this.isModified('admin.password')) {
      const salt = await bcrypt.genSalt(10);
      this.admin.password = await bcrypt.hash(this.admin.password, salt);
    }
    next();
  },
);

RestaurantSchema.methods.compareAdminPassword =
  async function compareAdminPassword(password: string) {
    return bcrypt.compare(password, this.admin.password);
  };
