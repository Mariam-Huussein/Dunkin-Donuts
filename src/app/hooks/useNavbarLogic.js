import { useState, useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import { AuthContext } from "../context/auth.context";

// Handles navbar state and business logic
export function useNavbarLogic() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { userData, handleLogout , loading } = useContext(AuthContext);

  // Get cart items count from redux
  const cartCount = useSelector(
    (state) => state.cart?.cartItems?.length || 0
  );

  // Get wishlist items count from redux
  const wishlistCount = useSelector(
    (state) => state.wishlist?.wishlistItems?.length || 0
  );

  // Detect scroll position to update navbar style
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Toggle mobile menu
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return {
    isMenuOpen,
    scrolled,
    cartCount,
    wishlistCount,
    userData,
    handleLogout,
    loading,
    toggleMenu,
  };
}