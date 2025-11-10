import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MongoMemoryServer } from 'mongodb-memory-server';
import * as mongoose from 'mongoose';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Order Service (e2e)', () => {
  let app: INestApplication;
  let mongo: MongoMemoryServer;

  beforeAll(async () => {
    mongo = await MongoMemoryServer.create();
    process.env.MONGO_URI = mongo.getUri();
    process.env.JWT_SECRET = 'test-secret';

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
    await mongoose.disconnect();
    if (mongo) {
      await mongo.stop();
    }
  });

  it('allows a customer to register, login and create an order', async () => {
    const server = app.getHttpServer();

    await request(server)
      .post('/api/users/register')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        role: 'customer',
      })
      .expect(201);

    const loginResponse = await request(server)
      .post('/api/users/login')
      .send({ email: 'test@example.com', password: 'password123' })
      .expect(201);

    const token = loginResponse.body.token as string;
    const customerId = loginResponse.body.id as string;

    expect(token).toBeDefined();
    expect(customerId).toBeDefined();

    const createOrderResponse = await request(server)
      .post('/api/orders')
      .set('Authorization', `Bearer ${token}`)
      .send({
        customerId,
        restaurantId: 'restaurant-123',
        deliveryAddress: '123 Main St',
        items: [
          { foodId: 'food-1', quantity: 2, price: 50000 },
          { foodId: 'food-2', quantity: 1, price: 75000 },
        ],
      })
      .expect(201);

    expect(createOrderResponse.body.totalPrice).toBe(175000);

    const ordersResponse = await request(server)
      .get('/api/orders')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(Array.isArray(ordersResponse.body)).toBe(true);
    expect(ordersResponse.body.length).toBe(1);
  });
});
