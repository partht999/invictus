// src/components/operations/Deliveries.jsx
import React, { useState } from 'react';
import OperationForm from './OperationForm';

const Deliveries = ({ products = [], onDeliveryCreated }) => {
  const [formData, setFormData] = useState({
    contact_name: '', // Changed from customer_name to contact_name
    product_id: '',
    quantity: '',
    notes: '' // New field
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Handle form field changes
  const handleFormChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      // Validate form
      if (!formData.contact_name || !formData.product_id || !formData.quantity) {
        setMessage('Please fill all fields');
        return;
      }

      const quantity = parseInt(formData.quantity);
      if (quantity <= 0) {
        setMessage('Quantity must be greater than 0');
        return;
      }

      // Check stock availability
      const selectedProduct = products.find(p => p.id === parseInt(formData.product_id));
      const currentStock = selectedProduct ? selectedProduct.quantity : 0;
      
      if (quantity > currentStock) {
        setMessage(`❌ Insufficient stock! Available: ${currentStock}`);
        return;
      }

      // 🎯 DEMO MODE: Simulate backend API
      console.log('DEMO: Would send to backend:', {
        customer_name: formData.contact_name, // Map to customer_name for backend
        product_id: parseInt(formData.product_id),
        quantity: quantity,
        notes: formData.notes
      });

      // Mock API response
      const result = {
        id: Date.now(),
        type: 'DELIVERY',
        customer_name: formData.contact_name, // Keep customer_name in response
        product_id: parseInt(formData.product_id),
        quantity: quantity,
        notes: formData.notes,
        timestamp: new Date().toISOString(),
        status: 'completed'
      };

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      setMessage('🚚 Delivery created successfully! (Demo Mode)');
      
      // Reset form
      setFormData({ 
        contact_name: '', 
        product_id: '', 
        quantity: '', 
        notes: '' 
      });
      
      // Notify parent component
      if (onDeliveryCreated) {
        onDeliveryCreated(result);
      }

    } catch (error) {
      setMessage('❌ Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <h3 className="text-xl font-semibold text-slate-900 mb-6 flex items-center gap-2">
        <span className="text-2xl">🚚</span>
        Deliver Stock
      </h3>
      
      {message && (
        <div className={`mb-4 p-3 rounded-lg ${
          message.includes('✅') || message.includes('🚚') 
            ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' 
            : 'bg-red-100 text-red-700 border border-red-200'
        }`}>
          {message}
        </div>
      )}

      {/* Use OperationForm component */}
      <OperationForm
        type="delivery"
        formData={formData}
        onFormChange={handleFormChange}
        products={products}
        loading={loading}
        onSubmit={handleSubmit}
        submitButtonText="🚚 Create Delivery"
      />

      {/* ✅ ADD DOWNLOAD BUTTON HERE */}
      <div className="mt-4 pt-4 border-t border-slate-200">
        <button
          onClick={() => console.log('Download delivery note functionality')}
          disabled={!formData.contact_name || !formData.product_id || !formData.quantity}
          className="w-full bg-[#84eab3] text-[#00072D] rounded-lg px-4 py-2 hover:bg-[#84eab3]/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center justify-center gap-2"
        >
          📄 Download Delivery Note
        </button>
        {!formData.contact_name || !formData.product_id || !formData.quantity ? (
          <p className="text-slate-500 text-sm mt-2 text-center">
            Fill the form above to enable download
          </p>
        ) : null}
      </div>

    </div>
  );
};

export default Deliveries;