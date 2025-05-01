import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './SystemSettings.css';

const SystemSettings = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    siteName: 'QuranCloud',
    siteDescription: 'Online Quran Learning Platform',
    emailNotifications: true,
    autoBackup: true,
    backupFrequency: 'daily',
    maxUploadSize: 10,
    allowRegistration: true,
    maintenanceMode: false,
    analyticsTracking: true,
    defaultUserRole: 'student'
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, save settings to your API
    alert('Settings saved successfully!');
  };

  return (
    <div className="system-settings">
      <div className="sidebar">
        <div className="logo">QuranCloud</div>
        <div className="user-info">
          <div className="avatar">{user?.name?.charAt(0) || 'A'}</div>
          <div className="user-details">
            <div className="username">{user?.name || 'Admin User'}</div>
            <div className="role-badge">Administrator</div>
          </div>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li onClick={() => navigate('/admin-dashboard')}>
              <i className="fas fa-th-large"></i>
              <span>Dashboard</span>
            </li>
            <li onClick={() => navigate('/user-management')}>
              <i className="fas fa-users"></i>
              <span>User Management</span>
            </li>
            <li className="active" onClick={() => navigate('/system-settings')}>
              <i className="fas fa-cogs"></i>
              <span>System Settings</span>
            </li>
            <li onClick={() => navigate('/analytics')}>
              <i className="fas fa-chart-bar"></i>
              <span>Analytics</span>
            </li>
            <li onClick={() => navigate('/admin-settings')}>
              <i className="fas fa-user-cog"></i>
              <span>Settings</span>
            </li>
          </ul>
        </nav>
        <div className="logout-container">
          <button className="logout-btn" onClick={() => {/* Implement logout */}}>
            <i className="fas fa-sign-out-alt"></i>
            <span>Logout</span>
          </button>
        </div>
      </div>

      <div className="main-content">
        <div className="page-header">
          <h1>System Settings</h1>
        </div>

        <form className="settings-form" onSubmit={handleSubmit}>
          <div className="settings-section">
            <h2>General Settings</h2>
            <div className="form-group">
              <label htmlFor="siteName">Site Name</label>
              <input
                type="text"
                id="siteName"
                name="siteName"
                value={settings.siteName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="siteDescription">Site Description</label>
              <textarea
                id="siteDescription"
                name="siteDescription"
                value={settings.siteDescription}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="form-group checkbox">
              <input
                type="checkbox"
                id="allowRegistration"
                name="allowRegistration"
                checked={settings.allowRegistration}
                onChange={handleChange}
              />
              <label htmlFor="allowRegistration">Allow User Registration</label>
            </div>
            <div className="form-group">
              <label htmlFor="defaultUserRole">Default User Role</label>
              <select
                id="defaultUserRole"
                name="defaultUserRole"
                value={settings.defaultUserRole}
                onChange={handleChange}
              >
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
              </select>
            </div>
          </div>

          <div className="settings-section">
            <h2>Email & Notifications</h2>
            <div className="form-group checkbox">
              <input
                type="checkbox"
                id="emailNotifications"
                name="emailNotifications"
                checked={settings.emailNotifications}
                onChange={handleChange}
              />
              <label htmlFor="emailNotifications">Enable Email Notifications</label>
            </div>
          </div>

          <div className="settings-section">
            <h2>Backup & Security</h2>
            <div className="form-group checkbox">
              <input
                type="checkbox"
                id="autoBackup"
                name="autoBackup"
                checked={settings.autoBackup}
                onChange={handleChange}
              />
              <label htmlFor="autoBackup">Enable Automatic Backups</label>
            </div>
            <div className="form-group">
              <label htmlFor="backupFrequency">Backup Frequency</label>
              <select
                id="backupFrequency"
                name="backupFrequency"
                value={settings.backupFrequency}
                onChange={handleChange}
                disabled={!settings.autoBackup}
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="maxUploadSize">Maximum Upload Size (MB)</label>
              <input
                type="number"
                id="maxUploadSize"
                name="maxUploadSize"
                value={settings.maxUploadSize}
                onChange={handleChange}
                min="1"
                max="100"
              />
            </div>
          </div>

          <div className="settings-section">
            <h2>Maintenance</h2>
            <div className="form-group checkbox">
              <input
                type="checkbox"
                id="maintenanceMode"
                name="maintenanceMode"
                checked={settings.maintenanceMode}
                onChange={handleChange}
              />
              <label htmlFor="maintenanceMode">Enable Maintenance Mode</label>
            </div>
          </div>

          <div className="settings-section">
            <h2>Analytics</h2>
            <div className="form-group checkbox">
              <input
                type="checkbox"
                id="analyticsTracking"
                name="analyticsTracking"
                checked={settings.analyticsTracking}
                onChange={handleChange}
              />
              <label htmlFor="analyticsTracking">Enable Analytics Tracking</label>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="primary-btn">Save Settings</button>
            <button type="button" className="secondary-btn" onClick={() => navigate('/admin-dashboard')}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SystemSettings;