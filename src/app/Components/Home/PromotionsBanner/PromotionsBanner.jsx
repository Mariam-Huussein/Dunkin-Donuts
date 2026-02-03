import { FaClock, FaPercent } from "react-icons/fa";
import "./PromotionsBanner.css"

export default function PromotionsBanner() {
  return (
    <section className="promotions-banner text-white py-5 my-5">
      <div className="container">
        <div className="row align-items-center">
          
          {/* Left Content */}
          <div className="col-md-6 text-center text-md-start mb-4 mb-md-0">
            <div className="d-flex justify-content-center justify-content-md-start align-items-center mb-3">
              <FaPercent className="me-2" />
              <span className="fw-semibold">Limited Time Offer</span>
            </div>
            <h2 className="fw-bold mb-2">20% Off Your First Order</h2>
            <p className="mb-0">
              New customers get 20% off when you order $25 or more. Use code <strong>WELCOME20</strong>
            </p>
          </div>

          {/* Right Content */}
          <div className="col-md-6 text-center text-md-end">
            <div className="d-flex justify-content-center justify-content-md-end align-items-center mb-3">
              <FaClock className="me-2" />
              <span className="fw-5">Offer ends in 3 days</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
