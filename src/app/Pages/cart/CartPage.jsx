// import { auth, db } from "./../../../../firebaseconfig";
// import { useSelector, useDispatch } from "react-redux";
// import { removeFromCart, clearCart } from "./../../state/CartSlice";
// import { collection, addDoc, serverTimestamp } from "firebase/firestore";
// import { useState, useMemo } from "react";
// import ProductCartItem from "./../../Components/ProductCartItem";
// import { Link, useLocation } from "react-router-dom";
// import MenuCard from "../../Components/MenuCard";
// import toast, { Toaster } from "react-hot-toast";
// import { Modal, Button } from "react-bootstrap";
// import "./CartPage.css";
// import PageLoader from "../PageLoader";

// function Cart() {
//   const dispatch = useDispatch();
//   const { cartItems } = useSelector((state) => state.cart);
//   const { wishlistItems } = useSelector((state) => state.wishlist);
//   const location = useLocation();

//   const [name, setName] = useState(
//     auth.currentUser?.displayName || auth.currentUser?.email || ""
//   );
//   const [showModal, setShowModal] = useState(false);
//   const [address, setAddress] = useState("");
//   const [loading, setLoading] = useState(false);

//   const [itemOptions, setItemOptions] = useState({});

//   const activeTab = useMemo(() => {
//     if (location.pathname.includes("/wishlist")) return "wishlist";
//     return "cart";
//   }, [location.pathname]);

//   const isEmpty =
//     (activeTab === "cart" && cartItems.length === 0) ||
//     (activeTab === "wishlist" && wishlistItems.length === 0);

//   const handleOptionChange = (id, category, flavor) => {
//     setItemOptions((prev) => ({ ...prev, [id]: { category, flavor } }));
//   };

//   const handleOpenModal = () => {
//     if (!auth.currentUser) {
//         setShowLoginPrompt(true);
//       return;
//     }
//     setShowModal(true);
//   };

//   const handleSubmitOrder = async () => {
//     if (!name.trim() || !address.trim()) {
//       toast.error("Please enter your name and address");
//       return;
//     }
//     setLoading(true);
//     try {
//       await addDoc(collection(db, "orders"), {
//         userId: auth.currentUser.uid,
//         name: name.trim(),
//         state: 0,
//         items: cartItems.map((item) => ({
//           id: item.id,
//           name: item.name,
//           amount: item.amount,
//           price: item.price,
//           image: item.image,
//           category: item.category[0],
//           flavor: itemOptions[item.id]?.flavor || "",
//         })),
//         address: address.trim(),
//         createdAt: serverTimestamp(),
//       });

//       toast.success("Order placed successfully!");
//       cartItems.forEach((item) => dispatch(removeFromCart(item.id)));
//       setName("");
//       setAddress("");
//       setItemOptions({});
//       setShowModal(false);
//       dispatch(clearCart());
//     } catch (err) {
//       console.error("Error placing order:", err);
//       toast.error("Failed to place order.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="cart-page">
//       <Toaster position="top-right" />

//       {isEmpty && (
//         <div className="empty-cart">
//           <img
//             src="/img/empty-cart.svg"
//             alt="Empty"
//             className="empty-cart-img"
//           />
//           <h2>
//             {activeTab === "cart"
//               ? "Your Cart is empty"
//               : "Your Wishlist is empty"}
//           </h2>
//           <Link to="/" className="my-btn my-btn-primary">
//             Continue Shopping
//           </Link>
//         </div>
//       )}

//       {activeTab === "cart" && cartItems.length > 0 && (
//         <div className="cart-box">
//           <h1 className="title text-center py-2 fs-1">Shopping Cart</h1>
//           <div className="cart-items">
//             {cartItems.map((ele, index) => (
//               <ProductCartItem
//                 key={ele.id || `cart-item-${index}`}
//                 ele={ele}
//                 onChangeOption={handleOptionChange}
//               />
//             ))}
//           </div>

//           <button
//             className="my-btn my-btn-primary mt-3 w-100"
//             onClick={handleOpenModal}
//           >
//             Checkout
//           </button>
//         </div>
//       )}

