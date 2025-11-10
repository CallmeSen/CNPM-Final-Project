import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { StripeService } from './stripe.service';
import { PaymentService } from './payment.service';
import { EmailService } from './email.service';
import { TwilioService } from './twilio.service';
import { Request, Response } from 'express';

// Mock Stripe webhooks
const mockWebhooks = {
  constructEvent: jest.fn(),
};

jest.mock('stripe', () => {
  return jest.fn().mockImplementation(() => ({
    webhooks: mockWebhooks,
  }));
});

describe('StripeService', () => {
  let service: StripeService;
  let paymentService: PaymentService;
  let emailService: EmailService;
  let twilioService: TwilioService;

  const mockPaymentService = {
    findByOrderId: jest.fn(),
    findByPaymentIntentId: jest.fn(),
    updatePaymentByOrderId: jest.fn(),
  };

  const mockEmailService = {
    sendPaymentReceipt: jest.fn(),
  };

  const mockTwilioService = {
    sendPaymentSMS: jest.fn(),
  };

  const mockConfigService = {
    get: jest.fn((key: string) => {
      const config = {
        STRIPE_SECRET_KEY: 'sk_test_mock',
        STRIPE_WEBHOOK_SECRET: 'whsec_test_mock',
      };
      return config[key];
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StripeService,
        {
          provide: PaymentService,
          useValue: mockPaymentService,
        },
        {
          provide: EmailService,
          useValue: mockEmailService,
        },
        {
          provide: TwilioService,
          useValue: mockTwilioService,
        },
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    service = module.get<StripeService>(StripeService);
    paymentService = module.get<PaymentService>(PaymentService);
    emailService = module.get<EmailService>(EmailService);
    twilioService = module.get<TwilioService>(TwilioService);
  });

  afterEach(() => {
    jest.clearAllMocks();
    mockWebhooks.constructEvent.mockClear();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('handleWebhook', () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;

    beforeEach(() => {
      mockRequest = {
        body: {},
        headers: {
          'stripe-signature': 'mock_signature',
        },
      };

      mockResponse = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };
    });

    it('should return 400 if webhook signature verification fails', async () => {
      mockWebhooks.constructEvent.mockImplementation(() => {
        throw new Error('Invalid signature');
      });

      await service.handleWebhook(
        mockRequest as Request,
        mockResponse as Response,
      );

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.send).toHaveBeenCalledWith(
        'Webhook Error: Invalid signature',
      );
    });

    it('should handle payment_intent.succeeded event', async () => {
      const mockEvent = {
        type: 'payment_intent.succeeded',
        data: {
          object: {
            id: 'pi_123',
            amount_received: 10000,
            metadata: {
              orderId: 'ORDER123',
              userId: 'USER123',
            },
          },
        },
      };

      mockWebhooks.constructEvent.mockReturnValue(mockEvent);

      const mockPayment = {
        orderId: 'ORDER123',
        userId: 'USER123',
        amount: 100,
        currency: 'usd',
        status: 'Pending',
        email: 'test@example.com',
        phone: '+1234567890',
        createdAt: new Date(),
      };

      mockPaymentService.findByOrderId.mockResolvedValue(mockPayment);
      mockPaymentService.updatePaymentByOrderId.mockResolvedValue({
        ...mockPayment,
        status: 'Paid',
      });
      mockTwilioService.sendPaymentSMS.mockResolvedValue(undefined);
      mockEmailService.sendPaymentReceipt.mockResolvedValue(undefined);

      await service.handleWebhook(
        mockRequest as Request,
        mockResponse as Response,
      );

      expect(mockPaymentService.updatePaymentByOrderId).toHaveBeenCalledWith(
        'ORDER123',
        { status: 'Paid' },
      );
      expect(mockTwilioService.sendPaymentSMS).toHaveBeenCalledWith(
        '+1234567890',
        expect.stringContaining('successful'),
      );
      expect(mockEmailService.sendPaymentReceipt).toHaveBeenCalled();
      expect(mockResponse.json).toHaveBeenCalledWith({ received: true });
    });

    it('should handle payment_intent.payment_failed event', async () => {
      const mockEvent = {
        type: 'payment_intent.payment_failed',
        data: {
          object: {
            id: 'pi_123',
            metadata: {
              orderId: 'ORDER123',
            },
          },
        },
      };

      mockWebhooks.constructEvent.mockReturnValue(mockEvent);

      const mockPayment = {
        orderId: 'ORDER123',
        userId: 'USER123',
        amount: 100,
        currency: 'usd',
        status: 'Pending',
        email: 'test@example.com',
        phone: '+1234567890',
        createdAt: new Date(),
      };

      mockPaymentService.findByOrderId.mockResolvedValue(mockPayment);
      mockPaymentService.updatePaymentByOrderId.mockResolvedValue({
        ...mockPayment,
        status: 'Failed',
      });
      mockTwilioService.sendPaymentSMS.mockResolvedValue(undefined);
      mockEmailService.sendPaymentReceipt.mockResolvedValue(undefined);

      await service.handleWebhook(
        mockRequest as Request,
        mockResponse as Response,
      );

      expect(mockPaymentService.updatePaymentByOrderId).toHaveBeenCalledWith(
        'ORDER123',
        { status: 'Failed' },
      );
      expect(mockTwilioService.sendPaymentSMS).toHaveBeenCalledWith(
        '+1234567890',
        expect.stringContaining('failed'),
      );
      expect(mockResponse.json).toHaveBeenCalledWith({ received: true });
    });

    it('should handle payment without phone number', async () => {
      const mockEvent = {
        type: 'payment_intent.succeeded',
        data: {
          object: {
            id: 'pi_123',
            metadata: {
              orderId: 'ORDER123',
            },
          },
        },
      };

      mockWebhooks.constructEvent.mockReturnValue(mockEvent);

      const mockPayment = {
        orderId: 'ORDER123',
        userId: 'USER123',
        amount: 100,
        currency: 'usd',
        status: 'Pending',
        email: 'test@example.com',
        phone: null,
        createdAt: new Date(),
      };

      mockPaymentService.findByOrderId.mockResolvedValue(mockPayment);
      mockPaymentService.updatePaymentByOrderId.mockResolvedValue({
        ...mockPayment,
        status: 'Paid',
      });
      mockEmailService.sendPaymentReceipt.mockResolvedValue(undefined);

      await service.handleWebhook(
        mockRequest as Request,
        mockResponse as Response,
      );

      expect(mockTwilioService.sendPaymentSMS).not.toHaveBeenCalled();
      expect(mockEmailService.sendPaymentReceipt).toHaveBeenCalled();
    });

    it('should handle SMS sending failure gracefully', async () => {
      const mockEvent = {
        type: 'payment_intent.succeeded',
        data: {
          object: {
            id: 'pi_123',
            metadata: {
              orderId: 'ORDER123',
            },
          },
        },
      };

      mockWebhooks.constructEvent.mockReturnValue(mockEvent);

      const mockPayment = {
        orderId: 'ORDER123',
        amount: 100,
        currency: 'usd',
        status: 'Pending',
        email: 'test@example.com',
        phone: '+1234567890',
        createdAt: new Date(),
      };

      mockPaymentService.findByOrderId.mockResolvedValue(mockPayment);
      mockPaymentService.updatePaymentByOrderId.mockResolvedValue({
        ...mockPayment,
        status: 'Paid',
      });
      mockTwilioService.sendPaymentSMS.mockRejectedValue(
        new Error('Twilio error'),
      );
      mockEmailService.sendPaymentReceipt.mockResolvedValue(undefined);

      await service.handleWebhook(
        mockRequest as Request,
        mockResponse as Response,
      );

      // Should still complete successfully despite SMS failure
      expect(mockResponse.json).toHaveBeenCalledWith({ received: true });
    });

    it('should return 404 if payment record not found', async () => {
      const mockEvent = {
        type: 'payment_intent.succeeded',
        data: {
          object: {
            id: 'pi_123',
            metadata: {
              orderId: 'ORDER123',
            },
          },
        },
      };

      mockWebhooks.constructEvent.mockReturnValue(mockEvent);

      mockPaymentService.findByOrderId.mockResolvedValue(null);
      mockPaymentService.findByPaymentIntentId.mockResolvedValue(null);

      await service.handleWebhook(
        mockRequest as Request,
        mockResponse as Response,
      );

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: 'Payment record not found',
      });
    });

    it('should handle unhandled event types', async () => {
      const mockEvent = {
        type: 'customer.created',
        data: {
          object: {
            id: 'cus_123',
          },
        },
      };

      mockWebhooks.constructEvent.mockReturnValue(mockEvent);

      await service.handleWebhook(
        mockRequest as Request,
        mockResponse as Response,
      );

      expect(mockResponse.json).toHaveBeenCalledWith({ received: true });
    });

    it('should not update payment if already in final state', async () => {
      const mockEvent = {
        type: 'payment_intent.succeeded',
        data: {
          object: {
            id: 'pi_123',
            metadata: {
              orderId: 'ORDER123',
            },
          },
        },
      };

      mockWebhooks.constructEvent.mockReturnValue(mockEvent);

      const mockPayment = {
        orderId: 'ORDER123',
        status: 'Paid', // Already paid
        email: 'test@example.com',
        createdAt: new Date(),
      };

      mockPaymentService.findByOrderId.mockResolvedValue(mockPayment);

      await service.handleWebhook(
        mockRequest as Request,
        mockResponse as Response,
      );

      expect(mockPaymentService.updatePaymentByOrderId).not.toHaveBeenCalled();
      expect(mockResponse.json).toHaveBeenCalledWith({ received: true });
    });
  });
});

