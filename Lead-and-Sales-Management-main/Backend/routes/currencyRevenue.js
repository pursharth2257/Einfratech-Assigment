import express from 'express';
import CurrencyRevenue from '../models/CurrencyRevenue.js';

const router = express.Router();

// ✅ Get all currency revenue data
router.get('/', async (req, res) => {
  try {
    const currencyRevenue = await CurrencyRevenue.find();
    res.json(currencyRevenue);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Get total revenue converted to USD
router.get('/total-usd', async (req, res) => {
  try {
    const revenueInUSD = await CurrencyRevenue.aggregate([
      { $group: { _id: null, totalRevenueUSD: { $sum: { $multiply: ['$totalRevenue', '$exchangeRate'] } } } }
    ]);
    res.json(revenueInUSD[0] || { totalRevenueUSD: 0 });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Add new currency revenue data (POST request)
router.post('/', async (req, res) => {
  try {
    const { currency, exchangeRate, totalRevenue, transactions } = req.body;

    // Validation: Ensure all fields are provided
    if (!currency || !exchangeRate || !totalRevenue || !transactions) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const newCurrencyRevenue = new CurrencyRevenue({
      currency,
      exchangeRate,
      totalRevenue,
      transactions
    });

    const savedData = await newCurrencyRevenue.save();
    res.status(201).json(savedData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
