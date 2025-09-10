import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Footer.css"

export default function Footer() {
  return (
    <footer className="border-top">
      <div className="container py-5">
        <div className="row gy-4">
          <div className="col-md-3 text-center text-md-start">
            <div className="d-flex align-items-center justify-content-center justify-content-md-start mb-3">
              <img src="img/dd-logo.svg" alt="DD Logo" />
            </div>
            <p className="small">
              Serving fresh, delicious food with a smile. Experience the taste
              that brings people together.
            </p>
            <div className="d-flex gap-3 justify-content-center justify-content-md-start">
              <a href="#" className="fs-5"><FaFacebook /></a>
              <a href="#" className="fs-5"><FaInstagram /></a>
              <a href="#" className="fs-5"><FaTwitter /></a>
            </div>
          </div>

          <div className="col-md-3 text-center text-md-start">
            <h5 className="fw-semibold">Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link to="/" className="footer-link">Home</Link></li>
              <li><Link to="/menu" className="footer-link">Menu</Link></li>
              <li><Link to="/about" className="footer-link">About Us</Link></li>
              <li><Link to="/contact" className="footer-link">Contact</Link></li>
            </ul>
          </div>

          <div className="col-md-3 text-center text-md-start">
            <h5 className="fw-semibold">Menu</h5>
            <ul className="list-unstyled">
              <li><Link to="/menu#breakfast" className="footer-link">Breakfast</Link></li>
              <li><Link to="/menu#lunch" className="footer-link">Lunch</Link></li>
              <li><Link to="/menu#desserts" className="footer-link">Desserts</Link></li>
              <li><Link to="/menu#beverages" className="footer-link">Beverages</Link></li>
            </ul>
          </div>

          <div className="col-md-3 text-center text-md-start">
            <h5 className="fw-semibold">Contact Info</h5>
            <ul className="list-unstyled small">
              <li className="d-flex align-items-center mb-2 justify-content-center justify-content-md-start">
                <a href="https://www.google.com/maps?q=543+Southern+Artery,+Quincy,+MA+02169,+USA" className="footer-link">
                  <FaMapMarkerAlt className="me-2" /> 543 Southern Artery, Quincy, Massachusetts
                </a>
              </li>
              <li className="d-flex align-items-center mb-2 justify-content-center justify-content-md-start">
                <a href="tel:(617)773-0080" className="footer-link">
                  <FaPhone className="me-2" /> (617) 773-0080
                </a>
              </li>
              <li className="d-flex align-items-center justify-content-center justify-content-md-start">
                <a href="mailto:customerservice@dunkinbrands.com" className="footer-link">
                  <FaEnvelope className="me-2" /> customerservice@dunkinbrands.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* copyright */}
        <div className="border-top mt-4 pt-3 text-center">
          <p className="small mb-0">©2024 DD IP Holder LLC</p>
        </div>
      </div>
    </footer>
  );
}
