import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// Schema for SuperAdmin from Auth database (read-only)
@Schema({ timestamps: true, collection: 'superadmins' })
export class AuthSuperAdmin {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: 'superAdmin' })
  role: string;
}

export type AuthSuperAdminDocument = AuthSuperAdmin & Document;

export const AuthSuperAdminSchema = SchemaFactory.createForClass(AuthSuperAdmin);
