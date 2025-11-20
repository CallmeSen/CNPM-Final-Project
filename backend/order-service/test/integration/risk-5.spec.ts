import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import * as jwt from 'jsonwebtoken';
import { AppModule } from '../../src/app.module';

jest.setTimeout(30000);

describe('Risk 5: OrderID Collision Due to Timestamp Precision (Integration)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    process.env.JWT_SECRET = 'test-secret';

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider('MONGO_ORDER_URL')
      .useValue('mongodb://order:order123@localhost:28018/Order')
      .compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    await app.init();
  }, 30000);

  afterAll(async () => {
    await app.close();
  });

  it('should generate unique orderIds for concurrent requests', async () => {
    const customerToken = jwt.sign(
      { id: 'test-customer', role: 'customer' },
      'test-secret',
    );

    const createOrderDto = {
      customerId: 'test-customer',
      restaurantId: 'test-restaurant',
      items: [{ foodId: 'test-food', quantity: 1, price: 10 }],
      deliveryAddress: 'test address',
    };

    // Simulate concurrent requests
    const promises = [];
    for (let i = 0; i < 10; i++) {
      promises.push(
        request(app.getHttpServer())
          .post('/api/orders')
          .set('Authorization', `Bearer ${customerToken}`)
          .send(createOrderDto),
      );
    }

    const responses = await Promise.all(promises);

    // All should succeed
    responses.forEach((res) => {
      expect(res.status).toBe(201);
      expect(res.body._id).toBeDefined();
    });

    // Check for uniqueness
    const ids = responses.map((res) => res.body._id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);

    // Collect orderIds
    const orderIds = responses.map((res) => res.body.orderId);

    // Check uniqueness
    const uniqueOrderIds = new Set(orderIds);
    expect(uniqueOrderIds.size).toBe(orderIds.length);
  });
});
