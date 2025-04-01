import Customer from "../models/Customer.js";

// Get all customers with search & sorting
export const getAllCustomers = async (search, sortOrder) => {
  let query = {};

  if (search) {
    query.CustomerName = { $regex: search, $options: "i" }; // Case-insensitive search
  }

  const sortOption = sortOrder === "asc" ? { createdAt: 1 } : { createdAt: -1 };

  return await Customer.find(query).sort(sortOption);
};

// Get a single customer by ID
export const getCustomerById = async (id) => {
  return await Customer.findById(id).populate("Nominee");
};

// Create a new customer
export const createCustomer = async (customerData) => {
  const customer = new Customer(customerData);
  return await customer.save();
};

// Update customer details
export const updateCustomer = async (id, updateData) => {
  return await Customer.findByIdAndUpdate(id, updateData, { new: true });
};

// Delete a customer
export const deleteCustomer = async (id) => {
  return await Customer.findByIdAndDelete(id);
};
