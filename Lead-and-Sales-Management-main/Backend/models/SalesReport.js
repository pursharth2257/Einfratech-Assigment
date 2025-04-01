import mongoose from 'mongoose';

const SalesReportSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  customerName: { type: String, required: true },
  productId: { type: String, required: true },
  productName: { type: String, required: true },
  category: { type: String, required: true },
  quantitySold: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
  paymentMethod: { type: String, required: true },
  transactionDate: { type: Date, required: true },
  status: { type: String, required: true, enum: ['Completed', 'Pending', 'Refunded'] },
});

const SalesReport = mongoose.model('SalesReport', SalesReportSchema);
export default SalesReport;
