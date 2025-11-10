import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true })
export class DeliveryFee {
  @Prop({ required: true, trim: true })
  name!: string;

  @Prop({ required: true, default: 3 })
  baseDistance!: number;

  @Prop({ required: true, default: 15000 })
  baseFee!: number;

  @Prop({ required: true, default: 5000 })
  perKmFee!: number;

  @Prop({ enum: ['bike', 'scooter', 'car', 'bicycle', 'all'], default: 'all' })
  vehicleType!: string;

  @Prop({ default: 1.5 })
  rushHourMultiplier!: number;

  @Prop({ default: true })
  isActive!: boolean;

  @Prop({ default: Date.now })
  effectiveFrom!: Date;

  @Prop({ default: null })
  effectiveTo?: Date | null;

  calculateFee(distance: number, isRushHour?: boolean): number {
    let fee = this.baseFee;
    if (distance > this.baseDistance) {
      const extraDistance = distance - this.baseDistance;
      fee += extraDistance * this.perKmFee;
    }
    if (isRushHour) {
      fee *= this.rushHourMultiplier;
    }
    return Math.round(fee);
  }
}

export type DeliveryFeeDocument = HydratedDocument<DeliveryFee>;

export const DeliveryFeeSchema = SchemaFactory.createForClass(DeliveryFee);
