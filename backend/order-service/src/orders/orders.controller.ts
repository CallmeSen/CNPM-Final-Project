import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  ForbiddenException,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { User } from '../common/decorators/user.decorator';

interface AuthenticatedUser {
  id: string;
  role: string;
  claims?: Record<string, unknown>;
}

@Controller('orders')
@UseGuards(JwtAuthGuard, RolesGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @Roles('customer')
  create(
    @Body() createOrderDto: CreateOrderDto,
    @User() user: AuthenticatedUser,
  ) {
    if (!createOrderDto.customerId) {
      createOrderDto.customerId = user.id;
    }

    if (createOrderDto.customerId !== user.id) {
      throw new ForbiddenException('You can only create orders for yourself');
    }

    return this.ordersService.create(createOrderDto);
  }

  @Get()
  @Roles('customer', 'restaurant', 'superAdmin')
  findAll(@User() user: AuthenticatedUser) {
    return this.ordersService.findAll(user);
  }

  @Get(':id')
  @Roles('customer', 'restaurant', 'superAdmin')
  async findOne(@Param('id') id: string, @User() user: AuthenticatedUser) {
    const order = await this.ordersService.findOne(id);

    if (user.role === 'customer' && order.customerId !== user.id) {
      throw new ForbiddenException('Order not found');
    }

    if (user.role === 'restaurant' && order.restaurantId !== user.id) {
      throw new ForbiddenException('Order not found');
    }

    return order;
  }

  @Patch(':id')
  @Roles('customer', 'superAdmin')
  updateDetails(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
    @User() user: AuthenticatedUser,
  ) {
    return this.ordersService.updateDetails(id, updateOrderDto, user);
  }

  @Patch(':id/status')
  @Roles('restaurant', 'superAdmin')
  updateStatus(
    @Param('id') id: string,
    @Body() updateOrderStatusDto: UpdateOrderStatusDto,
    @User() user: AuthenticatedUser,
  ) {
    return this.ordersService.updateStatus(id, updateOrderStatusDto, user);
  }

  @Delete(':id')
  @Roles('customer', 'superAdmin')
  cancel(@Param('id') id: string, @User() user: AuthenticatedUser) {
    return this.ordersService.cancel(id, user);
  }
}
