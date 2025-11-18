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
          id: 'pi_expired_1',
          client_secret: 'pi_expired_secret_1',
          status: 'requires_payment_method',
        })
        .mockResolvedValueOnce({
          id: 'pi_expired_2',
          client_secret: 'pi_expired_secret_2',
          status: 'requires_payment_method',
        }),
      retrieve: jest.fn().mockRejectedValue(new Error('Intent expired')),
      cancel: jest.fn().mockResolvedValue({}),
    },
  })),
}));

describe('RISK-07: Payment intent expiration handling (Integration)', () => {
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
          .mockResolvedValueOnce({     // Second request - existing payment with expired intent
            orderId: 'expired-order-07',
            status: 'pending',
            email: 'test@example.com',
            phone: '+1234567890',
            amount: 100,
            currency: 'usd',
            createdAt: new Date(),
            stripePaymentIntentId: 'pi_expired_1',
            stripeClientSecret: 'pi_expired_secret_1',
          }),
        createPayment: jest.fn()
          .mockResolvedValueOnce({     // First payment creation succeeds
            orderId: 'expired-order-07',
            status: 'pending',
            email: 'test@example.com',
            phone: '+1234567890',
            amount: 100,
            currency: 'usd',
            createdAt: new Date(),
            _id: 'payment_id_1',
            stripeClientSecret: 'pi_expired_secret_1',
          })
          .mockResolvedValueOnce({     // Second payment creation succeeds (after deleting expired one)
            orderId: 'expired-order-07',
            status: 'pending',
            email: 'test@example.com',
            phone: '+1234567890',
            amount: 100,
            currency: 'usd',
            createdAt: new Date(),
            _id: 'payment_id_2',
            stripeClientSecret: 'pi_expired_secret_2',
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

  it('should handle expired payment intent by creating new one', async () => {
    const paymentData = {
      orderId: 'expired-order-07',
      userId: 'user123',
      amount: 100,
      currency: 'usd',
      email: 'test@example.com',
    };

    // First request to create intent
    const firstResponse = await request(app.getHttpServer())
      .post('/api/payment/process')
      .send(paymentData);

    expect(firstResponse.status).toBe(201);
    expect(firstResponse.body.clientSecret).toBeDefined();

    // Simulate expiration by retrying (in real scenario, wait 24h)
    const secondResponse = await request(app.getHttpServer())
      .post('/api/payment/process')
      .send(paymentData);

    expect(secondResponse.status).toBe(201); // Should create new intent
    expect(secondResponse.body.clientSecret).toBeDefined();
    expect(secondResponse.body.clientSecret).not.toBe(firstResponse.body.clientSecret);
  });
});