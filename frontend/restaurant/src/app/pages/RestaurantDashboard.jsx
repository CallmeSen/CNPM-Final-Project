"use client";
// @ts-nocheck

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import DashboardSidebar from '../components/DashboardSidebar';
import '../styles/rdashboard.css';

function RestaurantDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('profile');
  const [restaurant, setRestaurant] = useState({});
  const [foodItems, setFoodItems] = useState([]);
  const [availability, setAvailability] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [newFoodItem, setNewFoodItem] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    imageUrl: '',
  });
  const [editFoodItem, setEditFoodItem] = useState(null); // For editing food items
  const [editProfile, setEditProfile] = useState(false); // For editing profile
  const [editableProfile, setEditableProfile] = useState(null); // For editable profile data

  const sidebarNavItems = useMemo(
    () => [
      { key: 'profile', label: 'Profile', icon: '👤', tab: 'profile' },
      { key: 'foodItems', label: 'Food Items', icon: '🍽️', tab: 'foodItems' },
      { key: 'availability', label: 'Availability', icon: '📅', tab: 'availability' },
      { key: 'reports', label: 'Reports', icon: '📊', path: '/reports' },
    ],
    [],
  );

  useEffect(() => {
    const storedTab = localStorage.getItem('dashboard:tab');
    if (storedTab && ['profile', 'foodItems', 'availability'].includes(storedTab)) {
      setActiveTab(storedTab);
    }
    localStorage.removeItem('dashboard:tab');
  }, []);

  const handleTabChange = useCallback(
    (tab) => {
      setActiveTab(tab);
    },
    [],
  );

  const handleSidebarSelect = useCallback(
    (item) => {
      if (item.key === 'reports') {
        localStorage.setItem('dashboard:tab', activeTab);
        router.push(item.path || '/reports');
        return;
      }
      handleTabChange(item.key);
    },
    [activeTab, handleTabChange, router],
  );

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/');
  };

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
        setAvailability(data.availability);
      } else {
        alert(data.message || 'Failed to fetch profile');
      }
    } catch (err) {
      alert('Error fetching profile');
    }
  }, []);

  const fetchFoodItems = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5002/api/food-items/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) setFoodItems(data);
    } catch (err) {
      console.error('Error fetching food items:', err);
    }
  }, []);

  useEffect(() => {
    fetchRestaurantProfile();
    fetchFoodItems();
  }, [fetchRestaurantProfile, fetchFoodItems]);

  const handleAddFoodItem = async () => {
    if (!newFoodItem.name || !newFoodItem.description || !newFoodItem.price || !newFoodItem.category || !newFoodItem.imageFile) {
      alert('Please fill in all fields before adding a food item.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('name', newFoodItem.name);
      formData.append('description', newFoodItem.description);
      formData.append('price', newFoodItem.price);
      formData.append('category', newFoodItem.category);
      formData.append('image', newFoodItem.imageFile);

      const res = await fetch('http://localhost:5002/api/food-items/create', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        alert('Food item added successfully!');
        fetchFoodItems(); // Refresh the food items list
        setNewFoodItem({ name: '', description: '', price: '', category: '', imageFile: null }); // Reset form
      } else {
        alert(data.message || 'Failed to add food item');
      }
    } catch (err) {
      alert('Error adding food item');
    }
  };

  const handleDeleteFoodItem = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this food item?');
    if (!confirmDelete) {
      return; // Exit the function if the user cancels
    }
  
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5002/api/food-items/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        alert('Food item deleted successfully!');
        fetchFoodItems(); // Refresh the food items list
      } else {
        alert(data.message || 'Failed to delete food item');
      }
    } catch (err) {
      alert('Error deleting food item');
    }
  };

  const handleEditFoodItem = async () => {
    if (!editFoodItem.name || !editFoodItem.description || !editFoodItem.price || !editFoodItem.category ) {
      alert('Please fill in all fields before updating the food item.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('name', editFoodItem.name);
      formData.append('description', editFoodItem.description);
      formData.append('price', editFoodItem.price);
      formData.append('category', editFoodItem.category);
      if (editFoodItem.imageFile) {
        formData.append('image', editFoodItem.imageFile);
          } 
      const res = await fetch(`http://localhost:5002/api/food-items/${editFoodItem._id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        alert('Food item updated successfully!');
        fetchFoodItems(); // Refresh the food items list
        setEditFoodItem(null); // Clear edit form
      } else {
        alert(data.message || 'Failed to update food item');
      }
    } catch (err) {
      alert('Error updating food item');
    }
  };

  const handleEditProfileClick = () => {
    setEditableProfile({ ...restaurant }); // Copy current profile data
    setEditProfile(true); // Show the edit form
  };

  const handleCancelEdit = () => {
    setEditProfile(false); // Hide the edit form
    setEditableProfile(null); // Reset editable profile data
  };

  const handleEditProfile = async (updatedProfile) => {
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
  
      // Append fields to FormData
      formData.append('name', updatedProfile.name);
      formData.append('ownerName', updatedProfile.ownerName);
      formData.append('location', updatedProfile.location);
      formData.append('contactNumber', updatedProfile.contactNumber);
  
      // Append profile picture file if it exists
      if (updatedProfile.profilePictureFile) {
        formData.append('profilePicture', updatedProfile.profilePictureFile);
      }
  
      const res = await fetch('http://localhost:5002/api/restaurant/update', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData, // Send FormData
      });
  
      const data = await res.json();
      if (res.ok) {
        alert('Profile updated successfully!');
        fetchRestaurantProfile(); // Refresh profile details
        setEditProfile(false); // Close edit profile form
      } else {
        alert(data.message || 'Failed to update profile');
      }
    } catch (err) {
      alert('Error updating profile');
    }
  };
  const toggleAvailability = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5002/api/restaurant/availability', {
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
      {/* Topbar */}
      <div className="dashboard-header">
        <p>Hello, <strong>{restaurant.name}</strong> 👋</p>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>

      {/* Sidebar */}
      <DashboardSidebar
        activeKey={activeTab}
        navItems={sidebarNavItems}
        onSelect={handleSidebarSelect}
      />

      {/* Main Content */}
      <div className="dashboard-content">
        {activeTab === 'profile' && (
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
                  {restaurant.profilePicture ? (
                    <img
                      src={`http://localhost:5002${restaurant.profilePicture}`}
                      alt={restaurant.name || 'Restaurant'}
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
        )}

        {activeTab === 'foodItems' && (
          <div className="section-stack">
            <div className="section-card">
              <div className="section-header">
                <div>
                  <h2>Menu Items</h2>
                  <p className="section-subtitle">
                    Manage your dishes, pricing, and categories in one place.
                  </p>
                </div>
                <span className="tag">{foodItems.length} items</span>
              </div>
              <div className="section-toolbar">
                <input
                  type="text"
                  placeholder="Search by food name..."
                  className="search-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="table-wrapper">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Description</th>
                      <th>Price</th>
                      <th>Category</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {foodItems
                      .filter((item) =>
                        item.name.toLowerCase().includes(searchQuery.toLowerCase()),
                      )
                      .map((item) => (
                        <tr key={item._id}>
                          <td>
                            <div className="">
                              <img
                                src={`http://localhost:5002${item.image}`}
                                alt={item.name}
                              />
                            </div>
                          </td>
                          <td>{item.name}</td>
                          <td>{item.description}</td>
                          <td>{item.price}</td>
                          <td>{item.category}</td>
                          <td className="table-actions">
                            <button
                              className="btn btn-small btn-outline"
                              onClick={() => setEditFoodItem(item)}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-small btn-danger"
                              onClick={() => handleDeleteFoodItem(item._id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>

            {editFoodItem && (
              <div className="section-card">
                <div className="section-header">
                  <div>
                    <h3>Edit Food Item</h3>
                    <p className="section-subtitle">
                      Update the information for {editFoodItem.name}.
                    </p>
                  </div>
                  <button
                    className="btn btn-ghost btn-small"
                    onClick={() => setEditFoodItem(null)}
                  >
                    Close
                  </button>
                </div>
                <form className="form-grid">
                  <input
                    type="text"
                    placeholder="Name"
                    value={editFoodItem.name}
                    onChange={(e) =>
                      setEditFoodItem({ ...editFoodItem, name: e.target.value })
                    }
                  />
                  <textarea
                    placeholder="Description"
                    value={editFoodItem.description}
                    onChange={(e) =>
                      setEditFoodItem({
                        ...editFoodItem,
                        description: e.target.value,
                      })
                    }
                  />
                  <input
                    type="number"
                    placeholder="Price"
                    value={editFoodItem.price}
                    onChange={(e) =>
                      setEditFoodItem({ ...editFoodItem, price: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    placeholder="Category"
                    value={editFoodItem.category}
                    onChange={(e) =>
                      setEditFoodItem({
                        ...editFoodItem,
                        category: e.target.value,
                      })
                    }
                  />
                  <div className="form-file">
                    <label htmlFor="foodImage">Food Image</label>
                    <input
                      id="foodImage"
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        setEditFoodItem({
                          ...editFoodItem,
                          imageFile: e.target.files?.[0],
                        })
                      }
                    />
                  </div>
                  <div className="form-actions">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleEditFoodItem}
                    >
                      Save Changes
                    </button>
                    <button
                      type="button"
                      className="btn btn-ghost"
                      onClick={() => setEditFoodItem(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="section-card">
              <div className="section-header">
                <div>
                  <h3>Add Food Item</h3>
                  <p className="section-subtitle">
                    Upload new dishes to showcase them to customers.
                  </p>
                </div>
              </div>
              <form className="form-grid">
                <input
                  type="text"
                  placeholder="Name"
                  value={newFoodItem.name}
                  onChange={(e) =>
                    setNewFoodItem({ ...newFoodItem, name: e.target.value })
                  }
                />
                <textarea
                  placeholder="Description"
                  value={newFoodItem.description}
                  onChange={(e) =>
                    setNewFoodItem({
                      ...newFoodItem,
                      description: e.target.value,
                    })
                  }
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={newFoodItem.price}
                  onChange={(e) =>
                    setNewFoodItem({ ...newFoodItem, price: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Category"
                  value={newFoodItem.category}
                  onChange={(e) =>
                    setNewFoodItem({ ...newFoodItem, category: e.target.value })
                  }
                />
                <div className="form-file">
                  <label htmlFor="newFoodImage">Food Image</label>
                  <input
                    id="newFoodImage"
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setNewFoodItem({
                        ...newFoodItem,
                        imageFile: e.target.files?.[0],
                      })
                    }
                  />
                </div>
                <div className="form-actions">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleAddFoodItem}
                  >
                    Add Food Item
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {activeTab === 'availability' && (
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
        )}
      </div>
    </div>
  );
}

export default RestaurantDashboard;
