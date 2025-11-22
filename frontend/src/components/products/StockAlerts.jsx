import React, { useState } from 'react';

const StockAlerts = () => {
  const [expandedAlert, setExpandedAlert] = useState(null);
  
  // Enhanced mock data with additional fields
  const lowStockProducts = [
    {
      id: 2,
      name: "Plastic Sheets",
      sku: "PLASTIC-002",
      current_stock: 25,
      min_stock: 30,
      category: "Raw Materials",
      supplier: "Plastic Co",
      location: "Warehouse B",
      value: 15000,
      lastOrderDate: "2024-01-15",
      leadTime: 7,
      priority: "high"
    },
    {
      id: 4,
      name: "4K Computer Monitors",
      sku: "MONITOR-001",
      current_stock: 0,
      min_stock: 10,
      category: "Electronics",
      supplier: "Tech Supplies",
      location: "Storage Room 1",
      value: 120000,
      lastOrderDate: "2024-01-10",
      leadTime: 14,
      priority: "critical"
    },
    {
      id: 5,
      name: "Executive Wooden Desks",
      sku: "DESK-001",
      current_stock: 8,
      min_stock: 10,
      category: "Furniture",
      supplier: "Office Solutions",
      location: "Main Floor",
      value: 75000,
      lastOrderDate: "2024-01-18",
      leadTime: 10,
      priority: "medium"
    },
    {
      id: 6,
      name: "Ergonomic Keyboards",
      sku: "KEYBOARD-001",
      current_stock: 12,
      min_stock: 15,
      category: "Electronics",
      supplier: "Tech Gear Inc",
      location: "Storage Room 2",
      value: 45000,
      lastOrderDate: "2024-01-20",
      leadTime: 5,
      priority: "low"
    }
  ];

  const getAlertLevel = (current, min, priority) => {
    if (current === 0) return 'critical';
    if (current <= min) return 'warning';
    if (current <= min * 1.2) return 'info';
    return 'healthy';
  };

  const getAlertConfig = (level) => {
    const config = {
      critical: {
        icon: '🔴',
        gradient: 'from-red-500 to-red-600',
        bg: 'bg-red-50',
        border: 'border-red-200',
        text: 'text-red-800',
        badge: 'bg-red-100 text-red-700 border-red-200',
        title: 'Critical Alert'
      },
      warning: {
        icon: '🟡',
        gradient: 'from-yellow-500 to-yellow-600',
        bg: 'bg-yellow-50',
        border: 'border-yellow-200',
        text: 'text-yellow-800',
        badge: 'bg-yellow-100 text-yellow-700 border-yellow-200',
        title: 'Warning'
      },
      info: {
        icon: '🔵',
        gradient: 'from-blue-500 to-blue-600',
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        text: 'text-blue-800',
        badge: 'bg-blue-100 text-blue-700 border-blue-200',
        title: 'Notice'
      },
      healthy: {
        icon: '🟢',
        gradient: 'from-emerald-500 to-emerald-600',
        bg: 'bg-emerald-50',
        border: 'border-emerald-200',
        text: 'text-emerald-800',
        badge: 'bg-emerald-100 text-emerald-700 border-emerald-200',
        title: 'Healthy'
      }
    };
    return config[level] || config.info;
  };

  const getAlertMessage = (product) => {
    const level = getAlertLevel(product.current_stock, product.min_stock, product.priority);
    
    if (level === 'critical') {
      return `URGENT: ${product.name} is out of stock! Immediate action required.`;
    } else if (level === 'warning') {
      return `LOW STOCK: ${product.name} has ${product.current_stock} units remaining.`;
    } else if (level === 'info') {
      return `MONITOR: ${product.name} stock is below optimal levels.`;
    }
    
    return `${product.name} stock levels are adequate.`;
  };

  const getStockUrgency = (current, min) => {
    const buffer = current - min;
    if (buffer <= 0) return { days: 0, text: 'Immediate', color: 'text-red-600' };
    if (buffer <= 5) return { days: 1, text: 'Today', color: 'text-red-600' };
    if (buffer <= 10) return { days: 3, text: '3 Days', color: 'text-yellow-600' };
    if (buffer <= 20) return { days: 7, text: '1 Week', color: 'text-blue-600' };
    return { days: 14, text: '2 Weeks', color: 'text-emerald-600' };
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const calculateRiskScore = (product) => {
    let score = 0;
    if (product.current_stock === 0) score += 100;
    else if (product.current_stock <= product.min_stock) score += 80;
    else if (product.current_stock <= product.min_stock * 1.2) score += 40;
    
    if (product.priority === 'critical') score += 50;
    if (product.priority === 'high') score += 30;
    
    if (product.leadTime > 10) score += 20;
    
    return Math.min(score, 100);
  };

  const totalInventoryValue = lowStockProducts.reduce((sum, product) => sum + product.value, 0);
  const criticalAlerts = lowStockProducts.filter(p => getAlertLevel(p.current_stock, p.min_stock) === 'critical').length;
  const warningAlerts = lowStockProducts.filter(p => getAlertLevel(p.current_stock, p.min_stock) === 'warning').length;

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-[#00072D] to-[#1a237e] p-6 text-white">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-[#84eab3] rounded-xl flex items-center justify-center text-[#00072D] font-bold text-lg">
              ⚡
            </div>
            <div>
              <h2 className="text-2xl font-bold">Stock Alerts & Monitoring</h2>
              <p className="text-blue-100 opacity-90">Real-time inventory risk assessment</p>
            </div>
          </div>
          <div className="flex space-x-4 mt-4 lg:mt-0">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-400">{criticalAlerts}</div>
              <div className="text-sm text-blue-200">Critical</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">{warningAlerts}</div>
              <div className="text-sm text-blue-200">Warnings</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{lowStockProducts.length}</div>
              <div className="text-sm text-blue-200">Total</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Bar */}
      <div className="bg-slate-50 border-b border-slate-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
          <div className="bg-white p-3 rounded-xl border border-slate-200">
            <div className="text-sm text-slate-600">At Risk Value</div>
            <div className="text-lg font-bold text-red-600">{formatCurrency(totalInventoryValue)}</div>
          </div>
          <div className="bg-white p-3 rounded-xl border border-slate-200">
            <div className="text-sm text-slate-600">Avg. Lead Time</div>
            <div className="text-lg font-bold text-slate-700">
              {Math.round(lowStockProducts.reduce((sum, p) => sum + p.leadTime, 0) / lowStockProducts.length)} days
            </div>
          </div>
          <div className="bg-white p-3 rounded-xl border border-slate-200">
            <div className="text-sm text-slate-600">Restock Urgency</div>
            <div className="text-lg font-bold text-yellow-600">High</div>
          </div>
          <div className="bg-white p-3 rounded-xl border border-slate-200">
            <div className="text-sm text-slate-600">Action Required</div>
            <div className="text-lg font-bold text-red-600">{criticalAlerts + warningAlerts} Items</div>
          </div>
        </div>
      </div>

      {/* Alerts Container */}
      <div className="p-6">
        <div className="space-y-4">
          {lowStockProducts.map((product, index) => {
            const alertLevel = getAlertLevel(product.current_stock, product.min_stock, product.priority);
            const config = getAlertConfig(alertLevel);
            const urgency = getStockUrgency(product.current_stock, product.min_stock);
            const riskScore = calculateRiskScore(product);
            const isExpanded = expandedAlert === product.id;

            return (
              <div
                key={product.id}
                className={`border rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg ${
                  isExpanded ? 'ring-2 ring-[#84eab3]' : ''
                } ${config.border} ${config.bg}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Alert Header */}
                <div 
                  className="p-4 cursor-pointer"
                  onClick={() => setExpandedAlert(isExpanded ? null : product.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${config.gradient} flex items-center justify-center text-white text-lg`}>
                        {config.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className={`text-sm font-semibold ${config.text}`}>
                            {config.title}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.badge}`}>
                            {urgency.text}
                          </span>
                          <span className="text-xs text-slate-500">
                            Risk: {riskScore}%
                          </span>
                        </div>
                        <p className="text-sm font-medium text-[#00072D]">
                          {getAlertMessage(product)}
                        </p>
                        <div className="flex items-center space-x-4 mt-2 text-xs text-slate-600">
                          <span className="font-mono bg-white px-2 py-1 rounded border">{product.sku}</span>
                          <span className="bg-white px-2 py-1 rounded border">{product.category}</span>
                          <span className={`font-semibold ${config.text}`}>
                            Stock: {product.current_stock}/{product.min_stock}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-[#00072D] mb-1">
                        {formatCurrency(product.value)}
                      </div>
                      <button className="text-slate-400 hover:text-[#84eab3] transition-colors">
                        {isExpanded ? '▲' : '▼'}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="border-t border-slate-200 bg-white p-4 animate-slideDown">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      <div>
                        <h4 className="text-sm font-semibold text-slate-700 mb-2">Supplier Info</h4>
                        <div className="space-y-1 text-sm text-slate-600">
                          <div>🏢 {product.supplier}</div>
                          <div>📍 {product.location}</div>
                          <div>⏱️ Lead: {product.leadTime} days</div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-semibold text-slate-700 mb-2">Stock Analysis</h4>
                        <div className="space-y-1 text-sm text-slate-600">
                          <div>📊 Buffer: {product.current_stock - product.min_stock} units</div>
                          <div>🎯 Optimal: {product.min_stock * 2} units</div>
                          <div>📅 Last Order: {product.lastOrderDate}</div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-semibold text-slate-700 mb-2">Risk Assessment</h4>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span>Risk Level:</span>
                            <span className={`font-semibold ${config.text}`}>
                              {riskScore >= 80 ? 'High' : riskScore >= 60 ? 'Medium' : 'Low'}
                            </span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full bg-gradient-to-r ${config.gradient}`}
                              style={{ width: `${riskScore}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-semibold text-slate-700 mb-2">Quick Actions</h4>
                        <div className="space-y-2">
                          <button className="w-full bg-[#84eab3] text-[#00072D] px-3 py-2 rounded-lg text-sm font-semibold hover:bg-[#84eab3]/80 transition-colors">
                            📞 Contact Supplier
                          </button>
                          <button className="w-full border border-[#84eab3] text-[#84eab3] px-3 py-2 rounded-lg text-sm font-semibold hover:bg-[#84eab3]/10 transition-colors">
                            📝 Create PO
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {lowStockProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">✅</span>
            </div>
            <h3 className="text-xl font-semibold text-emerald-700 mb-2">All Systems Optimal</h3>
            <p className="text-slate-600 max-w-md mx-auto">
              Great job! All your products are well-stocked and no immediate actions are required.
            </p>
            <div className="mt-4 text-sm text-slate-500">
              Inventory health: <span className="font-semibold text-emerald-600">Excellent</span>
            </div>
          </div>
        )}

        {/* Footer Actions */}
        {lowStockProducts.length > 0 && (
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0 pt-6 mt-6 border-t border-slate-200">
            <div className="text-sm text-slate-600">
              💡 <strong>Pro Tip:</strong> Consider bulk ordering for items with high risk scores
            </div>
            <div className="flex space-x-3">
              <button className="bg-[#00072D] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#00072D]/80 transition-colors">
                📋 Generate Report
              </button>
              <button className="border border-[#84eab3] text-[#84eab3] px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#84eab3]/10 transition-colors">
                🚀 Bulk Actions
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StockAlerts;