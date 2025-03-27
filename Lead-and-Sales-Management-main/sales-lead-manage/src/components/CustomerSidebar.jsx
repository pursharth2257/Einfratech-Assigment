import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaChartLine,
  FaBox,
  FaChartBar,
  FaUsers,
  FaSignOutAlt,
  FaTimes
} from "react-icons/fa";
import React from "react";

const CustomerSidebar = ({ isSidebarOpen, setIsSidebarOpen, logout }) => {
  return (
    <>
      {/* Overlay for Mobile View (Only active when sidebar is open) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 backdrop-blur-md bg-opacity-20 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-blue-900 text-white p-6 transition-transform duration-300 z-50 
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
        <ul className="space-y-4">
          <NavItem to="/customer-dashboard" icon={<FaTachometerAlt />} label="Dashboard" exact />
          <NavItem to="/customer-dashboard/lead-management" icon={<FaChartLine />} label="Lead Management" />
          <NavItem to="/customer-dashboard/product-management" icon={<FaBox />} label="Product Management" />
          <NavItem to="/customer-dashboard/sales-management" icon={<FaChartBar />} label="Sales Management" />
          <NavItem to="/customer-dashboard/sales-report" icon={<FaUsers />} label="Sales Report" />

          {/* Logout Button */}
          <li>
            <button
              className="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-white w-full hover:bg-blue-600"
              onClick={() => {
                console.log("Logout button clicked"); // Debugging
                logout();
              }}
            >
              <FaSignOutAlt /> <span>Logout</span>
            </button>
          </li>
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
        to={onClick ? "#" : to} // Prevent navigation if it's a logout action
        end={exact}
        className={({ isActive }) =>
          `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-white ${isActive ? "bg-blue-400 font-semibold" : "hover:bg-blue-700"
          }`
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


export default CustomerSidebar;