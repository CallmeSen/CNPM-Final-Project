# Restaurant Service - Integration Tests Documentation

> **Lưu ý**: Tài liệu này được tạo dựa trên test case thực tế cho E2E integration testing

## Test File
- **Location**: `backend/restaurant-service/test/restaurant.e2e-spec.ts`
- **Type**: E2E Integration Tests
- **Framework**: Jest + Supertest + NestJS Testing

---

## Test Setup

### Database
```typescript
// MongoDB in-memory server for isolated testing
let mongo: MongoMemoryServer;

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  process.env.MONGO_REST_URL = mongo.getUri();
});

afterAll(async () => {
  await mongo.stop();
  await app.close();
});
```

### External Service Mocks

#### Auth Service Mock
```typescript
// Mock axios for auth-service integration
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Mock restaurant profile response
mockedAxios.get.mockResolvedValue({
  data: {
    data: {
      restaurant: {
        id: 'restaurant-123',
        name: 'Test Restaurant',
        ownerName: 'John Doe',
        email: 'restaurant@test.com',
        location: 'Hanoi',
        contactNumber: '0912345678',
        profilePicture: '/uploads/restaurant.jpg',
        availability: true,
      },
    },
  },
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

### Test JWT Token
```typescript
// Mock JWT token for authenticated requests
const mockToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
const mockRestaurantId = 'restaurant-123';
```

---

## Integration Test: Restaurants Module

### GET /api/restaurant/profile/:id

#### ✅ Test: Returns restaurant profile successfully

**HTTP Request**:
```http
GET /api/restaurant/profile/restaurant-123
Authorization: Bearer {token}
```

**Expected Response** (200 OK):
```json
{
  "id": "restaurant-123",
  "name": "Test Restaurant",
  "ownerName": "John Doe",
  "location": "Hanoi",
  "contactNumber": "0912345678",
  "profilePicture": "/uploads/restaurant.jpg",
  "availability": true,
  "admin": {
    "email": "restaurant@test.com"
  }
}
```

**Verification Steps**:
1. Auth-service GET endpoint called
2. Response contains sanitized restaurant data
3. No sensitive data exposed (password, internal IDs)

**Assertions**:
- Status code: 200
- Response has all required fields
- `axios.get` called with correct auth-service URL

---

#### ❌ Test: Returns 404 when restaurant not found

**HTTP Request**:
```http
GET /api/restaurant/profile/nonexistent-id
Authorization: Bearer {token}
```

**Expected Response** (404 Not Found):
```json
{
  "statusCode": 404,
  "message": "Restaurant not found",
  "error": "Not Found"
}
```

**Assertions**:
- Status code: 404
- Error message indicates restaurant not found

---

#### ❌ Test: Returns 401 when unauthorized

**HTTP Request**:
```http
GET /api/restaurant/profile/restaurant-123
// No Authorization header
```

**Expected Response** (401 Unauthorized):
```json
{
  "statusCode": 401,
  "message": "Unauthorized",
  "error": "Unauthorized"
}
```

**Assertions**:
- Status code: 401
- Auth guard blocks request

---

### PUT /api/restaurant/profile/:id

#### ⚠️ Test: Returns 400 for unimplemented update feature

**HTTP Request**:
```http
PUT /api/restaurant/profile/restaurant-123
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Updated Restaurant Name",
  "location": "Ho Chi Minh City"
}
```

**Expected Response** (400 Bad Request):
```json
{
  "statusCode": 400,
  "message": "Update profile feature will be available soon. Please contact auth-service admin.",
  "error": "Bad Request"
}
```

**Note**: Feature pending implementation in auth-service

**Assertions**:
- Status code: 400
- Proper error message indicating future availability

---

### PATCH /api/restaurant/profile/:id/availability

#### ⚠️ Test: Returns 400 for unimplemented availability update

**HTTP Request**:
```http
PATCH /api/restaurant/profile/restaurant-123/availability
Authorization: Bearer {token}
Content-Type: application/json

{
  "availability": false
}
```

**Expected Response** (400 Bad Request):
```json
{
  "statusCode": 400,
  "message": "Update availability feature will be available soon. Please contact auth-service admin.",
  "error": "Bad Request"
}
```

**Assertions**:
- Status code: 400
- Feature not yet implemented

---

## Integration Test: Food Items Module

### POST /api/food-items

#### ✅ Test: Creates food item with image upload

**HTTP Request**:
```http
POST /api/food-items
Authorization: Bearer {token}
Content-Type: multipart/form-data

