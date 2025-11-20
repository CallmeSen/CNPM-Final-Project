import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import * as jwt from 'jsonwebtoken';
import { AppModule } from '../../src/app.module';

jest.setTimeout(30000);

describe('Risk 4: Internal API Endpoint Exposed Without Authentication (Integration)', () => {
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

  it('should allow access to internal endpoint without authentication', async () => {
    const customerToken = jwt.sign(
      { id: 'test-customer', role: 'customer' },
      'test-secret',
    );

    // First create an order to have an orderId
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

    // Now call internal endpoint without auth
    const updateDto = { status: 'Preparing' };

    const response = await request(app.getHttpServer())
      .patch(`/api/orders/internal/${orderId}/status`)
      .send(updateDto)
      .expect(200); // Should succeed without auth

    expect(response.body.status).toBe('Preparing');
  });
});
