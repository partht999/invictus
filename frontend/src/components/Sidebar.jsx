// src/components/Sidebar.jsx
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // This should work now

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/products', label: 'Products' },
    { path: '/operations', label: 'Operations' },
    { path: '/move-history', label: 'Move History' },
    { path: '/settings', label: 'Settings' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="bg-white border-r border-slate-200 w-64 flex flex-col">
      <div className="p-6 border-b border-slate-200">
        <h1 className="text-xl font-bold text-[#00072D]">StockMaster</h1>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`block px-4 py-2 rounded-lg text-slate-700 hover:bg-slate-100 transition ${
                  location.pathname === item.path ? 'bg-[#84eab3]/30 text-[#84eab3]' : ''
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-slate-200">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-slate-600">{user?.name || 'User'}</span>
          <button
            onClick={handleLogout}
            className="text-sm text-[#84eab3] hover:text-[#00072D]"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;