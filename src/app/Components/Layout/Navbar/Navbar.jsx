import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavbarLogic } from "../../../hooks/useNavbarLogic";
import "./Navbar.css";

export default function Navbar() {
  const {
    isMenuOpen,
    scrolled,
    cartCount,
    wishlistCount,
    userData,
    handleLogout,
    toggleMenu,
  } = useNavbarLogic();

  return (
    <header className={scrolled ? "navbar-scrolled" : ""}>
      <nav className="navbar navbar-expand-lg py-3">
        <div className="container bg-red d-flex justify-content-between align-items-center">
          {/* Logo */}
          <Link className="navbar-brand logo mx-lg-auto" to="/">
            <img src="/img/dd-logo.svg" alt="Logo" />
          </Link>

          {/* Mobile toggler */}
          <button
            className={`navbar-toggler ${isMenuOpen ? "open" : ""}`}
            type="button"
            onClick={toggleMenu}
          >
            <span className="toggler-icon"></span>
            <span className="toggler-icon"></span>
            <span className="toggler-icon"></span>
          </button>

          <div
            className={`collapse navbar-collapse ${
              isMenuOpen ? "show" : ""
            } align-items-center text-center`}
          >
            <div className="d-flex justify-content-between flex-lg-row flex-column align-items-center w-100 flex-wrap gap-3">
              <ul className="navbar-nav d-flex flex-lg-row flex-column flex-wrap mx-auto gap-lg-4 mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/menu">
                    Menu
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/about">
                    About
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/contact">
                    Contact
                  </Link>
                </li>
              </ul>

              <div className="d-flex align-items-center gap-3 position-relative">
                {/* Cart */}
                <Link
                  className="nav-link nav-serv position-relative"
                  to="/cart"
                >
                  <FaShoppingCart size={20} />
                  {cartCount > 0 && (
                    <span
                      className="position-absolute top-0 start-100 translate-middle badge rounded-pill"
                      style={{ backgroundColor: "var(--secondary)" }}
                    >
                      {cartCount}
                    </span>
                  )}
                </Link>

                {/* Wishlist */}
                <Link
                  className="nav-link nav-serv position-relative"
                  to="/wishlist"
                >
                  <FaHeart
                    size={20}
                    color={wishlistCount > 0 ? "deeppink" : "inherit"}
                  />
                  {wishlistCount > 0 && (
                    <span
                      className="position-absolute top-0 start-100 translate-middle badge rounded-pill"
                      style={{ backgroundColor: "var(--secondary)" }}
                    >
                      {wishlistCount}
                    </span>
                  )}
                </Link>

                {/* Auth button */}
                {userData ? (
                  <Link
                    className="my-btn my-btn-primary btn-log-out"
                    to="/"
                    onClick={handleLogout}
                  >
                    Log Out
                  </Link>
                ) : (
                  <Link className="my-btn my-btn-primary" to="/auth/sign-in">
                    Sign In
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
