import express from "express";
import OrderItem from "../models/OrderItem.js";  // ✅ Import the model

const router = express.Router();

// ✅ Add a new order item
router.post("/", async (req, res) => {
  try {
    const { itemName, description, quantity, price } = req.body;

    if (!itemName || !description || !quantity || !price) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const total = quantity * price;
    const newOrderItem = new OrderItem({ itemName, description, quantity, price, total });
    await newOrderItem.save();

    res.status(201).json({ message: "Order item added successfully", orderItem: newOrderItem });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ✅ Get all order items
router.get("/", async (req, res) => {
  try {
    const orderItems = await OrderItem.find();
    res.json(orderItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


export default router;