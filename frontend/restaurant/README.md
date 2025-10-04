# Fastie.Saigon

## Restaurant Frontend Service

The restaurant frontend service is a React-based web application that provides an interface for Restaurant Admins to manage their own restaurant's food items, orders, and view analytics. It includes features such as restaurant authentication, menu management, and comprehensive reports & analytics with PDF/CSV export capabilities.

---

## Features

### Restaurant Admin Features
- **Restaurant Authentication**: Secure login and registration for restaurant owners.
- **Restaurant Dashboard**: Centralized dashboard for managing restaurant operations.
- **Food Item Management**: Add, edit, and delete food items with image uploads.
- **Menu Management**: Organize and display restaurant menu items.
- **Reports & Analytics**: 📊 NEW - Comprehensive reporting system with:
  - Revenue tracking by period (day/week/month/custom)
  - Top 5 selling food items by quantity and revenue
  - Customer reviews and ratings
  - Summary statistics (total revenue, orders, average order value, ratings)
  - PDF export with detailed tables
  - CSV export for revenue data
  - Visual charts and graphs

---

## Project Structure

```
frontend/restaurant/
  src/
    App.js                          # Main application component with routing
    index.js                        # Application entry point
    index.css                       # Global CSS
    components/
      RestaurantLogin.jsx           # Restaurant login page
      RestaurantRegister.jsx        # Restaurant registration page
    pages/
      RestaurantDashboard.jsx       # Main dashboard for restaurant management
      ReportsAnalytics.jsx          # 📊 Reports & Analytics page with charts
    styles/
      dashboard.css                 # Dashboard styles
      login.css                     # Login page styles
      register.css                  # Registration page styles
      rdashboard.css                # Restaurant dashboard styles
      restaurantLogin.css           # Restaurant-specific login styles
      restaurantRegister.css        # Restaurant-specific register styles
      reports.css                   # 📊 Reports page styles
    assets/
      images/                       # Static images
  public/
    index.html                      # HTML template
    manifest.json                   # Web app manifest
    robots.txt                      # Robots exclusion file
```

---

## Environment Variables

The restaurant frontend requires the following environment variables to be set in a `.env` file:

```env
PORT=3002
REACT_APP_BACKEND_URL=http://localhost:5002
```

**Note**: The restaurant app runs on **port 3002** to avoid conflicts with other frontend apps.

---

## Installation

1. Navigate to the `frontend/restaurant` directory:
   ```bash
   cd frontend/restaurant
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
  The app will run on `http://localhost:3002`

- To build the application for production:
  ```bash
  npm run build
  ```

---

## Key Pages and Routes

### Public Routes (No Authentication Required)
- **Root**: `/` - Redirects to `/login`
- **Login**: `/login` - Restaurant admin login page
- **Register**: `/register` - Restaurant registration page

### Protected Routes (Authentication Required)
- **Dashboard**: `/dashboard` - Main restaurant management dashboard
  - Manage food items
  - View restaurant details
  - Access reports
  
- **Reports & Analytics**: `/reports` - 📊 Comprehensive analytics dashboard
  - Revenue tracking with visual charts
  - Top selling items ranking
  - Customer reviews display
  - Summary statistics cards
  - PDF/CSV export functionality

---

## Authentication Flow

### Registration
1. Navigate to `/register`
2. Fill in restaurant details:
   - Restaurant name
   - Owner name
   - Email
   - Password
   - Location
   - Contact number
3. Submit form → POST to `http://localhost:5002/api/restaurant/register`
4. Success → Auto-redirect to `/login`

### Login
1. Navigate to `/login`
2. Enter email and password
3. Submit form → POST to `http://localhost:5002/api/restaurant/login`
4. Receive JWT token
5. Save to localStorage: `localStorage.setItem('token', token)`
6. Navigate to `/dashboard`

### Logout
1. Click "Logout" button in dashboard
2. Clear localStorage
3. Navigate to `/login`

---

## API Endpoints Used

All API calls use the backend restaurant-service on port 5002:

### Authentication
- **POST** `/api/restaurant/register` - Register new restaurant
- **POST** `/api/restaurant/login` - Login restaurant admin

### Food Item Management
- **GET** `/api/food-items` - Fetch all food items for restaurant
- **POST** `/api/food-items` - Create new food item (with image upload)
- **PUT** `/api/food-items/:id` - Update food item
- **DELETE** `/api/food-items/:id` - Delete food item

### Reports & Analytics 📊 NEW
- **GET** `/api/reports/revenue?period=week&startDate=&endDate=` - Get revenue data
- **GET** `/api/reports/top-items?period=week` - Get top selling items
- **GET** `/api/reports/reviews?limit=5` - Get customer reviews
- **GET** `/api/reports/summary?period=week` - Get summary statistics
- **POST** `/api/reports/review` - Create new review

**Headers Required**:
```javascript
headers: {
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json'
}
```

---

## Reports & Analytics Features 📊

### Dashboard Overview
The Reports & Analytics page provides comprehensive insights into restaurant performance:

