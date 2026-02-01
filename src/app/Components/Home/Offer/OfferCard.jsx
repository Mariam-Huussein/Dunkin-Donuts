import "../../Menu/MenuCard/MenuCard.css";
import "./OfferList.css";
import { useAddToCart } from "../../../hooks/useAddToCart";

const OfferCard = ({ product }) => {
  const { addItemToCart } = useAddToCart();

  return (
    <div className="menu-card offer-card">
      <div className="image-wrapper">
        <img
          src={product.image || "/placeholder.png"}
          alt={product.name || "No Name"}
          className="menu-image"
        />
      </div>

      <div className="menu-content">
        <div className="menu-header justify-content-start">
          <h3 className="title menu-title">
            {product.name || "Unnamed Product"}
          </h3>
        </div>

        <p className="menu-desc">
          {product.description || "No description available."}
        </p>

        <div className="menu-footer">
          <span className="menu-price">
            ${product.newPrice ? product.newPrice.toFixed(2) : ""}
            <span className="old-price">
              $
              {product.oldPrice !== undefined
                ? product.oldPrice.toFixed(2)
                : ""}
            </span>
          </span>
          <button className="my-btn my-btn-primary" onClick={() => addItemToCart(product)}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default OfferCard;
