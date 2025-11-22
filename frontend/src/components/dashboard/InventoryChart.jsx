import React from 'react'

const InventoryChart = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Inventory Trends</h3>
      <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
        <div className="text-center">
          <div className="text-gray-400 text-4xl mb-2">📊</div>
          <p className="text-gray-500">Inventory charts coming soon</p>
          <p className="text-sm text-gray-400">Stock levels, movement trends, etc.</p>
        </div>
      </div>
    </div>
  )
}

export default InventoryChart