import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SuperAdmin, SuperAdminDocument } from '../schema/super-admin.schema';
import { RestaurantsService } from '../restaurants/restaurants.service';

@Injectable()
export class SuperAdminService {
  constructor(
    @InjectModel(SuperAdmin.name)
    private superAdminModel: Model<SuperAdminDocument>,
    private restaurantsService: RestaurantsService,
  ) {}

  // Authentication methods removed - now handled by auth-service
  // register() -> auth-service: registerSuperAdmin()
  // login() -> auth-service: loginSuperAdmin()

  async getAllRestaurants() {
    return this.restaurantsService.getAllForAdmin();
  }

  async getRestaurantById(id: string) {
    return this.restaurantsService.getByIdForAdmin(id);
  }

  async deleteRestaurant(id: string) {
    return this.restaurantsService.deleteByAdmin(id);
  }

  async updateRestaurantStatus(id: string, status: string) {
    return this.restaurantsService.updateStatusByAdmin(id, status);
  }
}
