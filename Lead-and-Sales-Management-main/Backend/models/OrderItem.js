import mongoose from "mongoose";

const OrderItemSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  description: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  total: { type: Number, required: true },
});

const OrderItem = mongoose.model("OrderItem", OrderItemSchema);
export default OrderItem;