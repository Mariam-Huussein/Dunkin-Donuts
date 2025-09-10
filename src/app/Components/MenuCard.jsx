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