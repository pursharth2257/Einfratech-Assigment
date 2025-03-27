import React from 'react';
import AboutUs1 from '../../assets/AboutUs1.jpg'

const AboutUs = () => {
  return (
    <div id="about" className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 pl-10 pr-10 md:grid-cols-2 gap-8 items-center">
          <div className='img mr-10'>
            <img
              src={AboutUs1}
              alt="About Us"
              className="rounded-lg shadow-md w-full h-auto"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://via.placeholder.com/400x300?text=About+Us";
              }}
            />
          </div>
          <div>
            {/* About Us Title */}
            <div className="mb-6" >
              <div className="inline-flex items-center px-6 py-3 bg-[#dff7f7] text-black font-bold text-xl rounded-xl shadow-lg">
                About Us👥
              </div>
            </div>

            <p className="text-gray-600 mb-4">
              Welcome to [Company Name], the creators of the Web-Based ERP for
              Leads and Sales Management. Our mission is to simplify and
              streamline business processes, helping companies like yours
              achieve greater efficiency and success.
            </p>
            <h3 className="text-xl font-semibold text-red-600 mb-2">
              Our Mission:🎯
            </h3>
            <p className="text-gray-600 mb-2">
              To empower businesses with innovative tools that enhance lead
              management, sales tracking, and customer engagement.
            </p>
            <h3 className="text-xl font-semibold text-red-600 mb-2">
              Our Vision:🔭
            </h3>
            <p className="text-gray-600">
              To become the leading ERP solution for businesses seeking to
              optimize their operations and drive growth.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;