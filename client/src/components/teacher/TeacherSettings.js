// src/components/dashboard/TeacherSettings.js
import React, { useContext, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Settings.css'; // Reuse the same CSS

const TeacherSettings = () => {
  const { user, logout } = useAuth;
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else if (user.role !== 'teacher') {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Get first letter of name for avatar
  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : 'U';
  };

  // If user is not loaded yet, show loading
  if (!user) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo">
          <h2>QuranCloud</h2>
        </div>
        
        <div className="user-info">
          <div className="avatar">{getInitial(user.name)}</div>
          <div className="user-details">
            <h3 style={{ color: '#1e3a8a' }}>{user.name}</h3>
            <span className="role-badge">Teacher</span>
          </div>
        </div>
        
        <nav className="sidebar-nav">
          <ul>
            <li onClick={() => navigate('/teacher-dashboard')}>
              <i className="fas fa-th-large"></i>
              <span>Overview</span>
            </li>
            <li onClick={() => navigate('/students')}>
              <i className="fas fa-user-graduate"></i>
              <span>Students</span>
            </li>
            <li onClick={() => navigate('/assignments')}>
              <i className="fas fa-tasks"></i>
              <span>Assignments</span>
            </li>
            <li onClick={() => navigate('/recitation-review')}>
              <i className="fas fa-microphone"></i>
              <span>Recitations</span>
            </li>
            <li onClick={() => navigate('/progress-tracking')}>
              <i className="fas fa-chart-line"></i>
              <span>Progress</span>
            </li>
            <li className="active" onClick={() => navigate('/teacher-settings')}>
              <i className="fas fa-cog"></i>
              <span>Settings</span>
            </li>
          </ul>
        </nav>
        
        <div className="sidebar-footer">
          <button className="logout-btn" onClick={handleLogout}>
            <i className="fas fa-sign-out-alt"></i>
            <span>Logout</span>
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="main-content">
        <div className="dashboard-content">
          <div className="dashboard-header">
            <h1>Teacher Settings</h1>
          </div>
          
          <div className="settings-container">
            {/* Profile Settings */}
            <div className="settings-card">
              <div className="settings-header">
                <h3>Profile Settings</h3>
              </div>
              <div className="settings-body">
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input type="text" id="name" defaultValue={user.name} />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input type="email" id="email" defaultValue={user.email} />
                </div>
                <div className="form-group">
                  <label htmlFor="bio">Bio</label>
                  <textarea id="bio" placeholder="Tell students about yourself..."></textarea>
                </div>
                <button className="primary-btn">Save Profile</button>
              </div>
            </div>
            
            {/* Notification Settings */}
            <div className="settings-card">
              <div className="settings-header">
                <h3>Notification Preferences</h3>
              </div>
              <div className="settings-body">
                <div className="toggle-setting">
                  <div>
                    <h4>New Recitation Submissions</h4>
                    <p>Get notified when students submit new recitations</p>
                  </div>
                  <label className="switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider round"></span>
                  </label>
                </div>
                <div className="toggle-setting">
                  <div>
                    <h4>Assignment Deadlines</h4>
                    <p>Get reminders about upcoming assignment deadlines</p>
                  </div>
                  <label className="switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider round"></span>
                  </label>
                </div>
                <div className="toggle-setting">
                  <div>
                    <h4>Student Progress Updates</h4>
                    <p>Get weekly summaries of student progress</p>
                  </div>
                  <label className="switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider round"></span>
                  </label>
                </div>
                <button className="primary-btn">Save Preferences</button>
              </div>
            </div>
            
            {/* Class Settings */}
            <div className="settings-card">
              <div className="settings-header">
                <h3>Class Settings</h3>
              </div>
              <div className="settings-body">
                <div className="form-group">
                  <label htmlFor="class-name">Class Name</label>
                  <input type="text" id="class-name" defaultValue="Quran Memorization" />
                </div>
                <div className="form-group">
                  <label htmlFor="class-description">Class Description</label>
                  <textarea id="class-description" defaultValue="A comprehensive Quran memorization class focusing on proper tajweed and understanding."></textarea>
                </div>
                <div className="form-group">
                  <label htmlFor="default-level">Default Student Level</label>
                  <select id="default-level">
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
                <button className="primary-btn">Save Class Settings</button>
              </div>
            </div>
            
            {/* Account Settings */}
            <div className="settings-card">
              <div className="settings-header">
                <h3>Account Settings</h3>
              </div>
              <div className="settings-body">
                <div className="form-group">
                  <label htmlFor="current-password">Current Password</label>
                  <input type="password" id="current-password" />
                </div>
                <div className="form-group">
                  <label htmlFor="new-password">New Password</label>
                  <input type="password" id="new-password" />
                </div>
                <div className="form-group">
                  <label htmlFor="confirm-password">Confirm New Password</label>
                  <input type="password" id="confirm-password" />
                </div>
                <button className="primary-btn">Change Password</button>
                
                <div className="danger-zone">
                  <h4>Danger Zone</h4>
                  <button className="danger-btn">Delete Account</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherSettings;