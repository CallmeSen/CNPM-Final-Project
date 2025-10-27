import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { SuperAdmin, SuperAdminDocument } from '../schema/super-admin.schema';
import { RegisterSuperAdminDto } from './dto/register-super-admin.dto';
import { LoginSuperAdminDto } from './dto/login-super-admin.dto';
import { RestaurantsService } from '../restaurants/restaurants.service';

@Injectable()
export class SuperAdminService {
  constructor(
    @InjectModel(SuperAdmin.name)
    private superAdminModel: Model<SuperAdminDocument>,
    private jwtService: JwtService,
    private restaurantsService: RestaurantsService,
  ) {}

  async register(dto: RegisterSuperAdminDto) {
    const superAdmin = new this.superAdminModel({
      username: dto.username,
      email: dto.email,
      password: dto.password,
    });

    await superAdmin.save();

    const payload = {
      id: superAdmin._id,
      role: 'superAdmin',
    };

    const token = this.jwtService.sign(payload);

    return {
      message: 'Super Admin registered successfully',
      token,
      superAdmin: {
        id: superAdmin._id,
        username: superAdmin.username,
        email: superAdmin.email,
        role: superAdmin.role,
      },
    };
  }

  async login(dto: LoginSuperAdminDto) {
    const lookupFilter = dto.username
      ? { username: dto.username }
      : { email: dto.email };

    const superAdmin = await this.superAdminModel.findOne(lookupFilter);

    if (!superAdmin) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await (superAdmin as any).comparePassword(
      dto.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      id: superAdmin._id,
      role: 'superAdmin',
    };

    const token = this.jwtService.sign(payload);

    return {
      message: 'Login successful',
      token,
      superAdmin: {
        id: superAdmin._id,
        username: superAdmin.username,
        email: superAdmin.email,
        role: superAdmin.role,
      },
    };
  }

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
