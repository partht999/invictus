import React from 'react';

const ReorderSuggestions = ({ products }) => {
  const suggestions = products
    .filter(p => p.current_stock <= p.min_stock * 1.5)
    .map(product => ({
      ...product,
      suggestedOrder: Math.max(product.min_stock * 2 - product.current_stock, 10),
      urgency: product.current_stock <= product.min_stock ? 'critical' : 
               product.current_stock <= product.min_stock * 1.2 ? 'high' : 'medium',
      cost: (product.value / (product.current_stock || 1)) * Math.max(product.min_stock * 2 - product.current_stock, 10),
      daysUntilStockout: Math.max(Math.floor((product.current_stock - product.min_stock) / 2), 0),
      supplier: product.supplier || 'Default Supplier'
    }))
    .sort((a, b) => {
      const urgencyOrder = { critical: 0, high: 1, medium: 2 };
      return urgencyOrder[a.urgency] - urgencyOrder[b.urgency];
    })
    .slice(0, 5); // Top 5 suggestions

  const getUrgencyConfig = (urgency) => {
    const config = {
      critical: { 
        color: 'bg-red-100 text-red-700 border-red-200', 
        text: '🚨 Critical', 
        gradient: 'from-red-500 to-red-600',
        icon: '🔴'
      },
      high: { 
        color: 'bg-orange-100 text-orange-700 border-orange-200', 
        text: '⚠️ High Priority', 
        gradient: 'from-orange-500 to-orange-600',
        icon: '🟠'
      },
      medium: { 
        color: 'bg-yellow-100 text-yellow-700 border-yellow-200', 
        text: '📋 Medium Priority', 
        gradient: 'from-yellow-500 to-yellow-600',
        icon: '🟡'
      }
    };
    return config[urgency] || config.medium;
  };

  const getStockoutRisk = (days) => {
    if (days <= 0) return { text: 'Out of Stock', color: 'text-red-600', bg: 'bg-red-100' };
    if (days <= 3) return { text: 'Immediate Risk', color: 'text-red-600', bg: 'bg-red-50' };
    if (days <= 7) return { text: 'High Risk', color: 'text-orange-600', bg: 'bg-orange-50' };
    if (days <= 14) return { text: 'Medium Risk', color: 'text-yellow-600', bg: 'bg-yellow-50' };
    return { text: 'Low Risk', color: 'text-emerald-600', bg: 'bg-emerald-50' };
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const totalReorderCost = suggestions.reduce((sum, product) => sum + product.cost, 0);
  const criticalCount = suggestions.filter(p => p.urgency === 'critical').length;
  const highCount = suggestions.filter(p => p.urgency === 'high').length;

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-[#00072D] to-[#1a237e] p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-[#84eab3] rounded-xl flex items-center justify-center text-[#00072D] font-bold text-lg">
              🚚
            </div>
            <div>
              <h2 className="text-2xl font-bold">Smart Reordering</h2>
              <p className="text-blue-100 opacity-90">AI-powered inventory optimization</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-[#84eab3]">{suggestions.length}</div>
            <div className="text-sm text-blue-200">Active Suggestions</div>
          </div>
        </div>
      </div>

      {/* Quick Stats Bar */}
      <div className="bg-slate-50 border-b border-slate-200 p-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="bg-white p-3 rounded-xl border border-slate-200">
            <div className="text-sm text-slate-600">Total Cost</div>
            <div className="text-lg font-bold text-emerald-600">{formatCurrency(totalReorderCost)}</div>
          </div>
          <div className="bg-white p-3 rounded-xl border border-slate-200">
            <div className="text-sm text-slate-600">Critical Items</div>
            <div className="text-lg font-bold text-red-600">{criticalCount}</div>
          </div>
          <div className="bg-white p-3 rounded-xl border border-slate-200">
            <div className="text-sm text-slate-600">High Priority</div>
            <div className="text-lg font-bold text-orange-600">{highCount}</div>
          </div>
          <div className="bg-white p-3 rounded-xl border border-slate-200">
            <div className="text-sm text-slate-600">Avg Lead Time</div>
            <div className="text-lg font-bold text-blue-600">7 days</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {suggestions.length > 0 ? (
          <div className="space-y-4">
            {suggestions.map((product, index) => {
              const urgencyConfig = getUrgencyConfig(product.urgency);
              const riskConfig = getStockoutRisk(product.daysUntilStockout);
              
              return (
                <div 
                  key={product.id} 
                  className="border border-slate-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 group"
                >
                  {/* Product Header */}
                  <div className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200 p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        <div className={`w-12 h-12 bg-gradient-to-r ${urgencyConfig.gradient} rounded-xl flex items-center justify-center text-white text-lg`}>
                          {urgencyConfig.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-bold text-[#00072D] group-hover:text-[#84eab3] transition-colors">
                              {product.name}
                            </h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${urgencyConfig.color} border`}>
                              {urgencyConfig.text}
                            </span>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-slate-600">
                            <span className="font-mono bg-white px-2 py-1 rounded border">{product.sku}</span>
                            <span className="bg-white px-2 py-1 rounded border">{product.category}</span>
                            <span className="flex items-center">
                              <span className="mr-1">🏢</span>
                              {product.supplier}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-emerald-700">{formatCurrency(product.cost)}</div>
                        <div className="text-xs text-slate-500">Order Cost</div>
                      </div>
                    </div>
                  </div>

                  {/* Stock Analysis */}
                  <div className="p-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-slate-800">{product.current_stock}</div>
                        <div className="text-xs text-slate-500">Current Stock</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{product.suggestedOrder}</div>
                        <div className="text-xs text-blue-600">Suggested Qty</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-slate-700">{product.min_stock}</div>
                        <div className="text-xs text-slate-500">Min Required</div>
                      </div>
                      <div className="text-center">
                        <div className={`text-2xl font-bold ${riskConfig.color}`}>
                          {product.daysUntilStockout}
                        </div>
                        <div className="text-xs text-slate-500">Days Buffer</div>
                      </div>
                    </div>

                    {/* Stock Level Visualization */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-xs text-slate-600 mb-2">
                        <span>Stock Level Analysis</span>
                        <span className={`px-2 py-1 rounded ${riskConfig.bg} ${riskConfig.color} text-xs font-semibold`}>
                          {riskConfig.text}
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-3">
                        <div 
                          className="h-3 rounded-full bg-gradient-to-r from-red-400 via-orange-400 to-emerald-400 transition-all duration-1000"
                          style={{ 
                            width: `${Math.min((product.current_stock / (product.min_stock * 2)) * 100, 100)}%` 
                          }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-slate-500 mt-1">
                        <span>0</span>
                        <span>Optimal: {product.min_stock * 2}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-2">
                      <button className="flex-1 bg-gradient-to-r from-[#84eab3] to-[#6dd4a1] text-[#00072D] px-4 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 hover:scale-105 group relative overflow-hidden">
                        <span className="relative z-10 flex items-center justify-center">
                          <span className="mr-2">📋</span>
                          Create Purchase Order
                        </span>
                        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-200"></div>
                      </button>
                      <button className="flex-1 border border-[#84eab3] text-[#84eab3] px-4 py-3 rounded-xl font-semibold hover:bg-[#84eab3]/10 transition-all duration-200 group relative overflow-hidden">
                        <span className="relative z-10 flex items-center justify-center">
                          <span className="mr-2">⏰</span>
                          Remind Later
                        </span>
                        <div className="absolute inset-0 bg-[#84eab3] opacity-0 group-hover:opacity-10 transition-opacity duration-200"></div>
                      </button>
                      <button className="px-4 py-3 border border-slate-300 text-slate-600 rounded-xl hover:bg-slate-50 transition-colors">
                        <span className="text-lg">📊</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">✅</span>
            </div>
            <h3 className="text-xl font-semibold text-emerald-700 mb-2">Optimal Inventory Levels</h3>
            <p className="text-slate-600 max-w-md mx-auto">
              All products are well-stocked and no immediate reordering is required.
            </p>
            <div className="mt-4 text-sm text-slate-500">
              Inventory health: <span className="font-semibold text-emerald-600">Excellent</span>
            </div>
          </div>
        )}

        {/* Bulk Actions Footer */}
        {suggestions.length > 0 && (
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0 pt-6 mt-6 border-t border-slate-200">
            <div className="text-sm text-slate-600">
              💡 <strong>Pro Tip:</strong> Consider bulk ordering to save on shipping costs
            </div>
            <div className="flex space-x-3">
              <button className="bg-[#00072D] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#00072D]/80 transition-colors flex items-center">
                📦 Bulk Order All
              </button>
              <button className="border border-[#84eab3] text-[#84eab3] px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#84eab3]/10 transition-colors flex items-center">
                📋 Export List
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReorderSuggestions;