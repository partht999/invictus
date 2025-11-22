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
      // PRIMARY BUTTON: Blue background, white text
      style: 'bg-[#00072D] text-white hover:bg-[#00072D]/80'
    },
    {
      title: 'Receive Stock',
      description: 'Record incoming inventory',
      icon: '📥',
      onClick: () => navigate('/receipts'),
      // SECONDARY BUTTON: Green background, blue text  
      style: 'bg-[#84eab3] text-[#00072D] hover:bg-[#84eab3]/80'
    },
    {
      title: 'Ship Orders',
      description: 'Process outgoing deliveries',
      icon: '📤',
      onClick: () => navigate('/deliveries'),
      // OUTLINED BUTTON: Green border, green text
      style: 'border border-[#84eab3] text-[#84eab3] hover:bg-[#84eab3]/10'
    }
  ]

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <h3 className="text-lg font-semibold text-[#00072D] mb-6">Quick Actions</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={action.onClick}
            className={`${action.style} rounded-lg p-6 text-left transition-colors duration-200 font-medium flex flex-col items-start min-h-[120px] justify-between`}
          >
            <div className="text-2xl">{action.icon}</div>
            <div className="w-full">
              <h4 className="font-semibold text-base mb-2">{action.title}</h4>
              <p className="text-sm opacity-90">{action.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default QuickActions