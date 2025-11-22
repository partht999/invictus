import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";
import ProductList from "./components/products/ProductList";
import ReceiptsPage from "./pages/ReceiptsPage";
import DeliveriesPage from "./pages/DeliveriesPage";
import { InventoryProvider } from './context/InventoryContext';

function App() {
  return (
    <InventoryProvider>
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/receipts" element={<ReceiptsPage />} />
          <Route path="/deliveries" element={<DeliveriesPage />} />
        </Routes>
      </div>
    </Router>
    </InventoryProvider>
  )
}

export default App