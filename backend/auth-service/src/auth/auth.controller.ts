import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CustomerRegisterDto } from './dto/customer-register.dto';
import { CustomerLoginDto } from './dto/customer-login.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { RequestUser } from '../common/interfaces/request-user.interface';

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
}
