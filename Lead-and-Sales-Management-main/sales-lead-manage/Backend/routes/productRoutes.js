import express from "express";
import { createProduct, deleteProducts, getProducts, getSalesPerformance, getTopSellingProducts, updateProducts } from "../controllers/productController.js";


const router = express.Router();

router.post("/products", createProduct);
router.get("/products", getProducts);
router.put('/:id', updateProducts);
router.delete('/:id', deleteProducts);
router.get("/sales-performance", getSalesPerformance);
router.get("/top-selling", getTopSellingProducts);

export default router;