import React from "react";

function About() {
  return (
    <section className="p-8 text-center bg-gray-50 dark:bg-gray-900 dark:text-white">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white">About Us</h1>
      <p className="mt-4 text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
        We are a forward-thinking IT solutions provider specializing in modern technologies that help businesses scale and innovate. Our team is committed to delivering excellence and ensuring client success.
      </p>

      <div className="mt-8 flex justify-center">
        <video className="w-full max-w-3xl rounded-lg shadow-lg" 
          autoPlay 
          loop 
          muted 
          playsInline>
          <source src="/about-page-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-64">
          <h3 className="text-xl font-semibold">Mission</h3>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            To provide innovative IT solutions that drive business success and empower our clients with the tools they need to thrive.
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-64">
          <h3 className="text-xl font-semibold">Vision</h3>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            To become a leading IT provider known for exceptional quality, reliability, and customer-centric services.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;


