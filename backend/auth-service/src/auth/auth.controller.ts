import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AuthService } from './auth.service';
import { CustomerRegisterDto } from './dto/customer-register.dto';
import { CustomerLoginDto } from './dto/customer-login.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { RegisterRestaurantDto } from './dto/register-restaurant.dto';
import { LoginRestaurantDto } from './dto/login-restaurant.dto';
import { RegisterSuperAdminDto } from './dto/register-super-admin.dto';
import { LoginSuperAdminDto } from './dto/login-super-admin.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { RequestUser } from '../common/interfaces/request-user.interface';

const multerConfig = {
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const ext = extname(file.originalname);
      cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
};

@Controller('auth')
export class AuthController {
  private authServiceUrl: string;

  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {
    const port = this.configService.get<number>('AUTH_PORT') || 5001;
    this.authServiceUrl = `http://localhost:${port}`;
  }

  @Post('register/customer')
  async registerCustomer(@Body() dto: CustomerRegisterDto) {
    const result = await this.authService.registerCustomer(dto);
    return {
      status: 'success',
      token: result.token,
      data: { customer: result.customer },
    };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async loginCustomer(@Body() dto: CustomerLoginDto) {
    const result = await this.authService.loginCustomer(dto);
    return {
      status: 'success',
      token: result.token,
      data: { customer: result.customer },
    };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('customer')
  @Get('customer/profile')
  async getProfile(@Request() req: { user: RequestUser }) {
    const customer = await this.authService.getProfile(req.user.userId);
    return {
      status: 'success',
      data: { customer },
    };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('customer')
  @Patch('customer/profile')
  async updateProfile(
    @Request() req: { user: RequestUser },
    @Body() dto: UpdateCustomerDto,
  ) {
    const customer = await this.authService.updateProfile(req.user.userId, dto);
    return {
      status: 'success',
      data: { customer },
    };
  }

  // Restaurant authentication endpoints
  @Post('register/restaurant')
  @UseInterceptors(FileInterceptor('profilePicture', multerConfig))
  async registerRestaurant(
    @Body() dto: RegisterRestaurantDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const profilePicture = file
      ? `/uploads/${file.filename}`
      : '';
    const result = await this.authService.registerRestaurant(
      dto,
      profilePicture,
    );
    return {
      status: 'success',
      message: result.message,
      token: result.token,
      data: { restaurant: result.restaurant },
    };
  }

  @Post('login/restaurant')
  @HttpCode(HttpStatus.OK)
  async loginRestaurant(@Body() dto: LoginRestaurantDto) {
    const result = await this.authService.loginRestaurant(dto);
    return {
      status: 'success',
      message: result.message,
      token: result.token,
      data: { restaurant: result.restaurant },
    };
  }

  // SuperAdmin authentication endpoints
  @Post('register/superadmin')
  async registerSuperAdmin(@Body() dto: RegisterSuperAdminDto) {
    const result = await this.authService.registerSuperAdmin(dto);
    return {
      status: 'success',
      message: result.message,
      token: result.token,
      data: { superAdmin: result.superAdmin },
    };
  }

  @Post('login/superadmin')
  @HttpCode(HttpStatus.OK)
  async loginSuperAdmin(@Body() dto: LoginSuperAdminDto) {
    const result = await this.authService.loginSuperAdmin(dto);
    return {
      status: 'success',
      message: result.message,
      token: result.token,
      data: { superAdmin: result.superAdmin },
    };
  }

  // Get restaurant profile by ID (for restaurant-service to call)
  @Get('restaurant/profile/:id')
  async getRestaurantProfile(@Request() req: any) {
    const restaurantId = req.params.id;
    const restaurant =
      await this.authService.getRestaurantProfile(restaurantId);
    return {
      status: 'success',
      data: { restaurant },
    };
  }

  // Get superadmin profile by ID (for restaurant-service to call)
  @Get('superadmin/profile/:id')
  async getSuperAdminProfile(@Request() req: any) {
    const superAdminId = req.params.id;
    const superAdmin =
      await this.authService.getSuperAdminProfile(superAdminId);
    return {
      status: 'success',
      data: { superAdmin },
    };
  }

  // Get all restaurants (public endpoint for customers)
  @Get('restaurants')
  async getAllRestaurants() {
    const restaurants = await this.authService.getAllRestaurants();
    return {
      status: 'success',
      data: { restaurants },
    };
  }

  // Get available restaurants only (for customer view)
  @Get('restaurants/available')
  async getAvailableRestaurants() {
    const restaurants = await this.authService.getAvailableRestaurants();
    return {
      status: 'success',
      data: { restaurants },
    };
  }

  // Update restaurant profile (Restaurant owner only)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('restaurant')
  @Patch('restaurant/profile/:id')
  @UseInterceptors(FileInterceptor('profilePicture', multerConfig))
  async updateRestaurantProfile(
    @Param('id') restaurantId: string,
    @Body() updateData: {
      name?: string;
      ownerName?: string;
      location?: string;
      contactNumber?: string;
    },
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const profilePictureUrl = file
      ? `/uploads/${file.filename}`
      : undefined;

    const result = await this.authService.updateRestaurantProfile(
      restaurantId,
      updateData,
      profilePictureUrl,
    );

    return {
      status: 'success',
      message: result.message,
      data: { restaurant: result.restaurant },
    };
  }

  // Update restaurant availability (SuperAdmin only)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('superAdmin')
  @Patch('restaurants/:id/availability')
  async updateRestaurantAvailability(
    @Request() req: any,
    @Body() body: { availability: boolean },
  ) {
    const restaurantId = req.params.id;
    const result = await this.authService.updateRestaurantAvailability(
      restaurantId,
      body.availability,
    );
    return {
      status: 'success',
      message: result.message,
      data: { restaurant: result.restaurant },
    };
  }

  // Delete restaurant (SuperAdmin only)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('superAdmin')
  @Post('restaurants/:id/delete')
  async deleteRestaurant(@Request() req: any) {
    const restaurantId = req.params.id;
    const result = await this.authService.deleteRestaurant(restaurantId);
    return {
      status: 'success',
      message: result.message,
    };
  }
}
