import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import * as bcrypt from 'bcryptjs';

@Schema({ timestamps: true })
export class RestaurantAdmin {
  @Prop({ required: true, trim: true })
  firstName!: string;

  @Prop({ required: true, trim: true })
  lastName!: string;

  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email!: string;

  @Prop({ required: true, trim: true })
  phone!: string;

  @Prop({ required: true, minlength: 6, select: false })
  password!: string;

  @Prop({ type: Types.ObjectId, ref: 'Restaurant', required: false })
  restaurantId?: Types.ObjectId;

  @Prop({ required: true, trim: true })
  businessLicense!: string;

  @Prop({ default: false })
  isApproved!: boolean;

  @Prop({ type: Types.ObjectId, ref: 'Admin', required: false })
  approvedBy?: Types.ObjectId;

  @Prop({ required: false })
  approvedAt?: Date;
}

export type RestaurantAdminDocument = HydratedDocument<RestaurantAdmin> & {
  comparePassword(password: string): Promise<boolean>;
};

export const RestaurantAdminSchema =
  SchemaFactory.createForClass(RestaurantAdmin);

RestaurantAdminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 12);
  return next();
});

RestaurantAdminSchema.methods.comparePassword = async function (
  candidate: string,
) {
  return bcrypt.compare(candidate, this.password);
};
