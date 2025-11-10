"use client";
// @ts-nocheck

import React from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import '../styles/Sidebar.css';
import { FaTachometerAlt, FaUtensils, FaUsers, FaTruck, FaClipboardList, FaCog, FaSignOutAlt } from 'react-icons/fa';

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('superAdminName');
    router.push('/login');
  };

  const getLinkClassName = (path) => 
    pathname === path ? "sidebar-link active" : "sidebar-link";

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>Fastie.Saigon</h3>
      </div>
      <nav className="sidebar-nav">
        <Link href="/dashboard" className={getLinkClassName('/dashboard')}>
          <FaTachometerAlt />
          <span>Dashboard</span>
        </Link>
        <Link href="/restaurants" className={getLinkClassName('/restaurants')}>
          <FaUtensils />
          <span>Restaurants</span>
        </Link>
        <Link href="/users" className={getLinkClassName('/users')}>
          <FaUsers />
          <span>Users</span>
        </Link>
        <Link href="/delivery" className={getLinkClassName('/delivery')}>
          <FaTruck />
          <span>Delivery</span>
        </Link>
        <Link href="/orders" className={getLinkClassName('/orders')}>
          <FaClipboardList />
          <span>Orders</span>
        </Link>
        <Link href="/settings" className={getLinkClassName('/settings')}>
          <FaCog />
          <span>Settings</span>
        </Link>
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
