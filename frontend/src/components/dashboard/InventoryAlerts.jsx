import React from 'react'

const InventoryAlerts = ({ products = [] }) => {
  const criticalProducts = products.filter(p => p.current_stock === 0)
  const lowProducts = products.filter(p => p.current_stock > 0 && p.current_stock <= p.min_stock)

  if (criticalProducts.length === 0 && lowProducts.length === 0) return null

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-[#00072D]">Inventory Alerts</h3>
        <div className="flex gap-2">
          {criticalProducts.length > 0 && (
            <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-medium">
              {criticalProducts.length} Critical
            </span>
          )}
          {lowProducts.length > 0 && (
            <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-medium">
              {lowProducts.length} Low Stock
            </span>
          )}
        </div>
      </div>

      <div className="space-y-3">
        {criticalProducts.slice(0, 2).map(product => (
          <div key={product.id} className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span className="font-medium text-red-800">{product.name}</span>
            </div>
            <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
              OUT OF STOCK
            </span>
          </div>
        ))}
        
        {lowProducts.slice(0, 3).map(product => (
          <div key={product.id} className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span className="font-medium text-yellow-800">{product.name}</span>
            </div>
            <span className="bg-yellow-500 text-white px-2 py-1 rounded text-xs font-bold">
              {product.current_stock} LEFT
            </span>
          </div>
        ))}
      </div>

      {(criticalProducts.length > 2 || lowProducts.length > 3) && (
        <button className="w-full mt-4 text-[#84eab3] hover:text-[#00072D] text-sm font-medium transition-colors">
          View all {criticalProducts.length + lowProducts.length} alerts →
        </button>
      )}
    </div>
  )
}

export default InventoryAlerts