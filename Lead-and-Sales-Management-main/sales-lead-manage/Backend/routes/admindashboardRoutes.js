import express from "express";
import { dashSales, dashProduct, Referral } from "../models/admindashboard.js";

const router = express.Router();

// Get all sales data
router.get("/dashsales", async (req, res) => {
  try {
    const salesData = await dashSales.find(); // FIX: Use dashSales instead of Sales
    res.json(salesData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all products data
router.get("/dashproducts", async (req, res) => {
  try {
    const productData = await dashProduct.find(); // FIX: Use dashProduct instead of Product
    res.json(productData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all referral sales data
router.get("/referrals", async (req, res) => {
  try {
    const referralData = await Referral.find();
    res.json(referralData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Post new sale data
router.post("/dashSales", async (req, res) => {
  const { date, amount, category, customer } = req.body;

  const newSale = new dashSales({
    date,
    amount,
    category,
    customer,
  });

  try {
    const savedSale = await newSale.save();
    res.status(201).json(savedSale);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Post new product data
router.post("/dashProducts", async (req, res) => {
  const { name, sales, revenue } = req.body;

  const newProduct = new dashProduct({
    name,
    sales,
    revenue,
  });

  try {
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Post new referral sale data
router.post("/referrals", async (req, res) => {
  const { referrer, referred, reward } = req.body;

  const newReferral = new Referral({
    referrer,
    referred,
    reward,
  });

  try {
    const savedReferral = await newReferral.save();
    res.status(201).json(savedReferral);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
