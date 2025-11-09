"use client";
// @ts-nocheck

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import RestaurantSidebar from '../components/RestaurantSidebar';
import '../styles/rdashboard.css';

function RestaurantDashboard() {
  const router = useRouter();
  const [restaurant, setRestaurant] = useState({});
  const [editProfile, setEditProfile] = useState(false);
  const [editableProfile, setEditableProfile] = useState(null);

  const handleUnauthorizedError = () => {
    alert('Your session has expired. Please log in again.');
    localStorage.removeItem('token');
    router.push('/');
  };

  const fetchRestaurantProfile = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5002/api/restaurant/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 401) {
        handleUnauthorizedError();
        return;
      }
      const data = await res.json();
      if (res.ok) {
        setRestaurant(data);
      } else {
        alert(data.message || 'Failed to fetch profile');
      }
    } catch (err) {
      alert('Error fetching profile');
    }
  }, []);

  useEffect(() => {
    fetchRestaurantProfile();
  }, [fetchRestaurantProfile]);

  const handleEditProfileClick = () => {
    setEditableProfile({ ...restaurant });
    setEditProfile(true);
  };

  const handleCancelEdit = () => {
    setEditProfile(false);
    setEditableProfile(null);
  };

  const handleEditProfile = async (updatedProfile) => {
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
  
      formData.append('name', updatedProfile.name);
      formData.append('ownerName', updatedProfile.ownerName);
      formData.append('location', updatedProfile.location);
      formData.append('contactNumber', updatedProfile.contactNumber);
  
      if (updatedProfile.profilePictureFile) {
        formData.append('profilePicture', updatedProfile.profilePictureFile);
      }

      // Get restaurant ID from current restaurant data
      const restaurantId = restaurant.id;
  
      // Call auth-service directly for file upload
      const res = await fetch(`http://localhost:5001/api/auth/restaurant/profile/${restaurantId}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
  
      const data = await res.json();
      if (res.ok) {
        alert('Profile updated successfully!');
        fetchRestaurantProfile();
        setEditProfile(false);
      } else {
        alert(data.message || 'Failed to update profile');
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      alert('Error updating profile');
    }
  };

  return (
    <div className="dashboard-container">
      <RestaurantSidebar activeKey="profile" userName={restaurant.name} />

      <div className="dashboard-content">
        <div className="section-card profile-card">
          <div className="section-header">
            <div>
              <h2>Profile</h2>
              <p className="section-subtitle">
                Keep your restaurant details up to date for your customers.
              </p>
            </div>
            {!editProfile && (
              <button className="btn btn-primary" onClick={handleEditProfileClick}>
                Edit Profile
              </button>
            )}
          </div>
          {editProfile ? (
            <form className="form-grid">
              <input
                type="text"
                placeholder="Name"
                value={editableProfile?.name ?? ''}
                onChange={(e) =>
                  setEditableProfile({ ...editableProfile, name: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Owner Name"
                value={editableProfile?.ownerName ?? ''}
                onChange={(e) =>
                  setEditableProfile({ ...editableProfile, ownerName: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Location"
                value={editableProfile?.location ?? ''}
                onChange={(e) =>
                  setEditableProfile({ ...editableProfile, location: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Contact Number"
                value={editableProfile?.contactNumber ?? ''}
                onChange={(e) =>
                  setEditableProfile({
                    ...editableProfile,
                    contactNumber: e.target.value,
                  })
                }
              />
              <div className="form-file">
                <label htmlFor="profilePicture">Profile Picture</label>
                <input
                  id="profilePicture"
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setEditableProfile({
                      ...editableProfile,
                      profilePictureFile: e.target.files?.[0],
                    })
                  }
                />
              </div>
              <div className="form-actions">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => handleEditProfile(editableProfile)}
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={handleCancelEdit}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="profile-overview">
              <div>
                {restaurant.profilePicture && restaurant.profilePicture.trim() ? (
                  <img
                    src={`http://localhost:5001${restaurant.profilePicture}`}
                    alt={restaurant.name || 'Restaurant'}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/150?text=No+Image';
                    }}
                  />
                ) : (
                  <div className="avatar-fallback">
                    {(restaurant.name || '?').charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <div className="profile-details">
                <div className="detail-row">
                  <span className="detail-label">Name</span>
                  <span className="detail-value">{restaurant.name || '--'}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Owner</span>
                  <span className="detail-value">{restaurant.ownerName || '--'}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Location</span>
                  <span className="detail-value">{restaurant.location || '--'}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Contact</span>
                  <span className="detail-value">
                    {restaurant.contactNumber || '--'}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RestaurantDashboard;
