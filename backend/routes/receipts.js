import express from 'express';
import db from '../database.js';
import authenticateToken from '../middleware/auth.js';
import { generateReceiptPDF } from '../utils/pdfGenerator.js';
import { generateReceiptsCSV } from '../utils/csvGenerator.js';

const router = express.Router();

// Apply authentication to all receipt routes
router.use(authenticateToken);

// Get all receipts
router.get('/', (req, res) => {
  const query = `
    SELECT 
      r.*,
      p.name as product_name,
      p.sku as product_sku
    FROM receipts r
    LEFT JOIN products p ON r.product_id = p.id
    ORDER BY r.date DESC
  `;
  
  db.all(query, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Get receipt by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  
  const query = `
    SELECT 
      r.*,
      p.name as product_name,
      p.sku as product_sku
    FROM receipts r
    LEFT JOIN products p ON r.product_id = p.id
    WHERE r.id = ?
  `;
  
  db.get(query, [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Receipt not found' });
    res.json(row);
  });
});

// Create receipt (Stock In)
router.post('/', (req, res) => {
  const { supplier_name, product_id, quantity, notes, status } = req.body;
  
  // Validate input
  if (!supplier_name || !product_id || !quantity) {
    return res.status(400).json({ error: 'supplier_name, product_id, and quantity are required' });
  }
  
  if (quantity <= 0) {
    return res.status(400).json({ error: 'Quantity must be greater than 0' });
  }
  
  // Check if product exists
  db.get('SELECT * FROM products WHERE id = ?', [product_id], (err, product) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!product) return res.status(404).json({ error: 'Product not found' });
    
    // Create receipt
    db.run(
      'INSERT INTO receipts (supplier_name, product_id, quantity, notes, status) VALUES (?, ?, ?, ?, ?)',
      [supplier_name, product_id, quantity, notes || null, status || 'completed'],
      function(err) {
        if (err) return res.status(500).json({ error: err.message });
        
        const receiptId = this.lastID;
        
        // Update product stock
        const newStock = product.current_stock + quantity;
        db.run(
          'UPDATE products SET current_stock = ? WHERE id = ?',
          [newStock, product_id],
          (err) => {
            if (err) {
              // Rollback receipt if stock update fails
              db.run('DELETE FROM receipts WHERE id = ?', [receiptId]);
              return res.status(500).json({ error: 'Failed to update product stock' });
            }
            
            // Return receipt with product info
            db.get(
              'SELECT r.*, p.name as product_name, p.sku as product_sku FROM receipts r LEFT JOIN products p ON r.product_id = p.id WHERE r.id = ?',
              [receiptId],
              (err, receipt) => {
                if (err) return res.status(500).json({ error: err.message });
                res.status(201).json({
                  message: 'Receipt created successfully',
                  receipt
                });
              }
            );
          }
        );
      }
    );
  });
});

// Update receipt
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { supplier_name, quantity, notes, status } = req.body;
  
  // Get existing receipt
  db.get('SELECT * FROM receipts WHERE id = ?', [id], (err, receipt) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!receipt) return res.status(404).json({ error: 'Receipt not found' });
    
    // Get product
    db.get('SELECT * FROM products WHERE id = ?', [receipt.product_id], (err, product) => {
      if (err) return res.status(500).json({ error: err.message });
      
      // Calculate stock adjustment
      const quantityDiff = quantity ? quantity - receipt.quantity : 0;
      const newStock = product.current_stock + quantityDiff;
      
      if (newStock < 0) {
        return res.status(400).json({ error: 'Cannot update: insufficient stock' });
      }
      
      // Update receipt
      db.run(
        'UPDATE receipts SET supplier_name = ?, quantity = ?, notes = ?, status = ? WHERE id = ?',
        [
          supplier_name || receipt.supplier_name,
          quantity || receipt.quantity,
          notes !== undefined ? notes : receipt.notes,
          status || receipt.status,
          id
        ],
        function(err) {
          if (err) return res.status(500).json({ error: err.message });
          
          // Update product stock if quantity changed
          if (quantity && quantityDiff !== 0) {
            db.run(
              'UPDATE products SET current_stock = ? WHERE id = ?',
              [newStock, receipt.product_id],
              (err) => {
                if (err) return res.status(500).json({ error: 'Failed to update product stock' });
              }
            );
          }
          
          res.json({ message: 'Receipt updated successfully' });
        }
      );
    });
  });
});

// Delete receipt
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  
  // Get receipt to restore stock
  db.get('SELECT * FROM receipts WHERE id = ?', [id], (err, receipt) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!receipt) return res.status(404).json({ error: 'Receipt not found' });
    
    // Get product
    db.get('SELECT * FROM products WHERE id = ?', [receipt.product_id], (err, product) => {
      if (err) return res.status(500).json({ error: err.message });
      
      // Calculate new stock (subtract the receipt quantity)
      const newStock = product.current_stock - receipt.quantity;
      
      if (newStock < 0) {
        return res.status(400).json({ error: 'Cannot delete: would result in negative stock' });
      }
      
      // Delete receipt
      db.run('DELETE FROM receipts WHERE id = ?', [id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        
        // Restore product stock
        db.run(
          'UPDATE products SET current_stock = ? WHERE id = ?',
          [newStock, receipt.product_id],
          (err) => {
            if (err) return res.status(500).json({ error: 'Failed to update product stock' });
            res.json({ message: 'Receipt deleted successfully' });
          }
        );
      });
    });
  });
});

// Download Receipt PDF
router.get('/:id/pdf', (req, res) => {
  const { id } = req.params;
  
  const query = `
    SELECT 
      r.*,
      p.name as product_name,
      p.sku as product_sku,
      p.category as product_category,
      p.current_stock
    FROM receipts r
    LEFT JOIN products p ON r.product_id = p.id
    WHERE r.id = ?
  `;
  
  db.get(query, [id], (err, receipt) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!receipt) return res.status(404).json({ error: 'Receipt not found' });
    
    const product = {
      name: receipt.product_name,
      sku: receipt.product_sku,
      category: receipt.product_category,
      current_stock: receipt.current_stock
    };
    
    generateReceiptPDF(receipt, product, (pdfBuffer, error) => {
      if (error) {
        return res.status(500).json({ error: 'Failed to generate PDF' });
      }
      
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="receipt-${id}.pdf"`);
      res.send(pdfBuffer);
    });
  });
});

// Export all receipts as CSV
router.get('/export/csv', (req, res) => {
  const query = `
    SELECT 
      r.*,
      p.name as product_name,
      p.sku as product_sku
    FROM receipts r
    LEFT JOIN products p ON r.product_id = p.id
    ORDER BY r.date DESC
  `;
  
  db.all(query, [], (err, receipts) => {
    if (err) return res.status(500).json({ error: err.message });
    
    const csv = generateReceiptsCSV(receipts);
    
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="receipts-export.csv"');
    res.send(csv);
  });
});

export default router;

