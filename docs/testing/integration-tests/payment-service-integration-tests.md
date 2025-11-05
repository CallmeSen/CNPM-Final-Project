# Payment Service - Integration Tests Documentation

> **Lưu ý**: Tài liệu này được tạo dựa trên test case thực tế trong `backend/payment-service/test/payment.e2e-spec.ts`

## Test File
- **Location**: `backend/payment-service/test/payment.e2e-spec.ts`
- **Type**: E2E Integration Tests
- **Framework**: Jest + Supertest + NestJS Testing

---

## Test Setup

### Database
```typescript
// MongoDB in-memory server
mongo = await MongoMemoryServer.create();
process.env.MONGO_URI = mongo.getUri();
```

### External Service Mocks
```typescript
// Stripe mocked at module level
jest.mock('stripe', () => {
  return jest.fn().mockImplementation(() => ({
    paymentIntents: {
      create: jest.fn().mockResolvedValue({
        id: 'pi_mock_123',
        client_secret: 'secret_mock_123',
      }),
    },
  }));
});

// Resend email service mocked
jest.mock('resend', () => {
  return {
    Resend: jest.fn().mockImplementation(() => ({
      emails: {
        send: jest.fn().mockResolvedValue({ id: 'email_mock_123' }),
      },
    })),
  };
});

// Twilio SMS service mocked
jest.mock('twilio', () => {
  return jest.fn().mockImplementation(() => ({
    messages: {
      create: jest.fn().mockResolvedValue({ sid: 'SMS_mock_123' }),
    },
  }));
});
```

### App Initialization
```typescript
const moduleFixture: TestingModule = await Test.createTestingModule({
  imports: [AppModule],
}).compile();

app = moduleFixture.createNestApplication();
await app.init();
```

---

## Integration Test: POST /api/payment/process

### ✅ Test: processes payment with all required fields

**HTTP Request**:
```http
POST /api/payment/process
Content-Type: application/json

{
  "orderId": "order-123",
  "amount": 50000,
  "currency": "vnd",
  "customerEmail": "customer@example.com",
  "customerPhone": "+84912345678"
}
```

**Expected Response** (201 Created):
```json
{
  "paymentIntentId": "pi_mock_123",
  "clientSecret": "secret_mock_123",
  "status": "pending"
}
```

**Verification Steps**:
1. Payment record created in database
2. Stripe `paymentIntents.create` called với:
   ```typescript
   {
     amount: 50000,
     currency: 'vnd',
     metadata: {
       orderId: 'order-123',
       customerEmail: 'customer@example.com',
       customerPhone: '+84912345678'
     }
   }
   ```
3. Response contains paymentIntentId và clientSecret

**Assertions**:
- Status code: 201
- Response body has `paymentIntentId`, `clientSecret`, `status`
- Payment stored in MongoDB

---

### ✅ Test: processes payment without phone number

**Purpose**: Verify phone number is optional

**HTTP Request**:
```http
POST /api/payment/process
Content-Type: application/json

{
  "orderId": "order-456",
  "amount": 30000,
  "currency": "vnd",
  "customerEmail": "test@example.com"
  // customerPhone omitted
}
```

**Expected Behavior**:
- Payment processed successfully
- SMS notification skipped
- Email still sent
- No error thrown

**Assertions**:
- Status code: 201
- Stripe called successfully
- Twilio SMS **NOT** called
- Resend email still called

---

### ✅ Test: processes payment without email

**Purpose**: Verify email is optional

**HTTP Request**:
```http
POST /api/payment/process
Content-Type: application/json

{
  "orderId": "order-789",
  "amount": 75000,
  "currency": "vnd",
  "customerPhone": "+84987654321"
  // customerEmail omitted
}
```

**Expected Behavior**:
- Payment processed successfully
- Email notification skipped
- SMS still sent
- No error thrown

**Assertions**:
- Status code: 201
- SMS sent to phone number
- Email service **NOT** called

---

### ❌ Test: validation error - missing orderId

**HTTP Request**:
```http
POST /api/payment/process
Content-Type: application/json

{
  // orderId missing
  "amount": 50000,
  "currency": "vnd"
}
```

**Expected Response** (400 Bad Request):
```json
{
  "statusCode": 400,
  "message": ["orderId should not be empty"],
  "error": "Bad Request"
}
```

**Assertions**:
- Status code: 400
- Validation error message present
- Stripe **NOT** called

---

### ❌ Test: validation error - missing amount

**HTTP Request**:
```http
POST /api/payment/process
Content-Type: application/json

{
  "orderId": "order-123",
  // amount missing
  "currency": "vnd"
}
```

**Expected Response** (400 Bad Request):
```json
{
  "statusCode": 400,
  "message": ["amount should not be empty", "amount must be a number"],
  "error": "Bad Request"
}
```

---

### ❌ Test: validation error - invalid amount (negative)

**HTTP Request**:
```http
POST /api/payment/process
Content-Type: application/json

{
  "orderId": "order-123",
  "amount": -1000,
  "currency": "vnd"
}
```

**Expected Response** (400 Bad Request):
```json
{
  "statusCode": 400,
  "message": ["amount must be a positive number"],
  "error": "Bad Request"
}
```

---

### ❌ Test: validation error - invalid currency

**HTTP Request**:
```http
POST /api/payment/process
Content-Type: application/json

{
  "orderId": "order-123",
  "amount": 50000,
  "currency": "INVALID"
}
```

