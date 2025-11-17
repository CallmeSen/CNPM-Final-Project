import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { RestaurantsService } from './restaurants.service';
import { Restaurant } from '../schema/restaurant.schema';
import axios from 'axios';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('RestaurantsService', () => {
  let service: RestaurantsService;

  beforeEach(async () => {
    const mockRestaurantModel = {};
    const mockConfigService = {
      get: jest.fn().mockReturnValue('http://localhost:5001'),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RestaurantsService,
        {
          provide: getModelToken(Restaurant.name),
          useValue: mockRestaurantModel,
        },
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    service = module.get<RestaurantsService>(RestaurantsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('fetchRestaurantFromAuthService', () => {
    // 1 | fetchRestaurantFromAuthService | error | Auth service API failure (404 not found) - critical external dependency
    it('should throw NotFoundException when auth service returns 404', async () => {
      // GIVEN
      const restaurantId = 'restaurant123';
      mockedAxios.get.mockRejectedValue({
        response: { status: 404 },
      });

      // WHEN & THEN
      await expect(
        (service as any).fetchRestaurantFromAuthService(restaurantId),
      ).rejects.toThrow('Restaurant not found');
      expect(mockedAxios.get).toHaveBeenCalledWith(
        'http://localhost:5001/api/auth/restaurant/profile/restaurant123',
      );
    });
  });

  describe('updateProfile', () => {
    // 2 | updateProfile | error | FormData construction failure - handles file upload errors
    it('should handle FormData construction failure', async () => {
      // GIVEN
      const restaurantId = 'restaurant123';
      const dto = { name: 'New Name' };
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
      const authHeader = 'Bearer token';
      mockedAxios.patch.mockRejectedValue(new Error('Update failed'));

      // WHEN & THEN
      await expect(
        service.updateProfile(restaurantId, dto, file, authHeader),
      ).rejects.toThrow('Update failed');
    });
  });

  describe('getProfile', () => {
    // 3 | getProfile | error | Axios network timeout - tests HTTP client resilience
    it('should handle axios network timeout', async () => {
      // GIVEN
      const restaurantId = 'restaurant123';
      mockedAxios.get.mockRejectedValue(new Error('Network timeout'));

      // WHEN & THEN
      await expect(service.getProfile(restaurantId)).rejects.toThrow(
        'Failed to fetch restaurant profile from auth service',
      );
    });
  });

  describe('sanitizeRestaurant', () => {
    // 4 | sanitizeRestaurant | edge | Missing nested object properties - validates data transformation
    it('should handle missing nested object properties gracefully', () => {
      // GIVEN
      const restaurant = {
        _id: 'id123',
        name: 'Test Restaurant',
        ownerName: 'Owner',
        location: 'Location',
        contactNumber: '1234567890',
        availability: true,
        // Missing admin object
      };

      // WHEN
      const result = (service as any).sanitizeRestaurant(restaurant);

      // THEN
      expect(result).toEqual({
        id: 'id123',
        name: 'Test Restaurant',
        ownerName: 'Owner',
        location: 'Location',
        contactNumber: '1234567890',
        profilePicture: '',
        availability: true,
        admin: {
          email: undefined, // Missing nested property handled
        },
      });
    });
  });

  describe('getPublicRestaurants', () => {
    // 5 | getPublicRestaurants | happy | Successful restaurant list retrieval - core functionality
    it('should return list of public restaurants successfully', async () => {
      // GIVEN
      const mockRestaurants = [
        {
          id: '1',
          name: 'Restaurant 1',
          ownerName: 'Owner 1',
          location: 'Location 1',
          contactNumber: '1234567890',
          profilePicture: 'pic1.jpg',
          availability: true,
        },
      ];
      mockedAxios.get.mockResolvedValue({
        data: {
          data: {
            restaurants: mockRestaurants,
          },
        },
      });

      // WHEN
      const result = await service.getPublicRestaurants();

      // THEN
      expect(result).toEqual([
        {
          id: '1',
          name: 'Restaurant 1',
          ownerName: 'Owner 1',
          location: 'Location 1',
          contactNumber: '1234567890',
          profilePicture: 'pic1.jpg',
          availability: true,
          admin: { email: '' },
        },
      ]);
      expect(mockedAxios.get).toHaveBeenCalledWith(
        'http://localhost:5001/api/auth/restaurants/available',
      );
    });
  });

  describe('updateProfile', () => {
    // 6 | updateProfile | edge | File upload buffer handling - tests multer integration
    it('should handle file upload buffer correctly', async () => {
      // GIVEN
      const restaurantId = 'restaurant123';
      const dto = { name: 'New Name' };
      const file = {
        fieldname: 'profilePicture',
        originalname: 'test.jpg',
        encoding: '7bit',
        mimetype: 'image/jpeg',
        buffer: Buffer.from('test image data'),
        size: 12345,
        stream: null as any,
        destination: '',
        filename: 'test.jpg',
        path: '/tmp/test.jpg',
      };
      const authHeader = 'Bearer token';
      mockedAxios.patch.mockResolvedValue({
        data: {
          message: 'Updated successfully',
          data: {
            restaurant: {
              id: restaurantId,
              name: 'New Name',
              ownerName: 'Owner',
              location: 'Location',
              contactNumber: '1234567890',
              profilePicture: 'new-pic.jpg',
              availability: true,
              email: 'email@example.com',
            },
          },
        },
      });

      // WHEN
      const result = await service.updateProfile(
        restaurantId,
        dto,
        file,
        authHeader,
      );

      // THEN
      expect(result).toEqual({
        message: 'Updated successfully',
        restaurant: {
          id: restaurantId,
          name: 'New Name',
          ownerName: 'Owner',
          location: 'Location',
          contactNumber: '1234567890',
          profilePicture: 'new-pic.jpg',
          availability: true,
          admin: { email: '' },
        },
      });
    });
  });

  describe('getAllRestaurants', () => {
    // 7 | getAllRestaurants | error | Auth service malformed response - tests error parsing
    it('should handle malformed response from auth service', async () => {
      // GIVEN
      mockedAxios.get.mockResolvedValue({
        data: {
          data: null, // Malformed response
        },
      });

      // WHEN & THEN
      await expect(service.getAllRestaurants()).rejects.toThrow(
        'Failed to fetch all restaurants from auth service',
      );
    });
  });
});
