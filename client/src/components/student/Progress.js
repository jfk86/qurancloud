import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Progress.css'; // Create this file for styling

const Progress = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [progressData, setProgressData] = useState(null);

  useEffect(() => {
    // Mock data - replace with API call later
    const mockProgressData = {
      overallProgress: 15, // percentage
      completedSurahs: 5,
      totalSurahs: 114,
      completedVerses: 86,
      totalVerses: 6236,
      weeklyActivity: [3, 5, 2, 4, 6, 1, 3], // last 7 days
      recentAchievements: [
        { id: 1, title: 'First Surah Completed', date: '2023-11-15', icon: 'trophy' },
        { id: 2, title: '5 Days Streak', date: '2023-11-28', icon: 'fire' },
        { id: 3, title: 'Perfect Recitation', date: '2023-12-01', icon: 'star' }
      ],
      completedSurahsList: [
        { id: 1, name: 'Al-Fatiha', verses: 7, completedDate: '2023-10-15' },
        { id: 112, name: 'Al-Ikhlas', verses: 4, completedDate: '2023-10-28' },
        { id: 113, name: 'Al-Falaq', verses: 5, completedDate: '2023-11-05' },
        { id: 114, name: 'An-Nas', verses: 6, completedDate: '2023-11-15' },
        { id: 103, name: 'Al-Asr', verses: 3, completedDate: '2023-11-25' }
      ]
    };
    
    setTimeout(() => {
      setProgressData(mockProgressData);
      setLoading(false);
    }, 800); // Simulate loading delay
  }, []);

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
            <li onClick={() => navigate('/recitations')}>
              <i className="fas fa-microphone"></i>
              <span>My Recitations</span>
            </li>
            <li className="active" onClick={() => navigate('/progress')}>
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
          <h1>My Progress</h1>
        </div>
        
        {loading ? (
          <div className="loading-spinner">Loading progress data...</div>
        ) : (
          <div className="progress-container">
            {/* Overall Progress */}
            <div className="progress-section overall-progress">
              <h2>Overall Progress</h2>
              <div className="progress-stats">
                <div className="progress-circle">
                  <svg viewBox="0 0 36 36" className="circular-chart">
                    <path className="circle-bg"
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path className="circle"
                      strokeDasharray={`${progressData.overallProgress}, 100`}
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <text x="18" y="20.35" className="percentage">{progressData.overallProgress}%</text>
                  </svg>
                </div>
                <div className="progress-details">
                  <div className="detail-item">
                    <span className="label">Completed Surahs:</span>
                    <span className="value">{progressData.completedSurahs}/{progressData.totalSurahs}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Completed Verses:</span>
                    <span className="value">{progressData.completedVerses}/{progressData.totalVerses}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Weekly Activity */}
            <div className="progress-section weekly-activity">
              <h2>Weekly Activity</h2>
              <div className="activity-chart">
                {progressData.weeklyActivity.map((count, index) => (
                  <div className="activity-bar" key={index}>
                    <div 
                      className="bar" 
                      style={{ height: `${count * 15}px` }}
                      title={`${count} recitations`}
                    ></div>
                    <span className="day">{['S', 'M', 'T', 'W', 'T', 'F', 'S'][index]}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Completed Surahs */}
            <div className="progress-section completed-surahs">
              <h2>Completed Surahs</h2>
              <div className="surahs-list">
                <table>
                  <thead>
                    <tr>
                      <th>Surah</th>
                      <th>Verses</th>
                      <th>Completed On</th>
                    </tr>
                  </thead>
                  <tbody>
                    {progressData.completedSurahsList.map(surah => (
                      <tr key={surah.id}>
                        <td>{surah.name}</td>
                        <td>{surah.verses}</td>
                        <td>{surah.completedDate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* Recent Achievements */}
            <div className="progress-section achievements">
              <h2>Recent Achievements</h2>
              <div className="achievements-list">
                {progressData.recentAchievements.map(achievement => (
                  <div className="achievement-card" key={achievement.id}>
                    <div className="achievement-icon">
                      <i className={`fas fa-${achievement.icon}`}></i>
                    </div>
                    <div className="achievement-details">
                      <h3>{achievement.title}</h3>
                      <span className="date">Earned on {achievement.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Progress;