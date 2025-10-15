import { BadRequestException, NotFoundException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Admin } from '../schemas/admin.schema';
import { Customer } from '../schemas/customer.schema';
import { DeliveryPersonnel } from '../schemas/delivery-personnel.schema';
import { RestaurantAdmin } from '../schemas/restaurant-admin.schema';
import { ManagedUserType } from './dto/create-user.dto';
import { UpdatePermissionsDto } from './dto/update-permissions.dto';
import { UserManagementService } from './user-management.service';

type MockModel = {
  find: jest.Mock;
  findOne: jest.Mock;
  findById: jest.Mock;
  findByIdAndDelete: jest.Mock;
  create: jest.Mock;
};

const createMockModel = (): MockModel => ({
  find: jest.fn(),
  findOne: jest.fn(),
  findById: jest.fn(),
  findByIdAndDelete: jest.fn(),
  create: jest.fn(),
});

const createDocument = (payload: Record<string, unknown>) => {
  const doc: any = {
    ...payload,
    save: jest.fn().mockImplementation(async () => doc),
    toObject: jest.fn().mockImplementation(() => {
      const { save: _save, toObject: _toObject, ...rest } = doc;
      return { ...rest };
    }),
  };
  return doc;
};

const setupFind = (model: MockModel, documents: any[]) => {
  model.find.mockReturnValue({
    select: jest.fn().mockResolvedValue(documents),
  });
};

