// src/components/teacher/TeacherDashboard.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Updated import
import Navigation from '../common/Navigation';
import './TeacherDashboard.css';

const TeacherDashboard = () => {
  const { user, logout } = useAuth(); // Using useAuth hook
  const navigate = useNavigate();
  
  const [stats, setStats] = useState({
    totalStudents: 0,
    pendingRecitations: 0,
    activeAssignments: 0,
    completionRate: 0
  });
  
  const [students, setStudents] = useState([]);
  const [pendingRecitations, setPendingRecitations] = useState([]);
  
  useEffect(() => {
    // Mock data - in a real app, this would be fetched from an API
    setStats({
      totalStudents: 25,
      pendingRecitations: 12,
      activeAssignments: 8,
      completionRate: 78
    });
    
    setStudents([
      { id: 1, name: 'Ahmed Ali', progress: 65, lastActive: '2023-06-15' },
      { id: 2, name: 'Fatima Khan', progress: 82, lastActive: '2023-06-16' },
      { id: 3, name: 'Mohammed Hassan', progress: 45, lastActive: '2023-06-14' },
      { id: 4, name: 'Aisha Malik', progress: 92, lastActive: '2023-06-16' }
    ]);
    
    setPendingRecitations([
      { id: 1, student: 'Ahmed Ali', surah: 'Al-Fatiha', submitted: '2023-06-15' },
      { id: 2, student: 'Fatima Khan', surah: 'Al-Baqarah (1-5)', submitted: '2023-06-16' },
      { id: 3, student: 'Mohammed Hassan', surah: 'Al-Ikhlas', submitted: '2023-06-14' }
    ]);
  }, []);
  
  return (
    <div className="teacher-dashboard-container">
      <Navigation userRole="teacher" />
      
      <div className="main-content">
        <div className="dashboard-header">
          <h1>Welcome, {user?.name || 'Teacher'}</h1>
          <p>Manage your students and assignments</p>
        </div>
        
        <div className="stats-container">
          <div className="stat-card">
            <i className="fas fa-user-graduate"></i>
            <div className="stat-info">
              <h3>{stats.totalStudents}</h3>
              <p>Total Students</p>
            </div>
          </div>
          <div className="stat-card">
            <i className="fas fa-microphone"></i>
            <div className="stat-info">
              <h3>{stats.pendingRecitations}</h3>
              <p>Pending Recitations</p>
            </div>
          </div>
          <div className="stat-card">
            <i className="fas fa-tasks"></i>
            <div className="stat-info">
              <h3>{stats.activeAssignments}</h3>
              <p>Active Assignments</p>
            </div>
          </div>
          <div className="stat-card">
            <i className="fas fa-chart-pie"></i>
            <div className="stat-info">
              <h3>{stats.completionRate}%</h3>
              <p>Completion Rate</p>
            </div>
          </div>
        </div>
        
        <div className="dashboard-sections">
          <div className="dashboard-section">
            <div className="section-header">
              <h2>Recent Students</h2>
              <button className="view-all-btn" onClick={() => navigate('/students')}>
                View All
              </button>
            </div>
            <div className="student-table">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Progress</th>
                    <th>Last Active</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map(student => (
                    <tr key={student.id}>
                      <td>{student.name}</td>
                      <td>
                        <div className="progress-bar">
                          <div 
                            className="progress-fill" 
                            style={{ width: `${student.progress}%` }}
                          ></div>
                        </div>
                        <span>{student.progress}%</span>
                      </td>
                      <td>{student.lastActive}</td>
                      <td>
                        <button className="action-btn" onClick={() => navigate(`/progress-tracking?student=${student.id}`)}>
                          <i className="fas fa-chart-line"></i>
                        </button>
                        <button className="action-btn" onClick={() => navigate(`/assignments?student=${student.id}`)}>
                          <i className="fas fa-tasks"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="dashboard-section">
            <div className="section-header">
              <h2>Pending Recitations</h2>
              <button className="view-all-btn" onClick={() => navigate('/recitation-review')}>
                View All
              </button>
            </div>
            <div className="recitation-list">
              {pendingRecitations.map(recitation => (
                <div key={recitation.id} className="recitation-item">
                  <div className="recitation-info">
                    <h4>{recitation.student}</h4>
                    <p>Surah: {recitation.surah}</p>
                    <p>Submitted: {recitation.submitted}</p>
                  </div>
                  <div className="recitation-actions">
                    <button className="primary-btn" onClick={() => navigate(`/recitation-review?id=${recitation.id}`)}>
                      Review
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;