import React from "react";

function Contact() {
  return (
    <section className="p-5" style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}>
      <h1 className="display-4 text-center text-dark">Contact Us</h1>
      <p className="mt-3 text-lg text-center text-muted">
        Craving tasty Food?, Connect with us. 
      </p>

      <form className="mt-5 mx-auto bg-white p-5 rounded shadow-lg" style={{ maxWidth: "600px" }}>
        <div className="row">
          <div className="col-md-6">
            <label htmlFor="name" className="form-label text-black">Your Name</label>
            <input
              type="text"
              id="name"
              className="form-control"
              placeholder="Enter your name"
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="email" className="form-label text-black">Your Email</label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Enter your email"
            />
          </div>
        </div>
        <div className="mt-4">
          <label htmlFor="message" className="form-label text-black">Your Message</label>
          <textarea
            id="message"
            rows="4"
            className="form-control"
            placeholder="Write your message"
          ></textarea>
        </div>
        <button className="btn btn-primary mt-4 w-100" type="submit">
          Send Message
        </button>
      </form>

      <div className="mt-5">
        <h2 className="h4 text-center text-dark">Our Location</h2>
        <div className="mt-3">
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
