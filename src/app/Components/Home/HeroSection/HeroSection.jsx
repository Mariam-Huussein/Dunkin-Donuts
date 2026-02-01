import { Link } from "react-router-dom";
import "./../../Common/Hero/HeroSection.css";
import "./../../Common/Hero/HeroImage.css";
export default function HeroSection() {
  const stats = [
    { number: "500+", label: "Happy Customers" },
    { number: "50+", label: "Menu Items" },
    { number: "30min", label: "Delivery Time" },
  ];

  return (
    <section className="hero">
      <div className="hero-container position-relative">
        {/* Images Area */}
        <div className="hero-img-holder">
          <picture>
            <source
              media="(max-width: 576px)"
              srcSet="/img/imgHero-Home-2.png"
            />
            <source
              media="(max-width: 992px)"
              srcSet="/img/imgHero-Home-sm.png"
            />
            <img
              src="/img/imgHero-Home-mid.png"
              alt="Donuts & Sandwich"
              className="hero-main-img"
            />
          </picture>
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
              <div className="stats">
                {stats.map((stat, index) => (
                  <div className="stat" key={index}>
                    <div className="stat-number">{stat.number}</div>
                    <div className="stat-label">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
