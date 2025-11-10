import {
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { Order } from '../schema/order.schema';
import { OrdersGateway } from './orders.gateway';
import { OrderStatus } from '../common/enums/order-status.enum';

type OrderModelMock = jest.Mock & {
  find: jest.Mock;
  findById: jest.Mock;
};

const createOrderDocument = (overrides: Record<string, unknown> = {}) => {
  const doc: any = {
    _id: { toString: () => 'order-id' },
    customerId: 'customer-1',
    restaurantId: 'restaurant-1',
    items: [
      { quantity: 2, price: 5 },
      { quantity: 1, price: 10 },
    ],
    totalPrice: 20,
    status: OrderStatus.Pending,
    deliveryAddress: '123 Street',
    save: jest.fn().mockImplementation(async () => doc),
    ...overrides,
  };
  return doc;
};

describe('OrdersService', () => {
  let service: OrdersService;
  let orderModel: OrderModelMock;
  const gateway: OrdersGateway = {
    broadcastOrderUpdate: jest.fn(),
  } as unknown as OrdersGateway;

  beforeEach(async () => {
    orderModel = Object.assign(jest.fn(), {
      find: jest.fn(),
      findById: jest.fn(),
    });

    orderModel.mockImplementation((payload) => {
      const doc = createOrderDocument(payload);
      doc.save = jest.fn().mockResolvedValue(doc);
      return doc;
    });

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        { provide: getModelToken(Order.name), useValue: orderModel },
        { provide: OrdersGateway, useValue: gateway },
      ],
    }).compile();

    service = module.get(OrdersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('calculates total and persists order', async () => {
      const dto = {
        customerId: 'customer-1',
        restaurantId: 'restaurant-1',
        deliveryAddress: '123 Street',
        items: [
          { quantity: 2, price: 5 },
          { quantity: 1, price: 10 },
        ],
      };

      const result = await service.create(dto as any);

      expect(orderModel).toHaveBeenCalledWith(
        expect.objectContaining({
          ...dto,
          orderId: expect.stringMatching(/^ORDER-\d+$/),
          totalPrice: 20,
        }),
      );
      const createdDoc = (orderModel.mock.results[0].value as any);
      expect(createdDoc.save).toHaveBeenCalled();
      expect(result.totalPrice).toBe(20);
    });
  });

  describe('findAll', () => {
    it('returns all orders for super admin', async () => {
      const orders = [createOrderDocument()];
      orderModel.find.mockReturnValue({
        exec: jest.fn().mockResolvedValue(orders),
      });

      const result = await service.findAll({ id: 'admin', role: 'superAdmin' });

      expect(orderModel.find).toHaveBeenCalledWith();
      expect(result).toEqual(orders);
    });

    it('filters by restaurant for restaurant users', async () => {
      const orders = [createOrderDocument()];
      orderModel.find.mockReturnValue({
        exec: jest.fn().mockResolvedValue(orders),
      });

      const result = await service.findAll({
        id: 'restaurant-1',
        role: 'restaurant',
      });

      expect(orderModel.find).toHaveBeenCalledWith({
        restaurantId: 'restaurant-1',
      });
      expect(result).toEqual(orders);
    });

    it('filters by customer for regular users', async () => {
      const orders = [createOrderDocument()];
      orderModel.find.mockReturnValue({
        exec: jest.fn().mockResolvedValue(orders),
      });

      const result = await service.findAll({
        id: 'customer-1',
        role: 'customer',
      });

      expect(orderModel.find).toHaveBeenCalledWith({
        customerId: 'customer-1',
      });
      expect(result).toEqual(orders);
    });
  });

  describe('findOne', () => {
    it('returns order when found', async () => {
      const order = createOrderDocument();
      orderModel.findById.mockReturnValue({
        exec: jest.fn().mockResolvedValue(order),
      });

      const result = await service.findOne('order-id');

      expect(orderModel.findById).toHaveBeenCalledWith('order-id');
      expect(result).toBe(order);
    });

    it('throws NotFoundException when order is missing', async () => {
      orderModel.findById.mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });

      await expect(service.findOne('missing')).rejects.toBeInstanceOf(
        NotFoundException,
      );
    });
  });

  describe('updateDetails', () => {
    it('updates order items and address for owner', async () => {
      const order = createOrderDocument();
      orderModel.findById.mockReturnValue({
        exec: jest.fn().mockResolvedValue(order),
      });

      const result = await service.updateDetails(
        'order-id',
        {
          items: [
            { quantity: 1, price: 15 },
            { quantity: 2, price: 5 },
          ],
          deliveryAddress: 'New Address',
        } as any,
        { id: 'customer-1', role: 'customer' },
      );

      expect(order.items).toHaveLength(2);
      expect(order.totalPrice).toBe(25);
      expect(order.deliveryAddress).toBe('New Address');
      expect(order.save).toHaveBeenCalled();
      expect(result).toBe(order);
    });

    it('allows super admin to update any order', async () => {
      const order = createOrderDocument({ customerId: 'other' });
      orderModel.findById.mockReturnValue({
        exec: jest.fn().mockResolvedValue(order),
      });

      await service.updateDetails(
        'order-id',
        { deliveryAddress: 'Admin Update' } as any,
        { id: 'admin', role: 'superAdmin' },
      );

      expect(order.deliveryAddress).toBe('Admin Update');
    });

    it('throws ForbiddenException when user does not own order', async () => {
      const order = createOrderDocument({ customerId: 'different' });
      orderModel.findById.mockReturnValue({
        exec: jest.fn().mockResolvedValue(order),
      });

      await expect(
        service.updateDetails(
          'order-id',
          { deliveryAddress: 'Nope' } as any,
          { id: 'customer-1', role: 'customer' },
        ),
      ).rejects.toBeInstanceOf(ForbiddenException);
    });
  });

  describe('updateStatus', () => {
    it('updates status for restaurant owner and broadcasts update', async () => {
      const order = createOrderDocument();
      orderModel.findById.mockReturnValue({
        exec: jest.fn().mockResolvedValue(order),
      });

      const result = await service.updateStatus(
        'order-id',
        { status: OrderStatus.Preparing } as any,
        { id: 'restaurant-1', role: 'restaurant' },
      );

      expect(order.status).toBe(OrderStatus.Preparing);
      expect(order.save).toHaveBeenCalled();
      expect(gateway.broadcastOrderUpdate).toHaveBeenCalledWith({
        orderId: 'order-id',
        status: OrderStatus.Preparing,
      });
      expect(result).toBe(order);
    });

    it('allows super admin to update any order status', async () => {
      const order = createOrderDocument({ restaurantId: 'another' });
      orderModel.findById.mockReturnValue({
        exec: jest.fn().mockResolvedValue(order),
      });

      await service.updateStatus(
        'order-id',
        { status: OrderStatus.Delivered } as any,
        { id: 'admin', role: 'superAdmin' },
      );

      expect(order.status).toBe(OrderStatus.Delivered);
    });

    it('throws ForbiddenException for customers', async () => {
      const order = createOrderDocument();
      orderModel.findById.mockReturnValue({
        exec: jest.fn().mockResolvedValue(order),
      });

      await expect(
        service.updateStatus(
          'order-id',
          { status: OrderStatus.Delivered } as any,
          { id: 'customer-1', role: 'customer' },
        ),
      ).rejects.toBeInstanceOf(ForbiddenException);
    });

    it('throws ForbiddenException when restaurant tries to update another restaurant order', async () => {
      const order = createOrderDocument({ restaurantId: 'other-restaurant' });
      orderModel.findById.mockReturnValue({
        exec: jest.fn().mockResolvedValue(order),
      });

      await expect(
        service.updateStatus(
          'order-id',
        { status: OrderStatus.Preparing } as any,
        { id: 'restaurant-1', role: 'restaurant' },
      ),
      ).rejects.toBeInstanceOf(ForbiddenException);
    });
  });

  describe('cancel', () => {
    it('cancels order for owner and broadcasts update', async () => {
      const order = createOrderDocument();
      orderModel.findById.mockReturnValue({
        exec: jest.fn().mockResolvedValue(order),
      });

      const result = await service.cancel('order-id', {
        id: 'customer-1',
        role: 'customer',
      });

      expect(order.status).toBe(OrderStatus.Canceled);
      expect(order.save).toHaveBeenCalled();
      expect(gateway.broadcastOrderUpdate).toHaveBeenCalledWith({
        orderId: 'order-id',
        status: OrderStatus.Canceled,
      });
      expect(result).toBe(order);
    });

    it('allows super admin to cancel any order', async () => {
      const order = createOrderDocument({ customerId: 'other' });
      orderModel.findById.mockReturnValue({
        exec: jest.fn().mockResolvedValue(order),
      });

      await service.cancel('order-id', {
        id: 'admin',
        role: 'superAdmin',
      });

      expect(order.status).toBe(OrderStatus.Canceled);
    });

    it('throws ForbiddenException when user does not own order', async () => {
      const order = createOrderDocument({ customerId: 'other' });
      orderModel.findById.mockReturnValue({
        exec: jest.fn().mockResolvedValue(order),
      });

      await expect(
        service.cancel('order-id', { id: 'customer-1', role: 'customer' }),
      ).rejects.toBeInstanceOf(ForbiddenException);
    });
  });
});