{
  "name": "Pho Bo",
  "description": "Traditional Vietnamese beef noodle soup",
  "price": 50000,
  "category": "Main Dish",
  "image": <binary file data>
}
```

**Expected Response** (201 Created):
```json
{
  "message": "Food item created successfully",
  "foodItem": {
    "_id": "food-item-123",
    "restaurant": "restaurant-123",
    "name": "Pho Bo",
    "description": "Traditional Vietnamese beef noodle soup",
    "price": 50000,
    "category": "Main Dish",
    "image": "/uploads/pho-1234567890.jpg"
  }
}
```

**Verification Steps**:
1. File uploaded and saved to disk
2. Food item saved to database
3. Image path properly formatted
4. Restaurant ownership assigned

**Assertions**:
- Status code: 201
- Response contains food item with image path
- File exists in uploads directory
- Database record created

---

#### ✅ Test: Creates food item without image

**HTTP Request**:
```http
POST /api/food-items
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Spring Rolls",
  "description": "Fresh Vietnamese spring rolls",
  "price": 30000,
  "category": "Appetizer"
}
```

**Expected Response** (201 Created):
```json
{
  "message": "Food item created successfully",
  "foodItem": {
    "_id": "food-item-456",
    "restaurant": "restaurant-123",
    "name": "Spring Rolls",
    "description": "Fresh Vietnamese spring rolls",
    "price": 30000,
    "category": "Appetizer",
    "image": null
  }
}
```

**Assertions**:
- Status code: 201
- Image field is null or undefined
- Other fields populated correctly

---

#### ❌ Test: Returns 400 with invalid price

**HTTP Request**:
```http
POST /api/food-items
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Invalid Item",
  "description": "Test",
  "price": -1000,
  "category": "Test"
}
```

**Expected Response** (400 Bad Request):
```json
{
  "statusCode": 400,
  "message": ["price must be a positive number"],
  "error": "Bad Request"
}
```

**Assertions**:
- Status code: 400
- Validation error for negative price
- DTO validation working

---

#### ❌ Test: Returns 400 with missing required fields

**HTTP Request**:
```http
POST /api/food-items
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Incomplete Item"
  // missing: description, price, category
}
```

**Expected Response** (400 Bad Request):
```json
{
  "statusCode": 400,
  "message": [
    "description should not be empty",
    "price should not be empty",
    "category should not be empty"
  ],
  "error": "Bad Request"
}
```

**Assertions**:
- Status code: 400
- All missing fields listed in error

---

### GET /api/food-items/restaurant/:restaurantId

#### ✅ Test: Returns all food items for a restaurant

**HTTP Request**:
```http
GET /api/food-items/restaurant/restaurant-123
```

**Expected Response** (200 OK):
```json
[
  {
    "_id": "food-item-1",
    "restaurant": "restaurant-123",
    "name": "Pho Bo",
    "price": 50000,
    "category": "Main Dish",
    "image": "/uploads/pho.jpg"
  },
  {
    "_id": "food-item-2",
    "restaurant": "restaurant-123",
    "name": "Banh Mi",
    "price": 25000,
    "category": "Snack",
    "image": "/uploads/banhmi.jpg"
  }
]
```

**Verification Steps**:
1. Query filters by restaurant ID
2. All food items returned
3. Public endpoint (no auth required)

**Assertions**:
- Status code: 200
- Response is array
- All items belong to specified restaurant

---

#### ✅ Test: Returns empty array when restaurant has no food items

**HTTP Request**:
```http
GET /api/food-items/restaurant/restaurant-empty
```

**Expected Response** (200 OK):
```json
[]
```

**Assertions**:
- Status code: 200
- Empty array returned
- No error thrown

---

### GET /api/food-items/:id

#### ✅ Test: Returns single food item by ID

**HTTP Request**:
```http
GET /api/food-items/food-item-123
```

**Expected Response** (200 OK):
```json
{
  "_id": "food-item-123",
  "restaurant": "restaurant-123",
  "name": "Pho Bo",
  "description": "Traditional Vietnamese beef noodle soup",
  "price": 50000,
  "category": "Main Dish",
  "image": "/uploads/pho.jpg"
}
```

**Assertions**:
- Status code: 200
- Correct food item returned
- All fields present

---

#### ❌ Test: Returns 404 when food item not found

**HTTP Request**:
```http
GET /api/food-items/nonexistent-id
```

**Expected Response** (404 Not Found):
```json
{
  "statusCode": 404,
  "message": "Food item not found",
  "error": "Not Found"
}
```

**Assertions**:
- Status code: 404
- Proper error message

---

### PUT /api/food-items/:id

#### ✅ Test: Updates food item successfully

**HTTP Request**:
```http
PUT /api/food-items/food-item-123
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Pho Bo Special",
  "price": 60000
}
```

**Expected Response** (200 OK):
```json
{
  "message": "Food item updated successfully",
  "foodItem": {
    "_id": "food-item-123",
    "restaurant": "restaurant-123",
    "name": "Pho Bo Special",
    "price": 60000,
    "category": "Main Dish",
    "image": "/uploads/pho.jpg"
  }
}
```

**Verification Steps**:
1. Ownership verified (food item belongs to authenticated restaurant)
2. Database updated
3. Updated document returned

**Assertions**:
- Status code: 200
- Updated fields changed
- Unchanged fields preserved

---

#### ✅ Test: Updates food item with new image

**HTTP Request**:
```http
PUT /api/food-items/food-item-123
Authorization: Bearer {token}
Content-Type: multipart/form-data

