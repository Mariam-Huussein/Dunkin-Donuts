import { FaPaperPlane } from "react-icons/fa";
import { useContactForm } from "../../hooks/useContactForm";

export default function ContactForm() {
  const { formData, handleChange, handleSubmit, loading } = useContactForm();

  return (
    <div className="card contact-form-container shadow-sm border-0 h-100">
      <div className="card-body py-4 px-5 d-flex flex-column justify-content-around">
        <h2 className="contact-title title h4 fw-bold">Send us a Message</h2>
        <p className="fw-semibold text-muted mb-4">
          Fill out the form below and we'll get back to you as soon as possible.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="row g-3 row-gap-2">
            {/* First Name */}
            <div className="col-md-6">
              <label className="title form-label" htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                className="fw-semibold form-control"
                placeholder="John"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>

            {/* Last Name */}
            <div className="col-md-6">
              <label className="title form-label" htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                className="fw-semibold form-control"
                placeholder="Doe"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email */}
            <div className="col-12">
              <label className="title form-label" htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                className="fw-semibold form-control"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Phone */}
            <div className="col-12">
              <label className="title form-label" htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                className="fw-semibold form-control"
                placeholder="(555) 123-4567"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            {/* Subject */}
            <div className="col-12">
              <label className="title form-label" htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                className="fw-semibold form-control"
                placeholder="How can we help you?"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>

            {/* Message */}
            <div className="col-12">
              <label className="title form-label" htmlFor="message">Message</label>
              <textarea
                id="message"
                className="fw-semibold form-control"
                rows="4"
                placeholder="Tell us more..."
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="col-12">
              <button
                type="submit"
                disabled={loading}
                className="my-btn my-btn-outline-sec w-100 d-flex align-items-center justify-content-center"
              >
                {loading ? "Sending..." : <><FaPaperPlane className="me-2" /> Send Message</>}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}