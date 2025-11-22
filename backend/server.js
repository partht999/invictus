import express from 'express';
import cors from 'cors';
import db from './database.js';
import authenticateToken from './middleware/auth.js';
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import receiptRoutes from './routes/receipts.js';
import deliveryRoutes from './routes/deliveries.js';
import movementRoutes from './routes/movements.js';
import { generateInventoryReportPDF } from './utils/pdfGenerator.js';
import { generateProductsCSV } from './utils/csvGenerator.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Inventory Management API is running' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/receipts', receiptRoutes);
app.use('/api/deliveries', deliveryRoutes);
app.use('/api/movements', movementRoutes);

// Dashboard stats (protected)
app.get('/api/dashboard/stats', authenticateToken, (req, res) => {
  const stats = {};
  
  // Total products
  db.get('SELECT COUNT(*) as total FROM products', (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    stats.totalProducts = row.total;
    
    // Low stock items
    db.get('SELECT COUNT(*) as lowStock FROM products WHERE current_stock <= min_stock', (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      stats.lowStockItems = row.lowStock;
      
      // Out of stock items
      db.get('SELECT COUNT(*) as outOfStock FROM products WHERE current_stock = 0', (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        stats.outOfStockItems = row.outOfStock;
        
        // Total stock value
        db.get('SELECT SUM(current_stock) as totalStock FROM products', (err, row) => {
          if (err) return res.status(500).json({ error: err.message });
          stats.totalStock = row.totalStock || 0;
          
          // Total receipts count
          db.get('SELECT COUNT(*) as total FROM receipts', (err, row) => {
            if (err) return res.status(500).json({ error: err.message });
            stats.totalReceipts = row.total;
            
            // Total deliveries count
            db.get('SELECT COUNT(*) as total FROM deliveries', (err, row) => {
              if (err) return res.status(500).json({ error: err.message });
              stats.totalDeliveries = row.total;
              
              // Recent receipts (last 7 days)
              db.get(`
                SELECT COUNT(*) as total, SUM(quantity) as quantity 
                FROM receipts 
                WHERE date >= datetime('now', '-7 days')
              `, (err, row) => {
                if (err) return res.status(500).json({ error: err.message });
                stats.recentReceipts = {
                  count: row.total || 0,
                  quantity: row.quantity || 0
                };
                
                // Recent deliveries (last 7 days)
                db.get(`
                  SELECT COUNT(*) as total, SUM(quantity) as quantity 
                  FROM deliveries 
                  WHERE date >= datetime('now', '-7 days')
                `, (err, row) => {
                  if (err) return res.status(500).json({ error: err.message });
                  stats.recentDeliveries = {
                    count: row.total || 0,
                    quantity: row.quantity || 0
                  };
                  
                  res.json(stats);
                });
              });
            });
          });
        });
      });
    });
  });
});

// Export Dashboard Report as PDF
app.get('/api/dashboard/export/pdf', authenticateToken, (req, res) => {
  // Get all stats and products
  const stats = {};
  let products = [];
  
  // Get stats
  db.get('SELECT COUNT(*) as total FROM products', (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    stats.totalProducts = row.total;
    
    db.get('SELECT COUNT(*) as lowStock FROM products WHERE current_stock <= min_stock', (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      stats.lowStockItems = row.lowStock;
      
      db.get('SELECT COUNT(*) as outOfStock FROM products WHERE current_stock = 0', (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        stats.outOfStockItems = row.outOfStock;
        
        db.get('SELECT SUM(current_stock) as totalStock FROM products', (err, row) => {
          if (err) return res.status(500).json({ error: err.message });
          stats.totalStock = row.totalStock || 0;
          
          db.get('SELECT COUNT(*) as total FROM receipts', (err, row) => {
            if (err) return res.status(500).json({ error: err.message });
            stats.totalReceipts = row.total;
            
            db.get('SELECT COUNT(*) as total FROM deliveries', (err, row) => {
              if (err) return res.status(500).json({ error: err.message });
              stats.totalDeliveries = row.total;
              
              // Get all products
              db.all('SELECT * FROM products ORDER BY created_at DESC', [], (err, rows) => {
                if (err) return res.status(500).json({ error: err.message });
                products = rows;
                
                generateInventoryReportPDF(
                  { stats, products },
                  (pdfBuffer, error) => {
                    if (error) {
                      return res.status(500).json({ error: 'Failed to generate PDF' });
                    }
                    
                    res.setHeader('Content-Type', 'application/pdf');
                    res.setHeader('Content-Disposition', 'attachment; filename="inventory-report.pdf"');
                    res.send(pdfBuffer);
                  }
                );
              });
            });
          });
        });
      });
    });
  });
});

// Export Dashboard Data as CSV
app.get('/api/dashboard/export/csv', authenticateToken, (req, res) => {
  db.all('SELECT * FROM products ORDER BY created_at DESC', [], (err, products) => {
    if (err) return res.status(500).json({ error: err.message });
    
    const csv = generateProductsCSV(products);
    
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="inventory-export.csv"');
    res.send(csv);
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error', message: err.message });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log('📊 Inventory Management System Backend Ready!');
  console.log('📄 PDF generation enabled');
  console.log('📊 CSV export enabled');
});