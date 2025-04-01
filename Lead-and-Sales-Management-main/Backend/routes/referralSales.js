import express from 'express';
import ReferralSales from '../models/ReferralSales.js';

const router = express.Router();

// ✅ POST route to add new referral sales data
router.post('/', async (req, res) => {
  try {
    const { referralSource, totalSales, revenueGenerated, commissionPercentage, commissionPaid } = req.body;

    // Validate required fields
    if (!referralSource || !totalSales || !revenueGenerated || !commissionPercentage || !commissionPaid) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create new referral sales entry
    const newReferralSale = new ReferralSales({
      referralSource,
      totalSales,
      revenueGenerated,
      commissionPercentage,
      commissionPaid
    });

    // Save to database
    const savedReferralSale = await newReferralSale.save();
    res.status(201).json(savedReferralSale);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// ✅ Get all referral sales data
router.get('/', async (req, res) => {
  try {
    const referralSales = await ReferralSales.find();
    res.json(referralSales);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Get total revenue generated from referrals
router.get('/total-revenue', async (req, res) => {
  try {
    const totalRevenue = await ReferralSales.aggregate([
      { $group: { _id: null, totalRevenueGenerated: { $sum: "$revenueGenerated" } } }
    ]);
    res.json(totalRevenue[0] || { totalRevenueGenerated: 0 });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/// ✅ Get total commission paid for referrals
router.get('/total-commission', async (req, res) => {
  try {
    const totalCommission = await ReferralSales.aggregate([
      { 
        $group: { 
          _id: null, 
          totalCommissionPaid: { $sum: "$commissionPaid" } 
        } 
      }
    ]);

    res.json({ totalCommissionPaid: totalCommission.length > 0 ? totalCommission[0].totalCommissionPaid : 0 });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


export default router;
