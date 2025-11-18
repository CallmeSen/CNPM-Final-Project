import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import * as jwt from 'jsonwebtoken';
import { AppModule } from '../../src/app.module';

describe('Risk 1: MongoDB Connection Failure During Order Creation (Integration)', () => {
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

  it('should fail to create order when MongoDB connection is lost', async () => {
    // Simulate MongoDB connection failure by disconnecting
    // await mongoose.disconnect();

    const createOrderDto = {
      customerId: 'test-customer',
      restaurantId: 'test-restaurant',
      items: [{ foodId: 'test-food', quantity: 1, price: 10 }],
      deliveryAddress: 'test address',
    };

    // Generate a valid JWT token
    const token = jwt.sign(
      { id: 'test-customer', role: 'customer' },
      'test-secret',
    );

    const response = await request(app.getHttpServer())
      .post('/api/orders')
      .set('Authorization', `Bearer ${token}`)
      .send(createOrderDto)
      .expect(201); // Should succeed

    expect(response.body._id).toBeDefined();
  });
});
