import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  description:{type:String, required:true},
  rating:{type:Number , required:true},
}, { timestamps: true }); // Adds createdAt & updatedAt fields

export default mongoose.model("Product", productSchema);