**Expected Response** (400 Bad Request):
```json
{
  "statusCode": 400,
  "message": ["currency must be one of: vnd, usd"],
  "error": "Bad Request"
}
```

---

### ✅ Test: handles empty string phone number gracefully

**HTTP Request**:
```http
POST /api/payment/process
Content-Type: application/json

{
  "orderId": "order-empty-phone",
  "amount": 50000,
  "currency": "vnd",
  "customerEmail": "test@example.com",
  "customerPhone": ""  // empty string
}
```

**Expected Behavior**:
- Payment processed successfully
- SMS **NOT** sent (empty phone)
- Email sent normally
- No error

**Assertions**:
- Status code: 201
- Twilio **NOT** called
- Resend called

---

### ✅ Test: handles whitespace phone number gracefully

**HTTP Request**:
```http
POST /api/payment/process
Content-Type: application/json

{
  "orderId": "order-whitespace-phone",
  "amount": 50000,
  "currency": "vnd",
  "customerEmail": "test@example.com",
  "customerPhone": "   "  // whitespace only
}
```

**Expected Behavior**: Same as empty string

---

## Database Integration

### Payment Collection Schema
```typescript
{
  orderId: string;
  paymentIntentId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'succeeded' | 'failed';
  customerEmail?: string;
  customerPhone?: string;
  createdAt: Date;
  paidAt?: Date;
  failedAt?: Date;
}
```

### Database Operations Tested
1. **Create Payment**: Insert payment record với status 'pending'
2. **Query Payment**: Find payment by orderId
3. **Update Payment**: Update status via webhook (tested in unit tests)

---

## External Service Integration

### 1. Stripe Integration
- **Service**: Payment Intent Creation
- **Mock**: `stripe.paymentIntents.create`
- **Real Behavior**: Would create actual payment intent
- **Test Behavior**: Returns mock payment intent ID và client secret

### 2. Resend Email Integration
- **Service**: Email notifications
- **Mock**: `resend.emails.send`
- **Real Behavior**: Would send actual email
- **Test Behavior**: Returns mock email ID

### 3. Twilio SMS Integration
- **Service**: SMS notifications
- **Mock**: `twilio.messages.create`
- **Real Behavior**: Would send actual SMS
- **Test Behavior**: Returns mock SMS SID

---

## Test Statistics

| Test Category | Total Tests | ✅ Pass | ❌ Validation Errors |
|---------------|-------------|---------|---------------------|
| Success Cases | 5 | 5 | 0 |
| Validation Errors | 4 | 0 | 4 |
| **TOTAL** | **9** | **5** | **4** |

---

## Running Integration Tests

### Local Testing
```bash
cd backend/payment-service

# Run all E2E tests
npm run test:e2e

# Run with coverage
npm run test:e2e -- --coverage

# Watch mode
npm run test:e2e -- --watch
```

### Environment Variables Required
```env
# These are set programmatically in test
MONGO_URI=<generated-by-mongodb-memory-server>
STRIPE_SECRET_KEY=<mocked>
TWILIO_ACCOUNT_SID=<mocked>
TWILIO_AUTH_TOKEN=<mocked>
TWILIO_PHONE_NUMBER=<mocked>
RESEND_API_KEY=<mocked>
```

---

## Key Integration Test Patterns

### 1. In-Memory Database
- MongoDB Memory Server for isolated tests
- Real database operations, isolated data
- Clean state for each test

### 2. External Service Mocking
- Mock at module level before app initialization
- Prevent real API calls
- Verify mock functions called correctly

### 3. HTTP Request Testing
- Use Supertest for HTTP requests
- Test complete request/response cycle
- Verify status codes và response bodies

### 4. Optional Field Handling
- Email và phone are optional
- Empty strings treated as missing
- Whitespace-only strings treated as missing
- Services skip notification when field missing

### 5. Validation Testing
- DTO validation via class-validator
- Test missing required fields
- Test invalid values (negative, wrong format)
- Test enum validation (currency)

---

## Cleanup

```typescript
afterAll(async () => {
  await app.close();
  await mongoose.disconnect();
  if (mongo) {
    await mongo.stop();
  }
});
```

**Cleanup Steps**:
1. Close NestJS application
2. Disconnect from MongoDB
3. Stop MongoDB Memory Server
4. Prevent memory leaks

---

## Integration vs Unit Testing

| Aspect | Unit Tests | Integration Tests |
|--------|-----------|-------------------|
| Database | Mocked | Real (in-memory) |
| External APIs | Mocked | Mocked |
| HTTP Requests | Controller called directly | Full HTTP stack via Supertest |
| Validation | Tested at service level | Tested at HTTP level |
| Speed | Fast (~ms) | Slower (~seconds) |
| Scope | Single function | End-to-end flow |

---

## Common Integration Test Issues

### Issue 1: Port Already in Use
```bash
# Solution: Kill process using port
lsof -ti:5004 | xargs kill -9
```

### Issue 2: MongoDB Memory Server Timeout
```bash
# Solution: Increase timeout
jest.setTimeout(30000);
```

### Issue 3: Mock Not Applied
```bash
# Solution: Ensure mock before app initialization
jest.mock('stripe', ...);
// THEN
const moduleFixture = await Test.createTestingModule(...);
```

### Issue 4: Database Not Cleaned
```bash
# Solution: Use beforeEach/afterEach
afterEach(async () => {
  await mongoose.connection.db.dropDatabase();
});
```
