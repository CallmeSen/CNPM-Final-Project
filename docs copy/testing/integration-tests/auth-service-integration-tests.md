# Auth Service - Integration Tests

## Overview
Integration tests for Auth Service testing real database interactions, HTTP endpoints, and authentication flows.

---

## Setup Requirements

### Test Database
```typescript
MongooseModule.forRootAsync({
  useFactory: () => ({
    uri: process.env.MONGO_TEST_URL || 'mongodb://localhost:27017/auth-test',
  }),
});
```

### Test Module Configuration
```typescript
const module: TestingModule = await Test.createTestingModule({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(testDbUri),
    MongooseModule.forFeature([
      { name: Customer.name, schema: CustomerSchema },
      { name: Restaurant.name, schema: RestaurantSchema },
      { name: SuperAdmin.name, schema: SuperAdminSchema },
    ]),
    JwtModule.register({
      secret: 'test-secret',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
}).compile();
```

---

## Customer Authentication Integration Tests

### Test Suite: POST /api/auth/register/customer

#### ✅ Test: Successfully registers new customer
**Purpose**: End-to-end customer registration

**Pre-conditions**: Clean database

**Test Steps**:
1. Send POST request with valid customer data
2. Verify database record created
3. Verify JWT token returned
4. Verify password hashed in database

**Request**:
```http
POST /api/auth/register/customer
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "password": "SecurePass123",
  "location": "New York"
}
```

**Expected Response** (201):
```json
{
  "status": "success",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "data": {
    "customer": {
      "id": "generated-id",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "phone": "1234567890",
      "location": "New York"
    }
  }
}
```

**Assertions**:
- Response status 201
- Token is valid JWT
- Customer exists in database
- Password field excluded from response
- Password properly hashed with bcrypt in DB

---

#### ❌ Test: Rejects duplicate email
**Purpose**: Prevent duplicate registrations

**Pre-conditions**: Existing customer with email

**Request**: Same as above

**Expected Response** (409):
```json
{
  "statusCode": 409,
  "message": "Email already registered.",
  "error": "Conflict"
}
```

---

#### ❌ Test: Validates required fields
**Purpose**: Ensure data integrity

**Request**: Missing required fields

**Expected Response** (400):
```json
{
  "statusCode": 400,
  "message": ["email should not be empty", "password must be longer than or equal to 6 characters"],
  "error": "Bad Request"
}
```

---

### Test Suite: POST /api/auth/login

#### ✅ Test: Successfully logs in customer
**Purpose**: End-to-end login flow

**Pre-conditions**: Registered customer exists

**Request**:
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Expected Response** (200):
```json
{
  "status": "success",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "data": {
    "customer": {
      "id": "customer-id",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "phone": "1234567890",
      "location": "New York"
    }
  }
}
```

**Assertions**:
- JWT token contains correct payload (userId, role)
- Token can be verified with secret
- Response excludes password

---

#### ❌ Test: Rejects invalid credentials
**Request**: Wrong password

**Expected Response** (401):
```json
{
  "statusCode": 401,
  "message": "Invalid credentials.",
  "error": "Unauthorized"
}
```

---

### Test Suite: GET /api/auth/customer/profile

#### ✅ Test: Returns authenticated customer profile
**Purpose**: Protected route with JWT

**Pre-conditions**: 
- Customer logged in
- Valid JWT token

**Request**:
```http
GET /api/auth/customer/profile
Authorization: Bearer <valid-jwt-token>
```

**Expected Response** (200):
```json
{
  "status": "success",
  "data": {
    "customer": {
      "id": "customer-id",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "phone": "1234567890",
      "location": "New York"
    }
  }
}
```

**Assertions**:
- Requires valid JWT
- Returns correct user data
- Excludes password field

---

#### ❌ Test: Rejects unauthenticated requests
**Request**: No Authorization header

**Expected Response** (401):
```json
{
  "statusCode": 401,
  "message": "Unauthorized"
}
```

---

#### ❌ Test: Rejects invalid/expired tokens
**Request**: Invalid JWT token

**Expected Response** (401)

---

### Test Suite: PATCH /api/auth/customer/profile

#### ✅ Test: Updates customer profile
**Purpose**: Authenticated profile update

