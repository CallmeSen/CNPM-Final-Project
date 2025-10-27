import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { SuperAdminService } from './super-admin.service';
import { RegisterSuperAdminDto } from './dto/register-super-admin.dto';
import { LoginSuperAdminDto } from './dto/login-super-admin.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/enums/user-role.enum';

@Controller('superAdmin')
export class SuperAdminController {
  constructor(private readonly superAdminService: SuperAdminService) {}

  @Post('register')
  register(@Body() dto: RegisterSuperAdminDto) {
    return this.superAdminService.register(dto);
  }

  @Post('login')
  login(@Body() dto: LoginSuperAdminDto) {
    return this.superAdminService.login(dto);
  }

  @Get('restaurants')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN)
  getAllRestaurants() {
    return this.superAdminService.getAllRestaurants();
  }

  @Get('restaurants/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN)
  getRestaurantById(@Param('id') id: string) {
    return this.superAdminService.getRestaurantById(id);
  }

  @Delete('restaurants/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN)
  deleteRestaurant(@Param('id') id: string) {
    return this.superAdminService.deleteRestaurant(id);
  }

  @Put('restaurants/:id/status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN)
  updateRestaurantStatus(
    @Param('id') id: string,
    @Body('status') status: string,
  ) {
    return this.superAdminService.updateRestaurantStatus(id, status);
  }

  @Get('restaurants/list/all')
  listAllRestaurants() {
    return this.superAdminService.getAllRestaurants();
  }
}
