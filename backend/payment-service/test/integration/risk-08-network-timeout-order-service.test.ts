import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { ConfigService } from '@nestjs/config';
import { PaymentService } from '../../src/payment/payment.service';
import { EmailService } from '../../src/payment/email.service';
import { TwilioService } from '../../src/payment/twilio.service';
import axios from 'axios';

// Mock Stripe before any imports
jest.mock('stripe', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => ({
    webhooks: {
      constructEvent: jest.fn().mockReturnValue({
        type: 'payment_intent.succeeded',
        data: {
          object: {
            id: 'pi_test',
            metadata: { orderId: 'test-order' },
          },
        },
      }),
    },
  })),
}));

describe('RISK-08: Network timeout to order-service during status update (Integration)', () => {
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
          if (key === 'ORDER_SERVICE_URL') return 'http://unreachable-order-service:5005';
          if (key === 'STRIPE_WEBHOOK_SECRET') return 'whsec_test_webhook_secret_for_testing';
          if (key === 'STRIPE_SECRET_KEY') return process.env.STRIPE_SECRET_KEY || 'sk_test_valid';
          return null;
        }),
      })
      .overrideProvider(PaymentService)
      .useValue({
        findByOrderId: jest.fn().mockResolvedValue({
          orderId: 'test-order',
          status: 'pending',
          email: 'test@example.com',
          phone: '+1234567890',
          amount: 25.99,
          currency: 'usd',
          createdAt: new Date(),
        }),
        findByPaymentIntentId: jest.fn().mockResolvedValue(null),
        updatePaymentByOrderId: jest.fn().mockResolvedValue({
          orderId: 'test-order',
          status: 'completed',
          email: 'test@example.com',
          phone: '+1234567890',
        }),
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

    // Mock axios to simulate timeout
    jest.spyOn(axios, 'patch').mockImplementation(() => {
      return new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Timeout')), 3000); // 3 second timeout
      });
    });

    await app.init();
  });

  afterAll(async () => {
    jest.restoreAllMocks();
    await app.close();
  });

  it('should handle order-service timeout gracefully', async () => {
    jest.setTimeout(10000); // Increase timeout for this test
    const payload = JSON.stringify({
      type: 'payment_intent.succeeded',
      data: { object: { id: 'pi_test', metadata: { orderId: 'test-order' } } },
    });

    // Assume valid signature
    const signature = 'valid_signature';

    const response = await request(app.getHttpServer())
      .post('/api/payment/webhook')
      .set('stripe-signature', signature)
      .set('Content-Type', 'application/json')
      .send(payload);

    expect(response.status).toBe(200); // Webhook succeeds despite timeout
    expect(response.body).toEqual({ received: true });
  });
});