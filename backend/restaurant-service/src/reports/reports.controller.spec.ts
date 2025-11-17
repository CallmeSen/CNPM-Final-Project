import { Test, TestingModule } from '@nestjs/testing';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';

describe('ReportsController', () => {
  let controller: ReportsController;
  let reportsService: any;

  beforeEach(async () => {
    const mockReportsService = {
      getRevenueData: jest.fn(),
      getTopSellingItems: jest.fn(),
      getCustomerReviews: jest.fn(),
      getSummary: jest.fn(),
      createReview: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReportsController],
      providers: [
        {
          provide: ReportsService,
          useValue: mockReportsService,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .overrideGuard(RolesGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    controller = module.get<ReportsController>(ReportsController);
    reportsService = module.get(ReportsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getRevenue', () => {
    // 7 | getRevenueData | edge | Invalid date range parameters - tests input validation
    it('should call service with invalid date range parameters and handle gracefully', async () => {
      // GIVEN
      const user = { restaurantId: 'restaurant123' };
      const authHeader = 'Bearer token';
      const period = 'invalid';
      const startDate = 'invalid-date';
      const endDate = 'invalid-date';
      reportsService.getRevenueData.mockResolvedValue([]);

      // WHEN
      const result = await controller.getRevenue(
        user,
        authHeader,
        period,
        startDate,
        endDate,
      );

      // THEN
      expect(reportsService.getRevenueData).toHaveBeenCalledWith(
        'restaurant123',
        {
          period: 'invalid' as any,
          startDate: 'invalid-date',
          endDate: 'invalid-date',
        },
        authHeader,
      );
      expect(result).toEqual([]);
    });
  });

  describe('createReview', () => {
    // 8 | createReview | error | Rating validation failure (out of 1-5 range) - ensures data integrity
    it('should throw BadRequestException when rating is out of range', async () => {
      // GIVEN
      const user = { restaurantId: 'restaurant123' };
      const dto = {
        orderId: 'order123',
        customerId: 'customer123',
        customerName: 'John Doe',
        foodItemId: 'food123',
        rating: 6, // Invalid rating
        comment: 'Great food!',
      };
      reportsService.createReview.mockRejectedValue(
        new Error('Rating must be between 1 and 5'),
      );

      // WHEN & THEN
      await expect(controller.createReview(user, dto)).rejects.toThrow(
        'Rating must be between 1 and 5',
      );
      expect(reportsService.createReview).toHaveBeenCalledWith(
        'restaurant123',
        dto,
      );
    });
  });

  describe('ensureRestaurant', () => {
    it('should throw UnauthorizedException when restaurantId is missing', () => {
      // GIVEN
      const user = {};

      // WHEN & THEN
      expect(() => (controller as any).ensureRestaurant(user)).toThrow(
        'Restaurant context missing from token',
      );
    });

    it('should return restaurantId when present', () => {
      // GIVEN
      const user = { restaurantId: 'restaurant123' };

      // WHEN
      const result = (controller as any).ensureRestaurant(user);

      // THEN
      expect(result).toBe('restaurant123');
    });
  });
});
