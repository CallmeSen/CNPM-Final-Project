"use client";
// @ts-nocheck

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import RestaurantSidebar from '../components/RestaurantSidebar';
import '../styles/rdashboard.css';

function FoodItems() {
  const router = useRouter();
  const [foodItems, setFoodItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [newFoodItem, setNewFoodItem] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    imageUrl: '',
  });
  const [editFoodItem, setEditFoodItem] = useState(null);
  const [restaurantName, setRestaurantName] = useState('');

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
        setRestaurantName(data.name);
      }
    } catch (err) {
      console.error('Error fetching profile:', err);
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
        fetchFoodItems();
        setNewFoodItem({ name: '', description: '', price: '', category: '', imageFile: null });
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
      return;
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
        fetchFoodItems();
      } else {
        alert(data.message || 'Failed to delete food item');
      }
    } catch (err) {
      alert('Error deleting food item');
    }
  };

  const handleEditFoodItem = async () => {
    if (!editFoodItem.name || !editFoodItem.description || !editFoodItem.price || !editFoodItem.category) {
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
        fetchFoodItems();
        setEditFoodItem(null);
      } else {
        alert(data.message || 'Failed to update food item');
      }
    } catch (err) {
      alert('Error updating food item');
    }
  };

  return (
    <div className="dashboard-container">
      <RestaurantSidebar activeKey="foodItems" userName={restaurantName} />

      <div className="dashboard-content">
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
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="Price"
                  value={editFoodItem.price}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '');
                    setEditFoodItem({ ...editFoodItem, price: value });
                  }}
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
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="Price"
                value={newFoodItem.price}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '');
                  setNewFoodItem({ ...newFoodItem, price: value });
                }}
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
      </div>
    </div>
  );
}

export default FoodItems;
