import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as bcrypt from 'bcryptjs';

export type VehicleType = 'bike' | 'scooter' | 'car' | 'bicycle';

@Schema({ timestamps: true })
export class DeliveryPersonnel {
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

  @Prop({ required: true, enum: ['bike', 'scooter', 'car', 'bicycle'] })
  vehicleType!: VehicleType;

  @Prop({ required: true, trim: true })
  licenseNumber!: string;

  @Prop(
    raw({
      type: { type: String, enum: ['Point'], default: 'Point' },
      coordinates: { type: [Number], default: [0, 0] },
    }),
  )
  currentLocation!: {
    type: 'Point';
    coordinates: [number, number];
  };

  @Prop({ default: true })
  isAvailable!: boolean;

  @Prop({ default: 5, min: 1, max: 5 })
  rating!: number;

  @Prop({ default: 0 })
  totalDeliveries!: number;
}

export type DeliveryPersonnelDocument = HydratedDocument<DeliveryPersonnel> & {
  comparePassword(password: string): Promise<boolean>;
};

export const DeliveryPersonnelSchema =
  SchemaFactory.createForClass(DeliveryPersonnel);

DeliveryPersonnelSchema.index({ currentLocation: '2dsphere' });

DeliveryPersonnelSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 12);
  return next();
});

DeliveryPersonnelSchema.methods.comparePassword = async function (
  candidate: string,
) {
  return bcrypt.compare(candidate, this.password);
};
