import { useState } from "react";
import { useDispatch } from "react-redux";
import { decreaseAmount, increaseAmount } from "../store/CartSlice";

export const useCartItem = (ele, onChangeOption) => {
  const dispatch = useDispatch();

  const price = Number(ele.newPrice ?? ele.price ?? 0);
  
  const totalPrice = (price * ele.amount).toFixed(2);

  const initialFlavor =
    Array.isArray(ele.flavor) && ele.flavor.length > 0 ? ele.flavor[0] : "";
  
  const [selectedFlavor, setSelectedFlavor] = useState(initialFlavor);

  const handleIncrease = () => {
    dispatch(increaseAmount({ id: ele.id, price }));
  };

  const handleDecrease = () => {
    dispatch(decreaseAmount({ id: ele.id, price }));
  };

  const handleFlavorChange = (e) => {
    const newFlavor = e.target.value;
    setSelectedFlavor(newFlavor);
    if (onChangeOption) {
      onChangeOption(ele.id, newFlavor);
    }
  };

  return {
    price,
    totalPrice,
    selectedFlavor,
    handleIncrease,
    handleDecrease,
    handleFlavorChange,
    hasFlavors: Array.isArray(ele.flavor) && ele.flavor.length > 1,
  };
};