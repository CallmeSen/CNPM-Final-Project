# Auth Service - Unit Tests Documentation# Auth Service - Unit Tests



> **Lưu ý**: Tài liệu này được tạo dựa trên các test case thực tế trong file `auth.service.spec.ts`## Overview

Unit tests for Auth Service focusing on business logic isolation with mocked dependencies.

## File Test

- **Location**: `backend/auth-service/src/auth/auth.service.spec.ts`---

- **Test Suite**: `AuthService`

- **Test Framework**: Jest with NestJS Testing## AuthService Unit Tests



---### Test Suite: registerCustomer



## Mock Setup#### ✅ Test: Creates a new customer and returns auth payload

**Purpose**: Verify successful customer registration flow

### Customer Model Mock

```typescript**Setup**:

customerModelMock = Object.assign(jest.fn(), {- Mock CustomerModel with no existing email

  findOne: jest.fn(),- Mock save operation returns customer document

  findById: jest.fn(),- Mock JwtService.sign returns token

  findByIdAndUpdate: jest.fn(),

});**Test Steps**:

```1. Call `registerCustomer()` with valid DTO

2. Verify CustomerModel.findOne() called with email

### JWT Service Mock3. Verify new customer created via constructor

```typescript4. Verify save() called on customer document

jwtServiceMock = {5. Verify JWT token generated

  sign: jest.fn().mockReturnValue('signed-token'),

};**Expected Result**:

``````typescript

{

### Test Customer Document  token: 'signed-token',

```typescript  customer: {

const createCustomerDoc = (overrides = {}) => ({    id: 'new-id',

  id: 'customer-id',    firstName: 'Jane',

  firstName: 'Jane',    lastName: 'Doe',

  lastName: 'Doe',    email: 'jane@example.com',

  email: 'jane@example.com',    phone: '123456789',

  phone: '123456789',    location: 'City'

  location: 'City',  }

  save: jest.fn().mockResolvedValue(undefined),}

  comparePassword: jest.fn().mockResolvedValue(true),```

  ...overrides,

});**Assertions**:

```- `customerModelMock.findOne` called once with `{ email: dto.email }`

- `jwtServiceMock.sign` called once

---- Result contains valid token and customer data



## Test Suite: registerCustomer---



### ✅ Test: creates a new customer and returns auth payload#### ❌ Test: Throws when email already exists

**Purpose**: Prevent duplicate email registration

**Purpose**: Verify customer registration flow

**Setup**:

**Test Steps**:- Mock CustomerModel.findOne() returns existing customer

1. Mock `findOne` returns null (email không tồn tại)

2. Mock customer model constructor**Test Steps**:

3. Call `registerCustomer(dto)`1. Call `registerCustomer()` with existing email

4. Verify email check được gọi2. Expect ConflictException thrown

5. Verify customer document được tạo và save

6. Verify JWT token được tạo với payload đúng**Expected Error**: `ConflictException: 'Email already registered.'`



**Input**:**Assertions**:

```typescript- Exception thrown with correct message

{- save() never called

  firstName: 'Jane',

  lastName: 'Doe',---

  email: 'jane@example.com',

  phone: '123456789',### Test Suite: loginCustomer

  password: 'password',

  location: 'City',#### ✅ Test: Returns auth payload when credentials are valid

}**Purpose**: Verify successful login flow

```

**Setup**:

**Expected Output**:- Mock CustomerModel.findOne() returns customer with hashed password

```typescript- Mock comparePassword() returns true

{- Mock JwtService.sign() returns token

  token: 'signed-token',

  customer: {**Test Steps**:

    id: 'new-id',1. Call `loginCustomer()` with valid credentials

    firstName: 'Jane',2. Verify password comparison

    lastName: 'Doe',3. Verify token generation

    email: 'jane@example.com',

    phone: '123456789',**Expected Result**:

    location: 'City',```typescript

  }{

}  token: 'signed-token',

```  customer: { id, firstName, lastName, email, phone, location }

}

**Assertions**:```

- `customerModelMock.findOne` được gọi với `{ email: 'jane@example.com' }`

- `customerModelMock` constructor được gọi với dto**Assertions**:

- `save()` được gọi- `customerModelMock.findOne` called with email and password selection

- `jwtServiceMock.sign` được gọi với `{ sub: 'new-id', role: 'customer' }`- `comparePassword` called with provided password

- JWT token generated

---

---

