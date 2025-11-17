import { Controller, Patch, Param, Body, Logger } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';

/**
 * Internal API endpoints for inter-service communication
 * No authentication required - should be called only from other backend services
 */
@Controller('orders/internal')
export class OrdersInternalController {
  private readonly logger = new Logger(OrdersInternalController.name);

  constructor(private readonly ordersService: OrdersService) {}

  /**
   * Update order status from payment service webhook
   * Called when payment is confirmed via Stripe webhook
   */
  @Patch(':orderId/status')
  async updateOrderStatusFromPayment(
    @Param('orderId') orderId: string,
    @Body() updateOrderStatusDto: UpdateOrderStatusDto,
  ) {
    this.logger.log(
      `📦 Internal request to update order ${orderId} to status: ${updateOrderStatusDto.status}`,
    );

    try {
      // Try to find order by orderId field first (new orders)
      let order = await this.ordersService.findByOrderId(orderId);

      // If not found and orderId looks like MongoDB ObjectId, try finding by _id
      if (!order && orderId.match(/^[0-9a-fA-F]{24}$/)) {
        this.logger.log(`Trying to find order by _id: ${orderId}`);
        try {
          order = await this.ordersService.findOne(orderId);
        } catch {
          // Ignore error, will be caught below
        }
      }

      if (!order) {
        this.logger.error(`❌ Order ${orderId} not found`);
        throw new Error(`Order ${orderId} not found`);
      }

      // Update both status and paymentStatus when payment is confirmed
      order.status = updateOrderStatusDto.status;
      order.paymentStatus = 'Paid'; // Payment confirmed via webhook
      const updated = await order.save();

      this.logger.log(
        `✅ Order ${orderId} updated: status=${updateOrderStatusDto.status}, paymentStatus=Paid`,
      );
      return updated;
    } catch (error) {
      this.logger.error(
        `❌ Failed to update order ${orderId}: ${error.message}`,
      );
      throw error;
    }
  }
}
