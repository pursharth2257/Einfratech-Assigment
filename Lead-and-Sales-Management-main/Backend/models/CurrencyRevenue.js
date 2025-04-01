import mongoose from 'mongoose';

const CurrencyRevenueSchema = new mongoose.Schema({
  currency: { type: String, required: true }, // Currency name/code (e.g., USD, EUR, INR)
  exchangeRate: { type: Number, required: true }, // Exchange rate to USD
  totalRevenue: { type: Number, required: true }, // Total revenue in this currency
  transactions: { type: Number, required: true }, // Number of transactions
  lastUpdated: { type: Date, default: Date.now } // Timestamp of last update
});

const CurrencyRevenue = mongoose.model('CurrencyRevenue', CurrencyRevenueSchema);
export default CurrencyRevenue;
