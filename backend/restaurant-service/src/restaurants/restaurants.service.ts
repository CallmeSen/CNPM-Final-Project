import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { UpdateAvailabilityDto } from './dto/update-availability.dto';
import { Restaurant, RestaurantDocument } from '../schema/restaurant.schema';
import { buildPublicFilePath } from '../common/config/multer.config';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import * as FormData from 'form-data';

export interface SanitizedRestaurant {
  id: string;
  name: string;
  ownerName: string;
  location: string;
  contactNumber: string;
  profilePicture: string;
  availability: boolean;
  admin: {
    email: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

@Injectable()
export class RestaurantsService {
  private authServiceUrl: string;

  constructor(
    @InjectModel(Restaurant.name)
    private readonly restaurantModel: Model<RestaurantDocument>,
    private readonly configService: ConfigService,
  ) {
    this.authServiceUrl = this.configService.get<string>('AUTH_SERVICE_URL') || 'http://localhost:5001';
  }

  private sanitizeRestaurant(
    restaurant:
      | RestaurantDocument
      | (Restaurant & { _id: unknown; createdAt?: Date; updatedAt?: Date }),
  ): SanitizedRestaurant {
    const plain =
      typeof (restaurant as any).toObject === 'function'
        ? (restaurant as any).toObject()
        : restaurant;

    return {
      id: plain._id.toString(),
      name: plain.name,
      ownerName: plain.ownerName,
      location: plain.location,
      contactNumber: plain.contactNumber,
      profilePicture: plain.profilePicture ?? '',
      availability: plain.availability,
      admin: {
        email: plain.admin?.email,
      },
      createdAt: plain.createdAt,
      updatedAt: plain.updatedAt,
    };
  }

  // Authentication methods removed - now handled by auth-service
  // register() -> auth-service: registerRestaurant()
  // login() -> auth-service: loginRestaurant()

  // Helper method to fetch restaurant profile from auth-service
  private async fetchRestaurantFromAuthService(restaurantId: string): Promise<any> {
    try {
      const response = await axios.get(
        `${this.authServiceUrl}/api/auth/restaurant/profile/${restaurantId}`
      );
      return response.data.data.restaurant;
    } catch (error) {
      if (error.response?.status === 404) {
        throw new NotFoundException('Restaurant not found');
      }
      throw new BadRequestException('Failed to fetch restaurant profile from auth service');
    }
  }

  async getProfile(restaurantId: string): Promise<SanitizedRestaurant> {
    const restaurant = await this.fetchRestaurantFromAuthService(restaurantId);
    
    return {
      id: restaurant.id,
      name: restaurant.name,
      ownerName: restaurant.ownerName,
      location: restaurant.location,
      contactNumber: restaurant.contactNumber,
      profilePicture: restaurant.profilePicture || '',
      availability: restaurant.availability,
      admin: {
        email: restaurant.email,
      },
    };
  }

  async updateProfile(
    restaurantId: string,
    dto: UpdateRestaurantDto,
    file?: Express.Multer.File,
    authHeader?: string,
  ): Promise<{ message: string; restaurant: SanitizedRestaurant }> {
    try {
      const formData = new FormData();
      
      // Add text fields
      if (dto.name) formData.append('name', dto.name);
      if (dto.ownerName) formData.append('ownerName', dto.ownerName);
      if (dto.location) formData.append('location', dto.location);
      if (dto.contactNumber) formData.append('contactNumber', dto.contactNumber);
      
      // Add file if provided
      if (file) {
        formData.append('profilePicture', file.buffer, {
          filename: file.originalname,
          contentType: file.mimetype,
        });
      }

      const headers: any = {
        ...formData.getHeaders(),
      };

      // Forward the authorization header if provided
      if (authHeader) {
        headers['authorization'] = authHeader;
      }

      const response = await axios.patch(
        `${this.authServiceUrl}/api/auth/restaurant/profile/${restaurantId}`,
        formData,
        { headers },
      );

      const restaurant = response.data.data.restaurant;
      
      return {
        message: response.data.message,
        restaurant: {
          id: restaurant.id,
          name: restaurant.name,
          ownerName: restaurant.ownerName,
          location: restaurant.location,
          contactNumber: restaurant.contactNumber,
          profilePicture: restaurant.profilePicture,
          availability: restaurant.availability,
          admin: { email: '' },
        },
      };
    } catch (error) {
      if (error.response?.status === 404) {
        throw new NotFoundException('Restaurant not found');
      }
      // Log the actual error for debugging
      console.error('Error updating restaurant profile:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
      
      const errorMessage = error.response?.data?.message || error.message || 'Failed to update restaurant profile';
      throw new BadRequestException(errorMessage);
    }
  }

  async updateAvailability(
    restaurantId: string,
    dto: UpdateAvailabilityDto,
  ): Promise<{ message: string; availability: boolean }> {
    // TODO: Implement update API in auth-service
    throw new BadRequestException('Update availability feature will be available soon. Please contact auth-service admin.');
  }

  async getPublicRestaurants(): Promise<SanitizedRestaurant[]> {
    try {
      const response = await axios.get(
        `${this.authServiceUrl}/api/auth/restaurants/available`
      );
      const restaurants = response.data.data.restaurants;
      
      return restaurants.map((r: any) => ({
        id: r.id,
        name: r.name,
        ownerName: r.ownerName,
        location: r.location,
        contactNumber: r.contactNumber,
        profilePicture: r.profilePicture,
        availability: r.availability,
        admin: { email: '' },
      }));
    } catch (error) {
      throw new BadRequestException('Failed to fetch available restaurants from auth service');
    }
  }

  async getAllRestaurants(): Promise<SanitizedRestaurant[]> {
    try {
      const response = await axios.get(
        `${this.authServiceUrl}/api/auth/restaurants`
      );
      const restaurants = response.data.data.restaurants;
      
      return restaurants.map((r: any) => ({
        id: r.id,
        name: r.name,
        ownerName: r.ownerName,
        location: r.location,
        contactNumber: r.contactNumber,
        profilePicture: r.profilePicture,
        availability: r.availability,
        admin: { email: '' },
      }));
    } catch (error) {
      throw new BadRequestException('Failed to fetch all restaurants from auth service');
    }
  }

  async getRestaurantById(id: string): Promise<SanitizedRestaurant> {
    return this.getProfile(id); // Reuse getProfile which calls auth-service
  }

  async deleteRestaurant(id: string): Promise<{ message: string }> {
    // TODO: Implement delete API in auth-service
    throw new BadRequestException('Delete restaurant feature will be available soon. Please contact auth-service admin.');
  }

  async updateRestaurant(
    id: string,
    dto: UpdateRestaurantDto,
  ): Promise<{ message: string; restaurant: SanitizedRestaurant }> {
    // TODO: Implement update API in auth-service
    throw new BadRequestException('Update restaurant feature will be available soon. Please contact auth-service admin.');
  }

  async getAllForAdmin(): Promise<SanitizedRestaurant[]> {
    return this.getAllRestaurants();
  }

  async getByIdForAdmin(id: string): Promise<SanitizedRestaurant> {
    return this.getRestaurantById(id);
  }

  async deleteByAdmin(id: string): Promise<{ message: string }> {
    return this.deleteRestaurant(id);
  }

  async updateStatusByAdmin(id: string, status: string) {
    const availability = status?.toLowerCase() === 'open';
    return this.updateAvailability(id, { availability });
  }
}
