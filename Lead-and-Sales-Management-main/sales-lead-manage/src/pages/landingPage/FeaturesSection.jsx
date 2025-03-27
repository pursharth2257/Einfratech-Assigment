import React, { useState } from 'react';
import features from '../../assets/features.jpg';

const FeaturesSection = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const handleLearnMore = (feature) => {
    let content = '';
    switch(feature) {
      case 'lead':
        content = (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-red-600">Lead Management System</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Track and manage potential customer information</li>
              <li>Automated lead scoring and prioritization</li>
              <li>Lead status tracking (New, Contacted, Qualified, etc.)</li>
              <li>Follow-up reminder system</li>
              <li>Lead source analytics and reporting</li>
              <li>Custom lead categorization and tagging</li>
              <li>Email integration for lead communication</li>
              <li>Task assignment and team collaboration</li>
            </ul>
          </div>
        );
        break;
      case 'sales':
        content = (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-red-600">Sales Management System</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Track and manage sales transactions</li>
              <li>Generate and manage invoices automatically</li>
              <li>Monitor revenue and sales performance</li>
              <li>Track referral sources and commission</li>
              <li>Real-time sales analytics and reporting</li>
              <li>Customer purchase history tracking</li>
              <li>Sales target and goal monitoring</li>
              <li>Integration with payment systems</li>
            </ul>
          </div>
        );
        break;
      case 'customer':
        content = (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-red-600">Customer Management System</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Centralized customer database management</li>
              <li>Complete customer profile with nominee details</li>
              <li>Customer interaction history tracking</li>
              <li>Purchase history and preferences</li>
              <li>Customer segmentation and categorization</li>
              <li>Document management for customer records</li>
              <li>Customer feedback and satisfaction tracking</li>
              <li>Automated customer communication tools</li>
            </ul>
          </div>
        );
        break;
    }
    setModalContent(content);
    setShowModal(true);
  };

  return (
    <div id="features" className="bg-white py-16">
      <div className="container mx-auto px-4">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pl-10">
          <div className='image-featurw pr-10'>
            <img 
              src={features} 
              alt="Features Overview" 
              className="rounded-lg shadow-md w-full h-auto"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/400x300?text=Features';
              }} 
            />
          </div>
          <div>
            {/* Features Title */}
            <div className="mb-6">
              <div className="inline-flex items-center px-6 py-3 bg-[#dff7f7] text-black font-bold text-xl rounded-xl shadow-lg">
                Features🚀
              </div>
            </div>

            <div className="space-y-6">
              <div className="p-4 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold text-red-600">Lead Management:</h3>
                <p className="text-gray-600">
                  Capture, assign, and track lead effortlessly. Convert more leads into customers with our powerful tools.
                  <a 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      handleLearnMore('lead');
                    }} 
                    className="ml-2 text-blue-500 hover:text-blue-700 hover:underline inline-flex items-center"
                  >
                    Learn More🎓
                  </a>
                </p>
              </div>
              <div className="p-4 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold text-red-600">Sales Management:</h3>
                <p className="text-gray-600">
                  Record sales transactions, generate invoices, and track referrals seamlessly.
                  <a 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      handleLearnMore('sales');
                    }} 
                    className="ml-2 text-blue-500 hover:text-blue-700 hover:underline inline-flex items-center"
                  >
                    Learn More🎓
                  </a>
                </p>
              </div>
              <div className="p-4 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold text-red-600">Customer Management:</h3>
                <p className="text-gray-600">
                  Store and manage customer information with ease. Keep nominee details up-to-date.
                  <a 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      handleLearnMore('customer');
                    }} 
                    className="ml-2 text-blue-500 hover:text-blue-700 hover:underline inline-flex items-center"
                  >
                    Learn More🎓
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">

          <div className="bg-white p-8 rounded-lg max-w-2xl mx-4 relative">
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="mt-2">
              {modalContent}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeaturesSection;