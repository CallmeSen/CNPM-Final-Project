import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UnauthorizedException,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { RestaurantsService } from './restaurants.service';
import { RegisterRestaurantDto } from './dto/register-restaurant.dto';
import { LoginRestaurantDto } from './dto/login-restaurant.dto';
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

  @Post('register')
  @UseInterceptors(FileInterceptor('profilePicture', imageUploadConfig))
  register(
    @Body() dto: RegisterRestaurantDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.restaurantsService.register(dto, file);
  }

  @Post('login')
  login(@Body() dto: LoginRestaurantDto) {
    return this.restaurantsService.login(dto);
  }

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
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const restaurantId = this.ensureRestaurant(user);
    return this.restaurantsService.updateProfile(restaurantId, dto, file);
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
