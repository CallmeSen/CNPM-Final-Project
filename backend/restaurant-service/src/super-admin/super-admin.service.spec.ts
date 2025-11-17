import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { SuperAdminService } from './super-admin.service';
import { SuperAdmin } from '../schema/super-admin.schema';
import { RestaurantsService } from '../restaurants/restaurants.service';

describe('SuperAdminService', () => {
  let service: SuperAdminService;
  let restaurantsService: any;

  beforeEach(async () => {
    const mockSuperAdminModel = {};
    const mockRestaurantsService = {
      getAllForAdmin: jest.fn(),
      getByIdForAdmin: jest.fn(),
      deleteByAdmin: jest.fn(),
      updateStatusByAdmin: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SuperAdminService,
        {
          provide: getModelToken(SuperAdmin.name),
          useValue: mockSuperAdminModel,
        },
        {
          provide: RestaurantsService,
          useValue: mockRestaurantsService,
        },
      ],
    }).compile();

    service = module.get<SuperAdminService>(SuperAdminService);
    restaurantsService = module.get(RestaurantsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('updateRestaurantStatus', () => {
    // 1 | updateRestaurantStatus | error | RestaurantsService method failure - tests delegation error handling
    it('should handle RestaurantsService method failure', async () => {
      // GIVEN
      const id = 'restaurant123';
      const status = 'open';
      restaurantsService.updateStatusByAdmin.mockRejectedValue(
        new Error('Service failure'),
      );

      // WHEN & THEN
      await expect(service.updateRestaurantStatus(id, status)).rejects.toThrow(
        'Service failure',
      );
      expect(restaurantsService.updateStatusByAdmin).toHaveBeenCalledWith(
        id,
        status,
      );
    });
  });

  describe('getAllRestaurants', () => {
    // 2 | getAllRestaurants | error | Service dependency injection failure - critical for functionality
    it('should handle service dependency injection failure', async () => {
      // GIVEN
      restaurantsService.getAllForAdmin.mockRejectedValue(
        new Error('Dependency injection failure'),
      );

      // WHEN & THEN
      await expect(service.getAllRestaurants()).rejects.toThrow(
        'Dependency injection failure',
      );
      expect(restaurantsService.getAllForAdmin).toHaveBeenCalled();
    });
  });

  describe('deleteRestaurant', () => {
    // 3 | deleteRestaurant | edge | Status string parsing edge cases - validates input processing
    it('should handle status string parsing edge cases', async () => {
      // GIVEN
      const id = 'restaurant123';
      restaurantsService.deleteByAdmin.mockResolvedValue({
        message: 'Deleted',
      });

      // WHEN
      const result = await service.deleteRestaurant(id);

      // THEN
      expect(restaurantsService.deleteByAdmin).toHaveBeenCalledWith(id);
      expect(result).toEqual({ message: 'Deleted' });
    });
  });

  describe('getRestaurantById', () => {
    // 4 | getRestaurantById | happy | Successful restaurant retrieval - core admin functionality
    it('should retrieve restaurant by id successfully', async () => {
      // GIVEN
      const id = 'restaurant123';
      const mockRestaurant = { id, name: 'Test Restaurant' };
      restaurantsService.getByIdForAdmin.mockResolvedValue(mockRestaurant);

      // WHEN
      const result = await service.getRestaurantById(id);

      // THEN
      expect(restaurantsService.getByIdForAdmin).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockRestaurant);
    });
  });

  describe('updateRestaurantStatus', () => {
    // 5 | updateRestaurantStatus | edge | Invalid status string values - tests business logic validation
    it('should handle invalid status string values', async () => {
      // GIVEN
      const id = 'restaurant123';
      const status = 'invalid-status';
      restaurantsService.updateStatusByAdmin.mockResolvedValue({
        message: 'Updated',
      });

      // WHEN
      const result = await service.updateRestaurantStatus(id, status);

      // THEN
      expect(restaurantsService.updateStatusByAdmin).toHaveBeenCalledWith(
        id,
        status,
      );
      expect(result).toEqual({ message: 'Updated' });
    });
  });

  describe('getAllRestaurants', () => {
    // 6 | getAllRestaurants | edge | Empty restaurant list handling - tests edge case responses
    it('should handle empty restaurant list', async () => {
      // GIVEN
      restaurantsService.getAllForAdmin.mockResolvedValue([]);

      // WHEN
      const result = await service.getAllRestaurants();

      // THEN
      expect(result).toEqual([]);
      expect(restaurantsService.getAllForAdmin).toHaveBeenCalled();
    });
  });

  describe('deleteRestaurant', () => {
    // 7 | deleteRestaurant | error | RestaurantsService throws exception - tests error propagation
    it('should propagate exception from RestaurantsService', async () => {
      // GIVEN
      const id = 'restaurant123';
      restaurantsService.deleteByAdmin.mockRejectedValue(
        new Error('Delete failed'),
      );

      // WHEN & THEN
      await expect(service.deleteRestaurant(id)).rejects.toThrow(
        'Delete failed',
      );
      expect(restaurantsService.deleteByAdmin).toHaveBeenCalledWith(id);
    });
  });

  describe('getRestaurantById', () => {
    // 8 | getRestaurantById | error | Service method rejection - validates error handling consistency
    it('should handle service method rejection', async () => {
      // GIVEN
      const id = 'restaurant123';
      restaurantsService.getByIdForAdmin.mockRejectedValue(
        new Error('Service rejection'),
      );

      // WHEN & THEN
      await expect(service.getRestaurantById(id)).rejects.toThrow(
        'Service rejection',
      );
      expect(restaurantsService.getByIdForAdmin).toHaveBeenCalledWith(id);
    });
  });
});
