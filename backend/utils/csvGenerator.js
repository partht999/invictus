/**
 * Convert array of objects to CSV string
 */
export const arrayToCSV = (data, headers = null) => {
  if (!data || data.length === 0) {
    return '';
  }
  
  // Get headers from first object if not provided
  const csvHeaders = headers || Object.keys(data[0]);
  
  // Create header row
  const headerRow = csvHeaders.map(header => `"${String(header).replace(/"/g, '""')}"`).join(',');
  
  // Create data rows
  const dataRows = data.map(row => {
    return csvHeaders.map(header => {
      const value = row[header] !== undefined && row[header] !== null 
        ? String(row[header]).replace(/"/g, '""')
        : '';
      return `"${value}"`;
    }).join(',');
  });
  
  return [headerRow, ...dataRows].join('\n');
};

/**
 * Generate CSV for Products
 */
export const generateProductsCSV = (products) => {
  const headers = ['id', 'name', 'sku', 'category', 'current_stock', 'min_stock', 'created_at'];
  return arrayToCSV(products, headers);
};

/**
 * Generate CSV for Movements (Receipts + Deliveries)
 */
export const generateMovementsCSV = (movements) => {
  const headers = ['id', 'type', 'product_id', 'product_name', 'product_sku', 'quantity', 
                   'contact_name', 'notes', 'status', 'timestamp'];
  return arrayToCSV(movements, headers);
};

/**
 * Generate CSV for Receipts
 */
export const generateReceiptsCSV = (receipts) => {
  const headers = ['id', 'supplier_name', 'product_id', 'product_name', 'product_sku', 
                   'quantity', 'notes', 'status', 'date'];
  return arrayToCSV(receipts, headers);
};

/**
 * Generate CSV for Deliveries
 */
export const generateDeliveriesCSV = (deliveries) => {
  const headers = ['id', 'customer_name', 'product_id', 'product_name', 'product_sku', 
                   'quantity', 'notes', 'status', 'date'];
  return arrayToCSV(deliveries, headers);
};

