import React from 'react';
import { Navigate } from 'react-router-dom';

// isAuthenticated function
const isAuthenticated = () => !!localStorage.getItem('isAuthenticated');

const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

const PublicRoute = ({ children }) => {
  return isAuthenticated() ? <Navigate to="/dashboard" /> : children;
};

export { ProtectedRoute, PublicRoute };