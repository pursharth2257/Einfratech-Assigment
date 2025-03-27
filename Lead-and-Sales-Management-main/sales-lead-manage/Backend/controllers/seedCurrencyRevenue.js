
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import CurrencyRevenue from './models/CurrencyRevenue.js';

dotenv.config(); // Load environment variables

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB Connected Successfully!'))
.catch(err => console.error('❌ MongoDB Connection Error:', err));

const currencyRevenueData = [
  { currency: "USD", exchangeRate: 1.0, totalRevenue: 50000, transactions: 120 },
  { currency: "EUR", exchangeRate: 1.1, totalRevenue: 45000, transactions: 100 },
  { currency: "GBP", exchangeRate: 1.3, totalRevenue: 30000, transactions: 80 },
  { currency: "INR", exchangeRate: 0.012, totalRevenue: 800000, transactions: 250 },
  { currency: "JPY", exchangeRate: 0.009, totalRevenue: 6000000, transactions: 300 }
];

const seedCurrencyRevenueDatabase = async () => {
  try {
    await CurrencyRevenue.deleteMany(); // Clear existing data
    await CurrencyRevenue.insertMany(currencyRevenueData);
    console.log("✅ Currency & Revenue data inserted successfully!");
    mongoose.connection.close();
  } catch (err) {
    console.error("❌ Error inserting currency & revenue data:", err);
  }
};

export default seedCurrencyRevenueDatabase;