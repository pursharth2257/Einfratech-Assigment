import express from 'express';
import ProductPerformance from '../models/ProductPerformance.js';

const router = express.Router();

// ✅ Get all product performance data
router.get('/', async (req, res) => {
  try {
    const products = await ProductPerformance.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Get top-performing products (sorted by revenue)
router.get('/top-products', async (req, res) => {
  try {
    const topProducts = await ProductPerformance.find().sort({ revenueGenerated: -1 }).limit(5);
    res.json(topProducts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Get average rating of a product
router.get('/rating/:productId', async (req, res) => {
  try {
    const product = await ProductPerformance.findOne({ productId: req.params.productId });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ productId: product.productId, productName: product.productName, averageRating: product.averageRating });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Get total revenue generated by all products
router.get('/total-revenue', async (req, res) => {
  try {
    const totalRevenue = await ProductPerformance.aggregate([
      { $group: { _id: null, totalRevenueGenerated: { $sum: "$revenueGenerated" } } }
    ]);
    res.json(totalRevenue[0] || { totalRevenueGenerated: 0 });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Add new product performance data
router.post('/', async (req, res) => {
  try {
    const { productId, productName, category, totalSales, revenueGenerated, averageRating, returnRate } = req.body;
    const newProduct = new ProductPerformance({ productId, productName, category, totalSales, revenueGenerated, averageRating, returnRate });
    await newProduct.save();
    res.status(201).json({ message: "Product performance data added successfully", product: newProduct });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
