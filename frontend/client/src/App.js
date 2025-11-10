// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Contexts
import { CartProvider } from "./pages/contexts/CartContext";

// common components
import About from "./pages/About";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ContactAndFeedback from "./pages/ContactAndFeedback";

// auth components
import AuthLogin from "./pages/auth/AuthLogin";
import AuthRegister from "./pages/auth/AuthRegister";
import CustomerProfile from "./pages/auth/CustomerProfile";

// payment management
import Checkout from "./pages/payment/Checkout";

// order management
import OrderHome from "./pages/orderManagement/OrderHome";
import OrderForm from "./components/OrderForm";
import UpdateOrder from "./components/UpdateOrder";
import DeleteOrder from "./components/DeleteOrder";
import OrderDetails from "./components/OrderDetails";
import CreateOrderFromCart from "./pages/orderManagement/CreateOrderFromCart";

// customer management
import CustomerHome from "./pages/customer/customerHome";
import RestaurentDetails from "./pages/customer/customerHome";
import FoodItemList from "./pages/customer/foodItemList";
import AddToCartPage from "./pages/customer/AddToCartPage";
import CustomerOrderHistory from "./pages/customer/CustomerOrderHistory";
import CustomerOrderDetails from "./pages/customer/CustomerOrderDetails";

function App() {
  const [orders, setOrders] = useState([]);

  const addOrder = (newOrder) => {
    setOrders((prevOrders) => [...prevOrders, newOrder]);
  };

  return (
    <CartProvider>
      <Router>
        <Routes>
          {/* common routes */}
          <Route path="/" element={<CustomerHome />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/contact" element={<ContactAndFeedback />} />

          {/* auth routes */}
          <Route path="/auth/login" element={<AuthLogin />} />
          <Route path="/auth/register" element={<AuthRegister />} />
          <Route path="/customer/profile" element={<CustomerProfile />} />

          {/* payment management */}
          <Route path="/checkout" element={<Checkout />} />

          {/* order management */}
          <Route path="/orders" element={<OrderHome orders={OrderHome} />} />
          <Route path="/orders/new" element={<OrderForm addOrder={addOrder} />} />
          <Route path="/orders/create-from-cart" element={<CreateOrderFromCart />} />
          <Route path="/orders/edit/:id" element={<UpdateOrder addOrder={addOrder} />} />
          <Route path="/orders/delete/:id" element={<DeleteOrder />} />
          <Route path="/orders/details/:id" element={<OrderDetails />} />

          {/* customer routes */}
          <Route path="/customer/restaurant/:id" element={<RestaurentDetails />} />
          <Route path="/customer/restaurant/:restaurantId/foods" element={<FoodItemList />} />
          <Route path="/customer/cart" element={<AddToCartPage />} />
          <Route path="/customer/order-history" element={<CustomerOrderHistory />} />
          <Route path="/customer/order-details/:id" element={<CustomerOrderDetails />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
