import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

jest.setTimeout(30000);

describe('RISK-01: Stripe webhook signature verification failure (Integration)', () => {
  let app: INestApplication;
  let configService: ConfigService;
  let stripe: Stripe;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(ConfigService)
      .useValue({
        get: jest.fn((key: string) => {
          if (key === 'MONGO_PAY_URL') return 'mongodb://payment:payment123@localhost:28019/Payment';
          if (key === 'STRIPE_WEBHOOK_SECRET') return 'invalid_webhook_secret';
          if (key === 'STRIPE_SECRET_KEY') return process.env.STRIPE_SECRET_KEY || 'sk_test_invalid';
          if (key === 'RESEND_API_KEY') return 're_test_key_for_testing';
          if (key === 'TWILIO_ACCOUNT_SID') return 'AC_test_account_sid';
          if (key === 'TWILIO_AUTH_TOKEN') return 'test_auth_token';
          if (key === 'TWILIO_PHONE_NUMBER') return '+1234567890';
          if (key === 'ORDER_SERVICE_URL') return 'http://localhost:5005';
          return null;
        }),
      })
      .compile();

    app = moduleFixture.createNestApplication();
    configService = moduleFixture.get<ConfigService>(ConfigService);
    stripe = new Stripe(configService.get<string>('STRIPE_SECRET_KEY')!, { apiVersion: '2023-10-16' });

    await app.init();
  });

  afterAll(async () => {
    if (app) {
      await app.close();
    }
  });

  it('should return 400 when webhook signature is invalid', async () => {
    const payload = JSON.stringify({
      type: 'payment_intent.succeeded',
      data: { object: { id: 'pi_test', metadata: { orderId: 'test-order' } } },
    });

    const signature = 'invalid_signature';

    const response = await request(app.getHttpServer())
      .post('/api/payment/webhook')
      .set('stripe-signature', signature)
      .set('Content-Type', 'application/json')
      .send(payload);

    expect(response.status).toBe(400);
    expect(response.text).toContain('Webhook Error');
  });
});