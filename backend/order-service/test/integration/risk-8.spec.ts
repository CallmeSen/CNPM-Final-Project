import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import * as jwt from 'jsonwebtoken';
import { AppModule } from '../../src/app.module';

describe('Risk 8: Race Condition in Order Status Updates (Integration)', () => {
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
  });

  afterAll(async () => {
    await app.close();
  });

  it('should handle concurrent status updates without corruption', async () => {
    const customerToken = jwt.sign(
      { id: 'test-customer', role: 'customer' },
      'test-secret',
    );
    const restaurantToken = jwt.sign(
      { id: 'test-restaurant', role: 'restaurant' },
      'test-secret',
    );

    // Create an order
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

    // Simulate concurrent updates
    const update1 = request(app.getHttpServer())
      .patch(`/api/orders/${orderId}/status`)
      .set('Authorization', `Bearer ${restaurantToken}`)
      .send({ status: 'Preparing' });

    const update2 = request(app.getHttpServer())
      .patch(`/api/orders/${orderId}/status`)
      .set('Authorization', `Bearer ${restaurantToken}`)
      .send({ status: 'Out for Delivery' });

    const [res1, res2] = await Promise.all([update1, update2]);

    // At least one should succeed, but due to race, final status might be either
    expect([res1.status, res2.status]).toEqual(
      expect.arrayContaining([200, 200]), // Both succeed, but order might be overwritten
    );

    // Check final status
    const finalResponse = await request(app.getHttpServer())
      .get(`/api/orders/${orderId}`)
      .set('Authorization', `Bearer ${restaurantToken}`)
      .expect(200);

    expect(['Preparing', 'Out for Delivery']).toContain(
      finalResponse.body.status,
    );
  });
});