**Pre-conditions**: Authenticated customer

**Request**:
```http
PATCH /api/auth/customer/profile
Authorization: Bearer <valid-jwt-token>
Content-Type: application/json

{
  "firstName": "Johnny",
  "location": "Los Angeles"
}
```

**Expected Response** (200):
```json
{
  "status": "success",
  "data": {
    "customer": {
      "id": "customer-id",
      "firstName": "Johnny",
      "lastName": "Doe",
      "email": "john@example.com",
      "phone": "1234567890",
      "location": "Los Angeles"
    }
  }
}
```

**Assertions**:
- Database updated with new values
- Unchanged fields remain the same
- Response reflects updates

---

## Restaurant Authentication Integration Tests

### Test Suite: POST /api/auth/register/restaurant

#### ✅ Test: Registers restaurant with file upload
**Purpose**: Multipart form data with image upload

**Request**:
```http
POST /api/auth/register/restaurant
Content-Type: multipart/form-data

name=Pizza Place
ownerName=John Pizza
location=New York
contactNumber=1234567890
email=pizza@example.com
password=SecurePass123
profilePicture=<file-binary>
```

**Expected Response** (201):
```json
{
  "status": "success",
  "message": "Restaurant registered successfully",
  "token": "jwt-token",
  "data": {
    "restaurant": {
      "id": "restaurant-id",
      "name": "Pizza Place",
      "ownerName": "John Pizza",
      "location": "New York",
      "contactNumber": "1234567890",
      "profilePicture": "http://localhost:5001/uploads/profile-123.jpg",
      "email": "pizza@example.com"
    }
  }
}
```

**Assertions**:
- File uploaded to `/uploads` directory
- File path stored in database
- Restaurant document created
- Admin credentials embedded and hashed

---

#### ❌ Test: Rejects invalid file types
**Purpose**: File upload validation

**Request**: Upload .exe file

**Expected Response** (400): Only image files allowed

---

#### ❌ Test: Enforces file size limit
**Purpose**: Prevent large uploads

**Request**: Upload 10MB image

**Expected Response** (413): File size exceeds 5MB limit

---

### Test Suite: POST /api/auth/login/restaurant

#### ✅ Test: Logs in restaurant with admin credentials
**Purpose**: Restaurant authentication

**Request**:
```http
POST /api/auth/login/restaurant
Content-Type: application/json

{
  "email": "pizza@example.com",
  "password": "SecurePass123"
}
```

**Expected Response** (200): Restaurant data with JWT

**Assertions**:
- JWT contains restaurantId and role='restaurant'
- Password comparison works with embedded admin

---

### Test Suite: GET /api/auth/restaurant/profile/:id

#### ✅ Test: Fetches restaurant profile by ID
**Purpose**: Public restaurant data access

**Request**:
```http
GET /api/auth/restaurant/profile/restaurant-id-123
```

**Expected Response** (200):
```json
{
  "status": "success",
  "data": {
    "restaurant": {
      "id": "restaurant-id-123",
      "name": "Pizza Place",
      "ownerName": "John Pizza",
      "location": "New York",
      "contactNumber": "1234567890",
      "profilePicture": "http://localhost:5001/uploads/profile.jpg",
      "email": "pizza@example.com",
      "availability": true
    }
  }
}
```

**Assertions**:
- Returns restaurant data
- Excludes password hash
- Works without authentication (public endpoint)

---

#### ❌ Test: Returns 404 for non-existent restaurant

**Expected Response** (404):
```json
{
  "statusCode": 404,
  "message": "Restaurant not found"
}
```

---

## SuperAdmin Authentication Integration Tests

### Test Suite: POST /api/auth/register/superadmin

#### ✅ Test: Registers superadmin account
**Purpose**: Admin account creation

**Request**:
```http
POST /api/auth/register/superadmin
Content-Type: application/json

{
  "username": "admin",
  "email": "admin@fooddelivery.com",
  "password": "SuperSecure123",
  "role": "superAdmin"
}
```

**Expected Response** (201):
```json
{
  "status": "success",
  "message": "SuperAdmin registered successfully",
  "token": "jwt-token",
  "data": {
    "superAdmin": {
      "id": "admin-id",
      "username": "admin",
      "email": "admin@fooddelivery.com",
      "role": "superAdmin"
    }
  }
}
```

