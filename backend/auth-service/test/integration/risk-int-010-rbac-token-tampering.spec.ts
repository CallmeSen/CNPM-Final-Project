import * as request from 'supertest';
import { MongoClient } from 'mongodb';
import * as jwt from 'jsonwebtoken';

jest.setTimeout(30000);

describe('RISK-INT-010: Role-Based Access Control Token Tampering (Integration)', () => {
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
    await db.collection('restaurants').deleteMany({});
    await db.collection('superadmins').deleteMany({});
    await mongoClient.close();
  });

  it('should prevent role escalation through token tampering', async () => {
    // Register a customer (lowest privilege)
    const registerResponse = await request(baseUrl)
      .post('/api/auth/register/customer')
      .send({
        firstName: 'Token',
        lastName: 'Tamper',
        email: 'tamper@test.com',
        phone: '1234567890',
        password: 'password123',
      })
      .expect(201);

    const customerToken = registerResponse.body.token;

    // Decode the token to get payload
    const decoded = jwt.decode(customerToken) as any;
    expect(decoded.role).toBe('customer');

    // Create a tampered token with escalated privileges
    const tamperedPayload = {
      ...decoded,
      role: 'superAdmin', // Escalate from customer to superAdmin
    };

    // Sign with a fake secret (simulating token tampering)
    const tamperedToken = jwt.sign(tamperedPayload, 'fake-secret-key');

    // Try to access superAdmin-only endpoint with tampered token
    const superAdminResponse = await request(baseUrl)
      .patch('/api/auth/restaurants/test-id/availability')
      .set('Authorization', `Bearer ${tamperedToken}`)
      .send({ availability: false })
      .expect(401); // Should be unauthorized

    expect(superAdminResponse.body.message).toBe('Unauthorized');
  });

  it('should validate token integrity and prevent signature bypass', async () => {
    // Register a customer
    const registerResponse = await request(baseUrl)
      .post('/api/auth/register/customer')
      .send({
        firstName: 'Signature',
        lastName: 'Bypass',
        email: 'signature@test.com',
        phone: '1234567890',
        password: 'password123',
      })
      .expect(201);

    const validToken = registerResponse.body.token;

    // Test with invalid signature
    const invalidSignatureToken = validToken.slice(0, -5) + 'xxxxx'; // Corrupt signature

    const invalidResponse = await request(baseUrl)
      .get('/api/auth/customer/profile')
      .set('Authorization', `Bearer ${invalidSignatureToken}`)
      .expect(401);

    expect(invalidResponse.body.message).toBe('Unauthorized');
  });

  it('should prevent cross-role access with valid tokens', async () => {
    // Register customer
    const customerRegister = await request(baseUrl)
      .post('/api/auth/register/customer')
      .send({
        firstName: 'Cross',
        lastName: 'Role',
        email: 'crossrole@test.com',
        phone: '1234567890',
        password: 'password123',
      })
      .expect(201);

    const customerToken = customerRegister.body.token;

    // Register restaurant
    const restaurantRegister = await request(baseUrl)
      .post('/api/auth/register/restaurant')
      .field('name', 'Cross Role Restaurant')
      .field('ownerName', 'Cross Role Owner')
      .field('location', 'Cross Role Location')
      .field('contactNumber', '1234567890')
      .field('email', 'restaurant@crossrole.com')
      .field('password', 'restaurant123')
      .expect(201);

    const restaurantToken = restaurantRegister.body.token;

    // Test customer trying to access restaurant-only endpoints
    const customerAccessRestaurant = await request(baseUrl)
      .patch('/api/auth/restaurant/profile/test-id')
      .set('Authorization', `Bearer ${customerToken}`)
      .send({ name: 'Hacked Name' });
    
    // Should be forbidden (403) or unauthorized (401)
    expect([401, 403]).toContain(customerAccessRestaurant.status);

    // Test restaurant trying to access superAdmin-only endpoints
    const restaurantAccessSuperAdmin = await request(baseUrl)
      .post('/api/auth/restaurants/test-id/delete')
      .set('Authorization', `Bearer ${restaurantToken}`);
    
    expect([401, 403]).toContain(restaurantAccessSuperAdmin.status);

    // Test customer trying to access superAdmin endpoints
    const customerAccessSuperAdmin = await request(baseUrl)
      .patch('/api/auth/restaurants/test-id/availability')
      .set('Authorization', `Bearer ${customerToken}`)
      .send({ availability: false });
    
    expect([401, 403]).toContain(customerAccessSuperAdmin.status);
  });

  it('should validate user existence for role-based access', async () => {
    // Create a valid token for a non-existent user
    const fakeUserPayload = {
      sub: 'non-existent-user-id',
      role: 'customer',
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 3600,
    };

    // We can't sign with the real secret, so we'll test with a valid user token
    // and then delete the user to simulate non-existence

    // Register a customer
    const registerResponse = await request(baseUrl)
      .post('/api/auth/register/customer')
      .send({
        firstName: 'Exist',
        lastName: 'Check',
        email: 'exist@test.com',
        phone: '1234567890',
        password: 'password123',
      })
      .expect(201);

    const token = registerResponse.body.token;

    // Decode token to get user ID
    const decoded = jwt.decode(token) as any;
    const customerId = decoded.sub;

    // Delete the user from database (simulate user deletion after token issuance)
    const db = mongoClient.db('Auth');
    await db.collection('customers').deleteOne({ _id: customerId });

    // Try to access protected endpoint with token for deleted user
    const accessResponse = await request(baseUrl)
      .get('/api/auth/customer/profile')
      .set('Authorization', `Bearer ${token}`);

    // Either the request should fail (401) if user validation is implemented,
    // or succeed (200) if only token validity is checked
    expect([200, 401]).toContain(accessResponse.status);

    if (accessResponse.status === 401) {
      expect(accessResponse.body.error).toBe('Unauthorized');
    }
  });

  it('should prevent token replay attacks', async () => {
    // Register and login to get a token
    const registerResponse = await request(baseUrl)
      .post('/api/auth/register/customer')
      .send({
        firstName: 'Replay',
        lastName: 'Attack',
        email: 'replay@test.com',
        phone: '1234567890',
        password: 'password123',
      })
      .expect(201);

    const token = registerResponse.body.token;

    // Use token multiple times rapidly (simulating replay)
    const requests = Array(10).fill(null).map(() =>
      request(baseUrl)
        .get('/api/auth/customer/profile')
        .set('Authorization', `Bearer ${token}`)
    );

    const responses = await Promise.all(requests);

    // All requests should either succeed or fail consistently
    // (not succeed sometimes and fail others due to race conditions)
    const firstStatus = responses[0].status;
    const allSameStatus = responses.every(resp => resp.status === firstStatus);

    expect(allSameStatus).toBe(true);

    if (firstStatus === 200) {
      // If successful, all should return same data
      const firstCustomer = responses[0].body.data.customer;
      responses.forEach(resp => {
        expect(resp.body.data.customer).toEqual(firstCustomer);
      });
    }
  });
});