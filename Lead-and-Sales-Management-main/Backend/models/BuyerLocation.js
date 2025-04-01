import mongoose from 'mongoose';

const BuyerLocationSchema = new mongoose.Schema({
  country: { type: String, required: true }, // Country name
  city: { type: String, required: true }, // City name
  latitude: { type: Number, required: true }, // Latitude coordinate
  longitude: { type: Number, required: true }, // Longitude coordinate
  totalBuyers: { type: Number, required: true }, // Number of buyers in this location
  lastUpdated: { type: Date, default: Date.now } // Timestamp of last update
});

const BuyerLocation = mongoose.model('BuyerLocation', BuyerLocationSchema);
export default BuyerLocation;
