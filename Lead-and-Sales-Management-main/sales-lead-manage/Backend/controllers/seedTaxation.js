import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Taxation from './models/Taxation.js';

dotenv.config(); // Load environment variables

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

const taxationData = [
  { country: "USA", taxPercentage: 8.5, taxCollected: 5000, totalRevenue: 60000 },
  { country: "UK", taxPercentage: 7, taxCollected: 4200, totalRevenue: 58000 },
  { country: "Germany", taxPercentage: 9, taxCollected: 5500, totalRevenue: 62000 },
  { country: "France", taxPercentage: 10, taxCollected: 6000, totalRevenue: 65000 },
  { country: "India", taxPercentage: 5, taxCollected: 3000, totalRevenue: 40000 }
];

const seedTaxationDatabase = async () => {
  try {
    await Taxation.deleteMany(); // Clear existing data
    await Taxation.insertMany(taxationData);
    console.log("Taxation data inserted successfully!");
    mongoose.connection.close();
  } catch (err) {
    console.error("Error inserting taxation data:", err);
  }
};

export default seedTaxationDatabase;
