# Auth Service & Restaurant Service - Integration Tests Documentation

> **Lưu ý**: Tài liệu này được tạo dựa trên các test case thực tế trong các file `app.e2e-spec.ts`

## Test Files Covered

1. `backend/auth-service/test/app.e2e-spec.ts`
2. `backend/restaurant-service/test/app.e2e-spec.ts`

---

## Auth Service Integration Tests

### Test File
- **Location**: `backend/auth-service/test/app.e2e-spec.ts`
- **Type**: E2E Integration Tests
- **Framework**: Jest + Supertest + NestJS Testing

---

### Test Setup

```typescript
let app: INestApplication;

beforeEach(async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleFixture.createNestApplication();
  await app.init();
});
```

---

### ✅ Test: GET / - Health Check

**Purpose**: Verify auth service is running

**HTTP Request**:
```http
GET /
```

**Expected Response** (200 OK):
```
Hello World!
```

**Assertions**:
```typescript
return request(app.getHttpServer())
  .get('/')
  .expect(200)
  .expect('Hello World!');
```

**Verification**:
- Server responds to root endpoint
- Status code 200
- Response body exactly "Hello World!"

---

### What This Tests

| Component | Coverage |
|-----------|----------|
| Application Bootstrap | ✅ App initializes successfully |
| HTTP Server | ✅ Server listening on port |
| Root Route | ✅ Default route works |
| AppController | ✅ Controller registered |
| AppService | ✅ Service injected correctly |

---

### What's NOT Tested Here

These are covered in **unit tests**:
- Customer registration (`/api/auth/register`)
- Customer login (`/api/auth/login`)
- Get customer profile (`/api/auth/profile`)
- Update customer profile (`/api/auth/profile`)
- Delivery management endpoints
- User management endpoints (SuperAdmin)
- Delivery fees calculation

---

## Restaurant Service Integration Tests

### Test File
- **Location**: `backend/restaurant-service/test/app.e2e-spec.ts`
- **Type**: E2E Integration Tests
- **Framework**: Jest + Supertest + NestJS Testing

---

### Test Setup

```typescript
let app: INestApplication;

beforeEach(async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleFixture.createNestApplication();
  await app.init();
});
```

---

### ✅ Test: GET / - Health Check

**Purpose**: Verify restaurant service is running

**HTTP Request**:
```http
GET /
```

**Expected Response** (200 OK):
```
Hello World!
```

**Assertions**:
```typescript
return request(app.getHttpServer())
  .get('/')
  .expect(200)
  .expect('Hello World!');
```

**Verification**:
- Server responds to root endpoint
- Status code 200
- Response body exactly "Hello World!"

---

### What This Tests

| Component | Coverage |
|-----------|----------|
| Application Bootstrap | ✅ App initializes successfully |
| HTTP Server | ✅ Server listening on port 5002 |
| Root Route | ✅ Default route works |
| AppController | ✅ Controller registered |
| AppService | ✅ Service injected correctly |

---

### What's NOT Tested Here

These are covered in **unit tests** or **manual testing**:
- Restaurant admin authentication (`/api/restaurant/auth/*`)
- SuperAdmin authentication (`/api/superAdmin/auth/*`)
- Food items management (`/api/food-items/*`)
- Restaurant management
- File uploads (multer middleware)
- Image serving from `/uploads`

---

## Running Integration Tests

### Auth Service
```bash
cd backend/auth-service

# Run E2E tests
npm run test:e2e

# With coverage
npm run test:e2e -- --coverage
```

### Restaurant Service
```bash
cd backend/restaurant-service

# Run E2E tests
npm run test:e2e

# With coverage
npm run test:e2e -- --coverage
```

---

## Test Statistics

| Service | File | Total Tests | Type |
|---------|------|-------------|------|
| Auth Service | app.e2e-spec.ts | 1 | Health check |
| Restaurant Service | app.e2e-spec.ts | 1 | Health check |
| **TOTAL** | | **2** | Smoke tests |

---

## Understanding These Tests

### Purpose: Smoke Tests

These are **smoke tests** (basic sanity checks) that verify:
1. ✅ Application compiles without errors
2. ✅ NestJS can bootstrap the app
3. ✅ HTTP server starts successfully
4. ✅ Basic routing works

