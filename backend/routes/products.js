import express from 'express';
import db from '../database.js';
import authenticateToken from '../middleware/auth.js';
import { generateProductsCSV } from '../utils/csvGenerator.js';

const router = express.Router();

// Apply authentication to all product routes
router.use(authenticateToken);

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

// Get product by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  
  db.get('SELECT * FROM products WHERE id = ?', [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Product not found' });
    res.json(row);
  });
});

// Update product
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, sku, category, current_stock, min_stock } = req.body;
  
  // Check if product exists
  db.get('SELECT * FROM products WHERE id = ?', [id], (err, product) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!product) return res.status(404).json({ error: 'Product not found' });
    
    // Update product
    db.run(
      'UPDATE products SET name = ?, sku = ?, category = ?, current_stock = ?, min_stock = ? WHERE id = ?',
      [name || product.name, sku || product.sku, category || product.category, 
       current_stock !== undefined ? current_stock : product.current_stock,
       min_stock !== undefined ? min_stock : product.min_stock, id],
      function(err) {
        if (err) {
          if (err.message.includes('UNIQUE')) {
            return res.status(400).json({ error: 'SKU already exists' });
          }
          return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Product updated successfully', id: parseInt(id) });
      }
    );
  });
});

// Update product stock
router.put('/:id/stock', (req, res) => {
  const { id } = req.params;
  const { current_stock } = req.body;
  
  if (current_stock === undefined) {
    return res.status(400).json({ error: 'current_stock is required' });
  }
  
  db.run(
    'UPDATE products SET current_stock = ? WHERE id = ?',
    [current_stock, id],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0) return res.status(404).json({ error: 'Product not found' });
      res.json({ message: 'Stock updated successfully' });
    }
  );
});

// Delete product
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  
  // Check if product exists
  db.get('SELECT * FROM products WHERE id = ?', [id], (err, product) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!product) return res.status(404).json({ error: 'Product not found' });
    
    // Delete product
    db.run('DELETE FROM products WHERE id = ?', [id], function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Product deleted successfully' });
    });
  });
});

// Search products
router.get('/search/:query', (req, res) => {
  const { query } = req.params;
  const searchTerm = `%${query}%`;
  
  db.all(
    'SELECT * FROM products WHERE name LIKE ? OR sku LIKE ? OR category LIKE ? ORDER BY created_at DESC',
    [searchTerm, searchTerm, searchTerm],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    }
  );
});

// Get products by category
router.get('/category/:category', (req, res) => {
  const { category } = req.params;
  
  db.all(
    'SELECT * FROM products WHERE category = ? ORDER BY created_at DESC',
    [category],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    }
  );
});

// Get low stock products
router.get('/alerts/low-stock', (req, res) => {
  db.all(
    'SELECT * FROM products WHERE current_stock <= min_stock ORDER BY current_stock ASC',
    [],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    }
  );
});

// Export products as CSV
router.get('/export/csv', (req, res) => {
  db.all('SELECT * FROM products ORDER BY created_at DESC', [], (err, products) => {
    if (err) return res.status(500).json({ error: err.message });
    
    const csv = generateProductsCSV(products);
    
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="products-export.csv"');
    res.send(csv);
  });
});

export default router;