import React from "react";
import KeyMetrics from '../../assets/KeyMetrics.jpg';

const StatsSection = () => {
  return (
    <div id="metrics" className="bg-gradient-to-br from-blue-50 to-blue-100 py-16">
      <div className="container mx-auto px-4 pl-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left Text Section */}
          <div className="w-full md:w-1/2 space-y-6">
            {/* Key Metrics Title */}
            <div className="mb-6">
              <div className="inline-flex items-center px-6 py-3 bg-[#dff7f7] text-black font-bold text-xl rounded-xl shadow-lg">
                Key Metrics💰
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-red-600 flex items-center gap-2">
                Total Leads <span className="text-2xl">💸</span>
              </h3>
              <p className="text-2xl font-bold">1,234</p>
              <p className="text-gray-600">Track and manage all your leads in one place.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-red-600">Total Sales:👤</h3>
              <p className="text-2xl font-bold">$56,789</p>
              <p className="text-gray-600">Monitor your sales performance in real-time.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-red-600">Conversion Rate:📈</h3>
              <p className="text-2xl font-bold">12%</p>
              <p className="text-gray-600">Measure the success of your lead conversion efforts.</p>
            </div>
          </div>

          {/* Right Image Section */}
          <div className="w-full md:w-1/2 flex justify-center">
            <img 
              src={KeyMetrics} 
              alt="Status Overview"
              className="w-full max-w-sm rounded-lg shadow-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;