import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../store/CartSlice";

export const useCartLogic = () => {
  const dispatch = useDispatch();
  
  // 1. Redux State
  const { cartItems } = useSelector((state) => state.cart);

  // 2. Local State
  const [itemOptions, setItemOptions] = useState({});
  const [showModal, setShowModal] = useState(false);

  // 3. Handlers (Logic Functions)
  const handleOptionChange = (id, flavor) => {
    setItemOptions((prev) => ({ ...prev, [id]: flavor }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    setItemOptions({});
    setShowModal(false);
  };

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  // 4. Return everything the UI needs
  return {
    cartItems,
    itemOptions,
    showModal,
    handleOptionChange,
    handleClearCart,
    openModal,
    closeModal,
  };
};