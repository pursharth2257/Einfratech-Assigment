import mongoose from 'mongoose';
import dotenv from 'dotenv';
import BuyerLocation from './models/BuyerLocation.js';

dotenv.config(); // Load environment variables

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB Connected Successfully!'))
.catch(err => console.error('❌ MongoDB Connection Error:', err));

const buyerLocationData = [
  { country: "USA", city: "New York", latitude: 40.7128, longitude: -74.0060, totalBuyers: 1500 },
  { country: "UK", city: "London", latitude: 51.5074, longitude: -0.1278, totalBuyers: 1200 },
  { country: "India", city: "Mumbai", latitude: 19.0760, longitude: 72.8777, totalBuyers: 1800 },
  { country: "Germany", city: "Berlin", latitude: 52.5200, longitude: 13.4050, totalBuyers: 900 },
  { country: "Australia", city: "Sydney", latitude: -33.8688, longitude: 151.2093, totalBuyers: 700 }
];

const seedBuyerLocationDatabase = async () => {
  try {
    await BuyerLocation.deleteMany(); // Clear existing data
    await BuyerLocation.insertMany(buyerLocationData);
    console.log("✅ Buyers' Density data inserted successfully!");
    mongoose.connection.close();
  } catch (err) {
    console.error("❌ Error inserting buyers' density data:", err);
  }
};

export default seedBuyerLocationDatabase;
