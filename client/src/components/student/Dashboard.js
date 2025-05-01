// src/components/student/Dashboard.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Navigation from '../common/Navigation';
import './Dashboard.css';

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    completedRecitations: 0,
    pendingAssignments: 0,
    completedSurahs: 0,
    totalProgress: 0
  });
  
  useEffect(() => {
    // Redirect if not authenticated or not a student
    if (!isAuthenticated) {
      navigate('/login');
    } else if (user && user.role !== 'student') {
      // Redirect to appropriate dashboard based on role
      if (user.role === 'teacher') {
        navigate('/teacher-dashboard');
      } else if (user.role === 'admin') {
        navigate('/admin-dashboard');
      }
    }
    
    // Load dashboard data (mock data for now)
    setStats({
      completedRecitations: 24,
      pendingAssignments: 3,
      completedSurahs: 12,
      totalProgress: 35
    });
  }, [isAuthenticated, user, navigate]);
  
  return (
    <div className="dashboard-container">
      <Navigation />
      
      <div className="dashboard-content">
        <div className="dashboard-header">
          <h1>Student Dashboard</h1>
          <p>Welcome back, {user?.name || 'Student'}!</p>
        </div>
        
        <div className="stats-container">
          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-microphone-alt"></i>
            </div>
            <div className="stat-info">
              <h3>{stats.completedRecitations}</h3>
              <p>Completed Recitations</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-tasks"></i>
            </div>
            <div className="stat-info">
              <h3>{stats.pendingAssignments}</h3>
              <p>Pending Assignments</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-book"></i>
            </div>
            <div className="stat-info">
              <h3>{stats.completedSurahs}</h3>
              <p>Completed Surahs</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-chart-line"></i>
            </div>
            <div className="stat-info">
              <h3>{stats.totalProgress}%</h3>
              <p>Total Progress</p>
            </div>
          </div>
        </div>
        
        <div className="dashboard-sections">
          <div className="recent-activity">
            <h2>Recent Activity</h2>
            <ul className="activity-list">
              <li>
                <div className="activity-icon">
                  <i className="fas fa-microphone"></i>
                </div>
                <div className="activity-details">
                  <h4>Surah Al-Fatiha Recitation</h4>
                  <p>Completed with 4.5/5 rating</p>
                  <span className="activity-time">2 hours ago</span>
                </div>
              </li>
              <li>
                <div className="activity-icon">
                  <i className="fas fa-tasks"></i>
                </div>
                <div className="activity-details">
                  <h4>New Assignment</h4>
                  <p>Surah Al-Baqarah (verses 1-5)</p>
                  <span className="activity-time">Yesterday</span>
                </div>
              </li>
              <li>
                <div className="activity-icon">
                  <i className="fas fa-star"></i>
                </div>
                <div className="activity-details">
                  <h4>Achievement Unlocked</h4>
                  <p>Completed 10 recitations</p>
                  <span className="activity-time">3 days ago</span>
                </div>
              </li>
            </ul>
          </div>
          
          <div className="upcoming-assignments">
            <h2>Upcoming Assignments</h2>
            <ul className="assignment-list">
              <li>
                <h4>Surah Al-Baqarah (verses 1-5)</h4>
                <p>Due: Tomorrow</p>
                <button className="start-btn">Start Now</button>
              </li>
              <li>
                <h4>Surah Al-Ikhlas</h4>
                <p>Due: In 3 days</p>
                <button className="start-btn">Start Now</button>
              </li>
              <li>
                <h4>Surah Al-Falaq</h4>
                <p>Due: Next week</p>
                <button className="start-btn">Start Now</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;