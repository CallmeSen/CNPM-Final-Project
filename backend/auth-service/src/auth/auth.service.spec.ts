import {
  BadRequestException,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { Customer } from '../schemas/customer.schema';
import { Restaurant } from '../schemas/restaurant.schema';
import { SuperAdmin } from '../schemas/super-admin.schema';

type CustomerModelMock = jest.Mock & {
  findOne: jest.Mock;
  findById: jest.Mock;
  findByIdAndUpdate: jest.Mock;
};

type CustomerDocMock = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location?: string;
  save: jest.Mock;
  comparePassword: jest.Mock;
};

const createCustomerDoc = (
  overrides: Partial<CustomerDocMock> = {},
): CustomerDocMock => ({
  id: 'customer-id',
  firstName: 'Jane',
  lastName: 'Doe',
  email: 'jane@example.com',
  phone: '123456789',
  location: 'City',
  save: jest.fn().mockResolvedValue(undefined),
  comparePassword: jest.fn().mockResolvedValue(true),
  ...overrides,
});

describe('AuthService', () => {
  let service: AuthService;
  let customerModelMock: CustomerModelMock;
  let restaurantModelMock: any;
  let superAdminModelMock: any;
  let jwtServiceMock: { sign: jest.Mock };

  beforeEach(async () => {
    customerModelMock = Object.assign(jest.fn(), {
      findOne: jest.fn(),
      findById: jest.fn(),
      findByIdAndUpdate: jest.fn(),
    });

    restaurantModelMock = {
      findOne: jest.fn(),
      findById: jest.fn(),
      create: jest.fn(),
    };

    superAdminModelMock = {
      findOne: jest.fn(),
      findById: jest.fn(),
      create: jest.fn(),
    };

    jwtServiceMock = {
      sign: jest.fn().mockReturnValue('signed-token'),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: JwtService, useValue: jwtServiceMock },
        { provide: getModelToken(Customer.name), useValue: customerModelMock },
        { provide: getModelToken(Restaurant.name), useValue: restaurantModelMock },
        { provide: getModelToken(SuperAdmin.name), useValue: superAdminModelMock },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  describe('registerCustomer', () => {
    it('creates a new customer and returns auth payload', async () => {
      const dto = {
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane@example.com',
        phone: '123456789',
        password: 'password',
        location: 'City',
      };
      const savedCustomer = createCustomerDoc({
        id: 'new-id',
        firstName: dto.firstName,
        lastName: dto.lastName,
        email: dto.email,
        phone: dto.phone,
        location: dto.location,
      });

      customerModelMock.findOne.mockResolvedValue(null);
      customerModelMock.mockImplementation(() => savedCustomer);

      const result = await service.registerCustomer(dto);

      expect(customerModelMock.findOne).toHaveBeenCalledWith({
        email: dto.email,
      });
      expect(customerModelMock).toHaveBeenCalledWith(dto);
      expect(savedCustomer.save).toHaveBeenCalled();
      expect(jwtServiceMock.sign).toHaveBeenCalledWith({
        sub: 'new-id',
        role: 'customer',
      });
      expect(result).toEqual({
        token: 'signed-token',
        customer: {
          id: 'new-id',
          firstName: dto.firstName,
          lastName: dto.lastName,
          email: dto.email,
          phone: dto.phone,
          location: dto.location,
        },
      });
    });

    it('throws when the email already exists', async () => {
      customerModelMock.findOne.mockResolvedValue(createCustomerDoc());

      await expect(
        service.registerCustomer({
          firstName: 'John',
          lastName: 'Smith',
          email: 'taken@example.com',
          phone: '987654321',
          password: 'password',
          location: 'Town',
        }),
      ).rejects.toBeInstanceOf(ConflictException);
    });
  });

  describe('loginCustomer', () => {
    const dto = { email: 'login@example.com', password: 'secret' };

    it('returns auth payload when credentials are valid', async () => {
      const customer = createCustomerDoc({ id: 'login-id' });
      const selectMock = jest.fn().mockResolvedValue(customer);
      customerModelMock.findOne.mockReturnValue({
        select: selectMock,
      });

      const result = await service.loginCustomer(dto);

      expect(customerModelMock.findOne).toHaveBeenCalledWith({
        email: dto.email,
      });
      expect(selectMock).toHaveBeenCalledWith('+password');
      expect(customer.comparePassword).toHaveBeenCalledWith(dto.password);
      expect(jwtServiceMock.sign).toHaveBeenCalledWith({
        sub: 'login-id',
        role: 'customer',
      });
      expect(result).toEqual({
        token: 'signed-token',
        customer: {
          id: 'login-id',
          firstName: customer.firstName,
          lastName: customer.lastName,
          email: customer.email,
          phone: customer.phone,
          location: customer.location,
        },
      });
    });

    it('throws when no customer is found', async () => {
      const selectMock = jest.fn().mockResolvedValue(null);
      customerModelMock.findOne.mockReturnValue({ select: selectMock });

      await expect(service.loginCustomer(dto)).rejects.toBeInstanceOf(
        UnauthorizedException,
      );
    });

    it('throws when password validation fails', async () => {
      const customer = createCustomerDoc({
        comparePassword: jest.fn().mockResolvedValue(false),
      });
      const selectMock = jest.fn().mockResolvedValue(customer);
      customerModelMock.findOne.mockReturnValue({ select: selectMock });

      await expect(service.loginCustomer(dto)).rejects.toBeInstanceOf(
        UnauthorizedException,
      );
    });
  });

  describe('getProfile', () => {
    it('returns the sanitized customer', async () => {
      const customer = createCustomerDoc({ id: 'profile-id' });
      customerModelMock.findById.mockResolvedValue(customer);

      const result = await service.getProfile('profile-id');

      expect(customerModelMock.findById).toHaveBeenCalledWith('profile-id');
      expect(result).toEqual({
        id: 'profile-id',
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
        phone: customer.phone,
        location: customer.location,
      });
    });

    it('throws when the profile cannot be found', async () => {
      customerModelMock.findById.mockResolvedValue(null);

      await expect(service.getProfile('missing-id')).rejects.toBeInstanceOf(
        NotFoundException,
      );
    });
  });

  describe('updateProfile', () => {
    it('rejects empty update payloads', async () => {
      await expect(service.updateProfile('user-id', {})).rejects.toBeInstanceOf(
        BadRequestException,
      );
    });

    it('updates and returns the customer', async () => {
      const customer = createCustomerDoc({ id: 'update-id', location: 'New' });
      customerModelMock.findByIdAndUpdate.mockResolvedValue(customer);

      const updates = { firstName: 'Janet' };
      const result = await service.updateProfile('update-id', updates);

      expect(customerModelMock.findByIdAndUpdate).toHaveBeenCalledWith(
        'update-id',
        updates,
        { new: true, runValidators: true },
      );
      expect(result).toEqual({
        id: 'update-id',
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
        phone: customer.phone,
        location: customer.location,
      });
    });

    it('throws when the customer does not exist', async () => {
      customerModelMock.findByIdAndUpdate.mockResolvedValue(null);

      await expect(
        service.updateProfile('missing-id', { firstName: 'Nope' }),
      ).rejects.toBeInstanceOf(NotFoundException);
    });
  });
});