#### 1. Summary Cards
- **Total Revenue**: Sum of all paid orders
- **Total Orders**: Count of completed orders
- **Average Order Value**: Revenue divided by order count
- **Average Rating**: Mean rating from customer reviews

#### 2. Revenue Chart
- Visual bar chart showing daily/weekly/monthly revenue
- Hover to see exact values
- Color-coded bars for easy reading

#### 3. Top Selling Items
- Ranked list of top 5 food items
- Shows quantity sold and revenue generated
- Includes food item images

#### 4. Customer Reviews
- Latest customer feedback
- Star ratings (1-5)
- Customer names and comments
- Food item names

### Period Filters
- **Day**: Last 24 hours
- **Week**: Last 7 days (default)
- **Month**: Last 30 days
- **Custom**: Select custom date range

### Export Features

#### PDF Export
- Click "Export PDF" button
- Generates comprehensive PDF with:
  - Report header with date and period
  - Summary statistics
  - Revenue breakdown table
  - Top selling items table
- Downloads as `revenue-report-[date].pdf`

#### CSV Export
- Click "Export CSV" button
- Generates CSV file with revenue data:
  - Date, Orders, Revenue columns
  - Excel-compatible format
- Downloads as `revenue-report-[date].csv`

---

## Dashboard Features

### Food Item Management
- **View Menu**: Display all food items with images
- **Add Item**: Upload food photo, set name, price, description, category
- **Edit Item**: Modify food details
- **Delete Item**: Remove items from menu

### Restaurant Information
- View restaurant details
- Contact information
- Location display

### Navigation
- Quick access to Reports from sidebar
- Logout functionality
- Welcome message with restaurant name

---

## Security Features

### Route Protection
- Protected routes require valid JWT token
- Automatic redirect to login if unauthenticated
- Token verification on every API call

### Token Management
- JWT token stored in localStorage
- Token sent in `Authorization: Bearer {token}` header
- Token includes restaurantId for data scoping

### Data Isolation
- Each restaurant can only see their own data
- Reports filtered by authenticated restaurant ID
- Backend enforces restaurant-level permissions

---

## Dependencies

### Core Dependencies
```json
{
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "react-router-dom": "^7.4.0",
  "jspdf": "^3.0.1",
  "jspdf-autotable": "^3.8.4"
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

Ensure the following backend services are running:

### Required Services
1. **restaurant-service** (port 5002) - Primary service
   ```bash
   cd backend/restaurant-service
   npm run dev
   ```

2. **order-service** (port 5005) - For order data
   ```bash
   cd backend/order-service
   npm run dev
   ```

### Optional Services
- **payment-service** (port 5004) - For payment processing
- **delivery-service** (port 5003) - For delivery tracking

---

## Testing Checklist

### Authentication
- [ ] Register new restaurant account
- [ ] Login with credentials → navigates to `/dashboard`
- [ ] Logout → redirects to `/login`
- [ ] Try accessing `/dashboard` or `/reports` without login → redirects to `/login`

### Food Management
- [ ] View food items list
- [ ] Add new food item with image
- [ ] Edit existing food item
- [ ] Delete food item

### Reports & Analytics 📊
- [ ] Navigate to `/reports` from dashboard
- [ ] View summary cards with data
- [ ] See revenue chart
- [ ] View top selling items list
- [ ] Read customer reviews
- [ ] Change period filter (Day/Week/Month)
- [ ] Select custom date range
- [ ] Export PDF → downloads successfully
- [ ] Export CSV → downloads successfully
- [ ] Verify data accuracy with database

---

## Common Issues & Solutions

### Issue: Port Already in Use
**Solution**: Change port in `.env` file:
```env
PORT=3003
```

### Issue: 401 Unauthorized on API Calls
**Solution**: 
1. Check token: `localStorage.getItem('token')`
2. Verify backend restaurant-service is running on port 5002
3. Clear localStorage and login again

### Issue: Reports Show Empty Data
**Solution**:
1. Ensure order-service is running (provides order data)
2. Check if restaurant has orders in database
3. Verify restaurantId matches between orders and restaurant
4. Check MongoDB for data: `db.orders.find({ restaurantId: "your-id" })`

### Issue: PDF Export Not Working
**Solution**:
1. Check browser console for jsPDF errors
2. Verify `jspdf` and `jspdf-autotable` are installed
3. Clear browser cache
4. Try different browser

### Issue: Image Upload Fails
**Solution**:
1. Check file size (must be < 5MB)
2. Verify file format (jpg, jpeg, png)
3. Ensure backend uploads folder exists
4. Check backend multer configuration

### Issue: CORS Error
**Solution**: Ensure backend `server.js` has:
```javascript
app.use(cors({ origin: "http://localhost:3002", credentials: true }));
```

---

## File Uploads

### Food Item Images
- Uploaded to: `backend/restaurant-service/uploads/`
- Accessed via: `http://localhost:5002/uploads/[filename]`
- Supported formats: JPG, JPEG, PNG
- Max size: 5MB (configurable in backend)

---

## MongoDB Collections Used

### Orders Collection
```javascript
{
  _id: ObjectId,
  restaurantId: String,  // Filters by this restaurant
  items: [{
    foodId: String,
    quantity: Number,
    price: Number
  }],
  totalPrice: Number,
  paymentStatus: "Paid" | "Pending" | "Failed",
  status: "Delivered" | "Pending" | ...,
  createdAt: Date
}
```

### Reviews Collection
```javascript
{
  _id: ObjectId,
  restaurant: ObjectId,  // Reference to this restaurant
  orderId: String,
  customer: {
    name: String,
    customerId: String
  },
  foodItem: ObjectId,
  rating: Number,  // 1-5
  comment: String,
  createdAt: Date
}
```

### FoodItems Collection
```javascript
{
  _id: ObjectId,
  name: String,
  price: Number,
  image: String,
  restaurant: ObjectId,
  category: String,
  description: String
}
```

---

## Architecture Notes

### Why Separate Restaurant App?
- **Role Separation**: Restaurant Admin vs SuperAdmin vs Customer
- **Different Ports**: Avoid routing conflicts (3002 vs 3001 vs 3000)
- **Independent Features**: Restaurant-specific functionality (menu, reports)
- **Data Scoping**: Each restaurant sees only their own data

### Backend Service Architecture
- **restaurant-service** (port 5002) - Handles restaurant auth, food items, reports
- **order-service** (port 5005) - Stores order data (accessed by reports)
- **Shared MongoDB**: Both services connect to same database

### Cross-Service Data Access
Reports controller in restaurant-service queries Orders from order-service database:
```javascript
// In restaurant-service
import Order from './models/Order.js';  // Same schema as order-service
// MongoDB automatically finds the collection
```

---

## Performance Notes

### Reports & Analytics Optimization
- MongoDB aggregation pipelines for efficient queries
- Indexed on `restaurantId` and `createdAt` for fast filtering
- Limited results (Top 5 items, 10 reviews) for performance
- Date range filtering reduces query scope

### Recommendations
- Add caching for frequently accessed reports
- Implement pagination for large datasets
- Use React.lazy() for code splitting
- Consider Redis for session management

---

## Related Documentation

- `../../REPORTS_TESTING_GUIDE.md` - How to test Reports & Analytics
- `../../REPORTS_IMPLEMENTATION_SUMMARY.md` - Technical implementation details
- `../../.github/copilot-instructions.md` - AI coding agent instructions
- `../ARCHITECTURE.md` - Overall frontend architecture

---

## Development Workflow

```bash
# 1. Start MongoDB (if not running)

# 2. Start backend services
cd backend/restaurant-service
npm run dev  # Port 5002

cd backend/order-service
npm run dev  # Port 5005

# 3. Start restaurant frontend (in new terminal)
cd frontend/restaurant
npm start  # Port 3002

# 4. Open browser
# Visit: http://localhost:3002
```

---

## Port Configuration

| App | Port | Purpose |
|-----|------|---------|
| Client (Customer) | 3000 | Customer-facing app |
| Admin (SuperAdmin) | 3001 | System management |
| **Restaurant** | **3002** | **This app - Restaurant management** |

| Backend Service | Port | Purpose |
|-----------------|------|---------|
| auth-service | 5001 | Customer/delivery auth |
| **restaurant-service** | **5002** | **Restaurant auth, food items, reports** |
| delivery-service | 5003 | Delivery tracking |
| payment-service | 5004 | Payment processing |
| order-service | 5005 | Order management |

---

## Next Steps & Improvements

### Suggested Features
1. **Real-time Updates**:
   - WebSocket for live order notifications
   - Auto-refresh reports dashboard

2. **Advanced Analytics**:
   - Revenue comparison (week vs week)
   - Peak hours analysis
   - Customer retention metrics
   - Food category performance

3. **Enhanced Reports**:
   - More chart types (pie, line, donut)
   - Email scheduled reports
   - Download history tracking
   - Custom report builder

4. **Menu Management**:
   - Drag-and-drop menu organization
   - Bulk food item upload
   - Category management
   - Availability toggle

5. **Order Management**:
   - View incoming orders
   - Update order status
   - Order history
   - Refund handling

---

## Support

For issues or questions:
1. Check `REPORTS_TESTING_GUIDE.md` for reports issues
2. Check backend logs for API errors
3. Verify MongoDB connection and data
4. Clear localStorage and try again
5. Review browser console for errors

---

## Notes

- Restaurant app requires both restaurant-service AND order-service to be running
- JWT token expires after 30 days (configured in backend)
- All reports data is filtered by authenticated restaurant's ID
- Images uploaded are stored permanently (implement cleanup if needed)
- PDF exports work best in Chrome/Edge browsers

---

**Version**: 1.0.0  
**Last Updated**: October 4, 2025  
**Developed for**: Fastie.Saigon - Food Delivery Platform  
**Special Features**: Reports & Analytics with PDF/CSV Export 📊
