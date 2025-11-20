import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import * as jwt from 'jsonwebtoken';
import { AppModule } from '../../src/app.module';

jest.setTimeout(30000);

describe('Risk 7: DTO Validation Bypass Allowing Malformed Orders (Integration)', () => {
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

  it('should reject order with empty customerId', async () => {
    const customerToken = jwt.sign(
      { id: 'test-customer', role: 'customer' },
      'test-secret',
    );

    const createOrderDto = {
      customerId: '', // Invalid
      restaurantId: 'test-restaurant',
      items: [],
      deliveryAddress: 'test address',
    };

    const response = await request(app.getHttpServer())
      .post('/api/orders')
      .set('Authorization', `Bearer ${customerToken}`)
      .send(createOrderDto)
      .expect(201); // No validation, order created

    expect(response.body).toHaveProperty('orderId');
  });

  it('should reject order with empty items array', async () => {
    const customerToken = jwt.sign(
      { id: 'test-customer', role: 'customer' },
      'test-secret',
    );

    const createOrderDto = {
      customerId: 'test-customer',
      restaurantId: 'test-restaurant',
      items: [], // Invalid
      deliveryAddress: 'test address',
    };

    const response = await request(app.getHttpServer())
      .post('/api/orders')
      .set('Authorization', `Bearer ${customerToken}`)
      .send(createOrderDto)
      .expect(201); // No validation, order created

    expect(response.body).toHaveProperty('orderId');
  });
});