describe('UserManagementService', () => {
  let service: UserManagementService;

  let customerModel: MockModel;
  let adminModel: MockModel;
  let restaurantAdminModel: MockModel;
  let deliveryModel: MockModel;

  beforeEach(async () => {
    customerModel = createMockModel();
    adminModel = createMockModel();
    restaurantAdminModel = createMockModel();
    deliveryModel = createMockModel();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserManagementService,
        { provide: getModelToken(Customer.name), useValue: customerModel },
        { provide: getModelToken(Admin.name), useValue: adminModel },
        {
          provide: getModelToken(RestaurantAdmin.name),
          useValue: restaurantAdminModel,
        },
        {
          provide: getModelToken(DeliveryPersonnel.name),
          useValue: deliveryModel,
        },
      ],
    }).compile();

    service = module.get<UserManagementService>(UserManagementService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllUsers', () => {
    it('returns users from every collection when no filter provided', async () => {
      const customer = createDocument({
        id: 'c1',
        firstName: 'Alice',
        password: 'hash',
      });
      const admin = createDocument({
        id: 'a1',
        firstName: 'Bob',
        password: 'hash',
      });
      const restaurant = createDocument({
        id: 'r1',
        firstName: 'Cara',
        password: 'hash',
      });
      const delivery = createDocument({
        id: 'd1',
        firstName: 'Dan',
        password: 'hash',
      });

      setupFind(customerModel, [customer]);
      setupFind(adminModel, [admin]);
      setupFind(restaurantAdminModel, [restaurant]);
      setupFind(deliveryModel, [delivery]);

      const results = await service.getAllUsers({});

      expect(customerModel.find).toHaveBeenCalled();
      expect(adminModel.find).toHaveBeenCalled();
      expect(restaurantAdminModel.find).toHaveBeenCalled();
      expect(deliveryModel.find).toHaveBeenCalled();

      expect(results).toEqual([
        {
          id: 'c1',
          firstName: 'Alice',
          password: 'hash',
          userType: 'customer',
        },
        {
          id: 'a1',
          firstName: 'Bob',
          password: 'hash',
          userType: 'admin',
        },
        {
          id: 'r1',
          firstName: 'Cara',
          password: 'hash',
          userType: 'restaurant',
        },
        {
          id: 'd1',
          firstName: 'Dan',
          password: 'hash',
          userType: 'delivery',
        },
      ]);
    });

    it('queries only the specified collection when userType is provided', async () => {
      const admin = createDocument({
        id: 'a1',
        firstName: 'Bob',
        password: 'hash',
      });
      setupFind(adminModel, [admin]);

      const results = await service.getAllUsers({ userType: 'admin' });

      expect(adminModel.find).toHaveBeenCalledTimes(1);
      expect(customerModel.find).not.toHaveBeenCalled();
      expect(restaurantAdminModel.find).not.toHaveBeenCalled();
      expect(deliveryModel.find).not.toHaveBeenCalled();

      expect(results).toEqual([
        {
          id: 'a1',
          firstName: 'Bob',
          password: 'hash',
          userType: 'admin',
        },
      ]);
    });
  });

  describe('createUser', () => {
    const createPayload = {
      userType: 'customer' as ManagedUserType,
      firstName: 'Alice',
      lastName: 'Anderson',
      email: 'alice@example.com',
      phone: '1234',
      password: 'secure-password',
    };

    it('creates a user and strips sensitive fields from response', async () => {
      customerModel.findOne.mockResolvedValue(null);
      const createdDoc = createDocument({ ...createPayload });
      customerModel.create.mockResolvedValue(createdDoc);

      const result = await service.createUser(createPayload);

      expect(customerModel.findOne).toHaveBeenCalledWith({
        email: 'alice@example.com',
      });
      expect(customerModel.create).toHaveBeenCalledWith({
        firstName: 'Alice',
        lastName: 'Anderson',
        email: 'alice@example.com',
        phone: '1234',
        password: 'secure-password',
      });
      expect(result).toEqual({
        message: 'customer created successfully',
        user: {
          firstName: 'Alice',
          lastName: 'Anderson',
          email: 'alice@example.com',
          phone: '1234',
          userType: 'customer',
        },
      });
    });

    it('throws when a user with the same email already exists', async () => {
      customerModel.findOne.mockResolvedValue(createDocument(createPayload));

      await expect(service.createUser(createPayload)).rejects.toBeInstanceOf(
        BadRequestException,
      );
      expect(customerModel.create).not.toHaveBeenCalled();
    });
  });

  describe('updateUser', () => {
    const basePayload = {
      userType: 'customer' as ManagedUserType,
      firstName: 'Alice',
      lastName: 'Anderson',
      email: 'alice@example.com',
      phone: '1234',
    };

    it('updates fields and ignores empty password values', async () => {
      const doc = createDocument({ ...basePayload, password: 'hash' });
      customerModel.findById.mockResolvedValue(doc);

      const result = await service.updateUser('user-id', {
        ...basePayload,
        firstName: 'Updated',
        password: '',
      });

      expect(doc.firstName).toBe('Updated');
      expect(doc.password).toBe('hash');
      expect(doc.save).toHaveBeenCalled();
      expect(result).toEqual({
        message: 'User updated successfully',
        user: {
          userType: 'customer',
          firstName: 'Updated',
          lastName: 'Anderson',
          email: 'alice@example.com',
          phone: '1234',
        },
      });
    });

    it('applies password changes when provided', async () => {
      const doc = createDocument({ ...basePayload, password: 'hash' });
      customerModel.findById.mockResolvedValue(doc);

      await service.updateUser('user-id', {
        ...basePayload,
        password: 'new-secret',
      });

      expect(doc.password).toBe('new-secret');
      expect(doc.save).toHaveBeenCalled();
    });

    it('throws NotFoundException when the user cannot be located', async () => {
      customerModel.findById.mockResolvedValue(null);

      await expect(
        service.updateUser('unknown', basePayload),
      ).rejects.toBeInstanceOf(NotFoundException);
    });
  });

  describe('deleteUser', () => {
    it('removes a user and returns confirmation message', async () => {
      const doc = createDocument({ id: 'abc123' });
      deliveryModel.findByIdAndDelete.mockResolvedValue(doc);

      const response = await service.deleteUser('abc123', 'delivery');

      expect(deliveryModel.findByIdAndDelete).toHaveBeenCalledWith('abc123');
      expect(response).toEqual({ message: 'User deleted successfully' });
    });

    it('throws NotFoundException when no record is removed', async () => {
      deliveryModel.findByIdAndDelete.mockResolvedValue(null);

      await expect(
        service.deleteUser('missing', 'delivery'),
      ).rejects.toBeInstanceOf(NotFoundException);
    });
  });

  describe('getUserLogs', () => {
    it('returns mock log entries containing the provided user id', async () => {
      const logs = await service.getUserLogs('user-123');
      expect(logs).toHaveLength(3);
      expect(logs.every((log) => log.userId === 'user-123')).toBe(true);
    });
  });

  describe('updatePermissions', () => {
    it('updates admin permissions and returns sanitized payload', async () => {
      const adminDoc = createDocument({
        id: 'admin-1',
        firstName: 'Admin',
        permissions: ['view'],
        password: 'hash',
      });
      adminModel.findById.mockResolvedValue(adminDoc);

      const dto: UpdatePermissionsDto = {
        permissions: ['manage', 'view'],
      };

      const result = await service.updatePermissions('admin-1', dto);

      expect(adminDoc.permissions).toEqual(['manage', 'view']);
      expect(adminDoc.save).toHaveBeenCalled();
      expect(result).toEqual({
        message: 'Permissions updated successfully',
        admin: {
          id: 'admin-1',
          firstName: 'Admin',
          permissions: ['manage', 'view'],
        },
      });
    });

    it('throws NotFoundException when admin cannot be located', async () => {
      adminModel.findById.mockResolvedValue(null);

      await expect(
        service.updatePermissions('missing', { permissions: [] }),
      ).rejects.toBeInstanceOf(NotFoundException);
    });
  });
});