{
  "name": "Pho Bo Premium",
  "image": <new binary file data>
}
```

**Expected Response** (200 OK):
```json
{
  "message": "Food item updated successfully",
  "foodItem": {
    "_id": "food-item-123",
    "name": "Pho Bo Premium",
    "image": "/uploads/pho-new-1234567890.jpg"
  }
}
```

**Assertions**:
- Status code: 200
- New image uploaded and saved
- Image path updated in database

---

#### ❌ Test: Returns 401 when updating food item owned by different restaurant

**HTTP Request**:
```http
PUT /api/food-items/food-item-999
Authorization: Bearer {token-for-restaurant-123}
Content-Type: application/json

{
  "name": "Unauthorized Update"
}
```

**Setup**:
- Food item 'food-item-999' belongs to 'restaurant-456'
- Token is for 'restaurant-123'

**Expected Response** (401 Unauthorized):
```json
{
  "statusCode": 401,
  "message": "Not authorized to update this food item",
  "error": "Unauthorized"
}
```

**Assertions**:
- Status code: 401
- Ownership check prevents update
- Database NOT modified

---

### DELETE /api/food-items/:id

#### ✅ Test: Deletes food item successfully

**HTTP Request**:
```http
DELETE /api/food-items/food-item-123
Authorization: Bearer {token}
```

**Expected Response** (200 OK):
```json
{
  "message": "Food item deleted successfully"
}
```

**Verification Steps**:
1. Ownership verified
2. Food item removed from database
3. Image file optionally deleted from disk

**Assertions**:
- Status code: 200
- Success message returned
- Database record deleted

---

#### ❌ Test: Returns 401 when deleting food item owned by different restaurant

**HTTP Request**:
```http
DELETE /api/food-items/food-item-999
Authorization: Bearer {token-for-restaurant-123}
```

**Expected Response** (401 Unauthorized):
```json
{
  "statusCode": 401,
  "message": "Not authorized to delete this food item",
  "error": "Unauthorized"
}
```

**Assertions**:
- Status code: 401
- Food item NOT deleted
- Ownership protection working

---

#### ❌ Test: Returns 404 when deleting non-existent food item

**HTTP Request**:
```http
DELETE /api/food-items/nonexistent-id
Authorization: Bearer {token}
```

**Expected Response** (404 Not Found):
```json
{
  "statusCode": 404,
  "message": "Food item not found",
  "error": "Not Found"
}
```

**Assertions**:
- Status code: 404
- Proper error handling

---

## Integration Test: Super Admin Module

### GET /api/superAdmin/restaurants

#### ✅ Test: Returns all restaurants for super admin

**HTTP Request**:
```http
GET /api/superAdmin/restaurants
Authorization: Bearer {superAdminToken}
```

**Expected Response** (200 OK):
```json
[
  {
    "id": "restaurant-1",
    "name": "Restaurant A",
    "ownerName": "Owner A",
    "availability": true,
    "location": "Hanoi"
  },
  {
    "id": "restaurant-2",
    "name": "Restaurant B",
    "ownerName": "Owner B",
    "availability": false,
    "location": "HCMC"
  }
]
```

**Assertions**:
- Status code: 200
- All restaurants returned
- Super admin auth required

---

### GET /api/superAdmin/restaurants/:id

#### ✅ Test: Returns specific restaurant details

**HTTP Request**:
```http
GET /api/superAdmin/restaurants/restaurant-123
Authorization: Bearer {superAdminToken}
```

**Expected Response** (200 OK):
```json
{
  "id": "restaurant-123",
  "name": "Test Restaurant",
  "ownerName": "John Doe",
  "location": "Hanoi",
  "contactNumber": "0912345678",
  "availability": true,
  "admin": {
    "email": "restaurant@test.com"
  }
}
```

**Assertions**:
- Status code: 200
- Complete restaurant details returned

---

### DELETE /api/superAdmin/restaurants/:id

#### ⚠️ Test: Returns 400 for unimplemented delete feature

**HTTP Request**:
```http
DELETE /api/superAdmin/restaurants/restaurant-123
Authorization: Bearer {superAdminToken}
```

**Expected Response** (400 Bad Request):
```json
{
  "statusCode": 400,
  "message": "Delete restaurant feature will be available soon. Please contact auth-service admin.",
  "error": "Bad Request"
}
```

**Note**: Feature pending auth-service implementation

**Assertions**:
- Status code: 400
- Feature not yet available

---

### PATCH /api/superAdmin/restaurants/:id/status

#### ⚠️ Test: Returns 400 for unimplemented status update

**HTTP Request**:
```http
PATCH /api/superAdmin/restaurants/restaurant-123/status
Authorization: Bearer {superAdminToken}
Content-Type: application/json

