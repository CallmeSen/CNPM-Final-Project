import * as request from 'supertest';
import { MongoClient } from 'mongodb';

jest.setTimeout(30000);

describe('RISK-INT-007: Static File Serving Directory Traversal (Integration)', () => {
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

  it('should prevent directory traversal in static file access', async () => {
    // Test various directory traversal patterns
    const traversalPaths = [
      '/uploads/../../../etc/passwd',
      '/uploads/..%2F..%2F..%2Fetc%2Fpasswd',
      '/uploads/..\\..\\..\\etc\\passwd',
      '/uploads/.../...//etc/passwd',
      '/uploads/....//....//etc/passwd',
      '/uploads/..%c0%af..%c0%afetc%c0%afpasswd', // UTF-8 encoding
    ];

    for (const path of traversalPaths) {
      const response = await request(baseUrl)
        .get(path);

      // Should be blocked or not found
      expect([403, 404]).toContain(response.status);

      // Should not return sensitive file content
      if (response.status === 200) {
        expect(response.text).not.toMatch(/root:/);
        expect(response.text).not.toMatch(/bin\/bash/);
        expect(response.text).not.toMatch(/etc\/passwd/);
      }
    }
  });

  it('should validate file paths before serving', async () => {
    // Test with absolute paths
    const absolutePaths = [
      '/uploads//etc/passwd',
      '/uploads//usr/bin',
      '/uploads//home',
      '/uploads//var/log',
    ];

    for (const path of absolutePaths) {
      const response = await request(baseUrl)
        .get(path);

      expect([403, 404]).toContain(response.status);
    }
  });

  it('should prevent access to parent directories', async () => {
    // Test multiple levels of parent directory traversal
    const parentPaths = [
      '/uploads/../app/package.json',
      '/uploads/../../etc/hosts',
      '/uploads/../../../root/.bashrc',
      '/uploads/..//..//..//etc//shadow',
    ];

    for (const path of parentPaths) {
      const response = await request(baseUrl)
        .get(path);

      expect([403, 404]).toContain(response.status);

      // Should not return package.json content
      if (response.status === 200) {
        expect(response.text).not.toMatch(/"name":/);
        expect(response.text).not.toMatch(/"version":/);
      }
    }
  });

  it('should handle encoded traversal sequences', async () => {
    // Test URL-encoded traversal sequences
    const encodedPaths = [
      '/uploads/%2e%2e%2f%2e%2e%2f%2e%2e%2fetc%2fpasswd',
      '/uploads/%2e%2e/%2e%2e/%2e%2e/etc/passwd',
      '/uploads/%2E%2E/%2E%2E/%2E%2E/etc/passwd',
      '/uploads/%2e%2e%5c%2e%2e%5c%2e%2e%5cetc%5cpasswd',
    ];

    for (const path of encodedPaths) {
      const response = await request(baseUrl)
        .get(path);

      expect([403, 404]).toContain(response.status);
    }
  });

  it('should prevent access to hidden files and directories', async () => {
    // Test access to hidden files
    const hiddenFiles = [
      '/uploads/.env',
      '/uploads/.git/config',
      '/uploads/.gitignore',
      '/uploads/.htaccess',
      '/uploads/.DS_Store',
    ];

    for (const path of hiddenFiles) {
      const response = await request(baseUrl)
        .get(path);

      expect([403, 404]).toContain(response.status);
    }
  });
});