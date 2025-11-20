import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

jest.setTimeout(30000);

describe('Risk 2: JWT Token Verification Failure Due to Secret Mismatch (Integration)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider('MONGO_ORDER_URL')
      .useValue('mongodb://order:order123@localhost:28018/Order')
      .overrideProvider('JWT_SECRET')
      .useValue('mismatched-secret') // Simulate secret mismatch
      .compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should fail JWT verification with mismatched secret', async () => {
    const createOrderDto = {
      customerId: 'test-customer',
      restaurantId: 'test-restaurant',
      items: [{ foodId: 'test-food', quantity: 1, price: 10 }],
      deliveryAddress: 'test address',
    };

    // Use a token signed with different secret
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRlc3QiLCJyb2xlIjoiY3VzdG9tZXIifQ.signature'; // Invalid signature

    const response = await request(app.getHttpServer())
      .post('/api/orders')
      .set('Authorization', `Bearer ${token}`)
      .send(createOrderDto)
      .expect(401);

    expect(response.body.message).toContain('Invalid or expired token');
  });
});
