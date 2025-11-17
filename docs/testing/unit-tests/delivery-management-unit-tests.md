# Delivery Management Service - Unit Tests Documentation

> **Lưu ý**: Tài liệu này được tạo dựa trên các test case thực tế trong file `delivery-management.service.spec.ts`

## File Test
- **Location**: `backend/auth-service/src/delivery-management/delivery-management.service.spec.ts`
- **Test Suite**: `DeliveryManagementService`
- **Test Framework**: Jest with NestJS Testing

---

## Mock Setup

### Delivery Model Mock
```typescript
deliveryModel = {
  find: jest.fn(),
  findOne: jest.fn(),
  findById: jest.fn(),
  findByIdAndDelete: jest.fn(),
  create: jest.fn(),
  countDocuments: jest.fn(),
  aggregate: jest.fn(),
};
```

### Test Document Creator
```typescript
const createDocument = (payload) => ({
  ...payload,
  save: jest.fn().mockResolvedValue(true),
  toObject: jest.fn().mockImplementation(() => {
    const { save, toObject, ...rest } = doc;
    return { ...rest };
  }),
});
```

---

## Test Suite: getAllDelivery

### ✅ Test: returns delivery personnel with applied filters

**Purpose**: Verify filtering logic

**Test Steps**:
1. Mock `find().select()` returns filtered documents
2. Call `getAllDelivery({ status: 'available', vehicleType: 'bike' })`
3. Verify filter transformation

**Input Filters**:
```typescript
{
  status: 'available',
  vehicleType: 'bike'
}
```

**Transformed Filters**:
```typescript
{
  isAvailable: true,  // status -> isAvailable
  vehicleType: 'bike'
}
```

**Assertions**:
- `find` được gọi với `{ isAvailable: true, vehicleType: 'bike' }`
- `select` được gọi (password field excluded)

---

## Test Suite: getDeliveryById

### ✅ Test: returns delivery personnel when found

**Test Steps**:
1. Mock `findById().select()` returns document
2. Call `getDeliveryById('2')`

**Assertions**:
- `findById` được gọi với '2'
- `select` được gọi để exclude password

---

### ❌ Test: throws when delivery personnel is missing

**Setup**: Mock `findById().select()` returns null

**Expected**: Throws `NotFoundException`

---

## Test Suite: createDelivery

### ✅ Test: creates delivery personnel and strips password

**Purpose**: Verify creation flow và password sanitization

**Input DTO**:
```typescript
{
  firstName: 'New',
  lastName: 'Driver',
  email: 'driver@example.com',
  phone: '123',
  password: 'secret123',
  vehicleType: 'bike',
  licenseNumber: 'ABC123',
}
```

**Test Steps**:
1. Mock `findOne` returns null (email chưa tồn tại)
2. Mock `create` returns document
3. Call `createDelivery(payload)`
4. Verify default location được thêm

**Expected Output**:
```typescript
{
  message: 'Delivery personnel created successfully',
  delivery: {
    firstName: 'New',
    lastName: 'Driver',
    email: 'driver@example.com',
    phone: '123',
    vehicleType: 'bike',
    licenseNumber: 'ABC123',
    currentLocation: {
      type: 'Point',
      coordinates: [0, 0]  // default location
    }
    // ⚠️ password field EXCLUDED
  }
}
```

**Assertions**:
- `findOne` được gọi với `{ email: 'driver@example.com' }`
- `create` được gọi với payload + default location
- Response không chứa password field

---

### ❌ Test: throws when email already exists

**Setup**: Mock `findOne` returns existing document

**Expected**: 
- Throws `BadRequestException`
- `create` không được gọi

---

## Test Suite: updateDelivery

### ✅ Test: updates provided fields and preserves password when empty string

**Purpose**: Verify partial update và password preservation

**Test Steps**:
1. Mock `findById().select()` returns document với password = 'hashed'
2. Call `updateDelivery('1', { firstName: 'Updated', password: '' })`
3. Verify password không bị overwrite

**Input**:
```typescript
{
  firstName: 'Updated',
  password: ''  // empty string should preserve existing password
}
```

**Expected Behavior**:
- `doc.firstName` = 'Updated'
- `doc.password` = 'hashed' (unchanged)
- `doc.save()` được gọi

**Assertions**:
- Chỉ firstName được update
- Password giữ nguyên giá trị cũ khi input là empty string
- `save()` được gọi

---

### ❌ Test: throws when delivery personnel is missing

**Setup**: Mock `findById().select()` returns null

**Expected**: Throws `NotFoundException`

---

## Test Suite: deleteDelivery

### ✅ Test: removes delivery personnel

**Test Steps**:
1. Mock `findByIdAndDelete` returns deleted document
2. Call `deleteDelivery('3')`

**Expected Output**:
```typescript
{
  message: 'Delivery personnel deleted successfully'
}
```

**Assertions**:
- `findByIdAndDelete` được gọi với '3'

---

### ❌ Test: throws when nothing is deleted

**Setup**: Mock `findByIdAndDelete` returns null

**Expected**: Throws `NotFoundException`

---

## Test Suite: updateLocation

### ✅ Test: updates location coordinates

**Purpose**: Verify GPS location update

**Test Steps**:
1. Mock `findById` returns document với location `[0, 0]`
2. Call `updateLocation('4', { latitude: 10, longitude: 20 })`
3. Verify coordinate order (lng, lat)

**Input**:
```typescript
{
  latitude: 10,
  longitude: 20
}
```

**Expected Coordinates**: `[20, 10]` (longitude trước, latitude sau - GeoJSON format)

**Assertions**:
- `doc.currentLocation.coordinates` = `[20, 10]`
- `doc.save()` được gọi

---

### ❌ Test: throws when delivery personnel is missing

**Setup**: Mock `findById` returns null

**Expected**: Throws `NotFoundException`

---

## Test Suite: toggleAvailability

### ✅ Test: flips availability flag

**Purpose**: Verify toggle logic

**Test Steps**:
1. Mock `findById` returns document với `isAvailable: true`
2. Call `toggleAvailability('5')`
3. Verify flag flipped

**Expected Behavior**:
- `doc.isAvailable` changes from `true` to `false`
- `doc.save()` được gọi

---

## Test Suite: getDeliveryStats

### ✅ Test: aggregates metrics from the collection

**Purpose**: Verify statistics calculation

**Test Steps**:
1. Mock `countDocuments` returns total và available counts
2. Mock `aggregate` returns vehicle stats và average rating
3. Mock `find().select().sort().limit()` returns top performers
4. Call `getDeliveryStats()`

**Expected Output**:
```typescript
{
  totalDelivery: 10,
  availableDelivery: 6,
  busyDelivery: 4,  // calculated: total - available
  vehicleStats: [{ _id: 'bike', count: 4 }],
  averageRating: 4.5,
  topPerformers: [{ id: 'top' }]
}
```

**Assertions**:
- `countDocuments` được gọi 2 lần:
  1. Không filter → total count
  2. Filter `{ isAvailable: true }` → available count
- `aggregate` được gọi 2 lần (vehicle stats và rating)
- Busy count được tính: totalDelivery - availableDelivery

---

## Test Suite: findNearbyDelivery

### ✅ Test: returns available riders ordered by proximity

**Purpose**: Verify geospatial query

**Test Steps**:
1. Mock `find().select().limit()` returns nearby riders
2. Call `findNearbyDelivery({ longitude: '20', latitude: '10', maxDistance: '1000' })`
3. Verify geo query structure

**Input**:
```typescript
{
  longitude: '20',
  latitude: '10',
  maxDistance: '1000'
}
```

**Expected Query**:
```typescript
{
  isAvailable: true,
  currentLocation: {
    $near: {
      $geometry: {
        type: 'Point',
        coordinates: [20, 10]  // lng, lat
      },
      $maxDistance: 1000
    }
  }
}
```

**Assertions**:
- `find` được gọi với geo query
- `select('-password')` được gọi
- `limit(10)` được gọi (default limit)

---

### ❌ Test: throws when coordinates are invalid

**Input**:
```typescript
{
  longitude: 'abc',
  latitude: 'xyz',
  maxDistance: '1000'
}
```

**Expected**: Throws `BadRequestException`

---

## Test Statistics

| Test Suite | Total Tests | ✅ Pass | ❌ Fail Expected |
|-----------|-------------|---------|------------------|
| getAllDelivery | 1 | 1 | 0 |
| getDeliveryById | 2 | 1 | 1 |
| createDelivery | 2 | 1 | 1 |
| updateDelivery | 2 | 1 | 1 |
| deleteDelivery | 2 | 1 | 1 |
| updateLocation | 2 | 1 | 1 |
| toggleAvailability | 1 | 1 | 0 |
| getDeliveryStats | 1 | 1 | 0 |
| findNearbyDelivery | 2 | 1 | 1 |
| **TOTAL** | **15** | **9** | **6** |

---

## Running Tests

```bash
cd backend/auth-service
npm test -- delivery-management.service.spec.ts

# Watch mode
npm test -- --watch delivery-management.service.spec.ts
```

---

## Key Testing Patterns

1. **GeoJSON Format**: Coordinates luôn là `[longitude, latitude]` (lng trước)
2. **Password Sanitization**: Response không bao giờ chứa password
3. **Empty String Handling**: Empty password string preserves existing value
4. **Default Location**: New delivery personnel có location `[0, 0]`
5. **Geospatial Query**: Use `$near` với `$maxDistance` cho proximity search
6. **Toggle Logic**: isAvailable flips true ↔ false
7. **Stats Calculation**: Busy count = total - available
