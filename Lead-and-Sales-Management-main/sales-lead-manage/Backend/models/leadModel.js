import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema({
    name: { type: String, required: true },
    product: { type: String, required: true },
    phone: { type: String, required: false },
    status: { type: String, enum: ['New', 'Contacted', 'Qualified', 'Converted', 'Lost'] },
    assignedTo: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    leadsource: { type: String, required: true }
});

export default mongoose.model('Lead', leadSchema);