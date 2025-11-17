# Order Service - Integration Tests

## Overview
Integration tests for Order Service with real MongoDB database, WebSocket connections, and HTTP API integration with Payment/Restaurant/Auth services.

---

## Environment Setup

### Test Database Configuration
```typescript
const testConfig = {
  mongoUri: process.env.MONGO_TEST_URI || 'mongodb://localhost:27017/order-service-test',
  jwtSecret: process.env.JWT_SECRET_TEST || 'test-jwt-secret',
  paymentServiceUrl: 'http://localhost:5004',
  restaurantServiceUrl: 'http://localhost:5002',
  authServiceUrl: 'http://localhost:5001',
};
```

### Database Lifecycle
- **Before All**: Connect to test database, seed required data
- **Before Each**: Clear orders collection
- **After Each**: Rollback transactions
- **After All**: Drop test database, close connections

---

## API Endpoint Integration Tests

### Test Suite: POST /api/orders

#### ✅ Test: Customer creates order successfully
**Purpose**: End-to-end order creation flow

**Setup**:
1. Create test customer via auth-service
2. Create test restaurant via restaurant-service
3. Create food items in restaurant
4. Login as customer, get JWT token

**Test Steps**:
```typescript
1. POST /api/orders
   Headers: { Authorization: 'Bearer <customer_token>' }
   Body: {
     restaurantId: 'RESTAURANT123',
     items: [
       { foodItemId: 'FOOD1', quantity: 2 },
       { foodItemId: 'FOOD2', quantity: 1 }
     ],
     deliveryAddress: '123 Main St, New York, NY'
   }

2. Verify response status: 201
3. Verify order document in database
4. Verify total price calculation
5. Verify payment intent created (check payment-service)
6. Verify WebSocket notification sent
```

**Expected Response**:
```typescript
{
  orderId: 'ORDER123',
  restaurantId: 'RESTAURANT123',
  customerId: 'CUSTOMER123',
  items: [
    { foodItemId: 'FOOD1', name: 'Pizza', quantity: 2, price: 12.99 },
    { foodItemId: 'FOOD2', name: 'Pasta', quantity: 1, price: 9.99 }
  ],
  totalPrice: 35.97,
  status: 'Pending',
  deliveryAddress: '123 Main St, New York, NY',
  createdAt: '2024-01-15T10:00:00Z'
}
```

**Database Assertions**:
```typescript
const dbOrder = await Order.findById('ORDER123');
expect(dbOrder).toBeDefined();
expect(dbOrder.status).toBe('Pending');
expect(dbOrder.totalPrice).toBe(35.97);
expect(dbOrder.items).toHaveLength(2);
```

**External Service Verification**:
```typescript
// Payment service called
const payment = await Payment.findOne({ orderId: 'ORDER123' });
expect(payment.status).toBe('Pending');

// WebSocket event emitted
expect(mockWebSocket.emit).toHaveBeenCalledWith('orderStatusUpdate', {
  orderId: 'ORDER123',
  status: 'Pending'
});
```

---

#### ❌ Test: Creates order with invalid restaurant ID
**Expected Status**: 404 Not Found

**Expected Error**:
```json
{
  "statusCode": 404,
  "message": "Restaurant not found"
}
```

---

#### ❌ Test: Creates order with invalid food item
**Setup**: Food item doesn't exist or doesn't belong to restaurant

**Expected Status**: 400 Bad Request

---

#### ❌ Test: Creates order without authentication
**Setup**: No JWT token in header

**Expected Status**: 401 Unauthorized

---

### Test Suite: GET /api/orders

#### ✅ Test: Customer fetches own orders
**Purpose**: Customer order history

**Setup**:
1. Create 3 orders for customer
2. Create 2 orders for different customer
3. Login as first customer

**Test Steps**:
```typescript
GET /api/orders
Headers: { Authorization: 'Bearer <customer_token>' }
```

**Expected Result**: Only 3 orders returned (own orders)

**Assertions**:
```typescript
expect(response.status).toBe(200);
expect(response.body.orders).toHaveLength(3);
response.body.orders.forEach(order => {
  expect(order.customerId).toBe('CUSTOMER123');
});
```

