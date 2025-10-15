import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer, CustomerDocument } from '../schemas/customer.schema';
import { Admin, AdminDocument } from '../schemas/admin.schema';
import {
  RestaurantAdmin,
  RestaurantAdminDocument,
} from '../schemas/restaurant-admin.schema';
import {
  DeliveryPersonnel,
  DeliveryPersonnelDocument,
} from '../schemas/delivery-personnel.schema';
import { CreateUserDto, ManagedUserType } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserQueryDto } from './dto/user-query.dto';
import { UpdatePermissionsDto } from './dto/update-permissions.dto';

export interface ManagedUserResponse {
  message: string;
  user?: Record<string, unknown>;
}

@Injectable()
export class UserManagementService {
  constructor(
    @InjectModel(Customer.name)
    private readonly customerModel: Model<CustomerDocument>,
    @InjectModel(Admin.name)
    private readonly adminModel: Model<AdminDocument>,
    @InjectModel(RestaurantAdmin.name)
    private readonly restaurantAdminModel: Model<RestaurantAdminDocument>,
    @InjectModel(DeliveryPersonnel.name)
    private readonly deliveryModel: Model<DeliveryPersonnelDocument>,
  ) {}

  async getAllUsers(query: UserQueryDto) {
    const results: Record<string, unknown>[] = [];
    const { userType } = query;

    if (!userType || userType === 'customer') {
      const customers = await this.customerModel.find().select('-password');
      results.push(
        ...customers.map((customer) => ({
          ...customer.toObject(),
          userType: 'customer',
        })),
      );
    }

    if (!userType || userType === 'admin') {
      const admins = await this.adminModel.find().select('-password');
      results.push(
        ...admins.map((admin) => ({
          ...admin.toObject(),
          userType: 'admin',
        })),
      );
    }

    if (!userType || userType === 'restaurant') {
      const restaurantAdmins = await this.restaurantAdminModel
        .find()
        .select('-password');
      results.push(
        ...restaurantAdmins.map((admin) => ({
          ...admin.toObject(),
          userType: 'restaurant',
        })),
      );
    }

    if (!userType || userType === 'delivery') {
      const delivery = await this.deliveryModel.find().select('-password');
      results.push(
        ...delivery.map((person) => ({
          ...person.toObject(),
          userType: 'delivery',
        })),
      );
    }

    return results;
  }

  async createUser(dto: CreateUserDto): Promise<ManagedUserResponse> {
    const { userType, ...payload } = dto;

    const model = this.resolveModel(userType);
    const existing = await model.findOne({ email: dto.email });
    if (existing) {
      throw new BadRequestException(
        `${this.label(userType)} with this email already exists`,
      );
    }

    const created = await model.create(payload);
    const user = created.toObject();
    delete user.password;

    return {
      message: `${userType} created successfully`,
      user: { ...user, userType },
    };
  }

  async updateUser(
    id: string,
    dto: UpdateUserDto,
  ): Promise<ManagedUserResponse> {
    const { userType, password, ...updatePayload } = dto;
    const model = this.resolveModel(userType);

    const user = await model.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (password === '') {
      // ignore empty string
    } else if (password) {
      (user as any).password = password;
    }

    Object.entries(updatePayload).forEach(([key, value]) => {
      if (typeof value !== 'undefined') {
        (user as any)[key] = value;
      }
    });

    await user.save();
    const updated = user.toObject();
    delete updated.password;

    return {
      message: 'User updated successfully',
      user: { ...updated, userType },
    };
  }

  async deleteUser(id: string, userType: ManagedUserType) {
    const model = this.resolveModel(userType);
    const deleted = await model.findByIdAndDelete(id);
    if (!deleted) {
      throw new NotFoundException('User not found');
    }
    return { message: 'User deleted successfully' };
  }

  async getUserLogs(id: string) {
    const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000);
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);

    return [
      {
        id: '1',
        userId: id,
        action: 'login',
        timestamp: twoHoursAgo,
        ipAddress: '192.168.1.100',
        status: 'success',
      },
      {
        id: '2',
        userId: id,
        action: 'update_profile',
        timestamp: oneDayAgo,
        ipAddress: '192.168.1.100',
        status: 'success',
      },
      {
        id: '3',
        userId: id,
        action: 'failed_login',
        timestamp: threeDaysAgo,
        ipAddress: '192.168.1.105',
        status: 'failed',
        suspicious: true,
      },
    ];
  }

  async updatePermissions(id: string, dto: UpdatePermissionsDto) {
    const admin = await this.adminModel.findById(id);
    if (!admin) {
      throw new NotFoundException('Admin not found');
    }

    admin.permissions = dto.permissions;
    await admin.save();

    const result = admin.toObject();
    delete result.password;

    return {
      message: 'Permissions updated successfully',
      admin: result,
    };
  }

  private resolveModel(userType: ManagedUserType): Model<any> {
    switch (userType) {
      case 'customer':
        return this.customerModel;
      case 'admin':
        return this.adminModel;
      case 'restaurant':
        return this.restaurantAdminModel;
      case 'delivery':
        return this.deliveryModel;
      default:
        throw new BadRequestException('Invalid user type');
    }
  }

  private label(userType: ManagedUserType) {
    switch (userType) {
      case 'customer':
        return 'Customer';
      case 'admin':
        return 'Admin';
      case 'restaurant':
        return 'Restaurant admin';
      case 'delivery':
        return 'Delivery personnel';
      default:
        return 'User';
    }
  }
}
