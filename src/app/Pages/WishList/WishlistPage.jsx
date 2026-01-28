import { useSelector } from "react-redux";
import MenuCard from "../../Components/Menu/MenuCard/MenuCard";
import EmptyState from "../../Components/Common/EmptyState/EmptyState";
import "../Cart/CartPage.css";

export default function WishlistPage() {
  const { wishlistItems } = useSelector((state) => state.wishlist);

  if (wishlistItems.length === 0) {
    return (
      <EmptyState
        title="Your Wishlist is empty"
        imgPath="/img/EmptyWishlist.png"
      />
    );
  }

  return (
    <div className="cart-page">
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
    </div>
  );
}
