import React, { useState } from 'react';
import ProductList from '../components/products/ProductList';
import ProductForm from '../components/products/ProductsForm';
import ProductCard from '../components/products/ProductCard';
import StockAlerts from '../components/products/StockAlerts';
import ProductAnalytics from '../components/products/ProductAnalytics';
import ReorderSuggestions from '../components/products/ReorderSuggestions';

const ProductsPage = () => {
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'card'
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [editingProduct, setEditingProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Mock data
  const mockProducts = [
    {
      id: 1,
      name: "Steel Rods",
      sku: "STEEL-001",
      category: "Raw Materials",
      current_stock: 100,
      min_stock: 10,
      value: 25000,
      supplier: "Metal Works Inc",
      location: "Warehouse A"
    },
    {
      id: 2,
      name: "Plastic Sheets",
      sku: "PLASTIC-002",
      category: "Raw Materials",
      current_stock: 25,
      min_stock: 30,
      value: 15000,
      supplier: "Plastic Co",
      location: "Warehouse B"
    },
    {
      id: 3,
      name: "Premium Office Chairs",
      sku: "CHAIR-001",
      category: "Furniture",
      current_stock: 15,
      min_stock: 5,
      value: 45000,
      supplier: "Furniture World",
      location: "Main Floor"
    },
    {
      id: 4,
      name: "4K Computer Monitors",
      sku: "MONITOR-001",
      category: "Electronics",
      current_stock: 0,
      min_stock: 10,
      value: 120000,
      supplier: "Tech Supplies",
      location: "Storage Room 1"
    },
    {
      id: 5,
      name: "Executive Wooden Desks",
      sku: "DESK-001",
      category: "Furniture",
      current_stock: 8,
      min_stock: 10,
      value: 75000,
      supplier: "Office Solutions",
      location: "Main Floor"
    }
  ];

  const categories = ['all', 'Raw Materials', 'Finished Goods', 'Electronics', 'Furniture', 'Office Supplies'];

  // Filter products based on search and category
  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleAddProduct = (productData) => {
    alert('Product would be added: ' + JSON.stringify(productData, null, 2));
    setShowForm(false);
    setEditingProduct(null);
  };

  const handleEditProduct = (productData) => {
    alert('Product would be updated: ' + JSON.stringify(productData, null, 2));
    setShowForm(false);
    setEditingProduct(null);
  };

  const handleDeleteProduct = (productId) => {
    if (confirm('Are you sure you want to delete this product?')) {
      alert(`Product ${productId} would be deleted`);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  const handleAddNewClick = () => {
    setShowForm(true);
    setEditingProduct(null);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#00072D]">Product Management</h1>
          <p className="text-slate-600 mt-2">
            Manage your inventory products, track stock levels, and receive alerts
          </p>
        </div>

        {/* Stock Alerts */}
        <div className="mb-8">
          <StockAlerts />
        </div>

        {/* New Premium Features */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <ProductAnalytics products={filteredProducts} />
          <ReorderSuggestions products={filteredProducts} />
        </div>

        {/* Controls Bar */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Left Side - Search and Filters */}
            <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
              {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full sm:w-64 border border-slate-300 rounded-xl px-4 py-3 pl-10 focus:ring-2 focus:ring-[#84eab3] focus:border-transparent hover:border-slate-400 transition-colors duration-200"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-slate-400">🔍</span>
                </div>
              </div>

              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#84eab3] focus:border-transparent hover:border-slate-400 transition-colors duration-200"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>

            {/* Right Side - View Toggle and Add Button */}
            <div className="flex items-center space-x-4">
              {/* View Toggle */}
              <div className="flex bg-slate-100 rounded-xl p-1">
                <button
                  onClick={() => setViewMode('table')}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    viewMode === 'table' 
                      ? 'bg-white text-[#00072D] shadow-sm' 
                      : 'text-slate-600 hover:text-[#00072D]'
                  }`}
                >
                  📊 Table
                </button>
                <button
                  onClick={() => setViewMode('card')}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    viewMode === 'card' 
                      ? 'bg-white text-[#00072D] shadow-sm' 
                      : 'text-slate-600 hover:text-[#00072D]'
                  }`}
                >
                  🎴 Cards
                </button>
              </div>

              {/* Add Product Button */}
              <button
                onClick={handleAddNewClick}
                className="bg-gradient-to-r from-[#00072D] to-[#1a237e] text-white px-6 py-3 rounded-xl hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#00072D] transition-all duration-200 font-semibold hover:scale-105 flex items-center space-x-2"
              >
                <span>+</span>
                <span>Add Product</span>
              </button>
            </div>
          </div>
        </div>

        {/* MAIN CONTENT AREA - Sequential Layout */}
        <div className="space-y-6">
          {/* Product Inventory - Always visible at top */}
          <div>
            {viewMode === 'table' ? (
              <ProductList
                products={filteredProducts}
                onEdit={handleEdit}
                onDelete={handleDeleteProduct}
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onEdit={handleEdit}
                    onDelete={handleDeleteProduct}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Product Form - Appears BELOW when active */}
          {(showForm || editingProduct) && (
            <div className="animate-slideDown">
              <ProductForm
                product={editingProduct}
                onSubmit={editingProduct ? handleEditProduct : handleAddProduct}
                onCancel={handleCancelForm}
                onClose={handleCancelForm}
                isOpen={true}
              />
            </div>
          )}

          {/* Empty State when no products match filters AND no form is open */}
          {filteredProducts.length === 0 && !showForm && !editingProduct && (
            <div className="text-center py-16 bg-white rounded-2xl shadow-lg border border-slate-100">
              <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📦</span>
              </div>
              <div className="text-xl font-semibold text-slate-600 mb-2">No products found</div>
              <div className="text-slate-500 max-w-md mx-auto mb-6">
                {searchTerm || selectedCategory !== 'all' 
                  ? 'Try adjusting your search or filters to find what you\'re looking for.'
                  : 'Get started by adding your first product to manage your inventory efficiently.'
                }
              </div>
              {(searchTerm || selectedCategory !== 'all') ? (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                  }}
                  className="bg-[#84eab3] text-[#00072D] px-6 py-3 rounded-xl hover:bg-[#84eab3]/80 transition-colors font-semibold"
                >
                  Clear Filters
                </button>
              ) : (
                <button
                  onClick={handleAddNewClick}
                  className="bg-gradient-to-r from-[#00072D] to-[#1a237e] text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-200 font-semibold"
                >
                  + Add Your First Product
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Add CSS for slideDown animation */}
      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ProductsPage;