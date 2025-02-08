import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import Contact from "./pages/Contact";
import Chatbot from "./components/Chatbot";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
   
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    document.body.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <Router>
      <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
        <Navbar toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
        <main>
          <Routes>
            <Route path="/" element={<Home isDarkMode={isDarkMode} />} />
            <Route path="/about" element={<About isDarkMode={isDarkMode} />} />
            <Route path="/services" element={<Services isDarkMode={isDarkMode} />} />
            <Route path="/portfolio" element={<Portfolio isDarkMode={isDarkMode} />} />
            <Route path="/contact" element={<Contact isDarkMode={isDarkMode} />} />
          </Routes>
        </main>
        <Chatbot />
        <Footer />
      </div>
    </Router>
  );
}

export default App;

