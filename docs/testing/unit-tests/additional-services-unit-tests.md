# Auth Service - Additional Unit Tests Documentation

> **Lưu ý**: Tài liệu này bổ sung cho `auth-service-unit-tests.md`, documenting thêm các test cases từ User Management, Delivery Fees và các controllers

## Additional Test Files

1. `backend/auth-service/src/user-management/user-management.service.spec.ts`
2. `backend/auth-service/src/delivery-fees/delivery-fees.service.spec.ts`
3. `backend/order-service/src/users/users.service.spec.ts` (Users in Order Service)
4. `backend/order-service/src/orders/orders.controller.spec.ts`

---

## 1. User Management Service Tests

### Mock Setup
```typescript
customerModel = { find, findOne, findById, findByIdAndDelete, create };
adminModel = { find, findOne, findById, findByIdAndDelete, create };
restaurantAdminModel = { find, findOne, findById, findByIdAndDelete, create };
deliveryModel = { find, findOne, findById, findByIdAndDelete, create };
```

### Test Suite: getAllUsers

#### ✅ Test: returns users from every collection when no filter provided

**Purpose**: Lấy tất cả users từ 4 collections (customer, admin, restaurant, delivery)

**Test Steps**:
1. Mock mỗi model trả về 1 user
2. Call `getAllUsers({})`
3. Verify all models được query

**Expected Output**:
```typescript
[
  { id: 'c1', firstName: 'Alice', userType: 'customer' },
  { id: 'a1', firstName: 'Bob', userType: 'admin' },
  { id: 'r1', firstName: 'Cara', userType: 'restaurant' },
  { id: 'd1', firstName: 'Dan', userType: 'delivery' }
]
```

**Assertions**:
- `customerModel.find()` được gọi
- `adminModel.find()` được gọi
- `restaurantAdminModel.find()` được gọi
- `deliveryModel.find()` được gọi
- Mỗi user có field `userType` added

---

#### ✅ Test: queries only the specified collection when userType is provided

**Purpose**: Filter theo userType chỉ query 1 collection

**Input**:
```typescript
{ userType: 'admin' }
```

**Assertions**:
- Only `adminModel.find()` được gọi
- Other models **NOT** called
- Result chỉ có admin users

---

### Test Suite: createUser

#### ✅ Test: creates a user and strips sensitive fields from response

**Input**:
```typescript
{
  userType: 'customer',
  firstName: 'Alice',
  lastName: 'Anderson',
  email: 'alice@example.com',
  phone: '1234',
  password: 'secure-password'
}
```

**Test Steps**:
1. Mock `findOne({ email })` returns null (email không tồn tại)
2. Mock `create` returns user document
3. Call `createUser(dto)`

**Expected**:
```typescript
{
  message: 'customer created successfully',
  // password field stripped from response
}
```

**Assertions**:
- `findOne` check email uniqueness
- `create` được gọi với correct model (Customer)
- Password **NOT** included in response

---

#### ❌ Test: throws BadRequestException when email already exists

**Setup**: Mock `findOne` returns existing user

**Expected**: Throws `BadRequestException`

---

## 2. Delivery Fees Service Tests

### Mock Setup
```typescript
feeModel = {
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn()
};
```

### ✅ Test: returns all fees

**Test Steps**:
1. Mock `find()` returns fee array
2. Call `getAllFees()`

**Assertions**:
- `find()` được gọi **without filter**
- All fees returned

---

### ✅ Test: returns active fees

**Test Steps**:
1. Mock `find({ isActive: true })`
2. Call `getActiveFees()`

**Assertions**:
- `find` được gọi với filter `{ isActive: true }`

---

### ✅ Test: creates a fee entry

**Input**:
```typescript
{
  name: 'Standard',
  baseDistance: 3,
  baseFee: 10000,
  perKmFee: 5000,
  vehicleType: 'bike',
  rushHourMultiplier: 1.5,
  isActive: true
}
```

**Expected**:
```typescript
{
  message: 'Delivery fee created successfully',
  fee: { ...dto }
}
```

---

### Test Suite: updateFee

#### ✅ Test: updates fee when record exists

**Test Steps**:
1. Mock `findByIdAndUpdate` returns updated document
2. Call `updateFee('1', { name: 'Updated' })`

**Assertions**:
- `findByIdAndUpdate` được gọi với:
  - ID: '1'
  - Update data: `{ name: 'Updated' }`
  - Options: `{ new: true }`

---

#### ❌ Test: throws when fee is missing

**Setup**: Mock returns null

**Expected**: Throws `NotFoundException`

---

### Test Suite: calculateFee

#### ✅ Test: computes fee using matching vehicle configuration

**Input**:
```typescript
{
  distance: '5',
  vehicleType: 'bike'
}
```

**Test Steps**:
1. Mock `findOne({ isActive: true, vehicleType: 'bike' })` returns fee config
2. Mock `calculateFee(5, false)` returns 25000
3. Call `calculateFee(dto)`

**Expected**:
```typescript
{
  distance: 5,
  calculatedFee: 25000,
  vehicleType: 'bike',
  isRushHour: false
}
```

---

#### ✅ Test: falls back to all-vehicle configuration when specific type is missing

**Test Steps**:
1. Mock first `findOne({ vehicleType: 'car' })` returns null
2. Mock second `findOne({ vehicleType: 'all' })` returns fallback config
3. Call `calculateFee({ distance: '2', vehicleType: 'car' })`

