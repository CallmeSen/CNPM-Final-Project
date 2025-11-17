import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CustomerRegisterDto } from './dto/customer-register.dto';
import { CustomerLoginDto } from './dto/customer-login.dto';
import { RegisterRestaurantDto } from './dto/register-restaurant.dto';
import { LoginRestaurantDto } from './dto/login-restaurant.dto';
import { ConflictException, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { Role } from '../common/decorators/roles.decorator';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            registerCustomer: jest.fn(),
            loginCustomer: jest.fn(),
            getProfile: jest.fn(),
            registerRestaurant: jest.fn(),
            loginRestaurant: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue(5001),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // 1. registerCustomer - happy path (HTTP 201)
  describe('registerCustomer', () => {
    it('should return 201 Created with success response for valid registration', async () => {
      // GIVEN: Valid customer registration data
      const dto: CustomerRegisterDto = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phone: '1234567890',
        password: 'password123',
        location: 'New York',
      };

      const serviceResult = {
        token: 'mock-jwt-token',
        customer: {
          _id: 'customer-id',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          phone: '1234567890',
          location: 'New York',
        },
      };

      authService.registerCustomer.mockResolvedValue(serviceResult);

      // WHEN: Calling registerCustomer endpoint
      const result = await controller.registerCustomer(dto);

      // THEN: Should return success response with status and data
      expect(result).toEqual({
        status: 'success',
        token: 'mock-jwt-token',
        data: { customer: serviceResult.customer },
      });
      expect(authService.registerCustomer).toHaveBeenCalledWith(dto);
    });

    // 2. registerCustomer - error path (HTTP 409)
    it('should throw ConflictException when email already exists', async () => {
      // GIVEN: Customer registration with existing email
      const dto: CustomerRegisterDto = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'existing@example.com',
        phone: '1234567890',
        password: 'password123',
      };

      authService.registerCustomer.mockRejectedValue(new ConflictException('Email already exists'));

      // WHEN: Calling registerCustomer endpoint
      // THEN: Should throw ConflictException (HTTP 409)
      await expect(controller.registerCustomer(dto)).rejects.toThrow(ConflictException);
      expect(authService.registerCustomer).toHaveBeenCalledWith(dto);
    });
  });

  // 3. loginCustomer - happy path (HTTP 200)
  describe('loginCustomer', () => {
    it('should return 200 OK with success response for valid login', async () => {
      // GIVEN: Valid customer login credentials
      const dto: CustomerLoginDto = {
        email: 'john@example.com',
        password: 'password123',
      };

      const serviceResult = {
        token: 'mock-jwt-token',
        customer: {
          _id: 'customer-id',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          phone: '1234567890',
        },
      };

      authService.loginCustomer.mockResolvedValue(serviceResult);

      // WHEN: Calling loginCustomer endpoint
      const result = await controller.loginCustomer(dto);

      // THEN: Should return success response with status and data
      expect(result).toEqual({
        status: 'success',
        token: 'mock-jwt-token',
        data: { customer: serviceResult.customer },
      });
      expect(authService.loginCustomer).toHaveBeenCalledWith(dto);
    });

    // 4. loginCustomer - error path (HTTP 401)
    it('should throw UnauthorizedException for invalid credentials', async () => {
      // GIVEN: Invalid customer login credentials
      const dto: CustomerLoginDto = {
        email: 'john@example.com',
        password: 'wrongpassword',
      };

      authService.loginCustomer.mockRejectedValue(new UnauthorizedException('Invalid credentials'));

      // WHEN: Calling loginCustomer endpoint
      // THEN: Should throw UnauthorizedException (HTTP 401)
      await expect(controller.loginCustomer(dto)).rejects.toThrow(UnauthorizedException);
      expect(authService.loginCustomer).toHaveBeenCalledWith(dto);
    });
  });

  // 5. getProfile - error path (HTTP 404)
  describe('getProfile', () => {
    it('should throw NotFoundException when customer does not exist', async () => {
      // GIVEN: Request with non-existent customer ID
      const req = { user: { userId: 'non-existent-id', role: 'customer' as Role } };

      authService.getProfile.mockRejectedValue(new NotFoundException('Customer not found'));

      // WHEN: Calling getProfile endpoint
      // THEN: Should throw NotFoundException (HTTP 404)
      await expect(controller.getProfile(req)).rejects.toThrow(NotFoundException);
      expect(authService.getProfile).toHaveBeenCalledWith('non-existent-id');
    });
  });

  // 6. registerRestaurant - happy path (HTTP 201)
  describe('registerRestaurant', () => {
    it('should return 201 Created with success response for valid restaurant registration', async () => {
      // GIVEN: Valid restaurant registration data
      const dto: RegisterRestaurantDto = {
        name: 'Test Restaurant',
        ownerName: 'John Owner',
        email: 'restaurant@example.com',
        password: 'password123',
        location: 'New York',
        contactNumber: '1234567890',
      };
      const file = { filename: 'test.jpg' } as Express.Multer.File;

      const serviceResult = {
        message: 'Restaurant registered successfully',
        token: 'mock-jwt-token',
        restaurant: {
          _id: 'restaurant-id',
          name: 'Test Restaurant',
          ownerName: 'John Owner',
          email: 'restaurant@example.com',
          location: 'New York',
          contactNumber: '1234567890',
          profilePicture: '/uploads/test.jpg',
        },
      };

      authService.registerRestaurant.mockResolvedValue(serviceResult);

      // WHEN: Calling registerRestaurant endpoint
      const result = await controller.registerRestaurant(dto, file);

      // THEN: Should return success response with status, message and data
      expect(result).toEqual({
        status: 'success',
        message: 'Restaurant registered successfully',
        token: 'mock-jwt-token',
        data: { restaurant: serviceResult.restaurant },
      });
      expect(authService.registerRestaurant).toHaveBeenCalledWith(dto, '/uploads/test.jpg');
    });

    // 7. registerRestaurant - error path (HTTP 409)
    it('should throw ConflictException when restaurant name or email already exists', async () => {
      // GIVEN: Restaurant registration with existing name/email
      const dto: RegisterRestaurantDto = {
        name: 'Existing Restaurant',
        ownerName: 'John Owner',
        email: 'existing@example.com',
        password: 'password123',
        location: 'New York',
        contactNumber: '1234567890',
      };
      const file = { filename: 'test.jpg' } as Express.Multer.File;

      authService.registerRestaurant.mockRejectedValue(new ConflictException('Restaurant name or email already exists'));

      // WHEN: Calling registerRestaurant endpoint
      // THEN: Should throw ConflictException (HTTP 409)
      await expect(controller.registerRestaurant(dto, file)).rejects.toThrow(ConflictException);
      expect(authService.registerRestaurant).toHaveBeenCalledWith(dto, '/uploads/test.jpg');
    });
  });

  // 8. loginRestaurant - error path (HTTP 401)
  describe('loginRestaurant', () => {
    it('should throw UnauthorizedException for invalid restaurant credentials', async () => {
      // GIVEN: Invalid restaurant login credentials
      const dto: LoginRestaurantDto = {
        email: 'restaurant@example.com',
        password: 'wrongpassword',
      };

      authService.loginRestaurant.mockRejectedValue(new UnauthorizedException('Invalid restaurant credentials'));

      // WHEN: Calling loginRestaurant endpoint
      // THEN: Should throw UnauthorizedException (HTTP 401)
      await expect(controller.loginRestaurant(dto)).rejects.toThrow(UnauthorizedException);
      expect(authService.loginRestaurant).toHaveBeenCalledWith(dto);
    });
  });
});
