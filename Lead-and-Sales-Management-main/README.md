# Lead-and-Sales-Management

# FOR FRONTEND
use command "cd sales-lead-manage" 
it will take you to  end terminal
use command "npm install"
To run use command "npm run dev"
# FOR BACKEND
use command "cd Backend" 
it will take you to  end terminal
use command "npm install"

To run "node server.js" OR "npx nodemon server.js"

# Overview

A web-based ERP system designed for eCommerce businesses to manage leads, sales, customer data, and product performance. The system provides insightful analytics and an admin dashboard for efficient decision-making.

# Project Directory
```sh

sales-lead-manage/

├── backend/

│   ├── config/

│   │   └── db.js               # Database connection setup

│   ├── controllers/

│   │   ├── leadController.js   # Handles lead-related operations

│   │   └── saleController.js   # Handles sales-related operations

│   ├── middleware/

│   │   └── authMiddleware.js   # JWT Authentication & Authorization

│   ├── models/

│   │   ├── leadModel.js        # Lead schema definition

│   │   └── saleModel.js        # Sale schema definition

│   ├── routes/

│   │   ├── leadRoutes.js       # API routes for lead operations

│   │   └── saleRoutes.js       # API routes for sale operations

│   ├── utils/

│   │   └── errorHandler.js     # Centralized error handling

│   ├── .env                    # Environment variables

│   ├── server.js               # Main entry point for backend

│   └── package.json            # Backend dependencies

├── frontend/

│   ├── public/

│   │   └── index.html          # Root HTML file

│   ├── src/

│   │   ├── assets/             # Images, icons, etc.

│   │   ├── components/         # Reusable UI components

│   │   ├── context/

│   │   │   └── AuthContext.js  # Context for user authentication

│   │   ├── pages/

│   │   │   ├── Dashboard.jsx   # Admin dashboard page

│   │   │   ├── Leads.jsx       # Lead management page

│   │   │   └── Sales.jsx       # Sales management page

│   │   ├── services/

│   │   │   ├── leadService.js  # API requests for leads

│   │   │   └── saleService.js  # API requests for sales

│   │   ├── App.jsx             # Main App component

│   │   └── index.js            # Main entry point for frontend

│   ├── .env                    # Frontend environment variables

│   ├── package.json            # Frontend dependencies

│   └── tailwind.config.js      # Tailwind CSS configuration

├── .gitignore                  # Files to ignore in Git

└── README.md                   # Project documentation
```

# Key Features

Lead Management: Capture, assign, and track lead conversion.

Sales Management: Record transactions, manage referrals, and generate invoices.

Customer Management: Store customer profiles and nominee details.

Product Performance Tracking: Monitor sales and product popularity.

Admin Dashboard & Analytics: Sales reports, revenue tracking, taxation details, and buyer density mapping.

#Tech Stack

Frontend

React

TailwindCSS

# Backend

Node.js

Express

MongoDB

# Security

JWT Authentication

Secure Cookies for session management

# Deliverables

Fully functional ERP system

Admin dashboard with real-time data visualization

Automated lead and sales tracking

Secure, scalable architecture

# Future Enhancements

AI-driven sales forecasting

Multi-currency & multi-language support

CRM integration



# IMPORTANT
Create a .env file in the root directory
Add necessary configurations (e.g., database URL, JWT secret)

API Endpoints (Example)

• Authentication 

o /api/auth -> authorization 

o /register -> registerUser

o /login -> loginUser

• Sales Reports 

o /api/sales-reports -> salesReportRoutes

o /payment-method 

o /sales-by-date 

• Taxation & Currency Revenue 

o /api/taxation -> taxationRoutes 

o /api/currency-revenue -> currencyRevenueRoutes 

o /total-usd 

• Buyer Density & Referral Sales 

o /api/buyer-density -> buyerLocationRoutes 

o /summary 

o /api/referral-sales -> referralSalesRoutes 

o /total-revenue

o /total-commission

• Product Performance 

o /api/product-performance -> productPerformanceRoutes

o /total-revenue

o /rating/:productId 

o /top-products 

• Customer Management 

o /api/customers -> customerRoutes 

o / -> getCustomers

o /:id -> getCustomer 

o / -> createCustomer

o /:id -> updateCustomer 

o /:id -> deleteCustomer 

o /customers -> getAllCustomers 

• Sales Management 

o /api/sales -> salesRoutes 

o /createSale -> createSale

o /getSales -> getSales

o /searchSales -> searchSales 

o /deleteSale/:itemId -> deleteSale 

o /sell -> sellItem 

o /salesReport -> getSalesReport 

• Lead Management 

o /api/leads -> leadRoutes 

o /create -> createLead 

o / -> getLeads 

o /search -> searchLeads

o /:id -> getLeadById 

o /:id -> updateLead 

o /:id -> deleteLead 

• Product Management 

o /api -> productRoutes 

o /products -> createProduct 

o /products -> getProducts 

o /:id -> updateProducts 

o /:id -> deleteProducts

o /sales-performance -> getSalesPerformance 

o /top-selling -> getTopSellingProducts 



=======

## Overview

A web-based ERP system designed to manage leads, sales, customer data, and product performance. The system provides insightful analytics and an admin dashboard for efficient decision-making.

## Key Features

- **Lead Management:** Capture, assign, and track lead conversion.
- **Sales Management:** Record transactions, manage referrals, and generate invoices.
- **Customer Management:** Store customer profiles and nominee details.
- **Product Performance Tracking:** Monitor sales and product popularity.
- **Admin Dashboard & Analytics:** Sales reports, revenue tracking, taxation details, and buyer density mapping.

## Tech Stack

### Frontend

- React
- TailwindCSS

### Backend

- Node.js
- Express
- MongoDB

### Security

- JWT Authentication
- Secure Cookies for session management

## Installation

### Prerequisites

Make sure you have the following installed:

- Node.js (Latest Stable Version)
- MongoDB (Running Instance)

### Setup Instructions

#### Frontend

```sh
cd sales-lead-manage
npm install
npm run dev
```

#### Backend

```sh
cd Backend
npm install
```

To run the backend server:

```sh
node server.js
```

### Environment Variables

Create a `.env` file in the root directory and add necessary configurations such as:

```
DATABASE_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

## Deliverables

- Fully functional ERP system
- Admin dashboard with real-time data visualization
- Automated lead and sales tracking
- Secure, scalable architecture
