import express from 'express';
import BuyerLocation from '../models/BuyerLocation.js';

const router = express.Router();

// ✅ Get all buyer locations
router.get('/', async (req, res) => {
  try {
    const buyers = await BuyerLocation.find();
    res.json(buyers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Get total buyers per country
router.get('/summary', async (req, res) => {
  try {
    const buyersPerCountry = await BuyerLocation.aggregate([
      { $group: { _id: "$country", totalBuyers: { $sum: "$totalBuyers" } } }
    ]);
    res.json(buyersPerCountry);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Add a new buyer location
router.post('/', async (req, res) => {
  const { country, city, latitude, longitude, totalBuyers } = req.body;
  
  if (!country || !city || latitude === undefined || longitude === undefined || totalBuyers === undefined) {
    return res.status(400).json({ message: "All fields are required." });
  }
  
  try {
    const newBuyerLocation = new BuyerLocation({ country, city, latitude, longitude, totalBuyers });
    await newBuyerLocation.save();
    res.status(201).json(newBuyerLocation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;