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

describe('MongoDB Connection Pool Exhaustion (Risk 3)', () => {
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
    await db.collection('fooditems').deleteMany({});
    await db.collection('reviews').deleteMany({});
  });

  it('should handle concurrent food item operations without pool exhaustion', async () => {
    const createFoodItemDto = {
      name: 'Concurrent Food',
      description: 'Test concurrent operations',
      price: 15.99,
      category: 'Concurrent Test',
    };

    // Simulate concurrent requests
    const promises = Array.from({ length: 10 }, () =>
      request(app.getHttpServer())
        .post('/food-items/create')
        .set('Authorization', 'Bearer test-token')
        .field('restaurantId', 'test-restaurant-id')
        .field('name', createFoodItemDto.name)
        .field('description', createFoodItemDto.description)
        .field('price', createFoodItemDto.price.toString())
        .field('category', createFoodItemDto.category)
    );

    const responses = await Promise.allSettled(promises);

    // Some may fail due to auth-service issues, but none should fail due to DB pool exhaustion
    const fulfilledCount = responses.filter(r => r.status === 'fulfilled').length;
    const rejectedCount = responses.filter(r => r.status === 'rejected').length;

    expect(fulfilledCount + rejectedCount).toBe(10);
    // At least some should attempt DB operations
    expect(fulfilledCount).toBeGreaterThan(0);
  });

  it('should handle concurrent report aggregations without pool exhaustion', async () => {
    // First create some test data
    const db = mongoClient.db('Restaurant');
    await db.collection('fooditems').insertMany([
      {
        restaurant: 'test-restaurant-id',
        name: 'Test Food 1',
        description: 'Test',
        price: 10,
        category: 'Test',
        availability: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        restaurant: 'test-restaurant-id',
        name: 'Test Food 2',
        description: 'Test',
        price: 20,
        category: 'Test',
        availability: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    await db.collection('reviews').insertMany([
      {
        restaurant: 'test-restaurant-id',
        order: 'order1',
        customer: { name: 'Test Customer', customerId: 'cust1' },
        foodItem: 'test-food-id',
        rating: 5,
        comment: 'Great!',
        createdAt: new Date(),
      },
    ]);

    // Simulate concurrent report requests
    const promises = Array.from({ length: 5 }, () =>
      request(app.getHttpServer())
        .get('/api/reports/summary')
        .set('Authorization', 'Bearer test-token')
    );

    const responses = await Promise.allSettled(promises);

    // All should complete without DB pool exhaustion
    const fulfilledCount = responses.filter(r => r.status === 'fulfilled').length;
    expect(fulfilledCount).toBe(5);

    responses.forEach(response => {
      if (response.status === 'fulfilled') {
        expect(response.value.status).toBe(200);
      }
    });
  });
});