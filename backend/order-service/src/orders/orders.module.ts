import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrdersController } from './orders.controller';
import { OrdersInternalController } from './orders-internal.controller';
import { OrdersService } from './orders.service';
import { Order, OrderSchema } from '../schema/order.schema';
import { OrdersGateway } from './orders.gateway';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
  ],
  controllers: [OrdersController, OrdersInternalController],
  providers: [OrdersService, OrdersGateway, JwtAuthGuard, RolesGuard],
})
export class OrdersModule {}
