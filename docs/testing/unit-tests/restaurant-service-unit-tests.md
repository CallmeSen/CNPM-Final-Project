# Restaurant Service - Unit Tests Documentation

> **Lưu ý**: Tài liệu này mô tả các unit tests cho Restaurant Service với các dependencies được mock

## Overview

Unit tests for Restaurant Service focusing on business logic isolation with mocked dependencies (MongoDB models, external services, JWT).

## Test Files

### 1. Restaurants Service Tests
- **Location**: `backend/restaurant-service/src/restaurants/restaurants.service.spec.ts`
- **Test Suite**: `RestaurantsService`
- **Test Framework**: Jest with NestJS Testing

### 2. Food Items Service Tests
- **Location**: `backend/restaurant-service/src/food-items/food-items.service.spec.ts`
- **Test Suite**: `FoodItemsService`
- **Test Framework**: Jest with NestJS Testing

### 3. Super Admin Service Tests
- **Location**: `backend/restaurant-service/src/super-admin/super-admin.service.spec.ts`
- **Test Suite**: `SuperAdminService`
- **Test Framework**: Jest with NestJS Testing

---

## RestaurantsService Unit Tests

### Mock Setup

#### Restaurant Model Mock
```typescript
const restaurantModelMock = {
  findById: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
};
```

#### Axios Mock (for Auth Service Integration)
```typescript
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
```

#### ConfigService Mock
```typescript
const configServiceMock = {
  get: jest.fn().mockReturnValue('http://localhost:5001'),
};
```

#### Test Restaurant Document
```typescript
const mockRestaurant = {
  _id: 'restaurant-123',
  name: 'Test Restaurant',
  ownerName: 'John Doe',
  location: 'Hanoi',
  contactNumber: '0912345678',
  profilePicture: '/uploads/restaurant.jpg',
  availability: true,
  admin: {
    email: 'restaurant@test.com',
  },
  createdAt: new Date(),
  updatedAt: new Date(),
};
```

---

### Test Suite: getProfile

#### ✅ Test: Fetches restaurant profile from auth-service successfully

**Purpose**: Verify successful profile retrieval from auth-service

**Setup**:
- Mock axios.get returns restaurant data from auth-service
- Restaurant ID: 'restaurant-123'

**Test Steps**:
1. Call `getProfile('restaurant-123')`
2. Verify axios.get called with correct URL
3. Verify response data formatted correctly

**Expected Result**:
```typescript
{
  id: 'restaurant-123',
  name: 'Test Restaurant',
  ownerName: 'John Doe',
  location: 'Hanoi',
  contactNumber: '0912345678',
  profilePicture: '/uploads/restaurant.jpg',
  availability: true,
  admin: {
    email: 'restaurant@test.com'
  }
}
```

**Assertions**:
- `axios.get` called with `http://localhost:5001/api/auth/restaurant/profile/restaurant-123`
- Result contains all required fields
- Profile picture path properly formatted

---

#### ❌ Test: Throws NotFoundException when restaurant not found

**Purpose**: Handle 404 error from auth-service

**Setup**:
- Mock axios.get rejects with 404 status
- Restaurant ID: 'nonexistent-id'

**Expected Error**:
```typescript
throw new NotFoundException('Restaurant not found')
```

**Assertions**:
- `axios.get` called once
- NotFoundException thrown
- Error message: 'Restaurant not found'

---

#### ❌ Test: Throws BadRequestException on auth-service error

**Purpose**: Handle other errors from auth-service

**Setup**:
- Mock axios.get rejects with 500 status

**Expected Error**:
```typescript
throw new BadRequestException('Failed to fetch restaurant profile from auth service')
```

---

### Test Suite: updateProfile

#### ⚠️ Test: Throws BadRequestException (feature not implemented)

**Purpose**: Verify update profile returns proper error message

**Setup**:
- Restaurant ID: 'restaurant-123'
- Update DTO with new data

**Expected Error**:
```typescript
throw new BadRequestException('Update profile feature will be available soon. Please contact auth-service admin.')
```

