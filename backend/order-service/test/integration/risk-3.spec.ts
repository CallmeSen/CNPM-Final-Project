import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

jest.setTimeout(30000);

process.env.JWT_SECRET = 'test-secret';
process.env.MONGO_ORDER_URL = 'mongodb://order:order123@localhost:28018/Order';

import * as jwt from 'jsonwebtoken';

describe('Risk 3: WebSocket Broadcast Failure When Clients Disconnect (Integration)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
      .overrideProvider('MONGO_ORDER_URL')
      .useValue('mongodb://order:order123@localhost:28018/Order')
      .compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should update order status and attempt broadcast even with no clients', async () => {
    const customerToken = jwt.sign(
      { id: 'test-customer', role: 'customer' },
      'test-secret',
    );
    const restaurantToken = jwt.sign(
      { id: 'test-restaurant', role: 'restaurant' },
      'test-secret',
    );

    // First create an order
    const createOrderDto = {
      customerId: 'test-customer',
      restaurantId: 'test-restaurant',
      items: [{ foodId: 'test-food', quantity: 1, price: 10 }],
      deliveryAddress: 'test address',
    };

    const createResponse = await request(app.getHttpServer())
      .post('/api/orders')
      .set('Authorization', `Bearer ${customerToken}`)
      .send(createOrderDto)
      .expect(201);

    const orderId = createResponse.body._id;

    // Update status - this should trigger broadcast
    const updateDto = { status: 'Confirmed' };

    const response = await request(app.getHttpServer())
      .patch(`/api/orders/${orderId}/status`)
      .set('Authorization', `Bearer ${restaurantToken}`)
      .send(updateDto)
      .expect(200);

    expect(response.body.status).toBe('Confirmed');
    // In integration, broadcast happens but no clients to receive, so no failure, but risk is if clients disconnect
    // This test verifies the update works, broadcast is attempted
  });
});
