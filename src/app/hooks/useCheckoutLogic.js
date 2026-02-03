import { useState, useMemo } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../../firebaseconfig";
import toast from "react-hot-toast";

export const useCheckoutLogic = (cartItems, itemOptions, clearCart, onClose) => {
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [promoMessage, setPromoMessage] = useState("");
  const [isCodeApplied, setIsCodeApplied] = useState(false);

  // 1. Calculate Subtotal (Memoized for performance)
  const subTotal = useMemo(() => {
    return cartItems.reduce((acc, item) => {
      return acc + item.price * (item.amount || 1);
    }, 0);
  }, [cartItems]);

  const finalTotal = subTotal - discount;

  // 2. Handle Coupon
  const handleApplyCoupon = () => {
    if (isCodeApplied) return;

    if (promoCode.trim().toUpperCase() === "DUNKIN20") {
      const discountValue = subTotal * 0.2;
      setDiscount(discountValue);
      setPromoMessage("Promo code applied successfully!");
      setIsCodeApplied(true);
      toast.success("20% Discount Applied!");
    } else {
      setPromoMessage("Invalid promo code");
      setDiscount(0);
      toast.error("Invalid Code");
    }
  };

  // 3. Handle Order Submission (Firebase)
  const handleSubmitOrder = async () => {
    if (!auth.currentUser) {
        toast.error("You must be logged in.");
        return;
    }

    if (!address.trim()) {
      toast.error("Please enter your address");
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, "orders"), {
        userId: auth.currentUser.uid,
        name: auth.currentUser.displayName || "Unknown",
        state: 0, // 0 = Pending
        items: cartItems.map((item) => ({
          id: item.id,
          name: item.name,
          amount: item.amount,
          price: item.price,
          image: item.image,
          flavor: itemOptions[item.id] || "",
        })),
        address: address.trim(),
        subTotal: Number(subTotal.toFixed(2)),
        discount: Number(discount.toFixed(2)),
        totalPrice: Number(finalTotal.toFixed(2)),
        promoCodeUsed: isCodeApplied ? promoCode : null,
        createdAt: serverTimestamp(),
      });

      toast.success("Order placed successfully!");
      
      // Reset State
      clearCart();
      setAddress("");
      setDiscount(0);
      setIsCodeApplied(false);
      setPromoCode("");
      setPromoMessage("");
      
      onClose(); // Close Modal
    } catch (err) {
      console.error("Error placing order:", err);
      toast.error("Failed to place order.");
    } finally {
      setLoading(false);
    }
  };

  return {
    // State
    address, setAddress,
    loading,
    promoCode, setPromoCode,
    promoMessage,
    isCodeApplied,
    
    // Derived Data
    subTotal,
    discount,
    finalTotal,
    currentUser: auth.currentUser,

    // Actions
    handleApplyCoupon,
    handleSubmitOrder,
  };
};