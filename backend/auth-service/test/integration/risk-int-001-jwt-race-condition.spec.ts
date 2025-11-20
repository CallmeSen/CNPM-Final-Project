import * as request from 'supertest';
import { MongoClient } from 'mongodb';

jest.setTimeout(30000);

describe('RISK-INT-001: JWT Token Validation Race Condition (Integration)', () => {
  let mongoClient: MongoClient;
  const mongoUri = 'mongodb://auth:auth123@localhost:28016/Auth';

  beforeAll(async () => {
    // Connect to MongoDB for cleanup
    mongoClient = new MongoClient(mongoUri);
    await mongoClient.connect();

    // Clear test data
    const db = mongoClient.db('Auth');
    await db.collection('customers').deleteMany({});
  });

  afterAll(async () => {
    // Clean up
    const db = mongoClient.db('Auth');
    await db.collection('customers').deleteMany({});
    await mongoClient.close();
  });

  it('should handle concurrent JWT validation requests without race conditions', async () => {
    // First, register a customer
    const registerResponse = await request('http://localhost:5001')
      .post('/api/auth/register/customer')
      .send({
        firstName: 'Test',
        lastName: 'User',
        email: 'race@test.com',
        phone: '1234567890',
        password: 'password123',
      })
      .expect(201);

    console.log('Registration response:', registerResponse.body);
    const token = registerResponse.body.token; // Token is at top level, not in data.token
    console.log('Token:', token);

    // Verify the token works for a single request first
    const singleRequest = await request('http://localhost:5001')
      .get('/api/auth/customer/profile')
      .set('Authorization', `Bearer ${token}`);

    console.log('Single request status:', singleRequest.status);
    console.log('Single request body:', singleRequest.body);

    // Simulate concurrent requests with very short timeout (race condition scenario)
    const concurrentRequests = Array(10).fill(null).map(() =>
      request('http://localhost:5001')
        .get('/api/auth/customer/profile')
        .set('Authorization', `Bearer ${token}`)
        .timeout(100) // Very short timeout to trigger race condition
    );

    // Execute all requests concurrently
    const results = await Promise.allSettled(concurrentRequests);

    console.log('Concurrent request results:', results.map((result, index) => ({
      index,
      status: result.status,
      responseStatus: result.status === 'fulfilled' ? result.value.status : 'rejected',
      error: result.status === 'rejected' ? result.reason.message : null
    })));

    // All requests should succeed (no race conditions in JWT validation)
    const successfulRequests = results.filter(
      result => result.status === 'fulfilled' &&
      result.value.status === 200
    );

    const failedRequests = results.filter(
      result => result.status === 'rejected' || 
      (result.status === 'fulfilled' && result.value.status !== 200)
    );

    // Expect all requests to succeed (no race conditions)
    expect(successfulRequests.length).toBe(concurrentRequests.length);
    expect(failedRequests.length).toBe(0);
  });

  it('should validate JWT token payload integrity during concurrent access', async () => {
    // Register customer
    const registerResponse = await request('http://localhost:5001')
      .post('/api/auth/register/customer')
      .send({
        firstName: 'Concurrent',
        lastName: 'Test',
        email: 'concurrent@test.com',
        phone: '1234567890',
        password: 'password123',
      })
      .expect(201);

    const token = registerResponse.body.token;

    // Make multiple rapid requests to trigger potential race condition
    const promises = [];
    for (let i = 0; i < 5; i++) {
      promises.push(
        request('http://localhost:5001')
          .get('/api/auth/customer/profile')
          .set('Authorization', `Bearer ${token}`)
      );
    }

    const responses = await Promise.all(promises);

    // All responses should be consistent (either all succeed or all fail with same error)
    const firstStatus = responses[0].status;
    const allSameStatus = responses.every(resp => resp.status === firstStatus);

    expect(allSameStatus).toBe(true);

    if (firstStatus === 200) {
      // If successful, all should return same customer data
      const firstCustomer = responses[0].body.data.customer;
      responses.forEach(resp => {
        expect(resp.body.data.customer).toEqual(firstCustomer);
      });
    }
  });
});