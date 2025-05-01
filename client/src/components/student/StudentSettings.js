// src/components/student/StudentSettings.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Updated import
import Navigation from '../common/Navigation';
import './StudentSettings.css'; // Make sure to create this file

const StudentSettings = () => {
  const { user, logout } = useAuth(); // Using useAuth hook
  const navigate = useNavigate();
  
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    bio: ''
  });
  
  const [notifications, setNotifications] = useState({
    email: true,
    assignments: true,
    feedback: true
  });
  
  const handleProfileChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleNotificationChange = (e) => {
    setNotifications({
      ...notifications,
      [e.target.name]: e.target.checked
    });
  };
  
  const handleProfileSubmit = (e) => {
    e.preventDefault();
    // Save profile data (would connect to API in real app)
    alert('Profile updated successfully!');
  };
  
  const handleNotificationSubmit = (e) => {
    e.preventDefault();
    // Save notification preferences (would connect to API in real app)
    alert('Notification preferences updated!');
  };
  
  return (
    <div className="settings-container">
      <Navigation userRole="student" />
      
      <div className="main-content">
        <div className="settings-header">
          <h1>Account Settings</h1>
          <p>Manage your account preferences</p>
        </div>
        
        <div className="settings-sections">
          <div className="settings-section">
            <h2>Profile Information</h2>
            <form onSubmit={handleProfileSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={profileData.name}
                  onChange={handleProfileChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleProfileChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleProfileChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="bio">Bio</label>
                <textarea
                  id="bio"
                  name="bio"
                  value={profileData.bio}
                  onChange={handleProfileChange}
                  rows="4"
                ></textarea>
              </div>
              <button type="submit" className="primary-btn">Save Profile</button>
            </form>
          </div>
          
          <div className="settings-section">
            <h2>Notification Preferences</h2>
            <form onSubmit={handleNotificationSubmit}>
              <div className="form-group checkbox">
                <input
                  type="checkbox"
                  id="email-notifications"
                  name="email"
                  checked={notifications.email}
                  onChange={handleNotificationChange}
                />
                <label htmlFor="email-notifications">Email Notifications</label>
              </div>
              <div className="form-group checkbox">
                <input
                  type="checkbox"
                  id="assignment-notifications"
                  name="assignments"
                  checked={notifications.assignments}
                  onChange={handleNotificationChange}
                />
                <label htmlFor="assignment-notifications">New Assignment Alerts</label>
              </div>
              <div className="form-group checkbox">
                <input
                  type="checkbox"
                  id="feedback-notifications"
                  name="feedback"
                  checked={notifications.feedback}
                  onChange={handleNotificationChange}
                />
                <label htmlFor="feedback-notifications">Feedback Notifications</label>
              </div>
              <button type="submit" className="primary-btn">Save Notification Settings</button>
            </form>
          </div>
          
          <div className="settings-section">
            <h2>Learning Preferences</h2>
            <div className="form-group">
              <label htmlFor="recitation-speed">Preferred Recitation Speed</label>
              <select id="recitation-speed">
                <option value="slow">Slow</option>
                <option value="medium">Medium</option>
                <option value="fast">Fast</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="study-method">Preferred Study Method</label>
              <select id="study-method">
                <option value="audio">Audio Recitations</option>
                <option value="video">Video Lessons</option>
                <option value="reading">Reading Text</option>
              </select>
            </div>
            <button className="primary-btn">Save Learning Preferences</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentSettings;