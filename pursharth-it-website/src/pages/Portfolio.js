import React from "react";

function Portfolio() {
  return (
    <section className="p-8 bg-white dark:bg-gray-900">
      <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white">Our Portfolio</h1>
      <p className="mt-4 text-lg text-gray-700 text-center max-w-2xl mx-auto dark:text-gray-300">
        Check out our recent projects and see how we’ve helped clients achieve their goals with innovative IT solutions.
      </p>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-gray-50 p-6 rounded-lg shadow-lg dark:bg-gray-800 dark:text-white">
          <img src="/project1.png" alt="Project 1" className="w-full h-60 object-cover rounded-md" />
          <h3 className="text-xl font-semibold mt-4">Portfolio Website</h3>
          <p className="mt-2 text-gray-600 dark:text-gray-300">My portfolio showcases a collection of my best work, including web development projects, AI solutions, and cloud computing services. It reflects my skills, creativity, and dedication to delivering high-quality IT solutions that drive business success.</p>
        </div>
        <div className="bg-gray-50 p-6 rounded-lg shadow-lg dark:bg-gray-800 dark:text-white">
          <img src="/project2.png" alt="Project 2" className="w-full h-60 object-cover rounded-md" />
          <h3 className="text-xl font-semibold mt-4">Movie API</h3>
          <p className="mt-2 text-gray-600 dark:text-gray-300">My Movie API portfolio demonstrates my ability to build dynamic applications that provide real-time access to movie data, including details like ratings, genres, cast, and reviews. It showcases my skills in API integration, data handling, and creating seamless user experiences for movie enthusiasts.</p>
        </div>
        <div className="bg-gray-50 p-6 rounded-lg shadow-lg dark:bg-gray-800 dark:text-white">
          <img src="/project3.jpeg" alt="Project 3" className="w-full h-60 object-cover rounded-md" />
          <h3 className="text-xl font-semibold mt-4">Project 3</h3>
          <p className="mt-2 text-gray-600 dark:text-gray-300">SMy Cloud Computing project showcases a scalable and secure cloud infrastructure designed to optimize business operations. It highlights my expertise in cloud services, ensuring flexibility, cost-efficiency, and enhanced security for enterprise solutions.</p>
        </div>
      </div>
    </section>
  );
}

export default Portfolio;
