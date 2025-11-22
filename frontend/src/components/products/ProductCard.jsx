import React from 'react';

const ProductCard = ({ product, onEdit, onDelete }) => {
  // Enhanced mock data with additional fields
  const enhancedProduct = {
    ...product,
    value: product.value || Math.floor(Math.random() * 50000) + 10000,
    lastUpdated: product.lastUpdated || '2 hours ago',
    supplier: product.supplier || 'Default Supplier',
    location: product.location || 'Warehouse A'
  };

  const getStockStatus = (current, min) => {
    if (current === 0) return 'out-of-stock';
    if (current <= min) return 'low-stock';
    return 'in-stock';
  };

  const getStockBadge = (current, min) => {
    const status = getStockStatus(current, min);
    const config = {
      'in-stock': { 
        class: 'bg-emerald-100 text-emerald-700 border border-emerald-200', 
        text: 'In Stock',
        icon: '✅'
      },
      'low-stock': { 
        class: 'bg-yellow-100 text-yellow-700 border border-yellow-200', 
        text: 'Low Stock',
        icon: '⚠️'
      },
      'out-of-stock': { 
        class: 'bg-red-100 text-red-700 border border-red-200', 
        text: 'Out of Stock',
        icon: '❌'
      }
    };
    const { class: badgeClass, text, icon } = config[status];
    
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${badgeClass}`}>
        <span className="mr-1 text-xs">{icon}</span>
        {text}
      </span>
    );
  };

  const getStockLevelColor = (current, min) => {
    const status = getStockStatus(current, min);
    return {
      'in-stock': 'bg-gradient-to-r from-emerald-400 to-emerald-500',
      'low-stock': 'bg-gradient-to-r from-yellow-400 to-yellow-500',
      'out-of-stock': 'bg-gradient-to-r from-red-400 to-red-500'
    }[status];
  };

  const getUrgencyLevel = (current, min) => {
    if (current === 0) return { level: 'critical', text: 'URGENT', color: 'text-red-600' };
    if (current <= min) return { level: 'warning', text: 'LOW', color: 'text-yellow-600' };
    if (current <= min * 1.5) return { level: 'notice', text: 'MONITOR', color: 'text-blue-600' };
    return { level: 'healthy', text: 'HEALTHY', color: 'text-emerald-600' };
  };

  const stockPercentage = Math.min((enhancedProduct.current_stock / (enhancedProduct.min_stock * 2)) * 100, 100);
  const urgency = getUrgencyLevel(enhancedProduct.current_stock, enhancedProduct.min_stock);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="group bg-white rounded-2xl shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] overflow-hidden">
      {/* Card Header with Gradient */}
      <div className="bg-gradient-to-r from-[#00072D] to-[#1a237e] p-4 text-white relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-[#84eab3] to-white rounded-xl flex items-center justify-center text-[#00072D] font-bold text-lg shadow-lg">
              {enhancedProduct.name.charAt(0)}
            </div>
            <div>
              <h3 className="font-bold text-lg truncate max-w-[120px]">
                {enhancedProduct.name}
              </h3>
              <p className="text-blue-100 text-xs opacity-80">
                {enhancedProduct.supplier}
              </p>
            </div>
          </div>
          {getStockBadge(enhancedProduct.current_stock, enhancedProduct.min_stock)}
        </div>
        
        {/* Urgency Indicator */}
        <div className={`absolute -top-2 -right-2 px-2 py-1 rounded-full text-xs font-bold ${urgency.color} bg-white shadow-lg border`}>
          {urgency.text}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5">
        {/* SKU and Category */}
        <div className="flex items-center justify-between mb-4">
          <div className="bg-slate-100 px-3 py-1 rounded-lg border border-slate-200">
            <code className="text-sm font-mono text-slate-700">
              {enhancedProduct.sku}
            </code>
          </div>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
            🏷️ {enhancedProduct.category}
          </span>
        </div>

        {/* Location and Last Updated */}
        <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
          <div className="flex items-center space-x-1">
            <span>📍</span>
            <span>{enhancedProduct.location}</span>
          </div>
          <div className="flex items-center space-x-1">
            <span>🕒</span>
            <span>{enhancedProduct.lastUpdated}</span>
          </div>
        </div>

        {/* Stock Progress with Enhanced Visuals */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-semibold text-slate-700">Stock Level</span>
            <div className="text-right">
              <div className="text-lg font-bold text-[#00072D]">
                {enhancedProduct.current_stock}
              </div>
              <div className="text-xs text-slate-500">
                min: {enhancedProduct.min_stock}
              </div>
            </div>
          </div>
          
          {/* Enhanced Progress Bar */}
          <div className="relative">
            <div className="w-full bg-slate-200 rounded-full h-3 shadow-inner">
              <div 
                className={`h-3 rounded-full ${getStockLevelColor(enhancedProduct.current_stock, enhancedProduct.min_stock)} transition-all duration-1000 ease-out`}
                style={{ width: `${stockPercentage}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>0</span>
              <span>Optimal: {enhancedProduct.min_stock * 2}</span>
            </div>
          </div>
        </div>

        {/* Value and Critical Info */}
        <div className="grid grid-cols-2 gap-4 mb-4 p-3 bg-slate-50 rounded-xl border border-slate-200">
          <div className="text-center">
            <div className="text-sm font-semibold text-emerald-700 mb-1">
              {formatCurrency(enhancedProduct.value)}
            </div>
            <div className="text-xs text-slate-600">Inventory Value</div>
          </div>
          <div className="text-center">
            <div className={`text-sm font-semibold ${urgency.color} mb-1`}>
              {enhancedProduct.current_stock - enhancedProduct.min_stock}
            </div>
            <div className="text-xs text-slate-600">Buffer Stock</div>
          </div>
        </div>

        {/* Stock Health Indicator */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-xs text-slate-600 mb-2">
            <span>Stock Health</span>
            <span className="font-semibold">{Math.round(stockPercentage)}%</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-1">
            <div 
              className="h-1 rounded-full bg-gradient-to-r from-red-400 via-yellow-400 to-emerald-400"
              style={{ width: `${stockPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Enhanced Actions */}
        <div className="flex space-x-2 pt-4 border-t border-slate-200">
          <button
            onClick={() => onEdit && onEdit(enhancedProduct)}
            className="flex-1 bg-gradient-to-r from-[#84eab3] to-[#6dd4a1] text-[#00072D] px-3 py-2.5 rounded-xl font-semibold text-sm hover:shadow-lg transition-all duration-200 hover:scale-105 group relative overflow-hidden"
          >
            <span className="relative z-10 flex items-center justify-center">
              <span className="mr-2">✏️</span>
              Edit
            </span>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-200"></div>
          </button>
          <button
            onClick={() => onDelete && onDelete(enhancedProduct.id)}
            className="flex-1 bg-gradient-to-r from-red-100 to-red-50 text-red-700 border border-red-200 px-3 py-2.5 rounded-xl font-semibold text-sm hover:shadow-lg transition-all duration-200 hover:scale-105 group relative overflow-hidden"
          >
            <span className="relative z-10 flex items-center justify-center">
              <span className="mr-2">🗑️</span>
              Delete
            </span>
            <div className="absolute inset-0 bg-red-200 opacity-0 group-hover:opacity-20 transition-opacity duration-200"></div>
          </button>
        </div>

        {/* Quick Actions Footer */}
        <div className="flex justify-center space-x-4 mt-3 pt-3 border-t border-slate-100">
          <button className="text-xs text-slate-500 hover:text-[#84eab3] transition-colors flex items-center">
            📊 Analytics
          </button>
          <button className="text-xs text-slate-500 hover:text-[#84eab3] transition-colors flex items-center">
            📋 History
          </button>
          <button className="text-xs text-slate-500 hover:text-[#84eab3] transition-colors flex items-center">
            🔔 Alert
          </button>
        </div>
      </div>

      {/* Hover Effect Border */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-[#84eab3] transition-all duration-300 pointer-events-none"></div>
    </div>
  );
};

export default ProductCard;