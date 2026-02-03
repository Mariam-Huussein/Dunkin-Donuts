import { Container } from "react-bootstrap";

export default function AboutHero() {
  return (
    <section className="not-found-sec">
      <div className="hero-not-found hero-about my-5 position-relative">
        <div className="img-hero-holder">
          <picture>
            <source
              media="(max-width: 992px)"
              srcSet="img/mid-hero-about.png"
            />
            <img
              src="img/mid-hero-about.png"
              className="big-hero-notfound w-100"
              alt="About Us"
            />
          </picture>
        </div>
        <Container className="d-flex flex-column w-50 align-items-center text-center justify-content-center not-found-content">
          <h2 className="title about-title fw-bold">ABOUT US</h2>
          <p className="text-muted fs-6 fw-medium mx-auto">
            Dunkin’, founded in 1950, is the largest coffee and donuts brand in
            the United States, with more than 13,200 restaurants in nearly 40
            global markets. Dunkin’ is part of the Inspire Brands family of
            restaurants.
          </p>
        </Container>
      </div>
    </section>
  );
}
