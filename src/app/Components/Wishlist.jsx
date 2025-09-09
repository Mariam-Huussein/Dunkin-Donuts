import { useWishlist } from "../contexts/wishlist-context";
import { useCart } from "../contexts/cart-context";
import { FaPlus, FaTrash } from "react-icons/fa";
import { useState } from "react";

export default function Wishlist({ children }) {
  const { state: wishlistState, dispatch: wishlistDispatch } = useWishlist();
  const { dispatch: cartDispatch } = useCart();
  const [show, setShow] = useState(false);

  const removeFromWishlist = (id) => {
    wishlistDispatch({ type: "REMOVE_ITEM", payload: id });
  };

  const addToCart = (item) => {
    cartDispatch({
      type: "ADD_ITEM",
      payload: {
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        category: item.category,
      },
    });
  };

  const clearWishlist = () => {
    wishlistDispatch({ type: "CLEAR_WISHLIST" });
  };

  return (
    <>
      {/* Trigger */}
      <span onClick={() => setShow(true)} style={{ cursor: "pointer" }}>
        {children}
      </span>

      {/* Offcanvas */}
      <div
        className={`offcanvas offcanvas-end ${show ? "show" : ""}`}
        style={{ visibility: show ? "visible" : "hidden" }}
        tabIndex="-1"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">My Wishlist</h5>
          <button
            type="button"
            className="btn-close"
            onClick={() => setShow(false)}
          ></button>
        </div>
        <div className="offcanvas-body d-flex flex-column">
          {wishlistState.items.length === 0 ? (
            <div className="text-center py-5">
              <p className="text-muted">Your wishlist is empty</p>
              <small className="text-muted">Save your favorite items for later!</small>
            </div>
          ) : (
            <div className="mb-3">
              {wishlistState.items.map((item) => (
                <div
                  key={item.id}
                  className="card mb-3 shadow-sm border-0"
                >
                  <div className="card-body d-flex align-items-center">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="rounded"
                      style={{ width: "64px", height: "64px", objectFit: "cover" }}
                    />
                    <div className="flex-grow-1 ms-3">
                      <h6 className="mb-1">{item.name}</h6>
                      <p className="mb-1 fw-bold text-primary">${item.price.toFixed(2)}</p>
                      <span className="badge bg-secondary">{item.category}</span>
                    </div>
                    <div className="d-flex flex-column gap-2">
                      <button
                        className="btn btn-sm btn-primary d-flex align-items-center"
                        onClick={() => addToCart(item)}
                      >
                        <FaPlus className="me-1" /> Add
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger d-flex align-items-center"
                        onClick={() => removeFromWishlist(item.id)}
                      >
                        <FaTrash className="me-1" /> Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {wishlistState.items.length > 0 && (
            <div className="mt-auto">
              <button
                className="btn btn-primary w-100 mb-2"
                onClick={() => {
                  wishlistState.items.forEach((item) => addToCart(item));
                  clearWishlist();
                }}
              >
                Add All to Cart
              </button>
              <button
                className="btn btn-outline-secondary w-100"
                onClick={clearWishlist}
              >
                Clear Wishlist
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
