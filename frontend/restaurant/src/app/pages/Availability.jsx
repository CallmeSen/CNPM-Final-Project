"use client";
// @ts-nocheck

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import RestaurantSidebar from '../components/RestaurantSidebar';
import '../styles/rdashboard.css';

function Availability() {
  const router = useRouter();
  const [availability, setAvailability] = useState(true);
  const [restaurantName, setRestaurantName] = useState('');

  const handleUnauthorizedError = () => {
    alert('Your session has expired. Please log in again.');
    localStorage.removeItem('token');
    router.push('/');
  };

  const fetchRestaurantProfile = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/restaurant/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 401) {
        handleUnauthorizedError();
        return;
      }
      const data = await res.json();
      if (res.ok) {
        setRestaurantName(data.name);
        setAvailability(data.availability);
      }
    } catch (err) {
      console.error('Error fetching profile:', err);
    }
  }, []);

  useEffect(() => {
    fetchRestaurantProfile();
  }, [fetchRestaurantProfile]);

  const toggleAvailability = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/restaurant/availability', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ availability: !availability }),
      });
      const data = await res.json();
      if (res.ok) {
        setAvailability(!availability);
        alert(data.message);
      }
    } catch (err) {
      alert('Error updating availability');
    }
  };

  return (
    <div className="dashboard-container">
      <RestaurantSidebar activeKey="availability" userName={restaurantName} />

      <div className="dashboard-content">
        <div className="section-card availability-card">
          <div className="section-header">
            <div>
              <h2>Availability</h2>
              <p className="section-subtitle">
                Toggle your storefront visibility for diners.
              </p>
            </div>
          </div>
          <div className={`status-pill ${availability ? 'status-open' : 'status-closed'}`}>
            {availability ? 'Currently Open' : 'Currently Closed'}
          </div>
          <button className="btn btn-primary" onClick={toggleAvailability}>
            {availability ? 'Mark as Closed' : 'Mark as Open'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Availability;

