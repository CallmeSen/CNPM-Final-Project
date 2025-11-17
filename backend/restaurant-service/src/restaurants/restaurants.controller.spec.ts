import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantsController } from './restaurants.controller';
import { RestaurantsService } from './restaurants.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';

describe('RestaurantsController', () => {
  let controller: RestaurantsController;
  let restaurantsService: any;

  beforeEach(async () => {
    const mockRestaurantsService = {
      getPublicRestaurants: jest.fn(),
      getRestaurantById: jest.fn(),
      getProfile: jest.fn(),
      updateProfile: jest.fn(),
      updateAvailability: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [RestaurantsController],
      providers: [
        {
          provide: RestaurantsService,
          useValue: mockRestaurantsService,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .overrideGuard(RolesGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    controller = module.get<RestaurantsController>(RestaurantsController);
    restaurantsService = module.get(RestaurantsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('fetchRestaurantFromAuthService', () => {
    // 8 | fetchRestaurantFromAuthService | edge | Invalid auth header forwarding - tests security
    it('should handle invalid auth header forwarding', async () => {
      // GIVEN
      const user = { restaurantId: 'restaurant123' };
      const dto = { name: 'New Name' };
      const authHeader = 'Invalid Header'; // Invalid auth header
      const file = {
        fieldname: 'profilePicture',
        originalname: 'test.jpg',
        encoding: '7bit',
        mimetype: 'image/jpeg',
        buffer: Buffer.from('test'),
        size: 4,
        stream: null as any,
        destination: '',
        filename: 'test.jpg',
        path: '/tmp/test.jpg',
      };
      restaurantsService.updateProfile.mockResolvedValue({
        message: 'Updated',
        restaurant: {},
      });

      // WHEN
      const result = await controller.updateProfile(
        user,
        dto,
        authHeader,
        file,
      );

      // THEN
      expect(restaurantsService.updateProfile).toHaveBeenCalledWith(
        'restaurant123',
        dto,
        file,
        authHeader, // Invalid header forwarded
      );
      expect(result).toEqual({
        message: 'Updated',
        restaurant: {},
      });
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
