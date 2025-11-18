import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { ConfigService } from '@nestjs/config';
import { PaymentService } from '../../src/payment/payment.service';
import { EmailService } from '../../src/payment/email.service';
import { TwilioService } from '../../src/payment/twilio.service';

// Mock Stripe before any imports
jest.mock('stripe', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => ({
    paymentIntents: {
      create: jest.fn()
        .mockResolvedValueOnce({
          id: 'pi_test_duplicate_1',
          client_secret: 'pi_test_secret_1',
          status: 'requires_payment_method',
        })
        .mockResolvedValueOnce({
          id: 'pi_test_duplicate_2',
          client_secret: 'pi_test_secret_2',
          status: 'requires_payment_method',
        }),
      retrieve: jest.fn().mockRejectedValue(new Error('Intent expired')),
    },
  })),
}));

describe('RISK-06: Duplicate payment intent creation race condition (Integration)', () => {
  let app: INestApplication;
  let configService: ConfigService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(ConfigService)
      .useValue({
        get: jest.fn((key: string) => {
          if (key === 'MONGO_PAY_URL') return 'mongodb://payment:payment123@localhost:28019/Payment';
          if (key === 'STRIPE_SECRET_KEY') return process.env.STRIPE_SECRET_KEY || 'sk_test_valid';
          return null;
        }),
      })
      .overrideProvider(PaymentService)
      .useValue({
        findByOrderId: jest.fn()
          .mockResolvedValueOnce(null) // First request - no existing payment
          .mockResolvedValueOnce({     // Second request (line 54) - existing payment found
            orderId: 'duplicate-order-06',
            status: 'pending',
            email: 'test@example.com',
            phone: '+1234567890',
            amount: 100,
            currency: 'usd',
            createdAt: new Date(),
            stripePaymentIntentId: 'pi_test_duplicate_1',
            stripeClientSecret: 'pi_test_secret_1',
          })
          .mockResolvedValueOnce({     // Second request (catch block, line 137) - still existing
            orderId: 'duplicate-order-06',
            status: 'pending',
            email: 'test@example.com',
            phone: '+1234567890',
            amount: 100,
            currency: 'usd',
            createdAt: new Date(),
            stripePaymentIntentId: 'pi_test_duplicate_1',
            stripeClientSecret: 'pi_test_secret_1',
          }),
        createPayment: jest.fn()
          .mockResolvedValueOnce({     // First call succeeds
            orderId: 'duplicate-order-06',
            status: 'pending',
            email: 'test@example.com',
            phone: '+1234567890',
            amount: 100,
            currency: 'usd',
            createdAt: new Date(),
            _id: 'payment_id_1',
            stripeClientSecret: 'pi_test_secret_1',
          })
          .mockRejectedValueOnce({     // Second call fails with duplicate key error
            code: 11000,
            message: 'Duplicate key error',
          }),
        deleteByOrderId: jest.fn().mockResolvedValue(undefined),
      })
      .overrideProvider(EmailService)
      .useValue({
        sendPaymentReceipt: jest.fn().mockResolvedValue(undefined),
      })
      .overrideProvider(TwilioService)
      .useValue({
        sendPaymentSMS: jest.fn().mockResolvedValue(undefined),
      })
      .compile();

    app = moduleFixture.createNestApplication();
    configService = moduleFixture.get<ConfigService>(ConfigService);

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should handle duplicate orderId with 409 conflict', async () => {
    const paymentData = {
      orderId: 'duplicate-order-06',
      userId: 'user123',
      amount: 100,
      currency: 'usd',
      email: 'test@example.com',
    };

    // First request
    await request(app.getHttpServer())
      .post('/api/payment/process')
      .send(paymentData);

    // Second concurrent request with same orderId
    const response = await request(app.getHttpServer())
      .post('/api/payment/process')
      .send(paymentData);

    expect(response.status).toBe(409); // Conflict due to duplicate
    expect(response.body.error).toContain('Payment intent expired');
  });
});