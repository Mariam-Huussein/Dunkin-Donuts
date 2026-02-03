import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import PageLoader from "../Loader/Loader";
import { useCheckoutLogic } from "../../../hooks/useCheckoutLogic";

export default function CheckoutModal({
  show,
  onClose,
  cartItems,
  itemOptions,
  clearCart,
}) {
  const navigate = useNavigate();

  const {
    address,
    setAddress,
    loading,
    promoCode,
    setPromoCode,
    promoMessage,
    isCodeApplied,
    subTotal,
    discount,
    finalTotal,
    currentUser,
    handleApplyCoupon,
    handleSubmitOrder,
  } = useCheckoutLogic(cartItems, itemOptions, clearCart, onClose);

  return (
    <Modal show={show} onHide={onClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title className="text-center">
          {currentUser ? "Confirm Your Order" : "Not Logged In"}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {currentUser ? (
          <>
            {/* --- User Details --- */}
            <div className="mb-3">
              <label className="fw-bold mb-1">Name</label>
              <input
                type="text"
                className="form-control"
                value={currentUser.displayName || ""}
                readOnly
              />
            </div>
            <div className="mb-3">
              <label className="fw-bold mb-1">Address</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your address"
                value={address}
                required
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <hr />

            {/* --- Items List --- */}
            <h6 className="fw-bold">Items:</h6>
            <div className="checkout-items-scroll border rounded p-2 mb-3" style={{ maxHeight: "200px", overflowY: "auto" }}>
              {cartItems.map((item) => (
                <div key={item.id} className="d-flex align-items-center mb-2 border-bottom pb-2">
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "contain",
                      marginRight: "10px",
                    }}
                  />
                  <div className="flex-grow-1">
                    <div className="fw-semibold">{item.name}</div>
                    <div className="small text-muted">
                      Qty: {item.amount} | Price: ${item.price}
                      {itemOptions[item.id] && ` | ${itemOptions[item.id]}`}
                    </div>
                  </div>
                  <div className="fw-bold">
                    ${(item.price * (item.amount || 1)).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            {/* --- Promo Code Section --- */}
            <div className="mb-3 p-3 bg-light rounded">
              <label className="fw-bold small mb-2">Have a Promo Code?</label>
              <div className="input-group mb-1">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter code (e.g. DUNKIN20)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  disabled={isCodeApplied}
                />
                <button
                  className="btn btn-dark"
                  onClick={handleApplyCoupon}
                  disabled={isCodeApplied}
                >
                  Apply
                </button>
              </div>
              {promoMessage && (
                <small className={isCodeApplied ? "text-success fw-bold" : "text-danger fw-bold"}>
                  {promoMessage}
                </small>
              )}
            </div>

            {/* --- Totals Section --- */}
            <div className="border-top pt-2">
              <div className="d-flex justify-content-between mb-1">
                <span>Subtotal:</span>
                <span>${subTotal.toFixed(2)}</span>
              </div>
              {isCodeApplied && (
                <div className="d-flex justify-content-between mb-1 text-success">
                  <span>Discount (20%):</span>
                  <span>- ${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="d-flex justify-content-between mt-2 pt-2 border-top">
                <span className="h5 fw-bold">Total:</span>
                <span className="h5 fw-bold text-primary">
                  ${finalTotal.toFixed(2)}
                </span>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-5">
            <p className="fs-5 text-muted mb-3">
              You need to log in to place an order.
            </p>
          </div>
        )}
      </Modal.Body>

      <Modal.Footer>
        <button className="my-btn my-btn-outline" onClick={onClose}>
          Cancel
        </button>
        
        {currentUser ? (
          <button
            className="my-btn my-btn-primary"
            onClick={handleSubmitOrder}
            disabled={loading}
          >
            {loading ? (
              <PageLoader />
            ) : (
              `Place Order ($${finalTotal.toFixed(2)})`
            )}
          </button>
        ) : (
          <button
            className="my-btn my-btn-primary"
            onClick={() => navigate("/auth/sign-in")}
          >
            Go to Login
          </button>
        )}
      </Modal.Footer>
    </Modal>
  );
}