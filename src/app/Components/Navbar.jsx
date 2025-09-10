import { useState, useEffect } from "react";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import "./Navbar.css";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { auth } from "./../../../firebaseconfig";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const savedUser = JSON.parse(localStorage.getItem("user"));
  
  const cartCount = useSelector((state) => state.cart?.cartItems?.length || 0);
  const wishlistCount = useSelector(
    (state) => state.wishlist?.wishlistItems?.length || 0
  );

  const handleLogout = async () => {
  try {
    await signOut(auth); 
    localStorage.removeItem("user");
    window.location.reload();
  } catch (error) {
      toast.error("Logout failed:");
      console.error("Logout failed:", error);
  }
};
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className={`${scrolled ? "navbar-scrolled" : ""}`} >
      <nav className="navbar navbar-expand-lg py-3">
        <div className="container d-flex justify-content-between align-items-center">
          <a className="navbar-brand logo mx-lg-auto" href="/">
            <img src="img/dd-logo.svg" alt="Logo" />
          </a>

          <div>
            <button
              className={`navbar-toggler ${isMenuOpen ? "open" : ""}`}
              type="button"
              onClick={toggleMenu}
            >
              <span className="toggler-icon"></span>
              <span className="toggler-icon"></span>
              <span className="toggler-icon"></span>
            </button>
          </div>

          <div
            className={`collapse navbar-collapse ${
              isMenuOpen ? "show" : ""
            } align-items-center text-center`}
            id="navbarContent"
          >
            <div className="d-flex justify-content-between flex-lg-row flex-column align-items-center w-100 flex-wrap gap-3">
              <ul className="navbar-nav d-flex flex-lg-row flex-column flex-wrap mx-auto gap-lg-4 mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/menu">Menu</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/about">About</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/contact">Contact</Link>
                </li>
              </ul>

              <div className="d-flex align-items-center gap-3 position-relative">
                <Link
                  className="nav-link nav-serv position-relative"
                  to="/cart"
                >
                  <FaShoppingCart size={20} />
                  {cartCount > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill" style={{backgroundColor:"var(--secondary)"}}>
                      {cartCount}
                    </span>
                  )}
                </Link>

                <Link
                  className="nav-link nav-serv position-relative"
                  to="/wishlist"
                >
                  <FaHeart
                    size={20}
                    color={wishlistCount > 0 ? "deeppink" : "inherit"}
                  />
                  {wishlistCount > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill" style={{backgroundColor:"var(--secondary)"}}>
                      {wishlistCount}
                    </span>
                  )}
                </Link>

              {savedUser ? (
                <Link className="my-btn my-btn-primary btn-log-out" to="/" onClick={handleLogout}>Log Out</Link>
              ) : (
                <Link className="my-btn my-btn-primary" to="/auth/sign-in">Sign In</Link>
              )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
