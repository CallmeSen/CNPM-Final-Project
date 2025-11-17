import { ForbiddenException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ModuleMocker } from 'jest-mock';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { OrderStatus } from '../common/enums/order-status.enum';

const moduleMocker = new ModuleMocker(global);

type OrdersServiceMock = {
  create: jest.Mock;
  findAll: jest.Mock;
  findOne: jest.Mock;
  updateDetails: jest.Mock;
  updateStatus: jest.Mock;
  cancel: jest.Mock;
};

describe('OrdersController', () => {
  let controller: OrdersController;
  let service: OrdersServiceMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
    })
      .useMocker((token) => {
        if (token === OrdersService) {
          return {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            updateDetails: jest.fn(),
            updateStatus: jest.fn(),
            cancel: jest.fn(),
          };
        }
        if (typeof token === 'function') {
          const metadata = moduleMocker.getMetadata(token);
          const Mock = moduleMocker.generateFromMetadata(metadata);
          return new (Mock as any)();
        }
      })
      .compile();

    controller = module.get(OrdersController);
    service = module.get(OrdersService) as OrdersServiceMock;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  it('sets customerId from user if missing during create', async () => {
    const dto: CreateOrderDto = {
      customerId: undefined as unknown as string,
      restaurantId: 'restaurant-1',
      deliveryAddress: '123 Street',
      items: [{ foodId: '1', quantity: 1, price: 10 }],
    };
    const payload = { id: 'order-id' };
    service.create.mockResolvedValue(payload);

    await expect(
      controller.create(dto, { id: 'customer-1', role: 'customer' }),
    ).resolves.toEqual(payload);

    expect(service.create).toHaveBeenCalledWith({
      ...dto,
      customerId: 'customer-1',
    });
  });

  it('throws ForbiddenException when customer tries to create for another user', () => {
    const dto: CreateOrderDto = {
      customerId: 'other',
      restaurantId: 'restaurant-1',
      deliveryAddress: '123 Street',
      items: [{ foodId: '1', quantity: 1, price: 10 }],
    };

    expect(() =>
      controller.create(dto, { id: 'customer-1', role: 'customer' }),
    ).toThrow(ForbiddenException);
    expect(service.create).not.toHaveBeenCalled();
  });

  it('delegates findAll to service', async () => {
    const orders = [{ id: 'order-1' }];
    service.findAll.mockResolvedValue(orders);

    await expect(
      controller.findAll({ id: 'customer-1', role: 'customer' }),
    ).resolves.toEqual(orders);
    expect(service.findAll).toHaveBeenCalledWith({
      id: 'customer-1',
      role: 'customer',
    });
  });

  it('returns order when customer owns it', async () => {
    const order = {
      id: 'order-1',
      customerId: 'customer-1',
      restaurantId: 'restaurant-1',
    };
    service.findOne.mockResolvedValue(order);

    const result = await controller.findOne('order-1', {
      id: 'customer-1',
      role: 'customer',
    });

    expect(service.findOne).toHaveBeenCalledWith('order-1');
    expect(result).toBe(order);
  });

  it('throws ForbiddenException when customer does not own order', async () => {
    const order = {
      id: 'order-1',
      customerId: 'other',
      restaurantId: 'restaurant-1',
    };
    service.findOne.mockResolvedValue(order);

    await expect(
      controller.findOne('order-1', { id: 'customer-1', role: 'customer' }),
    ).rejects.toBeInstanceOf(ForbiddenException);
  });

  it('throws ForbiddenException when restaurant does not own order', async () => {
    const order = {
      id: 'order-1',
      customerId: 'customer-1',
      restaurantId: 'another',
    };
    service.findOne.mockResolvedValue(order);

    await expect(
      controller.findOne('order-1', { id: 'restaurant-1', role: 'restaurant' }),
    ).rejects.toBeInstanceOf(ForbiddenException);
  });

  it('updates order details via service', async () => {
    const payload = { id: 'order-1' };
    service.updateDetails.mockResolvedValue(payload);

    const result = await controller.updateDetails(
      'order-1',
      { deliveryAddress: 'New' } as UpdateOrderDto,
      { id: 'customer-1', role: 'customer' },
    );

    expect(service.updateDetails).toHaveBeenCalledWith(
      'order-1',
      { deliveryAddress: 'New' },
      { id: 'customer-1', role: 'customer' },
    );
    expect(result).toEqual(payload);
  });

  it('updates status via service', async () => {
    const payload = { id: 'order-1', status: OrderStatus.Preparing };
    service.updateStatus.mockResolvedValue(payload);

    const result = await controller.updateStatus(
      'order-1',
      { status: OrderStatus.Preparing } as UpdateOrderStatusDto,
      { id: 'restaurant-1', role: 'restaurant' },
    );

    expect(service.updateStatus).toHaveBeenCalledWith(
      'order-1',
      { status: OrderStatus.Preparing },
      { id: 'restaurant-1', role: 'restaurant' },
    );
    expect(result).toEqual(payload);
  });

  it('cancels order via service', async () => {
    const payload = { id: 'order-1', status: OrderStatus.Canceled };
    service.cancel.mockResolvedValue(payload);

    const result = await controller.cancel('order-1', {
      id: 'customer-1',
      role: 'customer',
    });

    expect(service.cancel).toHaveBeenCalledWith('order-1', {
      id: 'customer-1',
      role: 'customer',
    });
    expect(result).toEqual(payload);
  });
});
