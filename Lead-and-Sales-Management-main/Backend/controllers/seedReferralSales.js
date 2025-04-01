import mongoose from 'mongoose';
import dotenv from 'dotenv';
import ReferralSales from './models/ReferralSales.js';

dotenv.config(); // Load environment variables

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB Connected Successfully!'))
.catch(err => console.error('❌ MongoDB Connection Error:', err));

const referralSalesData = [
  { referralSource: "Google Ads", totalSales: 120, revenueGenerated: 50000, commissionPercentage: 10, commissionPaid: 5000 },
  { referralSource: "Facebook Ads", totalSales: 90, revenueGenerated: 40000, commissionPercentage: 8, commissionPaid: 3200 },
  { referralSource: "Affiliate Marketing", totalSales: 60, revenueGenerated: 25000, commissionPercentage: 12, commissionPaid: 3000 },
  { referralSource: "Instagram Ads", totalSales: 50, revenueGenerated: 20000, commissionPercentage: 7, commissionPaid: 1400 },
  { referralSource: "YouTube Sponsorship", totalSales: 30, revenueGenerated: 15000, commissionPercentage: 15, commissionPaid: 2250 }
];

const seedReferralSalesDatabase = async () => {
  try {
    await ReferralSales.deleteMany(); // Clear existing data
    await ReferralSales.insertMany(referralSalesData);
    console.log("✅ Referral Sales data inserted successfully!");
    mongoose.connection.close();
  } catch (err) {
    console.error("❌ Error inserting referral sales data:", err);
  }
};

export default seedReferralSalesDatabase;
