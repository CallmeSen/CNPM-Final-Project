// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import 'react-icons/fa';

// SuperAdmin components
import SuperAdminRegister from './components/SuperAdminRegister';
import SuperAdminLogin from './components/SuperAdminLogin';
import SuperAdminDashboard from './pages/SuperAdminDashboard';
import RestaurantsPage from './pages/RestaurantsPage';
import UsersPage from './pages/UsersPage';
import DeliveryPage from './pages/DeliveryPage';
import ProtectedRoute from './components/ProtectedRoute';
import OrdersPage from './pages/OrdersPage';
import SettingsPage from './pages/SettingsPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<SuperAdminLogin />} />
        <Route path="/register" element={<SuperAdminRegister />} />
        
        {/* Protected routes - require authentication */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <SuperAdminDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/restaurants" 
          element={
            <ProtectedRoute>
              <RestaurantsPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/users" 
          element={
            <ProtectedRoute>
              <UsersPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/delivery" 
          element={
            <ProtectedRoute>
              <DeliveryPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/orders" 
          element={
            <ProtectedRoute>
              <OrdersPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/settings" 
          element={
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          } 
        />
        
        {/* Catch all - redirect to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
