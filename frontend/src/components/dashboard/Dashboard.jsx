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
// Import new features
import InventoryAlerts from './InventoryAlerts'
import PerformanceMetrics from './PerformanceMetrics'
import RecentTransactions from './RecentTransactions'
import QuickStats from './QuickStats'
import ExportButton from './ExportButton'
// 🆕 IMPORT THE 3 NEW COMPONENTS
import RealNotifications from './RealNotifications'
import QuickAddWidget from './QuickAddWidget'
import RealCharts from './RealCharts'

const Dashboard = () => {
  const [stats, setStats] = useState({})
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [recentActivity, setRecentActivity] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [lastUpdated, setLastUpdated] = useState(new Date())
  const navigate = useNavigate()

  useEffect(() => {
    fetchDashboardData()
    
    // Auto-refresh (every 30 seconds)
    const interval = setInterval(fetchDashboardData, 30000)
    
    return () => clearInterval(interval) // Cleanup on unmount
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('token')
      await new Promise(resolve => setTimeout(resolve, 1500)) 
      const statsResponse = await axios.get('http://localhost:5000/api/dashboard/stats', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setStats(statsResponse.data)
      
      const productsResponse = await axios.get('http://localhost:5000/api/products', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setProducts(productsResponse.data)
      
      setRecentActivity([
        { id: 1, type: 'receipt', product: 'Steel Rods', quantity: 50, timestamp: new Date().toISOString() },
        { id: 2, type: 'delivery', product: 'Wood Planks', quantity: 20, timestamp: new Date().toISOString() },
        { id: 3, type: 'receipt', product: 'Aluminum Sheets', quantity: 100, timestamp: new Date().toISOString() }
      ])
      
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
      setLastUpdated(new Date())
    }
  }

  // Manual refresh function
  const handleRefresh = () => {
    fetchDashboardData()
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
    <div className="min-h-screen bg-[#F8FAFC]">
      <Header onLogout={logout} />
      
      <div className="p-6 max-w-7xl mx-auto">
        {/* Updated Header Section */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#00072D] mb-2">Dashboard Overview</h1>
            <p className="text-slate-600">
              Welcome back! Last updated: {lastUpdated.toLocaleTimeString()}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            {/* Refresh Button */}
            <button
              onClick={handleRefresh}
              disabled={loading}
              className="flex items-center space-x-2 bg-[#84eab3] text-[#00072D] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#84eab3]/80 transition-colors disabled:opacity-50"
            >
              <svg className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Refresh</span>
            </button>
            
            {/* Export Button */}
            <ExportButton />
            
            <NotificationBell />
          </div>
        </div>
        
        <DashboardSearch onSearch={handleSearch} />
        
        {/* NEW: Quick Stats at the top */}
        <QuickStats stats={stats} />
        
        {/* NEW: Inventory Alerts - shows critical stock issues */}
        <InventoryAlerts products={products} />
        
        <LowStockPanel products={products} />
        <StatsCards stats={stats} />
        
        {/* NEW: Performance Metrics */}
        <PerformanceMetrics />
        
        {/* 🆕 REPLACE OLD INVENTORY CHART WITH REAL CHARTS */}
        <div className="mt-6">
          <RealCharts products={products} />
        </div>
        
        {/* 🆕 ADD REAL NOTIFICATIONS SECTION */}
        <div className="mt-6">
          <RealNotifications />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-2">
            <QuickActions />
          </div>
          <div className="lg:col-span-1">
            <RecentActivity activities={recentActivity} />
          </div>
        </div>
        
        {/* NEW: Recent Transactions Table */}
        <div className="mt-6">
          <RecentTransactions />
        </div>
      </div>
      
      {/* 🆕 ADD QUICK ADD WIDGET (FLOATING BUTTON) */}
      <QuickAddWidget />
    </div>
  )
}

export default Dashboard