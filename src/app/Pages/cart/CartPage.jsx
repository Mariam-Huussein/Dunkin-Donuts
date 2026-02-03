import ProductCartItem from "../../Components/Cart/ProductCartItem/ProductCartItem";
import CheckoutModal from "../../Components/Common/Modal/CheckoutModal";
import EmptyState from "../../Components/Common/EmptyState/EmptyState";
import "./CartPage.css";
import { useCartPageLogic } from "../../hooks/useCartPageLogic"

export default function CartPage() {
  const {
    cartItems,
    itemOptions,
    showModal,
    handleOptionChange,
    handleClearCart,
    openModal,
    closeModal,
  } = useCartPageLogic();

  // Empty State Check
  if (cartItems.length === 0) {
    return (
      <EmptyState 
        title="Your Cart is empty" 
        imgPath="/img/EmptyCart.png" 
      />
    );
  }

  return (
    <div className="cart-page">
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
          onClick={openModal}
        >
          Checkout
        </button>
      </div>

      <CheckoutModal
        show={showModal}
        onClose={closeModal}
        cartItems={cartItems}
        itemOptions={itemOptions}
        clearCart={handleClearCart}
      />
    </div>
  );
}