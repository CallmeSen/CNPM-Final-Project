import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaymentService } from './payment.service';
import { Payment } from '../schema/payment.schema';

describe('PaymentService', () => {
  let service: PaymentService;
  let model: Model<Payment>;

  const mockPayment = {
    _id: 'mockPaymentId',
    orderId: 'ORDER123',
    userId: 'USER123',
    amount: 100,
    currency: 'usd',
    status: 'Pending',
    email: 'test@example.com',
    phone: '+1234567890',
    stripePaymentIntentId: 'pi_123456',
    stripeClientSecret: 'secret_123',
    save: jest.fn().mockResolvedValue(this),
  };

  const mockPaymentModel = {
    new: jest.fn().mockResolvedValue(mockPayment),
    constructor: jest.fn().mockResolvedValue(mockPayment),
    find: jest.fn(),
    findOne: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findOneAndUpdate: jest.fn(),
    deleteOne: jest.fn(),
    save: jest.fn(),
    exec: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentService,
        {
          provide: getModelToken(Payment.name),
          useValue: mockPaymentModel,
        },
      ],
    }).compile();

    service = module.get<PaymentService>(PaymentService);
    model = module.get<Model<Payment>>(getModelToken(Payment.name));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createPayment', () => {
    it('should create a new payment', async () => {
      const paymentData = {
        orderId: 'ORDER123',
        userId: 'USER123',
        amount: 100,
        currency: 'usd',
        status: 'Pending' as const,
        email: 'test@example.com',
        stripePaymentIntentId: 'pi_123456',
        stripeClientSecret: 'secret_123',
      };

      const saveMock = jest.fn().mockResolvedValue({
        ...paymentData,
        _id: 'mockPaymentId',
      });

      // Override the model constructor for this test
      mockPaymentModel.new = jest.fn().mockReturnValue({ save: saveMock });

      const result = await service.createPayment(paymentData);

      expect(result).toBeDefined();
    });
  });

  describe('findByOrderId', () => {
    it('should find a payment by orderId', async () => {
      mockPaymentModel.findOne.mockReturnValue(mockPayment);

      const result = await service.findByOrderId('ORDER123');

      expect(mockPaymentModel.findOne).toHaveBeenCalledWith({
        orderId: 'ORDER123',
      });
      expect(result).toEqual(mockPayment);
    });

    it('should return null if payment not found', async () => {
      mockPaymentModel.findOne.mockReturnValue(null);

      const result = await service.findByOrderId('NONEXISTENT');

      expect(result).toBeNull();
    });
  });

  describe('findByPaymentIntentId', () => {
    it('should find a payment by stripePaymentIntentId', async () => {
      const execMock = jest.fn().mockResolvedValue(mockPayment);
      mockPaymentModel.findOne.mockReturnValue({ exec: execMock });

      const result = await service.findByPaymentIntentId('pi_123456');

      expect(mockPaymentModel.findOne).toHaveBeenCalledWith({
        stripePaymentIntentId: 'pi_123456',
      });
      expect(execMock).toHaveBeenCalled();
      expect(result).toEqual(mockPayment);
    });
  });

  describe('updatePayment', () => {
    it('should update a payment by id', async () => {
      const updatedPayment = { ...mockPayment, status: 'Paid' };
      mockPaymentModel.findByIdAndUpdate.mockReturnValue(updatedPayment);

      const result = await service.updatePayment('mockPaymentId', {
        status: 'Paid',
      });

      expect(mockPaymentModel.findByIdAndUpdate).toHaveBeenCalledWith(
        'mockPaymentId',
        { status: 'Paid' },
        { new: true },
      );
      expect(result).toEqual(updatedPayment);
    });
  });

  describe('updatePaymentByOrderId', () => {
    it('should update a payment by orderId', async () => {
      const updatedPayment = { ...mockPayment, status: 'Paid' };
      const execMock = jest.fn().mockResolvedValue(updatedPayment);
      mockPaymentModel.findOneAndUpdate.mockReturnValue({ exec: execMock });

      const result = await service.updatePaymentByOrderId('ORDER123', {
        status: 'Paid',
      });

      expect(mockPaymentModel.findOneAndUpdate).toHaveBeenCalledWith(
        { orderId: 'ORDER123' },
        { status: 'Paid' },
        { new: true },
      );
      expect(execMock).toHaveBeenCalled();
      expect(result).toEqual(updatedPayment);
    });
  });

  describe('deleteByOrderId', () => {
    it('should delete a payment by orderId', async () => {
      const execMock = jest.fn().mockResolvedValue({ deletedCount: 1 });
      mockPaymentModel.deleteOne.mockReturnValue({ exec: execMock });

      await service.deleteByOrderId('ORDER123');

      expect(mockPaymentModel.deleteOne).toHaveBeenCalledWith({
        orderId: 'ORDER123',
      });
      expect(execMock).toHaveBeenCalled();
    });
  });
});

