import React from 'react';

function Home() {
  return (
    <div>
      {/* Hero Section */}
      <div className="hero text-center flex-column">
        <h1>Welcome to PURSHARTH TRAVEL</h1>
        <h4 className="mt-3">Your adventure starts here</h4>
      </div>

      {/* Popular Destinations */}
      <div className="container mt-5">
        <h2 className="text-center">Popular Destinations</h2>
        <div className="row">
          <div className="col-md-4">
            <div className="card h-100">
              <img src="paris.webp" className="card-img-top" alt="Destination 1"/>
              <div className="card-body">
                <h5 className="card-title">Paris</h5>
                <p className="card-text">The city of love, fashion, and iconic landmarks.</p>
                <a href="#" className="btn btn-primary">Explore</a>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100">
              <img src="bali.jpg" className="card-img-top" alt="Destination 2"/>
              <div className="card-body">
                <h5 className="card-title">Bali</h5>
                <p className="card-text">A paradise of beaches and breathtaking views.</p>
                <a href="#" className="btn btn-primary">Explore</a>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100">
              <img src="./new-york.webp" className="card-img-top" alt="Destination 3"/>
              <div className="card-body">
                <h5 className="card-title">New York City</h5>
                <p className="card-text">The city that never sleeps with endless activities.</p>
                <a href="#" className="btn btn-primary">Explore</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
