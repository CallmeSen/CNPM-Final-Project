# Restaurant Service - Unit Tests

## Overview
Unit tests for Restaurant Service with mocked MongoDB models, auth-service HTTP client, and file upload utilities.

---

## RestaurantsService Unit Tests

### Test Suite: getProfile

#### ✅ Test: Fetches restaurant profile from auth-service
**Purpose**: Verify HTTP client integration with auth-service

**Setup**:
- Mock axios.get() to return restaurant data
- Mock configService.get('AUTH_SERVICE_URL')

**Test Steps**:
1. Call `getProfile('RESTAURANT123')`
2. Verify HTTP request made to auth-service
3. Verify response sanitization

**Expected HTTP Request**:
```typescript
GET http://localhost:5001/api/auth/restaurant/profile/RESTAURANT123
```

**Expected Response**:
```typescript
{
  id: 'RESTAURANT123',
  name: 'Test Restaurant',
  ownerName: 'John Doe',
  location: 'New York, NY',
  contactNumber: '+1234567890',
  profilePicture: '/uploads/restaurant.jpg',
  availability: true,
  admin: {
    email: 'restaurant@example.com'
  }
}
```

**Assertions**:
- axios.get called with correct URL
- Restaurant data returned
- Sanitized response format

---

#### ❌ Test: Throws NotFoundException when restaurant not found
**Setup**:
- Mock axios.get() throws 404 error

**Expected Error**: `NotFoundException('Restaurant not found')`

**Assertions**:
- Error thrown with correct message
- 404 status from auth-service handled

---

#### ❌ Test: Throws BadRequestException on auth-service failure
**Setup**:
- Mock axios.get() throws 500 error

**Expected Error**: `BadRequestException('Failed to fetch restaurant profile from auth service')`

---

### Test Suite: updateRestaurant

#### ✅ Test: Updates restaurant information
**Purpose**: Update restaurant profile data

**Setup**:
- Mock restaurantModel.findByIdAndUpdate()
- Mock file upload

**Test Steps**:
1. Call `updateRestaurant('RESTAURANT123', updateDto, file)`
2. Verify model update

**Input Data**:
```typescript
{
  name: 'Updated Restaurant',
  ownerName: 'Jane Doe',
  location: 'Los Angeles, CA',
  contactNumber: '+0987654321'
}
```

**Expected Update Call**:
```typescript
restaurantModel.findByIdAndUpdate(
  'RESTAURANT123',
  { ...updateDto, profilePicture: '/uploads/new-picture.jpg' },
  { new: true }
)
```

**Assertions**:
- findByIdAndUpdate called with correct ID
- File path built correctly if file provided
- Updated restaurant returned

---

#### ✅ Test: Updates without profile picture
**Setup**:
- No file provided

**Expected**: Update called without profilePicture field

---

#### ❌ Test: Throws NotFoundException when restaurant not found
**Setup**:
- Mock findByIdAndUpdate() returns null

**Expected Error**: `NotFoundException('Restaurant not found')`

---

### Test Suite: updateAvailability

#### ✅ Test: Updates restaurant availability status
**Purpose**: Toggle restaurant open/closed

**Setup**:
- Mock restaurantModel.findByIdAndUpdate()

**Test Steps**:
1. Call `updateAvailability('RESTAURANT123', { availability: false })`
2. Verify status update

**Expected Update**:
```typescript
{
  availability: false
}
```

**Assertions**:
- Availability updated
- Other fields unchanged

---

### Test Suite: getRestaurantById

#### ✅ Test: Returns restaurant by ID
**Purpose**: Query restaurant data from local DB

**Setup**:
- Mock restaurantModel.findById()

**Expected Result**:
```typescript
{
  id: 'RESTAURANT123',
  name: 'Test Restaurant',
  ownerName: 'John Doe',
  location: 'New York, NY',
  contactNumber: '+1234567890',
  profilePicture: '/uploads/restaurant.jpg',
  availability: true,
  admin: { email: 'restaurant@example.com' }
}
```

**Assertions**:
- findById called with correct ID
- Sanitized restaurant returned

---

#### ❌ Test: Throws NotFoundException if not found
**Setup**:
- Mock findById() returns null

---

### Test Suite: getAllRestaurants

#### ✅ Test: Returns all restaurants
**Purpose**: List all restaurants

**Setup**:
- Mock restaurantModel.find().exec()

**Expected Result**: Array of sanitized restaurants

**Assertions**:
- find() called without filters
- exec() called
- All restaurants sanitized

---

### Test Suite: sanitizeRestaurant (Private Method)

#### ✅ Test: Sanitizes restaurant document
**Purpose**: Remove sensitive fields