**Assertions**:
- Two `findOne` calls
- First with specific vehicleType
- Second with 'all' as fallback

---

#### ❌ Test: throws when no configuration exists

**Setup**: Both queries return null

**Expected**: Throws `NotFoundException` (no fee config available)

---

## 3. Users Service (Order Service) Tests

> **Note**: This is different from Auth Service - handles users for order service

### Test Suite: register

#### ✅ Test: hashes password, creates user and returns token

**Input**:
```typescript
{
  name: 'Alice',
  email: 'alice@example.com',
  password: 'secret123',
  role: 'customer'
}
```

**Test Steps**:
1. Mock `bcrypt.genSalt(10)` returns 'salt'
2. Mock `bcrypt.hash(password, salt)` returns 'hashed-password'
3. Mock `userModel.create` returns user
4. Mock `jwtService.sign` returns 'signed-jwt'

**Expected**:
```typescript
{
  message: 'User registered successfully!',
  token: 'signed-jwt'
}
```

**Assertions**:
- `findOne({ email })` check uniqueness
- `bcrypt.hash` được gọi
- `create` với hashed password
- JWT generated với `{ id, role }`

---

#### ❌ Test: throws BadRequestException when email already exists

**Setup**: Email already in database

**Expected**: Throws `BadRequestException`

---

### Test Suite: login

#### ✅ Test: returns token and user data when credentials are valid

**Input**:
```typescript
{
  email: 'alice@example.com',
  password: 'secret123'
}
```

**Test Steps**:
1. Mock `findOne({ email })` returns user với hashed password
2. Mock `bcrypt.compare(password, hashed)` returns true
3. Mock `jwtService.sign` returns token

**Expected**:
```typescript
{
  id: 'user-id',
  name: 'Alice',
  email: 'alice@example.com',
  role: 'customer',
  token: 'signed-jwt'
}
```

---

#### ❌ Test: throws UnauthorizedException when user does not exist

**Setup**: `findOne` returns null

**Expected**: Throws `UnauthorizedException`

---

#### ❌ Test: throws UnauthorizedException when password does not match

**Setup**: `bcrypt.compare` returns false

**Expected**: Throws `UnauthorizedException`

---

## 4. Orders Controller Tests

### Test Suite: create

#### ✅ Test: sets customerId from user if missing during create

**Purpose**: Auto-fill customerId từ JWT payload

**Input DTO**:
```typescript
{
  customerId: undefined, // missing
  restaurantId: 'restaurant-1',
  deliveryAddress: '123 Street',
  items: [{ foodId: '1', quantity: 1, price: 10 }]
}
```

**User**:
```typescript
{ id: 'customer-1', role: 'customer' }
```

**Assertions**:
- `service.create` được gọi với `customerId: 'customer-1'` auto-filled

---

#### ❌ Test: throws ForbiddenException when customer tries to create for another user

**Setup**:
- DTO has `customerId: 'other'`
- User ID: 'customer-1'

**Expected**: Throws `ForbiddenException` (customer cannot create order for others)

---

### Test Suite: findOne

#### ✅ Test: returns order when customer owns it

**Test Steps**:
1. Mock order với `customerId: 'customer-1'`
2. Call `findOne` với user `{ id: 'customer-1', role: 'customer' }`

**Assertions**:
- Order returned successfully
- No exception

---

#### ❌ Test: throws ForbiddenException when customer does not own order

**Setup**: Order owned by 'other', user is 'customer-1'

**Expected**: Throws `ForbiddenException`

---

#### ❌ Test: throws ForbiddenException when restaurant does not own order

**Setup**: 
- Order `restaurantId: 'another'`
- User `{ id: 'restaurant-1', role: 'restaurant' }`

**Expected**: Throws `ForbiddenException`

---

## Test Statistics Summary

| Service | File | Total Tests | ✅ Pass | ❌ Fail Expected |
|---------|------|-------------|---------|------------------|
| User Management | user-management.service.spec.ts | ~10 | 7 | 3 |
| Delivery Fees | delivery-fees.service.spec.ts | ~12 | 9 | 3 |
| Users (Order) | users.service.spec.ts | 5 | 3 | 2 |
| Orders Controller | orders.controller.spec.ts | 10 | 6 | 4 |
| **TOTAL** | | **~37** | **~25** | **~12** |

---

## Key Testing Patterns

### 1. User Type Management
- 4 collections: Customer, Admin, RestaurantAdmin, DeliveryPersonnel
- Each user có field `userType` added khi return
- Filter by userType queries single collection

### 2. Fee Calculation
- Fallback pattern: specific vehicleType → 'all'
- calculateFee method on document
- Rush hour multiplier applied
- Distance converted from string to number

### 3. Password Security
- Always hash với bcrypt before save
- Salt generated: `bcrypt.genSalt(10)`
- Password stripped from response

### 4. Controller Authorization
- Controllers verify ownership before delegating to service
- ForbiddenException thrown at controller level
- User context `{ id, role }` passed from JWT

### 5. Auto-fill Pattern
- customerId auto-filled from JWT if missing
- Prevents customer creating order for others

---

## Running Tests

```bash
# User Management
cd backend/auth-service
npm test -- user-management.service.spec.ts

# Delivery Fees
npm test -- delivery-fees.service.spec.ts

# Users Service (Order)
cd backend/order-service
npm test -- users.service.spec.ts

# Orders Controller
npm test -- orders.controller.spec.ts
```
