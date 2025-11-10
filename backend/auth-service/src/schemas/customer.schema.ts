import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as bcrypt from 'bcryptjs';

@Schema({ timestamps: true })
export class Customer {
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

  @Prop({ required: false, trim: true })
  location?: string;
}

export type CustomerDocument = HydratedDocument<Customer> & {
  comparePassword(password: string): Promise<boolean>;
};

export const CustomerSchema = SchemaFactory.createForClass(Customer);

CustomerSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 12);
  return next();
});

CustomerSchema.methods.comparePassword = async function (candidate: string) {
  return bcrypt.compare(candidate, this.password);
};
