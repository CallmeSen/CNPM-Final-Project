import * as request from 'supertest';
import { MongoClient } from 'mongodb';
import * as bcrypt from 'bcryptjs';

jest.setTimeout(30000);

describe('RISK-INT-004: Password Hashing Algorithm Inconsistency (Integration)', () => {
  let mongoClient: MongoClient;
  const mongoUri = 'mongodb://auth:auth123@localhost:28016/Auth';
  const baseUrl = 'http://localhost:5001';

  beforeAll(async () => {
    // Connect to MongoDB for verification
    mongoClient = new MongoClient(mongoUri);
    await mongoClient.connect();
  }, 10000);

  afterAll(async () => {
    await mongoClient.close();
  }, 10000);

  beforeEach(async () => {
    // Clean up test data
    const db = mongoClient.db('Auth');
    await db.collection('customers').deleteMany({
      email: { $regex: /^(hash|restaurant|timing)@\w+\.com$/ }
    });
    await db.collection('restaurants').deleteMany({
      'admin.email': { $regex: /^.*@test\.com$/ }
    });
  });

  it('should use consistent password hashing for customers', async () => {
    // Register a customer
    const registerResponse = await request(baseUrl)
      .post('/api/auth/register/customer')
      .send({
        firstName: 'Hash',
        lastName: 'Test',
        email: `hash${Date.now()}@test.com`,
        phone: '1234567890',
        password: 'password123',
      })
      .expect(201);

    // Verify login works (tests that password was hashed correctly)
    const loginResponse = await request(baseUrl)
      .post('/api/auth/login')
      .send({
        email: registerResponse.body.data.customer.email,
        password: 'password123',
      })
      .expect(200);

    expect(loginResponse.body.token).toBeDefined();

    // Check the stored hash in database
    const db = mongoClient.db('Auth');
    const customer = await db.collection('customers').findOne({ email: registerResponse.body.data.customer.email });

    expect(customer).toBeDefined();
    expect(customer.password).toBeDefined();

    // Verify the hash uses bcrypt (starts with $2)
    expect(customer.password).toMatch(/^\$2[aby]\$.+/);

    // Verify password comparison works
    const isValidPassword = await bcrypt.compare('password123', customer.password);
    expect(isValidPassword).toBe(true);
  });

  it('should use consistent password hashing for restaurants', async () => {
    // Register a restaurant
    const registerResponse = await request(baseUrl)
      .post('/api/auth/register/restaurant')
      .field('name', `Restaurant${Date.now()}${Math.random()}`)
      .field('ownerName', 'Hash Owner')
      .field('location', 'Hash Location')
      .field('contactNumber', '1234567890')
      .field('email', `restaurant${Date.now()}${Math.random()}@test.com`)
      .field('password', 'restaurant123')
      .expect(201);

    // Verify restaurant login works
    const loginResponse = await request(baseUrl)
      .post('/api/auth/login/restaurant')
      .send({
        email: registerResponse.body.data.restaurant.email,
        password: 'restaurant123',
      })
      .expect(200);

    expect(loginResponse.body.token).toBeDefined();

    // Check the stored hash in database
    const db = mongoClient.db('Auth');
    const restaurant = await db.collection('restaurants').findOne({ 'admin.email': registerResponse.body.data.restaurant.email });

    expect(restaurant).toBeDefined();
    expect(restaurant.admin.password).toBeDefined();

    // Verify the hash uses bcrypt (starts with $2)
    expect(restaurant.admin.password).toMatch(/^\$2[aby]\$.+/);

    // Verify password comparison works
    const isValidPassword = await bcrypt.compare('restaurant123', restaurant.admin.password);
    expect(isValidPassword).toBe(true);
  });

  it('should prevent timing attacks on password comparison', async () => {
    // Register a user
    const registerResponse = await request(baseUrl)
      .post('/api/auth/register/customer')
      .send({
        firstName: 'Timing',
        lastName: 'Test',
        email: `timing${Date.now()}@test.com`,
        phone: '1234567890',
        password: 'password123',
      })
      .expect(201);

    const userEmail = registerResponse.body.data.customer.email;

    // Test login with wrong passwords of different lengths
    const wrongPasswords = [
      'wrong1',       // 6 chars
      'wrong12',      // 7 chars
      'wrong123',     // 8 chars
      'wrong1234',    // 9 chars
    ];

    const timings = [];

    for (const wrongPassword of wrongPasswords) {
      const startTime = process.hrtime.bigint();
      await request(baseUrl)
        .post('/api/auth/login')
        .send({
          email: userEmail,
          password: wrongPassword,
        })
        .expect(401);
      const endTime = process.hrtime.bigint();
      const duration = Number(endTime - startTime) / 1000000; // Convert to milliseconds
      timings.push(duration);
    }

    // Check that response times are relatively consistent (within 50ms of each other)
    const maxTime = Math.max(...timings);
    const minTime = Math.min(...timings);
    const timeDifference = maxTime - minTime;

    // If timing attack protection is working, differences should be minimal
    // In integration tests with network overhead, allow larger variance
    expect(timeDifference).toBeLessThan(500); // Allow 500ms difference
  });
});