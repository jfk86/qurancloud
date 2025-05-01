import React, { useState } from 'react';
import Navigation from '../common/Navigation';
import './AdminSettings.css';

const AdminSettings = () => {
  const [generalSettings, setGeneralSettings] = useState({
    siteName: 'QuranCloud',
    siteDescription: 'Islamic Education Platform',
    contactEmail: 'admin@qurancloud.co.uk',
    maxUploadSize: 10
  });

  const [emailSettings, setEmailSettings] = useState({
    smtpServer: 'smtp.example.com',
    smtpPort: 587,
    smtpUsername: 'notifications@qurancloud.co.uk',
    smtpPassword: '********',
    senderName: 'QuranCloud Admin',
    senderEmail: 'notifications@qurancloud.co.uk'
  });

  const [securitySettings, setSecuritySettings] = useState({
    enableTwoFactor: false,
    passwordExpiry: 90,
    maxLoginAttempts: 5,
    sessionTimeout: 30
  });

  const handleGeneralSettingsChange = (e) => {
    const { name, value } = e.target;
    setGeneralSettings({
      ...generalSettings,
      [name]: value
    });
  };

  const handleEmailSettingsChange = (e) => {
    const { name, value } = e.target;
    setEmailSettings({
      ...emailSettings,
      [name]: value
    });
  };

  const handleSecuritySettingsChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSecuritySettings({
      ...securitySettings,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSaveSettings = (settingType) => {
    // In a real app, this would send the settings to the backend
    console.log(`Saving ${settingType} settings`);
    alert(`${settingType} settings saved successfully!`);
  };

  return (
    <div className="admin-settings">
      <Navigation userRole="admin" />
      
      <div className="main-content">
        <div className="settings-header">
          <h1>System Settings</h1>
        </div>
        
        <div className="settings-sections">
          {/* General Settings */}
          <div className="settings-section">
            <h2>General Settings</h2>
            <div className="settings-form">
              <div className="form-group">
                <label htmlFor="siteName">Site Name</label>
                <input
                  type="text"
                  id="siteName"
                  name="siteName"
                  value={generalSettings.siteName}
                  onChange={handleGeneralSettingsChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="siteDescription">Site Description</label>
                <textarea
                  id="siteDescription"
                  name="siteDescription"
                  value={generalSettings.siteDescription}
                  onChange={handleGeneralSettingsChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="contactEmail">Contact Email</label>
                <input
                  type="email"
                  id="contactEmail"
                  name="contactEmail"
                  value={generalSettings.contactEmail}
                  onChange={handleGeneralSettingsChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="maxUploadSize">Max Upload Size (MB)</label>
                <input
                  type="number"
                  id="maxUploadSize"
                  name="maxUploadSize"
                  value={generalSettings.maxUploadSize}
                  onChange={handleGeneralSettingsChange}
                />
              </div>
              
              <div className="form-actions">
                <button 
                  className="save-btn"
                  onClick={() => handleSaveSettings('general')}
                >
                  Save General Settings
                </button>
              </div>
            </div>
          </div>
          
          {/* Email Settings */}
          <div className="settings-section">
            <h2>Email Settings</h2>
            <div className="settings-form">
              <div className="form-group">
                <label htmlFor="smtpServer">SMTP Server</label>
                <input
                  type="text"
                  id="smtpServer"
                  name="smtpServer"
                  value={emailSettings.smtpServer}
                  onChange={handleEmailSettingsChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="smtpPort">SMTP Port</label>
                <input
                  type="number"
                  id="smtpPort"
                  name="smtpPort"
                  value={emailSettings.smtpPort}
                  onChange={handleEmailSettingsChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="smtpUsername">SMTP Username</label>
                <input
                  type="text"
                  id="smtpUsername"
                  name="smtpUsername"
                  value={emailSettings.smtpUsername}
                  onChange={handleEmailSettingsChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="smtpPassword">SMTP Password</label>
                <input
                  type="password"
                  id="smtpPassword"
                  name="smtpPassword"
                  value={emailSettings.smtpPassword}
                  onChange={handleEmailSettingsChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="senderName">Sender Name</label>
                <input
                  type="text"
                  id="senderName"
                  name="senderName"
                  value={emailSettings.senderName}
                  onChange={handleEmailSettingsChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="senderEmail">Sender Email</label>
                <input
                  type="email"
                  id="senderEmail"
                  name="senderEmail"
                  value={emailSettings.senderEmail}
                  onChange={handleEmailSettingsChange}
                />
              </div>
              
              <div className="form-actions">
                <button 
                  className="save-btn"
                  onClick={() => handleSaveSettings('email')}
                >
                  Save Email Settings
                </button>
                <button className="test-btn">
                  Test Email Configuration
                </button>
              </div>
            </div>
          </div>
          
          {/* Security Settings */}
          <div className="settings-section">
            <h2>Security Settings</h2>
            <div className="settings-form">
              <div className="form-group checkbox-group">
                <label htmlFor="enableTwoFactor">
                  <input
                    type="checkbox"
                    id="enableTwoFactor"
                    name="enableTwoFactor"
                    checked={securitySettings.enableTwoFactor}
                    onChange={handleSecuritySettingsChange}
                  />
                  Enable Two-Factor Authentication
                </label>
              </div>
              
              <div className="form-group">
                <label htmlFor="passwordExpiry">Password Expiry (days)</label>
                <input
                  type="number"
                  id="passwordExpiry"
                  name="passwordExpiry"
                  value={securitySettings.passwordExpiry}
                  onChange={handleSecuritySettingsChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="maxLoginAttempts">Max Login Attempts</label>
                <input
                  type="number"
                  id="maxLoginAttempts"
                  name="maxLoginAttempts"
                  value={securitySettings.maxLoginAttempts}
                  onChange={handleSecuritySettingsChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="sessionTimeout">Session Timeout (minutes)</label>
                <input
                  type="number"
                  id="sessionTimeout"
                  name="sessionTimeout"
                  value={securitySettings.sessionTimeout}
                  onChange={handleSecuritySettingsChange}
                />
              </div>
              
              <div className="form-actions">
                <button 
                  className="save-btn"
                  onClick={() => handleSaveSettings('security')}
                >
                  Save Security Settings
                </button>
              </div>
            </div>
          </div>
          
          {/* Maintenance Section */}
          <div className="settings-section">
            <h2>Maintenance</h2>
            <div className="maintenance-actions">
              <div className="action-card">
                <div className="action-icon">
                  <i className="fas fa-database"></i>
                </div>
                <div className="action-details">
                  <h3>Database Backup</h3>
                  <p>Create a backup of the entire database</p>
                  <button className="action-btn">Create Backup</button>
                </div>
              </div>
              
              <div className="action-card">
                <div className="action-icon">
                  <i className="fas fa-broom"></i>
                </div>
                <div className="action-details">
                  <h3>Clear Cache</h3>
                  <p>Clear system cache to free up space</p>
                  <button className="action-btn">Clear Cache</button>
                </div>
              </div>
              
              <div className="action-card">
                <div className="action-icon">
                  <i className="fas fa-file-archive"></i>
                </div>
                <div className="action-details">
                  <h3>Clean Temporary Files</h3>
                  <p>Remove temporary files from the system</p>
                  <button className="action-btn">Clean Files</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;