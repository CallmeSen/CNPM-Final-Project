# Restaurant Service - Integration Tests

## Overview
Integration tests for Restaurant Service with real MongoDB database, multer file uploads, and HTTP API integration with auth-service.

---

## Environment Setup

### Test Configuration
```typescript
const testConfig = {
  mongoUri: process.env.MONGO_TEST_URI || 'mongodb://localhost:27017/restaurant-service-test',
  authServiceUrl: process.env.AUTH_SERVICE_URL || 'http://localhost:5001',
  uploadDir: './test-uploads',
  maxFileSize: 5 * 1024 * 1024, // 5MB
};
```

### Database Lifecycle
- **Before All**: Connect to test MongoDB, create upload directory
- **Before Each**: Clear restaurants and food-items collections, seed test data
- **After Each**: Delete uploaded files
- **After All**: Drop test database, remove upload directory

---

## API Endpoint Integration Tests

### Test Suite: GET /api/restaurants (Public - All Restaurants)

#### ✅ Test: Returns all restaurants
**Purpose**: Public restaurant listing

**Setup**:
1. Create 5 test restaurants via auth-service
2. Sync restaurant profiles to restaurant-service DB

**Test Steps**:
```typescript
GET /api/restaurants
```

**Expected Response**:
```typescript
{
  restaurants: [
    {
      id: 'RESTAURANT1',
      name: 'Italian Restaurant',
      ownerName: 'Owner 1',
      location: 'New York, NY',
      contactNumber: '+1234567890',
      profilePicture: '/uploads/restaurant1.jpg',
      availability: true
    },
    // ... 4 more restaurants
  ]
}
```

**Assertions**:
```typescript
expect(response.status).toBe(200);
expect(response.body.restaurants).toHaveLength(5);
expect(response.body.restaurants[0]).toHaveProperty('id');
expect(response.body.restaurants[0]).not.toHaveProperty('password');
```

---

### Test Suite: GET /api/restaurants/:id

#### ✅ Test: Returns restaurant by ID
**Purpose**: Public restaurant details

**Setup**: Create test restaurant

**Test Steps**:
```typescript
GET /api/restaurants/RESTAURANT123
```

**Expected Response**:
```typescript
{
  id: 'RESTAURANT123',
  name: 'Test Restaurant',
  ownerName: 'John Doe',
  location: 'Los Angeles, CA',
  contactNumber: '+0987654321',
  profilePicture: '/uploads/restaurant.jpg',
  availability: true,
  admin: {
    email: 'restaurant@example.com'
  },
  createdAt: '2024-01-15T10:00:00Z'
}
```

---

#### ❌ Test: Returns 404 for non-existent restaurant
**Expected Status**: 404 Not Found

---

### Test Suite: GET /api/restaurants/profile (Authenticated - Own Profile)

#### ✅ Test: Restaurant fetches own profile via auth-service
**Purpose**: Profile management

**Setup**:
1. Register restaurant via auth-service
2. Login to get JWT token
3. Verify token in restaurant-service

**Test Steps**:
```typescript
GET /api/restaurants/profile
Headers: { Authorization: 'Bearer <restaurant_token>' }
```

**Expected Flow**:
1. restaurant-service extracts restaurant ID from JWT
2. HTTP call to auth-service: GET /api/auth/restaurant/profile/:id
3. Profile data returned

**HTTP Integration Verification**:
```typescript
// Mock or spy on axios
const axiosSpy = jest.spyOn(axios, 'get');

await request(app)
  .get('/api/restaurants/profile')
  .set('Authorization', `Bearer ${restaurantToken}`);

expect(axiosSpy).toHaveBeenCalledWith(
  'http://localhost:5001/api/auth/restaurant/profile/RESTAURANT123'
);
```

**Expected Response**:
```typescript
{
  id: 'RESTAURANT123',
  name: 'My Restaurant',
  ownerName: 'John Doe',
  location: 'Boston, MA',
  contactNumber: '+1122334455',
  profilePicture: '/uploads/my-restaurant.jpg',
  availability: true,
  admin: {
    email: 'myrestaurant@example.com'
  }
}
```

---

#### ❌ Test: Fails without authentication
**Setup**: No JWT token

**Expected Status**: 401 Unauthorized

---

### Test Suite: PATCH /api/restaurants/:id

#### ✅ Test: Updates restaurant profile with image upload
**Purpose**: Profile editing

**Setup**:
1. Create restaurant
2. Login as restaurant owner

