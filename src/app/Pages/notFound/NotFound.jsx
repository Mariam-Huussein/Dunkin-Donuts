import { Container } from "react-bootstrap";
import "./NotFound.css";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <section className="not-found-sec">
        <div className="hero-not-found my-5 position-relative">
          <div className="img-hero-holder">
            <img src="/public/img/big-hero-about.png" className="big-hero-notfound" />
            <img src="/public/img/imgHero-About.png" className="large-hero-notfound" />
            <img src="/public/img/mid-hero-about.png" className="mid-hero-notfound" />
          </div>
          <Container className="d-flex flex-column w-50 align-items-center text-center justify-content-center not-found-content">
            <img src="/public/img/404Page.png" alt="404 Image" className="notfound-img" />
            <h2 className="title fw-bold fs-1" style={{ color: "#3e342f" }}>
              Page Not Found
            </h2>
            <p className="text-muted fs-6 fw-medium w-75 mx-auto">
              This page doesn’t exist, but the thing you’re looking for might.
              Check the URL or visit our homepage.
            </p>
            <Link to="/" className="my-btn my-btn-primary my-4">
              Back To Home
            </Link>
          </Container>
        </div>
      </section>
    </>
  );
};

export default NotFound;
