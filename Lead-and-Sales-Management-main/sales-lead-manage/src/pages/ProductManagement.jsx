import { useState, useEffect } from "react";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import axios from "../api/axios"; // Importing the Axios instance
import React from "react";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    status: "sell",
    rating: "",
  });
  const [editProduct, setEditProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 5;

  const totalEntries = products.length;
  const totalPages = Math.ceil(totalEntries / entriesPerPage);
  const startEntry = (currentPage - 1) * entriesPerPage;
  const endEntry = Math.min(startEntry + entriesPerPage, totalEntries);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/products");
        setProducts(response.data);
        console.log(response);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
      
    };

    fetchProducts();
  }, []);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleInputChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleEditChange = (e) => {
    setEditProduct({ ...editProduct, [e.target.name]: e.target.value });
  };

  const addProduct = async () => {
    if (newProduct.name && newProduct.description && newProduct.price && newProduct.stock && newProduct.rating) {
      try {
        const response = await axios.post("/products", newProduct);
        setProducts([...products, response.data]);
        setNewProduct({ name: "", description: "", price: "", stock: "", rating: "" });
        setShowForm(false);
      } catch (error) {
        console.error("Error adding product:", error.response ? error.response.data : error.message);
        alert("Failed to add product. Please check the server logs.");
      }
    } else {
      alert("Please fill all fields!");
    }
  };
  
  const saveEditedProduct = async () => {
    try {
      const response = await axios.put(`/${editProduct._id}`, editProduct);
      setProducts(products.map((p) => (p._id === editProduct._id ? response.data : p)));
      setEditProduct(null);
      setShowForm(false);
    } catch (error) {
      console.error("Error saving edited product:", error);
    }
  };
  
  const deleteProduct = async (_id) => {
    // console.log(_id);
    if (!_id) {
      console.error("Error: Product ID is missing");
      return;
    }
  
    try {
      console.log("Deleting product with ID:", _id);
      await axios.delete(`/${_id}`); // Correct URL
      setProducts(products.filter((product) => product._id !== _id));
    } catch (error) {
      console.error("Error deleting product:", error.response?.data || error.message);
    }
  };

  // const deleteProduct = async (_id) => {
  //   if (!_id) {
  //     console.error("Error: Product ID is missing");
  //     return;
  //   }
  
  //   try {
  //     console.log("Deleting product with ID:", _id);
      
  //     // Make sure the API URL includes the correct base path
  //     await axios.delete(`http://localhost:5000/api/products/${_id}`);
      
  //     // Filter out the deleted product from the state
  //     setProducts(products.filter((product) => product._id !== _id));
  //   } catch (error) {
  //     console.error("Error deleting product:", error.response?.data || error.message);
  //   }
  // };
  
  

  const openEditBox = (product) => {
    setEditProduct(product);
    setShowForm(true);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayedProducts = filteredProducts.slice(startEntry, endEntry);

  return (
    <div className="bg-white rounded-lg shadow-lg w-full">
      {/* Header */}
      <div className="flex justify-between items-center bg-blue-900 mb-6 border-b p-8">
        <h2 className="text-2xl text-white">Product Management</h2>
      </div>

      {/* Search Bar */}
      <div className="flex justify-between items-center mb-4 px-4">
        <input
          type="text"
          placeholder="Search product..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded w-1/3"
        />
        <button onClick={() => setShowForm(true)} className="bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          ➕ Add Product
        </button>
      </div>

      {/* Product Table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-blue-900 text-white text-left">
              <th className="p-6 border">Product</th>
              <th className="p-6 border">Description</th>
              <th className="p-6 border">Price</th>
              <th className="p-6 border">Stock</th>
              <th className="p-6 border">Rating</th>
              <th className="p-6 border text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
  {displayedProducts.map((product) => (
    <tr key={product._id} className="text-center text-gray-800 hover:bg-gray-200">
      <td className="p-6 border">{product.name || "null"}</td>
      <td className="p-6 border">{product.description || "null"}</td>
      <td className="p-6 border">${product.price !== undefined ? product.price : "null"}</td>
      <td className="p-6 border">{product.stock !== undefined ? product.stock : "null"}</td>
      <td className="p-6 border">{product.rating || "null"}</td>
      <td className="p-6 border flex justify-center space-x-3">
        <button
          className="text-blue-500 mr-2 hover:text-blue-700 transition"
          onClick={() => openEditBox(product)}
        >
          ✏ Edit
        </button>
        <button
          className="text-red-500 hover:text-red-700 transition"
          onClick={() => deleteProduct(product._id)}
        >
          🗑 Delete
        </button>
      </td>
    </tr>
  ))}
</tbody>

        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4 px-4">
        <span>Showing {startEntry + 1} to {endEntry} of {totalEntries} entries</span>
        <div>
          <button onClick={goToPrevPage} disabled={currentPage === 1} className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50">
            Prev
          </button>
          <span className="px-4">{currentPage} / {totalPages}</span>
          <button onClick={goToNextPage} disabled={currentPage === totalPages} className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50">
            Next
          </button>
        </div>
      </div>

      {/* Add/Edit Product Form Modal */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50">
          <div className="p-6 bg-white rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              {editProduct ? "Edit Product" : "Add Product"}
            </h2>
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={editProduct ? editProduct.name : newProduct.name}
              onChange={editProduct ? handleEditChange : handleInputChange}
              className="border p-2 rounded w-full mb-2"
            />
            <input
              type="text"
              name="description"
              placeholder="Product Description"
              value={editProduct ? editProduct.description : newProduct.description}
              onChange={editProduct ? handleEditChange : handleInputChange}
              className="border p-2 rounded w-full mb-2"
            />
            <input
              type="text"
              name="price"
              placeholder="Product Price"
              value={editProduct ? editProduct.price : newProduct.price}
              onChange={editProduct ? handleEditChange : handleInputChange}
              className="border p-2 rounded w-full mb-2"
            />
            <input
              type="text"
              name="stock"
              placeholder="Product Stock"
              value={editProduct ? editProduct.stock : newProduct.stock}
              onChange={editProduct ? handleEditChange : handleInputChange}
              className="border p-2 rounded w-full mb-2"
            />
            <input
              type="text"
              name="rating"
              placeholder="Product Rating"
              value={editProduct ? editProduct.rating : newProduct.rating}
              onChange={editProduct ? handleEditChange : handleInputChange}
              className="border p-2 rounded w-full mb-2"
            />
            <div className="flex justify-end space-x-4">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                onClick={editProduct ? saveEditedProduct : addProduct}
              >
                {editProduct ? "Save" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;
