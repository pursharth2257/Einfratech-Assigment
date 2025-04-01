import mongoose from "mongoose";
import Product from "../models/Product.js";
import Sales from "../models/Sales.js";

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect("mongodb://localhost:27017/your_database_name", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Clear existing data
    await Product.deleteMany({});
    await Sales.deleteMany({});

    // Insert products
    const product1 = await Product.create({ name: "Laptop", price: 50000, stock: 20 });
    const product2 = await Product.create({ name: "Smartphone", price: 30000, stock: 50 });

    // Insert sales data with referenced product IDs
    await Sales.create({ productId: product1._id, quantitySold: 10, totalRevenue: 500000 });
    await Sales.create({ productId: product2._id, quantitySold: 20, totalRevenue: 600000 });

    console.log("✅ Dummy data inserted!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  } finally {
    // Close the MongoDB connection
    mongoose.connection.close();
  }
}

// Run the function
seedDatabase();