---

#### ✅ Test: Restaurant fetches own orders
**Setup**:
1. Create 5 orders for restaurant A
2. Create 3 orders for restaurant B
3. Login as restaurant A

**Expected Result**: Only 5 orders returned

**Assertions**:
```typescript
response.body.orders.forEach(order => {
  expect(order.restaurantId).toBe('RESTAURANT_A');
});
```

---

#### ✅ Test: SuperAdmin fetches all orders
**Setup**:
1. Create orders for multiple restaurants/customers
2. Login as superadmin

**Expected Result**: All orders returned regardless of restaurant/customer

---

### Test Suite: GET /api/orders/:id

#### ✅ Test: Customer fetches own order details
**Setup**:
1. Create order for customer
2. Login as customer

**Expected**: Full order details returned

---

#### ❌ Test: Customer attempts to fetch another customer's order
**Setup**:
1. Create order for customer A
2. Login as customer B
3. Attempt to fetch customer A's order

**Expected Status**: 403 Forbidden

**Expected Error**:
```json
{
  "statusCode": 403,
  "message": "You are not authorized to view this order"
}
```

---

#### ✅ Test: Restaurant fetches order for own restaurant
**Expected**: Order details returned

---

#### ❌ Test: Restaurant attempts to fetch order from different restaurant
**Expected Status**: 403 Forbidden

---

### Test Suite: PATCH /api/orders/:id/status

#### ✅ Test: Restaurant updates order status to 'Preparing'
**Purpose**: Order lifecycle management

**Setup**:
1. Create order with status 'Pending'
2. Login as restaurant

**Test Steps**:
```typescript
PATCH /api/orders/ORDER123/status
Headers: { Authorization: 'Bearer <restaurant_token>' }
Body: { status: 'Preparing' }
```

**Expected Flow**:
1. Order status updated in database
2. WebSocket notification sent
3. Customer receives real-time update

**Database Verification**:
```typescript
const order = await Order.findById('ORDER123');
expect(order.status).toBe('Preparing');
expect(order.updatedAt).toBeGreaterThan(order.createdAt);
```

**WebSocket Verification**:
```typescript
// Listen for WebSocket event
const socketClient = io('http://localhost:5005');
const eventReceived = new Promise(resolve => {
  socketClient.on('orderStatusUpdate', resolve);
});

// Make PATCH request
await request(app).patch('/api/orders/ORDER123/status')...

// Verify event
const event = await eventReceived;
expect(event.orderId).toBe('ORDER123');
expect(event.status).toBe('Preparing');
```

---

#### ✅ Test: Valid status transitions
**Test Cases**:
```typescript
Pending → Preparing ✓
Preparing → Ready ✓
Ready → Delivered ✓
Pending → Cancelled ✓

// Invalid transitions
Delivered → Preparing ✗ (400 Bad Request)
Cancelled → Preparing ✗ (400 Bad Request)
```

---

#### ❌ Test: Customer attempts to update order status
**Setup**: Login as customer

**Expected Status**: 403 Forbidden (only restaurant/superadmin can update)

---

### Test Suite: POST /api/orders/:id/cancel

#### ✅ Test: Customer cancels pending order
**Setup**:
1. Create order with status 'Pending'
2. Login as customer

**Expected Flow**:
1. Order status set to 'Cancelled'
2. Payment refunded (if paid)
3. WebSocket notification sent

**Payment Refund Verification**:
```typescript
const payment = await Payment.findOne({ orderId: 'ORDER123' });
if (payment.status === 'Paid') {
  // Verify refund initiated in Stripe
  const refunds = await stripe.refunds.list({
    payment_intent: payment.stripePaymentIntentId
  });
  expect(refunds.data).toHaveLength(1);
  expect(refunds.data[0].status).toBe('succeeded');
}
```

---

#### ❌ Test: Customer attempts to cancel delivered order
**Setup**: Order status = 'Delivered'

**Expected Status**: 400 Bad Request

**Expected Error**: "Cannot cancel delivered orders"

---

### Test Suite: POST /api/orders/:id/review

