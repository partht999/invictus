// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sessionExpired, setSessionExpired] = useState(false);

  // Session timeout (8 hours)
  const SESSION_DURATION = 8 * 60 * 60 * 1000;

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    const loginTime = localStorage.getItem('loginTime');

    if (token && userData && loginTime) {
      const currentTime = new Date().getTime();
      const sessionTime = currentTime - parseInt(loginTime);

      // Check if session expired
      if (sessionTime > SESSION_DURATION) {
        logout();
        setSessionExpired(true);
        return;
      }

      setUser(JSON.parse(userData));
    }
    setLoading(false);
  };

  const login = (userData, token) => {
    const loginTime = new Date().getTime();
    
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('loginTime', loginTime.toString());
    
    setUser(userData);
    setSessionExpired(false);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('loginTime');
    setUser(null);
  };

  const refreshSession = () => {
    localStorage.setItem('loginTime', new Date().getTime().toString());
    setSessionExpired(false);
  };

  const value = {
    user,
    login,
    logout,
    loading,
    sessionExpired,
    refreshSession
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};