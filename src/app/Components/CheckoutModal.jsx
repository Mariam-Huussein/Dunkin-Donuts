import { useState } from "react";
import { Modal } from "react-bootstrap";
import { auth, db } from "./../../../firebaseconfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import toast from "react-hot-toast";
import PageLoader from "../Pages/PageLoader";
import { useNavigate } from "react-router-dom";

export default function CheckoutModal({ show, onClose, cartItems, itemOptions, clearCart }) {
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [promoMessage, setPromoMessage] = useState("");
  const [isCodeApplied, setIsCodeApplied] = useState(false);

  const navigate = useNavigate();

  const subTotal = cartItems.reduce((acc, item) => {
    return acc + (item.price * (item.amount || 1));
  }, 0);

  const finalTotal = subTotal - discount;

  const handleApplyCoupon = () => {
    if (isCodeApplied) return;

    if (promoCode.trim().toUpperCase() === "DUNKIN20") {
      const discountValue = subTotal * 0.20;
      setDiscount(discountValue);
      setPromoMessage("Promo code applied successfully!");
      setIsCodeApplied(true);
      toast.success("20% Discount Applied!");
    } else {
      setPromoMessage("Invalid promo code");
      setDiscount(0);
      toast.error("Invalid Code");
    }
  };

  const handleSubmitOrder = async () => {
    if (!address.trim()) {
      toast.error("Please enter your address");
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, "orders"), {
        userId: auth.currentUser.uid,
        name: auth.currentUser.displayName.trim(),
        state: 0,
        items: cartItems.map((item) => ({
          id: item.id,
          name: item.name,
          amount: item.amount,
          price: item.price,
          image: item.image,
          flavor: itemOptions[item.id] || "",
        })),
        address: address.trim(),
        
        subTotal: Number(subTotal.toFixed(2)),
        discount: Number(discount.toFixed(2)),
        totalPrice: Number(finalTotal.toFixed(2)),
        promoCodeUsed: isCodeApplied ? promoCode : null,

        createdAt: serverTimestamp(),
      });

      toast.success("Order placed successfully!");
      clearCart();
      setAddress("");
      setDiscount(0);
      setIsCodeApplied(false);
      setPromoCode("");
      setPromoMessage("");
      
      onClose();
    } catch (err) {
      console.error("Error placing order:", err);
      toast.error("Failed to place order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title className="text-center">
          {auth.currentUser ? "Confirm Your Order" : "Not Logged In"}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {auth.currentUser ? (
          <>
            <div className="mb-2">
              <label className="title form-label" style={{ fontSize: "1rem" }}>Name</label>
              <input
                type="text"
                className="form-control"
                value={auth.currentUser.displayName || ""}
                readOnly
              />
            </div>
            <div className="mb-2">
              <label className="title form-label" style={{ fontSize: "1rem" }}>Address</label>
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
            <h6 className="title fs-6">Items:</h6>
            <div style={{ maxHeight: "200px", overflowY: "auto", border: "1px solid #ddd", padding: "10px", borderRadius: "5px", marginBottom: "20px" }}>
              {cartItems.map((item) => (
                <div key={item.id} className="cart-form-item d-flex align-items-center mb-2">
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: "50px", height: "50px", objectFit: "scale-down", marginRight: "10px", borderRadius: "5px" }}
                  />
                  <div className="flex-grow-1">
                    <div className="title fs-6">{item.name}</div>
                    <div className="small text-muted">
                        Qty: {item.amount} | Price: ${item.price} 
                        {itemOptions[item.id] && ` | Flavor: ${itemOptions[item.id]}`}
                    </div>
                  </div>
                  <div className="fw-bold">
                    ${(item.price * (item.amount || 1)).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className="mb-3 p-3 bg-light rounded">
                <label className="form-label fw-bold small">Have a Promo Code?</label>
                <div className="input-group mb-1">
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Enter a promo code"
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
                    <span className="h5 fw-bold text-primary">${finalTotal.toFixed(2)}</span>
                </div>
            </div>

          </>
        ) : (
          <p className="fs-6 fw-bolder text-muted text-center">You need to log in to place an order.</p>
        )}
      </Modal.Body>

      <Modal.Footer>
        <button className="my-btn my-btn-outline" onClick={onClose}>Cancel</button>
        {auth.currentUser ? (
          <button className="my-btn my-btn-primary" onClick={handleSubmitOrder} disabled={loading}>
            {loading ? <PageLoader /> : `Place Order ($${finalTotal.toFixed(2)})`}
          </button>
        ) : (
          <button className="my-btn my-btn-primary" onClick={() => navigate("/auth/sign-in")}>
            Go to Login
          </button>
        )}
      </Modal.Footer>
    </Modal>
  );
}