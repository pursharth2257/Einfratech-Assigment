import Product from "../models/Product.js";
import mongoose from "mongoose";

// Create a new product
export const createProduct = async (req, res) => {
  try {
    const { name, price, stock ,description ,rating } = req.body;
    const product = await Product.create({ name, price, stock ,description ,rating});
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find(); // Mongoose uses find() instead of findAll()
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProducts = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true } // Return updated doc and validate fields
    );

    if (!updatedProduct) return res.status(404).json({ message: "Product not found" });

    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// Controller function
// export const deleteProducts = async (req, res) => {
//   try {
//     // Make sure you're accessing the ID correctly
//     const product = await Product.findByIdAndDelete(req.params._id);
    
//     if (!product) return res.status(404).json({ message: "Product not found" });

//     res.json({ message: "Product deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

export const deleteProducts = async (req, res) => {
  try {
    // Access the product ID from params as "id"
    const productId = req.params.id; 
    
    const product = await Product.findByIdAndDelete(productId);
    
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};





export const getSalesPerformance = async (req, res) => {
  try {
    const salesData = await Sales.aggregate([
      {
        $group: {
          _id: "$productId",
          totalQuantitySold: { $sum: "$quantitySold" }
        }
      },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "product"
        }
      },
      { $unwind: "$product" },
      {
        $project: {
          _id: 0,
          productId: "$_id",
          productName: "$product.name",
          description: "$product.description",  // Include description
          rating: "$product.rating",            // Include rating
          totalQuantitySold: 1
        }
      }
    ]);

    res.json(salesData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTopSellingProducts = async (req, res) => {
  try {
    const topProducts = await Sales.aggregate([
      {
        $group: {
          _id: "$productId",
          totalRevenue: { $sum: "$totalRevenue" }
        }
      },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "product"
        }
      },
      { $unwind: "$product" },
      {
        $project: {
          _id: 0,
          productId: "$_id",
          productName: "$product.name",
          description: "$product.description",  // Include description
          rating: "$product.rating",            // Include rating
          totalRevenue: 1
        }
      },
      { $sort: { totalRevenue: -1 } },
      { $limit: 5 }
    ]);

    res.json(topProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};