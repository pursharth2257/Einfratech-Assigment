import React from 'react';

function Services() {
  return (
    <div className="container mt-5 pt-5">
      <h1 className="text-center mb-4 text-white">OUR SERVICES</h1>

   
      <section>
        <p className="text-center text-white">
          At Pursharth Travel, we offer a range of services designed to make your travel experience seamless and unforgettable. Whether you’re looking for custom packages, group tours, or exclusive luxury experiences, we have something for everyone.
        </p>
      </section>

     
      <section className="my-5">
        <div className="row">
      
          <div className="col-md-4">
            <div className="card">
              <img src="custom-travel.jpg" className="card-img-top" alt="Custom Travel Packages" />
              <div className="card-body">
                <h5 className="card-title">Custom Travel Packages</h5>
                <p className="card-text">Tailor your journey to your desires. We’ll create a personalized itinerary that suits your travel preferences.</p>
                <a href="#" className="btn btn-primary">Learn More</a>
              </div>
            </div>
          </div>

       
          <div className="col-md-4">
            <div className="card">
              <img src="group-tour.webp" className="card-img-top" alt="Group Tours" />
              <div className="card-body">
                <h5 className="card-title">Group Tours</h5>
                <p className="card-text">Explore with friends and new companions. Join one of our exciting group tours to the world's most popular destinations.</p>
                <a href="#" className="btn btn-primary">Learn More</a>
              </div>
            </div>
          </div>

     
          <div className="col-md-4">
            <div className="card">
              <img src="adventure-travel.jpg" className="card-img-top" alt="Adventure Travel" />
              <div className="card-body">
                <h5 className="card-title">Adventure Travel</h5>
                <p className="card-text">For those who crave excitement, we offer thrilling activities such as hiking, trekking, safaris, and more.</p>
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
              <img src="luxury-travel.jpg" className="card-img-top" alt="Luxury Travel" />
              <div className="card-body">
                <h5 className="card-title">Luxury Travel</h5>
                <p className="card-text">Pamper yourself with the finest amenities, from 5-star hotels to exclusive experiences.</p>
                <a href="#" className="btn btn-primary">Learn More</a>
              </div>
            </div>
          </div>

      
          <div className="col-md-4">
            <div className="card">
              <img src="travel-insurance.jpg" className="card-img-top" alt="Travel Insurance" />
              <div className="card-body">
                <h5 className="card-title">Travel Insurance</h5>
                <p className="card-text">Stay protected throughout your trip with our reliable travel insurance services.</p>
                <a href="#" className="btn btn-primary">Learn More</a>
              </div>
            </div>
          </div>

       
          <div className="col-md-4">
            <div className="card">
              <img src="other-services.jpg" className="card-img-top" alt="Other Services" />
              <div className="card-body">
                <h5 className="card-title">Other Services</h5>
                <p className="card-text">Explore more services like airport transfers, VIP access, and more tailored to your needs.</p>
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
