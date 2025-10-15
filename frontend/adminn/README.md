# Fastie.Saigon

## Admin Frontend Service

The admin frontend service is a React-based web application that provides an interface for SuperAdmins to manage all restaurants in the food delivery platform. It includes features such as SuperAdmin authentication, restaurant CRUD operations, and centralized system management.

---

## Features

### SuperAdmin Features
- **SuperAdmin Authentication**: Secure login and registration for system administrators.
- **Restaurant Management**: View, edit, and delete all restaurants in the system.
- **Dashboard Overview**: Centralized view of all restaurants with search functionality.
- **Real-time Updates**: Manage restaurant information in real-time.
- **Search & Filter**: Quickly find restaurants by name.

---

## Project Structure

```
frontend/admin/
  src/
    App.js                          # Main application component with routing
    index.js                        # Application entry point
    index.css                       # Global CSS
    components/
      SuperAdminLogin.jsx           # SuperAdmin login page
      SuperAdminRegister.jsx        # SuperAdmin registration page
      ProtectedRoute.jsx            # Route guard for authentication
    pages/
      SuperAdminDashboard.jsx       # Main dashboard for managing restaurants
    styles/
      dashboard.css                 # Dashboard styles
      login.css                     # Login page styles
      register.css                  # Registration page styles
      rdashboard.css                # Restaurant dashboard styles
    assets/
      images/                       # Static images
  public/
    index.html                      # HTML template
    manifest.json                   # Web app manifest
    robots.txt                      # Robots exclusion file
  ROUTING_GUIDE.md                  # Complete routing documentation
  NAVIGATION_UPDATE_SUMMARY.md      # Navigation updates summary
  SUPERADMIN_FEATURES.md            # SuperAdmin features documentation
```

---

## Environment Variables

The admin frontend requires the following environment variables to be set in a `.env` file:

```env
PORT=3001
REACT_APP_BACKEND_URL=http://localhost:5002
```

**Note**: The admin app runs on **port 3001** to avoid conflicts with other frontend apps.

---

## Installation

1. Navigate to the `frontend/admin` directory:
   ```bash
   cd frontend/admin
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

---

## Running the Application

- To start the development server:
  ```bash
  npm start
  ```
  The app will run on `http://localhost:3001`

- To build the application for production:
  ```bash
  npm run build
  ```

---

## Key Pages and Routes

### Public Routes (No Authentication Required)
- **Root**: `/` - Redirects to `/login`
- **Login**: `/login` - SuperAdmin login page
- **Register**: `/register` - SuperAdmin registration page

### Protected Routes (Authentication Required)
- **Dashboard**: `/dashboard` - Main restaurant management dashboard
  - View all restaurants
  - Search restaurants by name
  - Edit restaurant details (name, owner, location, contact)
  - Delete restaurants
  - View restaurant information

### Catch-All Route
- **Any Invalid Route**: `*` - Redirects to `/login`

---

## Authentication Flow

### Registration
1. Navigate to `/register`
2. Fill in name, email, and password
3. Submit form → POST to `http://localhost:5002/api/superAdmin/register`
4. Success → Auto-redirect to `/login` after 2 seconds

### Login
1. Navigate to `/login`
2. Enter email and password
3. Submit form → POST to `http://localhost:5002/api/superAdmin/login`
4. Receive JWT token and SuperAdmin name
5. Save to localStorage:
   - `localStorage.setItem('token', token)`
   - `localStorage.setItem('superAdminName', name)`
6. Navigate to `/dashboard`

### Protected Route Access
- User tries to access `/dashboard`
- `ProtectedRoute` component checks for token in localStorage
- If token exists → Render dashboard
- If no token → Redirect to `/login`

### Logout
1. Click "Logout" button in dashboard
2. Clear localStorage (token, superAdminName)
3. Navigate to `/login`

---

## API Endpoints Used

All API calls use the backend restaurant-service on port 5002:

### Authentication
- **POST** `/api/superAdmin/register` - Register new SuperAdmin
- **POST** `/api/superAdmin/login` - Login SuperAdmin

### Restaurant Management
- **GET** `/api/superadmin/restaurants` - Fetch all restaurants
- **PUT** `/api/superadmin/restaurant/:id` - Update restaurant details
- **DELETE** `/api/superadmin/restaurant/:id` - Delete a restaurant

**Headers Required**:
```javascript
headers: {
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json'
}
```

---

## Dashboard Features

### Restaurant Table
- **Columns**: Name, Owner, Location, Contact, Actions
- **Search Bar**: Filter restaurants by name (case-insensitive)
- **Actions**:
  - **Edit**: Click to modify restaurant details
  - **Delete**: Remove restaurant (with confirmation)

### Edit Form
When editing a restaurant, an inline form appears with:
- Restaurant Name input
- Owner Name input
- Location input
- Contact Number input
- **Save** button - Submit changes
- **Cancel** button - Close form without saving

### Header
- Welcome message with SuperAdmin name
- Logout button

---

## Security Features

### Route Protection
- Protected routes use `ProtectedRoute` component
- Automatically redirects unauthenticated users to `/login`
- Token verified on every protected page access

### Token Management
- JWT token stored in localStorage
- Token sent in `Authorization: Bearer {token}` header
- Token cleared on logout

### API Security
- All restaurant management endpoints require valid JWT
- Backend validates token and SuperAdmin role
- CORS enabled for `http://localhost:3001`

---

## Dependencies

### Core Dependencies
```json
{
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "react-router-dom": "^7.4.0"
}
```

