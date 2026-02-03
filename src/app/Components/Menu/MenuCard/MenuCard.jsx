import { Heart, Star } from "lucide-react";
import "./MenuCard.css";
import { useAddToCart } from "../../../hooks/useAddToCart";
import { useWishlist } from "../../../hooks/useWishlist";

export default function MenuCard({ product }) {
  const { addItemToCart } = useAddToCart();
  const { inWishlist, toggleWishlist } = useWishlist(product);

  return (
    <div className="menu-card">
      <div className="image-wrapper">
        <img
          src={product.image || "/placeholder.png"}
          alt={product.name}
          className="menu-image"
        />
        <div className="category-badge">{product.category}</div>
        <button className="wishlist-btn" onClick={toggleWishlist}>
          <Heart
            className={`heart-icon ${inWishlist ? "wishlist-active" : ""}`}
          />
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
          <button
            className="my-btn my-btn-primary"
            onClick={() => addItemToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
