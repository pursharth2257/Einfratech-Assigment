import mongoose from 'mongoose';

const TaxationSchema = new mongoose.Schema({
  country: { type: String, required: true },
  taxPercentage: { type: Number, required: true },
  taxCollected: { type: Number, required: true },
  totalRevenue: { type: Number, required: true },
  lastUpdated: { type: Date, default: Date.now }
});

const Taxation = mongoose.model('Taxation', TaxationSchema);
export default Taxation;
