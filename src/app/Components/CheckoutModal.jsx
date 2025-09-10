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
  const navigate = useNavigate();

  const handleSubmitOrder = async () => {
    if (!address.trim()) {
      toast.error("Please enter your name or address");
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
          flavor: itemOptions[item.id]?.flavor || "",
        })),
        address: address.trim(),
        createdAt: serverTimestamp(),
      });

      toast.success("Order placed successfully!");
      clearCart();
      setAddress("");
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
        <Modal.Title className="text-center">{auth.currentUser ? "Confirm Your Order" : "Not Logged In"}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {auth.currentUser ? (
          <>
            <div className="mb-2">
              <label className="title form-label" style={{ fontSize: "1rem" }}>Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your name"
                value={auth.currentUser.displayName}
                onChange={(e) => setName(e.target.value)}
                readOnly
                required
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
            <div style={{ maxHeight: "300px", overflowY: "auto", border: "1px solid #ddd", padding: "10px", borderRadius: "5px" }}>
              {cartItems.map((item) => (
                <div key={item.id} className="cart-form-item d-flex align-items-center mb-2">
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: "30%", height: "80px", objectFit: "scale-down", marginRight: "10px", borderRadius: "5px" }}
                  />
                  <div className="flex-grow-1">
                    <div className="title fs-6">{item.name}{}</div>
                    <div><span className="fw-bold fs-6">Quantity: </span>{item.amount}</div>
                    <div><span className="fw-bold fs-6">Price: </span>{item.price}</div>
                    {itemOptions[item.id] && (
                      <div><span className="fw-bold fs-6">Flavor: </span>{itemOptions[item.id]}</div>
                    )}
                    <div>
                      <span className="fw-bold fs-6">Total Price: </span>
                      ${(item.price * (item.amount || 1).toFixed(2))}
                    </div>
                  </div>
                </div>
              ))}
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
            {loading ? <PageLoader /> : "Place Order"}
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