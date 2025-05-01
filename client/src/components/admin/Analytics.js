import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import Navigation from '../common/Navigation';
import './Analytics.css';

const Analytics = () => {
  const { user } = useAuth();
  const [timeframe, setTimeframe] = useState('week');
  const [analyticsData, setAnalyticsData] = useState({
    recitationsByDay: [],
    recitationsByStatus: { approved: 0, pending: 0, rejected: 0 },
    userGrowth: [],
    completionRates: { students: 0, assignments: 0, recitations: 0 }
  });

  useEffect(() => {
    // Mock data - in a real app, this would be fetched from an API
    const mockData = {
      recitationsByDay: [
        { day: 'Mon', count: 12 },
        { day: 'Tue', count: 19 },
        { day: 'Wed', count: 15 },
        { day: 'Thu', count: 22 },
        { day: 'Fri', count: 30 },
        { day: 'Sat', count: 8 },
        { day: 'Sun', count: 10 }
      ],
      recitationsByStatus: { approved: 85, pending: 12, rejected: 3 },
      userGrowth: [
        { month: 'Jan', count: 10 },
        { month: 'Feb', count: 15 },
        { month: 'Mar', count: 20 },
        { month: 'Apr', count: 25 },
        { month: 'May', count: 35 },
        { month: 'Jun', count: 45 }
      ],
      completionRates: { students: 78, assignments: 65, recitations: 82 }
    };
    
    setAnalyticsData(mockData);
  }, [timeframe]);

  const handleTimeframeChange = (e) => {
    setTimeframe(e.target.value);
  };

  return (
    <div className="analytics-container">
      <Navigation userRole="admin" />
      
      <div className="main-content">
        <div className="analytics-header">
          <h1>System Analytics</h1>
          <div className="timeframe-selector">
            <label htmlFor="timeframe">Timeframe:</label>
            <select 
              id="timeframe" 
              value={timeframe} 
              onChange={handleTimeframeChange}
            >
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
              <option value="quarter">Last Quarter</option>
              <option value="year">Last Year</option>
            </select>
          </div>
        </div>
        
        <div className="analytics-sections">
          <div className="analytics-section">
            <h2>Recitations by Day</h2>
            <div className="chart-container">
              <div className="bar-chart">
                {analyticsData.recitationsByDay.map((item, index) => (
                  <div key={index} className="chart-item">
                    <div 
                      className="bar" 
                      style={{ height: `${(item.count / 30) * 100}%` }}
                    ></div>
                    <div className="label">{item.day}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="analytics-section">
            <h2>Recitation Status</h2>
            <div className="chart-container">
              <div className="pie-chart-placeholder">
                {/* In a real app, you would use a proper chart library */}
                <div className="pie-segment approved" style={{ 
                  transform: `rotate(0deg) skew(${analyticsData.recitationsByStatus.approved * 3.6}deg)` 
                }}></div>
                <div className="pie-segment pending" style={{ 
                  transform: `rotate(${analyticsData.recitationsByStatus.approved * 3.6}deg) skew(${analyticsData.recitationsByStatus.pending * 3.6}deg)` 
                }}></div>
                <div className="pie-segment rejected" style={{ 
                  transform: `rotate(${(analyticsData.recitationsByStatus.approved + analyticsData.recitationsByStatus.pending) * 3.6}deg) skew(${analyticsData.recitationsByStatus.rejected * 3.6}deg)` 
                }}></div>
              </div>
              <div className="chart-legend">
                <div className="legend-item">
                  <div className="color-box approved"></div>
                  <span>Approved ({analyticsData.recitationsByStatus.approved})</span>
                </div>
                <div className="legend-item">
                  <div className="color-box pending"></div>
                  <span>Pending ({analyticsData.recitationsByStatus.pending})</span>
                </div>
                <div className="legend-item">
                  <div className="color-box rejected"></div>
                  <span>Rejected ({analyticsData.recitationsByStatus.rejected})</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="analytics-section">
            <h2>User Growth</h2>
            <div className="chart-container">
              <div className="line-chart-placeholder">
                {/* In a real app, you would use a proper chart library */}
                <div className="line-chart">
                  {analyticsData.userGrowth.map((item, index) => (
                    <div key={index} className="chart-item">
                      <div 
                        className="point" 
                        style={{ bottom: `${(item.count / 50) * 100}%` }}
                      ></div>
                      <div className="label">{item.month}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="analytics-section">
            <h2>Completion Rates</h2>
            <div className="chart-container">
              <div className="progress-bars">
                <div className="progress-item">
                  <div className="progress-label">Students</div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${analyticsData.completionRates.students}%` }}
                    ></div>
                  </div>
                  <div className="progress-value">{analyticsData.completionRates.students}%</div>
                </div>
                <div className="progress-item">
                  <div className="progress-label">Assignments</div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${analyticsData.completionRates.assignments}%` }}
                    ></div>
                  </div>
                  <div className="progress-value">{analyticsData.completionRates.assignments}%</div>
                </div>
                <div className="progress-item">
                  <div className="progress-label">Recitations</div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${analyticsData.completionRates.recitations}%` }}
                    ></div>
                  </div>
                  <div className="progress-value">{analyticsData.completionRates.recitations}%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;