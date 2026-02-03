import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { scrollToTop } from "../../../utils/scrollToTop";
import "./Footer.css";

export default function Footer() {
  const menuCategories = [
    { name: "Coffe", link: "COFFEE" },
    { name: "Sandawiches", link: "SANDWICHES" },
    { name: "Snacks", link: "SNACKS" },
    { name: "Full Menu", link: "All" },
  ];

  const socialLinks = [
    { icon: <FaFacebook />, link: "https://www.facebook.com/" },
    { icon: <FaInstagram />, link: "https://www.instagram.com/" },
    { icon: <FaTwitter />, link: "https://x.com/" },
  ];

  const localLinks = ["Home", "Menu", "About", "Contact"];

  const contactInfo =[
    { icon: <FaMapMarkerAlt className="me-2" /> , link: "https://www.google.com/maps?q=543+Southern+Artery,+Quincy,+MA+02169,+USA", title:" 543 Southern Artery, Quincy, Massachusetts" },
    { icon: <FaPhone className="me-2" /> , link: "tel:(617)773-0080", title:" (617) 773-0080" },
    { icon: <FaEnvelope className="me-2" /> , link: "mailto:customerservice@dunkinbrands.com", title:"customerservice@dunkinbrands.com" },
  ]

  return (
    <footer className="border-top">
      <div className="container py-5">
        <div className="row gy-4">
          <div className="col-md-3 text-center text-md-start">
            <div className="d-flex align-items-center justify-content-center justify-content-md-start mb-3">
              <img src="/img/dd-logo.svg" alt="DD Logo" />
            </div>
            <p className="small">
              Serving fresh, delicious food with a smile. Experience the taste
              that brings people together.
            </p>
            <div className="d-flex gap-3 justify-content-center justify-content-md-start">
              {socialLinks.map((socialLink, index) => (
                <Link to={socialLink.link} key={index} className="fs-5">
                  {socialLink.icon}
                </Link>
              ))}
            </div>
          </div>

          <div className="col-md-3 text-center text-md-start">
            <h5 className="fw-semibold">Quick Links</h5>
            <ul className="list-unstyled">
              {localLinks.map((link, index) => (
                <li key={index}>
                  <Link to={`/${link.toLowerCase()}`} className="footer-link">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-md-3 text-center text-md-start">
            <h5 className="fw-semibold">Menu</h5>
            <ul className="list-unstyled">
              {menuCategories.map((category, index) => (
                <li key={index}>
                  <Link
                    to={`/menu?category=${category.link.toUpperCase()}`}
                    className="footer-link"
                    onClick={scrollToTop}
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-md-3 text-center text-md-start">
            <h5 className="fw-semibold">Contact Info</h5>
            <ul className="list-unstyled small">
              {
                contactInfo.map((contact,index)=>(
                  <li key={index} className="d-flex align-items-center justify-content-center justify-content-md-start">
                    <Link
                      to={contact.link}
                      target="_blank"
                      className="footer-link"
                    >
                      {contact.icon}{" "}
                      {contact.title}
                    </Link>
                  </li>
                ))
              }
            </ul>
          </div>
        </div>

        <div className="border-top mt-5 pt-4">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
            <p className="small mb-2 mb-md-0 copy-rights-txt">
              Non-commercial Project{" "}<span className="d-none d-sm-inline"> | For Portfolio Purposes Only</span>
            </p>

            <p className="small mb-0 copy-rights-txt">
              @2025 Designed & Developed by{" "}
              <Link
                to="https://www.linkedin.com/in/eng-mariam-hussein/"
                target="_blank"
                rel="noreferrer"
                className="footer-link"
              >
                Mariam Hussein
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
