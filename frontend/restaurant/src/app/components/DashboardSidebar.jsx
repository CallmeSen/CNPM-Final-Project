"use client";
// @ts-nocheck

import React from 'react';

const DEFAULT_NAV_ITEMS = [
  { key: 'profile', label: 'Profile', icon: '??', tab: 'profile' },
  { key: 'foodItems', label: 'Food Items', icon: '???', tab: 'foodItems' },
  { key: 'availability', label: 'Availability', icon: '??', tab: 'availability' },
  { key: 'reports', label: 'Reports', icon: '??', path: '/reports' },
];

const DashboardSidebar = ({
  activeKey = '',
  navItems = DEFAULT_NAV_ITEMS,
  onSelect = () => {},
  header = null,
  footer = null,
}) => {
  const handleClick = (item) => {
    onSelect(item);
  };

  return (
    <aside className="dashboard-sidebar">
      {header}
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <button
            key={item.key}
            type="button"
            className={`sidebar-link ${activeKey === item.key ? 'active' : ''}`}
            onClick={() => handleClick(item)}
          >
            {item.icon ? (
              <span className="sidebar-link__icon" aria-hidden="true">
                {item.icon}
              </span>
            ) : null}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
      {footer}
    </aside>
  );
};

export default DashboardSidebar;
