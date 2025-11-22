import React from 'react';

const ProductAnalytics = ({ products }) => {
  // Enhanced analytics calculation
  const analytics = {
    totalValue: products.reduce((sum, p) => sum + (p.value || 0), 0),
    averageStock: Math.round(products.reduce((sum, p) => sum + p.current_stock, 0) / products.length),
    turnoverRate: 2.8,
    stockHealth: Math.round((products.filter(p => p.current_stock > p.min_stock).length / products.length) * 100),
    topPerforming: products.slice(0, 3).map(p => ({
      ...p,
      performance: Math.random() * 100 + 50, // Mock performance score
      trend: ['up', 'stable', 'down'][Math.floor(Math.random() * 3)] // Mock trend
    }))
  };

  const getPerformanceColor = (score) => {
    if (score >= 80) return { text: 'text-emerald-600', bg: 'bg-emerald-100', border: 'border-emerald-200' };
    if (score >= 60) return { text: 'text-blue-600', bg: 'bg-blue-100', border: 'border-blue-200' };
    if (score >= 40) return { text: 'text-yellow-600', bg: 'bg-yellow-100', border: 'border-yellow-200' };
    return { text: 'text-red-600', bg: 'bg-red-100', border: 'border-red-200' };
  };

  const getTrendIcon = (trend) => {
    const icons = {
      up: { icon: '📈', color: 'text-emerald-600' },
      stable: { icon: '➡️', color: 'text-blue-600' },
      down: { icon: '📉', color: 'text-red-600' }
    };
    return icons[trend] || icons.stable;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-[#00072D] to-[#1a237e] p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-[#84eab3] rounded-xl flex items-center justify-center text-[#00072D] font-bold text-lg">
              📈
            </div>
            <div>
              <h2 className="text-2xl font-bold">Product Analytics</h2>
              <p className="text-blue-100 opacity-90">Real-time performance insights</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-[#84eab3]">{products.length}</div>
            <div className="text-sm text-blue-200">Total Products</div>
          </div>
        </div>
      </div>

      {/* Quick Stats Bar */}
      <div className="bg-slate-50 border-b border-slate-200 p-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="bg-white p-3 rounded-xl border border-slate-200">
            <div className="text-sm text-slate-600">Stock Health</div>
            <div className="text-lg font-bold text-emerald-600">{analytics.stockHealth}%</div>
          </div>
          <div className="bg-white p-3 rounded-xl border border-slate-200">
            <div className="text-sm text-slate-600">Active Alerts</div>
            <div className="text-lg font-bold text-yellow-600">
              {products.filter(p => p.current_stock <= p.min_stock).length}
            </div>
          </div>
          <div className="bg-white p-3 rounded-xl border border-slate-200">
            <div className="text-sm text-slate-600">Categories</div>
            <div className="text-lg font-bold text-purple-600">
              {new Set(products.map(p => p.category)).size}
            </div>
          </div>
          <div className="bg-white p-3 rounded-xl border border-slate-200">
            <div className="text-sm text-slate-600">Avg Value</div>
            <div className="text-lg font-bold text-blue-600">
              ₹{Math.round(analytics.totalValue / products.length / 1000)}K
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Key Metrics */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-[#00072D] mb-4 flex items-center">
            <span className="w-2 h-2 bg-[#84eab3] rounded-full mr-2"></span>
            Key Performance Indicators
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-5 border border-blue-200 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                  💰
                </div>
                <div className="text-right">
                  <div className="text-xs text-blue-600">Inventory Value</div>
                  <div className="text-lg font-bold text-blue-700">{formatCurrency(analytics.totalValue)}</div>
                </div>
              </div>
              <div className="text-sm text-blue-600">Total asset value across all products</div>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-5 border border-emerald-200 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
                  📊
                </div>
                <div className="text-right">
                  <div className="text-xs text-emerald-600">Stock Level</div>
                  <div className="text-lg font-bold text-emerald-700">{analytics.averageStock} units</div>
                </div>
              </div>
              <div className="text-sm text-emerald-600">Average stock per product</div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-5 border border-purple-200 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600">
                  🔄
                </div>
                <div className="text-right">
                  <div className="text-xs text-purple-600">Turnover Rate</div>
                  <div className="text-lg font-bold text-purple-700">{analytics.turnoverRate}x</div>
                </div>
              </div>
              <div className="text-sm text-purple-600">Inventory turnover ratio</div>
            </div>
          </div>
        </div>

        {/* Top Performing Products */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-[#00072D] flex items-center">
              <span className="w-2 h-2 bg-[#84eab3] rounded-full mr-2"></span>
              🏆 Top Performing Products
            </h3>
            <div className="text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
              Last 30 Days
            </div>
          </div>

          <div className="space-y-3">
            {analytics.topPerforming.map((product, index) => {
              const performanceConfig = getPerformanceColor(product.performance);
              const trendConfig = getTrendIcon(product.trend);
              
              return (
                <div 
                  key={product.id} 
                  className="bg-white border border-slate-200 rounded-xl p-4 hover:shadow-md transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 flex-1">
                      {/* Rank Badge */}
                      <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#84eab3] to-[#00072D] rounded-xl flex items-center justify-center text-white font-bold text-lg">
                          {index + 1}
                        </div>
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-white border border-slate-200 rounded-full flex items-center justify-center">
                          <span className={`text-xs ${trendConfig.color}`}>
                            {trendConfig.icon}
                          </span>
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-semibold text-[#00072D] group-hover:text-[#84eab3] transition-colors">
                            {product.name}
                          </h4>
                          <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">
                            {product.category}
                          </span>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-slate-500">
                          <span className="font-mono">{product.sku}</span>
                          <span>Stock: {product.current_stock}</span>
                          <span>{formatCurrency(product.value)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Performance Score */}
                    <div className="text-right">
                      <div className={`px-4 py-2 rounded-xl border ${performanceConfig.border} ${performanceConfig.bg} ${performanceConfig.text} font-bold text-lg`}>
                        {Math.round(product.performance)}%
                      </div>
                      <div className="text-xs text-slate-500 mt-1">Performance</div>
                    </div>
                  </div>

                  {/* Performance Bar */}
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-xs text-slate-600 mb-1">
                      <span>Performance Score</span>
                      <span>{Math.round(product.performance)}/100</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full bg-gradient-to-r ${
                          product.performance >= 80 ? 'from-emerald-400 to-emerald-500' :
                          product.performance >= 60 ? 'from-blue-400 to-blue-500' :
                          product.performance >= 40 ? 'from-yellow-400 to-yellow-500' :
                          'from-red-400 to-red-500'
                        } transition-all duration-1000`}
                        style={{ width: `${product.performance}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Insights */}
        <div className="mt-6 pt-6 border-t border-slate-200">
          <h4 className="font-semibold text-slate-700 mb-3 flex items-center">
            <span className="text-[#84eab3] mr-2">💡</span>
            Quick Insights
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="font-semibold text-blue-700">📦 Stock Optimization</div>
              <div className="text-blue-600">Consider reordering for {products.filter(p => p.current_stock <= p.min_stock).length} low-stock items</div>
            </div>
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3">
              <div className="font-semibold text-emerald-700">💰 Value Concentration</div>
              <div className="text-emerald-600">Top 3 products represent {Math.round((analytics.topPerforming.reduce((sum, p) => sum + p.value, 0) / analytics.totalValue) * 100)}% of total value</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductAnalytics;