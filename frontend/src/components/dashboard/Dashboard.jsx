import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import StatsCards from './StatsCards'
import Header from './Header'
import QuickActions from './QuickActions'
import RecentActivity from './RecentActivity'

const Dashboard = () => {
  const [stats, setStats] = useState({})
  const [loading, setLoading] = useState(true)
  const [recentActivity, setRecentActivity] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('token')
      
      // Fetch stats
      const statsResponse = await axios.get('http://localhost:5000/api/dashboard/stats', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setStats(statsResponse.data)
      
      // Fetch recent activity (you'll need to create this API endpoint)
      // const activityResponse = await axios.get('http://localhost:5000/api/activity', {
      //   headers: { Authorization: `Bearer ${token}` }
      // })
      // setRecentActivity(activityResponse.data)
      
      // Mock data for now
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

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Header onLogout={logout} />
        <div className="p-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white p-6 rounded-xl shadow-sm h-32"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header onLogout={logout} />
      
      <div className="p-6 max-w-7xl mx-auto">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Overview</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your inventory today.</p>
        </div>
        
        {/* Stats Cards */}
        <StatsCards stats={stats} />
        
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
    </div>
  )
}

export default Dashboard