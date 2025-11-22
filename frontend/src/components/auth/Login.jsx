// src/components/auth/Login.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // SINGLE handleSubmit function
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Enhanced validation
    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    if (!validatePassword(formData.password)) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    // Mock login with enhanced security
    setTimeout(() => {
      const mockUser = {
        name: formData.email.includes('admin') ? 'Admin User' : 'Inventory Manager',
        email: formData.email,
        role: formData.email.includes('admin') ? 'admin' : 'manager',
        lastLogin: new Date().toISOString()
      };
      
      // Set authentication data using AuthContext
      const token = 'mock-jwt-token-' + Date.now();
      login(mockUser, token);
      
      console.log('Login successful, token set:', token);
      console.log('Navigating to /dashboard');
      
      // Update loading state
      setLoading(false);
      
      // Navigate to dashboard immediately after setting auth data
      navigate('/dashboard', { replace: true });
    }, 1000);
  };

  // Enhanced inline styles
  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#F8FAFC',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      background: 'linear-gradient(135deg, #F8FAFC 0%, #E2E8F0 100%)'
    },
    card: {
      backgroundColor: 'white',
      padding: '2.5rem',
      borderRadius: '1rem',
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      border: '1px solid #E2E8F0',
      width: '100%',
      maxWidth: '420px',
      position: 'relative'
    },
    header: {
      textAlign: 'center',
      marginBottom: '2rem'
    },
    title: {
      fontSize: '1.875rem',
      fontWeight: 'bold',
      color: '#00072D',
      marginBottom: '0.5rem',
      background: 'linear-gradient(135deg, #00072D 0%, #84eab3 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },
    subtitle: {
      color: '#64748B',
      fontSize: '0.875rem',
      fontWeight: '500'
    },
    inputContainer: {
      position: 'relative',
      marginBottom: '1rem'
    },
    input: {
      width: '100%',
      border: '2px solid #E2E8F0',
      borderRadius: '0.75rem',
      padding: '0.875rem 1rem',
      outline: 'none',
      fontSize: '1rem',
      transition: 'all 0.2s ease',
      backgroundColor: '#F8FAFC'
    },
    inputFocus: {
      borderColor: '#84eab3',
      backgroundColor: 'white',
      boxShadow: '0 0 0 3px rgba(132, 234, 179, 0.1)'
    },
    passwordToggle: {
      position: 'absolute',
      right: '1rem',
      top: '50%',
      transform: 'translateY(-50%)',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: '#64748B',
      fontSize: '1.125rem',
      padding: '0.25rem',
      borderRadius: '0.375rem',
      transition: 'all 0.2s ease'
    },
    passwordToggleHover: {
      backgroundColor: '#F1F5F9',
      color: '#00072D'
    },
    button: {
      width: '100%',
      background: 'linear-gradient(135deg, #00072D 0%, #1E3A8A 100%)',
      color: 'white',
      borderRadius: '0.75rem',
      padding: '0.875rem 1rem',
      border: 'none',
      cursor: 'pointer',
      fontSize: '1rem',
      fontWeight: '600',
      transition: 'all 0.2s ease',
      boxShadow: '0 4px 6px -1px rgba(0, 7, 45, 0.1), 0 2px 4px -1px rgba(0, 7, 45, 0.06)'
    },
    buttonHover: {
      transform: 'translateY(-1px)',
      boxShadow: '0 10px 15px -3px rgba(0, 7, 45, 0.1), 0 4px 6px -2px rgba(0, 7, 45, 0.05)'
    },
    link: {
      color: '#84eab3',
      fontWeight: '600',
      textDecoration: 'none',
      transition: 'all 0.2s ease'
    },
    linkHover: {
      color: '#00072D'
    },
    errorBox: {
      backgroundColor: '#FEF2F2',
      border: '2px solid #FECACA',
      color: '#DC2626',
      padding: '0.875rem 1rem',
      borderRadius: '0.75rem',
      marginBottom: '1.5rem',
      fontSize: '0.875rem',
      fontWeight: '500',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    demoBox: {
      marginTop: '2rem',
      padding: '1.25rem',
      backgroundColor: '#F8FAFC',
      borderRadius: '0.75rem',
      fontSize: '0.75rem',
      color: '#64748B',
      border: '1px solid #E2E8F0'
    },
    demoTitle: {
      fontWeight: '600',
      color: '#00072D',
      marginBottom: '0.5rem',
      fontSize: '0.8rem'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>StockMaster</h1>
          <p style={styles.subtitle}>Welcome back! Sign in to continue</p>
        </div>

        {error && (
          <div style={styles.errorBox}>
            <span style={{ fontSize: '1rem' }}>⚠️</span>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
              Email Address
            </label>
            <div style={styles.inputContainer}>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                style={{
                  ...styles.input,
                  ...(formData.email ? (validateEmail(formData.email) ? styles.inputFocus : { 
                    borderColor: '#EF4444',
                    backgroundColor: '#FEF2F2'
                  }) : {})
                }}
                placeholder="Enter your email address"
                onFocus={(e) => {
                  e.target.style.borderColor = '#84eab3';
                  e.target.style.backgroundColor = 'white';
                  e.target.style.boxShadow = '0 0 0 3px rgba(132, 234, 179, 0.1)';
                }}
                onBlur={(e) => {
                  if (!formData.email) {
                    e.target.style.borderColor = '#E2E8F0';
                    e.target.style.backgroundColor = '#F8FAFC';
                    e.target.style.boxShadow = 'none';
                  }
                }}
              />
            </div>
            {formData.email && !validateEmail(formData.email) && (
              <p style={{ color: '#EF4444', fontSize: '0.75rem', marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <span>⚠️</span> Please enter a valid email address
              </p>
            )}
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
              Password
            </label>
            <div style={styles.inputContainer}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                style={{
                  ...styles.input,
                  ...(formData.password ? (validatePassword(formData.password) ? styles.inputFocus : { 
                    borderColor: '#EF4444',
                    backgroundColor: '#FEF2F2'
                  }) : {}),
                  paddingRight: '3rem'
                }}
                placeholder="Enter your password"
                onFocus={(e) => {
                  e.target.style.borderColor = '#84eab3';
                  e.target.style.backgroundColor = 'white';
                  e.target.style.boxShadow = '0 0 0 3px rgba(132, 234, 179, 0.1)';
                }}
                onBlur={(e) => {
                  if (!formData.password) {
                    e.target.style.borderColor = '#E2E8F0';
                    e.target.style.backgroundColor = '#F8FAFC';
                    e.target.style.boxShadow = 'none';
                  }
                }}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                style={styles.passwordToggle}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#F1F5F9';
                  e.target.style.color = '#00072D';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = '#64748B';
                }}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
            {formData.password && !validatePassword(formData.password) && (
              <p style={{ color: '#EF4444', fontSize: '0.75rem', marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <span>⚠️</span> Password must be at least 6 characters
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.button,
              opacity: loading ? 0.7 : 1,
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.target.style.transform = 'translateY(-1px)';
                e.target.style.boxShadow = '0 10px 15px -3px rgba(0, 7, 45, 0.1), 0 4px 6px -2px rgba(0, 7, 45, 0.05)';
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 6px -1px rgba(0, 7, 45, 0.1), 0 2px 4px -1px rgba(0, 7, 45, 0.06)';
              }
            }}
          >
            {loading ? (
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                <div style={{ 
                  width: '16px', 
                  height: '16px', 
                  border: '2px solid transparent', 
                  borderTop: '2px solid white', 
                  borderRadius: '50%', 
                  animation: 'spin 1s linear infinite' 
                }}></div>
                Signing in...
              </span>
            ) : (
              'Sign in to Dashboard'
            )}
          </button>
        </form>

        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <p style={{ color: '#64748B', fontSize: '0.875rem', marginBottom: '1rem' }}>
            Don't have an account?{' '}
            <Link 
              to="/register" 
              style={styles.link}
              onMouseEnter={(e) => e.target.style.color = '#00072D'}
              onMouseLeave={(e) => e.target.style.color = '#84eab3'}
            >
              Create new account
            </Link>
          </p>
          
          <button style={{ 
            fontSize: '0.875rem', 
            color: '#84eab3', 
            background: 'none', 
            border: 'none', 
            cursor: 'pointer',
            fontWeight: '500',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => e.target.style.color = '#00072D'}
          onMouseLeave={(e) => e.target.style.color = '#84eab3'}
          >
            Forgot your password?
          </button>
        </div>

        {/* Enhanced Demo credentials section */}
        <div style={styles.demoBox}>
          <div style={styles.demoTitle}>💡 Demo Credentials</div>
          <div style={{ lineHeight: '1.5' }}>
            <div><strong>Email:</strong> Any valid email format</div>
            <div><strong>Password:</strong> 6+ characters</div>
            <div style={{ marginTop: '0.5rem', fontStyle: 'italic' }}>
              Try: <strong>admin@stockmaster.com</strong> for admin role
            </div>
          </div>
        </div>
      </div>

      {/* Add CSS for spinner animation */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default Login;