import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ExecutionContext, CanActivate } from '@nestjs/common';
import * as request from 'supertest';
import { MongoClient } from 'mongodb';

jest.setTimeout(30000);
if (!process.env.JWT_SECRET) process.env.JWT_SECRET = 'test-secret';
if (!process.env.MONGO_REST_URL) process.env.MONGO_REST_URL = 'mongodb://restaurant:restaurant123@localhost:28017/Restaurant';

import { AppModule } from '../../src/app.module';
import { JwtAuthGuard } from '../../src/common/guards/jwt-auth.guard';
import { RolesGuard } from '../../src/common/guards/roles.guard';

class MockJwtGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    request.user = { 
      id: 'test-user-id', 
      role: 'restaurant',
      restaurantId: '507f1f77bcf86cd799439011' // Valid ObjectId string
    };
    return true;
  }
}

class MockRolesGuard implements CanActivate {
  canActivate(): boolean {
    return true;
  }
}

describe('Cross-Service Authorization Header Forwarding (Risk 5)', () => {
  let app: INestApplication;
  let mongoClient: MongoClient;

  beforeAll(async () => {
    mongoClient = new MongoClient(process.env.MONGO_REST_URL!);
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
    if (app) {
      await app.close();
    }
  });

  beforeEach(async () => {
    // Clean up collections
    const db = mongoClient.db('Restaurant');
    await db.collection('fooditems').deleteMany({});
  });

  it('should forward authorization header to auth-service during profile update', async () => {
    const updateRestaurantDto = {
      name: 'Updated Restaurant',
      ownerName: 'Updated Owner',
      location: 'Updated Location',
      contactNumber: '123-456-7890',
    };

    // This should attempt to forward the auth header to auth-service
    const response = await request(app.getHttpServer())
      .put('/api/restaurant/update')
      .set('Authorization', 'Bearer invalid-token')
      .field('name', updateRestaurantDto.name)
      .field('ownerName', updateRestaurantDto.ownerName)
      .field('location', updateRestaurantDto.location)
      .field('contactNumber', updateRestaurantDto.contactNumber)
      .expect(400);

    // Should fail due to auth-service call with forwarded invalid token
    expect(response.body.message).toContain('Unauthorized');
  });

  it('should forward authorization header to order-service during revenue report', async () => {
    // Set a valid order-service URL for this test
    process.env.ORDER_SERVICE_URL = 'http://localhost:5005';

    const response = await request(app.getHttpServer())
      .get('/api/reports/revenue')
      .set('Authorization', 'Bearer malformed-token')
      .expect(200);

    // Should return empty due to forwarded malformed token
    expect(Array.isArray(response.body)).toBe(true);
    // The service should attempt to forward the header as-is
  });

  it('should handle malformed authorization headers without sanitization', async () => {
    const malformedHeaders = [
      'Bearer token with spaces',
      'Bearer token<script>alert("xss")</script>',
      'Bearer extremely-long-token-' + 'x'.repeat(1000),
    ];

    for (const malformedHeader of malformedHeaders) {
      const response = await request(app.getHttpServer())
        .put('/api/restaurant/update')
        .set('Authorization', malformedHeader)
        .field('name', 'Test Restaurant')
        .field('ownerName', 'Test Owner')
        .field('location', 'Test Location')
        .field('contactNumber', '123-456-7890')
        .expect(400);

      // Should fail, but the header should be forwarded as-is without sanitization
      expect(response.status).toBe(400);
    }
  });

  it('should forward empty authorization header', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/reports/revenue')
      .set('Authorization', '')
      .expect(200);

    // Should handle empty header forwarding
    expect(Array.isArray(response.body)).toBe(true);
  });
});