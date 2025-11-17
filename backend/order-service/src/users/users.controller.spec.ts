import { Test, TestingModule } from '@nestjs/testing';
import { ModuleMocker } from 'jest-mock';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

const moduleMocker = new ModuleMocker(global);

type UsersServiceMock = {
  register: jest.Mock;
  login: jest.Mock;
};

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersServiceMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
    })
      .useMocker((token) => {
        if (token === UsersService) {
          return {
            register: jest.fn(),
            login: jest.fn(),
          };
        }
        if (typeof token === 'function') {
          const metadata = moduleMocker.getMetadata(token);
          const Mock = moduleMocker.generateFromMetadata(metadata);
          return new (Mock as any)();
        }
      })
      .compile();

    controller = module.get(UsersController);
    service = module.get(UsersService) as UsersServiceMock;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  it('registers a user', async () => {
    const dto: RegisterUserDto = {
      name: 'Alice',
      email: 'alice@example.com',
      password: 'secret123',
      role: 'customer',
    };
    const payload = { message: 'ok' };
    service.register.mockResolvedValue(payload);

    const result = await controller.register(dto);

    expect(service.register).toHaveBeenCalledWith(dto);
    expect(result).toEqual(payload);
  });

  it('logs in a user', async () => {
    const dto: LoginUserDto = { email: 'user@example.com', password: 'secret' };
    const payload = { token: 'jwt' };
    service.login.mockResolvedValue(payload);

    const result = await controller.login(dto);

    expect(service.login).toHaveBeenCalledWith(dto);
    expect(result).toEqual(payload);
  });
});
