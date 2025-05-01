// src/components/dashboard/RecitationReview.js
import React, { useState, useContext, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './RecitationReview.css';

const RecitationReview = () => {
  const { user, logout } = useAuth;
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for recitations
  const [recitations, setRecitations] = useState([
    { 
      id: 1, 
      student: 'Ahmed Ali', 
      studentId: 1,
      surah: 'Al-Fatiha', 
      surahNumber: 1,
      ayahRange: '1-7',
      submittedOn: '2023-12-05', 
      audioUrl: '#',
      status: 'pending',
      feedback: '',
      ratings: { tajweed: 0, pronunciation: 0, memorization: 0, fluency: 0 }
    },
    { 
      id: 2, 
      student: 'Fatima Khan', 
      studentId: 2,
      surah: 'Al-Ikhlas', 
      surahNumber: 112,
      ayahRange: '1-4',
      submittedOn: '2023-12-06', 
      audioUrl: '#',
      status: 'pending',
      feedback: '',
      ratings: { tajweed: 0, pronunciation: 0, memorization: 0, fluency: 0 }
    },
    { 
      id: 3, 
      student: 'Yusuf Ibrahim', 
      studentId: 3,
      surah: 'Al-Falaq', 
      surahNumber: 113,
      ayahRange: '1-5',
      submittedOn: '2023-12-07', 
      audioUrl: '#',
      status: 'pending',
      feedback: '',
      ratings: { tajweed: 0, pronunciation: 0, memorization: 0, fluency: 0 }
    },
    { 
      id: 4, 
      student: 'Aisha Rahman', 
      studentId: 4,
      surah: 'Al-Nas', 
      surahNumber: 114,
      ayahRange: '1-6',
      submittedOn: '2023-12-04', 
      audioUrl: '#',
      status: 'reviewed',
      feedback: 'Good job on the pronunciation. Work on the tajweed rules for noon sakinah.',
      ratings: { tajweed: 3, pronunciation: 4, memorization: 5, fluency: 4 }
    },
    { 
      id: 5, 
      student: 'Omar Siddiq', 
      studentId: 5,
      surah: 'Al-Kawthar', 
      surahNumber: 108,
      ayahRange: '1-3',
      submittedOn: '2023-12-03', 
      audioUrl: '#',
      status: 'reviewed',
      feedback: 'Excellent memorization. Pay attention to the pronunciation of qaf.',
      ratings: { tajweed: 4, pronunciation: 3, memorization: 5, fluency: 4 }
    }
  ]);

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

  // Filter recitations based on status
  const filteredRecitations = recitations.filter(recitation => {
    if (filter === 'all') return true;
    return recitation.status === filter;
  }).filter(recitation => {
    if (!searchTerm) return true;
    return (
      recitation.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recitation.surah.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Handle rating change
  const handleRatingChange = (recitationId, category, value) => {
    setRecitations(recitations.map(recitation => {
      if (recitation.id === recitationId) {
        return {
          ...recitation,
          ratings: {
            ...recitation.ratings,
            [category]: value
          }
        };
      }
      return recitation;
    }));
  };

  // Handle feedback change
  const handleFeedbackChange = (recitationId, feedback) => {
    setRecitations(recitations.map(recitation => {
      if (recitation.id === recitationId) {
        return {
          ...recitation,
          feedback
        };
      }
      return recitation;
    }));
  };

  // Submit feedback
  const submitFeedback = (recitationId) => {
    setRecitations(recitations.map(recitation => {
      if (recitation.id === recitationId) {
        return {
          ...recitation,
          status: 'reviewed'
        };
      }
      return recitation;
    }));
  };

  // Request re-recording
  const requestRerecording = (recitationId) => {
    setRecitations(recitations.map(recitation => {
      if (recitation.id === recitationId) {
        return {
          ...recitation,
          status: 'rerecord',
          feedback: recitation.feedback || 'Please re-record this recitation.'
        };
      }
      return recitation;
    }));
  };

  // Render star rating
  const renderStarRating = (recitationId, category, value) => {
    return (
      <div className="star-rating">
        {[1, 2, 3, 4, 5].map(star => (
          <i 
            key={star}
            className={`${star <= value ? 'fas' : 'far'} fa-star`}
            onClick={() => handleRatingChange(recitationId, category, star)}
          ></i>
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
            <li className="active" onClick={() => navigate('/recitation-review')}>
              <i className="fas fa-microphone"></i>
              <span>Recitations</span>
            </li>
            <li onClick={() => navigate('/progress-tracking')}>
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
            <h1>Recitation Reviews</h1>
            <div className="header-actions">
              <div className="search-container">
                <i className="fas fa-search"></i>
                <input 
                  type="text" 
                  placeholder="Search recitations..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="filter-container">
                <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                  <option value="all">All Recitations</option>
                  <option value="pending">Pending</option>
                  <option value="reviewed">Reviewed</option>
                  <option value="rerecord">Re-record Requested</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="recitation-cards">
            {filteredRecitations.length > 0 ? (
              filteredRecitations.map(recitation => (
                <div className={`recitation-card ${recitation.status}`} key={recitation.id}>
                  <div className="recitation-header">
                    <div className="student-name">
                      <div className="student-avatar">{getInitial(recitation.student)}</div>
                      <div>
                        <h4>{recitation.student}</h4>
                        <p>Surah {recitation.surah} ({recitation.ayahRange})</p>
                      </div>
                    </div>
                    <div className="submission-date">
                      <i className="fas fa-calendar-alt"></i>
                      {recitation.submittedOn}
                    </div>
                  </div>
                  
                  <div className="recitation-audio">
                    <audio controls src={recitation.audioUrl}>
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                  
                  {recitation.status === 'reviewed' ? (
                    <div className="recitation-feedback reviewed">
                      <h4>Feedback</h4>
                      <div className="ratings-display">
                        <div className="rating-item">
                          <p>Tajweed:</p>
                          <div className="stars">
                            {[1, 2, 3, 4, 5].map(star => (
                              <i 
                                key={star}
                                className={`${star <= recitation.ratings.tajweed ? 'fas' : 'far'} fa-star`}
                              ></i>
                            ))}
                          </div>
                        </div>
                        <div className="rating-item">
                          <p>Pronunciation:</p>
                          <div className="stars">
                            {[1, 2, 3, 4, 5].map(star => (
                              <i 
                                key={star}
                                className={`${star <= recitation.ratings.pronunciation ? 'fas' : 'far'} fa-star`}
                              ></i>
                            ))}
                          </div>
                        </div>
                        <div className="rating-item">
                          <p>Memorization:</p>
                          <div className="stars">
                            {[1, 2, 3, 4, 5].map(star => (
                              <i 
                                key={star}
                                className={`${star <= recitation.ratings.memorization ? 'fas' : 'far'} fa-star`}
                              ></i>
                            ))}
                          </div>
                        </div>
                        <div className="rating-item">
                          <p>Fluency:</p>
                          <div className="stars">
                            {[1, 2, 3, 4, 5].map(star => (
                              <i 
                                key={star}
                                className={`${star <= recitation.ratings.fluency ? 'fas' : 'far'} fa-star`}
                              ></i>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="feedback-text">
                        <p>{recitation.feedback}</p>
                      </div>
                      <div className="feedback-actions">
                        <button className="secondary-btn" onClick={() => navigate(`/student/${recitation.studentId}`)}>
                          <i className="fas fa-user"></i> View Student Profile
                        </button>
                      </div>
                    </div>
                  ) : recitation.status === 'rerecord' ? (
                    <div className="recitation-feedback rerecord">
                      <h4>Re-recording Requested</h4>
                      <div className="feedback-text">
                        <p>{recitation.feedback}</p>
                      </div>
                      <div className="feedback-actions">
                        <button className="secondary-btn" onClick={() => navigate(`/student/${recitation.studentId}`)}>
                          <i className="fas fa-user"></i> View Student Profile
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="recitation-feedback">
                      <h4>Provide Feedback</h4>
                      <div className="rating-container">
                        <p>Tajweed Quality:</p>
                        {renderStarRating(recitation.id, 'tajweed', recitation.ratings.tajweed)}
                      </div>
                      
                      <div className="rating-container">
                        <p>Pronunciation:</p>
                        {renderStarRating(recitation.id, 'pronunciation', recitation.ratings.pronunciation)}
                      </div>
                      
                      <div className="rating-container">
                        <p>Memorization:</p>
                        {renderStarRating(recitation.id, 'memorization', recitation.ratings.memorization)}
                      </div>
                      
                      <div className="rating-container">
                        <p>Fluency:</p>
                        {renderStarRating(recitation.id, 'fluency', recitation.ratings.fluency)}
                      </div>
                      
                      <textarea 
                        placeholder="Write your feedback here..." 
                        value={recitation.feedback}
                        onChange={(e) => handleFeedbackChange(recitation.id, e.target.value)}
                      ></textarea>
                      
                      <div className="feedback-actions">
                        <button 
                          className="primary-btn"
                          onClick={() => submitFeedback(recitation.id)}
                        >
                          <i className="fas fa-check"></i> Submit Feedback
                        </button>
                        <button 
                          className="secondary-btn"
                          onClick={() => requestRerecording(recitation.id)}
                        >
                          <i className="fas fa-redo"></i> Request Re-recording
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="no-recitations">
                <i className="fas fa-microphone-slash"></i>
                <h3>No Recitations Found</h3>
                <p>{filter === 'all' ? 'There are no recitations to review.' : `No ${filter} recitations found.`}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecitationReview;