// src/components/operations/MovementHistory.jsx
import React, { useState } from 'react';

const MovementHistory = ({ movements = [], onFilterChange }) => {
  const [filters, setFilters] = useState({
    type: 'all',
    dateRange: 'today'
  });

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };

  // Filter movements based on current filters
  const filteredMovements = movements.filter(movement => {
    if (filters.type !== 'all' && movement.type !== filters.type) {
      return false;
    }
    
    // Simple date filtering (you can enhance this)
    const movementDate = new Date(movement.timestamp);
    const today = new Date();
    
    switch (filters.dateRange) {
      case 'today':
        return movementDate.toDateString() === today.toDateString();
      case 'week':
        const weekAgo = new Date(today.setDate(today.getDate() - 7));
        return movementDate >= weekAgo;
      case 'month':
        const monthAgo = new Date(today.setMonth(today.getMonth() - 1));
        return movementDate >= monthAgo;
      default:
        return true;
    }
  });

  const getTypeBadge = (type) => {
    const styles = {
      RECEIPT: 'bg-emerald-100 text-emerald-700',
      DELIVERY: 'bg-blue-100 text-blue-700',
      ADJUSTMENT: 'bg-orange-100 text-orange-700',
      TRANSFER: 'bg-purple-100 text-purple-700'
    };
    
    const labels = {
      RECEIPT: 'Stock In',
      DELIVERY: 'Stock Out',
      ADJUSTMENT: 'Adjustment',
      TRANSFER: 'Transfer'
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[type] || 'bg-gray-100 text-gray-700'}`}>
        {labels[type] || type}
      </span>
    );
  };

  const getQuantityDisplay = (movement) => {
    const isPositive = movement.type === 'RECEIPT';
    return (
      <span className={`font-semibold ${isPositive ? 'text-emerald-600' : 'text-red-600'}`}>
        {isPositive ? '+' : '-'}{movement.quantity}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200">
      {/* Header */}
      <div className="p-6 border-b border-slate-200">
        {/* ✅ UPDATED HEADER WITH DOWNLOAD BUTTON */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h3 className="text-xl font-semibold text-slate-900 flex items-center gap-2">
            <span>📋</span>
            Movement History
          </h3>
          
          {/* ✅ ADD DOWNLOAD BUTTON HERE */}
          <button
            onClick={() => console.log('Export CSV functionality')}
            disabled={movements.length === 0}
            className="bg-[#84eab3] text-[#00072D] rounded-lg px-4 py-2 hover:bg-[#84eab3]/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center gap-2 text-sm"
          >
            📊 Export CSV
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mt-4">
          <select
            value={filters.type}
            onChange={(e) => handleFilterChange('type', e.target.value)}
            className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#84eab3] focus:border-transparent"
          >
            <option value="all">All Types</option>
            <option value="RECEIPT">Stock In</option>
            <option value="DELIVERY">Stock Out</option>
          </select>
          
          <select
            value={filters.dateRange}
            onChange={(e) => handleFilterChange('dateRange', e.target.value)}
            className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#84eab3] focus:border-transparent"
          >
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="all">All Time</option>
          </select>
        </div>
      </div>

      {/* Movements List */}
      <div className="p-6">
        {filteredMovements.length > 0 ? (
          <div className="space-y-4">
            {filteredMovements.map((movement) => (
              <div
                key={movement.id}
                className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-start gap-4 flex-1">
                  {/* Icon */}
                  <div className={`p-2 rounded-lg ${
                    movement.type === 'RECEIPT' 
                      ? 'bg-emerald-100 text-emerald-600' 
                      : 'bg-blue-100 text-blue-600'
                  }`}>
                    {movement.type === 'RECEIPT' ? '📦' : '🚚'}
                  </div>
                  
                  {/* Details */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {getTypeBadge(movement.type)}
                      <span className="text-sm text-slate-500">
                        {new Date(movement.timestamp).toLocaleDateString()} at{' '}
                        {new Date(movement.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                    
                    <p className="font-medium text-slate-900">
                      {getQuantityDisplay(movement)} units of Product #{movement.product_id}
                    </p>
                    
                    <p className="text-sm text-slate-600">
                      {movement.type === 'RECEIPT' ? 'From: ' : 'To: '}
                      <span className="font-medium">{movement.contact_name}</span>
                    </p>
                    
                    {movement.notes && (
                      <p className="text-sm text-slate-500 mt-1">📝 {movement.notes}</p>
                    )}
                  </div>
                </div>
                
                {/* Status */}
                <div className="text-right">
                  <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">
                    Completed
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-12">
            <div className="text-slate-300 text-6xl mb-4">📋</div>
            <h4 className="text-lg font-medium text-slate-900 mb-2">No movements found</h4>
            <p className="text-slate-500 max-w-sm mx-auto">
              {movements.length === 0 
                ? "No inventory movements recorded yet. Create your first receipt or delivery!"
                : "No movements match your current filters. Try adjusting your search criteria."
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovementHistory;