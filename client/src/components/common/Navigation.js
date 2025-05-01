// src/components/common/Navigation.js
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Navigation.css';

const Navigation = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };
  
  const handleNavigation = (path) => {
    navigate(path);
  };
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  // Define navigation items based on user role
  const getNavItems = () => {
    if (user?.role === 'admin') {
      return [
        { path: '/admin-dashboard', icon: 'th-large', label: 'Dashboard' },
        { path: '/user-management', icon: 'users', label: 'Users' },
        { path: '/analytics', icon: 'chart-bar', label: 'Analytics' },
        { path: '/system-settings', icon: 'cog', label: 'Settings' }
      ];
    } else if (user?.role === 'teacher') {
      return [
        { path: '/teacher-dashboard', icon: 'th-large', label: 'Dashboard' },
        { path: '/student-management', icon: 'user-graduate', label: 'Students' },
        { path: '/assignment-management', icon: 'tasks', label: 'Assignments' },
        { path: '/recitation-review', icon: 'microphone', label: 'Recitations' },
        { path: '/progress-tracking', icon: 'chart-line', label: 'Progress' },
        { path: '/teacher-settings', icon: 'cog', label: 'Settings' }
      ];
    } else {
      // Default student navigation
      return [
        { path: '/dashboard', icon: 'th-large', label: 'Dashboard' },
        { path: '/recitations', icon: 'microphone', label: 'Recitations' },
        { path: '/progress', icon: 'chart-line', label: 'Progress' },
        { path: '/settings', icon: 'cog', label: 'Settings' }
      ];
    }
  };
  
  const navItems = getNavItems();
  
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>QuranCloud</h3>
        <div className="user-info">
          <span className="user-name">{user?.name || 'User'}</span>
          <span className="user-role">{user?.role || 'Student'}</span>
        </div>
      </div>
      
      <nav className="sidebar-nav">
        <ul>
          {navItems.map((item) => (
            <li 
              key={item.path} 
              className={isActive(item.path)}
              onClick={() => handleNavigation(item.path)}
            >
              <i className={`fas fa-${item.icon}`}></i>
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="sidebar-footer">
        <button className="logout-btn" onClick={handleLogout}>
          <i className="fas fa-sign-out-alt"></i>
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Navigation;