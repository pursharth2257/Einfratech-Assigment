import mongoose from "mongoose";

const saleSchema = new mongoose.Schema({
  itemId: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  type: { type: String, required: true },
  pricePerItem: { type: Number, required: true },
  totalStock: { type: Number, required: true, default: 0 },
  totalSoldUnits: { type: Number, required: true, default: 0 },
  totalCost: { type: Number, required: true, default: 0 },
});

const Sale = mongoose.model("Sale", saleSchema);
export default Sale;
