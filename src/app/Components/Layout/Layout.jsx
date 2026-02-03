import { Outlet } from "react-router-dom";
import Footer from "./Footer/Footer";
import Navbar from "./Navbar/Navbar";
import ScrollToTop from "./ScrollToTop";

export default function Layout() {
  return (
    <>
      <div className="min-vh-100">
        <Navbar />
        <ScrollToTop />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}