**Test Steps**:
```typescript
PATCH /api/restaurants/RESTAURANT123
Headers: { 
  Authorization: 'Bearer <restaurant_token>',
  'Content-Type': 'multipart/form-data'
}
FormData: {
  name: 'Updated Restaurant Name',
  location: 'New Address',
  contactNumber: '+9999999999',
  profilePicture: <image file>
}
```

**File Upload Verification**:
```typescript
// Check file saved to disk
const uploadedFiles = fs.readdirSync('./test-uploads');
expect(uploadedFiles).toHaveLength(1);

const filePath = path.join('./test-uploads', uploadedFiles[0]);
expect(fs.existsSync(filePath)).toBe(true);
```

**Database Verification**:
```typescript
const restaurant = await Restaurant.findById('RESTAURANT123');
expect(restaurant.name).toBe('Updated Restaurant Name');
expect(restaurant.location).toBe('New Address');
expect(restaurant.profilePicture).toMatch(/^\/uploads\/.+\.(jpg|png)$/);
```

**Expected Response**:
```typescript
{
  message: 'Restaurant updated successfully',
  restaurant: {
    id: 'RESTAURANT123',
    name: 'Updated Restaurant Name',
    location: 'New Address',
    profilePicture: '/uploads/restaurant-1234567890.jpg',
    // ... other fields
  }
}
```

---

#### ✅ Test: Updates without profile picture
**Setup**: Only update text fields

**Expected**: Update succeeds, existing profilePicture unchanged

---

#### ❌ Test: Rejects invalid file types
**Test Cases**:
```typescript
// Valid
.jpg ✓
.jpeg ✓
.png ✓

// Invalid
.txt ✗ 400 Bad Request
.pdf ✗ 400 Bad Request
.exe ✗ 400 Bad Request
```

**Expected Error**: "Only image files are allowed"

---

#### ❌ Test: Rejects files exceeding size limit
**Setup**: Upload 10MB file (limit is 5MB)

**Expected Status**: 413 Payload Too Large

---

#### ❌ Test: Restaurant cannot update another restaurant's profile
**Setup**:
1. Login as restaurant A
2. Attempt to update restaurant B

**Expected Status**: 403 Forbidden

---

### Test Suite: PATCH /api/restaurants/:id/availability

#### ✅ Test: Toggles restaurant availability
**Purpose**: Open/close restaurant

**Test Steps**:
```typescript
PATCH /api/restaurants/RESTAURANT123/availability
Headers: { Authorization: 'Bearer <restaurant_token>' }
Body: { availability: false }
```

**Database Verification**:
```typescript
const restaurant = await Restaurant.findById('RESTAURANT123');
expect(restaurant.availability).toBe(false);
```

**Expected Response**:
```typescript
{
  message: 'Availability updated',
  availability: false
}
```

---

#### ✅ Test: Availability change affects public listing
**Test Steps**:
1. Set restaurant availability to false
2. Query public restaurant list
3. Verify restaurant still appears but marked as unavailable

---

## Food Items API Integration Tests

### Test Suite: POST /api/food-items

#### ✅ Test: Restaurant creates food item with image
**Purpose**: Menu management

**Setup**:
1. Login as restaurant
2. Prepare test food image

**Test Steps**:
```typescript
POST /api/food-items
Headers: { 
  Authorization: 'Bearer <restaurant_token>',
  'Content-Type': 'multipart/form-data'
}
FormData: {
  name: 'Margherita Pizza',
  description: 'Classic Italian pizza',
  price: 12.99,
  category: 'Pizza',
  image: <pizza.jpg>
}
```

**Expected Response**:
```typescript
{
  message: 'Food item created successfully',
  foodItem: {
    _id: 'FOOD123',
    restaurant: 'RESTAURANT123',
    name: 'Margherita Pizza',
    description: 'Classic Italian pizza',
    price: 12.99,
    category: 'Pizza',
    image: '/uploads/pizza-1234567890.jpg',
    createdAt: '2024-01-15T10:00:00Z'
  }
}
```

**File Upload Verification**:
```typescript
const imagePath = foodItem.image.replace('/uploads/', '');
const fullPath = path.join('./test-uploads', imagePath);
expect(fs.existsSync(fullPath)).toBe(true);
```

**Database Verification**:
```typescript
const dbFoodItem = await FoodItem.findById('FOOD123');
expect(dbFoodItem.restaurant.toString()).toBe('RESTAURANT123');
expect(dbFoodItem.price).toBe(12.99);
```

---

#### ✅ Test: Creates food item without image
**Expected**: Food item created with undefined image field

---

#### ❌ Test: Fails without restaurant authentication
**Expected Status**: 401 Unauthorized

---

### Test Suite: GET /api/food-items/restaurant/:restaurantId

