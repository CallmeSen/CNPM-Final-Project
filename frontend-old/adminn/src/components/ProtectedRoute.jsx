import React from 'react';
import { Navigate } from 'react-router-dom';

// Protected Route Component - Checks if user is authenticated
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    // If no token, redirect to login
    return <Navigate to="/login" replace />;
  }
  
  // If token exists, render the children (protected component)
  return children;
};

export default ProtectedRoute;
