import React from 'react'

const LowStockPanel = ({ products = [] }) => {
  const lowStockProducts = products.filter(p => p.current_stock <= p.min_stock)
  
  if (lowStockProducts.length === 0) return null

  return (
    <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-xl p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="bg-orange-100 p-2 rounded-lg">
            <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <div className="ml-3">
            <h4 className="text-lg font-semibold text-orange-800">Low Stock Alerts</h4>
            <p className="text-sm text-orange-700">{lowStockProducts.length} product(s) need restocking</p>
          </div>
        </div>
        <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
          {lowStockProducts.length}
        </span>
      </div>
      
      <div className="space-y-3">
        {lowStockProducts.slice(0, 3).map(product => (
          <div key={product.id} className="flex justify-between items-center p-3 bg-white rounded-lg border">
            <div>
              <p className="font-medium text-gray-900">{product.name}</p>
              <p className="text-sm text-gray-500">Current: {product.current_stock} • Min: {product.min_stock}</p>
            </div>
            <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-medium">
              {product.current_stock} left
            </span>
          </div>
        ))}
        
        {lowStockProducts.length > 3 && (
          <p className="text-center text-orange-600 text-sm font-medium">
            +{lowStockProducts.length - 3} more products need attention
          </p>
        )}
      </div>
    </div>
  )
}

export default LowStockPanel