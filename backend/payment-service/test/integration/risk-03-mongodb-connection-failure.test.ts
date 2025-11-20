import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { ConfigService } from '@nestjs/config';
import { PaymentService } from '../../src/payment/payment.service';
import { EmailService } from '../../src/payment/email.service';
import { TwilioService } from '../../src/payment/twilio.service';

jest.setTimeout(30000);

// Mock Stripe before any imports
jest.mock('stripe', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => ({
    paymentIntents: {
      create: jest.fn().mockRejectedValue(new Error('MongoDB connection failed')),
    },
  })),
}));

describe('RISK-03: MongoDB connection failure during payment creation (Integration)', () => {
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
        createPayment: jest.fn().mockRejectedValue(new Error('MongoDB connection failed')),
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

  it('should return 500 when MongoDB connection fails', async () => {
    const paymentData = {
      orderId: 'test-order-03',
      userId: 'user123',
      amount: 100,
      currency: 'usd',
      email: 'test@example.com',
    };

    const response = await request(app.getHttpServer())
      .post('/api/payment/process')
      .send(paymentData);

    expect(response.status).toBe(500);
    expect(response.body.message).toContain('Payment processing failed');
  });
});