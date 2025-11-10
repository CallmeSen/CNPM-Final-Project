import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import '../styles/dashboard.css';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

function RestaurantsPage() {
  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [superAdminName, setSuperAdminName] = useState('');
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    ownerName: '',
    location: '',
    contactNumber: '',
  });

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:5002/api/superadmin/restaurants', {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) {
          setRestaurants(data);
        } else {
          setError(data.message || 'Failed to fetch restaurants');
        }
      } catch (err) {
        setError('Server error while fetching restaurants');
      }
    };

    const name = localStorage.getItem('superAdminName');
    if (name) setSuperAdminName(name);

    fetchRestaurants();
  }, []);

  const handleEditClick = (restaurant) => {
    setEditing(restaurant._id);
    setFormData({
      name: restaurant.name,
      ownerName: restaurant.ownerName,
      location: restaurant.location,
      contactNumber: restaurant.contactNumber,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSaveEdit = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5002/api/superadmin/restaurant/${editing}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        setRestaurants(
          restaurants.map((rest) =>
            rest._id === editing ? { ...rest, ...formData } : rest
          )
        );
        setEditing(null);
        alert(data.message);
      } else {
        alert(data.message || 'Save failed');
      }
    } catch (err) {
      alert('Server error during saving');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this restaurant?')) return;

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5002/api/superadmin/restaurant/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setRestaurants(restaurants.filter((r) => r._id !== id));
        alert(data.message);
      } else {
        alert(data.message || 'Delete failed');
      }
    } catch (err) {
      alert('Server error during deletion');
    }
  };

  const filteredRestaurants = restaurants.filter(r =>
    r.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="main-content">
        <div className="dashboard-header">
          <h1>Restaurants</h1>
           <div className="user-profile">
            <strong>Welcome, {superAdminName} 👋</strong>
          </div>
        </div>

        <div className="content-area">
          <div className="page-header">
            <h2>🍽️ Restaurants Management</h2>
            <button className="btn btn-primary">
              <FaPlus /> Add Restaurant
            </button>
          </div>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search by restaurant name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
          {error && <p className="error">{error}</p>}
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Owner</th>
                <th>Location</th>
                <th>Contact</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRestaurants.map((rest) => (
                <tr key={rest._id}>
                  <td>{rest.name}</td>
                  <td>{rest.ownerName}</td>
                  <td>{rest.location}</td>
                  <td>{rest.contactNumber}</td>
                  <td className="action-buttons">
                    <button className="btn-icon edit" onClick={() => handleEditClick(rest)}><FaEdit /></button>
                    <button className="btn-icon delete" onClick={() => handleDelete(rest._id)}><FaTrash /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>        {editing && (
          <div className="edit-form">
            <div className="edit-form-content">
              <h3>Edit Restaurant</h3>
              <input type="text" name="name" placeholder="Restaurant Name" value={formData.name} onChange={handleInputChange} />
              <input type="text" name="ownerName" placeholder="Owner Name" value={formData.ownerName} onChange={handleInputChange} />
              <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleInputChange} />
              <input type="text" name="contactNumber" placeholder="Contact Number" value={formData.contactNumber} onChange={handleInputChange} />
              <div className="form-actions">
                <button onClick={() => setEditing(null)} className="btn btn-secondary">Cancel</button>
                <button onClick={handleSaveEdit} className="btn btn-primary">Save Changes</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default RestaurantsPage;
