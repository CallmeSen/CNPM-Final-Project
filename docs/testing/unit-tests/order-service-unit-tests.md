# Order Service - Unit Tests Documentation

> **Lưu ý**: Tài liệu này được tạo dựa trên các test case thực tế trong file `orders.service.spec.ts`

## File Test
- **Location**: `backend/order-service/src/orders/orders.service.spec.ts`
- **Test Suite**: `OrdersService`
- **Test Framework**: Jest with NestJS Testing

---

## Mock Setup

### Order Model Mock
```typescript
orderModel = Object.assign(jest.fn(), {
  find: jest.fn(),
  findById: jest.fn(),
});
```

### OrdersGateway Mock
```typescript
gateway = {
  broadcastOrderUpdate: jest.fn(),
};
```

### Test Order Document
```typescript
const createOrderDocument = (overrides = {}) => ({
  _id: { toString: () => 'order-id' },
  customerId: 'customer-1',
  restaurantId: 'restaurant-1',
  items: [
    { quantity: 2, price: 5 },
    { quantity: 1, price: 10 },
  ],
  totalPrice: 20,
  status: OrderStatus.Pending,
  deliveryAddress: '123 Street',
  save: jest.fn().mockResolvedValue(this),
  ...overrides,
});
```

---

## Test Suite: create

### ✅ Test: calculates total and persists order

**Purpose**: Verify order creation với total price calculation

**Input DTO**:
```typescript
{
  customerId: 'customer-1',
  restaurantId: 'restaurant-1',
  deliveryAddress: '123 Street',
  items: [
    { quantity: 2, price: 5 },
    { quantity: 1, price: 10 },
  ]
}
```

**Test Steps**:
1. Call `create(dto)`
2. Verify orderId được generate
3. Verify totalPrice được tính = 2*5 + 1*10 = 20
4. Verify `save()` được gọi

**Expected**:
- Order document được tạo với:
  - `orderId`: Match pattern `/^ORDER-\d+$/`
  - `totalPrice`: `20` (2*5 + 1*10)
  - All fields từ DTO

**Assertions**:
- `orderModel` constructor được gọi với correct data
- `save()` được gọi
- `totalPrice` = 20

---

## Test Suite: findAll

### ✅ Test: returns all orders for super admin

**Purpose**: Verify superAdmin sees all orders

**Test Steps**:
1. Mock `find().exec()` returns orders
2. Call `findAll({ id: 'admin', role: 'superAdmin' })`
3. Verify no filter applied

**User Context**:
```typescript
{
  id: 'admin',
  role: 'superAdmin'
}
```

**Assertions**:
- `find()` được gọi **không có filter**
- All orders returned

---

### ✅ Test: filters by restaurant for restaurant users

**Purpose**: Verify restaurant chỉ thấy own orders

**User Context**:
```typescript
{
  id: 'restaurant-1',
  role: 'restaurant'
}
```

**Expected Filter**:
```typescript
{
  restaurantId: 'restaurant-1'
}
```

**Assertions**:
- `find` được gọi với filter `{ restaurantId: 'restaurant-1' }`

---

### ✅ Test: filters by customer for regular users

**Purpose**: Verify customer chỉ thấy own orders

**User Context**:
```typescript
{
  id: 'customer-1',
  role: 'customer'
}
```

**Expected Filter**:
```typescript
{
  customerId: 'customer-1'
}
```

**Assertions**:
- `find` được gọi với filter `{ customerId: 'customer-1' }`

---

## Test Suite: findOne

### ✅ Test: returns order when found

**Test Steps**:
1. Mock `findById().exec()` returns order
2. Call `findOne('order-id')`

**Assertions**:
- `findById` được gọi với 'order-id'
- Order document returned

---

### ❌ Test: throws NotFoundException when order is missing

**Setup**: Mock `findById().exec()` returns null

**Expected**: Throws `NotFoundException`

---

## Test Suite: updateDetails

### ✅ Test: updates order items and address for owner

**Purpose**: Verify owner can update own order

**Test Steps**:
1. Mock order với `customerId: 'customer-1'`
2. Call `updateDetails` với user `{ id: 'customer-1', role: 'customer' }`
3. Verify items và address updated
4. Verify totalPrice recalculated

**Input**:
```typescript
{
  items: [
    { quantity: 1, price: 15 },
    { quantity: 2, price: 5 },
  ],
  deliveryAddress: 'New Address'
}
```

**Expected**:
- `order.items` updated to new items
- `order.totalPrice` = 1*15 + 2*5 = 25
- `order.deliveryAddress` = 'New Address'
- `save()` được gọi

---

### ✅ Test: allows super admin to update any order

**Purpose**: Verify superAdmin can update any order

**Test Steps**:
1. Mock order với `customerId: 'other'` (not superadmin)
2. Call `updateDetails` với user `{ id: 'admin', role: 'superAdmin' }`
3. Verify update succeeds

**Assertions**:
- No `ForbiddenException` thrown
- Update succeeds regardless of ownership

