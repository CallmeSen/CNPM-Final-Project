"use client";
// @ts-nocheck

// src/components/RestaurantLogin.jsx
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import '../styles/restaurantLogin.css'; // You can style it separately

function RestaurantLogin() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    validate(name, value); // Validate field as user types
  };

  // Real-time field validation
  const validate = (name, value) => {
    let errorsCopy = { ...errors };

    switch (name) {
      case 'email':
        // Email validation regex
        const emailRegex =
          /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        errorsCopy.email = emailRegex.test(value)
          ? ''
          : 'Please enter a valid email address';
        break;
      case 'password':
        // Password should be at least 6 characters
        errorsCopy.password =
          value.length >= 6 ? '' : 'Password must be at least 6 characters';
        break;
      default:
        break;
    }

    setErrors(errorsCopy);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    // Check if there are any validation errors before submitting
    if (Object.values(errors).some((err) => err !== '') || !validateForm()) {
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch('http://localhost:5002/api/restaurant/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        setMessage('Login successful!');
        setTimeout(() => {
          router.push('/dashboard'); // Redirect to the dashboard after successful login
        }, 1500);
      } else {
        setMessage(data.message || '❌ Login failed');
      }
    } catch (error) {
      setMessage('❌ Error logging in');
    } finally {
      setIsLoading(false);
    }
  };

  // Function to check if form is valid (no errors)
  const validateForm = () => {
    return !Object.values(errors).some((err) => err !== '');
  };

  return (
    <div className="restaurant-login-page">
      <div className="restaurant-login-container">
        <div className="restaurant-login-header">
          <div className="logo">
            <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 7V5C3 3.9 3.9 3 5 3H19C20.1 3 21 3.9 21 5V7M3 7V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V7M3 7H21M12 11V15M9 11V15M15 11V15" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="11" r="1" fill="#FF6B35"/>
            </svg>
          </div>
          <h1>Restaurant Portal</h1>
          <p>Manage your restaurant operations</p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="restaurant-login-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-wrapper">
              <svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" fill="#666"/>
              </svg>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                className={errors.email ? 'error' : ''}
                disabled={isLoading}
              />
            </div>
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 8H17V6C17 3.24 14.76 1 12 1S7 3.24 7 6V8H6C4.9 8 4 8.9 4 10V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V10C20 8.9 19.1 8 18 8ZM12 17C10.9 17 10 16.1 10 15S10.9 13 12 13 14 13.9 14 15 13.1 17 12 17ZM9 8V6C9 4.34 10.34 3 12 3S15 4.34 15 6V8H9Z" fill="#666"/>
              </svg>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                className={errors.password ? 'error' : ''}
                disabled={isLoading}
              />
            </div>
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          <button type="submit" className="restaurant-login-btn" disabled={!validateForm() || isLoading}>
            {isLoading ? (
              <>
                <svg className="loading-spinner" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" strokeDasharray="31.416" strokeDashoffset="31.416"/>
                </svg>
                Signing In...
              </>
            ) : (
              'Sign In'
            )}
          </button>

          {message && (
            <div className={`message ${message.includes('❌') ? 'error' : 'success'}`}>
              {message}
            </div>
          )}
        </form>

        <div className="restaurant-login-footer">
          <p>
            Don't have a restaurant account?{' '}
            <button
              type="button"
              className="link-btn"
              onClick={() => router.push('/register')}
              disabled={isLoading}
            >
              Register Restaurant
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RestaurantLogin;
