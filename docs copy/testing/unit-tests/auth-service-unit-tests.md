# Auth Service - Unit Tests

## Overview
Unit tests for Auth Service focusing on business logic isolation with mocked dependencies.

---

## AuthService Unit Tests

### Test Suite: registerCustomer

#### ✅ Test: Creates a new customer and returns auth payload
**Purpose**: Verify successful customer registration flow

**Setup**:
- Mock CustomerModel with no existing email
- Mock save operation returns customer document
- Mock JwtService.sign returns token

**Test Steps**:
1. Call `registerCustomer()` with valid DTO
2. Verify CustomerModel.findOne() called with email
3. Verify new customer created via constructor
4. Verify save() called on customer document
5. Verify JWT token generated

**Expected Result**:
```typescript
{
  token: 'signed-token',
  customer: {
    id: 'new-id',
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane@example.com',
    phone: '123456789',
    location: 'City'
  }
}
```

**Assertions**:
- `customerModelMock.findOne` called once with `{ email: dto.email }`
- `jwtServiceMock.sign` called once
- Result contains valid token and customer data

---

#### ❌ Test: Throws when email already exists
**Purpose**: Prevent duplicate email registration

**Setup**:
- Mock CustomerModel.findOne() returns existing customer

**Test Steps**:
1. Call `registerCustomer()` with existing email
2. Expect ConflictException thrown

**Expected Error**: `ConflictException: 'Email already registered.'`

**Assertions**:
- Exception thrown with correct message
- save() never called

---

### Test Suite: loginCustomer

#### ✅ Test: Returns auth payload when credentials are valid
**Purpose**: Verify successful login flow

**Setup**:
- Mock CustomerModel.findOne() returns customer with hashed password
- Mock comparePassword() returns true
- Mock JwtService.sign() returns token

**Test Steps**:
1. Call `loginCustomer()` with valid credentials
2. Verify password comparison
3. Verify token generation

**Expected Result**:
```typescript
{
  token: 'signed-token',
  customer: { id, firstName, lastName, email, phone, location }
}
```

**Assertions**:
- `customerModelMock.findOne` called with email and password selection
- `comparePassword` called with provided password
- JWT token generated

---

#### ❌ Test: Throws when no customer is found
**Purpose**: Reject login for non-existent accounts

**Setup**:
- Mock CustomerModel.findOne() returns null

**Expected Error**: `UnauthorizedException: 'Invalid credentials.'`

---

#### ❌ Test: Throws when password validation fails
**Purpose**: Reject invalid passwords

**Setup**:
- Mock CustomerModel.findOne() returns customer
- Mock comparePassword() returns false

**Expected Error**: `UnauthorizedException: 'Invalid credentials.'`

---

### Test Suite: getProfile

#### ✅ Test: Returns the sanitized customer
**Purpose**: Fetch customer profile data

**Setup**:
- Mock CustomerModel.findById() returns customer document

**Test Steps**:
1. Call `getProfile(userId)`
2. Verify correct user ID used

**Expected Result**: Sanitized customer object without password

**Assertions**:
- `findById` called with correct userId
- Result excludes sensitive fields

---

#### ❌ Test: Throws when profile cannot be found
**Purpose**: Handle missing user profiles

**Setup**:
- Mock CustomerModel.findById() returns null

**Expected Error**: `NotFoundException: 'Customer not found.'`

---

### Test Suite: updateProfile

#### ❌ Test: Rejects empty update payloads
**Purpose**: Validate update data exists

**Setup**: Empty updates object

**Expected Error**: `BadRequestException: 'No changes provided.'`

---

#### ✅ Test: Updates and returns the customer
**Purpose**: Verify profile update flow

**Setup**:
- Mock CustomerModel.findByIdAndUpdate() returns updated customer

**Test Steps**:
1. Call `updateProfile(userId, updates)`
2. Verify update operation

**Expected Result**: Updated customer profile

**Assertions**:
- `findByIdAndUpdate` called with userId and updates
- Result contains updated fields

---

#### ❌ Test: Throws when customer does not exist
**Purpose**: Handle updates for non-existent users

**Setup**:
- Mock findByIdAndUpdate() returns null

