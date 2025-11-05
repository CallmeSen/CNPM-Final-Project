import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer, CustomerDocument } from '../../schemas/customer.schema';
import { Admin, AdminDocument } from '../../schemas/admin.schema';
import { Restaurant, RestaurantDocument } from '../../schemas/restaurant.schema';
import { SuperAdmin, SuperAdminDocument } from '../../schemas/super-admin.schema';
import {
  DeliveryPersonnel,
  DeliveryPersonnelDocument,
} from '../../schemas/delivery-personnel.schema';
import { RequestUser } from '../interfaces/request-user.interface';
import { Role } from '../decorators/roles.decorator';

interface JwtPayload {
  sub?: string;
  id?: string;
  role: Role;
  email?: string;
  name?: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    @InjectModel(Customer.name)
    private readonly customerModel: Model<CustomerDocument>,
    @InjectModel(Admin.name)
    private readonly adminModel: Model<AdminDocument>,
    @InjectModel(Restaurant.name)
    private readonly restaurantModel: Model<RestaurantDocument>,
    @InjectModel(SuperAdmin.name)
    private readonly superAdminModel: Model<SuperAdminDocument>,
    @InjectModel(DeliveryPersonnel.name)
    private readonly deliveryPersonnelModel: Model<DeliveryPersonnelDocument>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: JwtPayload): Promise<RequestUser> {
    const role = payload.role;
    const userId = payload.sub || payload.id;

    if (!userId) {
      throw new UnauthorizedException('Invalid token payload');
    }

    if (role === 'superAdmin' || role === 'super-admin') {
      return {
        userId,
        role,
        email: payload.email,
        name: payload.name,
      };
    }

    switch (role) {
      case 'customer': {
        const customer = await this.customerModel.findById(userId);
        if (!customer) {
          throw new UnauthorizedException('Customer not found');
        }
        return {
          userId,
          role,
          email: customer.email,
          name: `${customer.firstName} ${customer.lastName}`.trim(),
        };
      }
      case 'admin': {
        const admin = await this.adminModel.findById(userId);
        if (!admin) {
          throw new UnauthorizedException('Admin not found');
        }
        return {
          userId,
          role,
          email: admin.email,
          name: `${admin.firstName} ${admin.lastName}`.trim(),
        };
      }
      case 'restaurant': {
        const restaurant = await this.restaurantModel.findById(userId);
        if (!restaurant) {
          throw new UnauthorizedException('Restaurant not found');
        }
        return {
          userId,
          role,
          email: restaurant.admin.email,
          name: restaurant.ownerName,
        };
      }
      case 'delivery': {
        const deliveryPerson =
          await this.deliveryPersonnelModel.findById(userId);
        if (!deliveryPerson) {
          throw new UnauthorizedException('Delivery personnel not found');
        }
        return {
          userId,
          role,
          email: deliveryPerson.email,
          name: `${deliveryPerson.firstName} ${deliveryPerson.lastName}`.trim(),
        };
      }
      default:
        throw new UnauthorizedException('Unsupported role in token');
    }
  }
}
