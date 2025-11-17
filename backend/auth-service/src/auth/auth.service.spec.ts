import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { ConflictException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Customer } from '../schemas/customer.schema';
import { Restaurant } from '../schemas/restaurant.schema';
import { SuperAdmin } from '../schemas/super-admin.schema';
import { CustomerRegisterDto } from './dto/customer-register.dto';
import { CustomerLoginDto } from './dto/customer-login.dto';
import { RegisterRestaurantDto } from './dto/register-restaurant.dto';
import { LoginRestaurantDto } from './dto/login-restaurant.dto';

describe('AuthService', () => {
  let service: AuthService;
  let customerModel: any;
  let restaurantModel: any;
  let superAdminModel: any;
  let jwtService: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getModelToken(Customer.name),
          useValue: {
            findOne: jest.fn(),
            findById: jest.fn(),
            create: jest.fn(),
          },
        },
        {
          provide: getModelToken(Restaurant.name),
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
          },
        },
        {
          provide: getModelToken(SuperAdmin.name),
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    customerModel = module.get(getModelToken(Customer.name));
    restaurantModel = module.get(getModelToken(Restaurant.name));
    superAdminModel = module.get(getModelToken(SuperAdmin.name));
    jwtService = module.get(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // 1. registerCustomer - happy path
  describe('registerCustomer', () => {
    it.skip('should register a customer successfully', async () => {
      // GIVEN: Valid customer registration data and no existing customer
      const dto: CustomerRegisterDto = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phone: '1234567890',
        password: 'password123',
        location: 'New York',
      };

      // WHEN: Calling registerCustomer
      const result = await service.registerCustomer(dto);

      // THEN: Should return token and customer data
      expect(result).toEqual({
        token: 'mock-jwt-token',
        customer: {
          id: 'customer-id',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          phone: '1234567890',
          location: 'New York',
        },
      });
    });

    // 2. registerCustomer - error path
    it('should throw ConflictException when email already exists', async () => {
      // GIVEN: Customer with existing email
      const dto: CustomerRegisterDto = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'existing@example.com',
        phone: '1234567890',
        password: 'password123',
      };

      customerModel.findOne.mockResolvedValue({ email: 'existing@example.com' });

      // WHEN: Calling registerCustomer
      // THEN: Should throw ConflictException
      await expect(service.registerCustomer(dto)).rejects.toThrow(ConflictException);
      expect(customerModel.findOne).toHaveBeenCalledWith({ email: dto.email });
    });
  });

  // 3. loginCustomer - happy path
  describe('loginCustomer', () => {
    it('should login customer successfully with valid credentials', async () => {
      // GIVEN: Existing customer with valid password
      const dto: CustomerLoginDto = {
        email: 'john@example.com',
        password: 'password123',
      };

      const mockCustomer = {
        _id: 'customer-id',
        id: 'customer-id',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phone: '1234567890',
        comparePassword: jest.fn().mockResolvedValue(true),
      };

      const mockQuery = {
        select: jest.fn().mockResolvedValue(mockCustomer),
      };

      customerModel.findOne.mockReturnValue(mockQuery);
      jwtService.sign.mockReturnValue('mock-jwt-token');

      // WHEN: Calling loginCustomer
      const result = await service.loginCustomer(dto);

      // THEN: Should return token and customer data
      expect(result).toEqual({
        token: 'mock-jwt-token',
        customer: {
          id: 'customer-id',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          phone: '1234567890',
        },
      });
      expect(customerModel.findOne).toHaveBeenCalledWith({ email: dto.email });
      expect(mockQuery.select).toHaveBeenCalledWith('+password');
      expect(mockCustomer.comparePassword).toHaveBeenCalledWith(dto.password);
      expect(jwtService.sign).toHaveBeenCalledWith({
        sub: 'customer-id',
        role: 'customer',
      });
    });

    // 4. loginCustomer - error path
    it('should throw UnauthorizedException for invalid credentials', async () => {
      // GIVEN: Existing customer with invalid password
      const dto: CustomerLoginDto = {
        email: 'john@example.com',
        password: 'wrongpassword',
      };

      const mockCustomer = {
        _id: 'customer-id',
        email: 'john@example.com',
        comparePassword: jest.fn().mockResolvedValue(false),
      };

      const mockQuery = {
        select: jest.fn().mockResolvedValue(mockCustomer),
      };

      customerModel.findOne.mockReturnValue(mockQuery);

      // WHEN: Calling loginCustomer
      // THEN: Should throw UnauthorizedException
      await expect(service.loginCustomer(dto)).rejects.toThrow(UnauthorizedException);
      expect(customerModel.findOne).toHaveBeenCalledWith({ email: dto.email });
      expect(mockQuery.select).toHaveBeenCalledWith('+password');
      expect(mockCustomer.comparePassword).toHaveBeenCalledWith(dto.password);
    });
  });

  // 5. getProfile - error path
  describe('getProfile', () => {
    it('should throw NotFoundException when customer does not exist', async () => {
      // GIVEN: Customer ID that doesn't exist
      const customerId = 'non-existent-id';

      customerModel.findById.mockResolvedValue(null);

      // WHEN: Calling getProfile
      // THEN: Should throw NotFoundException
      await expect(service.getProfile(customerId)).rejects.toThrow(NotFoundException);
      expect(customerModel.findById).toHaveBeenCalledWith(customerId);
    });
  });

  // 6. registerRestaurant - happy path
  describe('registerRestaurant', () => {
    it('should register a restaurant successfully', async () => {
      // GIVEN: Valid restaurant registration data and no existing restaurant
      const dto: RegisterRestaurantDto = {
        name: 'Test Restaurant',
        ownerName: 'John Owner',
        email: 'restaurant@example.com',
        password: 'password123',
        location: 'New York',
        contactNumber: '1234567890',
      };
      const profilePicture = '/uploads/test.jpg';

      const mockRestaurant = {
        _id: 'restaurant-id',
        name: dto.name,
        ownerName: dto.ownerName,
        location: dto.location,
        contactNumber: dto.contactNumber,
        profilePicture,
        admin: { email: dto.email },
      };

      restaurantModel.findOne.mockResolvedValue(null);
      restaurantModel.create.mockResolvedValue(mockRestaurant);
      jwtService.sign.mockReturnValue('mock-jwt-token');

      // WHEN: Calling registerRestaurant
      const result = await service.registerRestaurant(dto, profilePicture);

      // THEN: Should return success message, token and restaurant data
      expect(result).toEqual({
        message: 'Restaurant registered successfully',
        token: 'mock-jwt-token',
        restaurant: {
          id: 'restaurant-id',
          name: 'Test Restaurant',
          ownerName: 'John Owner',
          email: 'restaurant@example.com',
          location: 'New York',
          contactNumber: '1234567890',
          profilePicture,
        },
      });
      expect(restaurantModel.findOne).toHaveBeenCalledWith({
        $or: [{ name: dto.name }, { 'admin.email': dto.email }],
      });
      expect(restaurantModel.create).toHaveBeenCalledWith({
        name: dto.name,
        ownerName: dto.ownerName,
        location: dto.location,
        contactNumber: dto.contactNumber,
        profilePicture,
        admin: {
          email: dto.email,
          password: dto.password,
        },
      });
      expect(jwtService.sign).toHaveBeenCalledWith({
        sub: 'restaurant-id',
        restaurantId: 'restaurant-id',
        role: 'restaurant',
        email: dto.email,
      });
    });

    // 7. registerRestaurant - error path
    it('should throw ConflictException when restaurant name or email already exists', async () => {
      // GIVEN: Restaurant with existing name or email
      const dto: RegisterRestaurantDto = {
        name: 'Existing Restaurant',
        ownerName: 'John Owner',
        email: 'existing@example.com',
        password: 'password123',
        location: 'New York',
        contactNumber: '1234567890',
      };
      const profilePicture = '/uploads/test.jpg';

      restaurantModel.findOne.mockResolvedValue({ name: 'Existing Restaurant' });

      // WHEN: Calling registerRestaurant
      // THEN: Should throw ConflictException
      await expect(service.registerRestaurant(dto, profilePicture)).rejects.toThrow(ConflictException);
      expect(restaurantModel.findOne).toHaveBeenCalledWith({
        $or: [{ name: dto.name }, { 'admin.email': dto.email }],
      });
    });
  });

  // 8. loginRestaurant - error path
  describe('loginRestaurant', () => {
    it('should throw UnauthorizedException for invalid restaurant credentials', async () => {
      // GIVEN: Existing restaurant with invalid password
      const dto: LoginRestaurantDto = {
        email: 'restaurant@example.com',
        password: 'wrongpassword',
      };

      const mockRestaurant = {
        _id: 'restaurant-id',
        admin: { email: 'restaurant@example.com' },
        compareAdminPassword: jest.fn().mockResolvedValue(false),
      };

      restaurantModel.findOne.mockResolvedValue(mockRestaurant);

      // WHEN: Calling loginRestaurant
      // THEN: Should throw UnauthorizedException
      await expect(service.loginRestaurant(dto)).rejects.toThrow(UnauthorizedException);
      expect(restaurantModel.findOne).toHaveBeenCalledWith({ 'admin.email': dto.email });
      expect(mockRestaurant.compareAdminPassword).toHaveBeenCalledWith(dto.password);
    });
  });
});
