# Delivery Management Service - Unit Tests

## Overview
Unit tests for Delivery Management Service with mocked Mongoose models and isolated business logic testing.

---

## DeliveryManagementService Unit Tests

### Test Suite: getAllDelivery

#### ✅ Test: Returns delivery personnel with applied filters
**Purpose**: Verify query filtering logic

**Setup**:
- Mock deliveryModel.find() with filter query
- Mock select() chain

**Test Steps**:
1. Call `getAllDelivery({ status: 'available', vehicleType: 'bike' })`
2. Verify find() called with correct filter
3. Verify select() excludes password

**Expected Filter**:
```typescript
{
  isAvailable: true,
  vehicleType: 'bike'
}
```

**Assertions**:
- `deliveryModel.find` called with transformed filters
- `select('-password')` called
- Returns array of delivery personnel

---

### Test Suite: getDeliveryById

#### ✅ Test: Returns delivery personnel when found
**Purpose**: Fetch single delivery person

**Setup**:
- Mock findById() returns delivery document

**Expected Result**: Delivery personnel object without password

**Assertions**:
- `findById` called with correct ID
- Password field excluded

---

#### ❌ Test: Throws when delivery personnel is missing
**Setup**:
- Mock findById() returns null

**Expected Error**: `NotFoundException: 'Delivery personnel not found'`

---

### Test Suite: createDelivery

#### ✅ Test: Creates delivery personnel and strips password
**Purpose**: Verify creation and data sanitization

**Setup**:
- Mock deliveryModel.create() returns new document

**Test Steps**:
1. Call `createDelivery(dto)`
2. Verify create() called with DTO
3. Verify password excluded from response

**Expected Result**:
```typescript
{
  id: 'delivery-id',
  firstName: 'John',
  lastName: 'Rider',
  email: 'rider@example.com',
  phone: '1234567890',
  vehicleType: 'bike',
  vehicleNumber: 'ABC123',
  licenseNumber: 'LIC123',
  isAvailable: true,
  currentLocation: { lat: 0, lng: 0 }
}
```

**Assertions**:
- `create` called once
- Password field stripped from response
- All other fields present

---

#### ❌ Test: Throws when email already exists
**Setup**:
- Mock findOne() returns existing delivery personnel
- Mock create() throws duplicate key error

**Expected Error**: `ConflictException` or Mongoose duplicate error

---

### Test Suite: updateDelivery

#### ✅ Test: Updates provided fields and preserves password when empty string
**Purpose**: Partial update with password handling

**Setup**:
- Mock findById() returns existing delivery personnel
- Mock save() persists changes

**Test Steps**:
1. Call `updateDelivery(id, { firstName: 'Updated', password: '' })`
2. Verify firstName updated
3. Verify password NOT updated when empty string

**Expected Behavior**:
- Only specified fields updated
- Empty password ignored
- save() called on document

**Assertions**:
- Document modified correctly
- Password unchanged when empty
- Updated document returned

---

#### ❌ Test: Throws when delivery personnel is missing
**Expected Error**: `NotFoundException`

---

### Test Suite: deleteDelivery

#### ✅ Test: Removes delivery personnel
**Purpose**: Verify deletion

**Setup**:
- Mock findByIdAndDelete() returns deleted document

**Expected Result**:
```typescript
{
  message: 'Delivery personnel deleted successfully'
}
```

**Assertions**:
- `findByIdAndDelete` called with correct ID
- Success message returned

---

#### ❌ Test: Throws when nothing is deleted
**Setup**:
- Mock findByIdAndDelete() returns null

**Expected Error**: `NotFoundException: 'Delivery personnel not found'`

---

### Test Suite: updateLocation

#### ✅ Test: Updates location coordinates
**Purpose**: GPS tracking update

**Setup**:
- Mock findById() returns delivery personnel

**Test Steps**:
1. Call `updateLocation(id, { latitude: 40.7128, longitude: -74.0060 })`
2. Verify currentLocation.coordinates updated

**Expected Result**:
```typescript
{
  currentLocation: {
    type: 'Point',
    coordinates: [-74.0060, 40.7128] // [lng, lat] GeoJSON format
  }
}
```