### Why So Minimal?

The current integration tests are **minimal smoke tests** that ensure basic application health. More comprehensive integration tests would cover:

#### Auth Service Full Coverage (Not Yet Implemented)
```typescript
describe('Auth Service (e2e)', () => {
  it('/ (GET) - health check', () => { /* ✅ EXISTS */ });
  
  // These would be full integration tests:
  it('registers a new customer', async () => { /* ❌ NOT IMPLEMENTED */ });
  it('logs in with valid credentials', async () => { /* ❌ NOT IMPLEMENTED */ });
  it('rejects invalid credentials', async () => { /* ❌ NOT IMPLEMENTED */ });
  it('protects profile endpoint with JWT', async () => { /* ❌ NOT IMPLEMENTED */ });
  it('updates customer profile', async () => { /* ❌ NOT IMPLEMENTED */ });
  it('creates delivery personnel (SuperAdmin)', async () => { /* ❌ NOT IMPLEMENTED */ });
});
```

#### Restaurant Service Full Coverage (Not Yet Implemented)
```typescript
describe('Restaurant Service (e2e)', () => {
  it('/ (GET) - health check', () => { /* ✅ EXISTS */ });
  
  // These would be full integration tests:
  it('registers a restaurant admin', async () => { /* ❌ NOT IMPLEMENTED */ });
  it('SuperAdmin logs in', async () => { /* ❌ NOT IMPLEMENTED */ });
  it('creates a food item with image', async () => { /* ❌ NOT IMPLEMENTED */ });
  it('serves uploaded images', async () => { /* ❌ NOT IMPLEMENTED */ });
  it('lists all restaurants (SuperAdmin)', async () => { /* ❌ NOT IMPLEMENTED */ });
});
```

---

## Smoke Tests vs Full Integration Tests

### Smoke Tests (Current Implementation)

**Characteristics**:
- ⚡ Very fast (~100ms)
- 🎯 Single endpoint test
- 🔧 Verifies basic setup
- 📦 No database needed
- 🚫 No business logic tested

**Use Cases**:
- CI/CD pipeline quick check
- Pre-deployment sanity check
- Verify app compiles and runs

**Code Example**:
```typescript
it('/ (GET)', () => {
  return request(app.getHttpServer())
    .get('/')
    .expect(200)
    .expect('Hello World!');
});
```

---

### Full Integration Tests (Like Order Service)

**Characteristics**:
- 🐢 Slower (~5 seconds)
- 🎯 Multiple endpoints
- 🔧 Tests user journeys
- 📦 Real database (in-memory)
- ✅ Business logic tested

**Use Cases**:
- Critical user flows
- Authentication/Authorization
- End-to-end scenarios

**Code Example**:
```typescript
it('allows a customer to register, login and create an order', async () => {
  // Step 1: Register
  await request(server)
    .post('/api/users/register')
    .send({ name, email, password, role })
    .expect(201);

  // Step 2: Login
  const loginResponse = await request(server)
    .post('/api/users/login')
    .send({ email, password })
    .expect(201);

  const token = loginResponse.body.token;

  // Step 3: Create Order
  await request(server)
    .post('/api/orders')
    .set('Authorization', `Bearer ${token}`)
    .send({ customerId, items, ... })
    .expect(201);

  // Step 4: View Orders
  const orders = await request(server)
    .get('/api/orders')
    .set('Authorization', `Bearer ${token}`)
    .expect(200);

  expect(orders.body.length).toBe(1);
});
```

---

## Comparison Table

| Aspect | Auth/Restaurant E2E | Order Service E2E |
|--------|---------------------|-------------------|
| **Test Type** | Smoke Test | Full Integration |
| **Endpoints Tested** | 1 (root) | 4 (register, login, create, list) |
| **Database** | None | MongoDB Memory Server |
| **Authentication** | Not tested | JWT tested |
| **Business Logic** | Not tested | Order creation, RBAC tested |
| **Test Duration** | ~100ms | ~5 seconds |
| **Setup Complexity** | Low | High |
| **Coverage Value** | Basic health | Critical user flows |

---

## When to Use Each Type

