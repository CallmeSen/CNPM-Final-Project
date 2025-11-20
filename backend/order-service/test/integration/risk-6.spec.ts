import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import * as jwt from 'jsonwebtoken';
import { AppModule } from '../../src/app.module';

jest.setTimeout(30000);

describe('Risk 6: Total Price Calculation Error with Invalid Item Data (Integration)', () => {
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

  it('should reject order with invalid quantity', async () => {
    const customerToken = jwt.sign(
      { id: 'test-customer', role: 'customer' },
      'test-secret',
    );

    const createOrderDto = {
      customerId: 'test-customer',
      restaurantId: 'test-restaurant',
      items: [{ foodId: 'test-food', quantity: -1, price: 10 }], // Invalid quantity
      deliveryAddress: 'test address',
    };

    await request(app.getHttpServer())
      .post('/api/orders')
      .set('Authorization', `Bearer ${customerToken}`)
      .send(createOrderDto)
      .expect(500); // DB validation error

    // Risk detected: invalid data causes 500 instead of proper validation
  });

  it('should calculate correct total price for valid items', async () => {
    const customerToken = jwt.sign(
      { id: 'test-customer', role: 'customer' },
      'test-secret',
    );

    const createOrderDto = {
      customerId: 'test-customer',
      restaurantId: 'test-restaurant',
      items: [
        { foodId: 'test-food1', quantity: 2, price: 10 },
        { foodId: 'test-food2', quantity: 1, price: 15 },
      ],
      deliveryAddress: 'test address',
    };

    const response = await request(app.getHttpServer())
      .post('/api/orders')
      .set('Authorization', `Bearer ${customerToken}`)
      .send(createOrderDto)
      .expect(201);

    expect(response.body.totalPrice).toBe(35); // 2*10 + 1*15
  });
});
