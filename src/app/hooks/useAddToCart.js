import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { addToCart } from "../store/CartSlice";

export const useAddToCart = () => {
  const dispatch = useDispatch();

  const addItemToCart = (product) => {
    if (!product) return;

    const priceToUse = product.newPrice ?? product.price;

    dispatch(
      addToCart({
        ...product,
        price: priceToUse,
        quantity: 1,
      }),
    );

    toast.success(`${product.name} was added to cart`);
  };

  return { addItemToCart };
};
