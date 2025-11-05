# Order Service - Integration Tests Documentation

> **Lưu ý**: Tài liệu này được tạo dựa trên test case thực tế trong `backend/order-service/test/app.e2e-spec.ts`

## Test File
- **Location**: `backend/order-service/test/app.e2e-spec.ts`
- **Type**: E2E Integration Tests
- **Framework**: Jest + Supertest + MongoDB Memory Server

---

## Test Setup

### Database Configuration
```typescript
let mongo: MongoMemoryServer;

beforeAll(async () => {
  // Create in-memory MongoDB instance
  mongo = await MongoMemoryServer.create();
  process.env.MONGO_URI = mongo.getUri();
  process.env.JWT_SECRET = 'test-secret';
  
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleFixture.createNestApplication();
  await app.init();
});
```

### Cleanup
```typescript
afterAll(async () => {
  await app.close();
  await mongoose.disconnect();
  if (mongo) {
    await mongo.stop();
  }
});
```

---

## Integration Test: Complete User Journey

### ✅ Test: allows a customer to register, login and create an order

**Purpose**: Test complete end-to-end flow từ registration → login → create order → view orders

---

### Step 1: Register Customer

**HTTP Request**:
```http
POST /api/users/register
Content-Type: application/json

{
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123",
  "role": "customer"
}
```

**Expected Response** (201 Created):
```json
{
  "message": "User registered successfully!",
  "token": "<jwt-token>"
}
```

**Verification**:
- User created in MongoDB
- Password hashed với bcrypt
- Role set to 'customer'
- Status code 201

---

### Step 2: Login

**HTTP Request**:
```http
POST /api/users/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123"
}
```

**Expected Response** (201 Created):
```json
{
  "id": "<user-id>",
  "name": "Test User",
  "email": "test@example.com",
  "role": "customer",
  "token": "<jwt-token>"
}
```

**Verification**:
- Password compared với bcrypt
- JWT token generated
- User data returned (without password)
- Token và user ID saved for next steps

**Assertions**:
```typescript
const token = loginResponse.body.token;
const customerId = loginResponse.body.id;

expect(token).toBeDefined();
expect(customerId).toBeDefined();
```

---

### Step 3: Create Order

**HTTP Request**:
```http
POST /api/orders
Authorization: Bearer <jwt-token>
Content-Type: application/json

{
  "customerId": "<user-id>",
  "restaurantId": "restaurant-123",
  "deliveryAddress": "123 Main St",
  "items": [
    {
      "foodId": "food-1",
      "quantity": 2,
      "price": 50000
    },
    {
      "foodId": "food-2",
      "quantity": 1,
      "price": 75000
    }
  ]
}
```

**Expected Response** (201 Created):
```json
{
  "_id": "<order-id>",
  "orderId": "ORDER-<timestamp>",
  "customerId": "<user-id>",
  "restaurantId": "restaurant-123",
  "deliveryAddress": "123 Main St",
  "items": [
    { "foodId": "food-1", "quantity": 2, "price": 50000 },
    { "foodId": "food-2", "quantity": 1, "price": 75000 }
  ],
  "totalPrice": 175000,
  "status": "Pending",
  "createdAt": "<timestamp>"
}
```

**Total Price Calculation**:
```
Item 1: 2 × 50,000 = 100,000 VND
Item 2: 1 × 75,000 =  75,000 VND
                     ———————————
Total:              175,000 VND
```

**Verification**:
- JWT authentication successful
- Order created in database
- totalPrice calculated correctly: 2*50000 + 1*75000 = 175000
- orderId generated với pattern `ORDER-<timestamp>`
- Status set to 'Pending'
- customerId matches logged-in user

**Assertions**:
```typescript
expect(createOrderResponse.body.totalPrice).toBe(175000);
expect(createOrderResponse.status).toBe(201);
```

---

### Step 4: View Orders

**HTTP Request**:
```http
GET /api/orders
Authorization: Bearer <jwt-token>
```

**Expected Response** (200 OK):
```json
[
  {
    "_id": "<order-id>",
    "orderId": "ORDER-<timestamp>",
    "customerId": "<user-id>",
    "restaurantId": "restaurant-123",
    "deliveryAddress": "123 Main St",
    "items": [...],
    "totalPrice": 175000,
    "status": "Pending",
    "createdAt": "<timestamp>"
  }
]
```

