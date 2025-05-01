// src/components/dashboard/ProgressTracking.js
import React, { useState, useContext, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './ProgressTracking.css';

const ProgressTracking = () => {
  const { user, logout } = useAuth;
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [viewMode, setViewMode] = useState('all'); // 'all' or 'individual'

  // Mock data for students
  const students = [
    { 
      id: 1, 
      name: 'Ahmed Ali', 
      email: 'ahmed@example.com', 
      level: 'Beginner', 
      progress: 35, 
      lastActive: '2 days ago',
      surahsCompleted: 5,
      totalRecitations: 28,
      averageRating: 3.7,
      recentActivity: [
        { date: '2023-12-05', type: 'recitation', surah: 'Al-Fatiha', rating: 4 },
        { date: '2023-12-03', type: 'assignment', surah: 'Al-Ikhlas', completed: true },
        { date: '2023-11-30', type: 'recitation', surah: 'Al-Falaq', rating: 3 }
      ],
      surahProgress: [
        { id: 1, name: 'Al-Fatiha', progress: 100, status: 'completed' },
        { id: 112, name: 'Al-Ikhlas', progress: 100, status: 'completed' },
        { id: 113, name: 'Al-Falaq', progress: 100, status: 'completed' },
        { id: 114, name: 'An-Nas', progress: 100, status: 'completed' },
        { id: 108, name: 'Al-Kawthar', progress: 100, status: 'completed' },
        { id: 103, name: 'Al-Asr', progress: 60, status: 'in-progress' },
        { id: 109, name: 'Al-Kafirun', progress: 30, status: 'in-progress' }
      ],
      weeklyActivity: [
        { day: 'Mon', count: 3 },
        { day: 'Tue', count: 5 },
        { day: 'Wed', count: 2 },
        { day: 'Thu', count: 4 },
        { day: 'Fri', count: 6 },
        { day: 'Sat', count: 1 },
        { day: 'Sun', count: 0 }
      ]
    },
    { 
      id: 2, 
      name: 'Fatima Khan', 
      email: 'fatima@example.com', 
      level: 'Intermediate', 
      progress: 68, 
      lastActive: '1 day ago',
      surahsCompleted: 12,
      totalRecitations: 45,
      averageRating: 4.2,
      recentActivity: [
        { date: '2023-12-06', type: 'recitation', surah: 'Al-Mulk', rating: 5 },
        { date: '2023-12-04', type: 'assignment', surah: 'Ya-Sin', completed: true },
        { date: '2023-12-01', type: 'recitation', surah: 'Ar-Rahman', rating: 4 }
      ],
      surahProgress: [
        { id: 1, name: 'Al-Fatiha', progress: 100, status: 'completed' },
        { id: 36, name: 'Ya-Sin', progress: 100, status: 'completed' },
        { id: 55, name: 'Ar-Rahman', progress: 100, status: 'completed' },
        { id: 67, name: 'Al-Mulk', progress: 100, status: 'completed' },
        { id: 78, name: 'An-Naba', progress: 75, status: 'in-progress' }
      ],
      weeklyActivity: [
        { day: 'Mon', count: 4 },
        { day: 'Tue', count: 3 },
        { day: 'Wed', count: 5 },
        { day: 'Thu', count: 2 },
        { day: 'Fri', count: 7 },
        { day: 'Sat', count: 3 },
        { day: 'Sun', count: 1 }
      ]
    },
    { 
      id: 3, 
      name: 'Yusuf Ibrahim', 
      email: 'yusuf@example.com', 
      level: 'Advanced', 
      progress: 92, 
      lastActive: '5 hours ago',
      surahsCompleted: 25,
      totalRecitations: 87,
      averageRating: 4.8,
      recentActivity: [
        { date: '2023-12-07', type: 'recitation', surah: 'Al-Baqarah', rating: 5 },
        { date: '2023-12-05', type: 'assignment', surah: 'Al-Imran', completed: true },
        { date: '2023-12-03', type: 'recitation', surah: 'An-Nisa', rating: 5 }
      ],
      surahProgress: [
        { id: 1, name: 'Al-Fatiha', progress: 100, status: 'completed' },
        { id: 2, name: 'Al-Baqarah', progress: 100, status: 'completed' },
        { id: 3, name: 'Al-Imran', progress: 100, status: 'completed' },
        { id: 4, name: 'An-Nisa', progress: 90, status: 'in-progress' }
      ],
      weeklyActivity: [
        { day: 'Mon', count: 6 },
        { day: 'Tue', count: 7 },
        { day: 'Wed', count: 5 },
        { day: 'Thu', count: 8 },
        { day: 'Fri', count: 9 },
        { day: 'Sat', count: 4 },
        { day: 'Sun', count: 3 }
      ]
    },
    { 
      id: 4, 
      name: 'Aisha Rahman', 
      email: 'aisha@example.com', 
      level: 'Beginner', 
      progress: 22, 
      lastActive: '3 days ago',
      surahsCompleted: 3,
      totalRecitations: 15,
      averageRating: 3.2,
      recentActivity: [
        { date: '2023-12-04', type: 'recitation', surah: 'Al-Fatiha', rating: 3 },
        { date: '2023-12-01', type: 'assignment', surah: 'Al-Ikhlas', completed: true },
        { date: '2023-11-28', type: 'recitation', surah: 'Al-Falaq', rating: 3 }
      ],
      surahProgress: [
        { id: 1, name: 'Al-Fatiha', progress: 100, status: 'completed' },
        { id: 112, name: 'Al-Ikhlas', progress: 100, status: 'completed' },
        { id: 113, name: 'Al-Falaq', progress: 100, status: 'completed' },
        { id: 114, name: 'An-Nas', progress: 40, status: 'in-progress' }
      ],
      weeklyActivity: [
        { day: 'Mon', count: 2 },
        { day: 'Tue', count: 1 },
        { day: 'Wed', count: 3 },
        { day: 'Thu', count: 0 },
        { day: 'Fri', count: 4 },
        { day: 'Sat', count: 0 },
        { day: 'Sun', count: 0 }
      ]
    },
    { 
      id: 5, 
      name: 'Omar Siddiq', 
      email: 'omar@example.com', 
      level: 'Intermediate', 
      progress: 45, 
      lastActive: 'Just now',
      surahsCompleted: 8,
      totalRecitations: 32,
      averageRating: 4.0,
      recentActivity: [
        { date: '2023-12-07', type: 'recitation', surah: 'Al-Mulk', rating: 4 },
        { date: '2023-12-05', type: 'assignment', surah: 'Al-Kahf', completed: true },
        { date: '2023-12-02', type: 'recitation', surah: 'Al-Waqiah', rating: 4 }
      ],
      surahProgress: [
        { id: 1, name: 'Al-Fatiha', progress: 100, status: 'completed' },
        { id: 18, name: 'Al-Kahf', progress: 100, status: 'completed' },
        { id: 56, name: 'Al-Waqiah', progress: 100, status: 'completed' },
        { id: 67, name: 'Al-Mulk', progress: 100, status: 'completed' },
        { id: 78, name: 'An-Naba', progress: 50, status: 'in-progress' }
      ],
      weeklyActivity: [
        { day: 'Mon', count: 3 },
        { day: 'Tue', count: 4 },
        { day: 'Wed', count: 2 },
        { day: 'Thu', count: 5 },
        { day: 'Fri', count: 6 },
        { day: 'Sat', count: 2 },
        { day: 'Sun', count: 1 }
      ]
    }
  ];

  // Check if user is authenticated and has teacher role
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

  // Filter students based on search term
  const filteredStudents = students.filter(student => {
    if (!searchTerm) return true;
    return (
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.level.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Handle student selection
  const handleStudentSelect = (student) => {
    setSelectedStudent(student);
    setViewMode('individual');
  };

  // Render activity icon based on type
  const renderActivityIcon = (type) => {
    switch (type) {
      case 'recitation':
        return <i className="fas fa-microphone"></i>;
      case 'assignment':
        return <i className="fas fa-tasks"></i>;
      default:
        return <i className="fas fa-check-circle"></i>;
    }
  };

  // Generate report for a student
  const generateReport = (studentId) => {
    // In a real app, this would generate a PDF report
    alert(`Generating report for student ID: ${studentId}`);
  };

  // Render the activity bar chart
  const renderActivityChart = (weeklyActivity) => {
    const maxCount = Math.max(...weeklyActivity.map(day => day.count));
    
    return (
      <div className="activity-chart">
        {weeklyActivity.map((day, index) => (
          <div className="chart-column" key={index}>
            <div 
              className="chart-bar" 
              style={{ 
                height: maxCount > 0 ? `${(day.count / maxCount) * 100}%` : '0%',
                backgroundColor: day.count > 0 ? '#3498db' : '#e0e0e0'
              }}
            >
              <span className="count-tooltip">{day.count}</span>
            </div>
            <div className="chart-label">{day.day}</div>
          </div>
        ))}
      </div>
    );
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
            <h3>{user.name}</h3>
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
            <li className="active" onClick={() => navigate('/progress-tracking')}>
              <i className="fas fa-chart-line"></i>
              <span>Progress</span>
            </li>
            <li onClick={() => navigate('/settings')}>
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
            <h1>
              {viewMode === 'all' ? 'Student Progress' : `${selectedStudent?.name}'s Progress`}
            </h1>
            <div className="header-actions">
              {viewMode === 'all' ? (
                <>
                  <div className="search-container">
                    <i className="fas fa-search"></i>
                    <input 
                      type="text" 
                      placeholder="Search students..." 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <button className="primary-btn" onClick={() => alert('Exporting class report...')}>
                    <i className="fas fa-file-export"></i> Export Class Report
                  </button>
                </>
              ) : (
                <>
                  <button className="secondary-btn" onClick={() => setViewMode('all')}>
                    <i className="fas fa-arrow-left"></i> Back to All Students
                  </button>
                  <button className="primary-btn" onClick={() => generateReport(selectedStudent.id)}>
                    <i className="fas fa-file-export"></i> Export Student Report
                  </button>
                </>
              )}
            </div>
          </div>
          
          {viewMode === 'all' ? (
            <div className="student-table-container">
              <table className="student-table">
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Level</th>
                    <th>Surahs Completed</th>
                    <th>Overall Progress</th>
                    <th>Last Activity</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map(student => (
                    <tr key={student.id}>
                      <td>
                        <div className="student-name">
                          <div className="student-avatar">{getInitial(student.name)}</div>
                          <div>
                            <p className="name">{student.name}</p>
                            <p className="email">{student.email}</p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className={`level-badge ${student.level.toLowerCase()}`}>
                          {student.level}
                        </span>
                      </td>
                      <td>{student.surahsCompleted} / 114</td>
                      <td>
                        <div className="progress-bar">
                          <div className="progress-fill" style={{ width: `${student.progress}%` }}></div>
                        </div>
                        <div className="progress-text">{student.progress}% Complete</div>
                      </td>
                      <td>{student.lastActive}</td>
                      <td>
                        <div className="action-buttons">
                          <button 
                            className="icon-btn" 
                            title="View Detailed Progress"
                            onClick={() => handleStudentSelect(student)}
                          >
                            <i className="fas fa-chart-line"></i>
                          </button>
                          <button 
                            className="icon-btn" 
                            title="Generate Report"
                            onClick={() => generateReport(student.id)}
                          >
                            <i className="fas fa-file-alt"></i>
                          </button>
                          <button className="icon-btn" title="Send Message">
                            <i className="fas fa-envelope"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="individual-progress">
              {/* Student Overview */}
              <div className="dashboard-row">
                <div className="dashboard-card">
                  <div className="card-header">
                    <h3>Overview</h3>
                  </div>
                  <div className="stats-cards">
                    <div className="stat-card">
                      <div className="stat-icon students-icon">
                        <i className="fas fa-book-open"></i>
                      </div>
                      <div className="stat-details">
                        <h3>{selectedStudent.surahsCompleted}</h3>
                        <p>Surahs Completed</p>
                      </div>
                    </div>
                    
                    <div className="stat-card">
                      <div className="stat-icon assignments-icon">
                        <i className="fas fa-microphone"></i>
                      </div>
                      <div className="stat-details">
                        <h3>{selectedStudent.totalRecitations}</h3>
                        <p>Total Recitations</p>
                      </div>
                    </div>
                    
                    <div className="stat-card">
                      <div className="stat-icon recitations-icon">
                        <i className="fas fa-star"></i>
                      </div>
                      <div className="stat-details">
                        <h3>{selectedStudent.averageRating.toFixed(1)}</h3>
                        <p>Average Rating</p>
                      </div>
                    </div>
                    
                    <div className="stat-card">
                      <div className="stat-icon completion-icon">
                        <i className="fas fa-check-circle"></i>
                      </div>
                      <div className="stat-details">
                        <h3>{selectedStudent.progress}%</h3>
                        <p>Overall Completion</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Surah Progress and Weekly Activity */}
              <div className="dashboard-row">
                <div className="dashboard-card">
                  <div className="card-header">
                    <h3>Surah Progress</h3>
                  </div>
                  <div className="surah-progress-list">
                    {selectedStudent.surahProgress.map(surah => (
                      <div className="surah-progress-item" key={surah.id}>
                        <div className="surah-info">
                          <h4>{surah.name}</h4>
                          <span className={`status-badge ${surah.status}`}>
                            {surah.status === 'completed' ? 'Completed' : 'In Progress'}
                          </span>
                        </div>
                        <div className="progress-container">
                          <div className="progress-bar">
                            <div className="progress-fill" style={{ width: `${surah.progress}%` }}></div>
                          </div>
                          <span className="progress-text">{surah.progress}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="dashboard-card">
                  <div className="card-header">
                    <h3>Weekly Activity</h3>
                  </div>
                  <div className="activity-chart-container">
                    {renderActivityChart(selectedStudent.weeklyActivity)}
                  </div>
                </div>
              </div>
              
              {/* Recent Activity */}
              <div className="dashboard-card">
                <div className="card-header">
                  <h3>Recent Activity</h3>
                </div>
                <ul className="activity-list">
                  {selectedStudent.recentActivity.map((activity, index) => (
                    <li key={index}>
                      <div className="activity-icon">
                        {renderActivityIcon(activity.type)}
                      </div>
                      <div className="activity-details">
                        <h4>
                          {activity.type === 'recitation' 
                            ? `Recited Surah ${activity.surah}` 
                            : `Completed ${activity.surah} assignment`}
                        </h4>
                        {activity.type === 'recitation' && (
                          <div className="rating-display">
                            <span>Rating: </span>
                            {[1, 2, 3, 4, 5].map(star => (
                              <i 
                                key={star}
                                className={`${star <= activity.rating ? 'fas' : 'far'} fa-star`}
                              ></i>
                            ))}
                          </div>
                        )}
                        <span className="activity-time">{activity.date}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgressTracking;