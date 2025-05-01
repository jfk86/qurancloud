// src/components/dashboard/AssignmentManagement.js
import React, { useState, useEffect, useContext } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import * as assignmentService from '../../services/assignment.service';
import './AssignmentManagement.css';

const AssignmentManagement = () => {
  const { user, loading, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [assignments, setAssignments] = useState([]);
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentAssignment, setCurrentAssignment] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    surah: {
      number: '',
      name: '',
      verses: {
        start: '',
        end: ''
      }
    },
    dueDate: '',
    assignedTo: []
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login');
    }
    
    if (user && user.role !== 'teacher') {
      navigate('/dashboard');
    }
  }, [loading, isAuthenticated, user, navigate]);

  // Load assignments and students
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const [assignmentsData, studentsData] = await Promise.all([
          assignmentService.getAssignments(),
          assignmentService.getAllStudents()
        ]);
        
        setAssignments(assignmentsData);
        setStudents(studentsData);
        setError(null);
      } catch (err) {
        console.error('Error loading data:', err);
        setError('Failed to load assignments. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    if (user && isAuthenticated && user.role === 'teacher') {
      loadData();
    }
  }, [user, isAuthenticated]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      // Handle nested properties (e.g., surah.number)
      const [parent, child] = name.split('.');
      if (child.includes('.')) {
        // Handle deeply nested properties (e.g., surah.verses.start)
        const [nestedParent, nestedChild] = child.split('.');
        setFormData({
          ...formData,
          [parent]: {
            ...formData[parent],
            [nestedParent]: {
              ...formData[parent][nestedParent],
              [nestedChild]: value
            }
          }
        });
      } else {
        setFormData({
          ...formData,
          [parent]: {
            ...formData[parent],
            [child]: value
          }
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  // Handle student selection in the form
  const handleStudentSelection = (e) => {
    const studentId = e.target.value;
    const isChecked = e.target.checked;
    
    if (isChecked) {
      setFormData({
        ...formData,
        assignedTo: [...formData.assignedTo, studentId]
      });
    } else {
      setFormData({
        ...formData,
        assignedTo: formData.assignedTo.filter(id => id !== studentId)
      });
    }
  };

  // Open modal for creating a new assignment
  const handleAddAssignment = () => {
    setCurrentAssignment(null);
    setFormData({
      title: '',
      description: '',
      surah: {
        number: '',
        name: '',
        verses: {
          start: '',
          end: ''
        }
      },
      dueDate: '',
      assignedTo: []
    });
    setShowModal(true);
  };

  // Open modal for editing an existing assignment
  const handleEditAssignment = (assignment) => {
    setCurrentAssignment(assignment);
    setFormData({
      title: assignment.title,
      description: assignment.description,
      surah: {
        number: assignment.surah.number,
        name: assignment.surah.name,
        verses: {
          start: assignment.surah.verses.start,
          end: assignment.surah.verses.end
        }
      },
      dueDate: assignment.dueDate.split('T')[0], // Format date for input
      assignedTo: assignment.assignedTo
    });
    setShowModal(true);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (currentAssignment) {
        // Update existing assignment
        await assignmentService.updateAssignment(currentAssignment._id, formData);
        
        // Update local state
        setAssignments(assignments.map(a => 
          a._id === currentAssignment._id ? { ...a, ...formData } : a
        ));
      } else {
        // Create new assignment
        const newAssignment = await assignmentService.createAssignment(formData);
        
        // Update local state
        setAssignments([...assignments, newAssignment]);
      }
      
      // Close modal and reset form
      setShowModal(false);
      setCurrentAssignment(null);
      setFormData({
        title: '',
        description: '',
        surah: {
          number: '',
          name: '',
          verses: {
            start: '',
            end: ''
          }
        },
        dueDate: '',
        assignedTo: []
      });
      setError(null);
    } catch (err) {
      console.error('Error saving assignment:', err);
      setError('Failed to save assignment. Please try again.');
    }
  };

  // Handle assignment deletion
  const handleDeleteAssignment = async (id) => {
    if (window.confirm('Are you sure you want to delete this assignment?')) {
      try {
        await assignmentService.deleteAssignment(id);
        
        // Update local state
        setAssignments(assignments.filter(a => a._id !== id));
        setError(null);
      } catch (err) {
        console.error('Error deleting assignment:', err);
        setError('Failed to delete assignment. Please try again.');
      }
    }
  };

  // Handle navigation item clicks
  const handleNavClick = (section) => {
    if (section === 'overview') {
      navigate('/dashboard');
    } else {
      navigate(`/${section}`);
    }
  };

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading || !user) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading dashboard...</p>
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
          <div className="avatar">
            {user.name ? user.name.charAt(0).toUpperCase() : 'T'}
          </div>
          <div className="user-details">
            <h3>{user.name}</h3>
            <p className="role-badge">{user.role}</p>
          </div>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li onClick={() => handleNavClick('dashboard')}>
              <i className="fas fa-home"></i> Overview
            </li>
            <li onClick={() => handleNavClick('student-management')}>
              <i className="fas fa-users"></i> Students
            </li>
            <li className="active" onClick={() => handleNavClick('assignment-management')}>
              <i className="fas fa-tasks"></i> Assignments
            </li>
            <li onClick={() => handleNavClick('recitation-review')}>
              <i className="fas fa-headphones"></i> Recitations
            </li>
            <li onClick={() => handleNavClick('progress-tracking')}>
              <i className="fas fa-chart-line"></i> Progress
            </li>
            <li onClick={() => handleNavClick('settings')}>
              <i className="fas fa-cog"></i> Settings
            </li>
          </ul>
        </nav>
        <div className="sidebar-footer">
          <button className="logout-btn" onClick={handleLogout}>
            <i className="fas fa-sign-out-alt"></i> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <header className="dashboard-header">
          <h1>Assignment Management</h1>
          <div className="header-actions">
            <button className="add-btn" onClick={handleAddAssignment}>
              <i className="fas fa-plus"></i> New Assignment
            </button>
            <div className="notification-bell">
              <i className="fas fa-bell"></i>
              <span className="notification-badge">3</span>
            </div>
          </div>
        </header>

        <div className="dashboard-content">
          {error && (
            <div className="alert alert-danger">
              {error}
              <button className="close-btn" onClick={() => setError(null)}>×</button>
            </div>
          )}
          
          {isLoading ? (
            <div className="loading-container">
              <div className="spinner"></div>
              <p>Loading assignments...</p>
            </div>
          ) : (
            <div className="assignments-container">
              {assignments.length === 0 ? (
                <div className="empty-state">
                  <i className="fas fa-tasks"></i>
                  <p>No assignments yet. Create your first assignment to get started!</p>
                  <button className="btn-primary" onClick={handleAddAssignment}>
                    Create Assignment
                  </button>
                </div>
              ) : (
                <div className="assignments-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Surah</th>
                        <th>Verses</th>
                        <th>Due Date</th>
                        <th>Assigned To</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {assignments.map(assignment => (
                        <tr key={assignment._id}>
                          <td>{assignment.title}</td>
                          <td>
                            {assignment.surah.number}. {assignment.surah.name}
                          </td>
                          <td>
                            {assignment.surah.verses.start} - {assignment.surah.verses.end}
                          </td>
                          <td>{new Date(assignment.dueDate).toLocaleDateString()}</td>
                          <td>
                            {assignment.assignedTo.length} student(s)
                            <div className="student-tooltip">
                              <ul>
                                {assignment.assignedTo.map(studentId => {
                                  const student = students.find(s => s._id === studentId);
                                  return student ? (
                                    <li key={studentId}>{student.name}</li>
                                  ) : null;
                                })}
                              </ul>
                            </div>
                          </td>
                          <td>
                            <div className="action-buttons">
                              <button 
                                className="edit-btn" 
                                onClick={() => handleEditAssignment(assignment)}
                              >
                                <i className="fas fa-edit"></i>
                              </button>
                              <button 
                                className="delete-btn" 
                                onClick={() => handleDeleteAssignment(assignment._id)}
                              >
                                <i className="fas fa-trash"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Assignment Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>{currentAssignment ? 'Edit Assignment' : 'Create Assignment'}</h2>
              <button className="close-btn" onClick={() => setShowModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="3"
                  ></textarea>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="surah.number">Surah Number</label>
                    <input
                      type="number"
                      id="surah.number"
                      name="surah.number"
                      value={formData.surah.number}
                      onChange={handleChange}
                      min="1"
                      max="114"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="surah.name">Surah Name</label>
                    <input
                      type="text"
                      id="surah.name"
                      name="surah.name"
                      value={formData.surah.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="surah.verses.start">Starting Verse</label>
                    <input
                      type="number"
                      id="surah.verses.start"
                      name="surah.verses.start"
                      value={formData.surah.verses.start}
                      onChange={handleChange}
                      min="1"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="surah.verses.end">Ending Verse</label>
                    <input
                      type="number"
                      id="surah.verses.end"
                      name="surah.verses.end"
                      value={formData.surah.verses.end}
                      onChange={handleChange}
                      min={formData.surah.verses.start || 1}
                      required
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="dueDate">Due Date</label>
                  <input
                    type="date"
                    id="dueDate"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Assign to Students</label>
                  <div className="student-checkboxes">
                    {students.map(student => (
                      <div className="checkbox-item" key={student._id}>
                        <input
                          type="checkbox"
                          id={`student-${student._id}`}
                          value={student._id}
                          checked={formData.assignedTo.includes(student._id)}
                          onChange={handleStudentSelection}
                        />
                        <label htmlFor={`student-${student._id}`}>{student.name}</label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="form-actions">
                  <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    {currentAssignment ? 'Update Assignment' : 'Create Assignment'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignmentManagement;