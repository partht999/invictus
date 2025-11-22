// src/components/operations/OperationForm.jsx
import React from 'react';

const OperationForm = ({
  type, // 'receipt' or 'delivery'
  formData,
  onFormChange,
  products = [],
  loading = false,
  onSubmit,
  submitButtonText = 'Submit'
}) => {
  const selectedProduct = products.find(p => p.id === parseInt(formData.product_id));
  const currentStock = selectedProduct ? selectedProduct.quantity : 0;

  const getContactField = () => {
    if (type === 'receipt') {
      return (
        <div className="form-group">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Supplier Name *
          </label>
          <input
            type="text"
            name="contact_name"
            value={formData.contact_name || ''}
            onChange={(e) => onFormChange('contact_name', e.target.value)}
            placeholder="Enter supplier name"
            className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#84eab3] focus:border-transparent"
            required
          />
        </div>
      );
    } else {
      return (
        <div className="form-group">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Customer Name *
          </label>
          <input
            type="text"
            name="contact_name"
            value={formData.contact_name || ''}
            onChange={(e) => onFormChange('contact_name', e.target.value)}
            placeholder="Enter customer name"
            className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#84eab3] focus:border-transparent"
            required
          />
        </div>
      );
    }
  };

  const getStockInfo = () => {
    if (!formData.product_id) return null;

    return (
      <div className="mt-2 flex items-center gap-2 text-sm">
        <span className="text-slate-600">Available stock:</span>
        <span className={`font-medium ${
          currentStock > 10 
            ? 'text-emerald-600' 
            : currentStock > 0 
              ? 'text-yellow-600' 
              : 'text-red-600'
        }`}>
          {currentStock}
        </span>
        {currentStock <= 10 && currentStock > 0 && (
          <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded">Low Stock</span>
        )}
        {currentStock === 0 && (
          <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded">Out of Stock</span>
        )}
      </div>
    );
  };

  const getQuantityValidation = () => {
    if (type === 'delivery' && formData.product_id) {
      return { min: 1, max: currentStock };
    }
    return { min: 1 };
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {/* Contact Field (Supplier/Customer) */}
      {getContactField()}

      {/* Product Selection */}
      <div className="form-group">
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Product *
        </label>
        <select
          name="product_id"
          value={formData.product_id || ''}
          onChange={(e) => onFormChange('product_id', e.target.value)}
          className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#84eab3] focus:border-transparent"
          required
        >
          <option value="">Select a product</option>
          {products.map(product => (
            <option key={product.id} value={product.id}>
              {product.name} (SKU: {product.sku}) - Stock: {product.quantity}
            </option>
          ))}
        </select>
      </div>

      {/* Quantity Input */}
      <div className="form-group">
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Quantity *
        </label>
        <input
          type="number"
          name="quantity"
          value={formData.quantity || ''}
          onChange={(e) => onFormChange('quantity', e.target.value)}
          placeholder="Enter quantity"
          className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#84eab3] focus:border-transparent"
          required
          {...getQuantityValidation()}
        />
        {getStockInfo()}
      </div>

      {/* Notes (Optional) */}
      <div className="form-group">
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Notes (Optional)
        </label>
        <textarea
          name="notes"
          value={formData.notes || ''}
          onChange={(e) => onFormChange('notes', e.target.value)}
          placeholder="Add any additional notes..."
          rows="3"
          className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#84eab3] focus:border-transparent"
        />
      </div>

      {/* Submit Button */}
      <button 
        type="submit" 
        disabled={loading || (type === 'delivery' && currentStock === 0)}
        className="bg-[#00072D] text-white rounded-lg px-4 py-2 hover:bg-[#00072D]/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-full"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Processing...
          </span>
        ) : (
          submitButtonText
        )}
      </button>
    </form>
  );
};

export default OperationForm;