**Input** (RestaurantDocument):
```typescript
{
  _id: ObjectId('123'),
  name: 'Restaurant',
  ownerName: 'Owner',
  location: 'Location',
  contactNumber: '+123',
  profilePicture: '/uploads/pic.jpg',
  availability: true,
  admin: { 
    email: 'admin@example.com',
    password: 'hashed_password' // should be excluded
  },
  __v: 0
}
```

**Expected Output**:
```typescript
{
  id: '123',
  name: 'Restaurant',
  ownerName: 'Owner',
  location: 'Location',
  contactNumber: '+123',
  profilePicture: '/uploads/pic.jpg',
  availability: true,
  admin: {
    email: 'admin@example.com'
    // password excluded
  }
}
```

**Assertions**:
- Password field excluded
- _id converted to id string
- __v field excluded

---

## FoodItemsService Unit Tests

### Test Suite: create

#### ✅ Test: Creates new food item
**Purpose**: Add menu item to restaurant

**Setup**:
- Mock restaurantModel.findById()
- Mock foodItemModel.save()
- Mock multer file

**Test Steps**:
1. Call `create('RESTAURANT123', createDto, file)`
2. Verify restaurant exists
3. Verify food item created

**Input Data**:
```typescript
{
  name: 'Pizza Margherita',
  description: 'Classic Italian pizza',
  price: 12.99,
  category: 'Pizza'
}
```

**Mock File**:
```typescript
{
  filename: 'pizza-123.jpg',
  path: 'uploads/pizza-123.jpg'
}
```

**Expected Result**:
```typescript
{
  message: 'Food item created successfully',
  foodItem: {
    restaurant: 'RESTAURANT123',
    name: 'Pizza Margherita',
    description: 'Classic Italian pizza',
    price: 12.99,
    category: 'Pizza',
    image: '/uploads/pizza-123.jpg'
  }
}
```

**Assertions**:
- restaurantModel.findById called
- foodItemModel instantiated with correct data
- save() called
- Image path built correctly

---

#### ✅ Test: Creates food item without image
**Setup**:
- No file provided

**Expected**: Food item created with undefined image field

---

#### ❌ Test: Throws NotFoundException if restaurant not found
**Setup**:
- Mock findById() returns null

**Expected Error**: `NotFoundException('Restaurant not found')`

---

### Test Suite: findByRestaurant

#### ✅ Test: Returns all food items for restaurant
**Purpose**: List restaurant menu

**Setup**:
- Mock foodItemModel.find()

**Expected Query**:
```typescript
{ restaurant: 'RESTAURANT123' }
```

**Expected Result**: Array of food items

**Assertions**:
- find() called with restaurant filter
- All items returned

---

### Test Suite: findById

#### ✅ Test: Returns food item by ID
**Purpose**: Query single menu item

**Setup**:
- Mock foodItemModel.findById()

**Expected Result**:
```typescript
{
  _id: 'FOOD123',
  restaurant: 'RESTAURANT123',
  name: 'Pizza',
  description: 'Delicious',
  price: 12.99,
  category: 'Pizza',
  image: '/uploads/pizza.jpg'
}
```

**Assertions**:
- findById called with correct ID
- Food item returned

---

#### ❌ Test: Throws NotFoundException if not found
**Setup**:
- Mock findById() returns null

**Expected Error**: `NotFoundException('Food item not found')`

---

### Test Suite: update

#### ✅ Test: Updates food item
**Purpose**: Edit menu item

**Setup**:
- Mock foodItemModel.findById()
- Mock foodItemModel.findByIdAndUpdate()
- Mock file upload

**Test Steps**:
1. Call `update('FOOD123', 'RESTAURANT123', updateDto, file)`
2. Verify food item exists
3. Verify ownership
4. Verify update

**Input Data**:
```typescript
{
  name: 'Updated Pizza',
  price: 14.99
}
```

**Expected Update**:
```typescript
{
  name: 'Updated Pizza',
  price: 14.99,
  image: '/uploads/new-pizza.jpg'
}
```

**Assertions**:
- findById called first
- Ownership verified
- findByIdAndUpdate called with { new: true }
- Updated item returned

---

#### ❌ Test: Throws NotFoundException if food item not found
**Setup**:
- Mock findById() returns null

---

#### ❌ Test: Throws UnauthorizedException if restaurant doesn't own item
**Setup**:
- Mock findById() returns item with different restaurant ID

**Expected Error**: `UnauthorizedException('Not authorized to update this food item')`

**Test Cases**:
```typescript
// Authorized
foodItem.restaurant = 'RESTAURANT123'
requestRestaurantId = 'RESTAURANT123' ✓

// Unauthorized
foodItem.restaurant = 'RESTAURANT123'
requestRestaurantId = 'RESTAURANT999' ✗
```

---

### Test Suite: delete

#### ✅ Test: Deletes food item
**Purpose**: Remove menu item

**Setup**:
- Mock foodItemModel.findById()
- Mock foodItemModel.findByIdAndDelete()

