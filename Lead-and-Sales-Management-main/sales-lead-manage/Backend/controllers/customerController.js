import Customer from "../models/Customer.js"; 
import { 
  getAllCustomers as getAllCustomersService, 
  getCustomerById, 
  createCustomer as createCustomerService, 
  updateCustomer as updateCustomerService, 
  deleteCustomer as deleteCustomerService 
} from "../services/customerService.js"; 

// ✅ Get all customers with search & sorting
export const getAllCustomers = async (req, res) => {
  try {
    const { search, sortOrder } = req.query;
    const customers = await getAllCustomersService(search, sortOrder);
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get a single customer by ID
export const getCustomer = async (req, res) => {
  try {
    const customer = await getCustomerById(req.params.id);
    if (!customer) return res.status(404).json({ message: "Customer not found" });
    res.json(customer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Create a new customer
export const createCustomer = async (req, res) => {
  try {
    const customer = await createCustomerService(req.body);
    res.status(201).json(customer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ✅ Update customer details
export const updateCustomer = async (req, res) => {
  try {
    const updatedCustomer = await updateCustomerService(req.params.id, req.body);
    if (!updatedCustomer) return res.status(404).json({ message: "Customer not found" });
    res.json(updatedCustomer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ✅ Delete a customer
export const deleteCustomer = async (req, res) => {
  try {
    const customer = await deleteCustomerService(req.params.id);
    if (!customer) return res.status(404).json({ message: "Customer not found" });
    res.json({ message: "Customer deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// ✅ Get customers with advanced search & sorting
export const getCustomers = async (req, res) => {
  try {
    let { search, sortBy } = req.query;
    let query = {};

    if (search) {
      query = {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { phone: { $regex: search, $options: "i" } }
        ],
      };
    }

    let sortOption = {};
    if (sortBy === "newest") {
      sortOption = { createdAt: -1 };
    } else if (sortBy === "oldest") {
      sortOption = { createdAt: 1 };
    }

    const customers = await Customer.find(query).sort(sortOption);
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};
