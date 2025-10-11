import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DeliveryFeesController } from './delivery-fees.controller';
import { DeliveryFeesService } from './delivery-fees.service';
import { DeliveryFee, DeliveryFeeSchema } from '../schemas/delivery-fee.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DeliveryFee.name, schema: DeliveryFeeSchema },
    ]),
  ],
  controllers: [DeliveryFeesController],
  providers: [DeliveryFeesService],
})
export class DeliveryFeesModule {}
