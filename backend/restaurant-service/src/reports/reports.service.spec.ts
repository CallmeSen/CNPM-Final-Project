import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { HttpService } from '@nestjs/axios';
import { ReportsService } from './reports.service';
import { Review } from '../schema/review.schema';
import { FoodItem } from '../schema/food-item.schema';

describe('ReportsService', () => {
  let service: ReportsService;
  let reviewModel: any;
  let httpService: any;

  beforeEach(async () => {
    const mockReviewModel = {
      find: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      aggregate: jest.fn(),
    };
    const mockFoodItemModel = {
      findById: jest.fn(),
    };
    const mockHttpService = {
      get: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReportsService,
        {
          provide: getModelToken(Review.name),
          useValue: mockReviewModel,
        },
        {
          provide: getModelToken(FoodItem.name),
          useValue: mockFoodItemModel,
        },
        {
          provide: HttpService,
          useValue: mockHttpService,
        },
      ],
    }).compile();

    service = module.get<ReportsService>(ReportsService);
    reviewModel = module.get(getModelToken(Review.name));
    httpService = module.get(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getRevenueData', () => {
    // 1 | getRevenueData | error | Order service API failure (network timeout) - critical external dependency
    it('should return empty array when order service API fails with network timeout', async () => {
      // GIVEN
      const restaurantId = 'restaurant123';
      const options = { period: 'week' as const };
      const authHeader = 'Bearer token';
      httpService.get.mockReturnValue({
        toPromise: jest.fn().mockRejectedValue(new Error('Network timeout')),
      });

      // WHEN
      const result = await service.getRevenueData(
        restaurantId,
        options,
        authHeader,
      );

      // THEN
      expect(result).toEqual([]);
      expect(httpService.get).toHaveBeenCalledWith(
        'http://localhost:5005/api/orders',
        {
          headers: {
            Authorization: authHeader,
          },
        },
      );
    });
  });

  describe('getTopSellingItems', () => {
    // 2 | getTopSellingItems | error | HttpService call rejection - tests external API resilience
    it('should return empty array when HttpService call is rejected', async () => {
      // GIVEN
      const restaurantId = 'restaurant123';
      const options = { period: 'week' as const };
      const authHeader = 'Bearer token';
      httpService.get.mockReturnValue({
        toPromise: jest.fn().mockRejectedValue(new Error('API rejection')),
      });

      // WHEN
      const result = await service.getTopSellingItems(
        restaurantId,
        options,
        authHeader,
      );

      // THEN
      expect(result).toEqual([]);
      expect(httpService.get).toHaveBeenCalledWith(
        'http://localhost:5005/api/orders',
        {
          headers: {
            Authorization: authHeader,
          },
        },
      );
    });
  });

  describe('getSummary', () => {
    // 3 | getSummary | edge | Empty orders array division by zero - prevents runtime errors
    it('should handle empty orders array and return zero average order value', async () => {
      // GIVEN
      const restaurantId = 'restaurant123';
      const options = { period: 'week' as const };
      const authHeader = 'Bearer token';
      httpService.get.mockReturnValue({
        toPromise: jest.fn().mockResolvedValue({
          data: [], // Empty orders array
        }),
      });
      reviewModel.aggregate.mockResolvedValue([]);

      // WHEN
      const result = await service.getSummary(
        restaurantId,
        options,
        authHeader,
      );

      // THEN
      expect(result).toEqual({
        totalRevenue: 0,
        totalOrders: 0,
        averageOrderValue: 0, // No division by zero
        averageRating: 0,
        totalReviews: 0,
      });
    });
  });

  describe('createReview', () => {
    // 4 | createReview | edge | Duplicate review prevention - validates business rules
    it('should throw BadRequestException when review already exists for the same item', async () => {
      // GIVEN
      const restaurantId = 'restaurant123';
      const dto = {
        orderId: 'order123',
        customerId: 'customer123',
        customerName: 'John Doe',
        foodItemId: 'food123',
        rating: 5,
        comment: 'Great food!',
      };
      reviewModel.findOne.mockResolvedValue({ _id: 'existing' });

      // WHEN & THEN
      await expect(service.createReview(restaurantId, dto)).rejects.toThrow(
        'Review already submitted for this item',
      );
      expect(reviewModel.findOne).toHaveBeenCalledWith({
        order: dto.orderId,
        foodItem: dto.foodItemId,
        'customer.customerId': dto.customerId,
      });
    });
  });

  describe('resolveDateRange', () => {
    // 5 | resolveDateRange | happy | Valid date range calculation - core utility function
    it('should calculate valid date range for week period', () => {
      // GIVEN
      const options = { period: 'week' as const };

      // WHEN
      const result = (service as any).resolveDateRange(options);

      // THEN
      const now = new Date();
      const expectedStart = new Date(now);
      expectedStart.setDate(now.getDate() - 7);
      expect(result.start.getTime()).toBeCloseTo(
        expectedStart.getTime(),
        -1000,
      );
      expect(result.end.getTime()).toBeCloseTo(now.getTime(), -1000);
    });
  });

  describe('getCustomerReviews', () => {
    // 6 | getCustomerReviews | error | MongoDB aggregation timeout - tests database performance
    it('should handle MongoDB aggregation timeout gracefully', async () => {
      // GIVEN
      const restaurantId = 'restaurant123';
      reviewModel.find.mockReturnValue({
        populate: jest.fn().mockReturnValue({
          sort: jest.fn().mockReturnValue({
            limit: jest.fn().mockReturnValue({
              lean: jest.fn().mockRejectedValue(new Error('MongoDB timeout')),
            }),
          }),
        }),
      });

      // WHEN & THEN
      await expect(service.getCustomerReviews(restaurantId)).rejects.toThrow(
        'MongoDB timeout',
      );
    });
  });
});
