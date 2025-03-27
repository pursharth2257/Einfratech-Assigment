import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white p-4 mt-10">
      <div className="container mx-auto flex justify-between">
        <div className="flex flex-col items-start">
          <p className="font-semibold text-lg">Einfratech System India</p>
          <p className="text-sm mt-1">© Copyright Einfratech System India. All Rights Reserved</p>
        </div>
        <div className="flex space-x-4">
          <a href="#" className="text-gray-400 hover:text-white">Terms</a>
          <a href="#" className="text-gray-400 hover:text-white">Privacy</a>
          <a href="#" className="text-gray-400 hover:text-white">Disclaimer</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
