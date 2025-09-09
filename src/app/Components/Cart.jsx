import React from "react";
import { useCart } from "../contexts/cart-context";

export default function Cart({ children }) {
  const { state, dispatch } = useCart();

  const updateQuantity = (id, quantity) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
  };

  const removeItem = (id) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  return (
    <div className="cart-container">
      {children}

      <div className="offcanvas offcanvas-end show" tabIndex="-1" style={{ visibility: "visible" }}>
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">Shopping Cart</h5>
          <button type="button" className="btn-close" onClick={clearCart}></button>
        </div>
        <div className="offcanvas-body">
          {state.items.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <div>
              {state.items.map((item) => (
                <div key={item.id} className="card mb-3">
                  <div className="card-body d-flex align-items-center">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="rounded"
                      style={{ width: "60px", height: "60px", objectFit: "cover" }}
                    />
                    <div className="ms-3 flex-grow-1">
                      <h6 className="mb-1">{item.name}</h6>
                      <p className="mb-1">${item.price.toFixed(2)}</p>
                      <div className="d-flex align-items-center">
                        <button className="btn btn-outline-secondary btn-sm" onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                        <span className="mx-2">{item.quantity}</span>
                        <button className="btn btn-outline-secondary btn-sm" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                      </div>
                    </div>
                    <button className="btn btn-danger btn-sm" onClick={() => removeItem(item.id)}>🗑</button>
                  </div>
                </div>
              ))}
              <div className="mt-3">
                <h6>Total: ${state.total.toFixed(2)}</h6>
                <button className="btn btn-primary w-100 mb-2">Proceed to Checkout</button>
                <button className="btn btn-outline-danger w-100" onClick={clearCart}>Clear Cart</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
