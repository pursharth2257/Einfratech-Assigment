import React from 'react';

function AboutUs() {
  return (
    <div className="container mt-5 pt-5">
      <h1 className="text-center mb-4 about-us-heading">ABOUT US</h1>
      
      <section>
        <h2 className="text-center mb-4">Our Mission</h2>
        <p className="text-center text-white">
          At Pursharth Travel, we specialize in curating unforgettable travel experiences. Our team of experts is dedicated to providing personalized itineraries that cater to your every need. Whether you're seeking adventure, relaxation, or culture, we’ve got you covered.
        </p>
      </section>

      <section className="my-5">
        <h2 className="text-center mb-4">Our Story</h2>
        <p className="text-center text-white">
          Founded in 2010, Pursharth Travel began with a passion for travel and a vision to make exploring the world more accessible. Over the years, we have worked tirelessly to build strong relationships with global travel partners, ensuring that our clients have access to the best experiences.
        </p>
      </section>

      <section>
        <h2 className="text-center mb-4">Why Choose Us?</h2>
        <div className="row">
          <div className="col-md-4">
            <div className="card">
              <img src="quality.jpg" className="card-img-top" alt="Quality" />
              <div className="card-body">
                <h5 className="card-title">Quality</h5>
                <p className="card-text">We only partner with top-tier resorts, hotels, and tour operators to ensure you receive the best service and quality on your trip.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <img src="personalized-itineraries.jpg" className="card-img-top" alt="Personalized" />
              <div className="card-body">
                <h5 className="card-title">Personalized Itineraries</h5>
                <p className="card-text">We work with you to create a trip tailored to your specific preferences and needs, from adventurous excursions to relaxation-focused escapes.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <img src="24-support.avif" className="card-img-top" alt="Support" />
              <div className="card-body">
                <h5 className="card-title">24/7 Support</h5>
                <p className="card-text">Our team is always available to assist you with anything you need, from last-minute requests to travel updates.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
    </div>
  );
}

export default AboutUs;
