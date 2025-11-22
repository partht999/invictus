// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from "./components/auth/Login";
import Register from "./components/auth/Register"; // ← ADD THIS IMPORT
import Dashboard from "./components/dashboard/Dashboard";
import ProductList from "./components/products/ProductList";
import Layout from './components/Layout';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/" />;
};

// Public Route Component (redirect to dashboard if already logged in)
const PublicRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return !token ? children : <Navigate to="/dashboard" />;
};

// Update your App.jsx with enhanced routes
function App() {
  return (
    <AuthProvider>
      <AutoLogout />
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />

          {/* Protected Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Layout><Dashboard /></Layout>
            </ProtectedRoute>
          } />
          
          {/* Admin-only routes */}
          <Route path="/admin" element={
            <ProtectedRoute requiredRole="admin">
              <Layout><AdminPanel /></Layout>
            </ProtectedRoute>
          } />

          {/* Manager routes */}
          <Route path="/products" element={
            <ProtectedRoute requiredRole="manager">
              <Layout><ProductList /></Layout>
            </ProtectedRoute>
          } />

          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;