"use client";
// @ts-nocheck

// src/components/RestaurantRegister.jsx

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import '../styles/restaurantRegister.css';

function RestaurantRegister() {
  const router = useRouter("/");

  const [form, setForm] = useState({
    name: '',
    ownerName: '',
    location: '',
    contactNumber: '',
    profilePicture: null, // Will store the image file
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({
    name: '',
    ownerName: '',
    location: '',
    contactNumber: '',
    email: '',
    password: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });

    if (name !== 'profilePicture') {
      validate(name, value);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, profilePicture: file });
  };

  // Restrict contact number to only numbers and limit to 10 digits
  const handleContactNumberChange = (e) => {
    const { value } = e.target;
    // Allow only numbers and limit to 10 digits
    if (/^\d{0,10}$/.test(value)) {
      setForm({ ...form, contactNumber: value });
    }
  };

  // Real-time field validation
  const validate = (name, value) => {
    const errorsCopy = { ...errors };

    switch (name) {
      case 'name':
        errorsCopy.name = value ? '' : 'Restaurant name is required';
        break;
      case 'ownerName':
        errorsCopy.ownerName = value ? '' : 'Owner name is required';
        break;
      case 'location':
        errorsCopy.location = value ? '' : 'Location is required';
        break;
      case 'contactNumber':
        const phoneRegex = /^[0-9]{10}$/;
        errorsCopy.contactNumber =
          phoneRegex.test(value) ? '' : 'Phone number must be exactly 10 digits';
        break;
      case 'email':
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        errorsCopy.email = emailRegex.test(value)
          ? ''
          : 'Please enter a valid email address';
        break;
      case 'password':
        // Allow letters, numbers, and common special characters (including . and -)
        const passwordRegex =
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&.#\-_])[A-Za-z\d@$!%*?&.#\-_]{6,}$/;
        errorsCopy.password = passwordRegex.test(value)
          ? ''
          : 'Password must be at least 6 characters, include a letter, a number, and a special character';
        break;
      default:
        break;
    }

    setErrors(errorsCopy);
  };

  // Check if the form is valid
  const validateForm = () => {
    // Check if all error messages are empty
    const noErrors = Object.values(errors).every((err) => err === '');

    // Check if all required fields are filled
    const allFieldsFilled =
      form.name &&
      form.ownerName &&
      form.location &&
      form.contactNumber &&
      form.email &&
      form.password;
      // profilePicture is optional, so we don't check it here

    return noErrors && allFieldsFilled;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('ownerName', form.ownerName);
      formData.append('location', form.location);
      formData.append('contactNumber', form.contactNumber);

      // Only append profilePicture if a file is selected
      if (form.profilePicture) {
        formData.append('profilePicture', form.profilePicture);
      }

      formData.append('email', form.email);
      formData.append('password', form.password);

      const res = await fetch('/api/auth/register/restaurant', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setMessage('Restaurant registered successfully!');
       setTimeout(() => {
          router.push('/dashboard');
        }, 2000);
      } else {
        setMessage(data.message || 'Registration failed');
      }
    } catch (error) {
      setMessage('Error registering the restaurant');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="restaurant-register-container">
      <div className="register-header">
        <h1 className="register-title">Create Restaurant Account</h1>
        <p className="register-subtitle">Join our platform and start serving delicious food</p>
      </div>

      <form onSubmit={handleSubmit} encType="multipart/form-data" className="register-form">
        <div className="form-section">
          <h3 className="section-title">Restaurant Information</h3>

          <div className="form-group">
            <div className="input-group">
              <div className="input-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#FF6B35"/>
                </svg>
              </div>
              <input
                type="text"
                name="name"
                placeholder="Restaurant Name"
                value={form.name}
                onChange={handleChange}
                className={errors.name ? 'error' : ''}
              />
            </div>
            {errors.name && <p className="error-message">{errors.name}</p>}
          </div>

          <div className="form-group">
            <div className="input-group">
              <div className="input-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="#FF6B35"/>
                </svg>
              </div>
              <input
                type="text"
                name="ownerName"
                placeholder="Owner Name"
                value={form.ownerName}
                onChange={handleChange}
                className={errors.ownerName ? 'error' : ''}
              />
            </div>
            {errors.ownerName && <p className="error-message">{errors.ownerName}</p>}
          </div>

          <div className="form-group">
            <div className="input-group">
              <div className="input-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#FF6B35"/>
                </svg>
              </div>
              <input
                type="text"
                name="location"
                placeholder="Restaurant Location"
                value={form.location}
                onChange={handleChange}
                className={errors.location ? 'error' : ''}
              />
            </div>
            {errors.location && <p className="error-message">{errors.location}</p>}
          </div>

          <div className="form-group">
            <div className="input-group">
              <div className="input-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" fill="#FF6B35"/>
                </svg>
              </div>
              <input
                type="text"
                name="contactNumber"
                placeholder="Contact Number (10 digits)"
                value={form.contactNumber}
                onChange={handleContactNumberChange}
                className={errors.contactNumber ? 'error' : ''}
              />
            </div>
            {errors.contactNumber && <p className="error-message">{errors.contactNumber}</p>}
          </div>
        </div>

        <div className="form-section">
          <h3 className="section-title">Account Details</h3>

          <div className="form-group">
            <div className="input-group">
              <div className="input-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill="#FF6B35"/>
                </svg>
              </div>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                className={errors.email ? 'error' : ''}
              />
            </div>
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>

          <div className="form-group">
            <div className="input-group">
              <div className="input-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm3 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" fill="#FF6B35"/>
                </svg>
              </div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className={errors.password ? 'error' : ''}
              />
            </div>
            {errors.password && <p className="error-message">{errors.password}</p>}
          </div>
        </div>

        <div className="form-section">
          <h3 className="section-title">Profile Picture (Optional)</h3>
          <div className="file-input-container">
            <div className="file-input-group">
              <div className="file-input-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" fill="#FF6B35"/>
                </svg>
              </div>
              <input
                type="file"
                name="profilePicture"
                accept="image/*"
                id="profilePicture"
                onChange={handleFileChange}
                className="file-input"
              />
              <label htmlFor="profilePicture" className="file-input-label">
                Choose Profile Picture
              </label>
            </div>
            {form.profilePicture && (
              <p className="file-selected">Selected: {form.profilePicture.name}</p>
            )}
          </div>
        </div>

        <button type="submit" disabled={!validateForm() || isLoading} className="register-btn">
          {isLoading ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
              <span>Creating Account...</span>
            </div>
          ) : (
            'Create Restaurant Account'
          )}
        </button>

        {message && (
          <div className={`message ${message.includes('successfully') ? 'success' : 'error'}`}>
            {message}
          </div>
        )}
      </form>

      <div className="register-footer">
        <p>Already have an account? <button onClick={() => router.push('/login')} className="login-link">Sign In</button></p>
      </div>
    </div>
  );
}

export default RestaurantRegister;
