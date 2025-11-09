// Initialize Order Service Database
db = db.getSiblingDB('Order');

// Create user for order database
db.createUser({
  user: 'order',
  pwd: 'order123',
  roles: [
    {
      role: 'readWrite',
      db: 'Order'
    }
  ]
});

print('Order database initialized successfully');
