// src/pages/ReceiptsPage.jsx
import React from 'react';
import { useInventory } from '../context/InventoryContext'; // ✅ ADD THIS
import Receipts from '../components/operations/Receipts';
import MovementHistory from '../components/operations/MovementHistory';

const ReceiptsPage = () => {
  // ✅ REPLACE LOCAL STATE WITH CONTEXT
  const { products, movements, addReceipt } = useInventory();

  const handleReceiptCreated = (receiptData) => {
    console.log('New receipt created:', receiptData);
    
    // ✅ USE CONTEXT FUNCTION INSTEAD OF LOCAL STATE
    addReceipt(receiptData);
    
    alert(`✅ Received ${receiptData.quantity} units from ${receiptData.supplier_name || receiptData.contact_name}`);
  };

  const handleFilterChange = (filters) => {
    console.log('Filters changed:', filters);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold text-[#00072D]">Stock Receipts</h1>
              <p className="text-slate-600">Record incoming stock from suppliers</p>
            </div>
            <div className="bg-[#84eab3] text-[#00072D] px-3 py-1 rounded-full text-sm font-medium">
              Demo Mode
            </div>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-700 text-sm">
              🚀 <strong>Frontend Demo:</strong> All forms are fully functional. 
              Backend integration ready when needed.
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#00072D]">Stock Receipts</h1>
            <p className="text-slate-600">Record incoming stock from suppliers</p>
          </div>
          <a 
            href="/deliveries"
            className="bg-[#84eab3] text-[#00072D] rounded-lg px-6 py-3 hover:bg-[#84eab3]/80 transition-colors font-medium flex items-center gap-2"
          >
            🚚 Go to Deliveries
          </a>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Receipts Form - Left Side */}
          <div>
            <Receipts 
              products={products} 
              onReceiptCreated={handleReceiptCreated}
            />
          </div>

          {/* Movement History - Right Side */}
          <div>
            <MovementHistory 
              movements={movements} // ✅ NOW SHOWS ALL MOVEMENTS (IN & OUT)
              onFilterChange={handleFilterChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceiptsPage;