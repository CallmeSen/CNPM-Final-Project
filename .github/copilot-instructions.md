# AI Coding Agent Instructions - Food Delivery Microservices

## Architecture Overview

This is a **microservices-based food delivery platform** with 3 separate frontend apps and 5 backend services. The system is role-based with strict separation:

### Frontend Apps (Ports 3000-3002)
- **`frontend/client`** (3000): Customer app - browse restaurants, order food, track delivery
- **`frontend/admin`** (3001): SuperAdmin app - manage ALL restaurants in system
- **`frontend/restaurant`** (3002): Restaurant admin app - manage menus, orders for ONE restaurant

**Critical**: Each frontend is a **completely independent React app** with its own `App.js`, routes, and port. Never cross-reference components between them.

### Backend Services
- **auth-service** (5001): Customer/delivery personnel authentication only
- **restaurant-service** (5002): Restaurant & SuperAdmin auth, food items, restaurant CRUD
- **order-service** (5005): Order management with WebSocket for real-time updates
- **delivery-service** (5003): Delivery tracking with Socket.IO location updates
- **payment-service** (5004): Stripe integration with webhooks, SMS (Twilio), email (Resend)

**Why this split?**: SuperAdmin and Restaurant auth live in restaurant-service (port 5002), NOT auth-service. This is intentional to separate admin concerns from customer/delivery auth.

## Critical Conventions

### Authentication Pattern
```javascript
// Frontend: ALWAYS use Bearer token from localStorage
const token = localStorage.getItem('token');
fetch(url, {
  headers: { 'Authorization': `Bearer ${token}` }
});

// Backend: Use jwt.verify in middleware
// See backend/auth-service/middlewares/auth.js for pattern
```

### API Endpoint Structure
- Customer auth: `http://localhost:5001/api/auth/customer/*`
- Restaurant auth: `http://localhost:5002/api/restaurant/*`
- SuperAdmin: `http://localhost:5002/api/superAdmin/*` (note capital A)
- Food items: `http://localhost:5002/api/food-items/*`
- Orders: `http://localhost:5005/api/orders/*`
- Payments: `http://localhost:5004/api/payment/*`

**Inconsistency Alert**: Restaurant service uses both `/superAdmin/` (capital A) and `/superadmin/` (lowercase). Check existing code before adding new endpoints.

### CORS Configuration
All backend services use:
```javascript
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
```
Update this if adding new frontend ports.

### MongoDB Connection
- **CommonJS services** (auth, order): `const connectDB = require('./config/db');`
- **ES Modules services** (restaurant): `import mongoose from 'mongoose'; mongoose.connect(process.env.MONGO_URI)`
- Each service connects independently - no shared DB connection

## Key Workflows

### Running the Full Stack
```powershell
# Backend services (each in separate terminal)
cd backend/auth-service; npm run dev
cd backend/restaurant-service; npm run dev  
cd backend/order-service; npm run dev
cd backend/payment-service; npm run dev

# Frontend apps (each in separate terminal)
cd frontend/client; npm start      # Port 3000
cd frontend/admin; npm start       # Port 3001
cd frontend/restaurant; npm start  # Port 3002
```

**Docker option**: `docker-compose up --build` from root (see README.md for k8s deployment)

### Testing Stripe Webhooks Locally
```bash
stripe listen --forward-to localhost:5004/api/payment/webhook
```
See `backend/payment-service/webhook-guide.md` for full setup.

### File Upload Pattern (Restaurant Service)
Food item images use `multer` middleware:
```javascript
// Uploads go to backend/restaurant-service/uploads/
// Access via: http://localhost:5002/uploads/[filename]
```

## Project-Specific Patterns

### Form Validation
Frontend uses **real-time validation** pattern:
```javascript
const validate = (name, value) => { /* validation logic */ };
const handleChange = (e) => {
  setForm({...form, [name]: value});
  const error = validate(name, value);
  setErrors({...errors, [name]: error});
};
// Submit button disabled until isFormValid
```
See `frontend/*/src/pages/restaurant/components/SuperAdminLogin.jsx` for reference.

### Navigation After Actions
```javascript
// Login success → save token, then navigate
localStorage.setItem('token', data.token);
navigate('/dashboard');

// Logout → clear storage, redirect to login
localStorage.removeItem('token');
window.location.href = '/login';
```

**Known Bug**: Some files redirect to `/restaurant/home` which doesn't exist. Use `/login` instead.

### WebSocket Events
- **Orders**: `orderStatusUpdate` event in order-service
- **Delivery**: `location-update` event in delivery-service
- Both use Socket.IO - check for `io.on('connection')` in service files

## File Structure Patterns

### Backend Service Structure
```
backend/[service-name]/
├── index.js or server.js      # Entry point
├── config/db.js                # MongoDB connection
├── models/                     # Mongoose schemas
├── controllers/                # Business logic
├── routes/                     # Express routes
├── middlewares/                # Auth, error handling
└── utils/                      # JWT, helpers
```

### Frontend App Structure
```
frontend/[app-name]/src/
├── App.js                      # Routes (role-specific!)
├── pages/                      # Page components
│   ├── auth/                   # Login, register, profile
│   ├── restaurant/             # Restaurant-specific pages
│   └── customer/               # Customer-specific pages
├── components/                 # Shared components
└── styles/                     # CSS modules
```

## Common Pitfalls

1. **Wrong auth endpoint**: Customer login → port 5001, Restaurant/SuperAdmin → port 5002
2. **Cross-app imports**: Never import components from client → admin or restaurant apps
3. **Missing token**: All protected routes need `Authorization: Bearer [token]` header
4. **Port conflicts**: Ensure 3 frontend apps run on different ports (set in `.env`)
5. **CORS errors**: Backend must whitelist frontend port in `cors()` config

## Environment Variables Required

Backend services need (create `.env` in each service):
```
MONGO_URI=mongodb+srv://...
JWT_SECRET=your_secret
PORT=[service_port]

# Payment service additionally needs:
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
TWILIO_ACCOUNT_SID=AC...
TWILIO_AUTH_TOKEN=...
RESEND_API_KEY=re_...
```

Frontend apps need:
```
PORT=[3000|3001|3002]
REACT_APP_BACKEND_URL=http://localhost:4000
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

## Debugging Tips

- **401 Unauthorized**: Check token in localStorage and Authorization header
- **404 on API**: Verify port and path - SuperAdmin uses 5002, Customer uses 5001
- **CORS errors**: Check backend `cors()` origin matches frontend port
- **Mongoose errors**: Ensure service's MongoDB connection succeeded (check startup logs)
- **Redirect loops**: Check route definitions in `App.js` match navigate() calls

## Reference Files for Patterns
- Auth middleware: `backend/auth-service/middlewares/auth.js`
- Form validation: `frontend/admin/src/pages/restaurant/components/SuperAdminLogin.jsx`
- JWT storage: `frontend/*/src/pages/restaurant/components/RestaurantLogin.jsx`
- File upload: `backend/restaurant-service/src/routes/foodItemRoutes.js`
- Payment flow: `backend/payment-service/README.md`
- Frontend architecture: `frontend/ARCHITECTURE.md`
