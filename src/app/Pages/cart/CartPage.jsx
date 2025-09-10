import { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "./../../state/CartSlice";
import { Link, useLocation } from "react-router-dom";
import ProductCartItem from "./../../Components/ProductCartItem";
import MenuCard from "../../Components/MenuCard";
import CheckoutModal from "../../Components/CheckoutModal";
import "./CartPage.css";

function Cart() {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const location = useLocation();

  const [itemOptions, setItemOptions] = useState({});
  const [showModal, setShowModal] = useState(false);

  const activeTab = useMemo(() => {
    if (location.pathname.includes("/wishlist")) return "wishlist";
    return "cart";
  }, [location.pathname]);

  const isEmpty =
    (activeTab === "cart" && cartItems.length === 0) ||
    (activeTab === "wishlist" && wishlistItems.length === 0);

  const handleOptionChange = (id, flavor) => {
    setItemOptions((prev) => ({ ...prev, [id]: flavor }));
  };

  const clearCartHandler = () => {
    cartItems.forEach((item) => dispatch(removeFromCart(item.id)));
    dispatch(clearCart());
    setItemOptions({});
  };

  return (
    <div className="cart-page">
      {isEmpty && (
        <div className="empty-cart">
          <img src="img/empty-cart.svg" alt="Empty" className="empty-cart-img" />
          <h2>
            {activeTab === "cart" ? "Your Cart is empty" : "Your Wishlist is empty"}
          </h2>
          <Link to="/menu" className="my-btn my-btn-primary">
            Continue Shopping
          </Link>
        </div>
      )}

      {activeTab === "cart" && cartItems.length > 0 && (
        <div className="cart-box">
          <h1 className="title text-center my-2 fs-1">Shopping Cart</h1>
          <div className="cart-items">
            {cartItems.map((ele, index) => (
              <ProductCartItem
                key={ele.id || `cart-item-${index}`}
                ele={ele}
                onChangeOption={handleOptionChange}
              />
            ))}
          </div>

          <button
            className="my-btn my-btn-primary mt-3 w-100"
            onClick={() => setShowModal(true)}
          >
            Checkout
          </button>
        </div>
      )}

      {activeTab === "wishlist" && wishlistItems.length > 0 && (
        <div className="cart-box">
          <h2 className="title text-center fs-2 my-2">
            Saved for later ({wishlistItems.length} items)
          </h2>
          <div className="wishlist-grid">
            {wishlistItems.map((ele, index) => (
              <MenuCard key={ele.id || `wishlist-item-${index}`} product={ele} />
            ))}
          </div>
        </div>
      )}

      {/* ---------------- Checkout Modal ---------------- */}
      <CheckoutModal
        show={showModal}
        onClose={() => setShowModal(false)}
        cartItems={cartItems}
        itemOptions={itemOptions}
        clearCart={clearCartHandler}
        />
    </div>
  );
}

export default Cart;
