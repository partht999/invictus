import express from 'express';
import db from '../database.js';
import authenticateToken from '../middleware/auth.js';
import { generateDeliveryPDF } from '../utils/pdfGenerator.js';
import { generateDeliveriesCSV } from '../utils/csvGenerator.js';

const router = express.Router();

// Apply authentication to all delivery routes
router.use(authenticateToken);

// Get all deliveries
router.get('/', (req, res) => {
  const query = `
    SELECT 
      d.*,
      p.name as product_name,
      p.sku as product_sku
    FROM deliveries d
    LEFT JOIN products p ON d.product_id = p.id
    ORDER BY d.date DESC
  `;
  
  db.all(query, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Get delivery by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  
  const query = `
    SELECT 
      d.*,
      p.name as product_name,
      p.sku as product_sku
    FROM deliveries d
    LEFT JOIN products p ON d.product_id = p.id
    WHERE d.id = ?
  `;
  
  db.get(query, [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Delivery not found' });
    res.json(row);
  });
});

// Create delivery (Stock Out)
router.post('/', (req, res) => {
  const { customer_name, product_id, quantity, notes, status } = req.body;
  
  // Validate input
  if (!customer_name || !product_id || !quantity) {
    return res.status(400).json({ error: 'customer_name, product_id, and quantity are required' });
  }
  
  if (quantity <= 0) {
    return res.status(400).json({ error: 'Quantity must be greater than 0' });
  }
  
  // Check if product exists and has sufficient stock
  db.get('SELECT * FROM products WHERE id = ?', [product_id], (err, product) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!product) return res.status(404).json({ error: 'Product not found' });
    
    if (product.current_stock < quantity) {
      return res.status(400).json({ 
        error: 'Insufficient stock', 
        available: product.current_stock,
        requested: quantity
      });
    }
    
    // Create delivery
    db.run(
      'INSERT INTO deliveries (customer_name, product_id, quantity, notes, status) VALUES (?, ?, ?, ?, ?)',
      [customer_name, product_id, quantity, notes || null, status || 'completed'],
      function(err) {
        if (err) return res.status(500).json({ error: err.message });
        
        const deliveryId = this.lastID;
        
        // Update product stock
        const newStock = product.current_stock - quantity;
        db.run(
          'UPDATE products SET current_stock = ? WHERE id = ?',
          [newStock, product_id],
          (err) => {
            if (err) {
              // Rollback delivery if stock update fails
              db.run('DELETE FROM deliveries WHERE id = ?', [deliveryId]);
              return res.status(500).json({ error: 'Failed to update product stock' });
            }
            
            // Return delivery with product info
            db.get(
              'SELECT d.*, p.name as product_name, p.sku as product_sku FROM deliveries d LEFT JOIN products p ON d.product_id = p.id WHERE d.id = ?',
              [deliveryId],
              (err, delivery) => {
                if (err) return res.status(500).json({ error: err.message });
                res.status(201).json({
                  message: 'Delivery created successfully',
                  delivery
                });
              }
            );
          }
        );
      }
    );
  });
});

// Update delivery
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { customer_name, quantity, notes, status } = req.body;
  
  // Get existing delivery
  db.get('SELECT * FROM deliveries WHERE id = ?', [id], (err, delivery) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!delivery) return res.status(404).json({ error: 'Delivery not found' });
    
    // Get product
    db.get('SELECT * FROM products WHERE id = ?', [delivery.product_id], (err, product) => {
      if (err) return res.status(500).json({ error: err.message });
      
      // Calculate stock adjustment
      const quantityDiff = quantity ? quantity - delivery.quantity : 0;
      const newStock = product.current_stock - quantityDiff; // Subtract because it's a delivery
      
      if (newStock < 0) {
        return res.status(400).json({ error: 'Cannot update: insufficient stock' });
      }
      
      // Update delivery
      db.run(
        'UPDATE deliveries SET customer_name = ?, quantity = ?, notes = ?, status = ? WHERE id = ?',
        [
          customer_name || delivery.customer_name,
          quantity || delivery.quantity,
          notes !== undefined ? notes : delivery.notes,
          status || delivery.status,
          id
        ],
        function(err) {
          if (err) return res.status(500).json({ error: err.message });
          
          // Update product stock if quantity changed
          if (quantity && quantityDiff !== 0) {
            db.run(
              'UPDATE products SET current_stock = ? WHERE id = ?',
              [newStock, delivery.product_id],
              (err) => {
                if (err) return res.status(500).json({ error: 'Failed to update product stock' });
              }
            );
          }
          
          res.json({ message: 'Delivery updated successfully' });
        }
      );
    });
  });
});

// Delete delivery
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  
  // Get delivery to restore stock
  db.get('SELECT * FROM deliveries WHERE id = ?', [id], (err, delivery) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!delivery) return res.status(404).json({ error: 'Delivery not found' });
    
    // Get product
    db.get('SELECT * FROM products WHERE id = ?', [delivery.product_id], (err, product) => {
      if (err) return res.status(500).json({ error: err.message });
      
      // Restore product stock (add back the delivered quantity)
      const newStock = product.current_stock + delivery.quantity;
      
      // Delete delivery
      db.run('DELETE FROM deliveries WHERE id = ?', [id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        
        // Restore product stock
        db.run(
          'UPDATE products SET current_stock = ? WHERE id = ?',
          [newStock, delivery.product_id],
          (err) => {
            if (err) return res.status(500).json({ error: 'Failed to update product stock' });
            res.json({ message: 'Delivery deleted successfully' });
          }
        );
      });
    });
  });
});

// Download Delivery Note PDF
router.get('/:id/pdf', (req, res) => {
  const { id } = req.params;
  
  const query = `
    SELECT 
      d.*,
      p.name as product_name,
      p.sku as product_sku,
      p.category as product_category,
      p.current_stock
    FROM deliveries d
    LEFT JOIN products p ON d.product_id = p.id
    WHERE d.id = ?
  `;
  
  db.get(query, [id], (err, delivery) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!delivery) return res.status(404).json({ error: 'Delivery not found' });
    
    const product = {
      name: delivery.product_name,
      sku: delivery.product_sku,
      category: delivery.product_category,
      current_stock: delivery.current_stock
    };
    
    generateDeliveryPDF(delivery, product, (pdfBuffer, error) => {
      if (error) {
        return res.status(500).json({ error: 'Failed to generate PDF' });
      }
      
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="delivery-${id}.pdf"`);
      res.send(pdfBuffer);
    });
  });
});

// Export all deliveries as CSV
router.get('/export/csv', (req, res) => {
  const query = `
    SELECT 
      d.*,
      p.name as product_name,
      p.sku as product_sku
    FROM deliveries d
    LEFT JOIN products p ON d.product_id = p.id
    ORDER BY d.date DESC
  `;
  
  db.all(query, [], (err, deliveries) => {
    if (err) return res.status(500).json({ error: err.message });
    
    const csv = generateDeliveriesCSV(deliveries);
    
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="deliveries-export.csv"');
    res.send(csv);
  });
});

export default router;

