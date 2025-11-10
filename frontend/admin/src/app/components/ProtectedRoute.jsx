"use client";
// @ts-nocheck

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// Protected Route Component - Checks if user is authenticated
const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    if (!token) {
      setIsAuthenticated(false);
      router.replace('/login');
      return;
    }

    setIsAuthenticated(true);
  }, [router]);

  if (isAuthenticated === null) {
    return null;
  }

  if (!isAuthenticated) {
    return null;
  }

  return children;
};

export default ProtectedRoute;
