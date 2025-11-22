import React, { useState } from 'react';

const ProductList = ({ products, onEdit, onDelete }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  
  // Mock data for design
  const mockProducts = [
    {
      id: 1,
      name: "Steel Rods",
      sku: "STEEL-001",
      category: "Raw Materials",
      current_stock: 100,
      min_stock: 10,
      value: 25000
    },
    {
      id: 2,
      name: "Plastic Sheets",
      sku: "PLASTIC-002",
      category: "Raw Materials",
      current_stock: 25,
      min_stock: 30,
      value: 15000
    },
    {
      id: 3,
      name: "Premium Office Chairs",
      sku: "CHAIR-001",
      category: "Furniture",
      current_stock: 15,
      min_stock: 5,
      value: 45000
    },
    {
      id: 4,
      name: "4K Computer Monitors",
      sku: "MONITOR-001",
      category: "Electronics",
      current_stock: 0,
      min_stock: 10,
      value: 120000
    },
    {
      id: 5,
      name: "Executive Wooden Desks",
      sku: "DESK-001",
      category: "Furniture",
      current_stock: 8,
      min_stock: 10,
      value: 75000
    }
  ];

  const displayProducts = products || mockProducts;

  // Calculate statistics
  const stats = {
    totalProducts: displayProducts.length,
    totalValue: displayProducts.reduce((sum, product) => sum + product.value, 0),
    lowStockItems: displayProducts.filter(p => p.current_stock <= p.min_stock && p.current_stock > 0).length,
    outOfStock: displayProducts.filter(p => p.current_stock === 0).length,
    healthyStock: displayProducts.filter(p => p.current_stock > p.min_stock).length
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
        <span className="mr-1">{icon}</span>
        {text}
      </span>
    );
  };

  const getStockLevelBar = (current, min) => {
    const percentage = Math.min((current / (min * 2)) * 100, 100);
    const status = getStockStatus(current, min);
    
    const colorClass = {
      'in-stock': 'bg-emerald-500',
      'low-stock': 'bg-yellow-500',
      'out-of-stock': 'bg-red-500'
    }[status];

    return (
      <div className="w-16 bg-slate-200 rounded-full h-2">
        <div 
          className={`h-2 rounded-full ${colorClass} transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    );
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return '↕️';
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
      {/* Enhanced Header with Stats */}
      <div className="bg-gradient-to-r from-[#00072D] to-[#1a237e] p-6 text-white">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">📦 Product Inventory</h1>
            <p className="text-blue-100 opacity-90">Real-time stock monitoring and management</p>
          </div>
          <div className="flex space-x-4 mt-4 lg:mt-0">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#84eab3]">{stats.totalProducts}</div>
              <div className="text-sm text-blue-200">Total Items</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-400">{stats.healthyStock}</div>
              <div className="text-sm text-blue-200">In Stock</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">{stats.lowStockItems}</div>
              <div className="text-sm text-blue-200">Low Stock</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Bar */}
      <div className="bg-slate-50 border-b border-slate-200 p-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="bg-white p-3 rounded-lg border border-slate-200">
            <div className="text-sm text-slate-600">Total Value</div>
            <div className="text-lg font-bold text-[#00072D]">{formatCurrency(stats.totalValue)}</div>
          </div>
          <div className="bg-white p-3 rounded-lg border border-slate-200">
            <div className="text-sm text-slate-600">Out of Stock</div>
            <div className="text-lg font-bold text-red-600">{stats.outOfStock} Items</div>
          </div>
          <div className="bg-white p-3 rounded-lg border border-slate-200">
            <div className="text-sm text-slate-600">Stock Health</div>
            <div className="text-lg font-bold text-emerald-600">
              {Math.round((stats.healthyStock / stats.totalProducts) * 100)}%
            </div>
          </div>
          <div className="bg-white p-3 rounded-lg border border-slate-200">
            <div className="text-sm text-slate-600">Alerts</div>
            <div className="text-lg font-bold text-yellow-600">{stats.lowStockItems + stats.outOfStock}</div>
          </div>
        </div>
      </div>

      {/* Enhanced Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-gradient-to-r from-[#84eab3]/10 to-[#84eab3]/5">
            <tr>
              {[
                { key: 'name', label: 'Product Details' },
                { key: 'sku', label: 'SKU Code' },
                { key: 'category', label: 'Category' },
                { key: 'current_stock', label: 'Stock Level' },
                { key: 'value', label: 'Value' },
                { key: 'status', label: 'Status' },
                { key: 'actions', label: 'Actions' }
              ].map(({ key, label }) => (
                <th 
                  key={key}
                  className="px-6 py-4 text-left text-xs font-semibold text-[#00072D] uppercase tracking-wider cursor-pointer hover:bg-[#84eab3]/20 transition-colors"
                  onClick={() => key !== 'actions' && handleSort(key)}
                >
                  <div className="flex items-center space-x-1">
                    <span>{label}</span>
                    {key !== 'actions' && (
                      <span className="text-xs">{getSortIcon(key)}</span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-100">
            {displayProducts.map((product, index) => (
              <tr 
                key={product.id} 
                className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-slate-50 transition-all duration-200 border-b border-slate-100"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Product Details */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#84eab3] to-[#00072D] rounded-lg flex items-center justify-center text-white font-bold text-sm">
                      {product.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-[#00072D]">
                        {product.name}
                      </div>
                      <div className="text-xs text-slate-500">
                        Last updated: Today
                      </div>
                    </div>
                  </div>
                </td>

                {/* SKU */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-mono bg-slate-100 text-slate-700 px-2 py-1 rounded border border-slate-200">
                    {product.sku}
                  </div>
                </td>

                {/* Category */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                    🏷️ {product.category}
                  </span>
                </td>

                {/* Stock Level with Visual Bar */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-3">
                    {getStockLevelBar(product.current_stock, product.min_stock)}
                    <div className="text-right">
                      <div className="text-sm font-bold text-[#00072D]">
                        {product.current_stock}
                      </div>
                      <div className="text-xs text-slate-500">
                        min: {product.min_stock}
                      </div>
                    </div>
                  </div>
                </td>

                {/* Value */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-semibold text-emerald-700">
                    {formatCurrency(product.value)}
                  </div>
                </td>

                {/* Status Badge */}
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStockBadge(product.current_stock, product.min_stock)}
                </td>

                {/* Enhanced Actions */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onEdit && onEdit(product)}
                      className="inline-flex items-center px-3 py-1.5 bg-[#84eab3] text-[#00072D] rounded-lg text-sm font-medium hover:bg-[#84eab3]/80 transition-colors shadow-sm"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => onDelete && onDelete(product.id)}
                      className="inline-flex items-center px-3 py-1.5 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors shadow-sm"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* Enhanced Empty State */}
        {displayProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">📦</span>
            </div>
            <div className="text-xl font-semibold text-slate-600 mb-2">No products found</div>
            <div className="text-slate-500 max-w-md mx-auto">
              Get started by adding your first product to manage your inventory efficiently.
            </div>
            <button className="mt-4 bg-[#00072D] text-white px-6 py-2 rounded-lg hover:bg-[#00072D]/80 transition-colors">
              + Add First Product
            </button>
          </div>
        )}
      </div>

      {/* Footer with Summary */}
      <div className="bg-slate-50 border-t border-slate-200 px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-slate-600">
          <div>
            Showing <span className="font-semibold">{displayProducts.length}</span> products
          </div>
          <div className="flex items-center space-x-4 mt-2 sm:mt-0">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-emerald-500 rounded"></div>
              <span>In Stock</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-yellow-500 rounded"></div>
              <span>Low Stock</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-red-500 rounded"></div>
              <span>Out of Stock</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;