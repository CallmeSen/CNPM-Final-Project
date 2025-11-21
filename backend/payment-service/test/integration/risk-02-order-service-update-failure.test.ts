import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { ConfigService } from '@nestjs/config';
import { PaymentService } from '../../src/payment/payment.service';
import { EmailService } from '../../src/payment/email.service';
import { TwilioService } from '../../src/payment/twilio.service';
import axios from 'axios';

jest.setTimeout(30000);

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

describe('RISK-02: Order-service update failure after payment success (Integration)', () => {
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
          if (key === 'ORDER_SERVICE_URL') return 'http://localhost:5005'; // Simulate order-service down
          if (key === 'STRIPE_WEBHOOK_SECRET') return 'whsec_test_webhook_secret_for_testing';
          if (key === 'STRIPE_SECRET_KEY') return process.env.STRIPE_SECRET_KEY || 'sk_test_valid';
          if (key === 'RESEND_API_KEY') return 're_test_key_for_testing';
          if (key === 'TWILIO_ACCOUNT_SID') return 'AC_test_account_sid';
          if (key === 'TWILIO_AUTH_TOKEN') return 'test_auth_token';
          if (key === 'TWILIO_PHONE_NUMBER') return '+1234567890';
          return null;
        }),
      })
      .overrideProvider(PaymentService) // Mock the payment service
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
      .compile();

    app = moduleFixture.createNestApplication();
    configService = moduleFixture.get<ConfigService>(ConfigService);

    // Mock axios to simulate failure
    jest.spyOn(axios, 'patch').mockRejectedValue(new Error('Connection refused'));

    // Mock email and SMS services to avoid delays
    const emailService = app.get(EmailService);
    jest.spyOn(emailService, 'sendPaymentReceipt').mockResolvedValue(undefined);

    const twilioService = app.get(TwilioService);
    jest.spyOn(twilioService, 'sendPaymentSMS').mockResolvedValue(undefined);

    await app.init();
  });

  afterAll(async () => {
    jest.restoreAllMocks();
    if (app) {
      await app.close();
    }
  });

  it('should handle order-service update failure gracefully', async () => {
    const payload = JSON.stringify({
      type: 'payment_intent.succeeded',
      data: { object: { id: 'pi_test', metadata: { orderId: 'test-order' } } },
    });

    const response = await request(app.getHttpServer())
      .post('/api/payment/webhook')
      .set('stripe-signature', 't=1234567890,v1=test_signature')
      .set('Content-Type', 'application/json')
      .send(payload);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ received: true });
  });
});