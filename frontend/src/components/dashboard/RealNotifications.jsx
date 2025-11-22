import React, { useState, useEffect } from 'react'

const RealNotifications = () => {
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    // Simulate real-time notifications
    const interval = setInterval(() => {
      const newNotification = {
        id: Date.now(),
        message: 'New stock movement detected',
        type: 'info',
        timestamp: new Date()
      }
      setNotifications(prev => [newNotification, ...prev.slice(0, 4)])
    }, 30000) // Every 30 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <h3 className="text-lg font-semibold text-[#00072D] mb-4">Live Alerts</h3>
      <div className="space-y-3">
        {notifications.map(notification => (
          <div key={notification.id} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-blue-900">{notification.message}</p>
              <p className="text-xs text-blue-700">{notification.timestamp.toLocaleTimeString()}</p>
            </div>
          </div>
        ))}
        {notifications.length === 0 && (
          <p className="text-slate-500 text-sm text-center py-4">No recent alerts</p>
        )}
      </div>
    </div>
  )
}

export default RealNotifications
