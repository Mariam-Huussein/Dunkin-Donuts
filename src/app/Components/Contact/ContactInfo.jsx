import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function ContactInfo() {
  const infoData = [
    { icon: <FaMapMarkerAlt />, title: "Address", link: "https://goo.gl/maps", info: "543 Southern Artery, Quincy, Massachusetts", details: null },
    { icon: <FaPhone />, title: "Phone", link: "tel:(617) 773-0080", info: "(617) 773-0080", details: "Available 7 days a week" },
    { icon: <FaEnvelope />, title: "Email", link: "mailto:customerservice@dunkinbrands.com", info: "customerservice@dunkinbrands.com", details: "We'll respond within 24 hours" },
  ];
  return (
    <div className="d-flex flex-column gap-4 h-100">
      {/* Info Card */}
      <div className="card shadow-sm border-0">
        <div className="card-body p-4 card-body-contact d-flex flex-column row-gap-4">
          <h2 className="title contact-title h4 fw-bold display-6">
            Get in Touch
          </h2>

          {infoData.map((item, index) => (
            <div className="d-flex row-gap-2" key={index}>
              <div className="icon-box me-3">{item.icon}</div>
              <div className="d-flex flex-wrap row-gap-1 flex-column">
                <h6 className="fw-semibold mb-1 title fs-6">{item.title}</h6>
                <p className="text-muted mb-0 fw-medium">
                  <Link to={item.link} className="contact-link text-break">
                    {item.info}
                  </Link>
                </p>
                {item.details && (
                  <small className="text-muted fw-medium">{item.details}</small>
                )}
              </div>
            </div>
          ))}

          {/* Hours */}
          <div className="d-flex">
            <div className="icon-box me-3">
              <FaClock />
            </div>
            <div className="d-flex row-gap-2 flex-column">
              <h6 className="fw-semibold mb-1 title fs-6">Hours</h6>
              <p className="text-muted mb-0 fw-medium">
                <span className="fw-bold">Mon - Fri:</span> 6:00 AM - 9:00 PM
              </p>
              <p className="text-muted mb-0 fw-medium">
                <span className="fw-bold">Saturday:</span> 7:00 AM - 10:00 PM
              </p>
              <p className="text-muted mb-0 fw-medium">
                <span className="fw-bold">Sunday:</span> 7:00 AM - 8:00 PM
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="card shadow-sm border-0 flex-grow-1">
        <div className="card-body p-0 h-100" style={{ minHeight: "300px" }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2950.963462948624!2d-70.9934!3d42.2515!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e37ca6a2b8b8b7%3A0x123456789!2sDunkin!5e0!3m2!1sen!2sus!4v1600000000000!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0, minHeight: "300px" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Dunkin Location"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
