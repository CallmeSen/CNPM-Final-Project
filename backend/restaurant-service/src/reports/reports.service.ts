import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateReviewDto } from './dto/create-review.dto';
import { Order } from '../schema/order.schema';
import { Review } from '../schema/review.schema';
import { FoodItem } from '../schema/food-item.schema';

interface DateQueryOptions {
  period?: 'day' | 'week' | 'month';
  startDate?: string;
  endDate?: string;
}

@Injectable()
export class ReportsService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<Order>,
    @InjectModel(Review.name) private readonly reviewModel: Model<Review>,
    @InjectModel(FoodItem.name) private readonly foodItemModel: Model<FoodItem>,
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

  async getRevenueData(restaurantId: string, options: DateQueryOptions) {
    const { start, end } = this.resolveDateRange(options);

    return this.orderModel.aggregate([
      {
        $match: {
          restaurantId,
          createdAt: { $gte: start, $lte: end },
          paymentStatus: 'Paid',
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' },
          },
          revenue: { $sum: '$totalPrice' },
          orders: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
      {
        $project: {
          _id: 0,
          date: '$_id',
          revenue: 1,
          orders: 1,
        },
      },
    ]);
  }

  async getTopSellingItems(
    restaurantId: string,
    options: DateQueryOptions & { limit?: number },
  ) {
    const { start, end } = this.resolveDateRange(options);
    const limit = options.limit ?? 5;

    const topItems = await this.orderModel.aggregate([
      {
        $match: {
          restaurantId,
          createdAt: { $gte: start, $lte: end },
          paymentStatus: 'Paid',
        },
      },
      { $unwind: '$items' },
      {
        $group: {
          _id: '$items.foodId',
          quantity: { $sum: '$items.quantity' },
          revenue: { $sum: { $multiply: ['$items.quantity', '$items.price'] } },
        },
      },
      { $sort: { quantity: -1 } },
      { $limit: limit },
    ]);

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

  async getSummary(restaurantId: string, options: DateQueryOptions) {
    const { start, end } = this.resolveDateRange(options);

    const [orderStats] = await this.orderModel.aggregate([
      {
        $match: {
          restaurantId,
          createdAt: { $gte: start, $lte: end },
          paymentStatus: 'Paid',
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$totalPrice' },
          totalOrders: { $sum: 1 },
        },
      },
    ]);

    const [ratingStats] = await this.reviewModel.aggregate([
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

    const totalRevenue = orderStats?.totalRevenue ?? 0;
    const totalOrders = orderStats?.totalOrders ?? 0;
    const averageRating = ratingStats?.averageRating ?? 0;
    const totalReviews = ratingStats?.totalReviews ?? 0;

    return {
      totalRevenue,
      totalOrders,
      averageOrderValue: totalOrders > 0 ? totalRevenue / totalOrders : 0,
      averageRating,
      totalReviews,
    };
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
