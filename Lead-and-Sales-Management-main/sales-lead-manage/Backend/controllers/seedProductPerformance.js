import mongoose from 'mongoose';
import dotenv from 'dotenv';
import ProductPerformance from './models/ProductPerformance.js';

dotenv.config(); // Load environment variables

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB Connected Successfully!'))
.catch(err => console.error('❌ MongoDB Connection Error:', err));

const productPerformanceData = [
  { productId: "P1001", productName: "Wireless Headphones", category: "Electronics", totalSales: 500, revenueGenerated: 75000, averageRating: 4.5, returnRate: 2.5 },
  { productId: "P1002", productName: "Smartwatch", category: "Wearables", totalSales: 350, revenueGenerated: 52500, averageRating: 4.2, returnRate: 3.0 },
  { productId: "P1003", productName: "Gaming Laptop", category: "Computers", totalSales: 150, revenueGenerated: 225000, averageRating: 4.8, returnRate: 1.5 },
  { productId: "P1004", productName: "Running Shoes", category: "Fashion", totalSales: 800, revenueGenerated: 64000, averageRating: 4.1, returnRate: 5.0 },
  { productId: "P1005", productName: "Bluetooth Speaker", category: "Electronics", totalSales: 600, revenueGenerated: 90000, averageRating: 4.3, returnRate: 2.0 }
];

const seedProductPerformanceDatabase = async () => {
  try {
    await ProductPerformance.deleteMany(); // Clear existing data
    await ProductPerformance.insertMany(productPerformanceData);
    console.log("✅ Product Performance data inserted successfully!");
    mongoose.connection.close();
  } catch (err) {
    console.error("❌ Error inserting product performance data:", err);
  }
};

export default seedProductPerformanceDatabase;
