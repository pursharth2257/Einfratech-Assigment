import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar({ toggleDarkMode, isDarkMode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gray-900 text-white p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center relative">
        <div className="text-2xl font-bold">
          <Link to="/">EINFRATECH SYSTEM</Link>
        </div>


        <div className="lg:hidden">
          <button onClick={toggleMenu} className="text-white">
            <i className={`fas ${isMenuOpen ? "fa-times" : "fa-bars"} text-2xl`} />
          </button>
        </div>


        <div
          className={`lg:hidden ${isMenuOpen ? "block" : "hidden"} absolute top-16 left-0 w-full bg-gray-900 text-white p-4 space-y-4 z-10`}
        >
          <Link
            to="/"
            className={`block hover:text-teal-500 ${location.pathname === "/" ? "text-teal-500" : ""}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={`block hover:text-teal-500 ${location.pathname === "/about" ? "text-teal-500" : ""}`}
            onClick={() => setIsMenuOpen(false)}
          >
            About Us
          </Link>
          <Link
            to="/services"
            className={`block hover:text-teal-500 ${location.pathname === "/services" ? "text-teal-500" : ""}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Services
          </Link>
          <Link
            to="/portfolio"
            className={`block hover:text-teal-500 ${location.pathname === "/portfolio" ? "text-teal-500" : ""}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Portfolio
          </Link>
          <Link
            to="/contact"
            className={`block hover:text-teal-500 ${location.pathname === "/contact" ? "text-teal-500" : ""}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </Link>


          <button onClick={toggleDarkMode} className="ml-4">
            <i className={`fas ${isDarkMode ? "fa-sun" : "fa-moon"} text-2xl`} />
          </button>
        </div>


        <div className="hidden lg:flex space-x-6">
          <Link to="/" className={`hover:text-teal-500 ${location.pathname === "/" ? "text-teal-500" : ""}`}>
            Home
          </Link>
          <Link to="/about" className={`hover:text-teal-500 ${location.pathname === "/about" ? "text-teal-500" : ""}`}>
            About Us
          </Link>
          <Link to="/services" className={`hover:text-teal-500 ${location.pathname === "/services" ? "text-teal-500" : ""}`}>
            Services
          </Link>
          <Link to="/portfolio" className={`hover:text-teal-500 ${location.pathname === "/portfolio" ? "text-teal-500" : ""}`}>
            Portfolio
          </Link>
          <Link to="/contact" className={`hover:text-teal-500 ${location.pathname === "/contact" ? "text-teal-500" : ""}`}>
            Contact
          </Link>


          <button onClick={toggleDarkMode} className="ml-4">
            <i className={`fas ${isDarkMode ? "fa-sun" : "fa-moon"} text-2xl`} />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
