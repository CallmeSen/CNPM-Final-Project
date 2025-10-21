"use client";
// @ts-nocheck

import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { FaSave, FaBell, FaShieldAlt, FaPalette, FaEnvelope, FaDatabase, FaCog, FaCheckCircle } from 'react-icons/fa';
import '../styles/dashboard.css';
import '../styles/settings.css';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [saveSuccess, setSaveSuccess] = useState(false);
  
  // General Settings State
  const [generalSettings, setGeneralSettings] = useState({
    siteName: 'Food Delivery Platform',
    siteDescription: 'Best food delivery service in town',
    contactEmail: 'admin@fooddelivery.com',
    supportPhone: '+1 234 567 8900',
    maintenanceMode: false,
    timezone: 'UTC+7',
    language: 'en',
    currency: 'VND'
  });

  // Notification Settings State
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    orderUpdates: true,
    deliveryAlerts: true,
    paymentAlerts: true,
    systemAlerts: true,
    marketingEmails: false
  });

  // Security Settings State
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: '30',
    passwordExpiry: '90',
    loginAttempts: '5',
    ipWhitelist: '',
    forceHttps: true,
    apiRateLimit: '100'
  });

  // Appearance Settings State
  const [appearanceSettings, setAppearanceSettings] = useState({
    theme: 'light',
    primaryColor: '#f97316',
    secondaryColor: '#ec4899',
    sidebarPosition: 'left',
    compactMode: false
  });

  // Email Settings State
  const [emailSettings, setEmailSettings] = useState({
    smtpHost: 'smtp.gmail.com',
    smtpPort: '587',
    smtpUser: '',
    smtpPassword: '',
    fromEmail: 'noreply@fooddelivery.com',
    fromName: 'Food Delivery'
  });

  // Database Settings State
  const [databaseSettings, setDatabaseSettings] = useState({
    autoBackup: true,
    backupFrequency: 'daily',
    backupRetention: '30',
    lastBackup: '2025-10-20 10:30:00'
  });

  const handleGeneralChange = (e) => {
    const { name, value, type, checked } = e.target;
    setGeneralSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotificationSettings(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleSecurityChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSecuritySettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAppearanceChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAppearanceSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleEmailChange = (e) => {
    const { name, value } = e.target;
    setEmailSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDatabaseChange = (e) => {
    const { name, value, type, checked } = e.target;
    setDatabaseSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSaveSettings = () => {
    // Here you would typically save to backend
    console.log('Saving settings:', {
      general: generalSettings,
      notifications: notificationSettings,
      security: securitySettings,
      appearance: appearanceSettings,
      email: emailSettings,
      database: databaseSettings
    });
    
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const tabs = [
    { id: 'general', label: 'General', icon: <FaCog /> },
    { id: 'notifications', label: 'Notifications', icon: <FaBell /> },
    { id: 'security', label: 'Security', icon: <FaShieldAlt /> },
    { id: 'appearance', label: 'Appearance', icon: <FaPalette /> },
    { id: 'email', label: 'Email', icon: <FaEnvelope /> },
    { id: 'database', label: 'Database', icon: <FaDatabase /> }
  ];

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="main-content">
        <div className="dashboard-header">
          <div>
            <h1>System Settings</h1>
            <p className="dashboard-subtitle">Configure your system preferences and options</p>
          </div>
          <button className="save-settings-btn" onClick={handleSaveSettings}>
            <FaSave /> Save All Settings
          </button>
        </div>

        {saveSuccess && (
          <div className="success-banner">
            <FaCheckCircle /> Settings saved successfully!
          </div>
        )}

        <div className="settings-container">
          <div className="settings-tabs">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`settings-tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="settings-content">
            {/* General Settings */}
            {activeTab === 'general' && (
              <div className="settings-section">
                <h2>General Settings</h2>
                <div className="settings-form">
                  <div className="form-group">
                    <label>Site Name</label>
                    <input
                      type="text"
                      name="siteName"
                      value={generalSettings.siteName}
                      onChange={handleGeneralChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Site Description</label>
                    <textarea
                      name="siteDescription"
                      value={generalSettings.siteDescription}
                      onChange={handleGeneralChange}
                      rows="3"
                    />
                  </div>
                  <div className="form-group">
                    <label>Contact Email</label>
                    <input
                      type="email"
                      name="contactEmail"
                      value={generalSettings.contactEmail}
                      onChange={handleGeneralChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Support Phone</label>
                    <input
                      type="tel"
                      name="supportPhone"
                      value={generalSettings.supportPhone}
                      onChange={handleGeneralChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Timezone</label>
                    <select name="timezone" value={generalSettings.timezone} onChange={handleGeneralChange}>
                      <option value="UTC+7">UTC+7 (Vietnam)</option>
                      <option value="UTC+0">UTC+0 (GMT)</option>
                      <option value="UTC-5">UTC-5 (EST)</option>
                      <option value="UTC-8">UTC-8 (PST)</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Language</label>
                    <select name="language" value={generalSettings.language} onChange={handleGeneralChange}>
                      <option value="en">English</option>
                      <option value="vi">Tiếng Việt</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Currency</label>
                    <select name="currency" value={generalSettings.currency} onChange={handleGeneralChange}>
                      <option value="VND">VND (₫)</option>
                      <option value="USD">USD ($)</option>
                    </select>
                  </div>
                  <div className="form-group checkbox-group">
                    <label>
                      <input
                        type="checkbox"
                        name="maintenanceMode"
                        checked={generalSettings.maintenanceMode}
                        onChange={handleGeneralChange}
                      />
                      <span>Enable Maintenance Mode</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Notification Settings */}
            {activeTab === 'notifications' && (
              <div className="settings-section">
                <h2>Notification Settings</h2>
                <div className="settings-form">
                  <div className="form-group checkbox-group">
                    <label>
                      <input
                        type="checkbox"
                        name="emailNotifications"
                        checked={notificationSettings.emailNotifications}
                        onChange={handleNotificationChange}
                      />
                      <span>Email Notifications</span>
                    </label>
                  </div>
                  <div className="form-group checkbox-group">
                    <label>
                      <input
                        type="checkbox"
                        name="smsNotifications"
                        checked={notificationSettings.smsNotifications}
                        onChange={handleNotificationChange}
                      />
                      <span>SMS Notifications</span>
                    </label>
                  </div>
                  <div className="form-group checkbox-group">
                    <label>
                      <input
                        type="checkbox"
                        name="pushNotifications"
                        checked={notificationSettings.pushNotifications}
                        onChange={handleNotificationChange}
                      />
                      <span>Push Notifications</span>
                    </label>
                  </div>
                  <div className="form-group checkbox-group">
                    <label>
                      <input
                        type="checkbox"
                        name="orderUpdates"
                        checked={notificationSettings.orderUpdates}
                        onChange={handleNotificationChange}
                      />
                      <span>Order Updates</span>
                    </label>
                  </div>
                  <div className="form-group checkbox-group">
                    <label>
                      <input
                        type="checkbox"
                        name="deliveryAlerts"
                        checked={notificationSettings.deliveryAlerts}
                        onChange={handleNotificationChange}
                      />
                      <span>Delivery Alerts</span>
                    </label>
                  </div>
                  <div className="form-group checkbox-group">
                    <label>
                      <input
                        type="checkbox"
                        name="paymentAlerts"
                        checked={notificationSettings.paymentAlerts}
                        onChange={handleNotificationChange}
                      />
                      <span>Payment Alerts</span>
                    </label>
                  </div>
                  <div className="form-group checkbox-group">
                    <label>
                      <input
                        type="checkbox"
                        name="systemAlerts"
                        checked={notificationSettings.systemAlerts}
                        onChange={handleNotificationChange}
                      />
                      <span>System Alerts</span>
                    </label>
                  </div>
                  <div className="form-group checkbox-group">
                    <label>
                      <input
                        type="checkbox"
                        name="marketingEmails"
                        checked={notificationSettings.marketingEmails}
                        onChange={handleNotificationChange}
                      />
                      <span>Marketing Emails</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Security Settings */}
            {activeTab === 'security' && (
              <div className="settings-section">
                <h2>Security Settings</h2>
                <div className="settings-form">
                  <div className="form-group checkbox-group">
                    <label>
                      <input
                        type="checkbox"
                        name="twoFactorAuth"
                        checked={securitySettings.twoFactorAuth}
                        onChange={handleSecurityChange}
                      />
                      <span>Enable Two-Factor Authentication</span>
                    </label>
                  </div>
                  <div className="form-group checkbox-group">
                    <label>
                      <input
                        type="checkbox"
                        name="forceHttps"
                        checked={securitySettings.forceHttps}
                        onChange={handleSecurityChange}
                      />
                      <span>Force HTTPS</span>
                    </label>
                  </div>
                  <div className="form-group">
                    <label>Session Timeout (minutes)</label>
                    <input
                      type="number"
                      name="sessionTimeout"
                      value={securitySettings.sessionTimeout}
                      onChange={handleSecurityChange}
                      min="5"
                      max="120"
                    />
                  </div>
                  <div className="form-group">
                    <label>Password Expiry (days)</label>
                    <input
                      type="number"
                      name="passwordExpiry"
                      value={securitySettings.passwordExpiry}
                      onChange={handleSecurityChange}
                      min="30"
                      max="365"
                    />
                  </div>
                  <div className="form-group">
                    <label>Max Login Attempts</label>
                    <input
                      type="number"
                      name="loginAttempts"
                      value={securitySettings.loginAttempts}
                      onChange={handleSecurityChange}
                      min="3"
                      max="10"
                    />
                  </div>
                  <div className="form-group">
                    <label>API Rate Limit (requests/minute)</label>
                    <input
                      type="number"
                      name="apiRateLimit"
                      value={securitySettings.apiRateLimit}
                      onChange={handleSecurityChange}
                      min="10"
                      max="1000"
                    />
                  </div>
                  <div className="form-group">
                    <label>IP Whitelist (comma separated)</label>
                    <textarea
                      name="ipWhitelist"
                      value={securitySettings.ipWhitelist}
                      onChange={handleSecurityChange}
                      rows="3"
                      placeholder="192.168.1.1, 10.0.0.1"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Appearance Settings */}
            {activeTab === 'appearance' && (
              <div className="settings-section">
                <h2>Appearance Settings</h2>
                <div className="settings-form">
                  <div className="form-group">
                    <label>Theme</label>
                    <select name="theme" value={appearanceSettings.theme} onChange={handleAppearanceChange}>
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                      <option value="auto">Auto</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Primary Color</label>
                    <div className="color-picker-wrapper">
                      <input
                        type="color"
                        name="primaryColor"
                        value={appearanceSettings.primaryColor}
                        onChange={handleAppearanceChange}
                      />
                      <input
                        type="text"
                        value={appearanceSettings.primaryColor}
                        onChange={handleAppearanceChange}
                        name="primaryColor"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Secondary Color</label>
                    <div className="color-picker-wrapper">
                      <input
                        type="color"
                        name="secondaryColor"
                        value={appearanceSettings.secondaryColor}
                        onChange={handleAppearanceChange}
                      />
                      <input
                        type="text"
                        value={appearanceSettings.secondaryColor}
                        onChange={handleAppearanceChange}
                        name="secondaryColor"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Sidebar Position</label>
                    <select name="sidebarPosition" value={appearanceSettings.sidebarPosition} onChange={handleAppearanceChange}>
                      <option value="left">Left</option>
                      <option value="right">Right</option>
                    </select>
                  </div>
                  <div className="form-group checkbox-group">
                    <label>
                      <input
                        type="checkbox"
                        name="compactMode"
                        checked={appearanceSettings.compactMode}
                        onChange={handleAppearanceChange}
                      />
                      <span>Compact Mode</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Email Settings */}
            {activeTab === 'email' && (
              <div className="settings-section">
                <h2>Email Settings</h2>
                <div className="settings-form">
                  <div className="form-group">
                    <label>SMTP Host</label>
                    <input
                      type="text"
                      name="smtpHost"
                      value={emailSettings.smtpHost}
                      onChange={handleEmailChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>SMTP Port</label>
                    <input
                      type="text"
                      name="smtpPort"
                      value={emailSettings.smtpPort}
                      onChange={handleEmailChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>SMTP Username</label>
                    <input
                      type="text"
                      name="smtpUser"
                      value={emailSettings.smtpUser}
                      onChange={handleEmailChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>SMTP Password</label>
                    <input
                      type="password"
                      name="smtpPassword"
                      value={emailSettings.smtpPassword}
                      onChange={handleEmailChange}
                      placeholder="••••••••"
                    />
                  </div>
                  <div className="form-group">
                    <label>From Email</label>
                    <input
                      type="email"
                      name="fromEmail"
                      value={emailSettings.fromEmail}
                      onChange={handleEmailChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>From Name</label>
                    <input
                      type="text"
                      name="fromName"
                      value={emailSettings.fromName}
                      onChange={handleEmailChange}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Database Settings */}
            {activeTab === 'database' && (
              <div className="settings-section">
                <h2>Database Settings</h2>
                <div className="settings-form">
                  <div className="form-group checkbox-group">
                    <label>
                      <input
                        type="checkbox"
                        name="autoBackup"
                        checked={databaseSettings.autoBackup}
                        onChange={handleDatabaseChange}
                      />
                      <span>Enable Automatic Backups</span>
                    </label>
                  </div>
                  <div className="form-group">
                    <label>Backup Frequency</label>
                    <select name="backupFrequency" value={databaseSettings.backupFrequency} onChange={handleDatabaseChange}>
                      <option value="hourly">Hourly</option>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Backup Retention (days)</label>
                    <input
                      type="number"
                      name="backupRetention"
                      value={databaseSettings.backupRetention}
                      onChange={handleDatabaseChange}
                      min="7"
                      max="365"
                    />
                  </div>
                  <div className="form-group">
                    <label>Last Backup</label>
                    <input
                      type="text"
                      value={databaseSettings.lastBackup}
                      disabled
                      className="disabled-input"
                    />
                  </div>
                  <div className="form-group">
                    <button className="btn-primary">Backup Now</button>
                    <button className="btn-secondary">Restore Backup</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SettingsPage;