#### ✅ Test: Customer adds review to completed order
**Purpose**: Order rating and feedback

**Setup**:
1. Create order with status 'Delivered'
2. Login as customer

**Test Steps**:
```typescript
POST /api/orders/ORDER123/review
Body: {
  rating: 5,
  comment: 'Excellent food and fast delivery!'
}
```

**Expected Response**:
```typescript
{
  orderId: 'ORDER123',
  review: {
    rating: 5,
    comment: 'Excellent food and fast delivery!',
    createdAt: '2024-01-15T11:00:00Z'
  }
}
```

**Database Verification**:
```typescript
const order = await Order.findById('ORDER123');
expect(order.review).toBeDefined();
expect(order.review.rating).toBe(5);
expect(order.review.comment).toBe('Excellent food and fast delivery!');
```

---

#### ❌ Test: Customer adds review to pending order
**Setup**: Order not yet delivered

**Expected Status**: 400 Bad Request

**Expected Error**: "Can only review delivered orders"

---

#### ❌ Test: Customer adds duplicate review
**Setup**: Order already has review

**Expected Status**: 400 Bad Request

**Expected Error**: "Order already reviewed"

---

## WebSocket Integration Tests

### Test Suite: OrdersGateway - orderStatusUpdate

#### ✅ Test: WebSocket client receives real-time status updates
**Purpose**: Real-time notification system

**Setup**:
1. Create order
2. Connect WebSocket client
3. Subscribe to order updates

**Test Steps**:
```typescript
// Connect WebSocket
const socket = io('http://localhost:5005', {
  auth: { token: customerToken }
});

// Listen for events
const updates = [];
socket.on('orderStatusUpdate', (data) => {
  updates.push(data);
});

// Trigger status updates via API
await updateOrderStatus('ORDER123', 'Preparing');
await updateOrderStatus('ORDER123', 'Ready');
await updateOrderStatus('ORDER123', 'Delivered');

// Wait for events
await delay(1000);

// Verify
expect(updates).toHaveLength(3);
expect(updates[0].status).toBe('Preparing');
expect(updates[1].status).toBe('Ready');
expect(updates[2].status).toBe('Delivered');
```

---

#### ✅ Test: Only authorized users receive order updates
**Setup**:
1. Customer A creates order
2. Customer B connects to WebSocket
3. Update order status

**Expected**: Customer B does NOT receive update (not their order)

**Assertions**:
```typescript
// Customer A receives update
expect(customerASocket.events).toContain('orderStatusUpdate');

// Customer B does NOT receive update
expect(customerBSocket.events).not.toContain('orderStatusUpdate');
```

---

### Test Suite: OrdersGateway - Authentication

#### ✅ Test: WebSocket connection with valid JWT
**Expected**: Connection established

---

#### ❌ Test: WebSocket connection without token
**Expected**: Connection rejected with 401

---

#### ❌ Test: WebSocket connection with expired token
**Expected**: Connection rejected

---

## Microservice Integration Tests

### Test Suite: Integration with Payment Service

#### ✅ Test: Order creation triggers payment intent
**Purpose**: Verify order-payment service integration

**Test Steps**:
1. Create order via POST /api/orders
2. Verify payment intent created in payment-service
3. Verify payment document linked to order

**Assertions**:
```typescript
// Order service
const order = await Order.findById('ORDER123');
expect(order.paymentIntentId).toBeDefined();

// Payment service (via HTTP API)
const response = await axios.get(
  `http://localhost:5004/api/payment/order/${order._id}`
);
expect(response.data.payment.stripePaymentIntentId).toBe(order.paymentIntentId);
expect(response.data.payment.amount).toBe(order.totalPrice * 100); // cents
```

---

#### ✅ Test: Order cancellation triggers refund
**Test Steps**:
1. Create and pay for order
2. Cancel order
3. Verify refund initiated in payment-service

---

### Test Suite: Integration with Restaurant Service

#### ✅ Test: Order creation validates restaurant exists
**Purpose**: Cross-service validation

**Test Steps**:
1. Attempt to create order with non-existent restaurant ID
2. Verify order-service calls restaurant-service API
3. Verify 404 error returned

**HTTP Call Verification**:
```typescript
// Mock or spy on axios
const spy = jest.spyOn(axios, 'get');

