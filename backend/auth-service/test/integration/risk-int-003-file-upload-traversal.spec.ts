import * as request from 'supertest';
import { MongoClient } from 'mongodb';
import * as fs from 'fs';
import * as path from 'path';

describe('RISK-INT-003: File Upload Path Traversal Vulnerability (Integration)', () => {
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
    // Clean up test data
    const db = mongoClient.db('Auth');
    await db.collection('restaurants').deleteMany({
      email: { $regex: /^(traversal|malicious|large)@\w+\.com$/ }
    });

    // Clean up uploaded files
    const uploadsDir = path.join(__dirname, '../../uploads');
    if (fs.existsSync(uploadsDir)) {
      const files = fs.readdirSync(uploadsDir);
      files.forEach(file => {
        if (file.includes('traversal') || file.includes('malicious') || file.includes('large')) {
          fs.unlinkSync(path.join(uploadsDir, file));
        }
      });
    }
  });

  it('should prevent path traversal attacks in file uploads', async () => {
    // Create a malicious file with path traversal in filename
    const maliciousFilename = '../../../etc/passwd';
    const testFileContent = 'malicious content';

    // Write test file
    const testFilePath = path.join(__dirname, 'test-malicious.txt');
    fs.writeFileSync(testFilePath, testFileContent);

    try {
      // Attempt path traversal attack
      const response = await request(baseUrl)
        .post('/api/auth/register/restaurant')
        .field('name', 'Test Restaurant')
        .field('ownerName', 'Test Owner')
        .field('location', 'Test Location')
        .field('contactNumber', '1234567890')
        .field('email', `traversal${Date.now()}@test.com`)
        .field('password', 'password123')
        .attach('profilePicture', testFilePath, {
          filename: maliciousFilename,
          contentType: 'text/plain'
        });

      // SECURITY ISSUE: Path traversal should not cause server crash
      // The service should either:
      // 1. Sanitize the filename and succeed (201)
      // 2. Reject the malicious filename (400)
      // 3. NOT crash the server (500)

      if (response.status === 500) {
        console.log('CRITICAL SECURITY ISSUE: Path traversal causes server crash');
        // This is a security vulnerability - mark test as failed
        expect(response.status).not.toBe(500);
      } else if (response.status === 201) {
        // If successful, check that the file was properly sanitized
        const profilePictureUrl = response.body.data.restaurant.profilePicture;

        console.log(`Profile picture URL: ${profilePictureUrl}`);

        // The URL should not contain path traversal sequences
        expect(profilePictureUrl).not.toContain('..');
        expect(profilePictureUrl).not.toContain('/etc');
        expect(profilePictureUrl).not.toContain('passwd');

        // Try to access the uploaded file
        const fileResponse = await request(baseUrl)
          .get(profilePictureUrl);

        // Should be able to access the uploaded file
        expect([200, 404]).toContain(fileResponse.status);
      } else {
        // If failed with validation error, that's acceptable
        expect([400, 409]).toContain(response.status);
      }
    } finally {
      // Clean up test file
      if (fs.existsSync(testFilePath)) {
        fs.unlinkSync(testFilePath);
      }
    }
  });

  it('should validate file types and prevent malicious uploads', async () => {
    // Create a file that looks like an image but contains malicious content
    const maliciousContent = '<?php echo "malicious code"; ?>';
    const testFilePath = path.join(__dirname, 'malicious.php');
    fs.writeFileSync(testFilePath, maliciousContent);

    try {
      // Try to upload a PHP file disguised as an image
      const response = await request(baseUrl)
        .post('/api/auth/register/restaurant')
        .field('name', 'Malicious Restaurant')
        .field('ownerName', 'Malicious Owner')
        .field('location', 'Malicious Location')
        .field('contactNumber', '1234567890')
        .field('email', `malicious${Date.now()}@test.com`)
        .field('password', 'password123')
        .attach('profilePicture', testFilePath, {
          filename: 'malicious.jpg', // Fake image extension
          contentType: 'image/jpeg'  // Fake MIME type
        });

      // Should reject the upload due to content validation
      console.log(`Malicious file response status: ${response.status}`);
      if (response.status >= 400) {
        console.log(`Error response:`, response.body);
      }

      // This is a security vulnerability if the malicious file is accepted
      // The service should reject non-image files even with fake MIME types
      // Check if file was uploaded despite the error
      const uploadsDir = path.join(__dirname, '../../uploads');
      if (fs.existsSync(uploadsDir)) {
        const files = fs.readdirSync(uploadsDir).filter(file =>
          file.includes('malicious')
        );
        console.log(`Files with 'malicious' in uploads dir: ${files.length}`);

        // If any malicious files were uploaded, that's a security issue
        if (files.length > 0) {
          console.log('SECURITY ISSUE: Malicious file was uploaded despite validation');
          expect(files.length).toBe(0); // This should fail, indicating the vulnerability
        }
      }

      expect([400, 409]).toContain(response.status);
    } finally {
      // Clean up test file
      if (fs.existsSync(testFilePath)) {
        fs.unlinkSync(testFilePath);
      }
    }
  });

  it('should handle file size limits correctly', async () => {
    // Create a large file to test size limits
    const largeContent = 'x'.repeat(6 * 1024 * 1024); // 6MB (over 5MB limit)
    const testFilePath = path.join(__dirname, 'large-file.jpg');
    fs.writeFileSync(testFilePath, largeContent);

    try {
      const response = await request(baseUrl)
        .post('/api/auth/register/restaurant')
        .field('name', 'Large File Restaurant')
        .field('ownerName', 'Large File Owner')
        .field('location', 'Large File Location')
        .field('contactNumber', '1234567890')
        .field('email', `large${Date.now()}@test.com`)
        .field('password', 'password123')
        .attach('profilePicture', testFilePath, {
          filename: 'large.jpg',
          contentType: 'image/jpeg'
        });

      // Should reject due to file size limit
      expect([400, 413]).toContain(response.status);
    } finally {
      // Clean up test file
      if (fs.existsSync(testFilePath)) {
        fs.unlinkSync(testFilePath);
      }
    }
  });
});