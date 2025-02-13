import React from 'react';

function AboutUs() {
  return (
    <div className="container mt-5 pt-5">
      <h1 className="text-center mb-4 about-us-heading">ABOUT US</h1>
      
      <section>
        <h2 className="text-center mb-4">Our Mission</h2>
        <p className="text-center text-white">
        At Pursharth Eatz, we specialize in bringing you authentic and mouth-watering culinary experiences. Our team is dedicated to curating personalized menus that cater to your tastes and preferences. Whether you're craving traditional flavors, street food, or gourmet dishes, we’ve got something for every palate.
        </p>
      </section>

      <section className="my-5">
        <h2 className="text-center mb-4">Our Story</h2>
        <p className="text-center text-white">
        Founded in 2010, Pursharth Eatz began with a passion for authentic cuisine and a vision to bring the best flavors to every table. Over the years, we’ve worked tirelessly to source the finest ingredients and build strong partnerships with local chefs, ensuring that our customers always have access to the most delightful and fresh dishes.
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
                <p className="card-text">We only partner with the best local farms, suppliers, and chefs to ensure every dish is made with the highest quality ingredients and authentic flavors.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <img src="personalized.jpg" className="card-img-top" alt="Personalized" />
              <div className="card-body">
                <h5 className="card-title">Personalized</h5>
                <p className="card-text">Custom Menu.
                    We work with you to create a menu tailored to your specific preferences and dietary needs, from casual bites to gourmet feasts.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <img src="24-support.jpg" className="card-img-top" alt="Support" />
              <div className="card-body">
                <h5 className="card-title">24/7 Support</h5>
                <p className="card-text">Our team is always available to assist you with anything you need, from last-minute orders to catering inquiries.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
    </div>
  );
}

export default AboutUs;