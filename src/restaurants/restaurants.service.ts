import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { RegisterRestaurantDto } from './dto/register-restaurant.dto';
import { LoginRestaurantDto } from './dto/login-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { UpdateAvailabilityDto } from './dto/update-availability.dto';
import { Restaurant, RestaurantDocument } from '../schema/restaurant.schema';
import { buildPublicFilePath } from '../common/config/multer.config';
import { UserRole } from '../common/enums/user-role.enum';

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
  constructor(
    @InjectModel(Restaurant.name)
    private readonly restaurantModel: Model<RestaurantDocument>,
    private readonly jwtService: JwtService,
  ) {}

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

  async register(
    dto: RegisterRestaurantDto,
    file?: Express.Multer.File,
  ): Promise<{ message: string; restaurant: SanitizedRestaurant }> {
    const existing = await this.restaurantModel.findOne({
      $or: [{ name: dto.name }, { 'admin.email': dto.email }],
    });

    if (existing) {
      throw new BadRequestException('Restaurant or email already exists');
    }

    const restaurant = await this.restaurantModel.create({
      name: dto.name,
      ownerName: dto.ownerName,
      location: dto.location,
      contactNumber: dto.contactNumber,
      profilePicture: file ? buildPublicFilePath(file.filename) : '',
      admin: {
        email: dto.email,
        password: dto.password,
      },
    });

    return {
      message: 'Restaurant and admin registered successfully',
      restaurant: this.sanitizeRestaurant(restaurant),
    };
  }

  async login(dto: LoginRestaurantDto): Promise<{ token: string }> {
    const restaurant = await this.restaurantModel.findOne({
      'admin.email': dto.email,
    });
    if (!restaurant) {
      throw new BadRequestException('Invalid credentials');
    }

    const isPasswordValid = await restaurant.compareAdminPassword(dto.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid credentials');
    }

    const payload = {
      sub: restaurant._id.toString(),
      restaurantId: restaurant._id.toString(),
      role: UserRole.RESTAURANT,
      email: restaurant.admin.email,
    };

    const token = await this.jwtService.signAsync(payload);
    return { token };
  }

  async getProfile(restaurantId: string): Promise<SanitizedRestaurant> {
    const restaurant = await this.restaurantModel.findById(restaurantId);
    if (!restaurant) {
      throw new NotFoundException('Restaurant not found');
    }

    return this.sanitizeRestaurant(restaurant);
  }

  async updateProfile(
    restaurantId: string,
    dto: UpdateRestaurantDto,
    file?: Express.Multer.File,
  ): Promise<{ message: string; restaurant: SanitizedRestaurant }> {
    const restaurant = await this.restaurantModel.findById(restaurantId);
    if (!restaurant) {
      throw new NotFoundException('Restaurant not found');
    }

    if (dto.name) restaurant.name = dto.name;
    if (dto.ownerName) restaurant.ownerName = dto.ownerName;
    if (dto.location) restaurant.location = dto.location;
    if (dto.contactNumber) restaurant.contactNumber = dto.contactNumber;
    if (file) {
      restaurant.profilePicture = buildPublicFilePath(file.filename);
    }

    await restaurant.save();

    return {
      message: 'Profile updated successfully',
      restaurant: this.sanitizeRestaurant(restaurant),
    };
  }

  async updateAvailability(
    restaurantId: string,
    dto: UpdateAvailabilityDto,
  ): Promise<{ message: string; availability: boolean }> {
    const restaurant = await this.restaurantModel.findById(restaurantId);
    if (!restaurant) {
      throw new NotFoundException('Restaurant not found');
    }

    restaurant.availability = dto.availability;
    await restaurant.save();

    return {
      message: `Restaurant is now ${dto.availability ? 'Open' : 'Closed'}`,
      availability: restaurant.availability,
    };
  }

  async getPublicRestaurants(): Promise<SanitizedRestaurant[]> {
    const restaurants = await this.restaurantModel
      .find({ availability: true })
      .sort({ createdAt: -1 })
      .lean();

    return restaurants.map((restaurant) =>
      this.sanitizeRestaurant(restaurant as any),
    );
  }

  async getAllRestaurants(): Promise<SanitizedRestaurant[]> {
    const restaurants = await this.restaurantModel
      .find()
      .sort({ createdAt: -1 })
      .lean();
    return restaurants.map((restaurant) =>
      this.sanitizeRestaurant(restaurant as any),
    );
  }

  async getRestaurantById(id: string): Promise<SanitizedRestaurant> {
    const restaurant = await this.restaurantModel.findById(id);
    if (!restaurant) {
      throw new NotFoundException('Restaurant not found');
    }

    return this.sanitizeRestaurant(restaurant);
  }

  async deleteRestaurant(id: string): Promise<{ message: string }> {
    const restaurant = await this.restaurantModel.findById(id);
    if (!restaurant) {
      throw new NotFoundException('Restaurant not found');
    }

    await restaurant.deleteOne();
    return { message: 'Restaurant deleted successfully' };
  }

  async updateRestaurant(
    id: string,
    dto: UpdateRestaurantDto,
  ): Promise<{ message: string; restaurant: SanitizedRestaurant }> {
    const restaurant = await this.restaurantModel.findById(id);
    if (!restaurant) {
      throw new NotFoundException('Restaurant not found');
    }

    if (dto.name) restaurant.name = dto.name;
    if (dto.ownerName) restaurant.ownerName = dto.ownerName;
    if (dto.location) restaurant.location = dto.location;
    if (dto.contactNumber) restaurant.contactNumber = dto.contactNumber;

    await restaurant.save();

    return {
      message: 'Restaurant updated successfully',
      restaurant: this.sanitizeRestaurant(restaurant),
    };
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
