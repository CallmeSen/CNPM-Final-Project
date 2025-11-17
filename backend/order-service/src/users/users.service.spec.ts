import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { User } from '../schema/user.schema';

jest.mock('bcryptjs', () => ({
  genSalt: jest.fn(),
  hash: jest.fn(),
  compare: jest.fn(),
}));

import * as bcrypt from 'bcryptjs';

type UserModelMock = jest.Mock & {
  findOne: jest.Mock;
  create: jest.Mock;
};

describe('UsersService', () => {
  let service: UsersService;
  let userModel: UserModelMock;
  const jwtService = { sign: jest.fn() };

  beforeEach(async () => {
    userModel = Object.assign(jest.fn(), {
      findOne: jest.fn(),
      create: jest.fn(),
    });

    jwtService.sign.mockReturnValue('signed-jwt');
    (bcrypt.genSalt as jest.Mock).mockResolvedValue('salt');
    (bcrypt.hash as jest.Mock).mockResolvedValue('hashed-password');
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getModelToken(User.name), useValue: userModel },
        { provide: JwtService, useValue: jwtService },
      ],
    }).compile();

    service = module.get(UsersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('register', () => {
    const dto = {
      name: 'Alice',
      email: 'alice@example.com',
      password: 'secret123',
      role: 'customer',
    };

    it('hashes password, creates user and returns token', async () => {
      userModel.findOne.mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });

      const created = {
        _id: { toString: () => 'new-id' },
        name: dto.name,
        email: dto.email,
        role: dto.role,
      };
      userModel.create.mockResolvedValue(created);

      const result = await service.register(dto);

      expect(userModel.findOne).toHaveBeenCalledWith({ email: dto.email });
      expect(bcrypt.genSalt).toHaveBeenCalledWith(10);
      expect(bcrypt.hash).toHaveBeenCalledWith(dto.password, 'salt');
      expect(userModel.create).toHaveBeenCalledWith({
        email: dto.email,
        name: dto.name,
        password: 'hashed-password',
        role: 'customer',
      });
      expect(jwtService.sign).toHaveBeenCalledWith({
        id: 'new-id',
        role: 'customer',
      });
      expect(result).toEqual({
        message: 'User registered successfully!',
        token: 'signed-jwt',
      });
    });

    it('throws BadRequestException when email already exists', async () => {
      userModel.findOne.mockReturnValue({
        exec: jest.fn().mockResolvedValue({ id: 'existing' }),
      });

      await expect(service.register(dto)).rejects.toBeInstanceOf(
        BadRequestException,
      );
      expect(userModel.create).not.toHaveBeenCalled();
    });
  });

  describe('login', () => {
    const dto = { email: 'alice@example.com', password: 'secret123' };

    it('returns token and user data when credentials are valid', async () => {
      const user = {
        _id: { toString: () => 'user-id' },
        name: 'Alice',
        email: dto.email,
        password: 'hashed',
        role: 'customer',
      };
      userModel.findOne.mockReturnValue({
        exec: jest.fn().mockResolvedValue(user),
      });

      const result = await service.login(dto);

      expect(userModel.findOne).toHaveBeenCalledWith({ email: dto.email });
      expect(bcrypt.compare).toHaveBeenCalledWith(dto.password, 'hashed');
      expect(jwtService.sign).toHaveBeenCalledWith({
        id: 'user-id',
        role: 'customer',
      });
      expect(result).toEqual({
        id: 'user-id',
        name: 'Alice',
        email: dto.email,
        role: 'customer',
        token: 'signed-jwt',
      });
    });

    it('throws UnauthorizedException when user does not exist', async () => {
      userModel.findOne.mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });

      await expect(service.login(dto)).rejects.toBeInstanceOf(
        UnauthorizedException,
      );
    });

    it('throws UnauthorizedException when password does not match', async () => {
      const user = {
        _id: { toString: () => 'user-id' },
        name: 'Alice',
        email: dto.email,
        password: 'hashed',
        role: 'customer',
      };
      userModel.findOne.mockReturnValue({
        exec: jest.fn().mockResolvedValue(user),
      });

      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(service.login(dto)).rejects.toBeInstanceOf(
        UnauthorizedException,
      );
    });
  });
});
