import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { addToWishlist, removeFromWishlist } from "../store/wishlistSlice";

export const useWishlist = (product) => {
  const dispatch = useDispatch();

  const { wishlistItems } = useSelector((state) => state.wishlist);
  const inWishlist = wishlistItems.some((item) => item.id === product.id);

  const toggleWishlist = () => {
    if (inWishlist) {
      dispatch(removeFromWishlist(product));
      toast.error(`${product.name} removed from wishlist`);
    } else {
      dispatch(addToWishlist(product));
      toast.success(`${product.name} added to wishlist`);
    }
  };

  return { inWishlist, toggleWishlist };
};