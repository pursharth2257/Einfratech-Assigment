import React from "react";

function Services({ isDarkMode }) {
  return (
    <section className={`p-8 transition-colors duration-300 ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      <h1 className="text-4xl font-bold text-center">Our Services</h1>
      <p className="mt-4 text-lg text-center max-w-2xl mx-auto">
        Explore the wide range of IT services we offer to help your business grow, streamline operations, and improve efficiency.
      </p>
      
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
    
        <div className={`p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
          <img src="/web-development.jpg" alt="Web Development" className="w-full h-80 object-cover rounded-md" />
          <h3 className="text-xl font-semibold mt-4">Web Development</h3>
          <p className={`mt-2 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
            Custom-built websites tailored to your business needs, with responsive design and high performance.
          </p>
        </div>

       
        <div className={`p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
          <img src="/AI.jpg" alt="AI Solutions" className="w-full h-80 object-cover rounded-md" />
          <h3 className="text-xl font-semibold mt-4">AI Solutions</h3>
          <p className={`mt-2 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
            Leverage artificial intelligence to automate processes, enhance decision-making, and create new growth opportunities.
          </p>
        </div>

 
        <div className={`p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
          <img src="/cloud-computing.jpg" alt="Cloud Computing" className="w-full h-80 object-cover rounded-md" />
          <h3 className="text-xl font-semibold mt-4">Cloud Computing</h3>
          <p className={`mt-2 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
            Secure, scalable cloud solutions to enhance your business’s flexibility and reduce infrastructure costs.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Services;
