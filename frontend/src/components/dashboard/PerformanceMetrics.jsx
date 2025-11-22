import React from 'react'

const PerformanceMetrics = () => {
  const metrics = [
    { label: 'Inventory Turnover', value: '2.8x', trend: '+0.3', positive: true },
    { label: 'Stock Accuracy', value: '98.5%', trend: '+1.2%', positive: true },
    { label: 'Order Fulfillment', value: '94.2%', trend: '-0.8%', positive: false },
    { label: 'Carrying Cost', value: '22%', trend: '-3%', positive: true }
  ]

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <h3 className="text-lg font-semibold text-[#00072D] mb-6">Performance Metrics</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <div key={index} className="text-center p-4 bg-slate-50 rounded-lg">
            <p className="text-2xl font-bold text-[#00072D] mb-1">{metric.value}</p>
            <p className="text-xs text-slate-600 mb-2">{metric.label}</p>
            <div className={`inline-flex items-center text-xs px-2 py-1 rounded ${
              metric.positive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {metric.positive ? '↑' : '↓'} {metric.trend}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PerformanceMetrics