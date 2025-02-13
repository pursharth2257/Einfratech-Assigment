import React from 'react';

function Home() {
  return (
    <div>
     
      <div className="hero text-center flex-column">
        <h1>Welcome to PURSHARTH EATZ</h1>
        <h4 className="mt-3">Explore your taste here</h4>
      </div>

     
      <div className="container mt-5">
        <h2 className="text-center">Popular Dishes</h2>
        <div className="row">
          <div className="col-md-4">
            <div className="card h-100">
              <img src="dosa.jpg" className="card-img-top" alt="Destination 1"/>
              <div className="card-body">
                <h5 className="card-title">Masala Dosa</h5>
                <p className="card-text">Dosa is a crispy South Indian pancake made from fermented rice and dal.</p>
                <a href="#" className="btn btn-primary">See Recipe</a>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100">
              <img src="jalebi.jpg" className="card-img-top" alt="Destination 2"/>
              <div className="card-body">
                <h5 className="card-title">Jalebi</h5>
                <p className="card-text">Jalebi is a sweet, crispy, and syrup-soaked Indian dessert made from flour and sugar.</p>
                <a href="#" className="btn btn-primary">See Recipe</a>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100">
              <img src="./chole-bhature.jpg" className="card-img-top" alt="Destination 3"/>
              <div className="card-body">
                <h5 className="card-title">Chole Bhature</h5>
                <p className="card-text">Chole Bhature is a North Indian dish with spicy chickpeas and deep-fried bread.</p>
                <a href="#" className="btn btn-primary">See Recipe</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
