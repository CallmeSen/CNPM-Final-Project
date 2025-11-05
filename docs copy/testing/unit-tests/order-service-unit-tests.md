# Order Service - Unit Tests

## Overview
Unit tests for Order Service focusing on order management, status updates, and WebSocket notifications with mocked dependencies.

---

## OrdersService Unit Tests

### Test Suite: create

#### ✅ Test: Calculates total and persists order
**Purpose**: Verify order creation with automatic total calculation

**Setup**:
- Mock OrderModel constructor
- Mock save() method

**Test Steps**:
1. Call `create(dto)` with order items
2. Verify total price calculated: (2 × $5) + (1 × $10) = $20
3. Verify orderId generated with pattern `ORDER-{timestamp}`
4. Verify save() called

**Input DTO**:
```typescript
{
  customerId: 'customer-1',
  restaurantId: 'restaurant-1',
  deliveryAddress: '123 Street',
  items: [
    { quantity: 2, price: 5 },
    { quantity: 1, price: 10 }
  ]
}
```

**Expected Result**:
```typescript
{
  _id: 'order-id',
  orderId: 'ORDER-1730800000000',
  customerId: 'customer-1',
  restaurantId: 'restaurant-1',
  items: [...],
  totalPrice: 20,
  status: 'Pending',
  deliveryAddress: '123 Street'
}
```

**Assertions**:
- OrderModel constructor called with totalPrice = 20
- orderId matches pattern `/^ORDER-\d+$/`
- save() called on document
- Document returned

---

### Test Suite: findAll

#### ✅ Test: Returns all orders for super admin
**Purpose**: SuperAdmin can view all orders without filtering

**Setup**:
- Mock orderModel.find() returns all orders
- User role = 'superAdmin'

**Test Steps**:
1. Call `findAll({ id: 'admin', role: 'superAdmin' })`
2. Verify find() called with no filters

**Expected Behavior**: No filter applied to query

**Assertions**:
- `orderModel.find()` called without parameters
- All orders returned

---

#### ✅ Test: Filters by restaurant for restaurant users
**Purpose**: Restaurant owners see only their orders

**Setup**:
- Mock orderModel.find() with filter
- User role = 'restaurant'

**Test Steps**:
1. Call `findAll({ id: 'restaurant-1', role: 'restaurant' })`
2. Verify filter applied

**Expected Filter**:
```typescript
{ restaurantId: 'restaurant-1' }
```

**Assertions**:
- find() called with restaurantId filter
- Only restaurant's orders returned

---

#### ✅ Test: Filters by customer for regular users
**Purpose**: Customers see only their own orders

**Setup**:
- Mock orderModel.find() with filter
- User role = 'customer'

**Expected Filter**:
```typescript
{ customerId: 'customer-1' }
```

**Assertions**:
- find() called with customerId filter
- Only customer's orders returned

---

### Test Suite: findOne

#### ✅ Test: Returns order when found
**Purpose**: Fetch single order by ID

**Setup**:
- Mock findById() returns order document

**Expected Result**: Order object

**Assertions**:
- `findById` called with correct ID
- Order returned

---

#### ❌ Test: Throws when order not found
**Setup**:
- Mock findById() returns null

**Expected Error**: `NotFoundException: 'Order not found'`

---

### Test Suite: updateStatus

#### ✅ Test: Updates status and broadcasts via WebSocket
**Purpose**: Real-time order status updates

**Setup**:
- Mock findById() returns order
- Mock save() persists changes
- Mock OrdersGateway.broadcastOrderUpdate()

**Test Steps**:
1. Call `updateStatus(orderId, { status: 'Confirmed' })`
2. Verify status updated on document
3. Verify save() called
4. Verify WebSocket broadcast

**Expected Flow**:
```
1. Load order
2. Update status field
3. Save document
4. Broadcast to connected clients
```

**Assertions**:
- Order status changed to 'Confirmed'
- save() called once
- `broadcastOrderUpdate` called with order data

---

#### ❌ Test: Throws when order not found
**Expected Error**: `NotFoundException`

---

### Test Suite: remove

#### ✅ Test: Deletes order
**Purpose**: Order deletion

**Setup**:
- Mock findById() returns order
- Mock deleteOne() removes document

**Expected Result**:
```typescript
{
  message: 'Order deleted successfully'
}
```

**Assertions**:
- findById() and deleteOne() called
- Success message returned

---

#### ❌ Test: Throws when order not found
**Expected Error**: `NotFoundException`

---

### Test Suite: validateOrderOwnership

#### ✅ Test: Allows customer to access their own order
**Purpose**: Authorization check

**Test Steps**:
1. Load order with customerId = 'customer-1'
2. Check access for user { id: 'customer-1', role: 'customer' }
3. Verify access granted

**Expected**: No exception thrown

---

#### ❌ Test: Denies customer access to others' orders
**Purpose**: Prevent unauthorized access

**Test Steps**:
1. Load order with customerId = 'customer-1'
2. Check access for user { id: 'customer-2', role: 'customer' }

**Expected Error**: `ForbiddenException: 'Access denied'`

---

#### ✅ Test: Allows restaurant to access their orders
**Test Steps**:
1. Load order with restaurantId = 'restaurant-1'
2. Check access for user { id: 'restaurant-1', role: 'restaurant' }

**Expected**: Access granted

---

#### ✅ Test: Allows super admin to access any order
**Purpose**: Admin override

**Expected**: Always grants access regardless of order ownership

---

### Test Suite: calculateTotal

#### ✅ Test: Sums item quantities × prices
**Purpose**: Accurate total calculation

**Test Cases**:
```typescript
// Test 1: Simple calculation
items = [{ quantity: 2, price: 10 }]
expected = 20

// Test 2: Multiple items
items = [
  { quantity: 2, price: 5 },
  { quantity: 1, price: 10 },
  { quantity: 3, price: 3 }
]
expected = 29

// Test 3: Decimal prices
items = [{ quantity: 2, price: 5.99 }]
expected = 11.98
```

**Assertions**:
- Calculation accurate to 2 decimal places
- Handles multiple items correctly

---

### Test Suite: generateOrderId

#### ✅ Test: Generates unique order IDs
**Purpose**: Prevent duplicate IDs

**Test Steps**:
1. Generate 100 order IDs
2. Verify all are unique
3. Verify format matches `ORDER-{timestamp}`

**Expected Format**: `ORDER-1730800000000`

**Assertions**:
- All IDs unique
- Pattern matches `/^ORDER-\d{13}$/`

---

## OrdersGateway Unit Tests

### Test Suite: WebSocket Connection

#### ✅ Test: Accepts client connections
**Purpose**: WebSocket server setup

**Test Steps**:
1. Emit 'connection' event
2. Verify client added to connections
3. Verify welcome message sent

**Expected Behavior**: Client registered and welcomed

---

#### ✅ Test: Handles client disconnections
**Purpose**: Cleanup on disconnect

**Test Steps**:
1. Connect client
2. Emit 'disconnect' event
3. Verify client removed from connections

**Assertions**:
- Client count decreases
- Resources cleaned up

---

### Test Suite: broadcastOrderUpdate

#### ✅ Test: Sends update to all connected clients
**Purpose**: Real-time order notifications

**Setup**:
- 3 connected clients

**Test Steps**:
1. Call `broadcastOrderUpdate(orderData)`
2. Verify all 3 clients receive 'orderStatusUpdate' event

**Expected Payload**:
```typescript
{
  orderId: 'ORDER-123',
  status: 'Confirmed',
  timestamp: '2025-11-05T10:00:00Z'
}
```

**Assertions**:
- Event emitted to all clients
- Payload contains order details

---

#### ✅ Test: Filters recipients by role (optional)
**Purpose**: Targeted notifications

**Setup**:
- Client A: customer-1
- Client B: restaurant-1
- Client C: admin

**Test Steps**:
1. Broadcast order for restaurant-1
2. Verify only Client B and C receive update
3. Client A (different customer) does not receive

**Expected**: Role-based filtering applied

---

## Mock Strategy

### OrderModel Mock
```typescript
orderModel = Object.assign(jest.fn(), {
  find: jest.fn(),
  findById: jest.fn(),
});

orderModel.mockImplementation((payload) => {
  const doc = createOrderDocument(payload);
  doc.save = jest.fn().mockResolvedValue(doc);
  return doc;
});
```

### OrdersGateway Mock
```typescript
const gateway: OrdersGateway = {
  broadcastOrderUpdate: jest.fn(),
} as unknown as OrdersGateway;
```

### Document Mock
```typescript
const createOrderDocument = (overrides = {}) => ({
  _id: { toString: () => 'order-id' },
  customerId: 'customer-1',
  restaurantId: 'restaurant-1',
  items: [{ quantity: 2, price: 5 }],
  totalPrice: 10,
  status: OrderStatus.Pending,
  deliveryAddress: '123 Street',
  save: jest.fn().mockResolvedValue(this),
  ...overrides,
});
```

---

## Test Coverage

| Module | Statements | Branches | Functions | Lines |
|--------|-----------|----------|-----------|-------|
| OrdersService | 85% | 70% | 90% | 85% |
| OrdersController | 95% | 80% | 100% | 95% |
| OrdersGateway | 75% | 60% | 85% | 75% |
| DTOs | 100% | 100% | 100% | 100% |

---

## Running Tests

```bash
cd backend/order-service
npm test -- orders.service.spec.ts

# With coverage
npm test -- --coverage orders

# Watch mode
npm test -- --watch orders.service
```

---

## Best Practices

1. **WebSocket Testing**: Mock socket.io events and connections
2. **Role-Based Testing**: Test all user roles (customer, restaurant, admin)
3. **Authorization**: Verify ownership checks for sensitive operations
4. **Real-time Updates**: Ensure broadcasts called after state changes
5. **Total Calculation**: Test edge cases (decimals, large numbers, zero)
6. **Order ID Generation**: Verify uniqueness and format
