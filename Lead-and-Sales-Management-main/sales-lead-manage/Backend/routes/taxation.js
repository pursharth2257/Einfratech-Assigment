
import express from 'express';
import Taxation from '../models/Taxation.js';

const router = express.Router();

// ✅ POST route to add new taxation data
router.post('/', async (req, res) => {
  try {
    const { country, taxPercentage, taxCollected, totalRevenue } = req.body;

    // Validate required fields
    if (!country || !taxPercentage || !taxCollected || !totalRevenue) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create new taxation entry
    const newTaxation = new Taxation({
      country,
      taxPercentage,
      taxCollected,
      totalRevenue
    });

    // Save to database
    const savedTaxation = await newTaxation.save();
    res.status(201).json(savedTaxation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Get all taxation details
router.get('/', async (req, res) => {
  try {
    const taxation = await Taxation.find();
    res.json(taxation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


export default router;
