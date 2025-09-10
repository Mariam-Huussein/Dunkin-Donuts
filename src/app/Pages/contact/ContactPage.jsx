import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaPaperPlane,
} from "react-icons/fa";
import "./ContactPage.css";
import { Link } from "react-router-dom";

export default function ContactPage() {
  return (
    <div className="contact-page bg-light min-vh-100">
      {/* Header */}
      <section className="bg-white py-5 text-center shadow-sm my-4">
        <div className="container">
          <h1 className="title display-4 fw-bold mb-3">Contact Us</h1>
          <p
            className="lead text-muted fw-semibold mx-auto fs-6"
            style={{ maxWidth: "600px" }}
          >
            We'd love to hear from you! Get in touch with us for any questions,
            feedback, or special requests.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-5">
        <div className="container">
          <div className="row g-5">
            {/* Contact Form */}
            <div className="col-lg-6">
              <div className="card shadow-sm border-0">
                <div className="card-body p-4">
                  <h2 className="title h4 fw-bold mb-3">Send us a Message</h2>
                  <p className="fw-semibold text-muted mb-4">
                    Fill out the form below and we'll get back to you as soon as
                    possible.
                  </p>

                  <form>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="title form-label" htmlFor="">
                          First Name
                        </label>
                        <input
                          type="text"
                          id="first-name"
                          className="fw-semibold form-control"
                          placeholder="John"
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="title form-label" htmlFor="">
                          Last Name
                        </label>
                        <input
                          type="text"
                          id="last-name"
                          className="fw-semibold form-control"
                          placeholder="Doe"
                        />
                      </div>
                      <div className="col-12">
                        <label className="title form-label" htmlFor="">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          className="fw-semibold form-control"
                          placeholder="john@example.com"
                        />
                      </div>
                      <div className="col-12">
                        <label className="title form-label" htmlFor="">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          className="fw-semibold form-control"
                          placeholder="(555) 123-4567"
                        />
                      </div>
                      <div className="col-12">
                        <label className="title form-label" htmlFor="">
                          Subject
                        </label>
                        <input
                          type="text"
                          id="subject"
                          className="fw-semibold form-control"
                          placeholder="How can we help you?"
                        />
                      </div>
                      <div className="col-12">
                        <label className="title form-label" htmlFor="">
                          Message
                        </label>
                        <textarea
                          id="message"
                          className="fw-semibold form-control"
                          rows="4"
                          placeholder="Tell us more..."
                        ></textarea>
                      </div>
                      <div className="col-12">
                        <button
                          type="submit"
                          className="my-btn my-btn-outline-sec w-100 d-flex align-items-center justify-content-center"
                        >
                          <FaPaperPlane className="me-2" /> Send Message
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="col-lg-6">
              <div className="card shadow-sm border-0 mb-4">
                <div className="card-body p-4 card-body-contact">
                  <h2 className="title h4 fw-bold mb-4 display-6 spa">
                    Get in Touch
                  </h2>

                  <div className="d-flex mb-4">
                    <div className="icon-box me-3">
                      <FaMapMarkerAlt />
                    </div>
                    <div>
                      <h6 className="fw-semibold mb-1 title fs-6">Address</h6>
                      <p className="text-muted mb-0 fw-medium">
                        <Link
                          to="https://www.google.com/maps?q=543+Southern+Artery,+Quincy,+MA+02169,+USA"
                          className="contact-link"
                        >
                          543 Southern Artery, Quincy, Massachusetts
                        </Link>
                      </p>
                    </div>
                  </div>

                  <div className="d-flex mb-4">
                    <div className="icon-box me-3">
                      <FaPhone />
                    </div>
                    <div>
                      <h6 className="fw-semibold mb-1 title fs-6">Phone</h6>
                      <p className="text-muted mb-0 fw-medium">
                        <Link to="tel:(617) 773-0080" className="contact-link">
                          (555) 123-4567
                        </Link>
                      </p>
                      <small className="text-muted fw-medium">
                        Available 7 days a week
                      </small>
                    </div>
                  </div>

                  <div className="d-flex mb-4">
                    <div className="icon-box me-3">
                      <FaEnvelope />
                    </div>
                    <div>
                      <h6 className="fw-semibold mb-1 title fs-6">Email</h6>
                      <p className="text-muted mb-0 fw-medium">
                        <Link
                          to="mailto:customerservice@dunkinbrands.com"
                          className="contact-link"
                        >
                          customerservice@dunkinbrands.com
                        </Link>
                      </p>
                      <small className="text-muted fw-medium">
                        We'll respond within 24 hours
                      </small>
                    </div>
                  </div>

                  <div className="d-flex">
                    <div className="icon-box me-3">
                      <FaClock />
                    </div>
                    <div>
                      <h6 className="fw-semibold mb-1 title fs-6">Hours</h6>
                      <p className="text-muted mb-0 fw-medium">
                        <span className="fw-bold">Mon - Fri:</span> 6:00 AM -
                        9:00 PM
                      </p>
                      <p className="text-muted mb-0 fw-medium">
                        <span className="fw-bold">Saturday:</span> 7:00 AM -
                        10:00 PM
                      </p>
                      <p className="text-muted mb-0 fw-medium">
                        <span className="fw-bold">Sunday:</span> 7:00 AM - 8:00
                        PM
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="card shadow-sm border-0">
                <div className="card-body p-0">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2949.6118257137376!2d-71.01006!3d42.252877!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e37b4b0a6a3a7f%3A0x7a0d5578f0ed1f!2sQuincy%2C%20MA!5e0!3m2!1sen!2sus!4v1693838494091!5m2!1sen!2sus"
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Google Maps"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
