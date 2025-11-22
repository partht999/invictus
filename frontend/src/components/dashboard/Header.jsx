import React from 'react'

const Header = ({ onLogout }) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}')

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Navigation */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <span className="ml-3 text-xl font-bold text-gray-900">StockMaster</span>
            </div>
            
            <nav className="ml-8 hidden md:flex space-x-4">
              <a href="/dashboard" className="text-blue-600 font-medium px-3 py-2 rounded-md text-sm bg-blue-50">Dashboard</a>
              <a href="/products" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">Products</a>
              <a href="/receipts" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">Receipts</a>
              <a href="/deliveries" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">Deliveries</a>
            </nav>
          </div>
          
          {/* User Info and Logout */}
          <div className="flex items-center space-x-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-gray-900">Welcome, {user.name || 'User'}</p>
              <p className="text-xs text-gray-500">{user.email || ''}</p>
            </div>
            
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">
                {(user.name || 'U').charAt(0).toUpperCase()}
              </span>
            </div>
            
            <button
              onClick={onLogout}
              className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-sm"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header