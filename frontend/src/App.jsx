// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { InventoryProvider } from "./context/InventoryContext";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/dashboard/Dashboard";
import ProductsPage from "./pages/ProductsPage";
import ReceiptsPage from "./pages/ReceiptsPage";
import DeliveriesPage from "./pages/DeliveriesPage";
import AutoLogout from "./components/AutoLogout";

// ---- Protected Route Component ----
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/" replace />;
};

// ---- Public Route (redirect if logged in) ----
const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return !token ? children : <Navigate to="/dashboard" replace />;
};

function App() {
  return (
    <AuthProvider>
      <InventoryProvider>
        <AutoLogout />
        <Router>
          <div className="min-h-screen bg-gray-100">

            <Routes>

              {/* PUBLIC ROUTES */}
              <Route
                path="/"
                element={
                  <PublicRoute>
                    <Login />
                  </PublicRoute>
                }
              />
              <Route
                path="/register"
                element={
                  <PublicRoute>
                    <Register />
                  </PublicRoute>
                }
              />

            {/* PROTECTED ROUTES */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/products"
              element={
                <ProtectedRoute>
                  <ProductsPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/receipts"
              element={
                <ProtectedRoute>
                  <ReceiptsPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/deliveries"
              element={
                <ProtectedRoute>
                  <DeliveriesPage />
                </ProtectedRoute>
              }
            />

            {/* If no route matches → go to dashboard */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />

            </Routes>

          </div>
        </Router>
      </InventoryProvider>
    </AuthProvider>
  );
}

export default App;
