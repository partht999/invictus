import React from 'react'

const Header = ({ onLogout }) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}')

  return (
    <header className="bg-white shadow">
      <div className="flex justify-between items-center p-4">
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-gray-800">StockMaster</h1>
          <nav className="ml-8">
            <a href="/dashboard" className="text-blue-600 font-medium mx-2">Dashboard</a>
            <a href="/products" className="text-gray-600 hover:text-blue-600 mx-2">Products</a>
            <a href="/receipts" className="text-gray-600 hover:text-blue-600 mx-2">Receipts</a>
            <a href="/deliveries" className="text-gray-600 hover:text-blue-600 mx-2">Deliveries</a>
          </nav>
        </div>
        
        <div className="flex items-center">
          <span className="text-gray-700 mr-4">Welcome, {user.name || 'User'}</span>
          <button
            onClick={onLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header