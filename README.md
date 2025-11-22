# 🏪 InventoryMaster - Modern Inventory Management System

A full-stack inventory management system built with React, Node.js, Express, and SQLite. Designed to streamline inventory operations with a beautiful, responsive interface.

![InventoryMaster Dashboard](https://img.shields.io/badge/InventoryMaster-Ready-brightgreen)
![Hackathon](https://img.shields.io/badge/Hackathon-Invictus%202025-blue)

## 🎯 Features

### 📊 Dashboard
- **Real-time Overview**: Live stats and KPIs
- **Quick Actions**: One-click navigation to key features
- **Inventory Alerts**: Critical stock notifications
- **Performance Metrics**: Business intelligence insights
- **Recent Activity**: Latest inventory movements
- **Data Export**: PDF, CSV, and Excel reports

### 🔐 Authentication
- User registration and login
- JWT-based authentication
- Protected routes
- Session management

### 📦 Product Management
- Add, edit, and view products
- Stock level tracking
- Category management
- Low stock alerts
- SKU generation

### 📥 Inventory Operations
- **Receipts Management**: Stock incoming from suppliers
- **Delivery Orders**: Stock outgoing to customers
- **Stock Adjustments**: Fix inventory discrepancies
- **Movement History**: Complete audit trail

## 🛠 Tech Stack

### Frontend
- **React 18** - UI framework
- **React Router** - Navigation
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **Vite** - Build tool

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **SQLite** - Database
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin requests

## 🎨 UI Theme - AquaMint

### Color Palette
- **Primary Blue**: `#00072D`
- **Accent Green**: `#84eab3`
- **Background**: `#F8FAFC`
- **White**: `#FFFFFF`
- **Borders**: `#E2E8F0`

### Design System
- **Cards**: `bg-white p-6 rounded-xl shadow-sm border border-slate-200`
- **Buttons**: 
  - Primary: `bg-[#00072D] text-white rounded-lg px-4 py-2`
  - Secondary: `bg-[#84eab3] text-[#00072D] rounded-lg px-4 py-2`
  - Outlined: `border border-[#84eab3] text-[#84eab3] rounded-lg px-4 py-2`
- **Inputs**: `border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#84eab3]`

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Start the development server
npm run dev

# Server runs on http://localhost:5000
Frontend Setup
bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev

# Application runs on http://localhost:3000
📡 API Endpoints
Authentication Endpoints
Method	Endpoint	Description	Request Body
POST	/api/auth/register	User registration	{ email, password, name }
POST	/api/auth/login	User login	{ email, password }
Dashboard Endpoints
Method	Endpoint	Description	Headers
GET	/api/dashboard/stats	Get dashboard statistics	Authorization: Bearer <token>
GET	/api/dashboard/activity	Get recent activity	Authorization: Bearer <token>
Product Endpoints
Method	Endpoint	Description	Request Body
GET	/api/products	Get all products	-
POST	/api/products	Create new product	{ name, sku, category, current_stock, min_stock }
PUT	/api/products/:id	Update product	{ name, category, current_stock, min_stock }
DELETE	/api/products/:id	Delete product	-
PUT	/api/products/:id/stock	Update stock level	{ current_stock }
Inventory Operations Endpoints
Method	Endpoint	Description	Request Body
POST	/api/receipts	Create receipt (stock in)	{ supplier_name, product_id, quantity }
POST	/api/deliveries	Create delivery (stock out)	{ customer_name, product_id, quantity }
GET	/api/movements	Get inventory movements	-
POST	/api/adjustments	Stock adjustment	{ product_id, new_quantity, reason }
Data Export Endpoints
Method	Endpoint	Description	Parameters
GET	/api/export/pdf	Export PDF report	`type=dashboard	products	transactions`
GET	/api/export/csv	Export CSV data	`type=products	transactions	inventory`
GET	/api/export/excel	Export Excel report	`type=summary	detailed`
🗄 Database Schema
Users Table
sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  name TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
Products Table
sql
CREATE TABLE products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  sku TEXT UNIQUE NOT NULL,
  category TEXT DEFAULT 'General',
  current_stock INTEGER DEFAULT 0,
  min_stock INTEGER DEFAULT 5,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
Receipts Table (Stock In)
sql
CREATE TABLE receipts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  supplier_name TEXT NOT NULL,
  product_id INTEGER NOT NULL,
  quantity INTEGER NOT NULL,
  status TEXT DEFAULT 'completed',
  date DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products (id)
);
Deliveries Table (Stock Out)
sql
CREATE TABLE deliveries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  customer_name TEXT NOT NULL,
  product_id INTEGER NOT NULL,
  quantity INTEGER NOT NULL,
  status TEXT DEFAULT 'completed',
  date DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products (id)
);
👥 Team Collaboration
Git Workflow
bash
# Create feature branch
git checkout -b feature/feature-name

# Work on features
git add .
git commit -m "feat: description"

# Push to remote
git push origin feature/feature-name

# Create Pull Request for review
Branch Structure
main - Production-ready code

feature/dashboard-ui - Dashboard components

feature/auth-system - Authentication system

feature/product-management - Product CRUD operations

feature/inventory-ops - Receipts and deliveries

🎯 Usage Guide
Getting Started
Register a new account or login with existing credentials

Access the Dashboard for an overview of inventory status

Add Products through the product management section

Record Receipts when stock arrives from suppliers

Process Deliveries when shipping to customers

Monitor Alerts for low stock and critical items

Key Features in Action
Real-time Updates: Dashboard auto-refreshes every 30 seconds

Quick Actions: Navigate quickly between frequently used features

Export Reports: Generate business reports in multiple formats

Mobile Responsive: Works seamlessly on all devices

🚀 Deployment
Backend Deployment
bash
# Set environment variables
export NODE_ENV=production
export JWT_SECRET=your-secret-key
export PORT=5000

# Start production server
npm start
Frontend Deployment
bash
# Build for production
npm run build

# Deploy build folder to your hosting service
🤝 Contributing
Fork the repository

Create your feature branch (git checkout -b feature/AmazingFeature)

Commit your changes (git commit -m 'Add some AmazingFeature')

Push to the branch (git push origin feature/AmazingFeature)

Open a Pull Request

📝 License
This project is licensed under the MIT License - see the LICENSE.md file for details.

🏆 Hackathon Information
Event: Invictus Hackathon 2025
Team: [Your Team Name]
Track: [Your Track]
Duration: 8 hours
Submission: [Submission Link]

<div align="center">
Built with ❤️ for the Invictus Hackathon 2025

InventoryMaster - Streamlining inventory operations for modern businesses

</div> ```
📁 Save this as README.md
Key Sections Included:
✅ Project overview and features
✅ Tech stack with versions
✅ Complete installation guide
✅ Detailed API documentation with all endpoints
✅ Database schema
✅ Team collaboration workflow
✅ Usage guide for end users
✅ Deployment instructions
✅ Hackathon-specific information

API Endpoints Covered:
Authentication: Register, Login

Dashboard: Stats, Activity

Products: CRUD operations, stock management

Inventory: Receipts, Deliveries, Movements, Adjustments

Export: PDF, CSV, Excel reports

To Use This README:
Create README.md in your project root

Copy-paste the content above

Update team information and hackathon details

Add any missing API endpoints your team created

Include screenshots if you have them
