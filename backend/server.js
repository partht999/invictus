import express from 'express';
import cors from 'cors';
import db from './database.js';
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// Dashboard stats
app.get('/api/dashboard/stats', (req, res) => {
  const stats = {};
  
  // Total products
  db.get('SELECT COUNT(*) as total FROM products', (err, row) => {
    stats.totalProducts = row.total;
    
    // Low stock items
    db.get('SELECT COUNT(*) as lowStock FROM products WHERE current_stock <= min_stock', (err, row) => {
      stats.lowStockItems = row.lowStock;
      
      // Total stock value
      db.get('SELECT SUM(current_stock) as totalStock FROM products', (err, row) => {
        stats.totalStock = row.totalStock || 0;
        res.json(stats);
      });
    });
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log('📊 Inventory Management System Backend Ready!');
});