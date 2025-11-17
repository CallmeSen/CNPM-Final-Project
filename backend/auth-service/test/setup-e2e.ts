import { ConfigModule } from '@nestjs/config';

beforeAll(async () => {
  // Setup for e2e tests
  process.env.NODE_ENV = 'test';
  process.env.MONGO_AUTH_URL = 'mongodb://auth:auth123@localhost:28016/Auth';
  process.env.JWT_SECRET = 'test-jwt-secret-for-e2e';
  process.env.JWT_EXPIRES_IN = '1h';
  process.env.AUTH_PORT = '5001';
  process.env.ALLOWED_ORIGINS = 'http://localhost:3000,http://localhost:3001,http://localhost:3002';
});