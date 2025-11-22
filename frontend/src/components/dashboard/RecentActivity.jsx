import React from 'react'

const RecentActivity = ({ activities }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'receipt':
        return '📥'
      case 'delivery':
        return '📤'
      default:
        return '📋'
    }
  }

  const getActivityColor = (type) => {
    switch (type) {
      case 'receipt':
        return 'text-green-600 bg-green-50'
      case 'delivery':
        return 'text-blue-600 bg-blue-50'
      default:
        return 'text-gray-600 bg-gray-50'
    }
  }

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        <span className="text-sm text-gray-500">Today</span>
      </div>
      
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-150">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${getActivityColor(activity.type)}`}>
              {getActivityIcon(activity.type)}
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {activity.type === 'receipt' ? 'Received' : 'Delivered'} {activity.quantity} {activity.product}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {formatTime(activity.timestamp)}
              </p>
            </div>
            
            <div className={`text-xs font-medium px-2 py-1 rounded-full ${
              activity.type === 'receipt' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-blue-100 text-blue-800'
            }`}>
              {activity.type === 'receipt' ? '+ Stock' : '- Stock'}
            </div>
          </div>
        ))}
        
        {activities.length === 0 && (
          <div className="text-center py-8">
            <div className="text-gray-400 text-4xl mb-2">📋</div>
            <p className="text-gray-500 text-sm">No recent activity</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default RecentActivity