{
  "status": "closed"
}
```

**Expected Response** (400 Bad Request):
```json
{
  "statusCode": 400,
  "message": "Update availability feature will be available soon. Please contact auth-service admin.",
  "error": "Bad Request"
}
```

**Assertions**:
- Status code: 400
- Delegates to updateAvailability which is not implemented

---

## File Upload Tests

### Image Upload Configuration

**Multer Setup**:
```typescript
// In tests
const testFile = {
  fieldname: 'image',
  originalname: 'pho.jpg',
  encoding: '7bit',
  mimetype: 'image/jpeg',
  buffer: Buffer.from('fake-image-data'),
  size: 1024,
};
```

**Supported Formats**:
- JPEG (.jpg, .jpeg)
- PNG (.png)
- WebP (.webp)

**File Size Limit**: 5MB

**Upload Directory**: `backend/restaurant-service/uploads/`

---

## Running Integration Tests

### Run All E2E Tests
```bash
cd backend/restaurant-service
npm run test:e2e
```

### Run Specific Test Suite
```bash
npm run test:e2e -- --testNamePattern="Restaurants Module"
npm run test:e2e -- --testNamePattern="Food Items Module"
npm run test:e2e -- --testNamePattern="Super Admin Module"
```

### Run with Coverage
```bash
npm run test:e2e -- --coverage
```

---

## Test Coverage Summary

| Endpoint | Tests | Status |
|----------|-------|--------|
| GET /api/restaurant/profile/:id | 3 | ✅ |
| PUT /api/restaurant/profile/:id | 1 | ⚠️ Pending |
| PATCH /api/restaurant/profile/:id/availability | 1 | ⚠️ Pending |
| POST /api/food-items | 3 | ✅ |
| GET /api/food-items/restaurant/:restaurantId | 2 | ✅ |
| GET /api/food-items/:id | 2 | ✅ |
| PUT /api/food-items/:id | 3 | ✅ |
| DELETE /api/food-items/:id | 3 | ✅ |
| GET /api/superAdmin/restaurants | 1 | ✅ |
| GET /api/superAdmin/restaurants/:id | 1 | ✅ |
| DELETE /api/superAdmin/restaurants/:id | 1 | ⚠️ Pending |
| PATCH /api/superAdmin/restaurants/:id/status | 1 | ⚠️ Pending |

**Total Tests**: 22  
**Fully Implemented**: 18 ✅  
**Pending Auth-Service**: 4 ⚠️

---

## Notes

### Auth Service Integration
- Restaurant authentication delegated to auth-service (port 5001)
- Integration tests mock axios calls to auth-service
- Real auth-service integration tested in separate suite

### Pending Features
Several endpoints return 400 BadRequestException:
- Restaurant profile updates
- Availability updates
- Restaurant deletion
- Status updates

These will be enabled once auth-service implements the corresponding APIs.

### File Upload Testing
- Uses multer for file handling
- Files saved to `uploads/` directory
- Image paths formatted as `/uploads/filename-timestamp.ext`
- Tests verify file persistence and path correctness

### Authorization Testing
- Restaurant endpoints require JWT authentication
- Food items enforce restaurant ownership
- Super admin has elevated privileges
- Tests verify both successful auth and rejection scenarios
