import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
import axios from 'axios';
import { FoodItem, FoodItemDocument } from '../schema/food-item.schema';
import { buildPublicFilePath } from '../common/config/multer.config';
import { CreateFoodItemDto } from './dto/create-food-item.dto';
import { UpdateFoodItemDto } from './dto/update-food-item.dto';

@Injectable()
export class FoodItemsService {
  private authServiceUrl: string;

  constructor(
    @InjectModel(FoodItem.name)
    private foodItemModel: Model<FoodItemDocument>,
    private readonly configService: ConfigService,
  ) {
    this.authServiceUrl = this.configService.get<string>('AUTH_SERVICE_URL') || 'http://localhost:5001';
  }

  // Helper method to verify restaurant exists in auth-service
  private async verifyRestaurantExists(restaurantId: string): Promise<void> {
    try {
      await axios.get(
        `${this.authServiceUrl}/api/auth/restaurant/profile/${restaurantId}`
      );
    } catch (error) {
      if (error.response?.status === 404) {
        throw new NotFoundException('Restaurant not found');
      }
      throw new BadRequestException('Failed to verify restaurant from auth service');
    }
  }

  async create(
    restaurantId: string,
    dto: CreateFoodItemDto,
    file?: Express.Multer.File,
  ) {
    // Verify restaurant exists in auth-service
    await this.verifyRestaurantExists(restaurantId);


    const imagePath = file ? buildPublicFilePath(file.filename) : undefined;

    const foodItem = new this.foodItemModel({
      restaurant: restaurantId,
      name: dto.name,
      description: dto.description,
      price: dto.price,
      category: dto.category,
      image: imagePath,
    });

    await foodItem.save();
    return {
      message: 'Food item created successfully',
      foodItem,
    };
  }

  async findByRestaurant(restaurantId: string) {
    return this.foodItemModel.find({ restaurant: restaurantId });
  }

  async findById(id: string) {
    const foodItem = await this.foodItemModel.findById(id);
    if (!foodItem) {
      throw new NotFoundException('Food item not found');
    }
    return foodItem;
  }

  async update(
    id: string,
    restaurantId: string,
    dto: UpdateFoodItemDto,
    file?: Express.Multer.File,
  ) {
    const foodItem = await this.foodItemModel.findById(id);
    if (!foodItem) {
      throw new NotFoundException('Food item not found');
    }

    if (foodItem.restaurant.toString() !== restaurantId) {
      throw new UnauthorizedException(
        'Not authorized to update this food item',
      );
    }

    const updateData: Record<string, unknown> = { ...dto };
    if (file) {
      updateData.image = buildPublicFilePath(file.filename);
    }

    const updated = await this.foodItemModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    return {
      message: 'Food item updated successfully',
      foodItem: updated,
    };
  }

  async delete(id: string, restaurantId: string) {
    const foodItem = await this.foodItemModel.findById(id);
    if (!foodItem) {
      throw new NotFoundException('Food item not found');
    }

    if (foodItem.restaurant.toString() !== restaurantId) {
      throw new UnauthorizedException(
        'Not authorized to delete this food item',
      );
    }

    await this.foodItemModel.findByIdAndDelete(id);
    return { message: 'Food item deleted successfully' };
  }

  async updateAvailability(
    id: string,
    restaurantId: string,
    availability: boolean,
  ) {
    const foodItem = await this.foodItemModel.findById(id);
    if (!foodItem) {
      throw new NotFoundException('Food item not found');
    }

    if (foodItem.restaurant.toString() !== restaurantId) {
      throw new UnauthorizedException(
        'Not authorized to update this food item availability',
      );
    }

    foodItem.availability = availability;
    await foodItem.save();

    return {
      message: 'Food item availability updated successfully',
      foodItem,
    };
  }

  async findAll() {
    return this.foodItemModel.find().populate('restaurant', 'name');
  }

  async findByRestaurantPublic(restaurantId: string) {
    return this.foodItemModel.find({ restaurant: restaurantId });
  }
}
