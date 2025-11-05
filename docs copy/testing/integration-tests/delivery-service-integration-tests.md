# Delivery Management Service - Integration Tests

## Overview
Integration tests for Delivery Management Service with real MongoDB database, Socket.IO real-time communication, and geospatial queries.

---

## Environment Setup

### Test Configuration
```typescript
const testConfig = {
  mongoUri: process.env.MONGO_TEST_URI || 'mongodb://localhost:27017/delivery-service-test',
  socketPort: process.env.SOCKET_PORT || 5003,
  orderServiceUrl: 'http://localhost:5005',
  authServiceUrl: 'http://localhost:5001',
};
```

### MongoDB Geospatial Setup
```typescript
// Ensure 2dsphere index created for location queries
await DeliveryPersonnel.collection.createIndex({ location: '2dsphere' });
await Delivery.collection.createIndex({ pickupLocation: '2dsphere' });
await Delivery.collection.createIndex({ dropoffLocation: '2dsphere' });
```

### Database Lifecycle
- **Before All**: Connect to test database, create geospatial indexes
- **Before Each**: Clear deliveries and delivery-personnel collections
- **After Each**: Disconnect Socket.IO clients
- **After All**: Drop test database, close connections

---

## API Endpoint Integration Tests

### Test Suite: POST /api/delivery-personnel

#### ✅ Test: Registers new delivery personnel
**Purpose**: Onboard delivery driver

**Test Steps**:
```typescript
POST /api/delivery-personnel
Body: {
  name: 'John Driver',
  email: 'driver@example.com',
  phone: '+1234567890',
  vehicleType: 'Motorcycle',
  vehicleNumber: 'ABC-1234',
  location: {
    type: 'Point',
    coordinates: [-73.935242, 40.730610] // [longitude, latitude]
  }
}
```

**Expected Response**:
```typescript
{
  _id: 'DRIVER123',
  name: 'John Driver',
  email: 'driver@example.com',
  phone: '+1234567890',
  vehicleType: 'Motorcycle',
  vehicleNumber: 'ABC-1234',
  location: {
    type: 'Point',
    coordinates: [-73.935242, 40.730610]
  },
  status: 'available',
  isActive: true,
  createdAt: '2024-01-15T10:00:00Z'
}
```

**Database Verification**:
```typescript
const driver = await DeliveryPersonnel.findById('DRIVER123');
expect(driver.location.type).toBe('Point');
expect(driver.location.coordinates).toHaveLength(2);
expect(driver.status).toBe('available');
```

**Geospatial Index Verification**:
```typescript
const indexes = await DeliveryPersonnel.collection.getIndexes();
expect(indexes.location_2dsphere).toBeDefined();
```

---

#### ❌ Test: Fails with invalid coordinates
**Test Cases**:
```typescript
// Longitude out of range
coordinates: [181, 40] → 400 Bad Request

// Latitude out of range
coordinates: [-73, 91] → 400 Bad Request

// Invalid format
coordinates: [40, -73] → Error (lat/lng swapped - common mistake)
```

**Expected Error**: "Invalid coordinates: longitude must be between -180 and 180, latitude between -90 and 90"

---

### Test Suite: GET /api/delivery-personnel

#### ✅ Test: Returns all delivery personnel
**Purpose**: Admin dashboard

**Setup**: Create 10 delivery personnel

**Expected Response**: Array of 10 drivers

**Assertions**:
```typescript
expect(response.body.deliveryPersonnel).toHaveLength(10);
response.body.deliveryPersonnel.forEach(driver => {
  expect(driver).toHaveProperty('location');
  expect(driver.location.coordinates).toHaveLength(2);
});
```

---

### Test Suite: GET /api/delivery-personnel/available

#### ✅ Test: Returns only available drivers
**Purpose**: Delivery assignment

**Setup**:
- Create 5 available drivers
- Create 3 busy drivers
- Create 2 offline drivers

**Expected Response**: Only 5 available drivers

**Assertions**:
```typescript
expect(response.body.available).toHaveLength(5);
response.body.available.forEach(driver => {
  expect(driver.status).toBe('available');
  expect(driver.isActive).toBe(true);
});
```

---

### Test Suite: GET /api/delivery-personnel/nearby

#### ✅ Test: Finds nearby drivers using geospatial query
**Purpose**: Location-based driver search

**Setup**:
- Create driver at [longitude: -73.935242, latitude: 40.730610] (NYC Times Square)
- Create driver at [longitude: -73.984016, latitude: 40.758896] (NYC Central Park West)
- Create driver at [longitude: -118.243683, latitude: 34.052235] (LA - far away)

**Test Steps**:
```typescript
GET /api/delivery-personnel/nearby
Query: {
  longitude: -73.935242,
  latitude: 40.730610,
  radius: 5000 // 5km in meters
}
```

**Expected Response**: Only NYC drivers returned (within 5km)

**Geospatial Query Verification**:
```typescript
expect(response.body.nearby).toHaveLength(2);

// Calculate distance (Haversine formula)
response.body.nearby.forEach(driver => {
  const distance = calculateDistance(
    { lat: 40.730610, lng: -73.935242 },
    { 
      lat: driver.location.coordinates[1], 
      lng: driver.location.coordinates[0] 
    }
  );
  expect(distance).toBeLessThanOrEqual(5000); // within 5km
});
```

---

#### ✅ Test: Returns drivers sorted by distance
**Expected**: Closest driver first

**Assertions**:
```typescript
const distances = response.body.nearby.map(driver => driver.distance);
for (let i = 1; i < distances.length; i++) {
  expect(distances[i]).toBeGreaterThanOrEqual(distances[i - 1]);
}
```

---

### Test Suite: PATCH /api/delivery-personnel/:id/location

#### ✅ Test: Updates driver location in real-time
**Purpose**: GPS tracking

**Test Steps**:
```typescript
PATCH /api/delivery-personnel/DRIVER123/location
Body: {
  coordinates: [-73.984016, 40.758896]
}
```

**Database Verification**:
```typescript
const driver = await DeliveryPersonnel.findById('DRIVER123');
expect(driver.location.coordinates).toEqual([-73.984016, 40.758896]);
expect(driver.lastLocationUpdate).toBeDefined();
expect(driver.lastLocationUpdate.getTime()).toBeGreaterThan(Date.now() - 5000);
```

**Socket.IO Notification Verification**:
```typescript
// Listen for location update event
const socket = io('http://localhost:5003');
const eventReceived = new Promise(resolve => {
  socket.on('driverLocationUpdate', resolve);
});

// Update location
await updateDriverLocation('DRIVER123', coordinates);

// Verify event
const event = await eventReceived;
expect(event.driverId).toBe('DRIVER123');
expect(event.coordinates).toEqual([-73.984016, 40.758896]);
```

---

### Test Suite: PATCH /api/delivery-personnel/:id/status

#### ✅ Test: Updates driver status
**Purpose**: Availability management

**Test Steps**:
```typescript
PATCH /api/delivery-personnel/DRIVER123/status
Body: { status: 'busy' }
```

**Valid Status Transitions**:
```typescript
available → busy ✓
busy → available ✓
available → offline ✓
offline → available ✓

// Driver becomes unavailable when accepting delivery
available → busy (auto on delivery assignment) ✓
```

---

## Delivery Assignment Integration Tests

### Test Suite: POST /api/deliveries

#### ✅ Test: Creates delivery and assigns to nearest driver
**Purpose**: Automatic driver assignment

**Setup**:
1. Create order via order-service
2. Create 3 available drivers at different locations

**Test Steps**:
```typescript
POST /api/deliveries
Body: {
  orderId: 'ORDER123',
  restaurantId: 'RESTAURANT123',
  customerId: 'CUSTOMER123',
  pickupLocation: {
    address: '123 Restaurant St',
    coordinates: [-73.935242, 40.730610]
  },
  dropoffLocation: {
    address: '456 Customer Ave',
    coordinates: [-73.984016, 40.758896]
  }
}
```

**Expected Response**:
```typescript
{
  _id: 'DELIVERY123',
  orderId: 'ORDER123',
  deliveryPersonnelId: 'DRIVER_NEAREST',
  status: 'assigned',
  pickupLocation: { ... },
  dropoffLocation: { ... },
  estimatedTime: 25, // minutes
  createdAt: '2024-01-15T10:00:00Z'
}
```

**Driver Assignment Verification**:
```typescript
// Verify nearest driver assigned
const delivery = await Delivery.findById('DELIVERY123');
const assignedDriver = await DeliveryPersonnel.findById(
  delivery.deliveryPersonnelId
);

// Calculate distances from pickup location to all drivers
const allDrivers = await DeliveryPersonnel.find({ status: 'available' });
const distances = allDrivers.map(d => ({
  id: d._id,
  distance: calculateDistance(pickupLocation, d.location.coordinates)
}));

const closestDriver = distances.sort((a, b) => a.distance - b.distance)[0];
expect(assignedDriver._id.toString()).toBe(closestDriver.id.toString());
```

**Driver Status Update**:
```typescript
expect(assignedDriver.status).toBe('busy');
```

**Socket.IO Notification**:
```typescript
// Driver receives assignment notification
expect(mockSocket.emit).toHaveBeenCalledWith('deliveryAssigned', {
  deliveryId: 'DELIVERY123',
  orderId: 'ORDER123',
  pickupLocation: { ... },
  dropoffLocation: { ... }
});
```

---

#### ❌ Test: Fails when no drivers available
**Setup**: All drivers busy or offline

**Expected Status**: 503 Service Unavailable

**Expected Error**: "No available drivers in the area"

---

### Test Suite: GET /api/deliveries/:id

#### ✅ Test: Returns delivery details
**Purpose**: Track delivery

**Expected Response**:
```typescript
{
  _id: 'DELIVERY123',
  orderId: 'ORDER123',
  deliveryPersonnelId: 'DRIVER123',
  status: 'in_transit',
  pickupLocation: { ... },
  dropoffLocation: { ... },
  actualPickupTime: '2024-01-15T10:05:00Z',
  estimatedDeliveryTime: '2024-01-15T10:30:00Z',
  driverLocation: {
    type: 'Point',
    coordinates: [-73.960000, 40.740000] // current driver position
  }
}
```

---

### Test Suite: PATCH /api/deliveries/:id/status

#### ✅ Test: Updates delivery status through lifecycle
**Purpose**: Delivery tracking

**Test Steps**:
```typescript
// 1. Assigned → Picked Up
PATCH /api/deliveries/DELIVERY123/status
Body: { status: 'picked_up' }

// 2. Picked Up → In Transit
PATCH /api/deliveries/DELIVERY123/status
Body: { status: 'in_transit' }

// 3. In Transit → Delivered
PATCH /api/deliveries/DELIVERY123/status
Body: { status: 'delivered' }
```

**Valid Status Transitions**:
```typescript
assigned → picked_up ✓
picked_up → in_transit ✓
in_transit → delivered ✓
assigned → cancelled ✓

// Invalid transitions
delivered → in_transit ✗ 400 Bad Request
cancelled → delivered ✗ 400 Bad Request
```

**Order Service Integration**:
```typescript
// When delivery status = 'delivered'
// Verify order-service notified
const orderResponse = await axios.get(
  `http://localhost:5005/api/orders/ORDER123`
);
expect(orderResponse.data.status).toBe('Delivered');
```

**Driver Status Reset**:
```typescript
// When delivery completed, driver becomes available again
const driver = await DeliveryPersonnel.findById('DRIVER123');
expect(driver.status).toBe('available');
```

---

## Socket.IO Real-Time Integration Tests

### Test Suite: Socket.IO Connection

#### ✅ Test: Driver connects to Socket.IO server
**Purpose**: Real-time communication

**Test Steps**:
```typescript
const socket = io('http://localhost:5003', {
  auth: { driverId: 'DRIVER123' }
});

await new Promise(resolve => {
  socket.on('connect', resolve);
});

expect(socket.connected).toBe(true);
```

---

#### ❌ Test: Connection rejected without authentication
**Expected**: Connection refused

---

### Test Suite: Real-Time Location Updates

#### ✅ Test: Driver emits location updates
**Purpose**: Live tracking

**Test Steps**:
```typescript
// Driver side
socket.emit('updateLocation', {
  coordinates: [-73.984016, 40.758896]
});

// Server broadcasts to tracking clients
const customerSocket = io('http://localhost:5003');
const locationUpdate = await new Promise(resolve => {
  customerSocket.on('driverLocationUpdate', resolve);
});

expect(locationUpdate.driverId).toBe('DRIVER123');
expect(locationUpdate.coordinates).toEqual([-73.984016, 40.758896]);
```

**Update Frequency Test**:
```typescript
// Simulate GPS updates every 5 seconds
const updates = [];
for (let i = 0; i < 10; i++) {
  socket.emit('updateLocation', { 
    coordinates: [lng + i * 0.001, lat] 
  });
  await delay(5000);
}

// Verify all updates received and persisted
const driver = await DeliveryPersonnel.findById('DRIVER123');
expect(driver.locationHistory).toHaveLength(10);
```

---

### Test Suite: Delivery Status Notifications

#### ✅ Test: Customer receives real-time delivery updates
**Purpose**: Order tracking

**Test Steps**:
```typescript
// Customer subscribes to delivery updates
const customerSocket = io('http://localhost:5003', {
  auth: { customerId: 'CUSTOMER123' }
});

customerSocket.emit('subscribeToDelivery', { orderId: 'ORDER123' });

// Driver updates status
await updateDeliveryStatus('DELIVERY123', 'picked_up');

// Customer receives notification
const notification = await new Promise(resolve => {
  customerSocket.on('deliveryStatusUpdate', resolve);
});

expect(notification.status).toBe('picked_up');
expect(notification.orderId).toBe('ORDER123');
expect(notification.timestamp).toBeDefined();
```

---

## Geospatial Query Tests

### Test Suite: Advanced Location Queries

#### ✅ Test: Find drivers within polygon area
**Purpose**: Zone-based driver search

**Test Steps**:
```typescript
// Define delivery zone (Manhattan)
const manhattanPolygon = {
  type: 'Polygon',
  coordinates: [[
    [-74.047, 40.683], // SW corner
    [-73.907, 40.683], // SE corner
    [-73.907, 40.877], // NE corner
    [-74.047, 40.877], // NW corner
    [-74.047, 40.683]  // close polygon
  ]]
};

const driversInZone = await DeliveryPersonnel.find({
  location: {
    $geoWithin: {
      $geometry: manhattanPolygon
    }
  }
});

// Verify all drivers within zone
driversInZone.forEach(driver => {
  const [lng, lat] = driver.location.coordinates;
  expect(lng).toBeGreaterThanOrEqual(-74.047);
  expect(lng).toBeLessThanOrEqual(-73.907);
  expect(lat).toBeGreaterThanOrEqual(40.683);
  expect(lat).toBeLessThanOrEqual(40.877);
});
```

---

#### ✅ Test: Calculate route distance
**Purpose**: Estimated time calculation

**Test Steps**:
```typescript
const pickup = [-73.935242, 40.730610];
const dropoff = [-73.984016, 40.758896];

const distance = calculateHaversineDistance(pickup, dropoff);
const estimatedTime = calculateDeliveryTime(distance);

expect(distance).toBeCloseTo(3.5, 1); // ~3.5 km
expect(estimatedTime).toBeCloseTo(15, 2); // ~15 minutes
```

---

## Statistics & Analytics Tests

### Test Suite: GET /api/deliveries/stats/driver/:driverId

#### ✅ Test: Returns driver statistics
**Purpose**: Performance metrics

**Setup**:
- Create 20 completed deliveries for driver
- 2 cancelled deliveries

**Expected Response**:
```typescript
{
  totalDeliveries: 22,
  completedDeliveries: 20,
  cancelledDeliveries: 2,
  averageDeliveryTime: 23.5, // minutes
  totalDistance: 150.5, // km
  rating: 4.7,
  onTimePercentage: 90
}
```

---

### Test Suite: GET /api/deliveries/stats/heatmap

#### ✅ Test: Generates delivery heatmap data
**Purpose**: Analytics dashboard

**Expected Response**:
```typescript
{
  zones: [
    {
      center: [-73.935242, 40.730610],
      deliveryCount: 150,
      averageTime: 20
    },
    // ... more zones
  ]
}
```

---

## Performance & Concurrency Tests

### Test Suite: High Load Scenarios

#### ✅ Test: Handles 100 simultaneous delivery assignments
**Purpose**: Stress test

**Test Steps**:
```typescript
// Create 50 available drivers
const drivers = await Promise.all(
  Array.from({ length: 50 }, () => createDriver())
);

