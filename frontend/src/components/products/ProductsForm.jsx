import React, { useState, useEffect } from 'react';

const ProductForm = ({ product, onSubmit, onCancel, isOpen = false, onClose }) => {
  const isEditing = !!product;
  
  const [formData, setFormData] = useState({
    name: product?.name || '',
    sku: product?.sku || '',
    category: product?.category || 'Raw Materials',
    current_stock: product?.current_stock || 0,
    min_stock: product?.min_stock || 5,
    supplier: product?.supplier || '',
    location: product?.location || 'Warehouse A',
    value: product?.value || 0
  });

  const [errors, setErrors] = useState({});
  const [isExpanded, setIsExpanded] = useState(isOpen);

  const categories = [
    'Raw Materials',
    'Finished Goods',
    'Electronics',
    'Furniture',
    'Office Supplies',
    'Packaging',
    'Tools & Equipment',
    'Safety Gear'
  ];

  const locations = [
    'Warehouse A',
    'Warehouse B',
    'Storage Room 1',
    'Storage Room 2',
    'Main Floor',
    'Production Area'
  ];

  useEffect(() => {
    if (isOpen) {
      setIsExpanded(true);
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name.includes('stock') || name === 'value' ? parseInt(value) || 0 : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    }
    
    if (!formData.sku.trim()) {
      newErrors.sku = 'SKU is required';
    }

    if (formData.sku.length < 3) {
      newErrors.sku = 'SKU must be at least 3 characters';
    }
    
    if (formData.current_stock < 0) {
      newErrors.current_stock = 'Stock cannot be negative';
    }
    
    if (formData.min_stock < 1) {
      newErrors.min_stock = 'Minimum stock must be at least 1';
    }

    if (formData.value < 0) {
      newErrors.value = 'Value cannot be negative';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    if (onSubmit) {
      onSubmit(formData);
    }
    
    if (!isEditing) {
      // Reset form for new products
      setFormData({
        name: '',
        sku: '',
        category: 'Raw Materials',
        current_stock: 0,
        min_stock: 5,
        supplier: '',
        location: 'Warehouse A',
        value: 0
      });
    }
    
    // Collapse form after submission
    setIsExpanded(false);
    if (onClose) onClose();
  };

  const handleReset = () => {
    setFormData({
      name: '',
      sku: '',
      category: 'Raw Materials',
      current_stock: 0,
      min_stock: 5,
      supplier: '',
      location: 'Warehouse A',
      value: 0
    });
    setErrors({});
  };

  const handleCancel = () => {
    setIsExpanded(false);
    if (onCancel) onCancel();
    if (onClose) onClose();
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  const getStockStatusPreview = () => {
    if (formData.current_stock === 0) {
      return { status: 'Out of Stock', color: 'text-red-600', bg: 'bg-red-100' };
    }
    if (formData.current_stock <= formData.min_stock) {
      return { status: 'Low Stock', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    }
    return { status: 'In Stock', color: 'text-emerald-600', bg: 'bg-emerald-100' };
  };

  const stockPreview = getStockStatusPreview();

  if (!isExpanded) {
    return (
      <div className="bg-gradient-to-r from-[#84eab3]/10 to-[#84eab3]/5 border border-[#84eab3]/20 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300 cursor-pointer group"
           onClick={() => setIsExpanded(true)}>
        <div className="flex items-center justify-center space-x-3">
          <div className="w-12 h-12 bg-[#84eab3] rounded-xl flex items-center justify-center text-white text-xl font-bold group-hover:scale-110 transition-transform duration-300">
            +
          </div>
          <div className="text-left">
            <h3 className="text-lg font-bold text-[#00072D]">Add New Product</h3>
            <p className="text-slate-600 text-sm">Click to expand and add product details</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden animate-slideDown">
      {/* Form Header */}
      <div className="bg-gradient-to-r from-[#00072D] to-[#1a237e] p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-[#84eab3] rounded-lg flex items-center justify-center text-[#00072D] font-bold">
              {isEditing ? '✏️' : '➕'}
            </div>
            <div>
              <h2 className="text-xl font-bold">
                {isEditing ? 'Edit Product' : 'Add New Product'}
              </h2>
              <p className="text-blue-100 text-sm opacity-90">
                {isEditing ? 'Update product information' : 'Create a new inventory item'}
              </p>
            </div>
          </div>
          <button
            onClick={handleCancel}
            className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors duration-200"
          >
            ×
          </button>
        </div>
      </div>

      {/* Quick Preview */}
      <div className="bg-slate-50 border-b border-slate-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className={`px-3 py-1 rounded-full text-sm font-semibold ${stockPreview.bg} ${stockPreview.color}`}>
              {stockPreview.status}
            </div>
            {formData.name && (
              <div className="text-sm text-slate-600">
                Preview: <span className="font-semibold text-[#00072D]">{formData.name}</span>
              </div>
            )}
          </div>
          {formData.value > 0 && (
            <div className="text-sm font-semibold text-emerald-700">
              {formatCurrency(formData.value)}
            </div>
          )}
        </div>
      </div>

      {/* Form Content */}
      <form onSubmit={handleSubmit} className="p-6">
        <div className="space-y-6">
          {/* Basic Information Section */}
          <div>
            <h3 className="text-lg font-semibold text-[#00072D] mb-4 flex items-center">
              <span className="w-2 h-2 bg-[#84eab3] rounded-full mr-2"></span>
              Basic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Product Name */}
              <div>
                <label className="block text-sm font-semibold text-[#00072D] mb-2">
                  Product Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={`w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#84eab3] focus:border-transparent transition-all duration-200 ${
                    errors.name ? 'border-red-500 bg-red-50' : 'hover:border-slate-400'
                  }`}
                  placeholder="e.g., Steel Rods, Office Chair"
                />
                {errors.name && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <span className="mr-1">⚠️</span>
                    {errors.name}
                  </p>
                )}
              </div>

              {/* SKU */}
              <div>
                <label className="block text-sm font-semibold text-[#00072D] mb-2">
                  SKU Code *
                </label>
                <input
                  type="text"
                  name="sku"
                  value={formData.sku}
                  onChange={handleChange}
                  required
                  className={`w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#84eab3] focus:border-transparent transition-all duration-200 ${
                    errors.sku ? 'border-red-500 bg-red-50' : 'hover:border-slate-400'
                  }`}
                  placeholder="e.g., STEEL-001, CHAIR-2024"
                />
                {errors.sku && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <span className="mr-1">⚠️</span>
                    {errors.sku}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Category and Location Section */}
          <div>
            <h3 className="text-lg font-semibold text-[#00072D] mb-4 flex items-center">
              <span className="w-2 h-2 bg-[#84eab3] rounded-full mr-2"></span>
              Classification
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Category */}
              <div>
                <label className="block text-sm font-semibold text-[#00072D] mb-2">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#84eab3] focus:border-transparent hover:border-slate-400 transition-all duration-200"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-semibold text-[#00072D] mb-2">
                  Storage Location
                </label>
                <select
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#84eab3] focus:border-transparent hover:border-slate-400 transition-all duration-200"
                >
                  {locations.map(loc => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>

              {/* Supplier */}
              <div>
                <label className="block text-sm font-semibold text-[#00072D] mb-2">
                  Supplier
                </label>
                <input
                  type="text"
                  name="supplier"
                  value={formData.supplier}
                  onChange={handleChange}
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#84eab3] focus:border-transparent hover:border-slate-400 transition-all duration-200"
                  placeholder="Supplier name"
                />
              </div>
            </div>
          </div>

          {/* Stock and Value Section */}
          <div>
            <h3 className="text-lg font-semibold text-[#00072D] mb-4 flex items-center">
              <span className="w-2 h-2 bg-[#84eab3] rounded-full mr-2"></span>
              Inventory Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Current Stock */}
              <div>
                <label className="block text-sm font-semibold text-[#00072D] mb-2">
                  Current Stock *
                </label>
                <input
                  type="number"
                  name="current_stock"
                  value={formData.current_stock}
                  onChange={handleChange}
                  min="0"
                  required
                  className={`w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#84eab3] focus:border-transparent transition-all duration-200 ${
                    errors.current_stock ? 'border-red-500 bg-red-50' : 'hover:border-slate-400'
                  }`}
                />
                {errors.current_stock && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <span className="mr-1">⚠️</span>
                    {errors.current_stock}
                  </p>
                )}
              </div>

              {/* Minimum Stock */}
              <div>
                <label className="block text-sm font-semibold text-[#00072D] mb-2">
                  Min Stock *
                </label>
                <input
                  type="number"
                  name="min_stock"
                  value={formData.min_stock}
                  onChange={handleChange}
                  min="1"
                  required
                  className={`w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#84eab3] focus:border-transparent transition-all duration-200 ${
                    errors.min_stock ? 'border-red-500 bg-red-50' : 'hover:border-slate-400'
                  }`}
                />
                {errors.min_stock && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <span className="mr-1">⚠️</span>
                    {errors.min_stock}
                  </p>
                )}
              </div>

              {/* Unit Value */}
              <div>
                <label className="block text-sm font-semibold text-[#00072D] mb-2">
                  Unit Value (₹)
                </label>
                <input
                  type="number"
                  name="value"
                  value={formData.value}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  className={`w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#84eab3] focus:border-transparent transition-all duration-200 ${
                    errors.value ? 'border-red-500 bg-red-50' : 'hover:border-slate-400'
                  }`}
                />
                {errors.value && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <span className="mr-1">⚠️</span>
                    {errors.value}
                  </p>
                )}
              </div>

              {/* Total Value Preview */}
              <div>
                <label className="block text-sm font-semibold text-[#00072D] mb-2">
                  Total Value
                </label>
                <div className="w-full border border-slate-200 bg-slate-50 rounded-xl px-4 py-3 text-sm font-semibold text-emerald-700">
                  {formatCurrency(formData.value * formData.current_stock)}
                </div>
              </div>
            </div>
          </div>

          {/* Product Variants Section */}
          <div>
            <h3 className="text-lg font-semibold text-[#00072D] mb-4 flex items-center">
              <span className="w-2 h-2 bg-[#84eab3] rounded-full mr-2"></span>
              Product Variants (Optional)
            </h3>
            
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-slate-700">Manage Variants</span>
                <button
                  type="button"
                  className="text-[#84eab3] hover:text-[#00072D] text-sm font-semibold flex items-center"
                >
                  + Add Size/Color Variant
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <label className="block text-sm text-slate-600 mb-1">Size Variants</label>
                  <div className="space-y-1">
                    {['Small', 'Medium', 'Large'].map(size => (
                      <label key={size} className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded border-slate-300 text-[#84eab3] focus:ring-[#84eab3]" />
                        <span>{size}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm text-slate-600 mb-1">Color Options</label>
                  <div className="space-y-1">
                    {['Red', 'Blue', 'Black', 'White'].map(color => (
                      <label key={color} className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded border-slate-300 text-[#84eab3] focus:ring-[#84eab3]" />
                        <span>{color}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm text-slate-600 mb-1">Material Types</label>
                  <div className="space-y-1">
                    {['Wood', 'Metal', 'Plastic', 'Glass'].map(material => (
                      <label key={material} className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded border-slate-300 text-[#84eab3] focus:ring-[#84eab3]" />
                        <span>{material}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 pt-6 mt-6 border-t border-slate-200">
          <div className="flex space-x-3">
            {!isEditing && (
              <button
                type="button"
                onClick={handleReset}
                className="border border-slate-300 text-slate-700 px-6 py-3 rounded-xl hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 transition-all duration-200 font-semibold"
              >
                🗑️ Clear All
              </button>
            )}
            <button
              type="button"
              onClick={handleCancel}
              className="border border-[#84eab3] text-[#84eab3] px-6 py-3 rounded-xl hover:bg-[#84eab3]/10 focus:outline-none focus:ring-2 focus:ring-[#84eab3] transition-all duration-200 font-semibold"
            >
              ← Back to List
            </button>
          </div>
          <button
            type="submit"
            className="bg-gradient-to-r from-[#00072D] to-[#1a237e] text-white px-8 py-3 rounded-xl hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#00072D] transition-all duration-200 font-semibold hover:scale-105"
          >
            {isEditing ? '🔄 Update Product' : '🚀 Add Product'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;