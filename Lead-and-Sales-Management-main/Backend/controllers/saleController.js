import Sale from "../models/Sale.js";

// Create a new Sale Entry
export const createSale = async (req, res) => {
  try {
    const { title, type, pricePerItem, totalStock } = req.body;

    if (!title || !type || !pricePerItem || !totalStock) {
      return res.status(400).json({ message: "All fields are required" });
    }

    let existingItem = await Sale.findOne({ title, type, pricePerItem });

    if (existingItem) {
      existingItem.totalStock += totalStock;
      existingItem.totalCost = existingItem.totalStock * existingItem.pricePerItem;
      await existingItem.save();
      return res.status(200).json({ message: "Stock updated successfully", item: existingItem });
    } else {
      const lastItem = await Sale.findOne().sort({ itemId: -1 });
      const newItemId = lastItem ? lastItem.itemId + 1 : 1;

      const newSale = await Sale.create({
        itemId: newItemId,
        title,
        type,
        pricePerItem,
        totalStock,
        totalCost: totalStock * pricePerItem,
      });

      return res.status(201).json({ message: "New item added successfully", item: newSale });
    }
  } catch (error) {
    console.error("Error in createSale:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get All Sales Entries
export const getSales = async (req, res) => {
  try {
    const sales = await Sale.find();
    res.status(200).json(sales);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Search Sales by Title or Type
export const searchSales = async (req, res) => {
  try {
    const { title, type } = req.query;

    let query = {};
    if (title) query.title = { $regex: title, $options: "i" };
    if (type) query.type = { $regex: type, $options: "i" };

    const results = await Sale.find(query);

    if (results.length === 0) {
      return res.status(404).json({ message: "No matching sales found" });
    }

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Deleting a Sale Entry
export const deleteSale = async (req, res) => {
  try {
    const { itemId } = req.params;

    const deletedSale = await Sale.findOneAndDelete({ itemId });

    if (!deletedSale) {
      return res.status(404).json({ message: "Item not found" });
    }

    const remainingItems = await Sale.find();
    res.status(200).json({
      message: "Item deleted successfully",
      deletedSale,
      remainingItems,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Sell an Item API
export const sellItem = async (req, res) => {
  try {
    const { itemId, quantitySold } = req.body;

    const item = await Sale.findOne({ itemId });

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    if (item.totalStock < quantitySold) {
      return res.status(400).json({ message: "Not enough stock available" });
    }

    item.totalStock -= quantitySold;
    item.totalSoldUnits += quantitySold;
    item.totalCost = item.totalSoldUnits * item.pricePerItem;

    await item.save();

    res.status(200).json({ message: "Sale successful", item });
  } catch (error) {
    console.error("Error in sellItem:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Edit an Item by ID
export const editSale = async (req, res) => {
  try {
      const itemId = Number(req.params.itemId);  // Convert to number if needed
      const { title, type, pricePerItem, totalStock } = req.body;

      // Find and update the item
      const updatedItem = await Sale.findOneAndUpdate(
          { itemId: itemId }, 
          { 
              $set: {
                  ...(title && { title }),  
                  ...(type && { type }),
                  ...(pricePerItem && { pricePerItem }),
                  ...(totalStock && { totalStock })
              }
          },
          { new: true } // Returns the updated document
      );

      if (!updatedItem) {
          return res.status(404).json({ message: "Item not found" });
      }

      res.status(200).json({
          message: "Item updated successfully",
          updatedItem
      });
  } 
  catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Generate Sales Report
export const getSalesReport = async (req, res) => {
  try {
    const soldItems = await Sale.find({ totalSoldUnits: { $gt: 0 } });

    const totalAmount = soldItems.reduce((sum, item) => sum + item.totalCost, 0);

    res.status(200).json({
      salesReport: soldItems.map((item) => ({
        sellId: item.itemId,
        productName: item.title,
        pricePerItem: item.pricePerItem,
        totalSoldUnits: item.totalSoldUnits,
        totalCost: item.totalCost,
      })),
      totalAmount,
    });
  } catch (error) {
    console.error("Error in getSalesReport:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