// Create 100 delivery requests
const deliveries = Array.from({ length: 100 }, (_, i) => ({
  orderId: `ORDER${i}`,
  pickupLocation: randomLocation(),
  dropoffLocation: randomLocation()
}));

const results = await Promise.all(
  deliveries.map(d => createDelivery(d))
);

// Verify all assigned
expect(results.every(r => r.status === 201)).toBe(true);

// Verify no driver over-assigned
const driverCounts = {};
results.forEach(r => {
  driverCounts[r.body.deliveryPersonnelId] = 
    (driverCounts[r.body.deliveryPersonnelId] || 0) + 1;
});

// Each driver should have max 2 deliveries (configurable limit)
Object.values(driverCounts).forEach(count => {
  expect(count).toBeLessThanOrEqual(2);
});
```

---

#### ✅ Test: Socket.IO broadcasts under high load
**Setup**: 1000 connected clients

**Performance Metrics**:
```typescript
const startTime = Date.now();

// Broadcast to all clients
io.emit('globalUpdate', { message: 'Test' });

// Measure latency
const endTime = Date.now();
expect(endTime - startTime).toBeLessThan(1000); // 1 second max
```

---

## Testing Utilities

### Helper Functions
```typescript
// Create test driver
async function createTestDriver(overrides = {}): Promise<DeliveryPersonnel> {
  return await DeliveryPersonnel.create({
    name: 'Test Driver',
    email: 'driver@test.com',
    phone: '+1234567890',
    vehicleType: 'Motorcycle',
    location: {
      type: 'Point',
      coordinates: [-73.935242, 40.730610]
    },
    status: 'available',
    ...overrides
  });
}

// Calculate distance (Haversine formula)
function calculateDistance(point1, point2): number {
  const R = 6371e3; // Earth radius in meters
  const φ1 = point1.lat * Math.PI / 180;
  const φ2 = point2.lat * Math.PI / 180;
  const Δφ = (point2.lat - point1.lat) * Math.PI / 180;
  const Δλ = (point2.lng - point1.lng) * Math.PI / 180;

  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  return R * c; // meters
}
```

---

## Running Integration Tests

```bash
# Start MongoDB with geospatial support
docker run -d -p 27017:27017 mongo:latest

# Set test environment
export MONGO_TEST_URI=mongodb://localhost:27017/delivery-test
export SOCKET_PORT=5003

# Run tests
cd backend/delivery-service/backend
npm run test:e2e

# With coverage
npm run test:e2e:cov

# Cleanup
docker stop mongodb
```

---

## Test Coverage Targets

| Category | Target |
|----------|--------|
| Delivery Assignment | 95% |
| Geospatial Queries | 90% |
| Socket.IO Events | 90% |
| Status Transitions | 100% |
| Driver Management | 95% |

---

## Best Practices

1. **Geospatial Indexes**: Always create 2dsphere indexes before tests
2. **Real Coordinates**: Use actual lat/lng pairs, test edge cases (poles, dateline)
3. **Socket.IO Testing**: Test both emit and broadcast scenarios
4. **Distance Calculations**: Use Haversine formula for accuracy
5. **Concurrency**: Test driver assignment race conditions
6. **Status Transitions**: Test all valid and invalid state changes
7. **Location Tracking**: Test frequent location updates (GPS simulation)
8. **Cleanup**: Disconnect all Socket.IO clients after tests
