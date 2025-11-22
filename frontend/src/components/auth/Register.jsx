// src/components/auth/Register.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Check password strength in real-time
    if (name === 'password') {
      checkPasswordStrength(value);
    }
  };

  const checkPasswordStrength = (password) => {
    const requirements = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };
    setPasswordStrength(requirements);
  };

  const validatePasswordStrength = () => {
    const metRequirements = Object.values(passwordStrength).filter(Boolean).length;
    return metRequirements >= 3;
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Enhanced validation
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('All fields are required');
      setLoading(false);
      return;
    }

    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    // Password strength check
    if (!validatePasswordStrength()) {
      setError('Password must meet at least 3 security requirements');
      setLoading(false);
      return;
    }

    // MOCK REGISTRATION - No backend needed!
    setTimeout(() => {
      localStorage.setItem('token', 'mock-token-' + Date.now());
      localStorage.setItem('user', JSON.stringify({
        name: formData.name,
        email: formData.email,
        role: formData.email.includes('admin') ? 'admin' : 'manager'
      }));
      localStorage.setItem('loginTime', new Date().getTime().toString());
      
      navigate('/dashboard');
      setLoading(false);
    }, 1000);
  };

  // Enhanced inline styles matching Login
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
      maxWidth: '480px',
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
    inputError: {
      borderColor: '#EF4444',
      backgroundColor: '#FEF2F2'
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
    requirementBox: {
      marginTop: '0.5rem',
      padding: '1rem',
      backgroundColor: '#F8FAFC',
      borderRadius: '0.75rem',
      border: '1px solid #E2E8F0'
    },
    requirement: {
      display: 'flex',
      alignItems: 'center',
      fontSize: '0.75rem',
      marginBottom: '0.375rem',
      gap: '0.5rem'
    },
    requirementMet: {
      color: '#10B981',
      fontWeight: '600'
    },
    requirementUnmet: {
      color: '#6B7280'
    },
    strengthMeter: {
      height: '4px',
      borderRadius: '2px',
      marginBottom: '0.75rem',
      background: 'linear-gradient(90deg, #EF4444 0%, #F59E0B 50%, #10B981 100%)'
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

  const getRequirementIcon = (met) => {
    return met ? '✅' : '⭕';
  };

  const getStrengthWidth = () => {
    const metCount = Object.values(passwordStrength).filter(Boolean).length;
    return `${(metCount / 5) * 100}%`;
  };

  const getStrengthColor = () => {
    const metCount = Object.values(passwordStrength).filter(Boolean).length;
    if (metCount <= 1) return '#EF4444';
    if (metCount <= 3) return '#F59E0B';
    return '#10B981';
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>StockMaster</h1>
          <p style={styles.subtitle}>Create your account to get started</p>
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
              Full Name
            </label>
            <div style={styles.inputContainer}>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                style={styles.input}
                placeholder="Enter your full name"
                onFocus={(e) => {
                  e.target.style.borderColor = '#84eab3';
                  e.target.style.backgroundColor = 'white';
                  e.target.style.boxShadow = '0 0 0 3px rgba(132, 234, 179, 0.1)';
                }}
                onBlur={(e) => {
                  if (!formData.name) {
                    e.target.style.borderColor = '#E2E8F0';
                    e.target.style.backgroundColor = '#F8FAFC';
                    e.target.style.boxShadow = 'none';
                  }
                }}
              />
            </div>
          </div>

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
                  ...(formData.email ? (validateEmail(formData.email) ? styles.inputFocus : styles.inputError) : {})
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
                  ...(formData.password ? (validatePasswordStrength() ? styles.inputFocus : styles.inputError) : {}),
                  paddingRight: '3rem'
                }}
                placeholder="Create a strong password"
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

            {/* Password Strength Indicator */}
            {formData.password && (
              <div style={styles.requirementBox}>
                <div style={{
                  ...styles.strengthMeter,
                  width: getStrengthWidth(),
                  backgroundColor: getStrengthColor()
                }}></div>
                <div style={styles.requirement}>
                  <span style={passwordStrength.length ? styles.requirementMet : styles.requirementUnmet}>
                    {getRequirementIcon(passwordStrength.length)} At least 8 characters
                  </span>
                </div>
                <div style={styles.requirement}>
                  <span style={passwordStrength.uppercase ? styles.requirementMet : styles.requirementUnmet}>
                    {getRequirementIcon(passwordStrength.uppercase)} One uppercase letter
                  </span>
                </div>
                <div style={styles.requirement}>
                  <span style={passwordStrength.lowercase ? styles.requirementMet : styles.requirementUnmet}>
                    {getRequirementIcon(passwordStrength.lowercase)} One lowercase letter
                  </span>
                </div>
                <div style={styles.requirement}>
                  <span style={passwordStrength.number ? styles.requirementMet : styles.requirementUnmet}>
                    {getRequirementIcon(passwordStrength.number)} One number
                  </span>
                </div>
                <div style={styles.requirement}>
                  <span style={passwordStrength.special ? styles.requirementMet : styles.requirementUnmet}>
                    {getRequirementIcon(passwordStrength.special)} One special character
                  </span>
                </div>
              </div>
            )}
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
              Confirm Password
            </label>
            <div style={styles.inputContainer}>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                style={{
                  ...styles.input,
                  ...(formData.confirmPassword ? (
                    formData.password === formData.confirmPassword ? styles.inputFocus : styles.inputError
                  ) : {}),
                  paddingRight: '3rem'
                }}
                placeholder="Confirm your password"
                onFocus={(e) => {
                  e.target.style.borderColor = '#84eab3';
                  e.target.style.backgroundColor = 'white';
                  e.target.style.boxShadow = '0 0 0 3px rgba(132, 234, 179, 0.1)';
                }}
                onBlur={(e) => {
                  if (!formData.confirmPassword) {
                    e.target.style.borderColor = '#E2E8F0';
                    e.target.style.backgroundColor = '#F8FAFC';
                    e.target.style.boxShadow = 'none';
                  }
                }}
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
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
                {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
            {formData.confirmPassword && formData.password !== formData.confirmPassword && (
              <p style={{ color: '#EF4444', fontSize: '0.75rem', marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <span>⚠️</span> Passwords do not match
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
                Creating Account...
              </span>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <p style={{ color: '#64748B', fontSize: '0.875rem' }}>
            Already have an account?{' '}
            <Link 
              to="/" 
              style={styles.link}
              onMouseEnter={(e) => e.target.style.color = '#00072D'}
              onMouseLeave={(e) => e.target.style.color = '#84eab3'}
            >
              Sign in here
            </Link>
          </p>
        </div>

        {/* Demo credentials section */}
        <div style={styles.demoBox}>
          <div style={styles.demoTitle}>💡 Quick Tips</div>
          <div style={{ lineHeight: '1.5' }}>
            <div>• Use <strong>admin@stockmaster.com</strong> for admin role</div>
            <div>• Password must meet 3+ requirements</div>
            <div>• All fields are required</div>
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

export default Register;