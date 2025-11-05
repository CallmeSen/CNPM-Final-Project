# Testing Documentation Index

## Overview
Comprehensive testing documentation for the Food Delivery Microservices Platform. This documentation covers unit tests and integration tests for all backend services.

---

## Documentation Structure

```
docs/testing/
├── unit-tests/
│   ├── auth-service-unit-tests.md
│   ├── delivery-management-unit-tests.md
│   ├── order-service-unit-tests.md
│   ├── payment-service-unit-tests.md
│   └── restaurant-service-unit-tests.md
└── integration-tests/
    ├── auth-service-integration-tests.md
    ├── delivery-service-integration-tests.md
    ├── order-service-integration-tests.md
    ├── payment-service-integration-tests.md
    └── restaurant-service-integration-tests.md
```

---

## Unit Tests Documentation

### Auth Service (152 Test Cases)
**File**: `unit-tests/auth-service-unit-tests.md`

**Coverage**:
- Customer authentication (register, login, profile)
- Restaurant authentication (register, login, profile)
- SuperAdmin authentication (register, login, profile)
- JWT token generation and validation
- Password hashing and comparison
- DTO validation (CreateCustomerDto, LoginDto, etc.)
- JWT Guard authorization
- JWT Strategy token extraction

**Key Test Suites**:
- AuthService: 8 test suites, 87 test cases
- DTOs: 3 test suites, 30 test cases
- Guards: 2 test suites, 20 test cases
- Strategies: 1 test suite, 15 test cases

---

### Order Service (107 Test Cases)
**File**: `unit-tests/order-service-unit-tests.md`

**Coverage**:
- Order creation with price calculation
- Order retrieval with role-based filtering (customer, restaurant, superadmin)
- Order status updates and lifecycle management
- Order cancellation logic
- Review/rating system
- WebSocket notifications via OrdersGateway
- Authorization checks for each role

**Key Test Suites**:
- OrdersService: 8 test suites, 62 test cases
- OrdersController: 7 test suites, 45 test cases

**Special Features**:
- Total price calculation tests
- Status transition validation (Pending → Preparing → Ready → Delivered)
- RBAC tests for customer, restaurant, superadmin roles
- WebSocket event emission tests

---

### Payment Service (70+ Test Cases)
**File**: `unit-tests/payment-service-unit-tests.md`

**Coverage**:
- Payment intent creation with Stripe
- Payment queries (by order ID, by payment intent ID)
- Payment status updates
- Refund processing (full and partial)
- Webhook signature verification
- SMS notifications via Twilio
- Email notifications
- Payment failure handling

**Key Test Suites**:
- PaymentService: 6 test suites
- StripeService: 3 test suites
- TwilioService: 2 test suites
- EmailService: 2 test suites
- WebhookController: 4 test suites

**External Service Mocks**:
- Stripe SDK (paymentIntents, refunds, webhooks)
- Twilio client (messages)
- Nodemailer (sendMail)

---

### Restaurant Service (80+ Test Cases)
**File**: `unit-tests/restaurant-service-unit-tests.md`

**Coverage**:
- Restaurant profile management (CRUD)
- Restaurant availability toggle
- Food item management (CRUD)
- File upload handling (multer)
- HTTP integration with auth-service
- Authorization checks (restaurant can only edit own data)
- SuperAdmin operations
- Statistics and reporting

**Key Test Suites**:
- RestaurantsService: 7 test suites
- FoodItemsService: 7 test suites
- SuperAdminService: 3 test suites
- ReportsService: 2 test suites

**Special Features**:
- Axios mock for auth-service calls
- Multer file mock for image uploads
- Data sanitization tests (password exclusion)

---

### Delivery Management Service (89 Test Cases)
**File**: `unit-tests/delivery-management-unit-tests.md`

**Coverage**:
- Delivery personnel CRUD operations
- Delivery assignment logic
- Geospatial queries (nearby drivers, route calculation)
- Real-time location tracking
- Status management (available, busy, offline)
- Statistics and analytics
- Socket.IO event handling

**Key Test Suites**:
- DeliveryManagementService: 11 test suites, 89 test cases

**Geospatial Features**:
- 2dsphere index tests
- Distance calculation (Haversine formula)
- Polygon area queries
- Nearest driver search

---

## Integration Tests Documentation

### Auth Service (68 Test Scenarios)
**File**: `integration-tests/auth-service-integration-tests.md`

**Real Integrations**:
- MongoDB database operations
- JWT token signing and verification
- bcrypt password hashing
- File upload to local filesystem/S3
- Email service (Gmail/SendGrid)

**Test Categories**:
- Customer registration and login flow
- Restaurant registration and login flow
- SuperAdmin authentication
- Token refresh mechanism
- Password reset flow
- File upload security
- Database transactions

---

### Order Service (50+ Test Scenarios)
**File**: `integration-tests/order-service-integration-tests.md`

**Real Integrations**:
- MongoDB with real database
- WebSocket server (Socket.IO)
- Payment service HTTP API
- Restaurant service HTTP API
- Auth service HTTP API

**Test Categories**:
- End-to-end order creation
- Order status lifecycle
- WebSocket real-time notifications
- Role-based access control (customer, restaurant, superadmin)
- Payment integration (order → payment intent)
- Order cancellation with refunds
- Concurrent order processing

**Performance Tests**:
- 100 concurrent order creations
- WebSocket broadcasts to 1000 clients

---

### Payment Service (60+ Test Scenarios)
**File**: `integration-tests/payment-service-integration-tests.md`

