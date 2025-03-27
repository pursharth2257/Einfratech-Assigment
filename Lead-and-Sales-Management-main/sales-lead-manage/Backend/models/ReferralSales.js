import mongoose from 'mongoose';

const ReferralSalesSchema = new mongoose.Schema({
  referralSource: { type: String, required: true }, // e.g., Google Ads, Facebook, Affiliate, etc.
  totalSales: { type: Number, required: true },
  revenueGenerated: { type: Number, required: true },
  commissionPercentage: { type: Number, required: true }, // Commission given to referral source
  commissionPaid: { type: Number, required: true }, // Commission amount paid
  lastUpdated: { type: Date, default: Date.now }
});

// Create the model
const ReferralSales = mongoose.model('ReferralSales', ReferralSalesSchema);
export default ReferralSales;
