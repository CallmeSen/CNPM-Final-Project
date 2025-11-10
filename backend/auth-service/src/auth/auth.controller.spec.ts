import { Test, TestingModule } from '@nestjs/testing';
import { ModuleMocker } from 'jest-mock';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CustomerRegisterDto } from './dto/customer-register.dto';
import { CustomerLoginDto } from './dto/customer-login.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

const moduleMocker = new ModuleMocker(global);

type AuthServiceMock = {
  registerCustomer: jest.Mock;
  loginCustomer: jest.Mock;
  getProfile: jest.Mock;
  updateProfile: jest.Mock;
};

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthServiceMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
    })
      .useMocker((token) => {
        if (token === AuthService) {
          return {
            registerCustomer: jest.fn(),
            loginCustomer: jest.fn(),
            getProfile: jest.fn(),
            updateProfile: jest.fn(),
          };
        }
        if (typeof token === 'function') {
          const metadata = moduleMocker.getMetadata(token);
          const Mock = moduleMocker.generateFromMetadata(metadata);
          return new (Mock as any)();
        }
      })
      .compile();

    controller = module.get(AuthController);
    service = module.get(AuthService) as AuthServiceMock;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  it('registers a customer and wraps the payload', async () => {
    const dto: CustomerRegisterDto = {
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane@example.com',
      phone: '123456789',
      password: 'password',
      location: 'City',
    };
    const payload = {
      token: 'token',
      customer: { id: '1', firstName: 'Jane', lastName: 'Doe' },
    };
    service.registerCustomer.mockResolvedValue(payload);

    const result = await controller.registerCustomer(dto);

    expect(service.registerCustomer).toHaveBeenCalledWith(dto);
    expect(result).toEqual({
      status: 'success',
      token: 'token',
      data: { customer: payload.customer },
    });
  });

  it('logs in a customer', async () => {
    const dto: CustomerLoginDto = {
      email: 'user@example.com',
      password: 'secret',
    };
    const payload = {
      token: 'token',
      customer: { id: 'login-id', email: dto.email },
    };
    service.loginCustomer.mockResolvedValue(payload);

    const result = await controller.loginCustomer(dto);

    expect(service.loginCustomer).toHaveBeenCalledWith(dto);
    expect(result).toEqual({
      status: 'success',
      token: 'token',
      data: { customer: payload.customer },
    });
  });

  it('retrieves profile for current customer', async () => {
    const customer = { id: 'profile-id', firstName: 'Jane' };
    service.getProfile.mockResolvedValue(customer);

    const result = await controller.getProfile({
      user: { userId: 'profile-id', role: 'customer' },
    });

    expect(service.getProfile).toHaveBeenCalledWith('profile-id');
    expect(result).toEqual({
      status: 'success',
      data: { customer },
    });
  });

  it('updates profile for current customer', async () => {
    const customer = { id: 'profile-id', firstName: 'Janet' };
    const dto: UpdateCustomerDto = { firstName: 'Janet' };
    service.updateProfile.mockResolvedValue(customer);

    const result = await controller.updateProfile(
      { user: { userId: 'profile-id', role: 'customer' } },
      dto,
    );

    expect(service.updateProfile).toHaveBeenCalledWith('profile-id', dto);
    expect(result).toEqual({
      status: 'success',
      data: { customer },
    });
  });
});
