import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Assignments.css'; // Create this file for styling

const Assignments = () => {
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - replace with API call later
    const mockAssignments = [
      {
        id: 1,
        title: 'Memorize Surah Al-Fatiha',
        description: 'Complete memorization of Surah Al-Fatiha with proper tajweed',
        dueDate: '2023-12-15',
        status: 'in-progress',
        assignedBy: 'Sheikh Abdullah'
      },
      {
        id: 2,
        title: 'Practice Surah Al-Ikhlas recitation',
        description: 'Focus on pronunciation and rhythm',
        dueDate: '2023-12-10',
        status: 'not-started',
        assignedBy: 'Sheikh Abdullah'
      },
      {
        id: 3,
        title: 'Review Surah Al-Nas',
        description: 'Review previously memorized Surah with attention to tajweed rules',
        dueDate: '2023-12-05',
        status: 'completed',
        assignedBy: 'Sheikh Abdullah'
      }
    ];
    
    setTimeout(() => {
      setAssignments(mockAssignments);
      setLoading(false);
    }, 800); // Simulate loading delay
  }, []);

  const getStatusClass = (status) => {
    switch(status) {
      case 'completed': return 'status-completed';
      case 'in-progress': return 'status-in-progress';
      case 'not-started': return 'status-not-started';
      default: return '';
    }
  };

  return (
    <div className="dashboard">
      {/* Sidebar - same as in Dashboard */}
      <div className="sidebar">
        <div className="logo">QuranCloud</div>
        <div className="user-info">
          <div className="avatar">D</div>
          <div className="user-details">
            <div className="username">d9</div>
            <div className="role-badge">Student</div>
          </div>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li onClick={() => navigate('/dashboard')}>
              <i className="fas fa-home"></i>
              <span>Overview</span>
            </li>
            <li className="active" onClick={() => navigate('/assignments')}>
              <i className="fas fa-tasks"></i>
              <span>My Assignments</span>
            </li>
            <li onClick={() => navigate('/recitations')}>
              <i className="fas fa-microphone"></i>
              <span>My Recitations</span>
            </li>
            <li onClick={() => navigate('/progress')}>
              <i className="fas fa-chart-line"></i>
              <span>My Progress</span>
            </li>
            <li onClick={() => navigate('/settings')}>
              <i className="fas fa-cog"></i>
              <span>Settings</span>
            </li>
          </ul>
        </nav>
        <div className="logout-container">
          <button className="logout-btn" onClick={() => navigate('/login')}>
            <i className="fas fa-sign-out-alt"></i>
            Logout
          </button>
        </div>
      </div>
      
      {/* Main content */}
      <div className="main-content">
        <div className="page-header">
          <h1>My Assignments</h1>
          <div className="header-actions">
            <div className="search-container">
              <input type="text" placeholder="Search assignments..." />
              <i className="fas fa-search"></i>
            </div>
          </div>
        </div>
        
        <div className="assignments-container">
          {loading ? (
            <div className="loading-spinner">Loading assignments...</div>
          ) : (
            <>
              <div className="assignments-filters">
                <button className="filter-btn active">All</button>
                <button className="filter-btn">In Progress</button>
                <button className="filter-btn">Not Started</button>
                <button className="filter-btn">Completed</button>
              </div>
              
              <div className="assignments-list">
                {assignments.map(assignment => (
                  <div className="assignment-card" key={assignment.id}>
                    <div className="assignment-header">
                      <h3>{assignment.title}</h3>
                      <span className={`status-badge ${getStatusClass(assignment.status)}`}>
                        {assignment.status.replace('-', ' ')}
                      </span>
                    </div>
                    <p className="assignment-description">{assignment.description}</p>
                    <div className="assignment-details">
                      <div className="detail-item">
                        <i className="fas fa-calendar"></i>
                        <span>Due: {assignment.dueDate}</span>
                      </div>
                      <div className="detail-item">
                        <i className="fas fa-user"></i>
                        <span>From: {assignment.assignedBy}</span>
                      </div>
                    </div>
                    <div className="assignment-actions">
                      <button className="primary-btn">
                        {assignment.status === 'completed' ? 'View Submission' : 'Start Assignment'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Assignments;