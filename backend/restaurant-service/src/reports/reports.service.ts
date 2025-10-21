import { BadRequestException, Injectable, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateReviewDto } from './dto/create-review.dto';
import { Review } from '../schema/review.schema';
import { FoodItem } from '../schema/food-item.schema';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

interface DateQueryOptions {
  period?: 'day' | 'week' | 'month';
  startDate?: string;
  endDate?: string;
}

interface OrderFromService {
  _id: string;
  customerId: string;
  restaurantId: string;
  items: Array<{
    foodId: string;
    quantity: number;
    price: number;
  }>;
  totalPrice: number;
  paymentStatus: string;
  status: string;
  deliveryAddress: string;
  createdAt: string;
  updatedAt: string;
}

@Injectable()
export class ReportsService {
  private readonly ORDER_SERVICE_URL = process.env.ORDER_SERVICE_URL || 'http://localhost:5005';

  constructor(
    @InjectModel(Review.name) private readonly reviewModel: Model<Review>,
    @InjectModel(FoodItem.name) private readonly foodItemModel: Model<FoodItem>,
    private readonly httpService: HttpService,
  ) {}

  private resolveDateRange({
    period = 'week',
    startDate,
    endDate,
  }: DateQueryOptions) {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      return { start, end };
    }

    const now = new Date();
    const end = new Date();
    const start = new Date(now);

    switch (period) {
      case 'day':
        start.setHours(0, 0, 0, 0);
        break;
      case 'month':
        start.setDate(start.getDate() - 30);
        break;
      default:
        start.setDate(start.getDate() - 7);
    }

    return { start, end };
  }

  async getRevenueData(
    restaurantId: string,
    options: DateQueryOptions,
    authHeader?: string,
  ) {
    const { start, end } = this.resolveDateRange(options);

    try {
      // Fetch orders from order-service
      const response = await firstValueFrom(
        this.httpService.get<OrderFromService[]>(
          `${this.ORDER_SERVICE_URL}/api/orders`,
          {
            headers: {
              Authorization: authHeader || '',
            },
          },
        ),
      );

      const orders = response.data;

      // Filter and aggregate locally
      const filteredOrders = orders.filter(
        (order) =>
          order.restaurantId === restaurantId &&
          order.paymentStatus === 'Paid' &&
          new Date(order.createdAt) >= start &&
          new Date(order.createdAt) <= end,
      );

      // Group by date
      const revenueMap = new Map<string, { revenue: number; orders: number }>();

      filteredOrders.forEach((order) => {
        const dateKey = new Date(order.createdAt).toISOString().split('T')[0];
        const existing = revenueMap.get(dateKey) || { revenue: 0, orders: 0 };
        existing.revenue += order.totalPrice;
        existing.orders += 1;
        revenueMap.set(dateKey, existing);
      });

      // Convert to array and sort
      return Array.from(revenueMap.entries())
        .map(([date, data]) => ({
          date,
          revenue: data.revenue,
          orders: data.orders,
        }))
        .sort((a, b) => a.date.localeCompare(b.date));
    } catch (error) {
      return [];
    }
  }

  async getTopSellingItems(
    restaurantId: string,
    options: DateQueryOptions & { limit?: number },
    authHeader?: string,
  ) {
    const { start, end } = this.resolveDateRange(options);
    const limit = options.limit ?? 5;

    try {
      // Fetch orders from order-service
      const response = await firstValueFrom(
        this.httpService.get<OrderFromService[]>(
          `${this.ORDER_SERVICE_URL}/api/orders`,
          {
            headers: {
              Authorization: authHeader || '',
            },
          },
        ),
      );

      const orders = response.data;

      // Filter paid orders within date range
      const filteredOrders = orders.filter(
        (order) =>
          order.restaurantId === restaurantId &&
          order.paymentStatus === 'Paid' &&
          new Date(order.createdAt) >= start &&
          new Date(order.createdAt) <= end,
      );

      // Aggregate items
      const itemsMap = new Map<
        string,
        { quantity: number; revenue: number }
      >();

      filteredOrders.forEach((order) => {
        order.items.forEach((item) => {
          const existing = itemsMap.get(item.foodId) || {
            quantity: 0,
            revenue: 0,
          };
          existing.quantity += item.quantity;
          existing.revenue += item.quantity * item.price;
          itemsMap.set(item.foodId, existing);
        });
      });

      // Sort by quantity and limit
      const topItems = Array.from(itemsMap.entries())
        .map(([foodId, data]) => ({
          _id: foodId,
          quantity: data.quantity,
          revenue: data.revenue,
        }))
        .sort((a, b) => b.quantity - a.quantity)
        .slice(0, limit);

      // Fetch food item details
      return Promise.all(
        topItems.map(async (item) => {
          const foodItem = await this.foodItemModel.findById(item._id).lean();
          return {
            id: item._id,
            name: foodItem?.name ?? 'Unknown Item',
            quantity: item.quantity,
            revenue: item.revenue,
            image: foodItem?.image ?? '',
            category: foodItem?.category ?? '',
          };
        }),
      );
    } catch (error) {
      return [];
    }
  }

  async getCustomerReviews(restaurantId: string, limit = 10) {
    const reviews = await this.reviewModel
      .find({ restaurant: restaurantId })
      .populate('foodItem', 'name')
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    return reviews.map((review) => {
      const createdAt = (review as { createdAt?: Date }).createdAt;

      return {
        customer: review.customer.name,
        customerId: review.customer.customerId,
        rating: review.rating,
        comment: review.comment,
        date: createdAt ? createdAt.toISOString().split('T')[0] : '',
        item: (review as any).foodItem?.name ?? 'Unknown Item',
        orderId: review.order,
      };
    });
  }

  async getSummary(
    restaurantId: string,
    options: DateQueryOptions,
    authHeader?: string,
  ) {
    const { start, end } = this.resolveDateRange(options);

    try {
      // Fetch orders from order-service
      const response = await firstValueFrom(
        this.httpService.get<OrderFromService[]>(
          `${this.ORDER_SERVICE_URL}/api/orders`,
          {
            headers: {
              Authorization: authHeader || '',
            },
          },
        ),
      );

      const orders = response.data;

      // Filter and calculate order stats
      const filteredOrders = orders.filter(
        (order) =>
          order.restaurantId === restaurantId &&
          order.paymentStatus === 'Paid' &&
          new Date(order.createdAt) >= start &&
          new Date(order.createdAt) <= end,
      );

      const totalRevenue = filteredOrders.reduce(
        (sum, order) => sum + order.totalPrice,
        0,
      );
      const totalOrders = filteredOrders.length;

      // Calculate rating stats
      const ratingStats = await this.reviewModel.aggregate([
        {
          $match: {
            restaurant: restaurantId,
            createdAt: { $gte: start, $lte: end },
          },
        },
        {
          $group: {
            _id: null,
            averageRating: { $avg: '$rating' },
            totalReviews: { $sum: 1 },
          },
        },
      ]);

      const averageRating = ratingStats[0]?.averageRating ?? 0;
      const totalReviews = ratingStats[0]?.totalReviews ?? 0;

      return {
        totalRevenue,
        totalOrders,
        averageOrderValue: totalOrders > 0 ? totalRevenue / totalOrders : 0,
        averageRating,
        totalReviews,
      };
    } catch (error) {
      return {
        totalRevenue: 0,
        totalOrders: 0,
        averageOrderValue: 0,
        averageRating: 0,
        totalReviews: 0,
      };
    }
  }

  async createReview(restaurantId: string, dto: CreateReviewDto) {
    if (dto.rating < 1 || dto.rating > 5) {
      throw new BadRequestException('Rating must be between 1 and 5');
    }

    const existingReview = await this.reviewModel.findOne({
      order: dto.orderId,
      foodItem: dto.foodItemId,
      'customer.customerId': dto.customerId,
    });

    if (existingReview) {
      throw new BadRequestException('Review already submitted for this item');
    }

    const review = await this.reviewModel.create({
      restaurant: restaurantId,
      order: dto.orderId,
      customer: {
        name: dto.customerName,
        customerId: dto.customerId,
      },
      foodItem: dto.foodItemId,
      rating: dto.rating,
      comment: dto.comment,
    });

    return review;
  }
}
