import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../styles/Sidebar.css';
import { FaTachometerAlt, FaUtensils, FaUsers, FaTruck, FaClipboardList, FaCog, FaSignOutAlt } from 'react-icons/fa';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('superAdminName');
    navigate('/login');
  };

  const getLinkClassName = ({ isActive }) => 
    isActive ? "sidebar-link active" : "sidebar-link";

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>Fastie.Saigon</h3>
      </div>
      <nav className="sidebar-nav">
        <NavLink to="/dashboard" className={getLinkClassName}>
          <FaTachometerAlt />
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/restaurants" className={getLinkClassName}>
          <FaUtensils />
          <span>Restaurants</span>
        </NavLink>
        <NavLink to="/users" className={getLinkClassName}>
          <FaUsers />
          <span>Users</span>
        </NavLink>
        <NavLink to="/delivery" className={getLinkClassName}>
          <FaTruck />
          <span>Delivery</span>
        </NavLink>
        <NavLink to="/orders" className={getLinkClassName}>
          <FaClipboardList />
          <span>Orders</span>
        </NavLink>
        <NavLink to="/settings" className={getLinkClassName}>
          <FaCog />
          <span>Settings</span>
        </NavLink>
      </nav>
      <div className="sidebar-footer">
        <button onClick={handleLogout} className="logout-button">
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
