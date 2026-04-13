import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, role }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) {
    // If user is admin trying to access student dash, or vice versa, redirect to correct dash
    return <Navigate to={user.role === 'admin' ? '/admin-dashboard' : '/student-dashboard'} replace />;
  }

  return children;
};

export default ProtectedRoute;
