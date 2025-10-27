import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FoodItemsController } from './food-items.controller';
import { FoodItemsService } from './food-items.service';
import { FoodItem, FoodItemSchema } from '../schema/food-item.schema';
import { Restaurant, RestaurantSchema } from '../schema/restaurant.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FoodItem.name, schema: FoodItemSchema },
      { name: Restaurant.name, schema: RestaurantSchema },
    ]),
  ],
  controllers: [FoodItemsController],
  providers: [FoodItemsService],
  exports: [FoodItemsService],
})
export class FoodItemsModule {}
