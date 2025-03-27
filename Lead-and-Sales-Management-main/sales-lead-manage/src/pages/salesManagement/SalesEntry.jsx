
import { useState, useEffect, useCallback } from "react";
import { Search, Plus } from "react-feather";
import API from "../../api/axios"; // Adjust path based on your structure
import React from "react";

const SalesEntry = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ title: "", type: "", pricePerItem: "", totalStock: "" });
  const [editItem, setEditItem] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [loading, setLoading] = useState(false);

  // Pagination states
  const entriesPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter and pagination logic
  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / entriesPerPage));
  const startIndex = (currentPage - 1) * entriesPerPage;
  const visibleItems = filteredItems.slice(startIndex, startIndex + entriesPerPage);

  // Fetch items from the backend
  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const response = await API.get("/sales/getSales");
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching items", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prev) => ({
      ...prev,
      [name]: name === "price" || name === "totalStock" ? Number(value) : value,
    }));
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditItem((prev) => ({
      ...prev,
      [name]: name === "pricePerItem" || name === "totalStock" ? Number(value) : value,
    }));
  };

  // Open modals
  const handleOpenAddModal = () => {
    setNewItem({ title: "", type: "", pricePerIteam: "", totalStock: "" });
    setShowAddModal(true);
  };

  const handleOpenEditModal = (item) => {
    setEditItem({ ...item });
    setShowEditModal(true);
  };

  const handleOpenDeleteModal = (item) => {
    setItemToDelete(item);
    setShowDeleteModal(true);
  };

  // Close modals
  const handleCloseModals = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    setShowDeleteModal(false);
  };

  // Add New Item
  const handleAddItem = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post("/sales/createSale", newItem);
      fetchItems(); // Refresh the list
      handleCloseModals();
    } catch (error) {
      console.error("Error adding item:", error.response ? error.response.data : error);
    } finally {
      setLoading(false);
    }
  };

  // Save Edited Item
  const handleSaveEdit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.put(`/sales/editSale/${editItem.itemId}`, editItem);
      fetchItems(); // Re-fetch data
      handleCloseModals();
    } catch (error) {
      console.error("Error saving item:", error);
    } finally {
      setLoading(false);
    }
  };

  // Confirm Delete
  const handleDelete = async (itemId) => {
    try {
      await API.delete(`/sales/deleteSale/${itemId}`);
      fetchItems();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-blue-900 text-white py-6 px-8 shadow-lg w-full">
        <h1 className="text-2xl font-bold">Sales Entry</h1>
      </div>

      {/* Toolbar */}
      <div className="p-6 flex justify-between items-center">
        {/* Search Box */}
        <div className="relative w-80">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
          <input
            type="text"
            placeholder="Search items..."
            className="pl-12 pr-4 py-3 border rounded-md w-full text-lg"
            onChange={(e) => setSearchTerm(e.target.value)} // Set search term for filtering
          />
        </div>

        {/* Add New Item Button */}
        <button className="bg-blue-900 text-white px-6 py-3 rounded-md flex items-center" onClick={handleOpenAddModal}>
          <Plus size={20} className="mr-2" /> Add New Item
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto p-6">
        <table className="w-full border-collapse bg-white shadow-md rounded-lg">
          <thead className="bg-blue-900 text-white">
            <tr className="text-left">
              <th className="p-6">Item ID</th>
              <th className="p-6">Title</th>
              <th className="p-6">Type</th>
              <th className="p-6">Price</th>
              <th className="p-6">Stock</th>
              <th className="p-6">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {visibleItems.map((item) => (
              <tr key={item.itemId} className="border-t hover:bg-gray-100">
                <td className="p-6">{item.itemId}</td>
                <td className="p-6">{item.title}</td>
                <td className="p-6">{item.type}</td>
                <td className="p-6">{item.pricePerItem}</td>
                <td className="p-6">{item.totalStock}</td>
                <td className="p-6 flex gap-4">
                  <button className="text-blue-500" onClick={() => handleOpenEditModal(item)}>✏ Edit</button>
                  <button className="text-red-500" onClick={() => handleDelete(item.itemId)}>🗑 Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center ml-10 mr-10 mt-4">
        <span>
          Showing {filteredItems.length ? (currentPage - 1) * entriesPerPage + 1 : 0} to{" "}
          {Math.min(currentPage * entriesPerPage, filteredItems.length)} of {filteredItems.length} entries
        </span>
        <div>
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50"
          >
            Prev
          </button>
          <span className="px-4">
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

     {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Edit Item</h2>
            <form onSubmit={handleSaveEdit}>
              <input type="text" name="title" value={editItem?.title || ""} onChange={handleEditInputChange} className="w-full mb-3 p-2 border rounded" />
              <input type="text" name="type" value={editItem?.type || ""} onChange={handleEditInputChange} className="w-full mb-3 p-2 border rounded" />
              <input type="number" name="pricePerItem" value={editItem?.pricePerItem || ""} onChange={handleEditInputChange} className="w-full mb-3 p-2 border rounded" />
              <input type="number" name="totalStock" value={editItem?.totalStock || ""} onChange={handleEditInputChange} className="w-full mb-3 p-2 border rounded" />
              <div className="flex justify-between">
                <button type="button" onClick={handleCloseModals} className="px-4 py-2 bg-gray-400 text-white rounded">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Add New Item</h2>
            <form onSubmit={handleAddItem}>
              <input type="text" name="title" placeholder="Title" value={newItem?.title || ""} onChange={handleInputChange} className="w-full mb-3 p-2 border rounded" />
              <input type="text" name="type" placeholder="Name" value={newItem?.type || ""} onChange={handleInputChange} className="w-full mb-3 p-2 border rounded" />
              <input type="number" name="pricePerItem" placeholder="Price per item" value={newItem?.pricePerItem || ""} onChange={handleInputChange} className="w-full mb-3 p-2 border rounded" />
              <input type="number" name="totalStock" placeholder="Total Stock" value={newItem?.totalStock || ""} onChange={handleInputChange} className="w-full mb-3 p-2 border rounded" />
              <div className="flex justify-between">
                <button type="button" onClick={handleCloseModals} className="px-4 py-2 bg-gray-400 text-white rounded">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
                  Add Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Are you sure you want to delete this item?</h2>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => handleDelete(itemToDelete.itemId)}
                className="px-4 py-2 bg-red-600 text-white rounded"
              >
                Yes, Delete
              </button>
              <button
                type="button"
                onClick={handleCloseModals}
                className="px-4 py-2 bg-gray-400 text-white rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesEntry;