**Real Integrations**:
- Stripe test mode (test API keys)
- Twilio sandbox (test SMS)
- Email service (test inbox)
- MongoDB database
- Order service HTTP API

**Test Categories**:
- Payment intent creation flow
- Stripe webhook event handling (payment_intent.succeeded, payment_intent.payment_failed)
- Webhook signature verification
- Refund processing
- SMS and email notifications
- Idempotency (duplicate webhook handling)
- Multi-currency payments
- Test card scenarios (success, declined, 3DS)

**Security Tests**:
- Invalid webhook signature rejection
- Authorization checks
- Payment amount validation

---

### Restaurant Service (50+ Test Scenarios)
**File**: `integration-tests/restaurant-service-integration-tests.md`

**Real Integrations**:
- MongoDB database
- Multer file uploads to disk
- Auth service HTTP API
- Order service HTTP API

**Test Categories**:
- Restaurant profile CRUD
- Food item CRUD with image uploads
- SuperAdmin operations
- File upload security (malicious files, size limits)
- Static file serving
- Cross-service authentication (auth-service integration)
- Authorization (restaurant can only edit own data)

**File Upload Tests**:
- Image validation (file type, size)
- Path traversal prevention
- Image optimization
- Concurrent uploads

---

### Delivery Service (40+ Test Scenarios)
**File**: `integration-tests/delivery-service-integration-tests.md`

**Real Integrations**:
- MongoDB with geospatial indexes
- Socket.IO server and clients
- Order service HTTP API
- Real-time GPS tracking

**Test Categories**:
- Delivery personnel management
- Geospatial queries (nearby drivers, polygon zones)
- Automatic driver assignment (nearest available)
- Real-time location updates via Socket.IO
- Delivery status lifecycle
- Distance and time estimation
- Driver statistics and analytics

**Geospatial Tests**:
- 2dsphere index creation
- Nearby driver search (radius queries)
- Polygon area queries
- Distance calculations (Haversine)
- Route optimization

**Real-Time Tests**:
- Socket.IO connection and authentication
- Live location broadcast
- Delivery status notifications
- 1000 concurrent Socket.IO clients

---

## Test Execution

### Unit Tests
```bash
# Run all unit tests
npm test

# Run specific service
cd backend/auth-service && npm test
cd backend/order-service && npm test
cd backend/payment-service && npm test
cd backend/restaurant-service && npm test
cd backend/delivery-service/backend && npm test

# With coverage
npm test -- --coverage

# Watch mode
npm test -- --watch
```

### Integration Tests
```bash
# Start test environment
docker-compose -f docker-compose.test.yml up -d

# Run e2e tests
npm run test:e2e

# Specific service
cd backend/auth-service && npm run test:e2e
cd backend/order-service && npm run test:e2e
cd backend/payment-service && npm run test:e2e
cd backend/restaurant-service && npm run test:e2e
cd backend/delivery-service/backend && npm run test:e2e

# Cleanup
docker-compose -f docker-compose.test.yml down -v
```

---

## Coverage Targets

| Service | Unit Test Target | Integration Test Target |
|---------|-----------------|------------------------|
| Auth Service | 90% | 85% |
| Order Service | 85% | 90% |
| Payment Service | 85% | 90% |
| Restaurant Service | 85% | 90% |
| Delivery Service | 90% | 85% |

---

## Test Statistics Summary

### Total Test Cases

| Service | Unit Tests | Integration Tests | Total |
|---------|-----------|------------------|-------|
| Auth Service | 152 | 68 | 220 |
| Order Service | 107 | 50+ | 157+ |
| Payment Service | 70+ | 60+ | 130+ |
| Restaurant Service | 80+ | 50+ | 130+ |
| Delivery Service | 89 | 40+ | 129+ |
| **TOTAL** | **498+** | **268+** | **766+** |

---

## Key Testing Patterns

### 1. Mock Strategy
- **Unit Tests**: Mock all external dependencies (database, HTTP clients, external APIs)
- **Integration Tests**: Use real services (test databases, test API keys)

### 2. Database Handling
- **Unit Tests**: Mock Mongoose models
- **Integration Tests**: Real MongoDB with transaction support

### 3. External Services
- **Stripe**: Test mode with test cards
- **Twilio**: Sandbox mode with test credentials
- **Email**: Test inbox or mock SMTP

### 4. Authentication
- **Unit Tests**: Mock JWT strategy and guards
- **Integration Tests**: Real JWT signing and verification

### 5. Real-Time Communication
- **Unit Tests**: Mock Socket.IO emit/broadcast
- **Integration Tests**: Real Socket.IO server and clients

### 6. File Uploads
- **Unit Tests**: Mock multer files
- **Integration Tests**: Real file uploads with cleanup

---

## Best Practices

1. **Isolation**: Each test is independent, no shared state
2. **Cleanup**: Always clean up resources (files, database, connections)
3. **Deterministic**: Tests produce same results every run
4. **Fast**: Unit tests complete in seconds, integration tests in minutes
5. **Descriptive**: Test names clearly describe what is tested
6. **Comprehensive**: Cover happy paths, error cases, edge cases
7. **Maintainable**: Keep tests simple, avoid complex setup

---

## Contributing to Tests

When adding new features:

1. Write unit tests first (TDD approach)
2. Ensure unit test coverage ≥ 85%
3. Write integration tests for critical paths
4. Update this documentation
5. Run full test suite before committing

---

## Related Documentation

- [Backend Architecture](../architecture/backend-microservices.md)
- [API Documentation](../api/)
- [Deployment Guide](../deployment/)
- [Development Setup](../../README.md)

---

**Last Updated**: 2024-01-15
**Maintained By**: Development Team