### Dev Dependencies
```json
{
  "react-scripts": "^5.x",
  "@testing-library/react": "^x.x.x",
  "@testing-library/jest-dom": "^x.x.x"
}
```

---

## Backend Requirements

Ensure the backend restaurant-service is running:

```bash
cd backend/restaurant-service
npm run dev
```

The service should be running on `http://localhost:5002`

---

## Testing Checklist

- [ ] Visit `http://localhost:3001` → should redirect to `/login`
- [ ] Register new SuperAdmin account
- [ ] Login with credentials → navigates to `/dashboard`
- [ ] View list of restaurants
- [ ] Search for restaurant by name
- [ ] Edit a restaurant → changes saved
- [ ] Delete a restaurant → removed from list
- [ ] Click Logout → redirects to `/login`
- [ ] Try accessing `/dashboard` after logout → redirects to `/login`

---

## Common Issues & Solutions

### Issue: Port Already in Use
**Solution**: Change port in `.env` file or kill the process:
```bash
# Windows
netstat -ano | findstr :3001
taskkill /PID <process_id> /F

# Or change port in .env
PORT=3003
```

### Issue: 401 Unauthorized on API Calls
**Solution**: 
1. Check if token exists: `localStorage.getItem('token')`
2. Verify backend is running on port 5002
3. Clear localStorage and login again

### Issue: CORS Error
**Solution**: Ensure backend `server.js` has:
```javascript
app.use(cors({ origin: "http://localhost:3001", credentials: true }));
```

### Issue: Cannot Login After Register
**Solution**: Check backend logs for registration errors. Ensure MongoDB is connected.

---

## File Relationships

```
App.js
  └─ Routes
      ├─ / → Navigate to /login
      ├─ /login → SuperAdminLogin
      ├─ /register → SuperAdminRegister
      ├─ /dashboard → ProtectedRoute → SuperAdminDashboard
      └─ * → Navigate to /login

SuperAdminLogin.jsx
  └─ Calls: POST /api/superAdmin/login
  └─ Saves: token, superAdminName to localStorage
  └─ Navigates to: /dashboard

SuperAdminRegister.jsx
  └─ Calls: POST /api/superAdmin/register
  └─ Navigates to: /login (after success)

ProtectedRoute.jsx
  └─ Checks: localStorage.getItem('token')
  └─ Redirects to: /login (if no token)
  └─ Renders: children (if authenticated)

SuperAdminDashboard.jsx
  └─ Calls: GET /api/superadmin/restaurants
  └─ Calls: PUT /api/superadmin/restaurant/:id
  └─ Calls: DELETE /api/superadmin/restaurant/:id
  └─ Uses: token from localStorage
```

---

## Architecture Notes

### Why Separate Admin App?
- **Separation of Concerns**: SuperAdmin vs Restaurant Admin vs Customer
- **Different Ports**: Avoid routing conflicts (3001 vs 3002 vs 3000)
- **Different Auth**: SuperAdmin auth is separate from restaurant/customer auth
- **Independent Deployment**: Can deploy admin app separately

### Backend Service Used
- **restaurant-service** (port 5002) - Handles SuperAdmin authentication and restaurant CRUD
- **NOT auth-service** (port 5001) - That's for customer/delivery auth only

---

## Next Steps & Improvements

### Suggested Features
1. **Analytics Dashboard**: 
   - Total restaurants count
   - New registrations graph
   - Active vs inactive restaurants

2. **Advanced Filters**:
   - Filter by location
   - Filter by creation date
   - Sort by name/owner

3. **Bulk Operations**:
   - Delete multiple restaurants
   - Export restaurant list to CSV/PDF

4. **Pagination**:
   - Handle large number of restaurants
   - Load restaurants in pages

5. **SuperAdmin Profile**:
   - View/edit SuperAdmin profile
   - Change password functionality

---

## Related Documentation

- `ROUTING_GUIDE.md` - Complete routing and navigation guide
- `NAVIGATION_UPDATE_SUMMARY.md` - Recent navigation updates
- `SUPERADMIN_FEATURES.md` - Detailed SuperAdmin features
- `../ARCHITECTURE.md` - Overall frontend architecture
- `../../.github/copilot-instructions.md` - AI coding agent instructions

---

## Development Workflow

```bash
# 1. Start MongoDB (if not running)
# 2. Start backend restaurant-service
cd backend/restaurant-service
npm run dev

# 3. Start admin frontend (in new terminal)
cd frontend/admin
npm start

# 4. Open browser
# Visit: http://localhost:3001
```

---

## Port Configuration

| App | Port | Purpose |
|-----|------|---------|
| Client (Customer) | 3000 | Customer-facing app |
| **Admin (SuperAdmin)** | **3001** | **This app - System management** |
| Restaurant | 3002 | Restaurant admin app |

---

## Notes

- Ensure backend restaurant-service is running before starting admin frontend
- JWT token expires after 30 days (configured in backend)
- All passwords must be at least 6 characters
- Email validation enforced on both frontend and backend
- SuperAdmin can manage ALL restaurants, Restaurant Admin can only manage their own

---

## Support

For issues or questions:
1. Check `ROUTING_GUIDE.md` for navigation issues
2. Check backend logs for API errors
3. Verify MongoDB connection
4. Clear localStorage and try again

---

**Version**: 1.0.0  
**Last Updated**: October 4, 2025  
**Developed for**: Fastie.Saigon - Food Delivery Platform