### Use Smoke Tests When:
1. ✅ Quick CI/CD feedback needed
2. ✅ Verifying deployment successful
3. ✅ Checking basic app health
4. ✅ Testing before full test suite
5. ✅ Resource-constrained environments

### Use Full Integration Tests When:
1. ✅ Testing critical user journeys
2. ✅ Verifying authentication/authorization
3. ✅ Testing complex business logic
4. ✅ Ensuring data persistence works
5. ✅ Validating API contracts

---

## Extending These Tests

### Recommended Additions for Auth Service

```typescript
describe('Auth Service - Customer Flow (e2e)', () => {
  let app: INestApplication;
  let mongo: MongoMemoryServer;

  beforeAll(async () => {
    mongo = await MongoMemoryServer.create();
    process.env.MONGO_URI = mongo.getUri();
    // ... setup
  });

  it('registers a new customer', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/auth/register')
      .send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'secure123',
        phone: '+84912345678'
      })
      .expect(201);

    expect(response.body.message).toBe('Customer registered successfully');
    expect(response.body.token).toBeDefined();
  });

  it('logs in with valid credentials', async () => {
    // Register first
    await request(app.getHttpServer())
      .post('/api/auth/register')
      .send({ ...userData })
      .expect(201);

    // Then login
    const response = await request(app.getHttpServer())
      .post('/api/auth/login')
      .send({ email: 'john@example.com', password: 'secure123' })
      .expect(201);

    expect(response.body.token).toBeDefined();
    expect(response.body.customer).toBeDefined();
  });

  it('protects profile endpoint', async () => {
    // Without token
    await request(app.getHttpServer())
      .get('/api/auth/profile')
      .expect(401);

    // With token
    const token = 'valid-jwt-token';
    await request(app.getHttpServer())
      .get('/api/auth/profile')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });
});
```

---

### Recommended Additions for Restaurant Service

```typescript
describe('Restaurant Service - Food Items (e2e)', () => {
  let app: INestApplication;
  let mongo: MongoMemoryServer;

  beforeAll(async () => {
    mongo = await MongoMemoryServer.create();
    process.env.MONGO_URI = mongo.getUri();
    // ... setup
  });

  it('SuperAdmin creates a food item with image', async () => {
    // Login as SuperAdmin first
    const loginResponse = await request(app.getHttpServer())
      .post('/api/superAdmin/auth/login')
      .send({ email: 'admin@example.com', password: 'admin123' })
      .expect(201);

    const token = loginResponse.body.token;

    // Create food item with image upload
    const response = await request(app.getHttpServer())
      .post('/api/food-items')
      .set('Authorization', `Bearer ${token}`)
      .field('name', 'Pizza Margherita')
      .field('price', '150000')
      .field('category', 'Italian')
      .attach('image', './test/fixtures/pizza.jpg')
      .expect(201);

    expect(response.body.imageUrl).toContain('/uploads/');
  });

  it('serves uploaded images', async () => {
    const imageUrl = '/uploads/pizza-123.jpg';
    
    await request(app.getHttpServer())
      .get(imageUrl)
      .expect(200)
      .expect('Content-Type', /image/);
  });
});
```

---

## Key Takeaways

1. **Current State**: Auth và Restaurant services have minimal smoke tests only
2. **Order Service**: Has comprehensive integration test (full user journey)
3. **Payment Service**: Has comprehensive integration test (payment processing)
4. **Recommendation**: Extend auth và restaurant tests to match order/payment coverage
5. **Priority**: Add integration tests for critical paths:
   - Authentication flows
   - Authorization (RBAC)
   - File uploads (restaurant service)
   - SuperAdmin operations

---

## Test Coverage Summary

| Service | Smoke Tests | Integration Tests | Unit Tests |
|---------|-------------|-------------------|------------|
| Auth Service | ✅ 1 test | ❌ None | ✅ 10+ tests |
| Restaurant Service | ✅ 1 test | ❌ None | ✅ 1 test (minimal) |
| Order Service | ✅ 1 test | ✅ 1 comprehensive | ✅ 16+ tests |
| Payment Service | ✅ 1 test | ✅ 9 tests | ✅ 28+ tests |

**Overall**: Order và Payment services have excellent test coverage. Auth và Restaurant services need integration test expansion.
