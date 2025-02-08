import React from "react";

function Home() {
  return (
    <section
      className="relative flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: 'url("/home-background.jpg")' }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      <div className="z-10 text-center p-6">
        <h1 className="text-5xl font-extrabold leading-tight text-white">
          Transforming Your Business with Innovative IT Solutions
        </h1>
        <p className="mt-4 text-lg max-w-3xl mx-auto text-white">
          Harness the power of cutting-edge technology to optimize your business operations and drive success.
        </p>
        <div className="mt-6">
          <button className="px-8 py-3 bg-teal-500 text-white rounded-lg shadow-md hover:bg-teal-600 transition duration-300 mr-4">
            Get Started
          </button>
          <button className="px-8 py-3 border-2 border-teal-500 text-teal-500 rounded-lg shadow-md hover:bg-teal-500 hover:text-white transition duration-300">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}

export default Home;