**Note**: This feature is pending implementation in auth-service

---

### Test Suite: updateAvailability

#### ⚠️ Test: Throws BadRequestException (feature not implemented)

**Purpose**: Verify availability update returns proper error message

**Setup**:
- Restaurant ID: 'restaurant-123'
- DTO: `{ availability: false }`

**Expected Error**:
```typescript
throw new BadRequestException('Update availability feature will be available soon. Please contact auth-service admin.')
```

---

### Test Suite: getRestaurantById

#### ✅ Test: Returns restaurant by ID via getProfile

**Purpose**: Verify getRestaurantById calls getProfile internally

**Setup**:
- Mock getProfile method
- Restaurant ID: 'restaurant-123'

**Test Steps**:
1. Call `getRestaurantById('restaurant-123')`
2. Verify getProfile called with same ID

**Assertions**:
- `getProfile` called once with 'restaurant-123'
- Result matches getProfile return value

---

## FoodItemsService Unit Tests

### Mock Setup

#### FoodItem Model Mock
```typescript
const foodItemModelMock = {
  findById: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  find: jest.fn(),
  save: jest.fn(),
};
```

#### Test Food Item Document
```typescript
const mockFoodItem = {
  _id: 'food-item-123',
  restaurant: 'restaurant-123',
  name: 'Pho Bo',
  description: 'Traditional Vietnamese beef noodle soup',
  price: 50000,
  category: 'Main Dish',
  image: '/uploads/pho.jpg',
  save: jest.fn().mockResolvedValue(this),
};
```

---

### Test Suite: create

#### ✅ Test: Creates food item successfully

**Purpose**: Verify food item creation with image upload

**Setup**:
- Restaurant exists in database
- DTO: CreateFoodItemDto with name, description, price, category
- File: image file uploaded

**Test Steps**:
1. Mock restaurantModel.findById returns restaurant
2. Call `create('restaurant-123', dto, file)`
3. Verify new FoodItem created with correct data
4. Verify save() called

**Expected Result**:
```typescript
{
  message: 'Food item created successfully',
  foodItem: {
    restaurant: 'restaurant-123',
    name: 'Pho Bo',
    description: 'Traditional Vietnamese beef noodle soup',
    price: 50000,
    category: 'Main Dish',
    image: '/uploads/pho.jpg'
  }
}
```

**Assertions**:
- `restaurantModel.findById` called with restaurant ID
- FoodItem constructor called with DTO data
- `save()` called on food item document
- Image path properly formatted

---

#### ❌ Test: Throws NotFoundException when restaurant not found

**Purpose**: Prevent creating food items for non-existent restaurants

**Setup**:
- Mock restaurantModel.findById returns null
- Restaurant ID: 'nonexistent-id'

**Expected Error**:
```typescript
throw new NotFoundException('Restaurant not found')
```

**Assertions**:
- `restaurantModel.findById` called once
- NotFoundException thrown
- save() NOT called

---

### Test Suite: findByRestaurant

#### ✅ Test: Returns all food items for a restaurant

**Purpose**: Verify retrieval of restaurant's food items

**Setup**:
- Restaurant ID: 'restaurant-123'
- Mock foodItemModel.find returns array of food items

**Test Steps**:
1. Call `findByRestaurant('restaurant-123')`
2. Verify find() called with restaurant filter

**Expected Result**:
```typescript
[
  { name: 'Pho Bo', price: 50000, ... },
  { name: 'Banh Mi', price: 25000, ... },
  { name: 'Bun Cha', price: 45000, ... }
]
```

**Assertions**:
- `foodItemModel.find` called with `{ restaurant: 'restaurant-123' }`
- Returns array of food items

---

### Test Suite: findById

#### ✅ Test: Returns food item by ID

**Purpose**: Verify single food item retrieval

**Setup**:
- Food item ID: 'food-item-123'
- Mock findById returns food item

**Test Steps**:
1. Call `findById('food-item-123')`
2. Verify findById called with ID

