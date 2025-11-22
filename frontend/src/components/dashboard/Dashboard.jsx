import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
// import StatsCards from './StatsCards'
// import Header from './Header'

const Dashboard = () => {
  const [stats, setStats] = useState({})
  const navigate = useNavigate()

  // ... keep the rest of your Dashboard code
  
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Temporary header */}
      <header className="bg-white shadow p-4">
        <h1 className="text-xl font-bold">StockMaster - Dashboard</h1>
      </header>
      
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-8">StockMaster Dashboard</h1>
        
        {/* Temporary stats display */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold">Total Products</h3>
            <p className="text-3xl font-bold text-blue-600">{stats.totalProducts || 0}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold">Low Stock Items</h3>
            <p className="text-3xl font-bold text-red-600">{stats.lowStockItems || 0}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold">Total Stock</h3>
            <p className="text-3xl font-bold text-green-600">{stats.totalStock || 0}</p>
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
          <div className="flex gap-4">
            <button
              onClick={() => navigate('/products')}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Manage Products
            </button>
            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              Add Receipt
            </button>
            <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
              Add Delivery
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard