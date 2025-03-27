import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import jsPDF from "jspdf";
import { autoTable } from "jspdf-autotable";
import axios from "../../api/axios"; // Import Axios instance
import React from "react";

export default function SalesReport() {
  const [selectedReport, setSelectedReport] = useState("Sales Report Generation");
  const [selectedProduct, setSelectedProduct] = useState("Select Product");
  const [quantity, setQuantity] = useState("");
  const [orderItems, setOrderItems] = useState([]);
  const [loading, setLoading] = useState(false); // To track loading state
  const [error, setError] = useState(null); // To track errors

  useEffect(() => {
    const fetchOrderItems = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/order-items"); // Fetch data from the API
        setOrderItems(response.data);
        // console.log(response);
      } catch (err) {
        setError("Failed to load order items.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderItems();
  }, []); // Empty dependency array ensures this runs once when the component mounts

  // Pagination State
  const entriesPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const totalEntries = orderItems.length;
  const totalPages = Math.ceil(totalEntries / entriesPerPage);
  const startEntry = (currentPage - 1) * entriesPerPage;
  const paginatedItems = orderItems.slice(startEntry, startEntry + entriesPerPage);

  const handleDelete = (id) => {
    setOrderItems(orderItems.filter((item) => item.id !== id));
  };

  const generatePDF = () => {
    const doc = new jsPDF();
  
    // Title
    doc.setFontSize(18);
    doc.text("Sales Report", 14, 10);
  
    // Table Content
    autoTable(doc, {
      startY: 20,
      head: [["Item", "Description", "Quantity", "Price", "Total"]],
      body: orderItems.map((item) => [
        item.itemName,
        item.description,
        item.quantity,
        `$${item.price.toFixed(2)}`,
        `$${item.total.toFixed(2)}`,
      ]),
    });
  
    // Calculate Grand Total
    const grandTotal = orderItems.reduce((sum, item) => sum + item.total, 0).toFixed(2);
  
    // Add Grand Total to the PDF
    doc.text(`Grand Total: $${grandTotal}`, 14, doc.lastAutoTable.finalY + 10); // Position after the table
  
    // Save the file
    doc.save("Sales_Report.pdf");
  };
  
  
  
  

  // Pagination Handlers
  const goToPrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const goToNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div className="min-h-screen w-full bg-gray-100 flex justify-center items-center">
      <main className="w-full max-w-[1400px]">
        <header className="flex justify-between items-center bg-blue-900 p-8 mb-6">
          <h1 className="text-2xl text-white font-bold">Sales Report</h1>
        </header>

        {/* Order Items Table */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Order Item Details</h2>

          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white text-gray-800">
                <thead className="bg-gray-200 text-gray-700 font-semibold">
                  <tr className="text-left">
                    <th className="p-4">Item</th>
                    <th className="p-4">Description</th>
                    <th className="p-4">Quantity</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedItems.map((item) => (
                    <tr key={item._id} className="border-t hover:bg-gray-50">
                      <td className="p-4">{item.itemName}</td>
                      <td className="p-4">{item.description}</td>
                      <td className="p-4">{item.quantity}</td>
                      <td className="p-4">${item.price.toFixed(2)}</td>
                      <td className="p-4 font-semibold">${item.total.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          <div className="flex justify-between items-center mt-4">
            <span>
              Showing {startEntry + 1} to {Math.min(startEntry + entriesPerPage, totalEntries)} of {totalEntries} entries
            </span>
            <div>
              <button
                onClick={goToPrevPage}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50"
              >
                Prev
              </button>
              <span className="px-4">{currentPage} / {totalPages}</span>
              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>

          {/* Total Section */}
          <div className="flex justify-between items-center gap-6 mt-8 border-t pt-6">
            <span className="text-xl font-semibold text-gray-700">Grand Total:</span>
            <span className="text-2xl font-bold text-gray-800">
              ${orderItems.reduce((sum, item) => sum + item.total, 0).toFixed(2)}
            </span>
          </div>

          {/* Print PDF Button */}
          <div className="flex justify-end mt-6">
            <button
              className="bg-purple-700 text-white px-8 py-3 rounded-lg hover:bg-purple-800 transition text-lg font-semibold"
              onClick={generatePDF}
            >
              Print PDF
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
