import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { getModelToken } from '@nestjs/mongoose';
import { Payment } from '../src/schema/payment.schema';

// Mock Stripe
jest.mock('stripe', () => {
  return jest.fn().mockImplementation(() => ({
    paymentIntents: {
      create: jest.fn().mockResolvedValue({
        id: 'pi_test_123',
        client_secret: 'pi_test_123_secret',
        amount: 10000,
        currency: 'usd',
        status: 'requires_payment_method',
      }),
      retrieve: jest.fn().mockResolvedValue({
        id: 'pi_test_123',
        status: 'requires_payment_method',
      }),
      cancel: jest.fn().mockResolvedValue({}),
    },
    webhooks: {
      constructEvent: jest.fn(),
    },
  }));
});

// Mock Resend
jest.mock('resend', () => {
  return {
    Resend: jest.fn().mockImplementation(() => ({
      emails: {
        send: jest.fn().mockResolvedValue({ id: 'email_123' }),
      },
    })),
  };
});

// Mock Twilio
jest.mock('twilio', () => {
  return {
    Twilio: jest.fn().mockImplementation(() => ({
      messages: {
        create: jest.fn().mockResolvedValue({
          sid: 'SM123',
          status: 'sent',
        }),
      },
    })),
  };
});

describe('Payment Service E2E Tests', () => {
  let app: INestApplication;
  let mockPaymentModel: any;

  const mockPaymentData = {
    orderId: 'ORDER123',
    userId: 'USER123',
    amount: 100,
    currency: 'usd',
    email: 'test@example.com',
    phone: '+1234567890',
  };

  beforeAll(async () => {
    // Create mock Payment model
    mockPaymentModel = {
      findOne: jest.fn(),
      findOneAndUpdate: jest.fn(),
      findByIdAndUpdate: jest.fn(),
      deleteOne: jest.fn(),
      exec: jest.fn(),
    };

    // Mock the model constructor
    const PaymentModelMock = function (data) {
      return {
        ...data,
        _id: 'mockPaymentId',
        save: jest.fn().mockResolvedValue({
          ...data,
          _id: 'mockPaymentId',
          createdAt: new Date(),
          updatedAt: new Date(),
        }),
      };
    };

    Object.assign(PaymentModelMock, mockPaymentModel);

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(getModelToken(Payment.name))
      .useValue(PaymentModelMock)
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
      }),
    );
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/payment/process', () => {
    it('should process a payment successfully', async () => {
      mockPaymentModel.findOne.mockResolvedValue(null);

      const response = await request(app.getHttpServer())
        .post('/api/payment/process')
        .send(mockPaymentData)
        .expect(200);

      expect(response.body).toHaveProperty('clientSecret');
      expect(response.body).toHaveProperty('paymentId');
      expect(response.body).toHaveProperty('disablePayment', false);
    });

    it('should return error for missing required fields', async () => {
      const invalidData = {
        orderId: 'ORDER123',
        // Missing other required fields
      };

      await request(app.getHttpServer())
        .post('/api/payment/process')
        .send(invalidData)
        .expect(500); // Will fail due to missing fields
    });

    it('should handle payment without phone number', async () => {
      mockPaymentModel.findOne.mockResolvedValue(null);

      const dataWithoutPhone = {
        ...mockPaymentData,
        phone: '',
      };

      const response = await request(app.getHttpServer())
        .post('/api/payment/process')
        .send(dataWithoutPhone)
        .expect(200);

      expect(response.body).toHaveProperty('clientSecret');
    });
  });

  describe('GET /api/payment/order/:orderId', () => {
    it('should retrieve payment by orderId', async () => {
      const mockPayment = {
        ...mockPaymentData,
        _id: 'paymentId',
        status: 'Pending',
        stripePaymentIntentId: 'pi_123',
        stripeClientSecret: 'secret_123',
      };

      mockPaymentModel.findOne.mockResolvedValue(mockPayment);

      const response = await request(app.getHttpServer())
        .get('/api/payment/order/ORDER123')
        .expect(200);

      expect(response.body).toHaveProperty('orderId', 'ORDER123');
    });

    it('should return null for non-existent order', async () => {
      mockPaymentModel.findOne.mockResolvedValue(null);

      const response = await request(app.getHttpServer())
        .get('/api/payment/order/NONEXISTENT')
        .expect(200);

      expect(response.body).toBeNull();
    });
  });

  describe('POST /api/payment/webhook', () => {
    it('should handle payment_intent.succeeded webhook', async () => {
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

      // Mock Stripe webhook verification
      const stripe = require('stripe');
      stripe().webhooks.constructEvent.mockReturnValue(mockEvent);

      mockPaymentModel.findOne.mockResolvedValue(mockPayment);
      mockPaymentModel.findOneAndUpdate.mockReturnValue({
        exec: jest.fn().mockResolvedValue({
          ...mockPayment,
          status: 'Paid',
        }),
      });

      const response = await request(app.getHttpServer())
        .post('/api/payment/webhook')
        .set('stripe-signature', 'valid_signature')
        .send(mockEvent)
        .expect(200);

      expect(response.body).toHaveProperty('received', true);
    });

    it('should return 400 for invalid webhook signature', async () => {
      const stripe = require('stripe');
      stripe().webhooks.constructEvent.mockImplementation(() => {
        throw new Error('Invalid signature');
      });

      await request(app.getHttpServer())
        .post('/api/payment/webhook')
        .set('stripe-signature', 'invalid_signature')
        .send({})
        .expect(400);
    });
  });

  describe('GET /', () => {
    it('should return Hello World', async () => {
      const response = await request(app.getHttpServer())
        .get('/')
        .expect(200);

      expect(response.text).toBe('Hello World!');
    });
  });
});

