"use client";
// @ts-nocheck

import React, { useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import '../styles/sidebar.css';

function RestaurantSidebar({ activeKey, userName = '' }) {
  const router = useRouter();

  const sidebarNavItems = useMemo(
    () => [
      {
        key: 'profile',
        label: 'Profile',
        icon: '👤',
        path: '/dashboard',
      },
      {
        key: 'foodItems',
        label: 'Food Items',
        icon: '🍽️',
        path: '/food-items',
      },
      {
        key: 'availability',
        label: 'Availability',
        icon: '📅',
        path: '/availability',
      },
      { key: 'orders', label: 'Orders', icon: '📦', path: '/orders' },
      { key: 'reports', label: 'Reports', icon: '📊', path: '/reports' },
    ],
    []
  );

  const handleNavigate = useCallback(
    (item) => {
      if (item.path) {
        router.push(item.path);
      }
    },
    [router]
  );

  const handleLogout = useCallback(() => {
    localStorage.removeItem('token');
    router.push('/');
  }, [router]);

  return (
    <aside className="restaurant-sidebar">
      {/* Header */}
      <div className="sidebar-header">
        {userName && (
          <div className="sidebar-user-greeting">
            <span className="greeting-text">Hello,</span>
            <span className="user-name">{userName}</span>
            <span className="greeting-emoji">👋</span>
          </div>
        )}
        <div className="sidebar-brand">
          <div className="sidebar-logo">🍽️</div>
          <div className="sidebar-brand-text">
            <h2 className="sidebar-title">Restaurant Hub</h2>
            <p className="sidebar-tagline">Manage your restaurant</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        {sidebarNavItems.map((item) => (
          <button
            key={item.key}
            type="button"
            className={`sidebar-nav-item ${activeKey === item.key ? 'active' : ''}`}
            onClick={() => handleNavigate(item)}
          >
            <span className="nav-item-icon">{item.icon}</span>
            <span className="nav-item-label">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        <button type="button" className="sidebar-logout-btn" onClick={handleLogout}>
          <span className="logout-icon">🚪</span>
          <span>Log out</span>
        </button>
      </div>
    </aside>
  );
}

export default RestaurantSidebar;
