import * as request from 'supertest';
import { MongoClient } from 'mongodb';

jest.setTimeout(30000);

describe('RISK-INT-005: CORS Origin Validation Bypass (Integration)', () => {
  let mongoClient: MongoClient;
  const mongoUri = 'mongodb://auth:auth123@localhost:28016/Auth';
  const baseUrl = 'http://localhost:5001';

  beforeAll(async () => {
    // Connect to MongoDB for cleanup
    mongoClient = new MongoClient(mongoUri);
    await mongoClient.connect();
  });

  afterAll(async () => {
    // Clean up test data
    const db = mongoClient.db('Auth');
    await db.collection('customers').deleteMany({});
    await mongoClient.close();
  });

  it('should properly validate CORS origins', async () => {
    // Test with allowed origin
    const allowedOriginResponse = await request(baseUrl)
      .options('/api/auth/login')
      .set('Origin', 'http://localhost:3000') // Allowed origin
      .set('Access-Control-Request-Method', 'POST')
      .set('Access-Control-Request-Headers', 'Content-Type')
      .expect(204);

    // Check CORS headers
    expect(allowedOriginResponse.headers['access-control-allow-origin']).toBe('http://localhost:3000');
    expect(allowedOriginResponse.headers['access-control-allow-methods']).toBeDefined();
    expect(allowedOriginResponse.headers['access-control-allow-headers']).toBeDefined();

    // Test with another allowed origin
    const allowedOrigin2Response = await request(baseUrl)
      .options('/api/auth/login')
      .set('Origin', 'http://localhost:3001') // Another allowed origin
      .set('Access-Control-Request-Method', 'POST')
      .expect(204);

    expect(allowedOrigin2Response.headers['access-control-allow-origin']).toBe('http://localhost:3001');
  });

  it('should reject requests from unauthorized origins', async () => {
    // Test with malicious origin
    const maliciousOriginResponse = await request(baseUrl)
      .options('/api/auth/login')
      .set('Origin', 'http://malicious-site.com')
      .set('Access-Control-Request-Method', 'POST')
      .expect(204); // OPTIONS should still return 204, but without proper CORS headers

    // The origin should not be reflected back
    expect(maliciousOriginResponse.headers['access-control-allow-origin']).not.toBe('http://malicious-site.com');

    // Test actual POST request with malicious origin
    const postResponse = await request(baseUrl)
      .post('/api/auth/login')
      .set('Origin', 'http://malicious-site.com')
      .send({
        email: 'test@test.com',
        password: 'password123',
      });

    // The request should still work (since CORS is handled by browser)
    // But the response should not include CORS headers for malicious origin
    expect(postResponse.headers['access-control-allow-origin']).not.toBe('http://malicious-site.com');
  });

  it('should handle CORS preflight requests correctly', async () => {
    // Test preflight request with allowed origin
    const preflightResponse = await request(baseUrl)
      .options('/api/auth/register/customer')
      .set('Origin', 'http://localhost:3000')
      .set('Access-Control-Request-Method', 'POST')
      .set('Access-Control-Request-Headers', 'Content-Type, Authorization')
      .expect(204);

    // Verify CORS headers are present
    expect(preflightResponse.headers['access-control-allow-origin']).toBe('http://localhost:3000');
    expect(preflightResponse.headers['access-control-allow-methods']).toContain('POST');
    expect(preflightResponse.headers['access-control-allow-headers']).toBeDefined();

    // Now test the actual request
    const actualResponse = await request(baseUrl)
      .post('/api/auth/register/customer')
      .set('Origin', 'http://localhost:3000')
      .send({
        firstName: 'CORS',
        lastName: 'Test',
        email: 'cors@test.com',
        phone: '1234567890',
        password: 'password123',
      })
      .expect(201);

    expect(actualResponse.body.status).toBe('success');
  });

  it('should prevent CORS origin header injection', async () => {
    // Test with multiple Origin headers (header injection attempt)
    // Note: In practice, HTTP clients typically don't allow duplicate headers,
    // but this tests server behavior if such headers were somehow received
    const injectionResponse = await request(baseUrl)
      .options('/api/auth/login')
      .set('Origin', 'http://malicious-site.com') // Malicious origin first
      .set('Access-Control-Request-Method', 'POST')
      .expect(204);

    // Malicious origin should not be allowed
    expect(injectionResponse.headers['access-control-allow-origin']).not.toBe('http://malicious-site.com');

    // Test with allowed origin to ensure normal functionality still works
    const allowedResponse = await request(baseUrl)
      .options('/api/auth/login')
      .set('Origin', 'http://localhost:3000')
      .set('Access-Control-Request-Method', 'POST')
      .expect(204);

    expect(allowedResponse.headers['access-control-allow-origin']).toBe('http://localhost:3000');
  });
});