### ❌ Test: throws when the email already exists

#### ❌ Test: Throws when no customer is found

**Purpose**: Verify duplicate email validation**Purpose**: Reject login for non-existent accounts



**Setup**:**Setup**:

- Mock `findOne` returns existing customer document- Mock CustomerModel.findOne() returns null



**Expected**: Throws `ConflictException`**Expected Error**: `UnauthorizedException: 'Invalid credentials.'`



**Assertions**:---

- Exception type is `ConflictException`

#### ❌ Test: Throws when password validation fails

---**Purpose**: Reject invalid passwords



## Test Suite: loginCustomer**Setup**:

- Mock CustomerModel.findOne() returns customer

### ✅ Test: returns auth payload when credentials are valid- Mock comparePassword() returns false



**Purpose**: Verify successful login flow**Expected Error**: `UnauthorizedException: 'Invalid credentials.'`



**Test Steps**:---

1. Mock `findOne().select('+password')` returns customer with password

2. Mock `comparePassword` returns true### Test Suite: getProfile

3. Call `loginCustomer(dto)`

4. Verify JWT token generated#### ✅ Test: Returns the sanitized customer

**Purpose**: Fetch customer profile data

**Input**:

```typescript**Setup**:

{- Mock CustomerModel.findById() returns customer document

  email: 'login@example.com',

  password: 'secret'**Test Steps**:

}1. Call `getProfile(userId)`

```2. Verify correct user ID used



**Expected Output**:**Expected Result**: Sanitized customer object without password

```typescript

{**Assertions**:

  token: 'signed-token',- `findById` called with correct userId

  customer: {- Result excludes sensitive fields

    id: 'login-id',

    firstName: 'Jane',---

    lastName: 'Doe',

    email: 'login@example.com',#### ❌ Test: Throws when profile cannot be found

    phone: '123456789',**Purpose**: Handle missing user profiles

    location: 'City',

  }**Setup**:

}- Mock CustomerModel.findById() returns null

```

**Expected Error**: `NotFoundException: 'Customer not found.'`

**Assertions**:

- `findOne` được gọi với `{ email: 'login@example.com' }`---

- `select('+password')` được gọi để lấy password field

- `comparePassword` được gọi với password từ dto### Test Suite: updateProfile

- `jwtServiceMock.sign` được gọi với `{ sub: 'login-id', role: 'customer' }`

#### ❌ Test: Rejects empty update payloads

---**Purpose**: Validate update data exists



### ❌ Test: throws when no customer is found**Setup**: Empty updates object



**Setup**: Mock `findOne().select()` returns null**Expected Error**: `BadRequestException: 'No changes provided.'`



**Expected**: Throws `UnauthorizedException`---



---#### ✅ Test: Updates and returns the customer

**Purpose**: Verify profile update flow

### ❌ Test: throws when password validation fails

**Setup**:

**Setup**: Mock `comparePassword` returns false- Mock CustomerModel.findByIdAndUpdate() returns updated customer



**Expected**: Throws `UnauthorizedException`**Test Steps**:

1. Call `updateProfile(userId, updates)`

---2. Verify update operation



## Test Suite: getProfile**Expected Result**: Updated customer profile



### ✅ Test: returns the sanitized customer**Assertions**:

- `findByIdAndUpdate` called with userId and updates

**Purpose**: Verify profile retrieval- Result contains updated fields



**Test Steps**:---

1. Mock `findById` returns customer document

2. Call `getProfile('profile-id')`#### ❌ Test: Throws when customer does not exist

3. Verify sanitized response (no password)**Purpose**: Handle updates for non-existent users



**Expected Output**:**Setup**:

```typescript- Mock findByIdAndUpdate() returns null

{

  id: 'profile-id',**Expected Error**: `NotFoundException: 'Customer not found.'`

  firstName: 'Jane',

  lastName: 'Doe',---

  email: 'jane@example.com',

  phone: '123456789',## RestaurantService Unit Tests

  location: 'City',

}### Test Suite: registerRestaurant

```

#### ✅ Test: Creates restaurant and returns auth payload

**Assertions**:**Purpose**: Verify restaurant registration

- `findById` được gọi với 'profile-id'

- Response không chứa password field**Setup**:

- Mock RestaurantModel.findOne() returns null (no existing)

---- Mock RestaurantModel.create() returns new restaurant

- Mock JwtService.sign() returns token

### ❌ Test: throws when the profile cannot be found

**Expected Result**:

**Setup**: Mock `findById` returns null```typescript

{

**Expected**: Throws `NotFoundException`  message: 'Restaurant registered successfully',

  token: 'jwt-token',

---  restaurant: {

    id: 'restaurant-id',

## Test Suite: updateProfile    name: 'Test Restaurant',

    ownerName: 'Owner Name',

### ❌ Test: rejects empty update payloads    location: 'City',

    contactNumber: '1234567890',

**Purpose**: Validate update input    profilePicture: 'http://localhost:5001/uploads/file.jpg',

    email: 'restaurant@example.com'

**Input**: `{}`  }

}

**Expected**: Throws `BadRequestException````



------



### ✅ Test: updates and returns the customer#### ❌ Test: Throws when name or email already exists

**Purpose**: Prevent duplicate restaurants

**Purpose**: Verify profile update flow

**Setup**:

**Test Steps**:- Mock RestaurantModel.findOne() returns existing restaurant

1. Mock `findByIdAndUpdate` returns updated customer

2. Call `updateProfile('update-id', { firstName: 'Janet' })`**Expected Error**: `ConflictException: 'Restaurant or email already exists'`

3. Verify update options

---

**Input**:

```typescript### Test Suite: loginRestaurant

{

  firstName: 'Janet'#### ✅ Test: Returns auth payload when credentials valid

}**Purpose**: Verify restaurant login

```

**Setup**:

**Expected Output**:- Mock RestaurantModel.findOne() returns restaurant

```typescript- Mock compareAdminPassword() returns true

{

  id: 'update-id',**Expected Result**: Token and restaurant data

  firstName: 'Janet', // updated

  lastName: 'Doe',---

  email: 'jane@example.com',

  phone: '123456789',#### ❌ Test: Throws when restaurant not found

  location: 'New',**Expected Error**: `UnauthorizedException: 'Invalid credentials'`

}

```---



**Assertions**:#### ❌ Test: Throws when password invalid

- `findByIdAndUpdate` được gọi với:**Expected Error**: `UnauthorizedException: 'Invalid credentials'`

  - ID: 'update-id'

  - Update data: `{ firstName: 'Janet' }`---

  - Options: `{ new: true, runValidators: true }`

## SuperAdminService Unit Tests

---

### Test Suite: registerSuperAdmin

### ❌ Test: throws when the customer does not exist

#### ✅ Test: Creates superadmin and returns token

**Setup**: Mock `findByIdAndUpdate` returns null**Purpose**: Verify superadmin registration



**Expected**: Throws `NotFoundException`**Setup**:

- Mock SuperAdminModel.findOne() returns null

---- Mock SuperAdminModel.create() returns new admin



## Test Statistics**Expected Result**:

```typescript

| Test Suite | Total Tests | ✅ Pass | ❌ Fail Expected |{

|-----------|-------------|---------|------------------|  message: 'SuperAdmin registered successfully',

| registerCustomer | 2 | 1 | 1 |  token: 'jwt-token',

| loginCustomer | 3 | 1 | 2 |  superAdmin: {

| getProfile | 2 | 1 | 1 |    id: 'admin-id',

| updateProfile | 3 | 1 | 2 |    username: 'admin',

| **TOTAL** | **10** | **4** | **6** |    email: 'admin@example.com',

    role: 'superAdmin'

---  }

}

## Running Tests```



```bash---

cd backend/auth-service

npm test -- auth.service.spec.ts#### ❌ Test: Throws when username or email exists

**Expected Error**: `ConflictException`

# Watch mode

npm test -- --watch auth.service.spec.ts---



# Coverage### Test Suite: loginSuperAdmin

npm test -- --coverage auth.service.spec.ts

```#### ✅ Test: Supports username or email login

**Purpose**: Flexible login options

---

**Setup**:

## Key Testing Patterns- Mock SuperAdminModel.findOne() with username OR email

- Mock comparePassword() returns true

1. **Mock Chaining**: `findOne().select()` requires proper mock chaining

2. **JWT Payload**: Always verify `{ sub: userId, role: 'customer' }`**Expected Result**: Token and superadmin data

3. **Sanitization**: Response không bao giờ chứa password field

4. **Empty Validation**: Empty object updates should throw BadRequestException---

5. **Database Validation**: findByIdAndUpdate uses `{ new: true, runValidators: true }`

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
