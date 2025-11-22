import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";
import ProductList from "./components/products/ProductList";
import ProductsPage from "./pages/ProductsPage";


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<ProductsPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App