import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import StatsCards from './StatsCards'
import Header from './Header'
import QuickActions from './QuickActions'
import RecentActivity from './RecentActivity'
import LoadingSkeleton from './LoadingSkeleton'
import InventoryChart from './InventoryChart'
import LowStockPanel from './LowStockPanel'
import NotificationBell from './NotificationBell'
import DashboardSearch from './DashboardSearch'
// REMOVE THIS LINE: import MobileNav from './MobileNav'

const Dashboard = () => {
  const [stats, setStats] = useState({})
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [recentActivity, setRecentActivity] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      
      // ⏰ ADD THIS DELAY TO SEE LOADING SKELETON
    await new Promise(resolve => setTimeout(resolve, 2000)) // 3 second delay
    

      const token = localStorage.getItem('token')
      
      // Fetch stats
      const statsResponse = await axios.get('http://localhost:5000/api/dashboard/stats', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setStats(statsResponse.data)
      
      // Fetch products for LowStockPanel
      const productsResponse = await axios.get('http://localhost:5000/api/products', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setProducts(productsResponse.data)
      
      // Mock data for recent activity
      setRecentActivity([
        { id: 1, type: 'receipt', product: 'Steel Rods', quantity: 50, timestamp: new Date().toISOString() },
        { id: 2, type: 'delivery', product: 'Wood Planks', quantity: 20, timestamp: new Date().toISOString() },
        { id: 3, type: 'receipt', product: 'Aluminum Sheets', quantity: 100, timestamp: new Date().toISOString() }
      ])
      
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (term) => {
    setSearchTerm(term)
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/')
  }

  if (loading) {
    return <LoadingSkeleton />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* REMOVE pb-20 md:pb-0 since no mobile nav */}
      <Header onLogout={logout} />
      
      <div className="p-6 max-w-7xl mx-auto">
        {/* Welcome Header with Notification Bell */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Overview</h1>
            <p className="text-gray-600">Welcome back! Here's what's happening with your inventory today.</p>
          </div>
          <NotificationBell />
        </div>
        
        {/* Search Bar */}
        <DashboardSearch onSearch={handleSearch} />
        
        {/* Low Stock Alerts */}
        <LowStockPanel products={products} />
        
        {/* Stats Cards */}
        <StatsCards stats={stats} />
        
        {/* Inventory Chart */}
        <div className="mt-6">
          <InventoryChart />
        </div>
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <QuickActions />
          </div>
          
          {/* Recent Activity */}
          <div className="lg:col-span-1">
            <RecentActivity activities={recentActivity} />
          </div>
        </div>
      </div>
      
      {/* REMOVE THIS LINE: <MobileNav /> */}
    </div>
  )
}

export default Dashboard