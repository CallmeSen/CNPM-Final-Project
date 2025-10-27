import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UnauthorizedException,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FoodItemsService } from './food-items.service';
import { CreateFoodItemDto } from './dto/create-food-item.dto';
import { UpdateFoodItemDto } from './dto/update-food-item.dto';
import { imageUploadConfig } from '../common/config/multer.config';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/enums/user-role.enum';
import { GetUser } from '../common/decorators/get-user.decorator';

interface AuthenticatedUser {
  restaurantId?: string;
  [key: string]: unknown;
}

@Controller('food-items')
export class FoodItemsController {
  constructor(private readonly foodItemsService: FoodItemsService) {}

  private ensureRestaurant(user?: AuthenticatedUser) {
    if (!user?.restaurantId) {
      throw new UnauthorizedException('Restaurant context missing from token');
    }
    return user.restaurantId;
  }

  @Post('create')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.RESTAURANT)
  @UseInterceptors(FileInterceptor('image', imageUploadConfig))
  create(
    @GetUser() user: AuthenticatedUser,
    @Body() dto: CreateFoodItemDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const restaurantId = this.ensureRestaurant(user);
    return this.foodItemsService.create(restaurantId, dto, file);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.RESTAURANT)
  findByRestaurant(@GetUser() user: AuthenticatedUser) {
    const restaurantId = this.ensureRestaurant(user);
    return this.foodItemsService.findByRestaurant(restaurantId);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.RESTAURANT)
  @UseInterceptors(FileInterceptor('image', imageUploadConfig))
  update(
    @Param('id') id: string,
    @GetUser() user: AuthenticatedUser,
    @Body() dto: UpdateFoodItemDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const restaurantId = this.ensureRestaurant(user);
    return this.foodItemsService.update(id, restaurantId, dto, file);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.RESTAURANT)
  delete(@Param('id') id: string, @GetUser() user: AuthenticatedUser) {
    const restaurantId = this.ensureRestaurant(user);
    return this.foodItemsService.delete(id, restaurantId);
  }

  @Put(':id/availability')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.RESTAURANT)
  updateAvailability(
    @Param('id') id: string,
    @GetUser() user: AuthenticatedUser,
    @Body('availability') availability: boolean,
  ) {
    const restaurantId = this.ensureRestaurant(user);
    return this.foodItemsService.updateAvailability(
      id,
      restaurantId,
      availability,
    );
  }

  @Get('all')
  findAll() {
    return this.foodItemsService.findAll();
  }

  @Get('restaurant/:restaurantId')
  findByRestaurantPublic(@Param('restaurantId') restaurantId: string) {
    return this.foodItemsService.findByRestaurantPublic(restaurantId);
  }
}
