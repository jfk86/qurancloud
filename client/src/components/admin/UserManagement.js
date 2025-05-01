import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './UserManagement.css';

const UserManagement = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');

  useEffect(() => {
    // In a real app, fetch this data from your API
    setUsers([
      { id: 1, name: 'Ahmed Ali', email: 'ahmed@example.com', role: 'student', status: 'active', createdAt: '2023-01-15' },
      { id: 2, name: 'Sara Khan', email: 'sara@example.com', role: 'teacher', status: 'active', createdAt: '2023-02-20' },
      { id: 3, name: 'Mohammed Hassan', email: 'mohammed@example.com', role: 'student', status: 'inactive', createdAt: '2023-03-10' },
      { id: 4, name: 'Fatima Zahra', email: 'fatima@example.com', role: 'admin', status: 'active', createdAt: '2023-01-05' },
      { id: 5, name: 'Yusuf Ibrahim', email: 'yusuf@example.com', role: 'teacher', status: 'active', createdAt: '2023-04-12' },
    ]);
  }, []);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const handleAddUser = () => {
    setShowAddModal(true);
  };

  const handleEditUser = (user) => {
    setCurrentUser(user);
    setShowEditModal(true);
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      // In a real app, call your API to delete the user
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  return (
    <div className="user-management">
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
            <li className="active" onClick={() => navigate('/user-management')}>
              <i className="fas fa-users"></i>
              <span>User Management</span>
            </li>
            <li onClick={() => navigate('/system-settings')}>
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
          <h1>User Management</h1>
          <div className="header-actions">
            <button className="primary-btn" onClick={handleAddUser}>
              <i className="fas fa-plus"></i> Add New User
            </button>
          </div>
        </div>

        <div className="filters-container">
          <div className="search-box">
            <i className="fas fa-search"></i>
            <input 
              type="text" 
              placeholder="Search users..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="role-filter">
            <label>Filter by Role:</label>
            <select value={filterRole} onChange={(e) => setFilterRole(e.target.value)}>
              <option value="all">All Roles</option>
              <option value="student">Students</option>
              <option value="teacher">Teachers</option>
              <option value="admin">Administrators</option>
            </select>
          </div>
        </div>

        <div className="users-table-container">
          <table className="users-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <span className={`role-badge ${user.role}`}>{user.role}</span>
                  </td>
                  <td>
                    <span className={`status-badge ${user.status}`}>{user.status}</span>
                  </td>
                  <td>{user.createdAt}</td>
                  <td className="actions">
                    <button className="edit-btn" onClick={() => handleEditUser(user)}>
                      <i className="fas fa-edit"></i>
                    </button>
                    <button className="delete-btn" onClick={() => handleDeleteUser(user.id)}>
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Modal - would be implemented in a real app */}
      {/* Edit User Modal - would be implemented in a real app */}
    </div>
  );
};

export default UserManagement;