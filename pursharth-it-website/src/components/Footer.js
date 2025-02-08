import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-lg mb-4">
          &copy; 2025 EINFRATECH SYSTEM. All rights reserved.
        </p>
        <div className="flex justify-center space-x-6 text-xl">
          <a href="https://www.linkedin.com" className="hover:text-teal-500">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="https://twitter.com" className="hover:text-teal-500">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://www.facebook.com" className="hover:text-teal-500">
            <i className="fab fa-facebook-f"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