#### ✅ Test: Returns all food items for restaurant
**Purpose**: Public menu viewing

**Setup**:
1. Create restaurant
2. Create 10 food items for restaurant
3. Create 5 food items for different restaurant

**Test Steps**:
```typescript
GET /api/food-items/restaurant/RESTAURANT123
```

**Expected Response**: Array of 10 food items

**Assertions**:
```typescript
expect(response.status).toBe(200);
expect(response.body.foodItems).toHaveLength(10);
response.body.foodItems.forEach(item => {
  expect(item.restaurant).toBe('RESTAURANT123');
});
```

---

### Test Suite: PUT /api/food-items/:id

#### ✅ Test: Updates food item
**Purpose**: Menu item editing

**Setup**:
1. Create food item
2. Login as restaurant owner

**Test Steps**:
```typescript
PUT /api/food-items/FOOD123
Headers: { Authorization: 'Bearer <restaurant_token>' }
Body: {
  name: 'Updated Pizza Name',
  price: 14.99
}
```

**Expected Response**:
```typescript
{
  message: 'Food item updated successfully',
  foodItem: {
    _id: 'FOOD123',
    name: 'Updated Pizza Name',
    price: 14.99,
    // ... other fields
  }
}
```

---

#### ❌ Test: Restaurant cannot update another restaurant's food item
**Setup**:
1. Restaurant A creates food item
2. Restaurant B attempts to update it

**Expected Status**: 403 Forbidden

**Expected Error**: "Not authorized to update this food item"

---

### Test Suite: DELETE /api/food-items/:id

#### ✅ Test: Deletes food item
**Purpose**: Remove menu item

**Test Steps**:
```typescript
DELETE /api/food-items/FOOD123
Headers: { Authorization: 'Bearer <restaurant_token>' }
```

**Database Verification**:
```typescript
const foodItem = await FoodItem.findById('FOOD123');
expect(foodItem).toBeNull();
```

**File Cleanup Verification**:
```typescript
// Verify image file also deleted (if implemented)
const imagePath = './test-uploads/pizza-1234567890.jpg';
expect(fs.existsSync(imagePath)).toBe(false);
```

---

#### ❌ Test: Cannot delete another restaurant's food item
**Expected Status**: 403 Forbidden

---

## SuperAdmin API Integration Tests

### Test Suite: GET /api/superadmin/restaurants

#### ✅ Test: SuperAdmin fetches all restaurants
**Purpose**: Admin dashboard

**Setup**:
1. Register superadmin via auth-service
2. Create multiple restaurants
3. Login as superadmin

**Test Steps**:
```typescript
GET /api/superadmin/restaurants
Headers: { Authorization: 'Bearer <superadmin_token>' }
```

**Expected Response**: All restaurants with full details

**Assertions**:
```typescript
expect(response.body.restaurants.length).toBeGreaterThan(0);
// SuperAdmin sees all data, including sensitive fields (if any)
```

---

#### ❌ Test: Regular restaurant cannot access superadmin endpoint
**Setup**: Login as restaurant

**Expected Status**: 403 Forbidden

---

### Test Suite: PATCH /api/superadmin/restaurants/:id/status

#### ✅ Test: SuperAdmin disables restaurant
**Purpose**: Admin moderation

**Test Steps**:
```typescript
PATCH /api/superadmin/restaurants/RESTAURANT123/status
Headers: { Authorization: 'Bearer <superadmin_token>' }
Body: { availability: false }
```

**Expected**: Restaurant availability set to false

**Public Visibility Test**:
```typescript
// Verify change visible in public API
const publicResponse = await request(app).get('/api/restaurants');
const restaurant = publicResponse.body.restaurants.find(
  r => r.id === 'RESTAURANT123'
);
expect(restaurant.availability).toBe(false);
```

---

## Microservice Integration Tests

### Test Suite: Integration with Auth Service

#### ✅ Test: Restaurant profile fetched from auth-service
**Purpose**: Cross-service data access

**Test Steps**:
1. Register restaurant via auth-service
2. restaurant-service calls auth-service to get profile
3. Verify correct data returned

**HTTP Call Verification**:
```typescript
// Use real HTTP client (axios), not mock
const profile = await restaurantsService.getProfile('RESTAURANT123');

expect(profile.id).toBe('RESTAURANT123');
expect(profile.email).toBe('restaurant@example.com');
```

**Error Handling**:
```typescript
// Auth service down
mockAuthService.stop();
await expect(
  restaurantsService.getProfile('RESTAURANT123')
).rejects.toThrow('Failed to fetch restaurant profile from auth service');

// Restaurant not found in auth service
await expect(
  restaurantsService.getProfile('INVALID_ID')
).rejects.toThrow('Restaurant not found');
```

