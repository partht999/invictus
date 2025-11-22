// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ 
  children, 
  requiredRole = null, 
  redirectTo = "/" 
}) => {
  const { user, sessionExpired } = useAuth();
  const token = localStorage.getItem('token');

  // No token - redirect to login
  if (!token) {
    return <Navigate to={redirectTo} replace />;
  }

  // Session expired - show message
  if (sessionExpired) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 max-w-md text-center">
          <h2 className="text-xl font-bold text-[#00072D] mb-4">Session Expired</h2>
          <p className="text-slate-600 mb-4">Your session has expired. Please log in again.</p>
          <button 
            onClick={() => window.location.href = '/'}
            className="bg-[#00072D] text-white rounded-lg px-6 py-2 hover:bg-[#00072D]/80"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  // Role-based access control
  if (requiredRole && user?.role !== requiredRole) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 max-w-md text-center">
          <h2 className="text-xl font-bold text-[#00072D] mb-4">Access Denied</h2>
          <p className="text-slate-600">You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;