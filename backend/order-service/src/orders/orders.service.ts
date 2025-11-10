import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from '../schema/order.schema';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { OrderStatus } from '../common/enums/order-status.enum';
import { OrdersGateway } from './orders.gateway';

interface AuthenticatedUser {
  id: string;
  role: string;
}

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<OrderDocument>,
    private readonly ordersGateway: OrdersGateway,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<OrderDocument> {
    const totalPrice = this.calculateTotal(createOrderDto.items);
    const orderId = `ORDER-${Date.now()}`;
    console.log(`🔵 Creating order with orderId: ${orderId}`);
    const order = new this.orderModel({
      ...createOrderDto,
      orderId,
      totalPrice,
    });
    const savedOrder = await order.save();
    console.log(`✅ Order created successfully:`, {
      _id: savedOrder._id,
      orderId: savedOrder.orderId,
      customerId: savedOrder.customerId,
      totalPrice: savedOrder.totalPrice,
    });
    return savedOrder;
  }

  async findAll(user: AuthenticatedUser): Promise<OrderDocument[]> {
    if (user.role === 'superAdmin') {
      return this.orderModel.find().exec();
    }

    if (user.role === 'restaurant') {
      return this.orderModel.find({ restaurantId: user.id }).exec();
    }

    return this.orderModel.find({ customerId: user.id }).exec();
  }

  async findOne(id: string): Promise<OrderDocument> {
    const order = await this.orderModel.findById(id).exec();
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }

  async findByOrderId(orderId: string): Promise<OrderDocument | null> {
    const order = await this.orderModel.findOne({ orderId }).exec();
    return order;
  }

  async updateDetails(
    id: string,
    updateOrderDto: UpdateOrderDto,
    user: AuthenticatedUser,
  ): Promise<OrderDocument> {
    const order = await this.findOne(id);

    if (user.role !== 'superAdmin' && order.customerId !== user.id) {
      throw new ForbiddenException('You can only modify your own orders');
    }

    if (updateOrderDto.items) {
      order.items = updateOrderDto.items as unknown as Order['items'];
      order.totalPrice = this.calculateTotal(order.items);
    }

    if (typeof updateOrderDto.deliveryAddress === 'string') {
      order.deliveryAddress = updateOrderDto.deliveryAddress;
    }

    const updated = await order.save();
    return updated;
  }

  async updateStatus(
    id: string,
    updateOrderStatusDto: UpdateOrderStatusDto,
    user: AuthenticatedUser,
  ): Promise<OrderDocument> {
    const order = await this.findOne(id);

    if (user.role !== 'superAdmin' && user.role !== 'restaurant') {
      throw new ForbiddenException(
        'Only restaurants or super admins can update order status',
      );
    }

    if (user.role === 'restaurant' && order.restaurantId !== user.id) {
      throw new ForbiddenException(
        'You can only update orders for your own restaurant',
      );
    }

    order.status = updateOrderStatusDto.status;
    const updated = await order.save();

    this.ordersGateway.broadcastOrderUpdate({
      orderId: updated._id.toString(),
      status: updated.status,
    });

    return updated;
  }

  async cancel(id: string, user: AuthenticatedUser): Promise<OrderDocument> {
    const order = await this.findOne(id);

    if (user.role !== 'superAdmin' && order.customerId !== user.id) {
      throw new ForbiddenException('You can only cancel your own orders');
    }

    order.status = OrderStatus.Canceled;
    const updated = await order.save();

    this.ordersGateway.broadcastOrderUpdate({
      orderId: updated._id.toString(),
      status: updated.status,
    });

    return updated;
  }

  private calculateTotal(items: Order['items']): number {
    return items.reduce((total, item) => total + item.quantity * item.price, 0);
  }
}
