import { Test, TestingModule } from '@nestjs/testing';
import { SuperAdminController } from './super-admin.controller';
import { SuperAdminService } from './super-admin.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';

describe('SuperAdminController', () => {
  let controller: SuperAdminController;
  let superAdminService: any;

  beforeEach(async () => {
    const mockSuperAdminService = {
      getAllRestaurants: jest.fn(),
      getRestaurantById: jest.fn(),
      deleteRestaurant: jest.fn(),
      updateRestaurantStatus: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuperAdminController],
      providers: [
        {
          provide: SuperAdminService,
          useValue: mockSuperAdminService,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .overrideGuard(RolesGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    controller = module.get<SuperAdminController>(SuperAdminController);
    superAdminService = module.get(SuperAdminService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllRestaurants', () => {
    it('should call service and return restaurants', async () => {
      // GIVEN
      const mockRestaurants = [{ id: '1', name: 'Restaurant 1' }];
      superAdminService.getAllRestaurants.mockResolvedValue(mockRestaurants);

      // WHEN
      const result = await controller.getAllRestaurants();

      // THEN
      expect(superAdminService.getAllRestaurants).toHaveBeenCalled();
      expect(result).toEqual(mockRestaurants);
    });
  });

  describe('getRestaurantById', () => {
    it('should call service with id and return restaurant', async () => {
      // GIVEN
      const id = 'restaurant123';
      const mockRestaurant = { id, name: 'Test Restaurant' };
      superAdminService.getRestaurantById.mockResolvedValue(mockRestaurant);

      // WHEN
      const result = await controller.getRestaurantById(id);

      // THEN
      expect(superAdminService.getRestaurantById).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockRestaurant);
    });
  });

  describe('deleteRestaurant', () => {
    it('should call service to delete restaurant', async () => {
      // GIVEN
      const id = 'restaurant123';
      const mockResponse = { message: 'Deleted successfully' };
      superAdminService.deleteRestaurant.mockResolvedValue(mockResponse);

      // WHEN
      const result = await controller.deleteRestaurant(id);

      // THEN
      expect(superAdminService.deleteRestaurant).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('updateRestaurantStatus', () => {
    it('should call service to update restaurant status', async () => {
      // GIVEN
      const id = 'restaurant123';
      const status = 'open';
      const mockResponse = { message: 'Status updated' };
      superAdminService.updateRestaurantStatus.mockResolvedValue(mockResponse);

      // WHEN
      const result = await controller.updateRestaurantStatus(id, status);

      // THEN
      expect(superAdminService.updateRestaurantStatus).toHaveBeenCalledWith(
        id,
        status,
      );
      expect(result).toEqual(mockResponse);
    });
  });
});