//       {activeTab === "wishlist" && wishlistItems.length > 0 && (
//         <div className="cart-box">
//           <h2 className="title text-center fs-2">
//             Saved for later ({wishlistItems.length} items)
//           </h2>
//           <div className="wishlist-grid">
//             {wishlistItems.map((ele, index) => (
//               <MenuCard
//                 key={ele.id || `wishlist-item-${index}`}
//                 product={ele}
//               />
//             ))}
//           </div>
//         </div>
//       )}

//       {/* ---------------- Checkout Modal ---------------- */}
//         {/* ---------------- Checkout/Login Modal ---------------- */}
//         <Modal
//         show={showModal}
//         onHide={() => setShowModal(false)}
//         centered
//         size="lg"
//         >
//         <Modal.Header closeButton>
//             <Modal.Title className="title">
//             {auth.currentUser ? "Confirm Your Order" : "Not Logged In"}
//             </Modal.Title>
//         </Modal.Header>

//         <Modal.Body>
//             {auth.currentUser ? (
//             <>
//                 {/* --------- Checkout Form --------- */}
//                 <div className="mb-2">
//                 <label className="title form-lable" style={{ fontSize: "1rem" }}>
//                     Name
//                 </label>
//                 <input
//                     type="text"
//                     className="form-control"
//                     placeholder="Enter your name"
//                     required
//                     value={auth.currentUser ? name : ""}
//                     onChange={(e) => setName(e.target.value)}
//                     disabled={!auth.currentUser}
//                 />
//                 </div>
//                 <div className="mb-2">
//                 <label className="title form-lable" style={{ fontSize: "1rem" }}>
//                     Address
//                 </label>
//                 <input
//                     type="text"
//                     className="form-control fw-medium"
//                     placeholder="Enter your address"
//                     required
//                     value={address}
//                     onChange={(e) => setAddress(e.target.value)}
//                 />
//                 </div>
//                 <hr />
//                 <h6 className="title fs-6">Items:</h6>
//                 <div
//                 style={{
//                     maxHeight: "300px",
//                     overflowY: "auto",
//                     border: "1px solid #ddd",
//                     padding: "10px",
//                     borderRadius: "5px",
//                 }}
//                 >
//                 {cartItems.map((item) => (
//                     <div
//                     key={item.id}
//                     className="cart-form-item d-flex align-items-center mb-2"
//                     >
//                     <img
//                         src={item.image}
//                         alt={item.name}
//                         style={{
//                         width: "30%",
//                         height: "80px",
//                         objectFit: "scale-down",
//                         marginRight: "10px",
//                         borderRadius: "5px",
//                         }}
//                     />
//                     <div className="flex-grow-1">
//                         <div className="title fs-6">{item.name}</div>
//                         <div>
//                         <span className="fw-bold fs-6">Quantity: </span>{" "}
//                         <span className="fw-medium fs-6">{item.amount}</span>
//                         </div>
//                         <div>
//                         <span className="fw-bold fs-6">Total Price: </span>{" "}
//                         <span className="fw-medium fs-6">
//                             $
//                             {item.price
//                             ? item.price * (item.amount || 1)
//                             : (item.newPrice || "N/A") * (item.amount || 1)}
//                         </span>
//                         </div>
//                     </div>
//                     </div>
//                 ))}
//                 </div>
//             </>
//             ) : (
//             <>
//                 {/* --------- Not Logged In --------- */}
//                 <p className="fs-6">You need to log in to place an order.</p>
//             </>
//             )}
//         </Modal.Body>

//         <Modal.Footer>
//             <button
//             className="my-btn my-btn-outline"
//             onClick={() => setShowModal(false)}
//             >
//             Cancel
//             </button>
//             {auth.currentUser ? (
//             <button
//                 className="my-btn my-btn-primary"
//                 onClick={handleSubmitOrder}
//                 disabled={loading}
//             >
//                 {loading ? <PageLoader /> : "Place Order"}
//             </button>
//             ) : (
//             <button
//                 className="my-btn my-btn-primary"
//                 onClick={() => navigate("/login")}
//             >
//                 Go to Login
//             </button>
//             )}
//         </Modal.Footer>
//         </Modal>

//     </div>
//   );
// }

// export default Cart;

// src/Pages/CartPage/Cart.jsx
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
          <img src="/img/empty-cart.svg" alt="Empty" className="empty-cart-img" />
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
