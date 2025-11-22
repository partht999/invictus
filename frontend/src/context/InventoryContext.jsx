// src/context/InventoryContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const InventoryContext = createContext();

export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error('useInventory must be used within an InventoryProvider');
  }
  return context;
};

export const InventoryProvider = ({ children }) => {
  // Load from localStorage on initial load
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('inventory-products');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'Steel Rods', sku: 'STEEL-001', quantity: 150 },
      { id: 2, name: 'Plastic Sheets', sku: 'PLAST-002', quantity: 75 },
      { id: 3, name: 'Aluminum Bars', sku: 'ALUM-003', quantity: 200 },
      { id: 4, name: 'Copper Wires', sku: 'COPP-004', quantity: 5 },
    ];
  });

  const [movements, setMovements] = useState(() => {
    const saved = localStorage.getItem('inventory-movements');
    return saved ? JSON.parse(saved) : [];
  });

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('inventory-products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('inventory-movements', JSON.stringify(movements));
  }, [movements]);

  const addReceipt = (receiptData) => {
    const newMovement = {
      id: Date.now(),
      type: 'RECEIPT',
      contact_name: receiptData.supplier_name || receiptData.contact_name,
      product_id: receiptData.product_id,
      quantity: receiptData.quantity,
      notes: receiptData.notes,
      timestamp: receiptData.timestamp || new Date().toISOString()
    };

    // Update product quantity
    setProducts(prev => prev.map(product => 
      product.id === receiptData.product_id 
        ? { ...product, quantity: product.quantity + receiptData.quantity }
        : product
    ));

    // Add to movements
    setMovements(prev => [newMovement, ...prev]);

    return newMovement;
  };

  const addDelivery = (deliveryData) => {
    const newMovement = {
      id: Date.now(),
      type: 'DELIVERY',
      contact_name: deliveryData.customer_name || deliveryData.contact_name,
      product_id: deliveryData.product_id,
      quantity: deliveryData.quantity,
      notes: deliveryData.notes,
      timestamp: deliveryData.timestamp || new Date().toISOString()
    };

    // Update product quantity
    setProducts(prev => prev.map(product => 
      product.id === deliveryData.product_id 
        ? { ...product, quantity: product.quantity - deliveryData.quantity }
        : product
    ));

    // Add to movements
    setMovements(prev => [newMovement, ...prev]);

    return newMovement;
  };

  const value = {
    products,
    movements,
    addReceipt,
    addDelivery,
    refreshProducts: () => {
      const saved = localStorage.getItem('inventory-products');
      if (saved) setProducts(JSON.parse(saved));
    }
  };

  return (
    <InventoryContext.Provider value={value}>
      {children}
    </InventoryContext.Provider>
  );
};