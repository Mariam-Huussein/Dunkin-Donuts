import Navbar from "./app/Components/Navbar";
import Footer from "./app/Components/Footer";
import { Routes, Route } from "react-router-dom";
import HomePage from "./app/Pages/HomePage";
import CartPage from "./app/Pages/cart/CartPage";
import AboutPage from "./app/Pages/about/AboutPage";
import MenuPage from "./app/Pages/menu/MenuPage";
import ContactPage from "./app/Pages/contact/ContactPage";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";
import { Provider } from "react-redux";
import { store } from "./app/state/store";
import { Toaster } from "react-hot-toast";
import Auth from "./app/Pages/signIn/AuthPage";
import PageLoader from "./app/Pages/PageLoader";
import ScrollToTop from "./app/Components/ScrollToTop";
import NotFound from "./app/Pages/notFound/NotFound";

function App() {
  return (
    <>
      <Provider store={store}>
        <div className="min-vh-100">
          <PageLoader />
          <Navbar />
          <ScrollToTop />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/menu" element={<MenuPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/wishlist" element={<CartPage />} />
              <Route path="/auth/:type" element={<Auth />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
          <Toaster position="bottom-right" reverseOrder={false} />
        </div>
      </Provider>
    </>
  );
}

export default App;
