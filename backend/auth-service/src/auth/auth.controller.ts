import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
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
  constructor(private readonly authService: AuthService) {}

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
      ? `http://localhost:5001/uploads/${file.filename}`
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
}
