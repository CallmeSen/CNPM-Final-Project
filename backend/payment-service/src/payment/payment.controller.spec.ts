import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { HttpException, HttpStatus } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';

// Mock Stripe before importing anything else
const mockPaymentIntents = {
  create: jest.fn(),
  retrieve: jest.fn(),
  cancel: jest.fn(),
};

jest.mock('stripe', () => {
  return jest.fn().mockImplementation(() => ({
    paymentIntents: mockPaymentIntents,
  }));
});

describe('PaymentController', () => {
  let controller: PaymentController;
  let paymentService: PaymentService;
  let configService: ConfigService;

  const mockPaymentService = {
    createPayment: jest.fn(),
    findByOrderId: jest.fn(),
    updatePayment: jest.fn(),
    deleteByOrderId: jest.fn(),
    updatePaymentByOrderId: jest.fn(),
  };

  const mockConfigService = {
    get: jest.fn((key: string) => {
      const config = {
        STRIPE_SECRET_KEY: 'sk_test_mock',
        FRONTEND_ORIGIN: 'http://localhost:3000',
      };
      return config[key];
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentController],
      providers: [
        {
          provide: PaymentService,
          useValue: mockPaymentService,
        },
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    controller = module.get<PaymentController>(PaymentController);
    paymentService = module.get<PaymentService>(PaymentService);
    configService = module.get<ConfigService>(ConfigService);
  });

  afterEach(() => {
    jest.clearAllMocks();
    mockPaymentIntents.create.mockClear();
    mockPaymentIntents.retrieve.mockClear();
    mockPaymentIntents.cancel.mockClear();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('processPayment', () => {
    const paymentRequest = {
      orderId: 'ORDER123',
      userId: 'USER123',
      amount: 100,
      currency: 'usd',
      email: 'test@example.com',
      phone: '+1234567890',
    };

    it('should create a new payment intent when no existing payment', async () => {
      mockPaymentService.findByOrderId.mockResolvedValue(null);
      mockPaymentService.createPayment.mockResolvedValue({
        _id: 'paymentId',
        ...paymentRequest,
        status: 'Pending',
        stripePaymentIntentId: 'pi_123',
        stripeClientSecret: 'secret_123',
      });

      // Mock Stripe payment intent creation
      mockPaymentIntents.create.mockResolvedValue({
        id: 'pi_123',
        client_secret: 'secret_123',
        amount: 10000,
        currency: 'usd',
      });

      const result = await controller.processPayment(paymentRequest);

      expect(result).toHaveProperty('clientSecret', 'secret_123');
      expect(result).toHaveProperty('paymentId', 'paymentId');
      expect(result).toHaveProperty('disablePayment', false);
      expect(mockPaymentService.createPayment).toHaveBeenCalled();
    });

    it('should return message if order already paid', async () => {
      mockPaymentService.findByOrderId.mockResolvedValue({
        orderId: 'ORDER123',
        status: 'Paid',
        stripeClientSecret: 'secret_123',
        stripePaymentIntentId: 'pi_123',
      });

      const result = await controller.processPayment(paymentRequest);

      expect(result).toHaveProperty('disablePayment', true);
      expect(result).toHaveProperty('paymentStatus', 'Paid');
      expect(result).toHaveProperty(
        'message',
        '✅ This order has already been paid successfully.',
      );
    });

    it('should reuse existing valid payment intent', async () => {
      const existingPayment = {
        _id: 'paymentId',
        orderId: 'ORDER123',
        status: 'Pending',
        stripeClientSecret: 'secret_123',
        stripePaymentIntentId: 'pi_123',
      };

      mockPaymentService.findByOrderId.mockResolvedValue(existingPayment);

      mockPaymentIntents.retrieve.mockResolvedValue({
        id: 'pi_123',
        status: 'requires_payment_method',
        client_secret: 'secret_123',
      });

      const result = await controller.processPayment(paymentRequest);

      expect(result).toHaveProperty('clientSecret', 'secret_123');
      expect(result).toHaveProperty('disablePayment', false);
    });

    it('should create new intent if old one is invalid', async () => {
      const existingPayment = {
        _id: 'paymentId',
        orderId: 'ORDER123',
        status: 'Pending',
        stripeClientSecret: 'secret_old',
        stripePaymentIntentId: 'pi_old',
      };

      mockPaymentService.findByOrderId.mockResolvedValue(existingPayment);

      // First retrieve returns invalid status
      mockPaymentIntents.retrieve.mockRejectedValue(
        new Error('Invalid payment intent'),
      );

      mockPaymentIntents.cancel.mockResolvedValue({});

      mockPaymentService.deleteByOrderId.mockResolvedValue(undefined);

      // Create new payment intent
      mockPaymentIntents.create.mockResolvedValue({
        id: 'pi_new',
        client_secret: 'secret_new',
        amount: 10000,
        currency: 'usd',
      });

      mockPaymentService.createPayment.mockResolvedValue({
        _id: 'newPaymentId',
        ...paymentRequest,
        status: 'Pending',
        stripePaymentIntentId: 'pi_new',
        stripeClientSecret: 'secret_new',
      });

      const result = await controller.processPayment(paymentRequest);

      expect(result).toHaveProperty('clientSecret', 'secret_new');
      expect(mockPaymentService.deleteByOrderId).toHaveBeenCalledWith(
        'ORDER123',
      );
      expect(mockPaymentService.createPayment).toHaveBeenCalled();
    });

    it('should handle duplicate key error (race condition)', async () => {
      mockPaymentService.findByOrderId.mockResolvedValueOnce(null);

      mockPaymentIntents.create.mockResolvedValue({
        id: 'pi_123',
        client_secret: 'secret_123',
        amount: 10000,
        currency: 'usd',
      });

      const duplicateError: any = new Error('Duplicate key');
      duplicateError.code = 11000;
      mockPaymentService.createPayment.mockRejectedValue(duplicateError);

      // Second findByOrderId returns the payment
      mockPaymentService.findByOrderId.mockResolvedValueOnce({
        _id: 'paymentId',
        orderId: 'ORDER123',
        status: 'Pending',
        stripeClientSecret: 'secret_123',
        stripePaymentIntentId: 'pi_123',
      });

      mockPaymentIntents.retrieve.mockResolvedValue({
        id: 'pi_123',
        status: 'requires_payment_method',
      });

      const result = await controller.processPayment(paymentRequest);

      expect(result).toHaveProperty('clientSecret', 'secret_123');
    });

    it('should handle payment without phone number', async () => {
      const paymentWithoutPhone = {
        ...paymentRequest,
        phone: '',
      };

      mockPaymentService.findByOrderId.mockResolvedValue(null);

      mockPaymentIntents.create.mockResolvedValue({
        id: 'pi_123',
        client_secret: 'secret_123',
        amount: 10000,
        currency: 'usd',
      });

      mockPaymentService.createPayment.mockResolvedValue({
        _id: 'paymentId',
        orderId: 'ORDER123',
        userId: 'USER123',
        amount: 100,
        currency: 'usd',
        status: 'Pending',
        email: 'test@example.com',
        stripePaymentIntentId: 'pi_123',
        stripeClientSecret: 'secret_123',
      });

      const result = await controller.processPayment(paymentWithoutPhone);

      expect(result).toHaveProperty('clientSecret', 'secret_123');
      expect(mockPaymentService.createPayment).toHaveBeenCalled();
    });

    it('should throw error for general payment processing failure', async () => {
      mockPaymentService.findByOrderId.mockResolvedValue(null);

      mockPaymentIntents.create.mockRejectedValue(
        new Error('Stripe API error'),
      );

      await expect(controller.processPayment(paymentRequest)).rejects.toThrow(
        HttpException,
      );
    });
  });

  describe('getByOrderId', () => {
    it('should return payment by orderId', async () => {
      const mockPayment = {
        orderId: 'ORDER123',
        userId: 'USER123',
        amount: 100,
        status: 'Pending',
      };

      mockPaymentService.findByOrderId.mockResolvedValue(mockPayment);

      const result = await controller.getByOrderId('ORDER123');

      expect(result).toEqual(mockPayment);
      expect(mockPaymentService.findByOrderId).toHaveBeenCalledWith('ORDER123');
    });

    it('should return null if payment not found', async () => {
      mockPaymentService.findByOrderId.mockResolvedValue(null);

      const result = await controller.getByOrderId('NONEXISTENT');

      expect(result).toBeNull();
    });
  });
});

