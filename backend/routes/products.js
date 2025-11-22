import express from 'express';
import db from '../database.js';

const router = express.Router();

// Get all products
router.get('/', (req, res) => {
  db.all('SELECT * FROM products ORDER BY created_at DESC', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Create product
router.post('/', (req, res) => {
  const { name, sku, category, current_stock, min_stock } = req.body;
  
  db.run(
    'INSERT INTO products (name, sku, category, current_stock, min_stock) VALUES (?, ?, ?, ?, ?)',
    [name, sku, category, current_stock || 0, min_stock || 5],
    function(err) {
      if (err) return res.status(400).json({ error: 'SKU already exists' });
      res.json({ 
        id: this.lastID, 
        message: 'Product created successfully' 
      });
    }
  );
});

// Update product stock
router.put('/:id/stock', (req, res) => {
  const { id } = req.params;
  const { current_stock } = req.body;
  
  db.run(
    'UPDATE products SET current_stock = ? WHERE id = ?',
    [current_stock, id],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Stock updated successfully' });
    }
  );
});

export default router;