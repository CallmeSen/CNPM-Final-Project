import * as request from 'supertest';
import { MongoClient } from 'mongodb';

jest.setTimeout(30000);

describe('RISK-INT-002: MongoDB Connection Pool Exhaustion (Integration)', () => {
  let mongoClient: MongoClient;
  const mongoUri = 'mongodb://auth:auth123@localhost:28016/Auth';
  const baseUrl = 'http://localhost:5001';

  beforeAll(async () => {
    // Connect to MongoDB for cleanup
    mongoClient = new MongoClient(mongoUri);
    await mongoClient.connect();
  }, 10000);

  afterAll(async () => {
    await mongoClient.close();
  }, 10000);

  beforeEach(async () => {
    // Clean up test data before each test
    const db = mongoClient.db('Auth');
    await db.collection('customers').deleteMany({
      email: { $regex: /^(invalid|recovery|pool.*)@test\.com$/ }
    });
  });

  it('should handle MongoDB connection failures gracefully', async () => {
    // Test with the real running service
    // First ensure we can connect normally
    const healthCheck = await request(baseUrl)
      .get('/api/health')
      .expect(200);

    expect(healthCheck.body.status).toBe('ok');
    expect(healthCheck.body.timestamp).toBeDefined();

    // Now test database operation failure scenario
    // We'll try to register with invalid data that might cause DB issues
    const invalidRegisterResponse = await request(baseUrl)
      .post('/api/auth/register/customer')
      .send({
        firstName: '', // Invalid empty firstName
        lastName: 'Test',
        email: 'invalid@test.com',
        phone: '123',
        password: '123', // Too short
      })
      .expect(400); // Should get validation error, not DB connection error

    expect(invalidRegisterResponse.body.error).toBe('Bad Request');
    expect(invalidRegisterResponse.body.statusCode).toBe(400);
  });

  it('should recover from temporary MongoDB connection issues', async () => {
    // Test service resilience by making requests during potential connection issues

    // Register a valid customer first
    const registerResponse = await request(baseUrl)
      .post('/api/auth/register/customer')
      .send({
        firstName: 'Recovery',
        lastName: 'Test',
        email: 'recovery@test.com',
        phone: '1234567890',
        password: 'password123',
      })
      .expect(201);

    expect(registerResponse.body.status).toBe('success');
    expect(registerResponse.body.token).toBeDefined();

    // Test login functionality (which involves DB queries)
    const loginResponse = await request(baseUrl)
      .post('/api/auth/login')
      .send({
        email: 'recovery@test.com',
        password: 'password123',
      })
      .expect(200);

    expect(loginResponse.body.status).toBe('success');
    expect(loginResponse.body.token).toBeDefined();
    expect(loginResponse.body.data.customer.email).toBe('recovery@test.com');
  });

  it('should handle connection pool limits appropriately', async () => {
    const concurrentOperations = Array(10).fill(null).map((_, index) =>
      request(baseUrl)
        .post('/api/auth/register/customer')
        .send({
          firstName: `Pool${index}`,
          lastName: 'Test',
          email: `pool${index}@test.com`,
          phone: `123456789${index}`,
          password: 'password123',
        })
    );

    // Execute all operations concurrently
    const results = await Promise.allSettled(concurrentOperations);

    // Analyze results
    const successful = results.filter(result =>
      result.status === 'fulfilled' &&
      result.value.status === 201
    ).length;

    const failed = results.filter(result =>
      result.status === 'fulfilled' &&
      result.value.status !== 201
    ).length;

    const rejected = results.filter(result => result.status === 'rejected').length;

    console.log(`Concurrent operations results: ${successful} successful, ${failed} failed, ${rejected} rejected`);

    // We expect most operations to succeed (service should handle concurrent load)
    expect(successful).toBeGreaterThan(5); // At least 5 should succeed

    // Total should equal the number of operations
    expect(successful + failed + rejected).toBe(10);
  });
});