**Assertions**:
- Coordinates updated in correct order [lng, lat]
- save() called
- Updated document returned

---

#### ❌ Test: Throws when delivery personnel is missing
**Expected Error**: `NotFoundException`

---

### Test Suite: toggleAvailability

#### ✅ Test: Flips availability flag
**Purpose**: Toggle online/offline status

**Setup**:
- Mock findById() returns delivery personnel with isAvailable=true

**Test Steps**:
1. Call `toggleAvailability(id, { isAvailable: false })`
2. Verify flag toggled

**Expected Result**:
```typescript
{
  message: 'Availability updated',
  isAvailable: false
}
```

**Assertions**:
- `isAvailable` updated
- save() called

---

### Test Suite: getDeliveryStats

#### ✅ Test: Aggregates metrics from the collection
**Purpose**: Dashboard statistics

**Setup**:
- Mock aggregate() returns statistics

**Expected Result**:
```typescript
{
  total: 50,
  available: 30,
  busy: 15,
  offline: 5,
  byVehicleType: {
    bike: 25,
    car: 15,
    scooter: 10
  }
}
```

**Assertions**:
- Aggregate pipeline constructed correctly
- Statistics calculated

---

### Test Suite: findNearbyDelivery

#### ✅ Test: Returns available riders ordered by proximity
**Purpose**: Geospatial query for nearest delivery personnel

**Setup**:
- Mock aggregate() with $geoNear pipeline
- Mock returns sorted delivery personnel

**Test Steps**:
1. Call `findNearbyDelivery({ latitude: 40.7128, longitude: -74.0060, maxDistance: 5000 })`
2. Verify $geoNear query parameters
3. Verify distance calculated

**Expected Query**:
```typescript
{
  $geoNear: {
    near: {
      type: 'Point',
      coordinates: [-74.0060, 40.7128]
    },
    distanceField: 'distance',
    maxDistance: 5000,
    query: { isAvailable: true },
    spherical: true
  }
}
```

**Expected Result**: Array of delivery personnel sorted by distance

**Assertions**:
- GeoNear query constructed correctly
- Only available personnel returned
- Results sorted by proximity

---

#### ❌ Test: Throws when coordinates are invalid
**Purpose**: Input validation

**Test Steps**:
1. Call with invalid coordinates (lat > 90 or lng > 180)

**Expected Error**: `BadRequestException: 'Invalid coordinates'`

---

## Mock Strategy

### DeliveryPersonnel Model Mock
```typescript
const createMockModel = (): MockModel => ({
  find: jest.fn(),
  findOne: jest.fn(),
  findById: jest.fn(),
  findByIdAndDelete: jest.fn(),
  create: jest.fn(),
  countDocuments: jest.fn(),
  aggregate: jest.fn(),
});
```

### Document Mock with Methods
```typescript
const createDocument = (payload: Record<string, unknown>) => {
  const doc: any = {
    ...payload,
    save: jest.fn().mockResolvedValue(true),
    toObject: jest.fn().mockImplementation(() => {
      const { save, toObject, ...rest } = doc;
      return { ...rest };
    }),
  };
  return doc;
};
```

---

## Test Coverage

| Module | Statements | Branches | Functions | Lines |
|--------|-----------|----------|-----------|-------|
| DeliveryManagementService | 91.15% | 76.47% | 100% | 92.52% |
| DeliveryManagementController | 100% | 100% | 100% | 100% |
| DTOs | 100% | 100% | 100% | 100% |

---

## Running Tests

```bash
cd backend/auth-service
npm test -- delivery-management.service.spec.ts

# With coverage
npm test -- --coverage delivery-management.service.spec.ts

# Watch mode
npm test -- --watch delivery-management
```

---

## Best Practices

1. **Chain Mocking**: Mock Mongoose query chains (find().select())
2. **Document Methods**: Mock save(), toObject() on documents
3. **Geospatial Testing**: Verify coordinate order [lng, lat]
4. **Password Handling**: Always exclude from responses
5. **Error Scenarios**: Test all NotFoundException cases
6. **Aggregation**: Verify pipeline stages in aggregate queries
