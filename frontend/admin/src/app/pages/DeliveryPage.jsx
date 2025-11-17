"use client";
// @ts-nocheck

import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import '../styles/dashboard.css';
import '../styles/DeliveryPage.css';
import { 
  FaEdit, FaTrash, FaPlus, FaMotorcycle, FaCar, FaTruck,
  FaToggleOn, FaToggleOff, FaStar,
  FaDollarSign, FaRuler, FaClock
} from 'react-icons/fa';

function DeliveryPage() {
  const [deliveryPersonnel, setDeliveryPersonnel] = useState([]);
  const [deliveryFees, setDeliveryFees] = useState([]);
  const [filteredDelivery, setFilteredDelivery] = useState([]);
  const [stats, setStats] = useState({
    totalDelivery: 0,
    availableDelivery: 0,
    busyDelivery: 0,
    averageRating: 0
  });
  
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterVehicle, setFilterVehicle] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [superAdminName, setSuperAdminName] = useState('');
  const [activeTab, setActiveTab] = useState('personnel'); // personnel | fees | map
  
  // Modal states
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showFeeModal, setShowFeeModal] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [selectedFee, setSelectedFee] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    vehicleType: 'bike',
    licenseNumber: ''
  });

  const [feeFormData, setFeeFormData] = useState({
    name: '',
    baseDistance: 3,
    baseFee: 15000,
    perKmFee: 5000,
    vehicleType: 'all',
    rushHourMultiplier: 1.5,
    isActive: true
  });

  const [feeCalculator, setFeeCalculator] = useState({
    distance: '',
    vehicleType: 'bike',
    isRushHour: false,
    result: null
  });

  const vehicleIcons = {
    bike: <FaMotorcycle />,
    motorbike: <FaMotorcycle />,
    car: <FaCar />,
    van: <FaTruck />
  };

  useEffect(() => {
    const name = localStorage.getItem('superAdminName');
    if (name) setSuperAdminName(name);
    fetchData();
  }, []);

  useEffect(() => {
    filterDeliveryPersonnel();
  }, [deliveryPersonnel, filterStatus, filterVehicle, searchQuery]);

  const fetchData = async () => {
    setLoading(true);
    try {
      await Promise.all([
        fetchDeliveryPersonnel(),
        fetchDeliveryFees(),
        fetchStats()
      ]);
    } catch (err) {
      setError('Error loading data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchDeliveryPersonnel = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/management/delivery', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      
      if (res.ok) {
        const data = await res.json();
        setDeliveryPersonnel(data);
      } else {
        const data = await res.json();
        setError(data.message || 'Failed to fetch delivery personnel');
      }
    } catch (err) {
      setError('Server error while fetching delivery personnel');
      console.error(err);
    }
  };

  const fetchDeliveryFees = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/management/delivery-fees', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      
      if (res.ok) {
        const data = await res.json();
        setDeliveryFees(data);
      }
    } catch (err) {
      console.error('Error fetching fees:', err);
    }
  };

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/management/delivery/stats', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      
      if (res.ok) {
        const data = await res.json();
        setStats({
          totalDelivery: data.totalDelivery,
          availableDelivery: data.availableDelivery,
          busyDelivery: data.busyDelivery,
          averageRating: data.averageRating
        });
      }
    } catch (err) {
      console.error('Error fetching stats:', err);
    }
  };

  const filterDeliveryPersonnel = () => {
    let filtered = deliveryPersonnel;
    
    if (filterStatus === 'available') {
      filtered = filtered.filter(d => d.isAvailable);
    } else if (filterStatus === 'busy') {
      filtered = filtered.filter(d => !d.isAvailable);
    }
    
    if (filterVehicle !== 'all') {
      filtered = filtered.filter(d => d.vehicleType === filterVehicle);
    }
    
    if (searchQuery) {
      filtered = filtered.filter(d => 
        `${d.firstName} ${d.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.licenseNumber.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setFilteredDelivery(filtered);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFeeInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFeeFormData({ 
      ...feeFormData, 
      [name]: type === 'checkbox' ? checked : value 
    });
  };

  const handleCreateDelivery = async (e) => {
    e.preventDefault();
    
    // Validate password
    if (formData.password.length < 6) {
      setValidationErrors({ password: 'Mật khẩu phải có ít nhất 6 ký tự' });
      alert('Mật khẩu phải có ít nhất 6 ký tự');
      return;
    }
    
    setValidationErrors({});
    
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/management/delivery', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        setShowCreateModal(false);
        resetForm();
        fetchData();
      } else {
        alert(data.message || 'Failed to create delivery personnel');
      }
    } catch (err) {
      alert('Server error during creation');
      console.error(err);
    }
  };

  const handleUpdateDelivery = async (e) => {
    e.preventDefault();
    
    // Validate password if it's being changed
    if (formData.password && formData.password.length < 6) {
      setValidationErrors({ password: 'Mật khẩu phải có ít nhất 6 ký tự' });
      alert('Mật khẩu phải có ít nhất 6 ký tự');
      return;
    }
    
    setValidationErrors({});
    
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/management/delivery/${selectedDelivery._id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        setShowEditModal(false);
        resetForm();
        fetchData();
      } else {
        alert(data.message || 'Failed to update delivery personnel');
      }
    } catch (err) {
      alert('Server error during update');
      console.error(err);
    }
  };

  const handleDeleteDelivery = async (delivery) => {
    if (!window.confirm(`Are you sure you want to delete ${delivery.firstName} ${delivery.lastName}?`)) return;

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/management/delivery/${delivery._id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      
      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        fetchData();
      } else {
        alert(data.message || 'Failed to delete delivery personnel');
      }
    } catch (err) {
      alert('Server error during deletion');
      console.error(err);
    }
  };

  const handleToggleAvailability = async (delivery) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/management/delivery/${delivery._id}/availability`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      
      const data = await res.json();
      if (res.ok) {
        fetchData();
      } else {
        alert(data.message || 'Failed to toggle availability');
      }
    } catch (err) {
      alert('Server error');
      console.error(err);
    }
  };

  const handleEditClick = (delivery) => {
    setSelectedDelivery(delivery);
    setFormData({
      firstName: delivery.firstName,
      lastName: delivery.lastName,
      email: delivery.email,
      phone: delivery.phone,
      password: '',
      vehicleType: delivery.vehicleType,
      licenseNumber: delivery.licenseNumber
    });
    setShowEditModal(true);
  };

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      vehicleType: 'bike',
      licenseNumber: ''
    });
    setSelectedDelivery(null);
  };

  const handleCreateFee = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/management/delivery-fees', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(feeFormData),
      });
      
      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        setShowFeeModal(false);
        resetFeeForm();
        fetchDeliveryFees();
      } else {
        alert(data.message || 'Failed to create fee');
      }
    } catch (err) {
      alert('Server error');
      console.error(err);
    }
  };

  const handleDeleteFee = async (fee) => {
    if (!window.confirm(`Delete fee "${fee.name}"?`)) return;

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/management/delivery-fees/${fee._id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      
      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        fetchDeliveryFees();
      } else {
        alert(data.message || 'Failed to delete fee');
      }
    } catch (err) {
      alert('Server error');
      console.error(err);
    }
  };

  const calculateDeliveryFee = async () => {
    if (!feeCalculator.distance) {
      alert('Please enter distance');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const params = new URLSearchParams({
        distance: feeCalculator.distance,
        vehicleType: feeCalculator.vehicleType,
        isRushHour: feeCalculator.isRushHour
      });

      const res = await fetch(`/api/management/delivery-fees/calculate?${params}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      
      if (res.ok) {
        const data = await res.json();
        setFeeCalculator({ ...feeCalculator, result: data });
      } else {
        const data = await res.json();
        alert(data.message || 'Failed to calculate fee');
      }
    } catch (err) {
      alert('Server error');
      console.error(err);
    }
  };

  const resetFeeForm = () => {
    setFeeFormData({
      name: '',
      baseDistance: 3,
      baseFee: 15000,
      perKmFee: 5000,
      vehicleType: 'all',
      rushHourMultiplier: 1.5,
      isActive: true
    });
    setSelectedFee(null);
  };

  const getStatusBadge = (isAvailable) => {
    return (
      <span className={`status-badge ${isAvailable ? 'status-available' : 'status-busy'}`}>
        {isAvailable ? 'Available' : 'Busy'}
      </span>
    );
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="main-content">
        <div className="dashboard-header">
          <h1>Delivery Management</h1>
          <div className="user-profile">
            <strong>Welcome, {superAdminName} 👋</strong>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-card-icon" style={{ backgroundColor: 'var(--secondary-color)' }}>
              <FaMotorcycle />
            </div>
            <div className="stat-card-info">
              <p>Total Delivery</p>
              <h3>{stats.totalDelivery}</h3>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-card-icon" style={{ backgroundColor: 'var(--success-color)' }}>
              <FaToggleOn />
            </div>
            <div className="stat-card-info">
              <p>Available</p>
              <h3>{stats.availableDelivery}</h3>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-card-icon" style={{ backgroundColor: 'var(--warning-color)' }}>
              <FaToggleOff />
            </div>
            <div className="stat-card-info">
              <p>Busy</p>
              <h3>{stats.busyDelivery}</h3>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-card-icon" style={{ backgroundColor: '#f7b731' }}>
              <FaStar />
            </div>
            <div className="stat-card-info">
              <p>Avg Rating</p>
              <h3>{stats.averageRating.toFixed(1)}</h3>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="tabs-container">
          <button 
            className={`tab-button ${activeTab === 'personnel' ? 'active' : ''}`}
            onClick={() => setActiveTab('personnel')}
          >
            <FaMotorcycle /> Delivery Personnel
          </button>
          <button 
            className={`tab-button ${activeTab === 'fees' ? 'active' : ''}`}
            onClick={() => setActiveTab('fees')}
          >
            <FaDollarSign /> Delivery Fees
          </button>
          <button 
            className={`tab-button ${activeTab === 'calculator' ? 'active' : ''}`}
            onClick={() => setActiveTab('calculator')}
          >
            <FaRuler /> Fee Calculator
          </button>
        </div>

        {/* Personnel Tab */}
        {activeTab === 'personnel' && (
          <div className="content-area">
            <div className="page-header">
              <h2>🏍️ Delivery Personnel</h2>
              <button className="btn btn-primary" onClick={() => setShowCreateModal(true)}>
                <FaPlus /> Add Delivery Personnel
              </button>
            </div>

            <div className="filters-section">
              <div className="filter-group">
                <label>Status:</label>
                <select 
                  value={filterStatus} 
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="filter-select"
                >
                  <option value="all">All</option>
                  <option value="available">Available</option>
                  <option value="busy">Busy</option>
                </select>
              </div>
              
              <div className="filter-group">
                <label>Vehicle:</label>
                <select 
                  value={filterVehicle} 
                  onChange={(e) => setFilterVehicle(e.target.value)}
                  className="filter-select"
                >
                  <option value="all">All Vehicles</option>
                  <option value="bike">Bike</option>
                  <option value="scooter">Scooter</option>
                  <option value="car">Car</option>
                  <option value="bicycle">Bicycle</option>
                </select>
              </div>
              
              <div className="search-container">
                <input
                  type="text"
                  placeholder="Search by name, email, or license..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
              </div>
            </div>

            {error && <p className="error">{error}</p>}
            
            {loading ? (
              <p>Loading delivery personnel...</p>
            ) : (
              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Contact</th>
                      <th>Vehicle</th>
                      <th>License</th>
                      <th>Rating</th>
                      <th>Deliveries</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDelivery.map((delivery) => (
                      <tr key={delivery._id}>
                        <td>{delivery.firstName} {delivery.lastName}</td>
                        <td>
                          <div>{delivery.email}</div>
                          <div className="text-muted">{delivery.phone}</div>
                        </td>
                        <td>
                          <span className="vehicle-badge">
                            {vehicleIcons[delivery.vehicleType]} {delivery.vehicleType}
                          </span>
                        </td>
                        <td>{delivery.licenseNumber}</td>
                        <td>
                          <span className="rating-badge">
                            <FaStar /> {delivery.rating.toFixed(1)}
                          </span>
                        </td>
                        <td>{delivery.totalDeliveries}</td>
                        <td>{getStatusBadge(delivery.isAvailable)}</td>
                        <td className="action-buttons">
                          <button 
                            className="btn-icon edit" 
                            onClick={() => handleEditClick(delivery)}
                            title="Edit"
                          >
                            <FaEdit />
                          </button>
                          <button 
                            className={`btn-icon ${delivery.isAvailable ? 'toggle-on' : 'toggle-off'}`}
                            onClick={() => handleToggleAvailability(delivery)}
                            title="Toggle Availability"
                          >
                            {delivery.isAvailable ? <FaToggleOn /> : <FaToggleOff />}
                          </button>
                          <button 
                            className="btn-icon delete" 
                            onClick={() => handleDeleteDelivery(delivery)}
                            title="Delete"
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredDelivery.length === 0 && (
                  <p className="no-data">No delivery personnel found.</p>
                )}
              </div>
            )}
          </div>
        )}

        {/* Fees Tab */}
        {activeTab === 'fees' && (
          <div className="content-area">
            <div className="page-header">
              <h2>💵 Delivery Fee Configuration</h2>
              <button className="btn btn-primary" onClick={() => setShowFeeModal(true)}>
                <FaPlus /> Add Fee Configuration
              </button>
            </div>

            <div className="fees-grid">
              {deliveryFees.map((fee) => (
                <div key={fee._id} className="fee-card">
                  <div className="fee-card-header">
                    <h3>{fee.name}</h3>
                    <span className={`status-badge ${fee.isActive ? 'status-available' : 'status-inactive'}`}>
                      {fee.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <div className="fee-card-body">
                    <div className="fee-item">
                      <FaRuler /> <strong>Base Distance:</strong> {fee.baseDistance} km
                    </div>
                    <div className="fee-item">
                      <FaDollarSign /> <strong>Base Fee:</strong> {fee.baseFee.toLocaleString()} VND
                    </div>
                    <div className="fee-item">
                      <FaDollarSign /> <strong>Per Km:</strong> {fee.perKmFee.toLocaleString()} VND
                    </div>
                    <div className="fee-item">
                      <FaMotorcycle /> <strong>Vehicle:</strong> {fee.vehicleType}
                    </div>
                    <div className="fee-item">
                      <FaClock /> <strong>Rush Hour:</strong> x{fee.rushHourMultiplier}
                    </div>
                  </div>
                  <div className="fee-card-actions">
                    <button 
                      className="btn-icon delete" 
                      onClick={() => handleDeleteFee(fee)}
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {deliveryFees.length === 0 && (
              <p className="no-data">No delivery fee configurations found.</p>
            )}
          </div>
        )}

        {/* Calculator Tab */}
        {activeTab === 'calculator' && (
          <div className="content-area">
            <div className="page-header">
              <h2>🧮 Delivery Fee Calculator</h2>
            </div>

            <div className="calculator-container">
              <div className="calculator-form">
                <div className="form-group">
                  <label>Distance (km)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={feeCalculator.distance}
                    onChange={(e) => setFeeCalculator({ ...feeCalculator, distance: e.target.value })}
                    placeholder="Enter distance in km"
                  />
                </div>

                <div className="form-group">
                  <label>Vehicle Type</label>
                  <select
                    value={feeCalculator.vehicleType}
                    onChange={(e) => setFeeCalculator({ ...feeCalculator, vehicleType: e.target.value })}
                  >
                    <option value="bike">Bike</option>
                    <option value="scooter">Scooter</option>
                    <option value="car">Car</option>
                    <option value="bicycle">Bicycle</option>
                  </select>
                </div>

                <div className="form-group checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={feeCalculator.isRushHour}
                      onChange={(e) => setFeeCalculator({ ...feeCalculator, isRushHour: e.target.checked })}
                    />
                    <span>Rush Hour</span>
                  </label>
                </div>

                <button className="btn btn-primary" onClick={calculateDeliveryFee}>
                  Calculate Fee
                </button>
              </div>

              {feeCalculator.result && (
                <div className="calculator-result">
                  <h3>Calculation Result</h3>
                  <div className="result-details">
                    <div className="result-item">
                      <strong>Distance:</strong> {feeCalculator.result.distance} km
                    </div>
                    <div className="result-item">
                      <strong>Base Fee:</strong> {feeCalculator.result.baseFee.toLocaleString()} VND
                    </div>
                    <div className="result-item">
                      <strong>Base Distance:</strong> {feeCalculator.result.baseDistance} km
                    </div>
                    <div className="result-item">
                      <strong>Per Km Fee:</strong> {feeCalculator.result.perKmFee.toLocaleString()} VND
                    </div>
                    {feeCalculator.result.isRushHour && (
                      <div className="result-item rush-hour">
                        <strong>Rush Hour Multiplier:</strong> x{feeCalculator.result.rushHourMultiplier}
                      </div>
                    )}
                    <div className="result-total">
                      <strong>Total Fee:</strong> 
                      <span className="total-amount">{feeCalculator.result.calculatedFee.toLocaleString()} VND</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Create Delivery Modal */}
        {showCreateModal && (
          <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h3>Add Delivery Personnel</h3>
              <form onSubmit={handleCreateDelivery}>
                <div className="form-row">
                  <div className="form-group">
                    <label>First Name *</label>
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} required />
                  </div>
                  <div className="form-group">
                    <label>Last Name *</label>
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} required />
                  </div>
                </div>

                <div className="form-group">
                  <label>Email *</label>
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
                </div>

                <div className="form-group">
                  <label>Phone *</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required />
                </div>

                <div className="form-group">
                  <label>Password *</label>
                  <input 
                    type="password" 
                    name="password" 
                    value={formData.password} 
                    onChange={handleInputChange} 
                    required 
                    minLength={6}
                    placeholder="Ít nhất 6 ký tự"
                  />
                  {validationErrors.password && (
                    <small style={{ color: 'red', display: 'block', marginTop: '4px' }}>
                      {validationErrors.password}
                    </small>
                  )}
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Vehicle Type *</label>
                    <select name="vehicleType" value={formData.vehicleType} onChange={handleInputChange}>
                      <option value="bike">Bike</option>
                      <option value="scooter">Scooter</option>
                      <option value="car">Car</option>
                      <option value="bicycle">Bicycle</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>License Number *</label>
                    <input type="text" name="licenseNumber" value={formData.licenseNumber} onChange={handleInputChange} required />
                  </div>
                </div>

                <div className="form-actions">
                  <button type="button" onClick={() => { setShowCreateModal(false); resetForm(); }} className="btn btn-secondary">
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">Create</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit Delivery Modal */}
        {showEditModal && (
          <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h3>Edit Delivery Personnel</h3>
              <form onSubmit={handleUpdateDelivery}>
                <div className="form-row">
                  <div className="form-group">
                    <label>First Name *</label>
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} required />
                  </div>
                  <div className="form-group">
                    <label>Last Name *</label>
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} required />
                  </div>
                </div>

                <div className="form-group">
                  <label>Email *</label>
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
                </div>

                <div className="form-group">
                  <label>Phone *</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required />
                </div>

                <div className="form-group">
                  <label>Password (leave empty to keep current)</label>
                  <input 
                    type="password" 
                    name="password" 
                    value={formData.password} 
                    onChange={handleInputChange} 
                    placeholder="Ít nhất 6 ký tự hoặc để trống"
                    minLength={6}
                  />
                  {validationErrors.password && (
                    <small style={{ color: 'red', display: 'block', marginTop: '4px' }}>
                      {validationErrors.password}
                    </small>
                  )}
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Vehicle Type *</label>
                    <select name="vehicleType" value={formData.vehicleType} onChange={handleInputChange}>
                      <option value="bike">Bike</option>
                      <option value="scooter">Scooter</option>
                      <option value="car">Car</option>
                      <option value="bicycle">Bicycle</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>License Number *</label>
                    <input type="text" name="licenseNumber" value={formData.licenseNumber} onChange={handleInputChange} required />
                  </div>
                </div>

                <div className="form-actions">
                  <button type="button" onClick={() => { setShowEditModal(false); resetForm(); }} className="btn btn-secondary">
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">Save Changes</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Fee Modal */}
        {showFeeModal && (
          <div className="modal-overlay" onClick={() => setShowFeeModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h3>Add Delivery Fee Configuration</h3>
              <form onSubmit={handleCreateFee}>
                <div className="form-group">
                  <label>Configuration Name *</label>
                  <input type="text" name="name" value={feeFormData.name} onChange={handleFeeInputChange} required />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Base Distance (km) *</label>
                    <input type="number" step="0.1" name="baseDistance" value={feeFormData.baseDistance} onChange={handleFeeInputChange} required />
                  </div>
                  <div className="form-group">
                    <label>Base Fee (VND) *</label>
                    <input type="number" name="baseFee" value={feeFormData.baseFee} onChange={handleFeeInputChange} required />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Per Km Fee (VND) *</label>
                    <input type="number" name="perKmFee" value={feeFormData.perKmFee} onChange={handleFeeInputChange} required />
                  </div>
                  <div className="form-group">
                    <label>Rush Hour Multiplier *</label>
                    <input type="number" step="0.1" name="rushHourMultiplier" value={feeFormData.rushHourMultiplier} onChange={handleFeeInputChange} required />
                  </div>
                </div>

                <div className="form-group">
                  <label>Vehicle Type *</label>
                  <select name="vehicleType" value={feeFormData.vehicleType} onChange={handleFeeInputChange}>
                    <option value="all">All Vehicles</option>
                    <option value="bike">Bike</option>
                    <option value="scooter">Scooter</option>
                    <option value="car">Car</option>
                    <option value="bicycle">Bicycle</option>
                  </select>
                </div>

                <div className="form-group checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="isActive"
                      checked={feeFormData.isActive}
                      onChange={handleFeeInputChange}
                    />
                    <span>Active</span>
                  </label>
                </div>

                <div className="form-actions">
                  <button type="button" onClick={() => { setShowFeeModal(false); resetFeeForm(); }} className="btn btn-secondary">
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">Create</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default DeliveryPage;

