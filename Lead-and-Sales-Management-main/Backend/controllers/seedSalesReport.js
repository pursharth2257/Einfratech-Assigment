import mongoose from 'mongoose';
import dotenv from 'dotenv';
import SalesReport from './models/SalesReport.js';

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB Connected Successfully!'))
.catch(err => console.error('❌ MongoDB Connection Error:', err));

const salesReportData = [
  { orderId: "ORD001", customerName: "John Doe", productId: "P1001", productName: "Wireless Headphones", category: "Electronics", quantitySold: 2, totalAmount: 15000, paymentMethod: "Credit Card", transactionDate: new Date("2024-02-15"), status: "Completed" },
  { orderId: "ORD002", customerName: "Emma Watson", productId: "P1002", productName: "Smartwatch", category: "Wearables", quantitySold: 1, totalAmount: 15000, paymentMethod: "PayPal", transactionDate: new Date("2024-02-16"), status: "Completed" },
];

const seedSalesReport = async () => {
  try {
    await SalesReport.deleteMany(); // Clear existing data
    await SalesReport.insertMany(salesReportData);
    console.log("✅ Sales Report data inserted successfully!");
    mongoose.connection.close();
  } catch (err) {
    console.error("❌ Error inserting sales report data:", err);
  }
};

export default seedSalesReport;