**Expected Error**: `NotFoundException: 'Customer not found.'`

---

## RestaurantService Unit Tests

### Test Suite: registerRestaurant

#### ✅ Test: Creates restaurant and returns auth payload
**Purpose**: Verify restaurant registration

**Setup**:
- Mock RestaurantModel.findOne() returns null (no existing)
- Mock RestaurantModel.create() returns new restaurant
- Mock JwtService.sign() returns token

**Expected Result**:
```typescript
{
  message: 'Restaurant registered successfully',
  token: 'jwt-token',
  restaurant: {
    id: 'restaurant-id',
    name: 'Test Restaurant',
    ownerName: 'Owner Name',
    location: 'City',
    contactNumber: '1234567890',
    profilePicture: 'http://localhost:5001/uploads/file.jpg',
    email: 'restaurant@example.com'
  }
}
```

---

#### ❌ Test: Throws when name or email already exists
**Purpose**: Prevent duplicate restaurants

**Setup**:
- Mock RestaurantModel.findOne() returns existing restaurant

**Expected Error**: `ConflictException: 'Restaurant or email already exists'`

---

### Test Suite: loginRestaurant

#### ✅ Test: Returns auth payload when credentials valid
**Purpose**: Verify restaurant login

**Setup**:
- Mock RestaurantModel.findOne() returns restaurant
- Mock compareAdminPassword() returns true

**Expected Result**: Token and restaurant data

---

#### ❌ Test: Throws when restaurant not found
**Expected Error**: `UnauthorizedException: 'Invalid credentials'`

---

#### ❌ Test: Throws when password invalid
**Expected Error**: `UnauthorizedException: 'Invalid credentials'`

---

## SuperAdminService Unit Tests

### Test Suite: registerSuperAdmin

#### ✅ Test: Creates superadmin and returns token
**Purpose**: Verify superadmin registration

**Setup**:
- Mock SuperAdminModel.findOne() returns null
- Mock SuperAdminModel.create() returns new admin

**Expected Result**:
```typescript
{
  message: 'SuperAdmin registered successfully',
  token: 'jwt-token',
  superAdmin: {
    id: 'admin-id',
    username: 'admin',
    email: 'admin@example.com',
    role: 'superAdmin'
  }
}
```

---

#### ❌ Test: Throws when username or email exists
**Expected Error**: `ConflictException`

---

### Test Suite: loginSuperAdmin

#### ✅ Test: Supports username or email login
**Purpose**: Flexible login options

**Setup**:
- Mock SuperAdminModel.findOne() with username OR email
- Mock comparePassword() returns true

**Expected Result**: Token and superadmin data

---

## Test Coverage Summary

| Module | Statements | Branches | Functions | Lines |
|--------|-----------|----------|-----------|-------|
| AuthService | 29.81% | 0% | 17.85% | 28.38% |
| DTOs | 95.23% | 100% | 0% | 95.23% |
| Guards | 46.15% | 0% | 33.33% | 38.09% |

## Running Unit Tests

```bash
# Run all auth-service unit tests
cd backend/auth-service
npm test

# Run with coverage
npm test -- --coverage

# Run specific test file
npm test -- auth.service.spec.ts

# Watch mode
npm test -- --watch
```

## Mocking Strategy

### CustomerModel Mock
```typescript
customerModelMock = Object.assign(jest.fn(), {
  findOne: jest.fn(),
  findById: jest.fn(),
  findByIdAndUpdate: jest.fn(),
});
```

### RestaurantModel Mock
```typescript
restaurantModelMock = {
  findOne: jest.fn(),
  findById: jest.fn(),
  create: jest.fn(),
};
```

### JwtService Mock
```typescript
jwtServiceMock = {
  sign: jest.fn().mockReturnValue('signed-token'),
};
```

## Best Practices

1. **Isolation**: Each test runs independently with fresh mocks
2. **Arrange-Act-Assert**: Clear test structure
3. **Mock Reset**: `jest.clearAllMocks()` in afterEach
4. **Type Safety**: Use typed mocks for better IDE support
5. **Error Testing**: Verify both success and failure paths
6. **Assertions**: Check method calls, arguments, and return values
