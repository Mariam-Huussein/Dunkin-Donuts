import { useDispatch } from "react-redux";
import { addToCart } from "../../state/CartSlice";
import "./../MenuCard.css";
import "./OfferList.css";
import { toast } from "react-hot-toast";

const OfferCard = ({ product }) => {
  const dispatch = useDispatch();

  if (!product) return null;

  const handleAddToCart = () => {
    const priceToUse = product.newPrice ?? product.price;

    dispatch(
      addToCart({
        ...product,
        price: priceToUse,
        quantity: 1,
      })
    );
    toast.success(`${product.name} was added to cart`);
  };

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
          <button className="my-btn my-btn-primary" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default OfferCard;
