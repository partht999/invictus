import express from 'express';
import db from '../database.js';
import authenticateToken from '../middleware/auth.js';
import { generateMovementsCSV } from '../utils/csvGenerator.js';

const router = express.Router();

// Apply authentication to all movement routes
router.use(authenticateToken);

// Get all movements (receipts and deliveries combined)
router.get('/', (req, res) => {
  const { type, startDate, endDate, limit } = req.query;
  
  let receiptsQuery = `
    SELECT 
      r.id,
      r.product_id,
      r.quantity,
      r.supplier_name as contact_name,
      r.notes,
      r.status,
      r.date as timestamp,
      'RECEIPT' as type,
      p.name as product_name,
      p.sku as product_sku
    FROM receipts r
    LEFT JOIN products p ON r.product_id = p.id
    WHERE 1=1
  `;
  
  let deliveriesQuery = `
    SELECT 
      d.id,
      d.product_id,
      d.quantity,
      d.customer_name as contact_name,
      d.notes,
      d.status,
      d.date as timestamp,
      'DELIVERY' as type,
      p.name as product_name,
      p.sku as product_sku
    FROM deliveries d
    LEFT JOIN products p ON d.product_id = p.id
    WHERE 1=1
  `;
  
  const params = [];
  
  // Apply filters
  if (type && type !== 'all') {
    if (type === 'RECEIPT') {
      receiptsQuery += ' AND 1=1';
      deliveriesQuery += ' AND 1=0'; // Exclude deliveries
    } else if (type === 'DELIVERY') {
      receiptsQuery += ' AND 1=0'; // Exclude receipts
      deliveriesQuery += ' AND 1=1';
    }
  }
  
  const receiptParams = [];
  const deliveryParams = [];
  
  if (startDate) {
    receiptsQuery += ' AND r.date >= ?';
    deliveriesQuery += ' AND d.date >= ?';
    receiptParams.push(startDate);
    deliveryParams.push(startDate);
  }
  
  if (endDate) {
    receiptsQuery += ' AND r.date <= ?';
    deliveriesQuery += ' AND d.date <= ?';
    receiptParams.push(endDate);
    deliveryParams.push(endDate);
  }
  
  // Combine queries
  const combinedQuery = `
    ${receiptsQuery}
    UNION ALL
    ${deliveriesQuery}
    ORDER BY timestamp DESC
    ${limit ? `LIMIT ${parseInt(limit)}` : ''}
  `;
  
  // Combine parameters for both queries
  const allParams = [...receiptParams, ...deliveryParams];
  
  db.all(combinedQuery, allParams, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Get recent movements (last N movements)
router.get('/recent', (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  
  const query = `
    SELECT 
      r.id,
      r.product_id,
      r.quantity,
      r.supplier_name as contact_name,
      r.notes,
      r.status,
      r.date as timestamp,
      'RECEIPT' as type,
      p.name as product_name,
      p.sku as product_sku
    FROM receipts r
    LEFT JOIN products p ON r.product_id = p.id
    UNION ALL
    SELECT 
      d.id,
      d.product_id,
      d.quantity,
      d.customer_name as contact_name,
      d.notes,
      d.status,
      d.date as timestamp,
      'DELIVERY' as type,
      p.name as product_name,
      p.sku as product_sku
    FROM deliveries d
    LEFT JOIN products p ON d.product_id = p.id
    ORDER BY timestamp DESC
    LIMIT ?
  `;
  
  db.all(query, [limit], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Get movements by product ID
router.get('/product/:productId', (req, res) => {
  const { productId } = req.params;
  
  const query = `
    SELECT 
      r.id,
      r.product_id,
      r.quantity,
      r.supplier_name as contact_name,
      r.notes,
      r.status,
      r.date as timestamp,
      'RECEIPT' as type,
      p.name as product_name,
      p.sku as product_sku
    FROM receipts r
    LEFT JOIN products p ON r.product_id = p.id
    WHERE r.product_id = ?
    UNION ALL
    SELECT 
      d.id,
      d.product_id,
      d.quantity,
      d.customer_name as contact_name,
      d.notes,
      d.status,
      d.date as timestamp,
      'DELIVERY' as type,
      p.name as product_name,
      p.sku as product_sku
    FROM deliveries d
    LEFT JOIN products p ON d.product_id = p.id
    WHERE d.product_id = ?
    ORDER BY timestamp DESC
  `;
  
  db.all(query, [productId, productId], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Get movement statistics
router.get('/stats', (req, res) => {
  const { startDate, endDate } = req.query;
  
  let dateFilter = '';
  const params = [];
  
  if (startDate && endDate) {
    dateFilter = 'WHERE date >= ? AND date <= ?';
    params.push(startDate, endDate);
  } else if (startDate) {
    dateFilter = 'WHERE date >= ?';
    params.push(startDate);
  } else if (endDate) {
    dateFilter = 'WHERE date <= ?';
    params.push(endDate);
  }
  
  // Get receipt stats
  const receiptStatsQuery = `
    SELECT 
      COUNT(*) as total_receipts,
      SUM(quantity) as total_received
    FROM receipts
    ${dateFilter}
  `;
  
  // Get delivery stats
  const deliveryStatsQuery = `
    SELECT 
      COUNT(*) as total_deliveries,
      SUM(quantity) as total_delivered
    FROM deliveries
    ${dateFilter}
  `;
  
  db.get(receiptStatsQuery, params, (err, receiptStats) => {
    if (err) return res.status(500).json({ error: err.message });
    
    db.get(deliveryStatsQuery, params, (err, deliveryStats) => {
      if (err) return res.status(500).json({ error: err.message });
      
      res.json({
        receipts: {
          total: receiptStats.total_receipts || 0,
          total_quantity: receiptStats.total_received || 0
        },
        deliveries: {
          total: deliveryStats.total_deliveries || 0,
          total_quantity: deliveryStats.total_delivered || 0
        },
        net_movement: (receiptStats.total_received || 0) - (deliveryStats.total_delivered || 0)
      });
    });
  });
});

// Export movements as CSV
router.get('/export/csv', (req, res) => {
  const { type, startDate, endDate } = req.query;
  
  let receiptsQuery = `
    SELECT 
      r.id,
      r.product_id,
      r.quantity,
      r.supplier_name as contact_name,
      r.notes,
      r.status,
      r.date as timestamp,
      'RECEIPT' as type,
      p.name as product_name,
      p.sku as product_sku
    FROM receipts r
    LEFT JOIN products p ON r.product_id = p.id
    WHERE 1=1
  `;
  
  let deliveriesQuery = `
    SELECT 
      d.id,
      d.product_id,
      d.quantity,
      d.customer_name as contact_name,
      d.notes,
      d.status,
      d.date as timestamp,
      'DELIVERY' as type,
      p.name as product_name,
      p.sku as product_sku
    FROM deliveries d
    LEFT JOIN products p ON d.product_id = p.id
    WHERE 1=1
  `;
  
  const receiptParams = [];
  const deliveryParams = [];
  
  // Apply filters
  if (type && type !== 'all') {
    if (type === 'RECEIPT') {
      receiptsQuery += ' AND 1=1';
      deliveriesQuery += ' AND 1=0';
    } else if (type === 'DELIVERY') {
      receiptsQuery += ' AND 1=0';
      deliveriesQuery += ' AND 1=1';
    }
  }
  
  if (startDate) {
    receiptsQuery += ' AND r.date >= ?';
    deliveriesQuery += ' AND d.date >= ?';
    receiptParams.push(startDate);
    deliveryParams.push(startDate);
  }
  
  if (endDate) {
    receiptsQuery += ' AND r.date <= ?';
    deliveriesQuery += ' AND d.date <= ?';
    receiptParams.push(endDate);
    deliveryParams.push(endDate);
  }
  
  const combinedQuery = `
    ${receiptsQuery}
    UNION ALL
    ${deliveriesQuery}
    ORDER BY timestamp DESC
  `;
  
  const allParams = [...receiptParams, ...deliveryParams];
  
  db.all(combinedQuery, allParams, (err, movements) => {
    if (err) return res.status(500).json({ error: err.message });
    
    const csv = generateMovementsCSV(movements);
    
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="movements-export.csv"');
    res.send(csv);
  });
});

export default router;