**Expected Result**:
```typescript
{
  _id: 'food-item-123',
  name: 'Pho Bo',
  price: 50000,
  ...
}
```

**Assertions**:
- `foodItemModel.findById` called with ID
- Returns food item document

---

#### ❌ Test: Throws NotFoundException when food item not found

**Purpose**: Handle non-existent food items

**Setup**:
- Mock findById returns null
- Food item ID: 'nonexistent-id'

**Expected Error**:
```typescript
throw new NotFoundException('Food item not found')
```

---

### Test Suite: update

#### ✅ Test: Updates food item successfully

**Purpose**: Verify food item update with authorization check

**Setup**:
- Food item exists and belongs to restaurant
- Restaurant ID: 'restaurant-123'
- Food item ID: 'food-item-123'
- Update DTO with new price
- New image file uploaded

**Test Steps**:
1. Mock findById returns food item owned by restaurant
2. Call `update('food-item-123', 'restaurant-123', dto, file)`
3. Verify ownership check
4. Verify findByIdAndUpdate called with new data

**Expected Result**:
```typescript
{
  message: 'Food item updated successfully',
  foodItem: {
    _id: 'food-item-123',
    price: 60000, // updated
    image: '/uploads/new-image.jpg', // updated
    ...
  }
}
```

**Assertions**:
- `foodItemModel.findById` called with food item ID
- Ownership verified: `foodItem.restaurant === restaurantId`
- `findByIdAndUpdate` called with update data
- New image path included in update

---

#### ❌ Test: Throws UnauthorizedException when restaurant doesn't own food item

**Purpose**: Prevent unauthorized updates

**Setup**:
- Food item belongs to different restaurant
- Restaurant ID: 'restaurant-123'
- Food item's restaurant: 'restaurant-456'

**Expected Error**:
```typescript
throw new UnauthorizedException('Not authorized to update this food item')
```

**Assertions**:
- Ownership check performed
- UnauthorizedException thrown
- Update NOT called

---

#### ❌ Test: Throws NotFoundException when food item not found

**Purpose**: Handle non-existent food items

**Setup**:
- Mock findById returns null

**Expected Error**:
```typescript
throw new NotFoundException('Food item not found')
```

---

### Test Suite: delete

#### ✅ Test: Deletes food item successfully

**Purpose**: Verify food item deletion with authorization

**Setup**:
- Food item exists and belongs to restaurant
- Restaurant ID: 'restaurant-123'
- Food item ID: 'food-item-123'

**Test Steps**:
1. Mock findById returns food item
2. Verify ownership
3. Call delete method
4. Verify findByIdAndDelete called

**Expected Result**:
```typescript
{
  message: 'Food item deleted successfully'
}
```

**Assertions**:
- Ownership verified
- `findByIdAndDelete` called with correct ID
- Success message returned

---

#### ❌ Test: Throws UnauthorizedException when not owned by restaurant

**Purpose**: Prevent unauthorized deletions

**Setup**:
- Food item belongs to different restaurant

**Expected Error**:
```typescript
throw new UnauthorizedException('Not authorized to delete this food item')
```

---

## SuperAdminService Unit Tests

### Mock Setup

#### SuperAdmin Model Mock
```typescript
const superAdminModelMock = {
  findById: jest.fn(),
  findOne: jest.fn(),
};
```

#### RestaurantsService Mock
```typescript
const restaurantsServiceMock = {
  getAllForAdmin: jest.fn(),
  getByIdForAdmin: jest.fn(),
  deleteByAdmin: jest.fn(),
  updateStatusByAdmin: jest.fn(),
};
```

---

### Test Suite: getAllRestaurants

#### ✅ Test: Returns all restaurants via RestaurantsService

**Purpose**: Verify super admin can list all restaurants

**Setup**:
- Mock RestaurantsService.getAllForAdmin returns array

**Test Steps**:
1. Call `getAllRestaurants()`
2. Verify delegation to RestaurantsService