---

### Test Suite: Integration with Order Service

#### ✅ Test: Order service queries restaurant data
**Purpose**: Order creation validates restaurant exists

**Scenario**:
1. Customer creates order via order-service
2. order-service calls restaurant-service to validate restaurant
3. restaurant-service returns restaurant data

**Mock Order Service Call**:
```typescript
// Simulate order-service calling restaurant-service
const response = await axios.get(
  'http://localhost:5002/api/restaurants/RESTAURANT123'
);

expect(response.status).toBe(200);
expect(response.data.id).toBe('RESTAURANT123');
expect(response.data.availability).toBe(true);
```

---

## File Upload Tests

### Test Suite: Image Upload Security

#### ❌ Test: Rejects malicious file uploads
**Purpose**: Security testing

**Test Cases**:
```typescript
// Fake image with .exe content
filename: 'image.jpg'
content: <executable binary>
Expected: 400 Bad Request (file type detection)

// Path traversal attempt
filename: '../../etc/passwd'
Expected: 400 Bad Request (filename sanitization)

// XXE attack in SVG
filename: 'image.svg'
content: <svg with external entity>
Expected: 400 Bad Request (SVG not allowed) or sanitized
```

---

#### ✅ Test: Image optimization
**Purpose**: Performance - resize large images

**Setup**: Upload 10MB image

**Expected**:
- Image resized to max 1920x1080
- File size reduced
- Quality maintained

---

### Test Suite: Static File Serving

#### ✅ Test: Uploaded images accessible via public URL
**Purpose**: Image serving

**Test Steps**:
1. Upload restaurant profile picture
2. Extract image URL from response
3. Request image via HTTP

**Expected**:
```typescript
const imageUrl = restaurant.profilePicture; // /uploads/restaurant.jpg

const imageResponse = await request(app).get(imageUrl);
expect(imageResponse.status).toBe(200);
expect(imageResponse.headers['content-type']).toMatch(/image/);
```

---

## Performance Tests

### Test Suite: High Load Scenarios

#### ✅ Test: Concurrent food item creations
**Purpose**: Test concurrent uploads

**Test Steps**:
```typescript
const uploads = Array.from({ length: 50 }, (_, i) =>
  createFoodItem({
    name: `Food ${i}`,
    price: 10,
    image: testImage
  })
);

const results = await Promise.all(uploads);
expect(results.every(r => r.status === 201)).toBe(true);

// Verify all files saved
const files = fs.readdirSync('./test-uploads');
expect(files).toHaveLength(50);
```

---

## Testing Utilities

### Helper Functions
```typescript
// Create test restaurant
async function createTestRestaurant(overrides = {}): Promise<Restaurant> {
  const restaurant = await axios.post(
    'http://localhost:5001/api/auth/restaurant/register',
    {
      email: 'test@restaurant.com',
      password: 'password123',
      name: 'Test Restaurant',
      ...overrides
    }
  );
  return restaurant.data;
}

// Upload test file
function createTestFile(filename: string): Express.Multer.File {
  const buffer = fs.readFileSync(`./test-assets/${filename}`);
  return {
    fieldname: 'image',
    originalname: filename,
    encoding: '7bit',
    mimetype: 'image/jpeg',
    buffer,
    size: buffer.length,
  } as any;
}
```

---

## Running Integration Tests

```bash
# Start dependent services
docker-compose up -d auth-service mongodb

# Set test environment
export MONGO_TEST_URI=mongodb://localhost:27017/restaurant-test
export AUTH_SERVICE_URL=http://localhost:5001

# Run tests
cd backend/restaurant-service
npm run test:e2e

# With coverage
npm run test:e2e:cov

# Cleanup
rm -rf test-uploads
docker-compose down -v
```

---

## Test Coverage Targets

| Category | Target |
|----------|--------|
| Restaurant CRUD | 95% |
| Food Items CRUD | 95% |
| File Uploads | 90% |
| Auth Integration | 90% |
| Authorization | 100% |

---

## Best Practices

1. **File Uploads**: Test with real files, clean up after tests
2. **Authorization**: Test ownership checks thoroughly (restaurant can only edit own data)
3. **Microservice Communication**: Use real HTTP calls to auth-service in integration tests
4. **Image Validation**: Test file type detection and size limits
5. **Public APIs**: Test both authenticated and public endpoints
6. **Database State**: Ensure clean state between tests
7. **Error Scenarios**: Test auth-service downtime and 404 responses
