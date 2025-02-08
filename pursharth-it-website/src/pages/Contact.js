import React from "react";

function Contact() {
  return (
    <section className="p-8 bg-gray-50 dark:bg-gray-900">
      <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white">Contact Us</h1>
      <p className="mt-4 text-lg text-gray-700 text-center max-w-2xl mx-auto dark:text-gray-300">
        Have a project in mind? Reach out to us for collaboration, inquiries, or support.
      </p>

    
      <form className="mt-6 max-w-2xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md dark:text-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-gray-700 dark:text-gray-300">Your Name</label>
            <input
              type="text"
              id="name"
              className="w-full p-3 mt-2 border-2 border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-700 dark:text-gray-300">Your Email</label>
            <input
              type="email"
              id="email"
              className="w-full p-3 mt-2 border-2 border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
        </div>
        <div className="mt-6">
          <label htmlFor="message" className="block text-gray-700 dark:text-gray-300">Your Message</label>
          <textarea
            id="message"
            rows="4"
            className="w-full p-3 mt-2 border-2 border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          ></textarea>
        </div>
        <button className="mt-6 px-8 py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition duration-300 dark:bg-teal-600 dark:hover:bg-teal-500">
          Send Message
        </button>
      </form>


      <div className="mt-8">
        <h2 className="text-2xl text-center text-gray-900 dark:text-white">Our Location</h2>
        <div className="mt-4">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62239.35697276339!2d77.61550395!3d12.912139999999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae151c9d05f3c7%3A0x7b69aa7e2c0418cd!2sHSR%20Layout%2C%20Bengaluru%2C%20Karnataka%2C%20India!5e0!3m2!1sen!2sin!4v1706301453151!5m2!1sen!2sin"
            width="100%" 
            height="400" 
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            title="HSR Layout, Bangalore"
          ></iframe>
        </div>
      </div>
    </section>
  );
}

export default Contact;

