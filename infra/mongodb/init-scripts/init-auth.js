// Initialize Auth Service Database
db = db.getSiblingDB('Auth');

// Create user for auth database
db.createUser({
  user: 'auth',
  pwd: 'auth123',
  roles: [
    {
      role: 'readWrite',
      db: 'Auth'
    }
  ]
});

print('Auth database initialized successfully');
