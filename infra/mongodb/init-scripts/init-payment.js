// Initialize Payment Service Database
db = db.getSiblingDB('Payment');

// Create user for payment database
db.createUser({
  user: 'payment',
  pwd: 'payment123',
  roles: [
    {
      role: 'readWrite',
      db: 'Payment'
    }
  ]
});

print('Payment database initialized successfully');