---

### Test Suite: POST /api/auth/login/superadmin

#### ✅ Test: Logs in with username
**Request**:
```json
{
  "username": "admin",
  "password": "SuperSecure123"
}
```

**Expected Response** (200): JWT with role='superAdmin'

---

#### ✅ Test: Logs in with email
**Request**:
```json
{
  "email": "admin@fooddelivery.com",
  "password": "SuperSecure123"
}
```

**Expected Response** (200): Same as username login

---

### Test Suite: GET /api/auth/superadmin/profile/:id

#### ✅ Test: Fetches superadmin profile

**Expected Response** (200):
```json
{
  "status": "success",
  "data": {
    "superAdmin": {
      "id": "admin-id",
      "username": "admin",
      "email": "admin@fooddelivery.com",
      "role": "superAdmin"
    }
  }
}
```

---

## JWT Strategy Integration Tests

### Test Suite: JWT Validation

#### ✅ Test: Validates customer token
**Purpose**: JwtStrategy verifies token and loads user

**Test Steps**:
1. Register customer
2. Login and get token
3. Decode token payload
4. Call JwtStrategy.validate()
5. Verify user loaded from database

**Expected**: RequestUser object with role='customer'

---

#### ✅ Test: Validates restaurant token
**Expected**: RequestUser with role='restaurant'

---

#### ✅ Test: Validates superadmin token
**Expected**: RequestUser with role='superAdmin'

---

#### ❌ Test: Rejects token for deleted user
**Purpose**: Handle stale tokens

**Pre-conditions**: 
- User deleted from database
- Valid token still exists

**Expected**: UnauthorizedException

---

## Database Transaction Tests

### Test Suite: Concurrent Registrations

#### ✅ Test: Handles race condition on duplicate email
**Purpose**: Test database unique constraint

**Test Steps**:
1. Send 10 concurrent registration requests with same email
2. Verify only 1 succeeds
3. Verify 9 receive conflict errors

**Assertions**:
- Database maintains data integrity
- Unique constraint enforced
- No duplicate records created

---

## File Upload Integration Tests

### Test Suite: Multer Configuration

#### ✅ Test: Stores uploaded files in /uploads directory
**Purpose**: Verify file storage

**Assertions**:
- File saved with unique filename
- File accessible via static route
- Database stores correct path

---

#### ✅ Test: Serves uploaded images via static route
**Request**:
```http
GET /uploads/profile-1730800000000.jpg
```

**Expected**: Image file with correct Content-Type

---

## Running Integration Tests

```bash
# Setup test database
docker run -d -p 27018:27017 --name mongodb-test mongo:latest

# Set environment variable
export MONGO_TEST_URL=mongodb://localhost:27018/auth-test

# Run integration tests
cd backend/auth-service
npm run test:e2e

# Run with coverage
npm run test:e2e -- --coverage

# Clean up
docker stop mongodb-test && docker rm mongodb-test
```

## Test Database Cleanup

```typescript
afterEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});
```

## Performance Benchmarks

| Endpoint | Average Response Time | Target |
|----------|----------------------|--------|
| POST /register/customer | 150ms | <200ms |
| POST /login | 120ms | <150ms |
| GET /profile | 50ms | <100ms |
| POST /register/restaurant (with file) | 250ms | <500ms |

## Security Test Cases

### Password Hashing
- ✅ Passwords never stored in plaintext
- ✅ Bcrypt with salt rounds >= 10
- ✅ Password excluded from all responses

### JWT Security
- ✅ Tokens signed with strong secret
- ✅ Tokens include expiration
- ✅ Payload contains minimal data
- ✅ Invalid tokens rejected

### File Upload Security
- ✅ Only image MIME types accepted
- ✅ File size limited to 5MB
- ✅ Filenames sanitized
- ✅ Files stored outside web root

## Coverage Goals

| Metric | Current | Target |
|--------|---------|--------|
| Statements | 68% | 80% |
| Branches | 40% | 70% |
| Functions | 59% | 75% |
| Lines | 68% | 80% |
