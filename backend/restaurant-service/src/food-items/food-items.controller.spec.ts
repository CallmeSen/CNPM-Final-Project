import { Test, TestingModule } from '@nestjs/testing';
import { FoodItemsController } from './food-items.controller';
import { FoodItemsService } from './food-items.service';
import { CreateFoodItemDto } from './dto/create-food-item.dto';
import { UpdateFoodItemDto } from './dto/update-food-item.dto';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';

describe('FoodItemsController', () => {
  let controller: FoodItemsController;
  let mockFoodItemsService: jest.Mocked<FoodItemsService>;

  const mockFoodItem = {
    _id: '507f1f77bcf86cd799439011',
    name: 'Test Food',
    description: 'Test Description',
    price: 10.99,
    category: 'Test Category',
    image: 'test-image.jpg',
    restaurant: 'restaurant123',
    availability: true,
  };

  const mockRequest = {
    user: { restaurantId: 'restaurant123' },
  };

  beforeEach(async () => {
    const mockService = {
      create: jest.fn(),
      findByRestaurant: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      updateAvailability: jest.fn(),
      findAll: jest.fn(),
      findByRestaurantPublic: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [FoodItemsController],
      providers: [
        {
          provide: FoodItemsService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<FoodItemsController>(FoodItemsController);
    mockFoodItemsService = module.get(FoodItemsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /food-items/create', () => {
    it('should handle JWT authentication guard failure (401)', async () => {
      // GIVEN - No user in request (authentication failed)
      const createDto: CreateFoodItemDto = {
        name: 'Test Food',
        description: 'Test Description',
        price: 10.99,
        category: 'Test Category',
      };

      // WHEN - Creating food item without authentication
      expect(() => controller.create(null, createDto, undefined)).toThrow(
        UnauthorizedException,
      );
    });

    it('should handle file upload middleware validation failure', async () => {
      // GIVEN - Invalid file uploaded
      const createDto: CreateFoodItemDto = {
        name: 'Test Food',
        description: 'Test Description',
        price: 10.99,
        category: 'Test Category',
      };

      const invalidFile = {
        originalname: 'test.exe',
        mimetype: 'application/x-msdownload',
        buffer: Buffer.from('invalid'),
      } as Express.Multer.File;

      mockFoodItemsService.create.mockRejectedValue(
        new BadRequestException('Invalid file type'),
      );

      // WHEN - Creating food item with invalid file
      const result = controller.create(
        mockRequest.user,
        createDto,
        invalidFile,
      );

      // THEN - Should throw BadRequestException for file validation
      await expect(result).rejects.toThrow(BadRequestException);
      await expect(result).rejects.toThrow('Invalid file type');
      expect(mockFoodItemsService.create).toHaveBeenCalledWith(
        'restaurant123',
        createDto,
        invalidFile,
      );
    });
  });

  describe('PUT /food-items/:id', () => {
    it('should handle restaurant ownership guard rejection (403)', async () => {
      // GIVEN - User tries to update food item from different restaurant
      const updateDto: UpdateFoodItemDto = {
        name: 'Updated Food',
        price: 15.99,
      };

      mockFoodItemsService.update.mockRejectedValue(
        new BadRequestException(
          "You can only update your own restaurant's food items",
        ),
      );

      // WHEN - Updating food item
      const result = controller.update(
        '507f1f77bcf86cd799439011',
        mockRequest.user,
        updateDto,
        undefined,
      );

      // THEN - Should throw BadRequestException for ownership violation
      await expect(result).rejects.toThrow(BadRequestException);
      await expect(result).rejects.toThrow(
        "You can only update your own restaurant's food items",
      );
      expect(mockFoodItemsService.update).toHaveBeenCalledWith(
        '507f1f77bcf86cd799439011',
        'restaurant123',
        updateDto,
        undefined,
      );
    });
  });

  describe('GET /food-items', () => {
    it('should successfully retrieve food items for restaurant', async () => {
      // GIVEN - Food items exist for restaurant
      const mockFoodItems = [mockFoodItem];
      mockFoodItemsService.findByRestaurant.mockResolvedValue(
        mockFoodItems as any,
      );

      // WHEN - Getting food items for restaurant
      const result = await controller.findByRestaurant(mockRequest.user);

      // THEN - Should return food items
      expect(result).toEqual(mockFoodItems);
      expect(mockFoodItemsService.findByRestaurant).toHaveBeenCalledWith(
        'restaurant123',
      );
    });
  });

  describe('DELETE /food-items/:id', () => {
    it('should successfully delete food item', async () => {
      // GIVEN - Food item exists and can be deleted
      mockFoodItemsService.delete.mockResolvedValue({
        message: 'Food item deleted successfully',
      });

      // WHEN - Deleting food item
      const result = await controller.delete(
        '507f1f77bcf86cd799439011',
        mockRequest.user,
      );

      // THEN - Should return success message
      expect(result).toEqual({ message: 'Food item deleted successfully' });
      expect(mockFoodItemsService.delete).toHaveBeenCalledWith(
        '507f1f77bcf86cd799439011',
        'restaurant123',
      );
    });
  });

  describe('GET /food-items/restaurant/:restaurantId', () => {
    it('should successfully retrieve filtered food items', async () => {
      // GIVEN - Food items exist for restaurant
      const mockFoodItems = [
        mockFoodItem,
        { ...mockFoodItem, _id: '507f1f77bcf86cd799439012' },
      ];
      mockFoodItemsService.findByRestaurantPublic.mockResolvedValue(
        mockFoodItems as any,
      );

      // WHEN - Getting food items by restaurant
      const result = await controller.findByRestaurantPublic('restaurant123');

      // THEN - Should return array of food items
      expect(result).toEqual(mockFoodItems);
      expect(mockFoodItemsService.findByRestaurantPublic).toHaveBeenCalledWith(
        'restaurant123',
      );
    });
  });

  describe('PUT /food-items/:id/availability', () => {
    it('should handle database operation failure', async () => {
      // GIVEN - Database operation fails
      const availability = false;

      mockFoodItemsService.updateAvailability.mockRejectedValue(
        new Error('Database operation failed'),
      );

      // WHEN - Updating availability
      const result = controller.updateAvailability(
        '507f1f77bcf86cd799439011',
        mockRequest.user,
        availability,
      );

      // THEN - Should throw error from service
      await expect(result).rejects.toThrow('Database operation failed');
      expect(mockFoodItemsService.updateAvailability).toHaveBeenCalledWith(
        '507f1f77bcf86cd799439011',
        'restaurant123',
        availability,
      );
    });
  });

  describe('GET /food-items/all', () => {
    it('should handle empty array response', async () => {
      // GIVEN - No public food items available
      mockFoodItemsService.findAll.mockResolvedValue([]);

      // WHEN - Getting all food items
      const result = await controller.findAll();

      // THEN - Should return empty array
      expect(result).toEqual([]);
      expect(mockFoodItemsService.findAll).toHaveBeenCalled();
    });
  });
});
