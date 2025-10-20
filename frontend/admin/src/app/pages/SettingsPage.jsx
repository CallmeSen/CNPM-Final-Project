"use client";
// @ts-nocheck

import React from 'react';
import Sidebar from '../components/Sidebar';
import '../styles/dashboard.css';

const SettingsPage = () => {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="main-content">
        <div className="dashboard-header">
          <h1>Settings</h1>
        </div>
        <div className="content-area">
          <h2>System Settings</h2>
          <p>This is where you will configure system-wide settings.</p>
          {/* Placeholder for future settings options */}
        </div>
      </main>
    </div>
  );
};

export default SettingsPage;