await createOrder({ restaurantId: 'INVALID' });

expect(spy).toHaveBeenCalledWith(
  'http://localhost:5002/api/restaurants/INVALID'
);
```

---

#### ✅ Test: Order creation validates food items exist
**Test Steps**:
1. Create order with invalid food item ID
2. Verify restaurant-service called to validate items
3. Verify 400 error returned

---

## Performance & Concurrency Tests

### Test Suite: High Load Scenarios

#### ✅ Test: Multiple concurrent order creations
**Purpose**: Test database transaction handling

**Test Steps**:
```typescript
const promises = Array.from({ length: 100 }, (_, i) =>
  createOrder({
    restaurantId: 'RESTAURANT123',
    customerId: `CUSTOMER${i}`,
    items: [{ foodItemId: 'FOOD1', quantity: 1 }]
  })
);

const results = await Promise.all(promises);

// Verify all orders created
expect(results).toHaveLength(100);
results.forEach(result => {
  expect(result.status).toBe(201);
});

// Verify database consistency
const orders = await Order.find({ restaurantId: 'RESTAURANT123' });
expect(orders).toHaveLength(100);
```

---

#### ✅ Test: WebSocket broadcasts under high load
**Setup**: 1000 connected clients

**Test Steps**:
1. Connect 1000 WebSocket clients
2. Update order status
3. Verify all clients receive notification within acceptable time

**Performance Metrics**:
```typescript
const startTime = Date.now();
// ... update status ...
const endTime = Date.now();

expect(endTime - startTime).toBeLessThan(5000); // 5 seconds max
```

---

## Data Consistency Tests

### Test Suite: Transaction Rollback

#### ✅ Test: Order creation rollback on payment failure
**Purpose**: Ensure ACID properties

**Test Steps**:
1. Mock payment-service to return error
2. Attempt to create order
3. Verify order NOT saved in database
4. Verify database state unchanged

**Assertions**:
```typescript
const ordersBefore = await Order.countDocuments();

try {
  await createOrder({ ... });
} catch (error) {
  expect(error.message).toContain('Payment failed');
}

const ordersAfter = await Order.countDocuments();
expect(ordersAfter).toBe(ordersBefore);
```

---

## Testing Utilities

### Helper Functions
```typescript
// Create test customer
async function createTestCustomer(): Promise<string> {
  const response = await axios.post(
    'http://localhost:5001/api/auth/customer/register',
    { email: 'test@example.com', password: 'password123' }
  );
  return response.data.customerId;
}

// Create test order
async function createTestOrder(overrides = {}): Promise<Order> {
  const order = await request(app)
    .post('/api/orders')
    .set('Authorization', `Bearer ${customerToken}`)
    .send({ restaurantId: 'TEST', items: [], ...overrides });
  return order.body;
}

// WebSocket test helper
async function connectWebSocket(token: string): Promise<Socket> {
  return io('http://localhost:5005', {
    auth: { token },
    transports: ['websocket']
  });
}
```

---

## Running Integration Tests

```bash
# Start test databases
docker-compose -f docker-compose.test.yml up -d

# Run all integration tests
cd backend/order-service
npm run test:e2e

# Run specific test file
npm run test:e2e -- orders.e2e-spec.ts

# With coverage
npm run test:e2e:cov

# Cleanup
docker-compose -f docker-compose.test.yml down -v
```

---

## Test Coverage Targets

| Category | Target |
|----------|--------|
| API Endpoints | 95% |
| WebSocket Events | 90% |
| Service Integration | 85% |
| Error Handling | 100% |

---

## Best Practices

1. **Isolation**: Each test creates fresh data, never shares state
2. **Real Database**: Use actual MongoDB, not in-memory DB
3. **External Services**: Run all dependent microservices in Docker
4. **WebSocket Testing**: Test both emit and broadcast scenarios
5. **Authentication**: Test all role-based access control paths
6. **Concurrency**: Test race conditions and parallel requests
7. **Cleanup**: Always drop test database after tests complete
