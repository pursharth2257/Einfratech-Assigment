import mongoose from "mongoose";

const dashSalesSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  customer: { type: String, required: true }
});

const dashproductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sales: { type: Number, required: true },
  revenue: { type: Number, required: true }
});

const referralSchema = new mongoose.Schema({
  referrer: { type: String, required: true },
  referred: { type: String, required: true },
  reward: { type: Number, required: true }
});

// Models for sales, products, and referrals
const dashSales = mongoose.model("dashSales", dashSalesSchema);
const dashProduct = mongoose.model("dashProduct", dashproductSchema);
const Referral = mongoose.model("Referral", referralSchema);

export { dashSales, dashProduct, Referral };