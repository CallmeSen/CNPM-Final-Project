import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserManagementController } from './user-management.controller';
import { UserManagementService } from './user-management.service';
import { Customer, CustomerSchema } from '../schemas/customer.schema';
import { Admin, AdminSchema } from '../schemas/admin.schema';
import {
  RestaurantAdmin,
  RestaurantAdminSchema,
} from '../schemas/restaurant-admin.schema';
import {
  DeliveryPersonnel,
  DeliveryPersonnelSchema,
} from '../schemas/delivery-personnel.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Customer.name, schema: CustomerSchema },
      { name: Admin.name, schema: AdminSchema },
      { name: RestaurantAdmin.name, schema: RestaurantAdminSchema },
      { name: DeliveryPersonnel.name, schema: DeliveryPersonnelSchema },
    ]),
  ],
  controllers: [UserManagementController],
  providers: [UserManagementService],
})
export class UserManagementModule {}
