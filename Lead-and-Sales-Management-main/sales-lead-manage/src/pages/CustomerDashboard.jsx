import { useState, useEffect } from "react";
import API from "../api/axios";
import React from "react";

const CustomerDashboard = () => {
  const [customers, setCustomers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ CustomerName: "", preferences: "", PhoneNumber: "", purchaseHistory: "", Nominee: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 5;

  // Fetch customers
  const fetchCustomers = async () => {
    try {
      const response = await API.get("/customers");
      setCustomers(response.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // Open Add Modal
  const handleOpenAddModal = () => {
    setFormData({ CustomerName: "", preferences: "", PhoneNumber: "", purchaseHistory: "", Nominee: "" });
    setIsEditing(false);
    setShowModal(true);
  };

  // Open Edit Modal
  const handleOpenEditModal = (customer) => {
    setFormData(customer);
    setIsEditing(true);
    setShowModal(true);
  };

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Save or Update Customer
  const handleSaveCustomer = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await API.put(`/customers/${formData._id}`, formData);
      } else {
        await API.post("/customers", formData);
      }
      setShowModal(false);
      fetchCustomers();
    } catch (error) {
      console.error("Error saving customer:", error);
    }
  };

  // Delete Customer
  const handleDelete = async (id) => {
    try {
      await API.delete(`/customers/${id}`);
      fetchCustomers();
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  // Pagination & Filtering
  const filteredCustomers = customers.filter((customer) =>
    customer.CustomerName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const totalPages = Math.ceil(filteredCustomers.length / entriesPerPage);
  const displayedCustomers = filteredCustomers.slice((currentPage - 1) * entriesPerPage, currentPage * entriesPerPage);

  return (
    <div className="flex flex-col h-screen">
      <div className="bg-blue-900 p-6 text-white text-2xl font-semibold">Customer Dashboard</div>
      <div className="flex-1 p-6 bg-gray-100 text-gray-800">
        
        {/* Search & Add Button */}
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            className="px-4 py-2 border border-gray-300 rounded-md w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-900"
            placeholder="🔍 Search Customers"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-700" onClick={handleOpenAddModal}>
            ➕ Add Customer
          </button>
        </div>

        {/* Customer Table */}
        <div className="bg-white shadow-lg rounded-lg p-4">
          <table className="w-full border-collapse text-gray-700">
            <thead>
              <tr className="bg-blue-900 text-white">
                <th className="p-4">Customer Name</th>
                <th className="p-4">Preferences</th>
                <th className="p-4">Phone Number</th>
                <th className="p-4">Purchase History</th>
                <th className="p-4">Nominee</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayedCustomers.map((customer) => (
                <tr key={customer._id} className="border-t hover:bg-gray-100">
                  <td className="p-4">{customer.CustomerName}</td>
                  <td className="p-4">{customer.preferences}</td>
                  <td className="p-4">{customer.PhoneNumber}</td>
                  <td className="p-4">{customer.purchaseHistory}</td>
                  <td className="p-4">{customer.Nominee}</td>
                  <td className="p-4 text-center">
                    <button className="text-blue-500 mr-2 hover:text-blue-700" onClick={() => handleOpenEditModal(customer)}>✏ Edit</button>
                    <button className="text-red-500 hover:text-red-700" onClick={() => handleDelete(customer._id)}>🗑 Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4">
          <span>Showing {customers.length ? (currentPage - 1) * entriesPerPage + 1 : 0} to {Math.min(currentPage * entriesPerPage, filteredCustomers.length)} of {filteredCustomers.length} entries</span>
          <div>
            <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50">Prev</button>
            <span className="px-4">{currentPage} / {totalPages}</span>
            <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50">Next</button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">{isEditing ? "Edit Customer" : "Add New Customer"}</h2>
            <form onSubmit={handleSaveCustomer} className="space-y-4">
              {["CustomerName", "preferences", "purchaseHistory", "Nominee"].map((field) => (
                <input
                  key={field}
                  type="text"
                  name={field}
                  placeholder={field.replace(/([A-Z])/g, " $1").trim()}
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              ))}
              <input
                type="text"
                name="PhoneNumber"
                placeholder="Phone Number"
                value={formData.PhoneNumber}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
                  setFormData({ ...formData, PhoneNumber: value });
                }}
                className="w-full p-2 border rounded"
                required
              />
              <div className="flex justify-between">
                <button type="button" onClick={() => setShowModal(false)} className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">{isEditing ? "Update" : "Save"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerDashboard;
