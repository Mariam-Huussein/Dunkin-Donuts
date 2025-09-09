// import React, { useState } from "react"
// import { Heart, Plus, Star } from "lucide-react"
// import "./MenuCard.css"

// export default function MenuCard({ id, name, description, price, rating, image, category }) {
//   const [inWishlist, setInWishlist] = useState(false)

//   const handleAddToCart = () => {
//     alert(`${name} added to cart! 🛒`)
//   }

//   const handleWishlistToggle = () => {
//     setInWishlist(!inWishlist)
//   }

//   return (
//     <div className="menu-card">
//       <div className="image-wrapper">
//         <img src={image || "/placeholder.png"} alt={name} className="menu-image" />
//         <div className="category-badge">{category}</div>
//         <button className="wishlist-btn" onClick={handleWishlistToggle}>
//           <Heart className={`icon ${inWishlist ? "wishlist-active" : ""}`} />
//         </button>
//       </div>

//       <div className="menu-content">
//         <div className="menu-header">
//           <h3 className="menu-title">{name}</h3>
//           <div className="menu-rating">
//             <Star className="star-icon" />
//             <span>{rating}</span>
//           </div>
//         </div>

//         <p className="menu-desc">{description}</p>

//         <div className="menu-footer">
//           <span className="menu-price">${price.toFixed(2)}</span>
//           <button className="btn-add" onClick={handleAddToCart}>
//             <Plus className="plus-icon" /> Add to Cart
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }

// import { useState } from "react";
// import { Heart, Plus, Star } from "lucide-react";
// import { useDispatch, useSelector } from "react-redux";
// import { addToCart } from "../state/CartSlice";
// import { addToWishlist, removeFromWishlist } from "../state/wishlistSlice";
// import "./MenuCard.css";
// import { toast } from "react-hot-toast";

// export default function MenuCard({ product }) {
//   const dispatch = useDispatch();
//   const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);

//   // شوف هل المنتج موجود في الـ wishlist
//   const isInWishlist = wishlistItems.some((item) => item.id === product.id);

//   const handleAddToCart = (product) => {
//     dispatch(addToCart({ ...product, quantity: 1 }));
//     toast.success(`${product.name} was added to Cart 🛒`);
//   };

//   const handleWishlistToggle = () => {
//     if (isInWishlist) {
//       dispatch(removeFromWishlist(product.id));
//       toast.error(`${product.name} removed from Wishlist ❌`);
//     } else {
//       dispatch(addToWishlist(product));
//       toast.success(`${product.name} added to Wishlist ❤️`);
//     }
//   };

//   return (
//     <div className="menu-card">
//       <div className="image-wrapper">
//         <img
//           src={product.image || "/placeholder.png"}
//           alt={product.name}
//           className="menu-image"
//         />
//         <div className="category-badge">{product.category}</div>
//         <button className="wishlist-btn" onClick={handleWishlistToggle}>
//           <Heart className={`heart-icon ${isInWishlist ? "wishlist-active" : ""}`} />
//         </button>
//       </div>

//       <div className="menu-content">
//         <div className="menu-header">
//           <h3 className="menu-title">{product.name}</h3>
//           <div className="menu-rating">
//             <Star className="star-icon" />
//             <span>{product.rating}</span>
//           </div>
//         </div>

//         <p className="menu-desc">{product.description}</p>

//         <div className="menu-footer">
//           <span className="menu-price">${product.price.toFixed(2)}</span>
//           <button className="btn-add" onClick={() => handleAddToCart(product)}>
//             <Plus className="plus-icon" /> Add to Cart
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

import { Heart, Star } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../state/CartSlice";
import { addToWishlist, removeFromWishlist } from "../state/wishlistSlice";
import "./MenuCard.css";
import { toast } from "react-hot-toast";

export default function MenuCard({ product }) {
  const dispatch = useDispatch();
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const inWishlist = wishlistItems.some((item) => item.id === product.id);

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity: 1 }));
    toast.success(`${product.name} was added to cart`);
  };

  const handleWishlistToggle = () => {
    if (inWishlist) {
      dispatch(removeFromWishlist(product));
      toast.error(`${product.name} removed from wishlist`);
    } else {
      dispatch(addToWishlist(product));
      toast.success(`${product.name} added to wishlist`);
    }
  };

  return (
    <div className="menu-card">
      <div className="image-wrapper">
        <img
          src={product.image || "/placeholder.png"}
          alt={product.name}
          className="menu-image"
        />
        <div className="category-badge">{product.category}</div>
        <button className="wishlist-btn" onClick={handleWishlistToggle}>
          <Heart className={`heart-icon ${inWishlist ? "wishlist-active" : ""}`} />
        </button>
      </div>

      <div className="menu-content">
        <div className="menu-header justify-content-between">
          <h3 className="title menu-title">{product.name}</h3>
          <div className="menu-rating">
            <Star className="star-icon" />
            <span>{product.rating}</span>
          </div>
        </div>

        <p className="menu-desc desc-scroll">{product.description}</p>

        <div className="menu-footer">
          <span className="menu-price">${product.price.toFixed(2)}</span>
          <button className="my-btn my-btn-primary" onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}