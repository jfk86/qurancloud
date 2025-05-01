import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

// Auth components
import Login from './components/auth/Login';
import Register from './components/auth/Register';

// Student components
import Dashboard from './components/student/Dashboard';
import Recitations from './components/student/Recitations';
import Progress from './components/student/Progress';
import StudentSettings from './components/student/StudentSettings';

// Teacher components
import TeacherDashboard from './components/teacher/TeacherDashboard';
import StudentManagement from './components/teacher/StudentManagement';
import AssignmentManagement from './components/teacher/AssignmentManagement';
import RecitationReview from './components/teacher/RecitationReview';
import ProgressTracking from './components/teacher/ProgressTracking';
import TeacherSettings from './components/teacher/TeacherSettings';

// Admin components
import AdminDashboard from './components/admin/AdminDashboard';
import UserManagement from './components/admin/UserManagement';
import Analytics from './components/admin/Analytics';
import SystemSettings from './components/admin/SystemSettings';

// Protected route component
const ProtectedRouteWrapper = ({ element, requiredRole }) => {
  const auth = useAuth();
  
  if (!auth.isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (requiredRole && auth.user?.role !== requiredRole) {
    // Redirect to appropriate dashboard based on role
    if (auth.user?.role === 'teacher') {
      return <Navigate to="/teacher-dashboard" />;
    } else if (auth.user?.role === 'admin') {
      return <Navigate to="/admin-dashboard" />;
    } else {
      return <Navigate to="/dashboard" />;
    }
  }
  
  return element;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Student Routes */}
          <Route path="/dashboard" element={<ProtectedRouteWrapper element={<Dashboard />} requiredRole="student" />} />
          <Route path="/recitations" element={<ProtectedRouteWrapper element={<Recitations />} requiredRole="student" />} />
          <Route path="/progress" element={<ProtectedRouteWrapper element={<Progress />} requiredRole="student" />} />
          <Route path="/settings" element={<ProtectedRouteWrapper element={<StudentSettings />} requiredRole="student" />} />
          
          {/* Teacher Routes */}
          <Route path="/teacher-dashboard" element={<ProtectedRouteWrapper element={<TeacherDashboard />} requiredRole="teacher" />} />
          <Route path="/student-management" element={<ProtectedRouteWrapper element={<StudentManagement />} requiredRole="teacher" />} />
          <Route path="/assignment-management" element={<ProtectedRouteWrapper element={<AssignmentManagement />} requiredRole="teacher" />} />
          <Route path="/recitation-review" element={<ProtectedRouteWrapper element={<RecitationReview />} requiredRole="teacher" />} />
          <Route path="/progress-tracking" element={<ProtectedRouteWrapper element={<ProgressTracking />} requiredRole="teacher" />} />
          <Route path="/teacher-settings" element={<ProtectedRouteWrapper element={<TeacherSettings />} requiredRole="teacher" />} />
          
          {/* Admin Routes */}
          <Route path="/admin-dashboard" element={<ProtectedRouteWrapper element={<AdminDashboard />} requiredRole="admin" />} />
          <Route path="/user-management" element={<ProtectedRouteWrapper element={<UserManagement />} requiredRole="admin" />} />
          <Route path="/analytics" element={<ProtectedRouteWrapper element={<Analytics />} requiredRole="admin" />} />
          <Route path="/system-settings" element={<ProtectedRouteWrapper element={<SystemSettings />} requiredRole="admin" />} />
          
          {/* Default Route */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;