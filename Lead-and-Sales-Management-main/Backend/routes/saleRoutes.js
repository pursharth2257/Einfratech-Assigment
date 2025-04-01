import express from "express";
import { createSale, getSales, editSale, searchSales, deleteSale, getSalesReport, sellItem } from "../controllers/saleController.js";

const router = express.Router();

// Create Sale Entry
router.post("/createSale", createSale);

// Get All Sales Entry
router.get("/getSales", getSales);

// Search Sales by Title or Type
router.get("/searchSales", searchSales);

// Route to edit an Item
router.put('/editSale/:itemId', editSale);

// Deleting items by item ID
router.delete("/deleteSale/:itemId", deleteSale);

// Route to sell an item
router.post("/sell", sellItem);

// Route to get sales report
router.get("/salesReport", getSalesReport);

export default router;
