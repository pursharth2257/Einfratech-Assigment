import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaChartLine,
  FaChartBar,
  FaMoneyBillWave,
  FaMapMarkedAlt,
  FaNetworkWired,
  FaBox,
  FaSignOutAlt,
  FaTimes
} from "react-icons/fa";
import React from "react";

const AdminSidebar = ({ isSidebarOpen, setIsSidebarOpen, logout }) => {
  return (
    <>
      {/* Overlay for Mobile View (Blur Background) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 backdrop-blur-md bg-opacity-20 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-blue-900 text-white p-6 transition-transform duration-300 z-50 
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Close Button for Mobile */}
        <button
          className="md:hidden absolute top-4 right-4 text-white"
          onClick={() => setIsSidebarOpen(false)}
        >
          <FaTimes size={24} />
        </button>

        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
          <img src="./src/assets/dummy-logo.png" alt="Logo" className="h-10 w-10" />
          <h1 className="text-lg font-bold">ERP</h1>
        </div>

        {/* Navigation Links */}
        <ul className="space-y-4 overflow-y-auto h-[calc(100vh-100px)]">
          <NavItem to="/admin-dashboard" icon={<FaTachometerAlt />} label="Dashboard" />
          <NavItem to="/admin-dashboard/sales-reports" icon={<FaChartBar />} label="Sales Report" />
          <NavItem to="/admin-dashboard/taxation-details" icon={<FaMoneyBillWave />} label="Taxation Details" />
          <NavItem to="/admin-dashboard/currency-revenue" icon={<FaChartLine />} label="Currency & Revenue Management" />
          <NavItem to="/admin-dashboard/buyer-density-map" icon={<FaMapMarkedAlt />} label="Buyers' Density Map" />
          <NavItem to="/admin-dashboard/referral-tracking" icon={<FaNetworkWired />} label="Referral Sales Tracking" />
          <NavItem to="/admin-dashboard/product-analytics" icon={<FaBox />} label="Product Performance" />

          {/* Logout Button */}
          <NavItem
            to="/login" // Prevents unwanted navigation
            icon={<FaSignOutAlt />}
            label="Logout"
            onClick={() => {
              console.log("Logout button clicked"); // Debugging step
              logout();
            }}
          />
        </ul>
      </div>
    </>
  );
};

// Sidebar Navigation Item Component
const NavItem = ({ to, icon, label, exact, onClick }) => {
  return (
    <li>
      <NavLink
        to={to}
        end // Ensures only exact matches apply the active class
        className={({ isActive, isPending }) =>
          `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-white ${
            isActive ? "bg-blue-400 font-semibold" : "hover:bg-blue-700"
          } ${isPending ? "opacity-50" : ""}`
        }
        onClick={(e) => {
          if (onClick) {
            e.preventDefault(); // Prevent default behavior for logout
            onClick(); // Call logout function
          }
        }}
      >
        {icon} <span>{label}</span>
      </NavLink>
    </li>
  );
};


export default AdminSidebar;