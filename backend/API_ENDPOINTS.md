# Inventory Management Backend API Documentation

## Base URL
`http://localhost:5000/api`

## Authentication
Most endpoints require authentication. Include the JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

---

## Auth Endpoints

### Register User
- **POST** `/auth/register`
- **Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "password123",
    "name": "John Doe"
  }
  ```

### Login
- **POST** `/auth/login`
- **Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response:** Returns JWT token and user info

### Verify Token
- **GET** `/auth/verify`
- **Headers:** Authorization required
- **Response:** Returns user info if token is valid

---

## Products Endpoints

### Get All Products
- **GET** `/products`
- **Headers:** Authorization required

### Get Product by ID
- **GET** `/products/:id`
- **Headers:** Authorization required

### Create Product
- **POST** `/products`
- **Headers:** Authorization required
- **Body:**
  ```json
  {
    "name": "Product Name",
    "sku": "SKU-001",
    "category": "Category",
    "current_stock": 100,
    "min_stock": 10
  }
  ```

### Update Product
- **PUT** `/products/:id`
- **Headers:** Authorization required
- **Body:** (all fields optional)
  ```json
  {
    "name": "Updated Name",
    "sku": "SKU-002",
    "category": "New Category",
    "current_stock": 150,
    "min_stock": 15
  }
  ```

### Update Product Stock
- **PUT** `/products/:id/stock`
- **Headers:** Authorization required
- **Body:**
  ```json
  {
    "current_stock": 200
  }
  ```

### Delete Product
- **DELETE** `/products/:id`
- **Headers:** Authorization required

### Search Products
- **GET** `/products/search/:query`
- **Headers:** Authorization required
- Searches by name, SKU, or category

### Get Products by Category
- **GET** `/products/category/:category`
- **Headers:** Authorization required

### Get Low Stock Products
- **GET** `/products/alerts/low-stock`
- **Headers:** Authorization required

### Export Products as CSV
- **GET** `/products/export/csv`
- **Headers:** Authorization required
- **Response:** CSV file download

---

## Receipts Endpoints (Stock In)

### Get All Receipts
- **GET** `/receipts`
- **Headers:** Authorization required
- Returns receipts with product information

### Get Receipt by ID
- **GET** `/receipts/:id`
- **Headers:** Authorization required

### Create Receipt
- **POST** `/receipts`
- **Headers:** Authorization required
- **Body:**
  ```json
  {
    "supplier_name": "Supplier Name",
    "product_id": 1,
    "quantity": 50,
    "notes": "Optional notes",
    "status": "completed"
  }
  ```
- **Note:** Automatically updates product stock

### Update Receipt
- **PUT** `/receipts/:id`
- **Headers:** Authorization required
- **Body:** (all fields optional)
  ```json
  {
    "supplier_name": "New Supplier",
    "quantity": 75,
    "notes": "Updated notes",
    "status": "completed"
  }
  ```
- **Note:** Automatically adjusts product stock

### Delete Receipt
- **DELETE** `/receipts/:id`
- **Headers:** Authorization required
- **Note:** Automatically restores product stock

### Download Receipt PDF
- **GET** `/receipts/:id/pdf`
- **Headers:** Authorization required
- **Response:** PDF file download

### Export All Receipts as CSV
- **GET** `/receipts/export/csv`
- **Headers:** Authorization required
- **Response:** CSV file download

---

## Deliveries Endpoints (Stock Out)

### Get All Deliveries
- **GET** `/deliveries`
- **Headers:** Authorization required
- Returns deliveries with product information

### Get Delivery by ID
- **GET** `/deliveries/:id`
- **Headers:** Authorization required

### Create Delivery
- **POST** `/deliveries`
- **Headers:** Authorization required
- **Body:**
  ```json
  {
    "customer_name": "Customer Name",
    "product_id": 1,
    "quantity": 25,
    "notes": "Optional notes",
    "status": "completed"
  }
  ```
- **Note:** Checks stock availability and automatically updates product stock

### Update Delivery
- **PUT** `/deliveries/:id`
- **Headers:** Authorization required
- **Body:** (all fields optional)
  ```json
  {
    "customer_name": "New Customer",
    "quantity": 30,
    "notes": "Updated notes",
    "status": "completed"
  }
  ```
- **Note:** Automatically adjusts product stock

### Delete Delivery
- **DELETE** `/deliveries/:id`
- **Headers:** Authorization required
- **Note:** Automatically restores product stock

### Download Delivery Note PDF
- **GET** `/deliveries/:id/pdf`
- **Headers:** Authorization required
- **Response:** PDF file download

### Export All Deliveries as CSV
- **GET** `/deliveries/export/csv`
- **Headers:** Authorization required
- **Response:** CSV file download

---

## Movements Endpoints (Transaction History)

### Get All Movements
- **GET** `/movements`
- **Headers:** Authorization required
- **Query Parameters:**
  - `type`: Filter by type (`RECEIPT`, `DELIVERY`, or `all`)
  - `startDate`: Filter from date (ISO format)
  - `endDate`: Filter to date (ISO format)
  - `limit`: Limit number of results

### Get Recent Movements
- **GET** `/movements/recent`
- **Headers:** Authorization required
- **Query Parameters:**
  - `limit`: Number of recent movements (default: 10)

### Get Movements by Product
- **GET** `/movements/product/:productId`
- **Headers:** Authorization required

### Get Movement Statistics
- **GET** `/movements/stats`
- **Headers:** Authorization required
- **Query Parameters:**
  - `startDate`: Filter from date (ISO format)
  - `endDate`: Filter to date (ISO format)
- **Response:**
  ```json
  {
    "receipts": {
      "total": 10,
      "total_quantity": 500
    },
    "deliveries": {
      "total": 8,
      "total_quantity": 200
    },
    "net_movement": 300
  }
  ```

### Export Movements as CSV
- **GET** `/movements/export/csv`
- **Headers:** Authorization required
- **Query Parameters:** Same as Get All Movements
- **Response:** CSV file download

---

## Dashboard Endpoints

### Get Dashboard Statistics
- **GET** `/dashboard/stats`
- **Headers:** Authorization required
- **Response:**
  ```json
  {
    "totalProducts": 50,
    "lowStockItems": 5,
    "outOfStockItems": 2,
    "totalStock": 1000,
    "totalReceipts": 25,
    "totalDeliveries": 20,
    "recentReceipts": {
      "count": 5,
      "quantity": 150
    },
    "recentDeliveries": {
      "count": 3,
      "quantity": 75
    }
  }
  ```

### Export Dashboard Report as PDF
- **GET** `/dashboard/export/pdf`
- **Headers:** Authorization required
- **Response:** PDF file download with inventory report

### Export Dashboard Data as CSV
- **GET** `/dashboard/export/csv`
- **Headers:** Authorization required
- **Response:** CSV file download with products data

---

## Health Check

### Check API Status
- **GET** `/health`
- **No authentication required**
- **Response:**
  ```json
  {
    "status": "ok",
    "message": "Inventory Management API is running"
  }
  ```

---

## Error Responses

All endpoints may return the following error responses:

- **400 Bad Request:** Invalid input data
- **401 Unauthorized:** Missing or invalid authentication token
- **403 Forbidden:** Valid token but insufficient permissions
- **404 Not Found:** Resource not found
- **500 Internal Server Error:** Server error

Error response format:
```json
{
  "error": "Error message description"
}
```

---

## Notes

1. **Stock Management:** Creating, updating, or deleting receipts/deliveries automatically updates product stock levels.

2. **Stock Validation:** Deliveries are validated to ensure sufficient stock is available before processing.

3. **PDF Generation:** PDFs are generated on-the-fly and include all relevant transaction and product information.

4. **CSV Export:** All CSV exports include headers and are formatted for easy import into spreadsheet applications.

5. **Date Formats:** Use ISO 8601 format for dates (e.g., `2024-01-15T10:30:00Z`).

