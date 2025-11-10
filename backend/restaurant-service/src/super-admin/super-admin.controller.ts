import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { SuperAdminService } from './super-admin.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/enums/user-role.enum';

@Controller('superAdmin')
export class SuperAdminController {
  constructor(private readonly superAdminService: SuperAdminService) {}

  // Authentication endpoints removed - now handled by auth-service
  // POST /register -> auth-service: POST /api/auth/register/superadmin
  // POST /login -> auth-service: POST /api/auth/login/superadmin

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
