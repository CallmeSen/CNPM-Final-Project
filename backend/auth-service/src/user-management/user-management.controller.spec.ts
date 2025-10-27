import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ModuleMocker } from 'jest-mock';
import { ManagedUserType } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserManagementController } from './user-management.controller';
import { UserManagementService } from './user-management.service';

const moduleMocker = new ModuleMocker(global);

const userResponse = {
  message: 'ok',
  user: { id: '1', firstName: 'Test', userType: 'customer' as ManagedUserType },
};

type UserManagementServiceMock = {
  getAllUsers: jest.Mock;
  createUser: jest.Mock;
  updateUser: jest.Mock;
  deleteUser: jest.Mock;
  getUserLogs: jest.Mock;
  updatePermissions: jest.Mock;
};

describe('UserManagementController', () => {
  let controller: UserManagementController;
  let service: UserManagementServiceMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserManagementController],
    })
      .useMocker((token) => {
        if (token === UserManagementService) {
          return {
            getAllUsers: jest.fn(),
            createUser: jest.fn(),
            updateUser: jest.fn(),
            deleteUser: jest.fn(),
            getUserLogs: jest.fn(),
            updatePermissions: jest.fn(),
          };
        }
        if (typeof token === 'function') {
          const metadata = moduleMocker.getMetadata(token);
          const Mock = moduleMocker.generateFromMetadata(metadata);
          return new (Mock as any)();
        }
      })
      .compile();

    controller = module.get<UserManagementController>(UserManagementController);
    service = module.get(UserManagementService) as UserManagementServiceMock;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  it('returns all users via the service', async () => {
    service.getAllUsers.mockResolvedValue([userResponse.user]);

    const result = await controller.getAllUsers({});

    expect(service.getAllUsers).toHaveBeenCalledWith({});
    expect(result).toEqual([userResponse.user]);
  });

  it('creates a user through the service', async () => {
    service.createUser.mockResolvedValue(userResponse);

    const dto = {
      userType: 'customer' as ManagedUserType,
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      phone: '123',
      password: 'password',
    };

    const result = await controller.createUser(dto);

    expect(service.createUser).toHaveBeenCalledWith(dto);
    expect(result).toEqual(userResponse);
  });

  it('updates a user', async () => {
    service.updateUser.mockResolvedValue(userResponse);

    const dto: UpdateUserDto = {
      userType: 'customer',
      firstName: 'Updated',
    };

    const result = await controller.updateUser('1', dto);

    expect(service.updateUser).toHaveBeenCalledWith('1', dto);
    expect(result).toEqual(userResponse);
  });

  it('deletes a user when userType is provided', async () => {
    const deletionResult = { message: 'deleted' };
    service.deleteUser.mockResolvedValue(deletionResult);

    const result = await controller.deleteUser('1', 'customer');

    expect(service.deleteUser).toHaveBeenCalledWith('1', 'customer');
    expect(result).toEqual(deletionResult);
  });

  it('throws when deleting without userType', async () => {
    await expect(
      controller.deleteUser('1', undefined as unknown as ManagedUserType),
    ).rejects.toBeInstanceOf(BadRequestException);
    expect(service.deleteUser).not.toHaveBeenCalled();
  });

  it('returns user logs', async () => {
    const logs = [
      {
        id: 'log-1',
        userId: '1',
        action: 'login',
        timestamp: new Date(),
        ipAddress: '127.0.0.1',
        status: 'success',
      },
    ];
    service.getUserLogs.mockResolvedValue(logs);

    const result = await controller.getUserLogs('1');

    expect(service.getUserLogs).toHaveBeenCalledWith('1');
    expect(result).toEqual(logs);
  });

  it('updates permissions via the service', async () => {
    const permissionsPayload = { permissions: ['manage'] };
    const updateResult = {
      message: 'updated',
      admin: { id: '1', permissions: ['manage'] },
    };
    service.updatePermissions.mockResolvedValue(updateResult);

    const result = await controller.updatePermissions('1', permissionsPayload);

    expect(service.updatePermissions).toHaveBeenCalledWith(
      '1',
      permissionsPayload,
    );
    expect(result).toEqual(updateResult);
  });
});
