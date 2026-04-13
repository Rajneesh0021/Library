import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import StudentDashboard from './pages/StudentDashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route 
        path="/login" 
        element={user ? <Navigate to={user.role === 'admin' ? '/admin-dashboard' : '/student-dashboard'} /> : <Login />} 
      />
      
      {/* Admin Protected Routes */}
      <Route 
        path="/admin-dashboard/*" 
        element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        } 
      />
      
      {/* Student Protected Routes */}
      <Route 
        path="/student-dashboard/*" 
        element={
          <ProtectedRoute role="student">
            <StudentDashboard />
          </ProtectedRoute>
        } 
      />

      {/* Legacy redirects */}
      <Route path="/admin" element={<Navigate to="/admin-dashboard" />} />
      <Route path="/student" element={<Navigate to="/student-dashboard" />} />
    </Routes>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-background text-foreground">
        <AppRoutes />
        <ToastContainer position="bottom-right" autoClose={3000} />
      </div>
    </AuthProvider>
  );
};

export default App;