**Verification**:
- User can view own orders
- Orders filtered by customerId (RBAC)
- Array contains 1 order
- Order data matches created order

**Assertions**:
```typescript
expect(Array.isArray(ordersResponse.body)).toBe(true);
expect(ordersResponse.body.length).toBe(1);
expect(ordersResponse.body[0].customerId).toBe(customerId);
```

---

## Complete Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    Customer Journey                         │
└─────────────────────────────────────────────────────────────┘
         │
         ▼
┌──────────────────┐
│ 1. Register      │  POST /api/users/register
│    ✓ Create user │  → User in MongoDB
│    ✓ Hash password│  → Password hashed
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ 2. Login         │  POST /api/users/login
│    ✓ Verify pwd  │  → bcrypt.compare
│    ✓ Gen JWT     │  → JWT token with { id, role }
└────────┬─────────┘
         │ token, customerId
         ▼
┌──────────────────┐
│ 3. Create Order  │  POST /api/orders
│    ✓ Auth check  │  → Verify JWT
│    ✓ Calc total  │  → Sum(qty × price)
│    ✓ Save order  │  → Order in MongoDB
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ 4. View Orders   │  GET /api/orders
│    ✓ Auth check  │  → Verify JWT
│    ✓ Filter RBAC │  → customerId filter
│    ✓ Return list │  → Order array
└──────────────────┘
```

---

## Database State After Test

### Users Collection
```json
{
  "_id": ObjectId("..."),
  "name": "Test User",
  "email": "test@example.com",
  "password": "$2b$10$...", // hashed
  "role": "customer",
  "createdAt": ISODate("...")
}
```

### Orders Collection
```json
{
  "_id": ObjectId("..."),
  "orderId": "ORDER-1234567890",
  "customerId": "...",
  "restaurantId": "restaurant-123",
  "deliveryAddress": "123 Main St",
  "items": [
    { "foodId": "food-1", "quantity": 2, "price": 50000 },
    { "foodId": "food-2", "quantity": 1, "price": 75000 }
  ],
  "totalPrice": 175000,
  "status": "Pending",
  "createdAt": ISODate("..."),
  "updatedAt": ISODate("...")
}
```

---

## Authentication Flow

### JWT Token Structure
```typescript
// Payload
{
  id: "<user-id>",
  role: "customer",
  iat: <issued-at>,
  exp: <expiration>
}

// Header
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Protected Routes
- ✅ POST `/api/orders` - Requires JWT
- ✅ GET `/api/orders` - Requires JWT
- ✅ GET `/api/orders/:id` - Requires JWT
- ❌ POST `/api/users/register` - Public
- ❌ POST `/api/users/login` - Public

---

## RBAC (Role-Based Access Control)

### Customer Role Permissions
| Operation | Endpoint | Allowed | Filter |
|-----------|----------|---------|--------|
| Create Order | POST /api/orders | ✅ Yes | Must be own customerId |
| View Orders | GET /api/orders | ✅ Yes | Only own orders (customerId filter) |
| View Order | GET /api/orders/:id | ✅ Yes | Only if own order |
| Update Order | PATCH /api/orders/:id | ✅ Yes | Only own orders |
| Update Status | PATCH /api/orders/:id/status | ❌ No | Restaurant/Admin only |
| Cancel Order | POST /api/orders/:id/cancel | ✅ Yes | Only own orders |

---

## Test Statistics

| Test Category | Total Tests | Description |
|---------------|-------------|-------------|
| Complete Journey | 1 | Register → Login → Create Order → View Orders |
| **TOTAL** | **1** | Full E2E integration test |

---

## Running Integration Tests

### Local Testing
```bash
cd backend/order-service

# Run E2E tests
npm run test:e2e

# Run with coverage
npm run test:e2e -- --coverage

# Verbose output
npm run test:e2e -- --verbose

# Watch mode (not recommended for E2E)
npm run test:e2e -- --watch
```

### Test Duration
- **Setup**: ~2-3 seconds (MongoDB Memory Server startup)
- **Test Execution**: ~1-2 seconds
- **Cleanup**: ~1 second
- **Total**: ~5 seconds per run

---

## Environment Variables

### Test Environment
```env
# Set programmatically in test
MONGO_URI=mongodb://127.0.0.1:<random-port>/test
JWT_SECRET=test-secret
```

### Production Environment
```env
MONGO_URI=mongodb://localhost:27017/order-service
JWT_SECRET=<secure-secret>
PORT=5005
```

---

## Key Integration Test Patterns

### 1. In-Memory Database
- **Benefit**: Isolated, fast, no side effects
- **Setup**: MongoDB Memory Server
- **Cleanup**: Automatic on test end

### 2. Full HTTP Stack
- **Tool**: Supertest
- **Benefit**: Tests actual HTTP requests/responses
- **Coverage**: Routes, middleware, guards, validation

### 3. Sequential User Journey
- **Pattern**: register → login → use token → perform action
- **Benefit**: Tests realistic user behavior
- **Coverage**: Authentication, authorization, business logic

### 4. State Verification
- **Check**: Data persisted in database
- **Verify**: Calculations correct (totalPrice)
- **Assert**: Response matches expected format

### 5. Token Management
- **Extract**: token from login response
- **Use**: Set Authorization header for protected routes
- **Verify**: JWT authentication working

---

## Common Issues & Solutions

### Issue 1: JWT Secret Mismatch
```bash
# Error: JsonWebTokenError: invalid signature

# Solution: Ensure JWT_SECRET set before app initialization
process.env.JWT_SECRET = 'test-secret';
```

### Issue 2: MongoDB Connection Fails
```bash
# Error: MongoServerError: connect ECONNREFUSED

# Solution: Use MongoDB Memory Server
mongo = await MongoMemoryServer.create();
process.env.MONGO_URI = mongo.getUri();
```

### Issue 3: Test Timeout
```bash
# Error: Timeout - Async callback was not invoked

# Solution: Increase timeout for MongoDB Memory Server
jest.setTimeout(30000);
```

### Issue 4: Port Already in Use
```bash
# Error: EADDRINUSE: address already in use

# Solution: Don't specify port in test, let NestJS auto-assign
# OR ensure cleanup properly closes app
await app.close();
```

### Issue 5: Order Not Found in GET /api/orders
```bash
# Error: orders array empty

# Solution: Check RBAC filter - customer only sees own orders
# Verify customerId matches in both create and get requests
```

---

## What's Tested vs Not Tested

### ✅ Tested in Integration Tests
- Full HTTP request/response cycle
- JWT authentication và authorization
- Database persistence (create, read)
- Password hashing (bcrypt)
- RBAC filtering (customer sees only own orders)
- Total price calculation
- OrderID generation

### ❌ Not Tested (Covered in Unit Tests)
- Update order status (restaurant/admin only)
- Cancel order
- Update order details
- Order not found scenarios
- Forbidden access scenarios
- WebSocket broadcasts
- Invalid input validation edge cases

---

## Integration Test Best Practices

1. **Use In-Memory Database**: Fast, isolated, no cleanup needed
2. **Test Realistic Flows**: Mimic actual user journeys
3. **One Major Flow Per Test**: Keep tests focused
4. **Extract Tokens**: Reuse authentication tokens across steps
5. **Verify Database State**: Check data persisted correctly
6. **Clean Up Resources**: Close app, disconnect DB, stop memory server
7. **Set Timeouts**: MongoDB Memory Server can be slow on first run
8. **Avoid Parallelization**: E2E tests share database state

---

## Extending Integration Tests

### Potential Additional Tests
```typescript
it('prevents customer from creating order for another user', async () => {
  // Register user1, login, try to create order with user2's customerId
  // Expected: ForbiddenException
});

it('allows restaurant to update order status', async () => {
  // Register restaurant user, create order, update status
  // Expected: Status updated successfully
});

it('sends WebSocket notification when order status changes', async () => {
  // Create order, update status, verify WebSocket event emitted
  // Expected: broadcastOrderUpdate called
});

it('validates order items array is not empty', async () => {
  // Try to create order with empty items array
  // Expected: ValidationException
});
```

---

## Comparison: Unit vs Integration Tests

| Aspect | Unit Test | Integration Test |
|--------|-----------|------------------|
| Scope | Single function | End-to-end flow |
| Database | Mocked | Real (in-memory) |
| HTTP | Direct function call | Full HTTP stack |
| Speed | ⚡ Fast (~ms) | 🐢 Slower (~seconds) |
| Isolation | Perfect | Shared state |
| Setup Complexity | Low | High |
| Coverage | Functions | User journeys |
| When to Use | Every function | Critical paths |
