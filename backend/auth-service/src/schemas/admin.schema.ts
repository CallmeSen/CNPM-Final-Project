import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as bcrypt from 'bcryptjs';

export type AdminRole = 'admin' | 'super-admin';

@Schema({ timestamps: true })
export class Admin {
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

  @Prop({ default: 'admin', enum: ['admin', 'super-admin'] })
  role!: AdminRole;

  @Prop({
    type: [String],
    default: ['manage-users', 'manage-restaurants', 'manage-orders'],
  })
  permissions!: string[];
}

export type AdminDocument = HydratedDocument<Admin> & {
  comparePassword(password: string): Promise<boolean>;
};

export const AdminSchema = SchemaFactory.createForClass(Admin);

AdminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 12);
  return next();
});

AdminSchema.methods.comparePassword = async function (candidate: string) {
  return bcrypt.compare(candidate, this.password);
};
