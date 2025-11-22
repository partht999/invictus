import React from 'react'

const StatsCards = ({ stats }) => {
  const cards = [
    {
      title: 'Total Products',
      value: stats.totalProducts || 0,
      icon: '📦',
      description: 'Active products in inventory',
      trend: '+5%'
    },
    {
      title: 'Low Stock Items',
      value: stats.lowStockItems || 0,
      icon: '⚠️',
      description: 'Need restocking',
      trend: 'Attention needed'
    },
    {
      title: 'Total Stock',
      value: stats.totalStock || 0,
      icon: '📊',
      description: 'Units in inventory',
      trend: '+12%'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card, index) => (
        <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-slate-600 text-sm font-medium mb-1">{card.title}</p>
              <p className="text-slate-900 text-2xl font-semibold mb-2">{card.value}</p>
              <p className="text-slate-500 text-xs">{card.description}</p>
              <p className="text-[#84eab3] text-xs font-medium mt-1">{card.trend}</p>
            </div>
            <div className="bg-[#84eab3]/20 p-3 rounded-lg">
              <span className="text-xl">{card.icon}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default StatsCards