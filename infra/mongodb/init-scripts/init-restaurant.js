// Initialize Restaurant Service Database
db = db.getSiblingDB('Restaurant');

// Create user for restaurant database
db.createUser({
  user: 'restaurant',
  pwd: 'restaurant123',
  roles: [
    {
      role: 'readWrite',
      db: 'Restaurant'
    }
  ]
});

print('Restaurant database initialized successfully');
