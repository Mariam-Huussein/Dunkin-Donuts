import React from "react";
import { Star } from "lucide-react";
import OfferCard from "./OfferCard";

const featuredItems = [
  {
    id: 1,
    name: "Classic Glazed Donut",
    description: "Our signature glazed donut, made fresh daily with our secret recipe",
    price: 2.99,
    rating: 4.8,
    image: "/classic-glazed-donut.jpg",
    category: "Breakfast",
  },
];

export default function FeaturedMenu() {
  
  return (
    <section className="py-5 bg-light">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="fw-bold">Our Featured Menu</h2>
          <p className="text-muted">Discover our most popular items, crafted with love and the finest ingredients</p>
        </div>

        <div className="row g-4">
          <div className="col-12 col-md-6 col-lg-4">
          <OfferCard/>
          </div>
          {featuredItems.map((item) => (
            <div key={item.id} className="col-12 col-md-6 col-lg-4">
              <div className="card h-100 shadow-sm">
                <img src={item.image} alt={item.name} className="card-img-top" />
                <div className="card-body d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5 className="card-title mb-0">{item.name}</h5>
                    <small className="text-warning">
                      <Star className="star-icon" />
                        {item.rating}
                      </small>
                  </div>
                  <p className="card-text text-muted">{item.description}</p>
                  <div className="mt-auto d-flex justify-content-between align-items-center">
                    <span className="fw-bold text-primary">${item.price.toFixed(2)}</span>
                    <div>
                      <button
                        className="btn btn-outline-danger btn-sm me-2"
                        onClick={() => handleWishlistToggle(item)}
                      >

                      </button>
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => handleAddToCart(item)}
                      >
                        + Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-4">
          <button className="btn btn-outline-primary btn-lg">View Full Menu</button>
        </div>
      </div>
    </section>
  );
}
