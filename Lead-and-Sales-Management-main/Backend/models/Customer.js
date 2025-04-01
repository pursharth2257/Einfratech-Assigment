import mongoose from 'mongoose';

const CustomerSchema = new mongoose.Schema({
  CustomerName: { type: String, required: true },
  preferences: { type: String },
  PhoneNumber: { type: Number, required: true },
  purchaseHistory: { type: String },
  Nominee: { type: String },
  subscribeNewsletter: { type: Boolean, default: false }, // ✅ Added checkbox field
}, { timestamps: true });

export default mongoose.model('Customer', CustomerSchema);