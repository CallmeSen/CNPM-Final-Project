import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FoodItem, FoodItemDocument } from '../schema/food-item.schema';
import { Restaurant, RestaurantDocument } from '../schema/restaurant.schema';
import { CreateFoodItemDto } from './dto/create-food-item.dto';
import { UpdateFoodItemDto } from './dto/update-food-item.dto';

@Injectable()
export class FoodItemsService {
  constructor(
    @InjectModel(FoodItem.name)
    private foodItemModel: Model<FoodItemDocument>,
    @InjectModel(Restaurant.name)
    private restaurantModel: Model<RestaurantDocument>,
  ) {}

  async create(
    restaurantId: string,
    dto: CreateFoodItemDto,
    file?: Express.Multer.File,
  ) {
    const restaurant = await this.restaurantModel.findById(restaurantId);
    if (!restaurant) {
      throw new NotFoundException('Restaurant not found');
    }

    const foodItem = new this.foodItemModel({
      restaurant: restaurantId,
      name: dto.name,
      description: dto.description,
      price: dto.price,
      category: dto.category,
      image: file ? `/uploads/${file.filename}` : undefined,
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

    const updateData: any = { ...dto };
    if (file) {
      updateData.image = `/uploads/${file.filename}`;
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
