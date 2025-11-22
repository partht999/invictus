import React from 'react'

const RecentActivity = ({ activities }) => {
  const getActivityConfig = (type) => {
    return type === 'receipt' 
      ? { color: 'text-emerald-600 bg-emerald-100', icon: '📥', label: 'Stock In' }
      : { color: 'text-blue-600 bg-blue-100', icon: '📤', label: 'Stock Out' }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-[#00072D]">Recent Activity</h3>
        <span className="text-sm text-slate-500">Today</span>
      </div>
      
      <div className="space-y-4">
        {activities.map((activity) => {
          const config = getActivityConfig(activity.type)
          return (
            <div key={activity.id} className="flex items-center space-x-4 p-3 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${config.color}`}>
                <span className="text-lg">{config.icon}</span>
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900 truncate">
                  {activity.product}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  {config.label} • {activity.quantity} units
                </p>
              </div>
              
              <div className={`text-xs font-medium px-2 py-1 rounded ${
                activity.type === 'receipt' 
                  ? 'bg-emerald-100 text-emerald-800' 
                  : 'bg-blue-100 text-blue-800'
              }`}>
                {activity.type === 'receipt' ? '+' : '-'}{activity.quantity}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default RecentActivity