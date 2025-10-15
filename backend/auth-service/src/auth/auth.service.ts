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
import { CustomerRegisterDto } from './dto/customer-register.dto';
import { CustomerLoginDto } from './dto/customer-login.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

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
}
