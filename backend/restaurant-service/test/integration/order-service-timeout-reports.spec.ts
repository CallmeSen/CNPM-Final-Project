import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ExecutionContext, CanActivate } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { MongoClient } from 'mongodb';
import { JwtAuthGuard } from '../../src/common/guards/jwt-auth.guard';
import { RolesGuard } from '../../src/common/guards/roles.guard';

class MockJwtGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    request.user = { 
      id: 'test-user-id', 
      role: 'restaurant',
      restaurantId: 'test-restaurant-id'
    };
    return true;
  }
}

class MockRolesGuard implements CanActivate {
  canActivate(): boolean {
    return true;
  }
}

describe('Order-Service HTTP Timeout in Reports (Risk 2)', () => {
  let app: INestApplication;
  let mongoClient: MongoClient;

  beforeAll(async () => {
    mongoClient = new MongoClient('mongodb://restaurant:restaurant123@localhost:28017/Restaurant');
    await mongoClient.connect();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideGuard(JwtAuthGuard)
      .useClass(MockJwtGuard)
      .overrideGuard(RolesGuard)
      .useClass(MockRolesGuard)
      .compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    await app.init();
  }, 30000);

  afterAll(async () => {
    await mongoClient.close();
    await app.close();
  });

  beforeEach(async () => {
    // Clean up collections
    const db = mongoClient.db('Restaurant');
    await db.collection('reviews').deleteMany({});
    await db.collection('fooditems').deleteMany({});
  });

  it('should timeout when fetching revenue data from slow order-service', async () => {
    // Set slow order-service URL
    process.env.ORDER_SERVICE_URL = 'http://slow-order-service:5005';

    const response = await request(app.getHttpServer())
      .get('/api/reports/revenue')
      .set('Authorization', 'Bearer test-token')
      .expect(200);

    // Should return empty array due to timeout/error
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(0);
  }, 35000); // Allow 35 seconds for timeout

  it('should timeout when fetching top-selling items from slow order-service', async () => {
    process.env.ORDER_SERVICE_URL = 'http://slow-order-service:5005';

    const response = await request(app.getHttpServer())
      .get('/api/reports/top-items')
      .set('Authorization', 'Bearer test-token')
      .expect(200);

    // Should return empty array due to timeout/error
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(0);
  }, 35000);

  it('should timeout when fetching summary from slow order-service', async () => {
    process.env.ORDER_SERVICE_URL = 'http://slow-order-service:5005';

    const response = await request(app.getHttpServer())
      .get('/api/reports/summary')
      .set('Authorization', 'Bearer test-token')
      .expect(200);

    // Should return default values due to timeout/error
    expect(response.body).toHaveProperty('totalRevenue', 0);
    expect(response.body).toHaveProperty('totalOrders', 0);
    expect(response.body).toHaveProperty('averageOrderValue', 0);
    expect(response.body).toHaveProperty('averageRating', 0);
    expect(response.body).toHaveProperty('totalReviews', 0);
  }, 35000);
});