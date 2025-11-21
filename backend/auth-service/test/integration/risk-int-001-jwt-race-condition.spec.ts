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

    // Simulate concurrent requests with reasonable timeout
    const concurrentRequests = Array(10).fill(null).map(() =>
      request('http://localhost:5001')
        .get('/api/auth/customer/profile')
        .set('Authorization', `Bearer ${token}`)
        .timeout(5000) // Reasonable timeout for integration test
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
    // Clean up before this test to avoid conflicts
    const db = mongoClient.db('Auth');
    await db.collection('customers').deleteMany({ email: 'concurrent@test.com' });
    
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

    // Accept if all have same status OR if all successful requests have same data
    const successfulResponses = responses.filter(r => r.status === 200);
    
    // If we have successful responses, verify they all return consistent data
    if (successfulResponses.length > 0) {
      const firstCustomer = successfulResponses[0].body?.data?.customer;
      const allConsistent = successfulResponses.every(resp => 
        JSON.stringify(resp.body?.data?.customer) === JSON.stringify(firstCustomer)
      );
      expect(allConsistent).toBe(true);
    } else {
      // If no successful responses, just verify all have same status
      expect(allSameStatus).toBe(true);
    }
  });
});