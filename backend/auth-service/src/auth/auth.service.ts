import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { Customer, CustomerDocument } from '../schemas/customer.schema';
import { Restaurant, RestaurantDocument } from '../schemas/restaurant.schema';
import { SuperAdmin, SuperAdminDocument } from '../schemas/super-admin.schema';
import { CustomerRegisterDto } from './dto/customer-register.dto';
import { CustomerLoginDto } from './dto/customer-login.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { RegisterRestaurantDto } from './dto/register-restaurant.dto';
import { LoginRestaurantDto } from './dto/login-restaurant.dto';
import { RegisterSuperAdminDto } from './dto/register-super-admin.dto';
import { LoginSuperAdminDto } from './dto/login-super-admin.dto';

interface CustomerAuthPayload {
  token: string;
  customer: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    location?: string;
  };
}

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Customer.name)
    private readonly customerModel: Model<CustomerDocument>,
    @InjectModel(Restaurant.name)
    private readonly restaurantModel: Model<RestaurantDocument>,
    @InjectModel(SuperAdmin.name)
    private readonly superAdminModel: Model<SuperAdminDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async registerCustomer(
    dto: CustomerRegisterDto,
  ): Promise<CustomerAuthPayload> {
    const existing = await this.customerModel.findOne({ email: dto.email });
    if (existing) {
      throw new ConflictException('Email already registered.');
    }

    const customer = new this.customerModel(dto);
    await customer.save();

    const token = this.issueToken(customer.id);
    return this.buildAuthPayload(customer, token);
  }

  async loginCustomer(dto: CustomerLoginDto): Promise<CustomerAuthPayload> {
    const customer = await this.customerModel
      .findOne({ email: dto.email })
      .select('+password');

    if (!customer) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const isValid = await customer.comparePassword(dto.password);
    if (!isValid) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const token = this.issueToken(customer.id);
    return this.buildAuthPayload(customer, token);
  }

  async getProfile(userId: string): Promise<CustomerAuthPayload['customer']> {
    const customer = await this.customerModel.findById(userId);
    if (!customer) {
      throw new NotFoundException('Customer not found.');
    }
    return this.sanitiseCustomer(customer);
  }

  async updateProfile(
    userId: string,
    updates: UpdateCustomerDto,
  ): Promise<CustomerAuthPayload['customer']> {
    const updatePayload: UpdateCustomerDto = { ...updates };

    if (Object.keys(updatePayload).length === 0) {
      throw new BadRequestException('No changes provided.');
    }

    const customer = await this.customerModel.findByIdAndUpdate(
      userId,
      updatePayload,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!customer) {
      throw new NotFoundException('Customer not found.');
    }

    return this.sanitiseCustomer(customer);
  }

  private issueToken(userId: string): string {
    return this.jwtService.sign({ sub: userId, role: 'customer' });
  }

  private buildAuthPayload(
    customer: CustomerDocument,
    token: string,
  ): CustomerAuthPayload {
    const data = this.sanitiseCustomer(customer);
    return { token, customer: data };
  }

  private sanitiseCustomer(customer: CustomerDocument) {
    return {
      id: customer.id,
      firstName: customer.firstName,
      lastName: customer.lastName,
      email: customer.email,
      phone: customer.phone,
      location: customer.location,
    };
  }

  // Restaurant authentication methods
  async registerRestaurant(
    dto: RegisterRestaurantDto,
    profilePicture?: string,
  ): Promise<{
    message: string;
    token: string;
    restaurant: {
      id: string;
      name: string;
      ownerName: string;
      location: string;
      contactNumber: string;
      profilePicture: string;
      email: string;
    };
  }> {
    const existing = await this.restaurantModel.findOne({
      $or: [{ name: dto.name }, { 'admin.email': dto.email }],
    });

    if (existing) {
      throw new ConflictException('Restaurant or email already exists');
    }

    const restaurant = await this.restaurantModel.create({
      name: dto.name,
      ownerName: dto.ownerName,
      location: dto.location,
      contactNumber: dto.contactNumber,
      profilePicture: profilePicture || '',
      admin: {
        email: dto.email,
        password: dto.password,
      },
    });

    const payload = {
      sub: restaurant._id.toString(),
      restaurantId: restaurant._id.toString(),
      role: 'restaurant',
      email: restaurant.admin.email,
    };

    const token = this.jwtService.sign(payload);

    return {
      message: 'Restaurant registered successfully',
      token,
      restaurant: {
        id: restaurant._id.toString(),
        name: restaurant.name,
        ownerName: restaurant.ownerName,
        location: restaurant.location,
        contactNumber: restaurant.contactNumber,
        profilePicture: restaurant.profilePicture,
        email: restaurant.admin.email,
      },
    };
  }

  async loginRestaurant(dto: LoginRestaurantDto): Promise<{
    message: string;
    token: string;
    restaurant: {
      id: string;
      name: string;
      ownerName: string;
      location: string;
      contactNumber: string;
      profilePicture: string;
      email: string;
    };
  }> {
    const restaurant = await this.restaurantModel.findOne({
      'admin.email': dto.email,
    });

    if (!restaurant) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await restaurant.compareAdminPassword(dto.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      sub: restaurant._id.toString(),
      restaurantId: restaurant._id.toString(),
      role: 'restaurant',
      email: restaurant.admin.email,
    };

    const token = this.jwtService.sign(payload);

    return {
      message: 'Login successful',
      token,
      restaurant: {
        id: restaurant._id.toString(),
        name: restaurant.name,
        ownerName: restaurant.ownerName,
        location: restaurant.location,
        contactNumber: restaurant.contactNumber,
        profilePicture: restaurant.profilePicture,
        email: restaurant.admin.email,
      },
    };
  }

  // SuperAdmin authentication methods
  async registerSuperAdmin(dto: RegisterSuperAdminDto): Promise<{
    message: string;
    token: string;
    superAdmin: {
      id: string;
      username: string;
      email: string;
      role: string;
    };
  }> {
    const existing = await this.superAdminModel.findOne({
      $or: [{ username: dto.username }, { email: dto.email }],
    });

    if (existing) {
      throw new ConflictException('Username or email already exists');
    }

    const superAdmin = await this.superAdminModel.create({
      username: dto.username,
      email: dto.email,
      password: dto.password,
    });

    const payload = {
      sub: superAdmin._id.toString(),
      role: 'superAdmin',
      email: superAdmin.email,
    };

    const token = this.jwtService.sign(payload);

    return {
      message: 'Super Admin registered successfully',
      token,
      superAdmin: {
        id: superAdmin._id.toString(),
        username: superAdmin.username,
        email: superAdmin.email,
        role: superAdmin.role,
      },
    };
  }

  async loginSuperAdmin(dto: LoginSuperAdminDto): Promise<{
    message: string;
    token: string;
    superAdmin: {
      id: string;
      username: string;
      email: string;
      role: string;
    };
  }> {
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
      sub: superAdmin._id.toString(),
      role: 'superAdmin',
      email: superAdmin.email,
    };

    const token = this.jwtService.sign(payload);

    return {
      message: 'Login successful',
      token,
      superAdmin: {
        id: superAdmin._id.toString(),
        username: superAdmin.username,
        email: superAdmin.email,
        role: superAdmin.role,
      },
    };
  }

  // Get restaurant profile by ID
  async getRestaurantProfile(restaurantId: string): Promise<{
    id: string;
    name: string;
    ownerName: string;
    location: string;
    contactNumber: string;
    profilePicture: string;
    email: string;
    availability: boolean;
  }> {
    const restaurant = await this.restaurantModel.findById(restaurantId);
    if (!restaurant) {
      throw new NotFoundException('Restaurant not found');
    }

    return {
      id: restaurant._id.toString(),
      name: restaurant.name,
      ownerName: restaurant.ownerName,
      location: restaurant.location,
      contactNumber: restaurant.contactNumber,
      profilePicture: restaurant.profilePicture,
      email: restaurant.admin.email,
      availability: restaurant.availability,
    };
  }

  // Get superadmin profile by ID
  async getSuperAdminProfile(superAdminId: string): Promise<{
    id: string;
    username: string;
    email: string;
    role: string;
  }> {
    const superAdmin = await this.superAdminModel.findById(superAdminId);
    if (!superAdmin) {
      throw new NotFoundException('SuperAdmin not found');
    }

    return {
      id: superAdmin._id.toString(),
      username: superAdmin.username,
      email: superAdmin.email,
      role: superAdmin.role,
    };
  }
}
