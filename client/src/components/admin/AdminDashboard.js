import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../common/Navigation';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeStudents: 0,
    activeTeachers: 0,
    totalRecitations: 0
  });
  
  const [recentUsers, setRecentUsers] = useState([]);
  const [systemAlerts, setSystemAlerts] = useState([]);
  
  useEffect(() => {
    // Mock data - in a real app, this would be fetched from an API
    const mockStats = {
      totalUsers: 256,
      activeStudents: 187,
      activeTeachers: 24,
      totalRecitations: 1543
    };
    
    const mockRecentUsers = [
      { id: 1, name: 'Ahmed Khan', email: 'ahmed@example.com', role: 'student', joinDate: '2023-05-15' },
      { id: 2, name: 'Fatima Ali', email: 'fatima@example.com', role: 'teacher', joinDate: '2023-05-14' },
      { id: 3, name: 'Omar Farooq', email: 'omar@example.com', role: 'student', joinDate: '2023-05-13' },
      { id: 4, name: 'Aisha Malik', email: 'aisha@example.com', role: 'student', joinDate: '2023-05-12' },
      { id: 5, name: 'Yusuf Rahman', email: 'yusuf@example.com', role: 'teacher', joinDate: '2023-05-11' }
    ];
    
    const mockSystemAlerts = [
      { id: 1, type: 'warning', message: 'Database backup scheduled for tonight at 2 AM', time: '2 hours ago' },
      { id: 2, type: 'info', message: 'System update completed successfully', time: '1 day ago' },
      { id: 3, type: 'error', message: 'Failed login attempts detected from unusual IP', time: '2 days ago' }
    ];
    
    setStats(mockStats);
    setRecentUsers(mockRecentUsers);
    setSystemAlerts(mockSystemAlerts);
  }, []);
  
  return (
    <div className="admin-dashboard">
      <Navigation userRole="admin" />
      
      <div className="main-content">
        <div className="dashboard-header">
          <h1>Admin Dashboard</h1>
          <button className="refresh-btn">
            <i className="fas fa-sync-alt"></i> Refresh Data
          </button>
        </div>
        
        <div className="stats-cards">
          <div className="stat-card">
            <div className="stat-icon users-icon">
              <i className="fas fa-users"></i>
            </div>
            <div className="stat-details">
              <h3>Total Users</h3>
              <p className="stat-number">{stats.totalUsers}</p>
              <p className="stat-info">Across all roles</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon students-icon">
              <i className="fas fa-user-graduate"></i>
            </div>
            <div className="stat-details">
              <h3>Active Students</h3>
              <p className="stat-number">{stats.activeStudents}</p>
              <p className="stat-info">Learning on the platform</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon teachers-icon">
              <i className="fas fa-chalkboard-teacher"></i>
            </div>
            <div className="stat-details">
              <h3>Active Teachers</h3>
              <p className="stat-number">{stats.activeTeachers}</p>
              <p className="stat-info">Teaching on the platform</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon recitations-icon">
              <i className="fas fa-microphone-alt"></i>
            </div>
            <div className="stat-details">
              <h3>Total Recitations</h3>
              <p className="stat-number">{stats.totalRecitations}</p>
              <p className="stat-info">Submitted by students</p>
            </div>
          </div>
        </div>
        
        <div className="dashboard-sections">
          <div className="dashboard-section">
            <div className="section-header">
              <h2>Recent Users</h2>
              <button className="view-all-btn" onClick={() => navigate('/user-management')}>
                View All
              </button>
            </div>
            <div className="recent-users-table">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Join Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentUsers.map(user => (
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        <span className={`role-badge ${user.role}`}>
                          {user.role}
                        </span>
                      </td>
                      <td>{user.joinDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="dashboard-section">
            <div className="section-header">
              <h2>System Alerts</h2>
              <button className="view-all-btn">View All</button>
            </div>
            <div className="system-alerts">
              {systemAlerts.map(alert => (
                <div key={alert.id} className={`alert-item ${alert.type}`}>
                  <div className="alert-icon">
                    {alert.type === 'warning' && <i className="fas fa-exclamation-triangle"></i>}
                    {alert.type === 'info' && <i className="fas fa-info-circle"></i>}
                    {alert.type === 'error' && <i className="fas fa-exclamation-circle"></i>}
                  </div>
                  <div className="alert-content">
                    <p className="alert-message">{alert.message}</p>
                    <p className="alert-time">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="dashboard-footer">
          <div className="quick-actions">
            <h3>Quick Actions</h3>
            <div className="action-buttons">
              <button className="action-btn" onClick={() => navigate('/user-management')}>
                <i className="fas fa-user-plus"></i>
                <span>Add User</span>
              </button>
              <button className="action-btn" onClick={() => navigate('/system-settings')}>
                <i className="fas fa-cog"></i>
                <span>System Settings</span>
              </button>
              <button className="action-btn" onClick={() => navigate('/analytics')}>
                <i className="fas fa-chart-bar"></i>
                <span>View Analytics</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;