---

### ❌ Test: throws ForbiddenException when user does not own order

**Setup**:
- Order `customerId: 'different'`
- User `{ id: 'customer-1', role: 'customer' }`

**Expected**: Throws `ForbiddenException`

---

## Test Suite: updateStatus

### ✅ Test: updates status for restaurant owner and broadcasts update

**Purpose**: Verify status update với WebSocket broadcast

**Test Steps**:
1. Mock order với `restaurantId: 'restaurant-1'`
2. Call `updateStatus` với user `{ id: 'restaurant-1', role: 'restaurant' }`
3. Verify status updated
4. Verify WebSocket broadcast

**Input**:
```typescript
{
  status: OrderStatus.Preparing
}
```

**Expected**:
- `order.status` = `OrderStatus.Preparing`
- `save()` được gọi
- `gateway.broadcastOrderUpdate` được gọi với:
  ```typescript
  {
    orderId: 'order-id',
    status: OrderStatus.Preparing
  }
  ```

---

### ✅ Test: allows super admin to update any order status

**Purpose**: Verify superAdmin bypass ownership check

**Test Steps**:
1. Mock order với `restaurantId: 'another'`
2. Call với user `{ id: 'admin', role: 'superAdmin' }`

**Assertions**:
- Status updated successfully
- No `ForbiddenException`

---

### ❌ Test: throws ForbiddenException for customers

**Setup**:
- User role: 'customer'
- Trying to update status

**Expected**: Throws `ForbiddenException` (only restaurant/superAdmin can update status)

---

### ❌ Test: throws ForbiddenException when restaurant tries to update another restaurant order

**Setup**:
- Order `restaurantId: 'other-restaurant'`
- User `{ id: 'restaurant-1', role: 'restaurant' }`

**Expected**: Throws `ForbiddenException`

---

## Test Suite: cancel

### ✅ Test: cancels order for owner and broadcasts update

**Purpose**: Verify cancel flow với WebSocket

**Test Steps**:
1. Mock order owned by 'customer-1'
2. Call `cancel` với user `{ id: 'customer-1', role: 'customer' }`
3. Verify status = Canceled
4. Verify broadcast

**Expected**:
- `order.status` = `OrderStatus.Canceled`
- `save()` được gọi
- `gateway.broadcastOrderUpdate` được gọi với:
  ```typescript
  {
    orderId: 'order-id',
    status: OrderStatus.Canceled
  }
  ```

---

### ✅ Test: allows super admin to cancel any order

**Test Steps**:
1. Mock order owned by 'other'
2. Call với user `{ id: 'admin', role: 'superAdmin' }`

**Assertions**:
- Cancel succeeds
- No `ForbiddenException`

---

### ❌ Test: throws ForbiddenException when user does not own order

**Setup**:
- Order owned by 'other'
- User 'customer-1' tries to cancel

**Expected**: Throws `ForbiddenException`

---

## Role-Based Access Control (RBAC) Matrix

| Operation | Customer (Own) | Customer (Other) | Restaurant (Own) | Restaurant (Other) | SuperAdmin |
|-----------|----------------|------------------|------------------|--------------------|------------|
| Create | ✅ | N/A | N/A | N/A | ✅ |
| View All | ❌ (own only) | ❌ | ❌ (own only) | ❌ | ✅ |
| View One | ✅ | ❌ | ✅ | ❌ | ✅ |
| Update Details | ✅ | ❌ | ❌ | ❌ | ✅ |
| Update Status | ❌ | ❌ | ✅ | ❌ | ✅ |
| Cancel | ✅ | ❌ | ❌ | ❌ | ✅ |

---

## Test Statistics

| Test Suite | Total Tests | ✅ Pass | ❌ Fail Expected |
|-----------|-------------|---------|------------------|
| create | 1 | 1 | 0 |
| findAll | 3 | 3 | 0 |
| findOne | 2 | 1 | 1 |
| updateDetails | 3 | 2 | 1 |
| updateStatus | 4 | 2 | 2 |
| cancel | 3 | 2 | 1 |
| **TOTAL** | **16** | **11** | **5** |

---

## Running Tests

```bash
cd backend/order-service
npm test -- orders.service.spec.ts

# Watch mode
npm test -- --watch orders.service.spec.ts
```

---

## Key Testing Patterns

1. **Total Price Calculation**: Luôn được tính từ items (quantity * price)
2. **OrderID Generation**: Pattern `/^ORDER-\d+$/`
3. **RBAC**: 
   - Customer: chỉ own orders, can update details và cancel
   - Restaurant: chỉ own orders, can update status
   - SuperAdmin: all orders, all operations
4. **WebSocket Broadcast**: `broadcastOrderUpdate` được gọi khi update status hoặc cancel
5. **Ownership Check**: Compare userId với customerId/restaurantId depending on operation
6. **Status Enum**: Use `OrderStatus.Pending`, `OrderStatus.Preparing`, `OrderStatus.Canceled`, etc.
