import { FaRegTrashAlt } from "react-icons/fa";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { useCartItem } from "../../../hooks/useCartItem";
import "./ProductCartItem.css";

function ProductCartItem({ ele, onChangeOption }) {
  const {
    price,
    totalPrice,
    selectedFlavor,
    handleIncrease,
    handleDecrease,
    handleFlavorChange,
    hasFlavors,
  } = useCartItem(ele, onChangeOption);

  return (
    <div className="cart-item">
      <div className="cart-item-container">
        {/* Image Section */}
        <div
          className={`cart-item-img-container ${
            ele.oldPrice ? "cart-item-image-offer" : ""
          }`}
        >
          <img src={ele.image} alt={ele.name} className="cart-item-image" />
        </div>

        {/* Details Section */}
        <div className="cart-item-details justify-content-center">
          <h3 className="title cart-item-title">{ele.name}</h3>
          <p className="cart-item-description">{ele.description}</p>

          {/* Unit Price */}
          <p className="cart-item-price d-flex">
            <span className="title fs-6 cart-item-title fw-normal">
              Price:{" "}
            </span>
            <span className="currency ms-1 fs-6">$</span>
            <span className="fs-6">{price}</span>
          </p>

          {/* Total Price */}
          <p className="cart-item-price fs-6 d-flex align-items-center">
            <span className="title fs-6 cart-item-title fw-normal">
              Total Price:{" "}
            </span>
            <span className="currency ms-1">$</span>
            {totalPrice}
          </p>

          <div className="cart-item-meta control-card">
            {/* FLAVOR SELECTOR */}
            {hasFlavors && (
              <div className="cart-item-price mb-2 d-flex align-items-center gap-1">
                <label className="title fs-6 cart-item-title fw-normal">
                  Flavor:{" "}
                </label>
                <select
                  className="form-select fw-semibold ps-2 pe-5 py-1 fs-6"
                  value={selectedFlavor}
                  onChange={handleFlavorChange}
                >
                  {ele.flavor.map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
          {/* QUANTITY CONTROLS */}
          <div className="cart-item-price fs-6 d-flex align-items-center">
            <span className="title fs-6 cart-item-title fw-normal">
              Quantity:{"  "}
            </span>
            <div className="cart-item-actions">
              <div className="quantity-control">
                {/* Decrease / Remove Button */}
                {ele.amount > 1 ? (
                  <FaMinus
                    className="icon clickable"
                    onClick={handleDecrease}
                  />
                ) : (
                  <FaRegTrashAlt
                    className="icon clickable text-danger"
                    onClick={handleDecrease}
                  />
                )}

                <span className="quantity">{ele.amount}</span>

                {/* Increase Button */}
                <FaPlus className="icon clickable" onClick={handleIncrease} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCartItem;
