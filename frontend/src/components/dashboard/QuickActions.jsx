import React from 'react'
import { useNavigate } from 'react-router-dom'

const QuickActions = () => {
  const navigate = useNavigate()

  const actions = [
    {
      title: 'Manage Products',
      description: 'Add, edit or view products',
      icon: '📦',
      onClick: () => navigate('/products'),
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700'
    },
    {
      title: 'Receive Stock',
      description: 'Record incoming inventory',
      icon: '📥',
      onClick: () => navigate('/receipts'),
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700'
    },
    {
      title: 'Ship Orders',
      description: 'Process outgoing deliveries',
      icon: '📤',
      onClick: () => navigate('/deliveries'),
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-700'
    }
  ]

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
        <span className="text-sm text-gray-500">Frequently used</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={action.onClick}
            className={`${action.bgColor} p-4 rounded-xl text-left transition-all duration-200 hover:shadow-md border border-transparent hover:border-gray-200 group`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl">{action.icon}</span>
              <div className={`w-8 h-8 bg-gradient-to-r ${action.color} rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200`}>
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
            
            <h4 className={`font-semibold ${action.textColor} mb-1`}>{action.title}</h4>
            <p className="text-sm text-gray-600">{action.description}</p>
          </button>
        ))}
      </div>
    </div>
  )
}

export default QuickActions