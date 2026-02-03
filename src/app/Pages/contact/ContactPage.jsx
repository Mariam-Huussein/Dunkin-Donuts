import ContactForm from "../../Components/Contact/ContactForm";
import ContactInfo from "../../Components/Contact/ContactInfo";
import "./ContactPage.css";

export default function ContactPage() {
  return (
    <div className="contact-page min-vh-100">
      {/* Header Section */}
      <section className="bg-white py-5 text-center shadow-sm mb-5">
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

      {/* Main Content */}
      <section className="pb-5 main-content-container">
        <div className="container">
          <div className="row g-5">
            {/* Left Column: Form */}
            <div className="col-lg-6">
              <ContactForm />
            </div>

            {/* Right Column: Info & Map */}
            <div className="col-lg-6">
              <ContactInfo />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}