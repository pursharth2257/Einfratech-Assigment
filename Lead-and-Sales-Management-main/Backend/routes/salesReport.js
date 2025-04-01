import express from 'express';
import mongoose from 'mongoose';
import SalesReport from '../models/SalesReport.js';

const router = express.Router();

// ✅ Create a new sales report
router.post('/', async (req, res) => {
  try {
    const newSalesReport = new SalesReport(req.body);
    const savedReport = await newSalesReport.save();
    res.status(201).json(savedReport);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ✅ Get all sales reports
router.get('/', async (req, res) => {
  try {
    const salesReports = await SalesReport.find();
    res.json(salesReports);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Get sales by category (Ensure this comes before dynamic :id route)
router.get('/category-sales', async (req, res) => {
  try {
    const { category } = req.query;
    if (!category) {
      return res.status(400).json({ message: "Please provide a category" });
    }

    const categorySales = await SalesReport.find({ category });

    if (categorySales.length === 0) {
      return res.status(404).json({ message: "No sales found for this category" });
    }

    res.json(categorySales);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Get sales by payment method
router.get('/payment-method', async (req, res) => {
  try {
    const paymentSales = await SalesReport.aggregate([
      { $group: { _id: "$paymentMethod", totalSales: { $sum: "$totalAmount" } } }
    ]);
    res.json(paymentSales);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Get sales by date range
router.get('/sales-by-date', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    if (!startDate || !endDate) {
      return res.status(400).json({ message: "Please provide startDate and endDate" });
    }
    const sales = await SalesReport.find({
      transactionDate: { 
        $gte: new Date(startDate), 
        $lte: new Date(endDate) 
      }
    });
    res.json(sales);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Get a single sales report by ID (Move this below to prevent conflicts)
router.get('/:id', async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid sales report ID" });
  }

  try {
    const salesReport = await SalesReport.findById(req.params.id);
    if (!salesReport) {
      return res.status(404).json({ message: "Sales report not found" });
    }
    res.json(salesReport);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
