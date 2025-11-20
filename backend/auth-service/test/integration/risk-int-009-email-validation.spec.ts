import * as request from 'supertest';
import { MongoClient } from 'mongodb';

jest.setTimeout(30000);

describe('RISK-INT-009: Email Validation Regex Injection (Integration)', () => {
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
    await mongoClient.close();
  });

  it('should prevent email regex injection in customer registration', async () => {
    // Test various regex injection attempts
    const maliciousEmails = [
      'test@evil.com\'||true||\'',
      'test@evil.com\'||1==1||\'',
      'test@evil.com\'||\'\'==\'\'||\'',
      'test@evil.com\'||false||\'@good.com',
      'test@evil.com\'.concat(\'@evil.com\')',
      'test@evil.com${"@evil.com"}',
    ];

    for (const maliciousEmail of maliciousEmails) {
      const response = await request(baseUrl)
        .post('/api/auth/register/customer')
        .send({
          firstName: 'Injection',
          lastName: 'Test',
          email: maliciousEmail,
          phone: '1234567890',
          password: 'password123',
        });

      // Should reject due to email validation
      expect([400, 409]).toContain(response.status);

      // Should not create account with malicious email
      const db = mongoClient.db('Auth');
      const customer = await db.collection('customers').findOne({ email: maliciousEmail });
      expect(customer).toBeNull();
    }
  });

  it('should prevent email regex injection in restaurant registration', async () => {
    // Test regex injection in restaurant registration
    const maliciousEmails = [
      'restaurant@evil.com\'||true||\'',
      'restaurant@evil.com\'||1==1||\'',
      'restaurant@evil.com\'.concat(\'@evil.com\')',
    ];

    for (const maliciousEmail of maliciousEmails) {
      const response = await request(baseUrl)
        .post('/api/auth/register/restaurant')
        .field('name', 'Injection Restaurant')
        .field('ownerName', 'Injection Owner')
        .field('location', 'Injection Location')
        .field('contactNumber', '1234567890')
        .field('email', maliciousEmail)
        .field('password', 'password123');

      // Should reject due to email validation
      expect([400, 409]).toContain(response.status);

      // Should not create restaurant with malicious email
      const db = mongoClient.db('Auth');
      const restaurant = await db.collection('restaurants').findOne({ 'admin.email': maliciousEmail });
      expect(restaurant).toBeNull();
    }
  });

  it('should validate email format correctly', async () => {
    // Test valid and invalid email formats
    const testCases = [
      { email: 'valid@test.com', shouldPass: true },
      { email: 'test.email+tag@domain.com', shouldPass: true },
      { email: 'test_email@sub.domain.com', shouldPass: true },
      { email: 'invalid-email', shouldPass: false },
      { email: '@test.com', shouldPass: false },
      { email: 'test@', shouldPass: false },
      { email: 'test@.com', shouldPass: false },
      { email: 'test..test@test.com', shouldPass: false },
      { email: 'test@test.com.', shouldPass: false },
    ];

    for (const testCase of testCases) {
      const response = await request(baseUrl)
        .post('/api/auth/register/customer')
        .send({
          firstName: 'Email',
          lastName: 'Validation',
          email: testCase.email,
          phone: '1234567890',
          password: 'password123',
        });

      if (testCase.shouldPass) {
        // Should succeed or fail only due to uniqueness, not validation
        expect([201, 409]).toContain(response.status);
      } else {
        // Should fail due to validation
        expect(response.status).toBe(400);
      }
    }
  });

  it('should prevent MongoDB injection through email fields', async () => {
    // Test MongoDB injection attempts through email
    const injectionAttempts = [
      { email: '{"$ne": null}', name: 'null injection' },
      { email: '{"$exists": true}', name: 'exists injection' },
      { email: '{"$regex": ".*"}', name: 'regex injection' },
      { email: '{"$where": "this.email != null"}', name: 'where injection' },
    ];

    for (const attempt of injectionAttempts) {
      const response = await request(baseUrl)
        .post('/api/auth/register/customer')
        .send({
          firstName: 'MongoDB',
          lastName: 'Injection',
          email: attempt.email,
          phone: '1234567890',
          password: 'password123',
        });

      // Should reject due to email validation (not valid email format)
      expect(response.status).toBe(400);

      // Should not create any account
      const db = mongoClient.db('Auth');
      const customer = await db.collection('customers').findOne({ email: attempt.email });
      expect(customer).toBeNull();
    }
  });

  it('should handle special characters in email safely', async () => {
    // Test emails with special characters that could be used for injection
    const specialEmails = [
      'test+tag@test.com',  // Plus sign
      'test.tag@test.com',  // Dot
      'test-tag@test.com',  // Dash
      'test_tag@test.com',  // Underscore
      'test@test-domain.com', // Dash in domain
    ];

    for (const email of specialEmails) {
      const response = await request(baseUrl)
        .post('/api/auth/register/customer')
        .send({
          firstName: 'Special',
          lastName: 'Chars',
          email: email,
          phone: '1234567890',
          password: 'password123',
        });

      // Should succeed (valid email format)
      expect([201, 409]).toContain(response.status);
    }
  });
});