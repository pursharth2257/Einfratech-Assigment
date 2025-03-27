import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import herosection from "../../assets/herosection.jpg";
import logo from "../../assets/logoelnfra.webp";

const HeroSection = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = (e) => {
    const target = e.target.getAttribute("href");
    const element = document.querySelector(target);

    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
    e.preventDefault();
  };

  useEffect(() => {
    document.documentElement.style.scrollPaddingTop = "64px";
    return () => {
      document.documentElement.style.scrollPaddingTop = "0";
    };
  }, []);

  return (
    <>
      <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <div className="flex-shrink-0 pl-0">
              <a href="/" className="flex items-center">
                <img src={logo} alt="Company Logo" className="h-16 w-auto object-contain" />
              </a>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex space-x-8">
              <a href="#home" onClick={handleNavClick} className="text-gray-800 hover:text-blue-600 font-medium">
                Home
              </a>
              <a href="#about" onClick={handleNavClick} className="text-gray-800 hover:text-blue-600 font-medium">
                About Us
              </a>
              <a href="#metrics" onClick={handleNavClick} className="text-gray-800 hover:text-blue-600 font-medium">
                Key Metrics
              </a>
              <a href="#features" onClick={handleNavClick} className="text-gray-800 hover:text-blue-600 font-medium">
                Features
              </a>
            </div>

            {/* Desktop Sign In & Sign Up */}
            <div className="hidden md:flex space-x-4">
              <button onClick={() => navigate("/login")} className="bg-blue-100 text-blue-600 px-4 py-2 rounded-md">
                Sign In
              </button>
              <button onClick={() => navigate("/register")} className="bg-blue-600 text-white px-4 py-2 rounded-md">
                Sign Up
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={toggleMenu} className="text-gray-900 focus:outline-none">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className={`md:hidden ${isMenuOpen ? "block" : "hidden"}`}>
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="#home" onClick={handleNavClick} className="block px-3 py-2 text-gray-800 hover:text-blue-600 font-medium">
                Home
              </a>
              <a href="#about" onClick={handleNavClick} className="block px-3 py-2 text-gray-800 hover:text-blue-600 font-medium">
                About Us
              </a>
              <a href="#metrics" onClick={handleNavClick} className="block px-3 py-2 text-gray-800 hover:text-blue-600 font-medium">
                Key Metrics
              </a>
              <a href="#features" onClick={handleNavClick} className="block px-3 py-2 text-gray-800 hover:text-blue-600 font-medium">
                Features
              </a>
              <div className="flex flex-col space-y-2 mt-4">
                <button onClick={() => navigate("/login")} className="bg-blue-100 text-blue-600 px-4 py-2 rounded-md w-full">
                  Sign In
                </button>
                <button onClick={() => navigate("/register")} className="bg-blue-600 text-white px-4 py-2 rounded-md w-full">
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Add padding to account for fixed header */}
      <div className="pt-16">
        {/* Hero Content */}
        <div id="home" className="bg-gradient-to-br from-blue-100 to-blue-200 py-8 md:py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="text-center pl-10 md:text-left">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                  Optimize for productivity reducing time spent
                </h1>
                <p className="text-base md:text-lg text-gray-600 mb-6">
                  Streamline your workflow, analyze performance, and increase team collaboration.
                </p>
                <button className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded w-full md:w-auto" onClick={() => navigate("/register")}>
                  Get Started
                </button>
              </div>
              <div className="flex justify-center mt-8 md:mt-0">
                <img src={herosection} alt="Lead Management" className="rounded-lg shadow-md w-full max-w-lg h-auto" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;

