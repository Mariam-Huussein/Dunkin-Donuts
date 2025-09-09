import { Link } from "react-router-dom";
import "./HeroSection.css";
import "./HeroImage.css"

export default function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-container position-relative">
        <div className="hero-img-holder">
          <img
            src="/public/img/imgHero-Home.png"
            alt="Dounts & Sandawish"
            className="large-hero abt-img"
          />
          <img
            src="/public/img/imgHero-Home-mid.png"
            alt="Dounts & Sandawish"
            className="mid-hero abt-img"
          />
          <img
            src="/public/img/imgHero-Home-sm.png"
            alt="Dounts & Sandawish"
            className="sm-hero abt-img"
          />
          <img
            src="/public/img/imgHero-Home-2.png"
            alt="Dounts & Sandawish"
            className="xs-hero abt-img"
          />
        </div>
        <div className="container">
          <div className="hero-content">
            <h1 className="title hero-title">
              Fresh Food, <span className="highlight">Delivered</span> to Your
              Door
            </h1>
            <p className="hero-subtitle">
              Experience the perfect blend of taste and quality with our
              handcrafted meals. Made fresh daily with the finest ingredients,
              just like you deserve.
            </p>

            <div className="hero-buttons">
              <Link to={"/menu"} className="my-btn my-btn-outline">
                View Menu
              </Link>
            </div>

            <div className="stats">
              <div className="stat">
                <div className="stat-number">500+</div>
                <div className="stat-label">Happy Customers</div>
              </div>
              <div className="stat">
                <div className="stat-number">50+</div>
                <div className="stat-label">Menu Items</div>
              </div>
              <div className="stat">
                <div className="stat-number">30min</div>
                <div className="stat-label">Delivery Time</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
