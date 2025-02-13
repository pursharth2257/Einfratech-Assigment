import React from 'react';

function Services() {
  return (
    <div className="container mt-5 pt-5">
      <h1 className="text-center mb-4 text-white">OUR SERVICES</h1>

      
      <section>
        <p className="text-center text-white">
        At Pursharth Eatz, we offer a range of services designed to elevate your dining experience. Whether you’re looking for catering, special events, or customized menu options, we have something for everyone.
        </p>
      </section>

    
      <section className="my-5">
        <div className="row">
         
          <div className="col-md-4">
            <div className="card">
              <img src="custom-cattering.jpg" className="card-img-top" alt="Custom Travel Packages" />
              <div className="card-body">
                <h5 className="card-title">Custom Catering</h5>
                <p className="card-text">Tailor your menu to your taste. We’ll create a personalized catering experience for your events, from corporate gatherings to weddings.</p>
                <a href="#" className="btn btn-primary">Learn More</a>
              </div>
            </div>
          </div>

         
          <div className="col-md-4">
            <div className="card">
              <img src="private-dining.jpg" className="card-img-top" alt="Group Tours" />
              <div className="card-body">
                <h5 className="card-title">Private Dining</h5>
                <p className="card-text">Enjoy an intimate dining experience with your loved ones. Book one of our exclusive dining rooms for a unique and memorable meal.</p>
                <a href="#" className="btn btn-primary">Learn More</a>
              </div>
            </div>
          </div>

      
          <div className="col-md-4">
            <div className="card">
              <img src="event-catering.jpg" className="card-img-top" alt="Adventure Travel" />
              <div className="card-body">
                <h5 className="card-title">Event Catering</h5>
                <p className="card-text">For your special events, we provide customized menus with delicious options that will delight your guests.</p>
                <a href="#" className="btn btn-primary">Learn More</a>
              </div>
            </div>
          </div>
        </div>
      </section>

     
      <section>
        <div className="row">
          
          <div className="col-md-4">
            <div className="card">
              <img src="gourmet.jpg" className="card-img-top" alt="Luxury Travel" />
              <div className="card-body">
                <h5 className="card-title">Gourmet Experiences</h5>
                <p className="card-text">Indulge in a culinary journey with our curated gourmet experiences, from wine pairing dinners to cooking classes.</p>
                <a href="#" className="btn btn-primary">Learn More</a>
              </div>
            </div>
          </div>

         
          <div className="col-md-4">
            <div className="card">
              <img src="food-dilivery.jpg" className="card-img-top" alt="Travel Insurance" />
              <div className="card-body">
                <h5 className="card-title">Food Delivery</h5>
                <p className="card-text">Get your favorite dishes delivered to your door, hot and fresh, with our reliable and quick delivery service.</p>
                <a href="#" className="btn btn-primary">Learn More</a>
              </div>
            </div>
          </div>

          
          <div className="col-md-4 ">
            <div className="card">
              <img src="other.avif" className="card-img-top" alt="Other Services" />
              <div className="card-body">
                <h5 className="card-title">Other Services</h5>
                <p className="card-text">Explore more options like party platters, cooking workshops, and private chef experiences tailored to your needs.</p>
                <a href="#" className="btn btn-primary">Learn More</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Services;
