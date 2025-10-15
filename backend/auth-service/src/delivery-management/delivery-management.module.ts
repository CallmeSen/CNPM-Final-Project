import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DeliveryManagementController } from './delivery-management.controller';
import { DeliveryManagementService } from './delivery-management.service';
import {
  DeliveryPersonnel,
  DeliveryPersonnelSchema,
} from '../schemas/delivery-personnel.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DeliveryPersonnel.name, schema: DeliveryPersonnelSchema },
    ]),
  ],
  controllers: [DeliveryManagementController],
  providers: [DeliveryManagementService],
})
export class DeliveryManagementModule {}
