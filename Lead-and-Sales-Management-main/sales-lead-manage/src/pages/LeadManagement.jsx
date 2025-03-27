import { useEffect, useState } from "react";
import React from "react";
import API from "../api/axios"; // Import API instance

const LeadManagement = () => {
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [leads, setLeads] = useState([]);
  const [newLead, setNewLead] = useState({
    name: "",
    product: "",
    assignedTo: "",
    status: "",
    dateAdded: "",
    source: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 5;

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await API.get("/leads");
        console.log(response);
        setLeads(response.data);
      } catch (error) {
        console.error("Error fetching leads:", error);
      }
    };
    fetchLeads();
  }, []);

  const totalEntries = leads.length;
  const totalPages = totalEntries > 0 ? Math.ceil(totalEntries / entriesPerPage) : 1;
  const startEntry = (currentPage - 1) * entriesPerPage;
  const endEntry = Math.min(startEntry + entriesPerPage, totalEntries);
  const displayedLeads = leads.slice(startEntry, endEntry);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const filteredLeads = displayedLeads.filter((lead) =>
    lead.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log("Filtered leads:", filteredLeads);

  const handleAddOrUpdateLead = async (e) => {
    e.preventDefault();
    console.log("Submitting lead:", newLead);

    try {
      if (editingId) {
        // Update existing lead
        const response = await API.put(`leads/${editingId}`, newLead);
        console.log("Update response:", response.data);
        setLeads(leads.map((lead) => (lead._id === editingId ? { ...lead, ...newLead } : lead)));
      } else {
        // Create a new lead
        const response = await API.post("leads/create", newLead);
        console.log("Create response:", response.data);

        if (response.data && response.data._id) {
          setLeads([...leads, response.data]);
        } else {
          console.error("New lead response does not contain _id:", response.data);
        }
      }

      // Reset form and close modal
      setNewLead({ name: "", product: "", assignedTo: "", status: "", dateAdded: "", source: "" });
      setEditingId(null);
      setShowModal(false);
    } catch (error) {
      console.error("Error adding or updating lead:", error.response ? error.response.data : error);
    }
  };


  const handleDelete = async (_id) => {
    try {
      await API.delete(`leads/${_id}`);
      setLeads(leads.filter((lead) => lead._id !== _id));
    } catch (error) {
      console.error("Error deleting lead:", error);
    }
  };

  const handleEdit = (_id) => {
    const editedLead = leads.find((lead) => lead._id === _id);
    setNewLead({ ...editedLead });
    setEditingId(_id);
    setShowModal(true);
  };


  return (
    <div className="flex flex-col h-screen">
      <div className="bg-blue-900 p-8 text-white text-2xl font-semibold">Lead Management</div>
      <div className="flex-1 p-6 bg-gray-100 text-gray-800">
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            className="px-4 py-2 border border-gray-300 rounded-md w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-900"
            placeholder="🔍 Search Leads"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-700 transition"
            onClick={() => {
              setShowModal(true);
              setEditingId(null);
              setNewLead({ name: "", product: "", assignedTo: "", status: "", dateAdded: "", source: "" });
            }}
          >
            ➕ Add Lead
          </button>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-4">
          <table className="w-full border-collapse text-gray-700">
            <thead>
              <tr className="bg-blue-900 text-white text-left">
                <th className="p-4">Lead Name</th>
                <th className="p-4">Product</th>
                <th className="p-4">Assigned To</th>
                <th className="p-4">Status</th>
                <th className="p-4">Date Added</th>
                <th className="p-4">Lead Source</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.length > 0 ? (
                filteredLeads.map((lead) => (
                  <tr key={lead._id} className="border-t hover:bg-gray-100 transition">
                    <td className="p-4">{lead.name || "N/A"}</td>
                    <td className="p-4">{lead.product || "N/A"}</td>
                    <td className="p-4">{lead.assignedTo || "N/A"}</td>
                    <td className="p-4">{lead.status || "N/A"}</td>
                    <td className="p-4">{new Date(lead.createdAt).toLocaleDateString()}</td>
                    <td className="p-4">{lead.leadsource || "N/A"}</td>
                    <td className="p-4 text-center">
                      <button className="text-blue-500 mr-2 hover:text-blue-700 transition" onClick={() => handleEdit(lead._id)}>✏ Edit</button>
                      <button className="text-red-500 hover:text-red-700 transition" onClick={() => handleDelete(lead._id)}>🗑 Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center p-6">No leads available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-4">
          <span>Showing {startEntry + 1} to {endEntry} of {totalEntries} entries</span>
          <div>
            <button onClick={goToPrevPage} disabled={currentPage === 1} className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50">Prev</button>
            <span className="px-4">{currentPage} / {totalPages}</span>
            <button onClick={goToNextPage} disabled={currentPage === totalPages} className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50">Next</button>
          </div>
        </div>
      </div>

      {showModal && !editingId && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Add Lead</h2>
            <form onSubmit={handleAddOrUpdateLead}>
              <input
                type="text"
                value={newLead.name}
                onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
                placeholder="Lead Name"
                className="border p-2 mb-2 w-full"
              />
              <input
                type="text"
                value={newLead.product}
                onChange={(e) => setNewLead({ ...newLead, product: e.target.value })}
                placeholder="Product"
                className="border p-2 mb-2 w-full"
              />
              <input
                type="text"
                value={newLead.assignedTo}
                onChange={(e) => setNewLead({ ...newLead, assignedTo: e.target.value })}
                placeholder="Assigned To"
                className="border p-2 mb-2 w-full"
              />
              <select
                value={newLead.status}
                onChange={(e) => setNewLead({ ...newLead, status: e.target.value })}
                className="border p-2 mb-2 w-full"
              >
                <option value="">Select One</option>
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Qualified">Qualified</option>
                <option value="Converted">Converted</option>
                <option value="Lost">Lost</option>
              </select>

              <input
                type="text"
                value={newLead.leadsource}
                onChange={(e) => setNewLead({ ...newLead, leadsource: e.target.value })}
                placeholder="Lead Source"
                className="border p-2 mb-2 w-full"
              />

              <div className="flex justify-between mt-4">
                <button type="button" className="bg-gray-400 text-white px-4 py-2 rounded-md" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md">
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showModal && editingId && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Edit Lead</h2>
            <form onSubmit={handleAddOrUpdateLead}>
              <input
                type="text"
                value={newLead.name}
                onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
                placeholder="Lead Name"
                className="border p-2 mb-2 w-full"
              />
              <input
                type="text"
                value={newLead.product}
                onChange={(e) => setNewLead({ ...newLead, product: e.target.value })}
                placeholder="Product"
                className="border p-2 mb-2 w-full"
              />
              <input
                type="text"
                value={newLead.assignedTo}
                onChange={(e) => setNewLead({ ...newLead, assignedTo: e.target.value })}
                placeholder="Assigned To"
                className="border p-2 mb-2 w-full"
              />
              <select
                value={newLead.status}
                onChange={(e) => setNewLead({ ...newLead, status: e.target.value })}
                className="border p-2 mb-2 w-full"
              >
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Qualified">Qualified</option>
                <option value="Converted">Converted</option>
                <option value="Lost">Lost</option>
              </select>

              <input
                type="text"
                value={newLead.leadsource}
                onChange={(e) => setNewLead({ ...newLead, leadsource: e.target.value })}
                placeholder="Lead Source"
                className="border p-2 mb-2 w-full"
              />
              <div className="flex justify-between mt-4">
                <button type="button" className="bg-gray-400 text-white px-4 py-2 rounded-md" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}


    </div>
  );
};

export default LeadManagement;
