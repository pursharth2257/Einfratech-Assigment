import mongoose from 'mongoose';

const ProductPerformanceSchema = new mongoose.Schema({
  productId: { type: String, required: true, unique: true }, // Unique ID of the product
  productName: { type: String, required: true }, // Product Name
  category: { type: String, required: true }, // e.g., Electronics, Fashion
  totalSales: { type: Number, required: true }, // Total units sold
  revenueGenerated: { type: Number, required: true }, // Total revenue from product sales
  averageRating: { type: Number, required: true, min: 0, max: 5 }, // Average customer rating
  returnRate: { type: Number, required: true }, // Percentage of returned products
  lastUpdated: { type: Date, default: Date.now }
});

const ProductPerformance = mongoose.model('ProductPerformance', ProductPerformanceSchema);
export default ProductPerformance;
