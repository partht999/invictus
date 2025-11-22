// src/components/AutoLogout.jsx
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const AutoLogout = () => {
  const { logout, sessionExpired } = useAuth();

  useEffect(() => {
    const checkSession = () => {
      const loginTime = localStorage.getItem('loginTime');
      if (!loginTime) return;

      const currentTime = new Date().getTime();
      const sessionTime = currentTime - parseInt(loginTime);
      const SESSION_DURATION = 8 * 60 * 60 * 1000; // 8 hours

      if (sessionTime > SESSION_DURATION) {
        logout();
      }
    };

    // Check every minute
    const interval = setInterval(checkSession, 60000);
    return () => clearInterval(interval);
  }, [logout]);

  return null;
};

export default AutoLogout;