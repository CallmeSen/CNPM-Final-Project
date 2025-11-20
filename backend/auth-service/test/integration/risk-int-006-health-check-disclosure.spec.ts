import * as request from 'supertest';
import { MongoClient } from 'mongodb';

jest.setTimeout(30000);

describe('RISK-INT-006: Health Check Endpoint Information Disclosure (Integration)', () => {
  let mongoClient: MongoClient;
  const mongoUri = 'mongodb://auth:auth123@localhost:28016/Auth';
  const baseUrl = 'http://localhost:5001';

  beforeAll(async () => {
    // Connect to MongoDB for cleanup if needed
    mongoClient = new MongoClient(mongoUri);
    await mongoClient.connect();
  });

  afterAll(async () => {
    await mongoClient.close();
  });

  it('should have a secure health check endpoint', async () => {
    // Test health check endpoint
    const healthResponse = await request(baseUrl)
      .get('/api/health')
      .expect(200);

    // Health check should return minimal information
    expect(healthResponse.body).toBeDefined();

    // Should not disclose sensitive information
    expect(healthResponse.body).not.toHaveProperty('database');
    expect(healthResponse.body).not.toHaveProperty('config');
    expect(healthResponse.body).not.toHaveProperty('secrets');
    expect(healthResponse.body).not.toHaveProperty('env');

    // Should be a simple status indicator
    expect(typeof healthResponse.body).toBe('object');
    expect(healthResponse.body.status).toBe('ok');
    expect(healthResponse.body.timestamp).toBeDefined();
  });

  it('should prevent access to sensitive static files', async () => {
    // Test access to .gitkeep file (should be blocked or not exist)
    const gitkeepResponse = await request(baseUrl)
      .get('/uploads/.gitkeep');

    // Should either return 404 (file doesn't exist) or 403 (forbidden)
    expect([403, 404]).toContain(gitkeepResponse.status);

    // Should not return the file content
    if (gitkeepResponse.status === 200) {
      expect(gitkeepResponse.text).not.toContain('gitkeep');
    }
  });

  it('should not expose directory listings', async () => {
    // Test access to uploads directory without filename
    const directoryResponse = await request(baseUrl)
      .get('/uploads/');

    // Should not return directory listing
    expect([403, 404]).toContain(directoryResponse.status);

    // Should not contain HTML directory listing
    if (directoryResponse.status === 200) {
      expect(directoryResponse.text).not.toMatch(/<html/i);
      expect(directoryResponse.text).not.toMatch(/directory/i);
      expect(directoryResponse.text).not.toMatch(/index of/i);
    }
  });

  it('should prevent access to system files through static serving', async () => {
    // Test path traversal attempts
    const traversalAttempts = [
      '/uploads/../../../etc/passwd',
      '/uploads/..%2F..%2F..%2Fetc%2Fpasswd',
      '/uploads/..\\..\\..\\etc\\passwd',
      '/uploads/.../...//etc/passwd',
    ];

    for (const traversalPath of traversalAttempts) {
      const response = await request(baseUrl)
        .get(traversalPath);

      // Should be blocked (403) or not found (404)
      expect([403, 404]).toContain(response.status);

      // Should not return system file content
      if (response.status === 200) {
        expect(response.text).not.toMatch(/root:/);
        expect(response.text).not.toMatch(/bin\/bash/);
      }
    }
  });

  it('should limit information disclosure in error responses', async () => {
    // Test with invalid endpoint
    const invalidEndpointResponse = await request(baseUrl)
      .get('/api/nonexistent')
      .expect(404);

    // Error response should not disclose internal information
    expect(invalidEndpointResponse.body).not.toHaveProperty('stack');
    expect(invalidEndpointResponse.body).not.toHaveProperty('config');
    // Having an "error" field is normal for error responses
    expect(invalidEndpointResponse.body.message).toBeDefined();
    expect(invalidEndpointResponse.body.statusCode).toBe(404);

    // Test with malformed request
    const malformedResponse = await request(baseUrl)
      .post('/api/auth/login')
      .send('invalid json {')
      .set('Content-Type', 'application/json')
      .expect(400);

    // Should not expose internal error details
    expect(malformedResponse.body).not.toHaveProperty('stack');
    expect(malformedResponse.body).not.toHaveProperty('config');
  });
});