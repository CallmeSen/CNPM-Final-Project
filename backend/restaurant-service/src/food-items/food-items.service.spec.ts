import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { FoodItemsService } from './food-items.service';
import { FoodItem, FoodItemDocument } from '../schema/food-item.schema';
import { Model } from 'mongoose';
import { UnauthorizedException } from '@nestjs/common';
import { CreateFoodItemDto } from './dto/create-food-item.dto';
import { UpdateFoodItemDto } from './dto/update-food-item.dto';
import { ConfigService } from '@nestjs/config';

// Mock axios
jest.mock('axios');
import axios from 'axios';

// Mock fs
jest.mock('fs', () => ({
  unlink: jest.fn(),
}));
import { unlink } from 'fs';

describe('FoodItemsService', () => {
  let service: FoodItemsService;
  let mockFoodItemModel: Model<FoodItemDocument>;

  const mockFoodItem = {
    _id: '507f1f77bcf86cd799439011',
    name: 'Test Food',
    description: 'Test Description',
    price: 10.99,
    category: 'Test Category',
    image: 'test-image.jpg',
    restaurant: 'restaurant123',
    availability: true,
    save: jest.fn(),
    toObject: jest.fn().mockReturnThis(),
  };

  beforeEach(async () => {
    const mockQuery = {
      populate: jest.fn().mockReturnThis(),
      lean: jest.fn(),
    };

    const mockFoodItemModelInstance = jest.fn().mockImplementation((data) => ({
      ...data,
      save: jest.fn(),
    })) as any;

    // Add static methods to the mock
    mockFoodItemModelInstance.create = jest.fn();
    mockFoodItemModelInstance.find = jest.fn().mockReturnValue(mockQuery);
    mockFoodItemModelInstance.findById = jest.fn();
    mockFoodItemModelInstance.findByIdAndUpdate = jest.fn();
    mockFoodItemModelInstance.findByIdAndDelete = jest.fn();
    mockFoodItemModelInstance.findOne = jest.fn();

    // Mock axios
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    mockedAxios.get = jest.fn();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FoodItemsService,
        {
          provide: getModelToken(FoodItem.name),
          useValue: mockFoodItemModelInstance,
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue('http://localhost:5001'),
          },
        },
      ],
    }).compile();

    service = module.get<FoodItemsService>(FoodItemsService);
    mockFoodItemModel = module.get<Model<FoodItemDocument>>(
      getModelToken(FoodItem.name),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should handle database connection failure during save operation', async () => {
      // GIVEN - Restaurant verification succeeds but database save fails
      const mockedAxios = axios as jest.Mocked<typeof axios>;
      mockedAxios.get.mockResolvedValue({ data: { data: { restaurant: {} } } });

      const createDto: CreateFoodItemDto = {
        name: 'Test Food',
        description: 'Test Description',
        price: 10.99,
        category: 'Test Category',
      };

      // Mock the constructor to return an object with save method that throws
      (mockFoodItemModel as jest.MockedFunction<any>).mockImplementationOnce(
        (data) => ({
          ...data,
          save: jest
            .fn()
            .mockRejectedValue(new Error('Database connection failed')),
        }),
      );

      // WHEN - Creating food item
      const result = service.create('restaurant123', createDto);

      // THEN - Should throw error
      await expect(result).rejects.toThrow('Database connection failed');
    });
  });

  describe('update', () => {
    it('should handle restaurant ownership verification failure', async () => {
      // GIVEN - Food item exists but belongs to different restaurant
      const updateDto: UpdateFoodItemDto = {
        name: 'Updated Food',
        price: 15.99,
      };

      const existingFoodItem = {
        ...mockFoodItem,
        restaurant: 'different-restaurant',
      };

      mockFoodItemModel.findById = jest
        .fn()
        .mockResolvedValue(existingFoodItem);

      // WHEN - Updating food item from different restaurant
      const result = service.update(
        '507f1f77bcf86cd799439011',
        'restaurant123',
        updateDto,
      );

      // THEN - Should throw UnauthorizedException for ownership verification
      await expect(result).rejects.toThrow(UnauthorizedException);
      await expect(result).rejects.toThrow(
        'Not authorized to update this food item',
      );
    });
  });

  describe('findById', () => {
    it('should handle MongoDB connection timeout', async () => {
      // GIVEN - MongoDB connection timeout occurs
      const mockTimeoutError = new Error('MongoDB connection timeout');
      mockFoodItemModel.findById = jest
        .fn()
        .mockRejectedValue(mockTimeoutError);

      // WHEN - Getting food item by ID
      const result = service.findById('507f1f77bcf86cd799439011');

      // THEN - Should throw error for connection timeout
      await expect(result).rejects.toThrow('MongoDB connection timeout');
    });
  });

  describe('delete', () => {
    it('should handle file system permission error during image deletion', async () => {
      // GIVEN - Food item exists with image and file system permission error occurs
      const foodItemWithImage = {
        ...mockFoodItem,
        image: 'uploads/test-image.jpg',
        restaurant: 'restaurant123',
      };

      mockFoodItemModel.findById = jest
        .fn()
        .mockResolvedValue(foodItemWithImage);
      mockFoodItemModel.findByIdAndDelete = jest
        .fn()
        .mockResolvedValue(foodItemWithImage);

      // Mock fs.unlink to simulate permission error
      const mockedUnlink = unlink as jest.MockedFunction<typeof unlink>;
      mockedUnlink.mockImplementation((path, callback) => {
        callback(new Error('EACCES: permission denied'));
      });

      // WHEN - Deleting food item
      const result = service.delete(
        '507f1f77bcf86cd799439011',
        'restaurant123',
      );

      // THEN - Should still succeed despite file system error (cleanup is best effort)
      await expect(result).resolves.toBeDefined();
    });
  });

  describe('findByRestaurant', () => {
    it('should successfully retrieve multiple food items for restaurant', async () => {
      // GIVEN - Multiple food items exist for restaurant
      const mockFoodItems = [
        { ...mockFoodItem, _id: '507f1f77bcf86cd799439011' },
        {
          ...mockFoodItem,
          _id: '507f1f77bcf86cd799439012',
          name: 'Second Food',
        },
      ];

      // Mock the query chain for findByRestaurant (no populate needed)
      (mockFoodItemModel.find as jest.MockedFunction<any>).mockResolvedValue(
        mockFoodItems,
      );

      // WHEN - Getting food items by restaurant
      const result = await service.findByRestaurant('restaurant123');

      // THEN - Should return array of food items
      expect(result).toHaveLength(2);
      expect(result[0].name).toBe('Test Food');
      expect(result[1].name).toBe('Second Food');
      expect(mockFoodItemModel.find).toHaveBeenCalledWith({
        restaurant: 'restaurant123',
      });
    });
  });

  describe('updateAvailability', () => {
    it('should successfully update availability status', async () => {
      // GIVEN - Food item exists
      mockFoodItemModel.findById = jest.fn().mockResolvedValue(mockFoodItem);
      const updatedFoodItem = { ...mockFoodItem, availability: false };
      mockFoodItemModel.findByIdAndUpdate = jest
        .fn()
        .mockResolvedValue(updatedFoodItem);

      // WHEN - Updating availability with valid boolean value
      const result = await service.updateAvailability(
        '507f1f77bcf86cd799439011',
        'restaurant123',
        false,
      );

      // THEN - Should successfully update availability
      expect(result.message).toBe(
        'Food item availability updated successfully',
      );
      expect(result.foodItem.availability).toBe(false);
    });
  });

  describe('findAll', () => {
    it('should handle empty result set', async () => {
      // GIVEN - No food items exist
      const mockQuery = {
        populate: jest.fn().mockResolvedValue([]),
      };

      (mockFoodItemModel.find as jest.MockedFunction<any>).mockReturnValue(
        mockQuery,
      );

      // WHEN - Getting all food items
      const result = await service.findAll();

      // THEN - Should return empty array
      expect(result).toEqual([]);
      expect(mockFoodItemModel.find).toHaveBeenCalledWith();
    });
  });
});