**Test Steps**:
1. Call `delete('FOOD123', 'RESTAURANT123')`
2. Verify food item exists
3. Verify ownership
4. Delete item

**Expected Result**:
```typescript
{
  message: 'Food item deleted successfully'
}
```

**Assertions**:
- findById called
- Ownership verified
- findByIdAndDelete called

---

#### ❌ Test: Throws NotFoundException if not found
**Setup**:
- Mock findById() returns null

---

#### ❌ Test: Throws UnauthorizedException if unauthorized
**Setup**:
- Mock findById() returns item with different restaurant ID

---

## SuperAdminService Unit Tests

### Test Suite: getAllRestaurants

#### ✅ Test: SuperAdmin fetches all restaurants
**Purpose**: Admin dashboard listing

**Setup**:
- Mock restaurantModel.find().exec()

**Expected Result**: Array of all restaurants with full details

**Assertions**:
- No filters applied
- All restaurants returned

---

### Test Suite: getRestaurantById

#### ✅ Test: SuperAdmin fetches specific restaurant
**Purpose**: Admin view restaurant details

**Setup**:
- Mock restaurantModel.findById()

**Assertions**:
- findById called
- Restaurant returned

---

### Test Suite: updateRestaurantStatus

#### ✅ Test: SuperAdmin updates restaurant availability
**Purpose**: Admin can enable/disable restaurants

**Setup**:
- Mock restaurantModel.findByIdAndUpdate()

**Input**:
```typescript
{
  availability: false
}
```

**Expected Update**: Restaurant marked as unavailable

**Assertions**:
- findByIdAndUpdate called
- Status updated

---

## ReportsService Unit Tests

### Test Suite: getRestaurantStatistics

#### ✅ Test: Generates restaurant statistics
**Purpose**: Dashboard analytics

**Setup**:
- Mock restaurantModel.countDocuments()
- Mock foodItemModel.aggregate()

**Expected Statistics**:
```typescript
{
  totalRestaurants: 50,
  availableRestaurants: 45,
  totalFoodItems: 500,
  averageFoodItemsPerRestaurant: 10
}
```

**Assertions**:
- countDocuments called
- aggregate called with correct pipeline
- Statistics calculated

---

### Test Suite: getRestaurantOrders

#### ✅ Test: Fetches orders for restaurant
**Purpose**: Restaurant order history

**Setup**:
- Mock HTTP client to order-service

**Expected HTTP Request**:
```typescript
GET http://order-service:5005/api/orders?restaurantId=RESTAURANT123
```

**Assertions**:
- HTTP client called
- Orders returned

---

## Mock Strategy

### RestaurantModel Mock
```typescript
const mockRestaurantModel = {
  findById: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  find: jest.fn().mockReturnThis(),
  exec: jest.fn(),
  save: jest.fn(),
};
```

### FoodItemModel Mock
```typescript
const mockFoodItemModel = {
  new: jest.fn(),
  findById: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
  find: jest.fn(),
  aggregate: jest.fn(),
  save: jest.fn(),
};
```

### Axios Mock
```typescript
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

mockedAxios.get.mockResolvedValue({
  data: {
    data: {
      restaurant: { id: 'RESTAURANT123', ... }
    }
  }
});
```

### Multer File Mock
```typescript
const mockFile: Express.Multer.File = {
  fieldname: 'image',
  originalname: 'pizza.jpg',
  encoding: '7bit',
  mimetype: 'image/jpeg',
  destination: 'uploads/',
  filename: 'pizza-123.jpg',
  path: 'uploads/pizza-123.jpg',
  size: 50000,
  buffer: Buffer.from(''),
  stream: null,
};
```

---

## Test Coverage

| Module | Statements | Branches | Functions | Lines |
|--------|-----------|----------|-----------|-------|
| RestaurantsService | 85% | 75% | 90% | 85% |
| FoodItemsService | 90% | 80% | 95% | 90% |
| SuperAdminService | 80% | 70% | 85% | 80% |
| ReportsService | 75% | 65% | 80% | 75% |

---

## Running Tests

```bash
cd backend/restaurant-service
npm test

# Test specific suite
npm test -- restaurants.service.spec.ts
npm test -- food-items.service.spec.ts

# With coverage
npm test -- --coverage

# Watch mode
npm test -- --watch
```

---

## Best Practices

1. **HTTP Client Mocking**: Mock axios for auth-service calls, never make real HTTP requests
2. **File Upload Testing**: Mock multer files with realistic data
3. **Authorization Testing**: Always test ownership checks (restaurant can only update own items)
4. **Sanitization**: Test sensitive data exclusion (passwords, internal fields)
5. **Error Handling**: Test all NotFoundException and UnauthorizedException scenarios
6. **Microservice Communication**: Mock all inter-service HTTP calls
7. **Image Paths**: Test buildPublicFilePath() utility function
