// src/components/dashboard/StudentManagement.js
import React, { useState, useContext, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './StudentManagement.css';

const StudentManagement = () => {
  const { user } = useAuth;
  const navigate = useNavigate();
  
  // States for student management
  const [students, setStudents] = useState([
    { id: 1, name: 'Ahmed Ali', email: 'ahmed@example.com', level: 'Beginner', progress: 35, lastActive: '2 days ago' },
    { id: 2, name: 'Fatima Khan', email: 'fatima@example.com', level: 'Intermediate', progress: 68, lastActive: '1 day ago' },
    { id: 3, name: 'Yusuf Ibrahim', email: 'yusuf@example.com', level: 'Advanced', progress: 92, lastActive: '5 hours ago' },
    { id: 4, name: 'Aisha Rahman', email: 'aisha@example.com', level: 'Beginner', progress: 22, lastActive: '3 days ago' },
    { id: 5, name: 'Omar Siddiq', email: 'omar@example.com', level: 'Intermediate', progress: 45, lastActive: 'Just now' }
  ]);
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [newStudent, setNewStudent] = useState({
    name: '',
    email: '',
    level: 'Beginner',
    password: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState('all');
  
  // Check if user is authenticated and has teacher role
  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else if (user.role !== 'teacher') {
      navigate('/dashboard');
    }
  }, [user, navigate]);
  
  // Filter students based on search and level filter
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = filterLevel === 'all' || student.level.toLowerCase() === filterLevel.toLowerCase();
    return matchesSearch && matchesLevel;
  });
  
  // Handle adding a new student
  const handleAddStudent = (e) => {
    e.preventDefault();
    const id = students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1;
    const newStudentWithId = {
      ...newStudent,
      id,
      progress: 0,
      lastActive: 'Just now'
    };
    
    setStudents([...students, newStudentWithId]);
    setNewStudent({
      name: '',
      email: '',
      level: 'Beginner',
      password: ''
    });
    setShowAddModal(false);
  };
  
  // Handle editing a student
  const handleEditStudent = (e) => {
    e.preventDefault();
    const updatedStudents = students.map(student => 
      student.id === currentStudent.id ? currentStudent : student
    );
    
    setStudents(updatedStudents);
    setShowEditModal(false);
  };
  
  // Handle deleting a student
  const handleDeleteStudent = () => {
    const updatedStudents = students.filter(student => student.id !== currentStudent.id);
    setStudents(updatedStudents);
    setShowDeleteModal(false);
  };
  
  // Get first letter of name for avatar
  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : 'U';
  };
  
  // Render sidebar navigation
  const renderSidebar = () => {
    return (
      <div className="sidebar">
        <div className="logo">
          <h2>QuranCloud</h2>
        </div>
        
        <div className="user-info">
          <div className="avatar">{getInitial(user?.name)}</div>
          <div className="user-details">
            <h3>{user?.name}</h3>
            <span className="role-badge">Teacher</span>
          </div>
        </div>
        
        <nav className="sidebar-nav">
          <ul>
            <li onClick={() => navigate('/teacher-dashboard')}>
              <i className="fas fa-th-large"></i>
              <span>Overview</span>
            </li>
            <li className="active">
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
          <button className="logout-btn" onClick={() => navigate('/login')}>
            <i className="fas fa-sign-out-alt"></i>
            <span>Logout</span>
          </button>
        </div>
      </div>
    );
  };
  
  return (
    <div className="dashboard-container">
      {renderSidebar()}
      
      <div className="main-content">
        <div className="dashboard-header">
          <h1>Student Management</h1>
          <div className="header-actions">
            <div className="search-container">
              <i className="fas fa-search"></i>
              <input 
                type="text" 
                placeholder="Search students..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="filter-container">
              <select 
                value={filterLevel}
                onChange={(e) => setFilterLevel(e.target.value)}
              >
                <option value="all">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
            <button className="primary-btn" onClick={() => setShowAddModal(true)}>
              <i className="fas fa-plus"></i> Add Student
            </button>
          </div>
        </div>
        
        <div className="dashboard-card">
          <div className="student-table-container">
            <table className="student-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Level</th>
                  <th>Progress</th>
                  <th>Last Active</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.length > 0 ? (
                  filteredStudents.map(student => (
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
                            title="View Profile"
                            onClick={() => navigate(`/student/${student.id}`)}
                          >
                            <i className="fas fa-user"></i>
                          </button>
                          <button 
                            className="icon-btn" 
                            title="Edit Student"
                            onClick={() => {
                              setCurrentStudent(student);
                              setShowEditModal(true);
                            }}
                          >
                            <i className="fas fa-edit"></i>
                          </button>
                          <button 
                            className="icon-btn" 
                            title="Delete Student"
                            onClick={() => {
                              setCurrentStudent(student);
                              setShowDeleteModal(true);
                            }}
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="no-data">
                      <i className="fas fa-user-slash"></i>
                      <p>No students found</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* Add Student Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Add New Student</h3>
              <button className="close-btn" onClick={() => setShowAddModal(false)}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <form onSubmit={handleAddStudent}>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  value={newStudent.name}
                  onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  value={newStudent.email}
                  onChange={(e) => setNewStudent({...newStudent, email: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="level">Level</label>
                <select 
                  id="level"
                  value={newStudent.level}
                  onChange={(e) => setNewStudent({...newStudent, level: e.target.value})}
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="password">Temporary Password</label>
                <input 
                  type="password" 
                  id="password" 
                  value={newStudent.password}
                  onChange={(e) => setNewStudent({...newStudent, password: e.target.value})}
                  required
                />
              </div>
              <div className="form-actions">
                <button type="button" className="secondary-btn" onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="primary-btn">
                  <i className="fas fa-plus"></i> Add Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Edit Student Modal */}
      {showEditModal && currentStudent && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Edit Student</h3>
              <button className="close-btn" onClick={() => setShowEditModal(false)}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <form onSubmit={handleEditStudent}>
              <div className="form-group">
                <label htmlFor="edit-name">Full Name</label>
                <input 
                  type="text" 
                  id="edit-name" 
                  value={currentStudent.name}
                  onChange={(e) => setCurrentStudent({...currentStudent, name: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="edit-email">Email Address</label>
                <input 
                  type="email" 
                  id="edit-email" 
                  value={currentStudent.email}
                  onChange={(e) => setCurrentStudent({...currentStudent, email: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="edit-level">Level</label>
                <select 
                  id="edit-level"
                  value={currentStudent.level}
                  onChange={(e) => setCurrentStudent({...currentStudent, level: e.target.value})}
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
              <div className="form-actions">
                <button type="button" className="secondary-btn" onClick={() => setShowEditModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="primary-btn">
                  <i className="fas fa-save"></i> Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Delete Student Modal */}
      {showDeleteModal && currentStudent && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Delete Student</h3>
              <button className="close-btn" onClick={() => setShowDeleteModal(false)}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="modal-content">
              <p>Are you sure you want to delete <strong>{currentStudent.name}</strong>?</p>
              <p>This action cannot be undone.</p>
            </div>
            <div className="form-actions">
              <button className="secondary-btn" onClick={() => setShowDeleteModal(false)}>
                Cancel
              </button>
              <button className="danger-btn" onClick={handleDeleteStudent}>
                <i className="fas fa-trash"></i> Delete Student
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentManagement;