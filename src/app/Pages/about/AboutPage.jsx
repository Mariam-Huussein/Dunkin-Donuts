import { Heart, People, Award, Clock } from "react-bootstrap-icons"
import "./AboutPage.css"
import { Container } from "react-bootstrap"

export default function AboutPage() {
  const values = [
    {
      icon: <Heart size={32} className="icon" />,
      title: "Quality First",
      description: "We use only the finest, freshest ingredients sourced from local suppliers.",
    },
    {
      icon: <People size={32} className="icon" />,
      title: "Community Focus",
      description: "We're proud to be part of this community and give back whenever we can.",
    },
    {
      icon: <Award size={32} className="icon" />,
      title: "Excellence",
      description: "We strive for excellence in every dish, every service, every interaction.",
    },
    {
      icon: <Clock size={32} className="icon" />,
      title: "Tradition",
      description: "Our recipes blend time-honored traditions with modern culinary innovation.",
    },
  ]

  return (
    <section className="mb-0">
      {/* <div className="hero-about text-center mb-5">
        <h2 className="title fw-bold">ABOUT US</h2>
        <p className="text-muted">America Runs on Dunkin'®</p>
      </div> */}
      <section className="not-found-sec">
        <div className="hero-not-found hero-about my-5 position-relative">
          <div className="img-hero-holder">
            <img src="/public/img/big-hero-about.png" className="big-hero-notfound" />
            <img src="/public/img/imgHero-About.png" className="large-hero-notfound" />
            <img src="/public/img/mid-hero-about.png" className="mid-hero-notfound" />
          </div>
          <Container className="d-flex flex-column w-50 align-items-center text-center justify-content-center not-found-content">
            <h2 className="title about-title fw-bold" style={{ color: "#3e342f" }}>
              ABOUT US
            </h2>
            <p className="text-muted fs-6 fw-medium w-75 mx-auto">
              Dunkin’, founded in 1950, is the largest coffee and donuts brand in the United States, with more than 13,200 restaurants in nearly 40 global markets. Dunkin’ is part of the Inspire Brands family of restaurants. 
            </p>
          </Container>
        </div>
      </section>
      <Container className="values-container">
      <div className="text-center mb-5">
        <span className="badge bg-light text-primary mb-3">Our Values</span>
        <h2 className="title fw-bold mb-4" style={{fontSize:"3rem"}}>What Drives Us</h2>
        <p className="text-muted">These core values guide everything we do, from sourcing ingredients to serving our community.</p>
      </div>

      <div className="about-row row g-4 mx-auto">
        {values.map((value, index) => (
          <div key={index} className="col-12 col-md-6">
            <div className="about-card card h-100 text-center p-4">
              <div className="mb-3">{value.icon}</div>
              <h5 className="fw-semibold">{value.title}</h5>
              <p className="text-muted small">{value.description}</p>
            </div>
          </div>
        ))}
      </div>
      </Container>
    </section>
  )
}