**Expected Result**:
```typescript
[
  { id: '1', name: 'Restaurant A', ... },
  { id: '2', name: 'Restaurant B', ... }
]
```

**Assertions**:
- `restaurantsService.getAllForAdmin` called once
- Returns restaurant array

---

### Test Suite: getRestaurantById

#### ✅ Test: Returns restaurant by ID

**Purpose**: Verify super admin can view specific restaurant

**Setup**:
- Restaurant ID: 'restaurant-123'
- Mock getByIdForAdmin returns restaurant

**Test Steps**:
1. Call `getRestaurantById('restaurant-123')`
2. Verify delegation to RestaurantsService

**Expected Result**:
```typescript
{
  id: 'restaurant-123',
  name: 'Test Restaurant',
  ...
}
```

**Assertions**:
- `restaurantsService.getByIdForAdmin` called with ID
- Returns restaurant data

---

### Test Suite: deleteRestaurant

#### ✅ Test: Deletes restaurant successfully

**Purpose**: Verify super admin can delete restaurants

**Setup**:
- Restaurant ID: 'restaurant-123'
- Mock deleteByAdmin returns success message

**Test Steps**:
1. Call `deleteRestaurant('restaurant-123')`
2. Verify delegation to RestaurantsService

**Expected Result**:
```typescript
{
  message: 'Restaurant deleted successfully'
}
```

**Assertions**:
- `restaurantsService.deleteByAdmin` called with ID
- Success message returned

---

### Test Suite: updateRestaurantStatus

#### ✅ Test: Updates restaurant status to open

**Purpose**: Verify super admin can change restaurant availability

**Setup**:
- Restaurant ID: 'restaurant-123'
- Status: 'open'

**Test Steps**:
1. Call `updateRestaurantStatus('restaurant-123', 'open')`
2. Verify delegation with availability = true

**Expected Result**:
```typescript
{
  message: 'Availability updated successfully',
  availability: true
}
```

**Assertions**:
- `restaurantsService.updateStatusByAdmin` called with ID and 'open'
- Availability set to true

---

#### ✅ Test: Updates restaurant status to closed

**Purpose**: Verify status can be set to closed

**Setup**:
- Restaurant ID: 'restaurant-123'
- Status: 'closed'

**Expected Result**:
```typescript
{
  message: 'Availability updated successfully',
  availability: false
}
```

**Assertions**:
- Availability set to false when status is 'closed'

---

## Running Unit Tests

### Run All Restaurant Service Unit Tests
```bash
cd backend/restaurant-service
npm run test
```

### Run Specific Test File
```bash
npm run test -- restaurants.service.spec.ts
npm run test -- food-items.service.spec.ts
npm run test -- super-admin.service.spec.ts
```

### Run with Coverage
```bash
npm run test:cov
```

### Watch Mode
```bash
npm run test:watch
```

---

## Test Coverage Goals

| Module | Target Coverage |
|--------|----------------|
| RestaurantsService | ≥ 80% |
| FoodItemsService | ≥ 85% |
| SuperAdminService | ≥ 90% |
| Controllers | ≥ 75% |
| DTOs | 100% |

---

## Notes

### Auth Service Integration
- RestaurantsService delegates authentication to auth-service
- Tests mock axios calls to auth-service
- Actual authentication logic tested in auth-service unit tests

### Pending Features
Several features throw BadRequestException indicating future implementation:
- `updateProfile()` - pending auth-service API
- `updateAvailability()` - pending auth-service API
- `getPublicRestaurants()` - pending auth-service API
- `getAllRestaurants()` - pending auth-service API
- `deleteRestaurant()` - pending auth-service API

These should be updated when auth-service implements the corresponding endpoints.

### File Upload Testing
- Food item image uploads tested with multer file mock
- Profile picture uploads tested with file parameter
- Image paths verified using `buildPublicFilePath()` helper

### Authorization Testing
- FoodItemsService enforces restaurant ownership
- Unauthorized operations throw UnauthorizedException
- SuperAdminService has unrestricted access via separate methods
