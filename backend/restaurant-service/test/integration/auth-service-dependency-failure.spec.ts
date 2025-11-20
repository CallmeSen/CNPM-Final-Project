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

describe('Auth-Service Dependency Failure (Risk 1)', () => {
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
  });

  it('should fail to create food item when auth-service is unavailable', async () => {
    // Mock auth-service being down by setting invalid URL
    process.env.AUTH_SERVICE_URL = 'http://invalid:5001';

    const createFoodItemDto = {
      name: 'Test Food',
      description: 'Test Description',
      price: 10.99,
      category: 'Test Category',
    };

    const response = await request(app.getHttpServer())
      .post('/api/food-items/create')
      .set('Authorization', 'Bearer test-token')
      .field('restaurantId', 'test-restaurant-id')
      .field('name', createFoodItemDto.name)
      .field('description', createFoodItemDto.description)
      .field('price', createFoodItemDto.price.toString())
      .field('category', createFoodItemDto.category)
      .expect(400);

    expect(response.body.message).toContain('Failed to verify restaurant from auth service');
  });

  it('should fail to get restaurant profile when auth-service is unavailable', async () => {
    process.env.AUTH_SERVICE_URL = 'http://invalid:5001';

    const response = await request(app.getHttpServer())
      .get('/api/restaurant/profile')
      .set('Authorization', 'Bearer test-token')
      .expect(400);

    expect(response.body.message).toContain('Failed to fetch restaurant profile from auth service');
  });
});