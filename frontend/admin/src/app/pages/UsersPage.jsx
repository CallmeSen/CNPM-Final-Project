"use client";
// @ts-nocheck

import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import '../styles/dashboard.css';
import '../styles/UsersPage.css';
import { FaEdit, FaTrash, FaPlus, FaUserShield, FaHistory, FaExclamationTriangle } from 'react-icons/fa';

function UsersPage() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [userTypeFilter, setUserTypeFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [superAdminName, setSuperAdminName] = useState('');
  
  // Modal states
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showLogsModal, setShowLogsModal] = useState(false);
  const [showPermissionsModal, setShowPermissionsModal] = useState(false);
  
  const [selectedUser, setSelectedUser] = useState(null);
  const [userLogs, setUserLogs] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});
  
  const [formData, setFormData] = useState({
    userType: 'customer',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    role: 'admin',
    permissions: [],
    restaurantId: ''
  });

  const availablePermissions = [
    'manage-users',
    'manage-restaurants',
    'manage-orders',
    'view-reports',
    'manage-payments'
  ];

  useEffect(() => {
    const name = localStorage.getItem('superAdminName');
    if (name) setSuperAdminName(name);
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let filtered = users;
    
    if (userTypeFilter !== 'all') {
      filtered = filtered.filter(u => u.userType === userTypeFilter);
    }
    
    if (searchQuery) {
      filtered = filtered.filter(u => 
        `${u.firstName} ${u.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setFilteredUsers(filtered);
  }, [users, userTypeFilter, searchQuery]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/management/users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (res.ok) {
        const data = await res.json();
        setUsers(data);
      } else {
        const data = await res.json();
        setError(data.message || 'Failed to fetch users');
      }
    } catch (err) {
      setError('Server error while fetching users');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePermissionToggle = (permission) => {
    const newPermissions = formData.permissions.includes(permission)
      ? formData.permissions.filter(p => p !== permission)
      : [...formData.permissions, permission];
    setFormData({ ...formData, permissions: newPermissions });
  };

  const handleCreateUser = async (e) => {
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
      const res = await fetch('/api/management/users', {
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
        fetchUsers();
      } else {
        alert(data.message || 'Failed to create user');
      }
    } catch (err) {
      alert('Server error during user creation');
      console.error(err);
    }
  };

  const handleUpdateUser = async (e) => {
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
      const res = await fetch(`/api/management/users/${selectedUser._id}`, {
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
        fetchUsers();
      } else {
        alert(data.message || 'Failed to update user');
      }
    } catch (err) {
      alert('Server error during user update');
      console.error(err);
    }
  };

  const handleDeleteUser = async (user) => {
    if (!window.confirm(`Are you sure you want to delete ${user.firstName} ${user.lastName}?`)) return;

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/management/users/${user._id}?userType=${user.userType}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      
      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        fetchUsers();
      } else {
        alert(data.message || 'Failed to delete user');
      }
    } catch (err) {
      alert('Server error during deletion');
      console.error(err);
    }
  };

  const handleViewLogs = async (user) => {
    setSelectedUser(user);
    setShowLogsModal(true);
    
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/management/users/${user._id}/logs`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (res.ok) {
        const logs = await res.json();
        setUserLogs(logs);
      }
    } catch (err) {
      console.error('Error fetching logs:', err);
    }
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setFormData({
      userType: user.userType,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      password: '',
      role: user.role || 'admin',
      permissions: user.permissions || [],
      restaurantId: user.restaurantId || ''
    });
    setShowEditModal(true);
  };

  const handleManagePermissions = (user) => {
    if (user.userType !== 'admin') {
      alert('Only admin users have permissions');
      return;
    }
    setSelectedUser(user);
    setFormData({
      ...formData,
      permissions: user.permissions || []
    });
    setShowPermissionsModal(true);
  };

  const handleUpdatePermissions = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/management/users/${selectedUser._id}/permissions`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ permissions: formData.permissions }),
      });
      
      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        setShowPermissionsModal(false);
        fetchUsers();
      } else {
        alert(data.message || 'Failed to update permissions');
      }
    } catch (err) {
      alert('Server error during permissions update');
      console.error(err);
    }
  };

  const resetForm = () => {
    setFormData({
      userType: 'customer',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      role: 'admin',
      permissions: [],
      restaurantId: ''
    });
    setSelectedUser(null);
  };

  const getUserTypeBadge = (type) => {
    const badges = {
      customer: { color: '#3498db', label: 'Customer' },
      admin: { color: '#e74c3c', label: 'Admin' },
      restaurant: { color: '#f39c12', label: 'Restaurant' },
      delivery: { color: '#27ae60', label: 'Delivery' }
    };
    const badge = badges[type] || { color: '#95a5a6', label: type };
    return (
      <span className="user-type-badge" style={{ backgroundColor: badge.color }}>
        {badge.label}
      </span>
    );
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="main-content">
        <div className="dashboard-header">
          <h1>User Management</h1>
          <div className="user-profile">
            <strong>Welcome, {superAdminName} 👋</strong>
          </div>
        </div>

        <div className="content-area">
          <div className="page-header">
            <h2>👥 Manage Users</h2>
            <button className="btn btn-primary" onClick={() => setShowCreateModal(true)}>
              <FaPlus /> Add New User
            </button>
          </div>

          <div className="filters-section">
            <div className="filter-group">
              <label>Filter by Type:</label>
              <select 
                value={userTypeFilter} 
                onChange={(e) => setUserTypeFilter(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Users</option>
                <option value="customer">Customers</option>
                <option value="restaurant">Restaurants</option>
                <option value="admin">Admins</option>
                <option value="delivery">Delivery Personnel</option>
              </select>
            </div>
            <div className="search-container">
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
          </div>

          {error && <p className="error">{error}</p>}
          
          {loading ? (
            <p>Loading users...</p>
          ) : (
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Role/Permissions</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={`${user.userType}-${user._id}`}>
                      <td>{getUserTypeBadge(user.userType)}</td>
                      <td>{user.firstName} {user.lastName}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>
                        {user.userType === 'admin' && (
                          <div className="permissions-preview">
                            <span className="role-badge">{user.role}</span>
                            {user.permissions && user.permissions.length > 0 && (
                              <span className="permissions-count">
                                {user.permissions.length} permissions
                              </span>
                            )}
                          </div>
                        )}
                        {user.userType !== 'admin' && <span className="text-muted">N/A</span>}
                      </td>
                      <td className="action-buttons">
                        <button 
                          className="btn-icon edit" 
                          onClick={() => handleEditClick(user)}
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                        {user.userType === 'admin' && (
                          <button 
                            className="btn-icon permissions" 
                            onClick={() => handleManagePermissions(user)}
                            title="Manage Permissions"
                          >
                            <FaUserShield />
                          </button>
                        )}
                        <button 
                          className="btn-icon logs" 
                          onClick={() => handleViewLogs(user)}
                          title="View Activity Logs"
                        >
                          <FaHistory />
                        </button>
                        <button 
                          className="btn-icon delete" 
                          onClick={() => handleDeleteUser(user)}
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredUsers.length === 0 && (
                <p className="no-data">No users found matching your criteria.</p>
              )}
            </div>
          )}
        </div>

        {/* Create User Modal */}
        {showCreateModal && (
          <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h3>Create New User</h3>
              <form onSubmit={handleCreateUser}>
                <div className="form-group">
                  <label>User Type *</label>
                  <select name="userType" value={formData.userType} onChange={handleInputChange} required>
                    <option value="customer">Customer</option>
                    <option value="restaurant">Restaurant Admin</option>
                    <option value="admin">Admin</option>
                    <option value="delivery">Delivery Personnel</option>
                  </select>
                </div>
                
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

                {formData.userType === 'admin' && (
                  <>
                    <div className="form-group">
                      <label>Admin Role *</label>
                      <select name="role" value={formData.role} onChange={handleInputChange}>
                        <option value="admin">Admin</option>
                        <option value="super-admin">Super Admin</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Permissions</label>
                      <div className="permissions-checkboxes">
                        {availablePermissions.map(perm => (
                          <label key={perm} className="checkbox-label">
                            <input
                              type="checkbox"
                              checked={formData.permissions.includes(perm)}
                              onChange={() => handlePermissionToggle(perm)}
                            />
                            {perm}
                          </label>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {formData.userType === 'restaurant' && (
                  <div className="form-group">
                    <label>Restaurant ID</label>
                    <input type="text" name="restaurantId" value={formData.restaurantId} onChange={handleInputChange} />
                  </div>
                )}

                <div className="form-actions">
                  <button type="button" onClick={() => { setShowCreateModal(false); resetForm(); }} className="btn btn-secondary">
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">Create User</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit User Modal */}
        {showEditModal && (
          <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h3>Edit User</h3>
              <form onSubmit={handleUpdateUser}>
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

                {formData.userType === 'admin' && (
                  <div className="form-group">
                    <label>Admin Role *</label>
                    <select name="role" value={formData.role} onChange={handleInputChange}>
                      <option value="admin">Admin</option>
                      <option value="super-admin">Super Admin</option>
                    </select>
                  </div>
                )}

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

        {/* Permissions Modal */}
        {showPermissionsModal && selectedUser && (
          <div className="modal-overlay" onClick={() => setShowPermissionsModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h3>Manage Permissions - {selectedUser.firstName} {selectedUser.lastName}</h3>
              <div className="permissions-manager">
                <p className="help-text">Select the permissions you want to grant to this admin:</p>
                <div className="permissions-checkboxes">
                  {availablePermissions.map(perm => (
                    <label key={perm} className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={formData.permissions.includes(perm)}
                        onChange={() => handlePermissionToggle(perm)}
                      />
                      <span>{perm}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="form-actions">
                <button onClick={() => setShowPermissionsModal(false)} className="btn btn-secondary">
                  Cancel
                </button>
                <button onClick={handleUpdatePermissions} className="btn btn-primary">
                  Update Permissions
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Logs Modal */}
        {showLogsModal && selectedUser && (
          <div className="modal-overlay" onClick={() => setShowLogsModal(false)}>
            <div className="modal-content logs-modal" onClick={(e) => e.stopPropagation()}>
              <h3>Activity Logs - {selectedUser.firstName} {selectedUser.lastName}</h3>
              <div className="logs-container">
                {userLogs.length === 0 ? (
                  <p className="no-data">No activity logs available.</p>
                ) : (
                  <table className="logs-table">
                    <thead>
                      <tr>
                        <th>Action</th>
                        <th>Timestamp</th>
                        <th>IP Address</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userLogs.map((log) => (
                        <tr key={log.id} className={log.suspicious ? 'suspicious-activity' : ''}>
                          <td>
                            {log.action}
                            {log.suspicious && <FaExclamationTriangle className="warning-icon" />}
                          </td>
                          <td>{new Date(log.timestamp).toLocaleString()}</td>
                          <td>{log.ipAddress}</td>
                          <td>
                            <span className={`status-badge status-${log.status}`}>
                              {log.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
              <div className="form-actions">
                <button onClick={() => setShowLogsModal(false)} className="btn btn-primary">
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default UsersPage;
