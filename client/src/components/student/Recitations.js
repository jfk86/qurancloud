import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Recitations.css'; // Create this file for styling

const Recitations = () => {
  const navigate = useNavigate();
  const [recitations, setRecitations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - replace with API call later
    const mockRecitations = [
      {
        id: 1,
        surah: 'Al-Fatiha',
        verses: '1-7',
        date: '2023-12-01',
        status: 'reviewed',
        feedback: 'Good pronunciation, work on rhythm',
        rating: 4
      },
      {
        id: 2,
        surah: 'Al-Ikhlas',
        verses: '1-4',
        date: '2023-11-28',
        status: 'pending',
        feedback: '',
        rating: null
      },
      {
        id: 3,
        surah: 'Al-Falaq',
        verses: '1-5',
        date: '2023-11-25',
        status: 'reviewed',
        feedback: 'Excellent tajweed application',
        rating: 5
      }
    ];
    
    setTimeout(() => {
      setRecitations(mockRecitations);
      setLoading(false);
    }, 800); // Simulate loading delay
  }, []);

  const getStatusClass = (status) => {
    switch(status) {
      case 'reviewed': return 'status-reviewed';
      case 'pending': return 'status-pending';
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
            <li onClick={() => navigate('/assignments')}>
              <i className="fas fa-tasks"></i>
              <span>My Assignments</span>
            </li>
            <li className="active" onClick={() => navigate('/recitations')}>
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
          <h1>My Recitations</h1>
          <div className="header-actions">
            <button className="primary-btn">
              <i className="fas fa-plus"></i> New Recitation
            </button>
          </div>
        </div>
        
        <div className="recitations-container">
          {loading ? (
            <div className="loading-spinner">Loading recitations...</div>
          ) : (
            <>
              <div className="recitations-filters">
                <button className="filter-btn active">All</button>
                <button className="filter-btn">Pending Review</button>
                <button className="filter-btn">Reviewed</button>
              </div>
              
              <div className="recitations-list">
                {recitations.map(recitation => (
                  <div className="recitation-card" key={recitation.id}>
                    <div className="recitation-header">
                      <h3>Surah {recitation.surah}</h3>
                      <span className={`status-badge ${getStatusClass(recitation.status)}`}>
                        {recitation.status}
                      </span>
                    </div>
                    <div className="recitation-details">
                      <div className="detail-item">
                        <i className="fas fa-book-open"></i>
                        <span>Verses: {recitation.verses}</span>
                      </div>
                      <div className="detail-item">
                        <i className="fas fa-calendar"></i>
                        <span>Recorded: {recitation.date}</span>
                      </div>
                    </div>
                    
                    {recitation.status === 'reviewed' && (
                      <div className="feedback-section">
                        <h4>Teacher Feedback</h4>
                        <p>{recitation.feedback}</p>
                        <div className="rating">
                          {[1, 2, 3, 4, 5].map(star => (
                            <i 
                              key={star}
                              className={`fas fa-star ${star <= recitation.rating ? 'filled' : ''}`}
                            ></i>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="recitation-actions">
                      <button className="secondary-btn">
                        <i className="fas fa-play"></i> Play
                      </button>
                      <button className="outline-btn">
                        <i className="fas fa-download"></i> Download
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

export default Recitations;