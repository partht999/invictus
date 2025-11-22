import React from 'react'

const QuickStats = ({ stats }) => {
  const quickStats = [
    { label: 'Today Sales', value: `$${stats.todaySales || '1,240'}`, icon: '💰', change: '+12%' },
    { label: 'Weekly Orders', value: stats.weeklyOrders || '24', icon: '📦', change: '+8%' },
    { label: 'Pending Receipts', value: stats.pendingReceipts || '3', icon: '⏳', change: '-2' },
    { label: 'Active Suppliers', value: stats.activeSuppliers || '12', icon: '🏢', change: '+1' }
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {quickStats.map((stat, index) => (
        <div key={index} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-[#00072D]">{stat.value}</p>
              <p className="text-xs text-slate-600 mt-1">{stat.label}</p>
              <p className="text-xs text-green-600 font-medium mt-1">{stat.change}</p>
            </div>
            <div className="text-2xl">{stat.icon}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default QuickStats