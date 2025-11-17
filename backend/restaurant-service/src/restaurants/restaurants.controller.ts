import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Put,
  UploadedFile,
  UnauthorizedException,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { RestaurantsService } from './restaurants.service';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { UpdateAvailabilityDto } from './dto/update-availability.dto';
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

@Controller('restaurant')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  private ensureRestaurant(user?: AuthenticatedUser) {
    if (!user?.restaurantId) {
      throw new UnauthorizedException('Restaurant context missing from token');
    }

    return user.restaurantId;
  }

  // Authentication endpoints removed - now handled by auth-service
  // POST /register -> auth-service: POST /api/auth/register/restaurant
  // POST /login -> auth-service: POST /api/auth/login/restaurant

  @Get('all')
  getPublicRestaurants() {
    return this.restaurantsService.getPublicRestaurants();
  }

  @Get('details/:id')
  async getRestaurantDetails(@Param('id') id: string) {
    const restaurant = await this.restaurantsService.getRestaurantById(id);
    return {
      message: 'Restaurant fetched successfully',
      restaurant,
    };
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.RESTAURANT)
  getProfile(@GetUser() user: AuthenticatedUser) {
    const restaurantId = this.ensureRestaurant(user);
    return this.restaurantsService.getProfile(restaurantId);
  }

  @Put('update')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.RESTAURANT)
  @UseInterceptors(FileInterceptor('profilePicture', imageUploadConfig))
  updateProfile(
    @GetUser() user: AuthenticatedUser,
    @Body() dto: UpdateRestaurantDto,
    @Headers('authorization') authHeader: string,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const restaurantId = this.ensureRestaurant(user);
    return this.restaurantsService.updateProfile(
      restaurantId,
      dto,
      file,
      authHeader,
    );
  }

  @Put('availability')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.RESTAURANT)
  updateAvailability(
    @GetUser() user: AuthenticatedUser,
    @Body() dto: UpdateAvailabilityDto,
  ) {
    const restaurantId = this.ensureRestaurant(user);
    return this.restaurantsService.updateAvailability(restaurantId, dto);
  }
}
