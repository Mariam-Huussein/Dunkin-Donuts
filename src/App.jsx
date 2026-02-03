import HomePage from "./app/Pages/Home/HomePage";
import AboutPage from "./app/Pages/About/AboutPage";
import MenuPage from "./app/Pages/Menu/MenuPage";
import ContactPage from "./app/Pages/Contact/ContactPage";
import Auth from "./app/Pages/Auth/AuthPage";
import NotFound from "./app/Pages/NotFound/NotFound";
import Layout from "./app/Components/Layout/Layout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store/store";
import { Toaster } from "react-hot-toast";
import AuthProvider from "./app/context/auth.context";
import CartPage from "./app/Pages/Cart/CartPage";
import WishlistPage from "./app/Pages/wishList/WishlistPage";
import GuestRoute from "./app/Components/Auth/GuestRoute/GuestRoute";

export default function App() {
  // Routes configuration
  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <AuthProvider>
          <Layout />
        </AuthProvider>
      ),
      errorElement: <NotFound />,
      children: [
        { index: true, element: <HomePage /> },
        { path: "home", element: <HomePage /> },
        { path: "about", element: <AboutPage /> },
        { path: "menu", element: <MenuPage /> },
        { path: "contact", element: <ContactPage /> },
        { path: "cart", element: <CartPage /> },
        { path: "wishlist", element: <WishlistPage /> },

        {
          path: "auth/:type",
          element: (
            <GuestRoute>
              <Auth />
            </GuestRoute>
          ),
        },

        { path: "*", element: <NotFound /> },
      ],
    },
  ]);
  return (
    <>
      <Provider store={store}>
        <RouterProvider router={routes} />
      </Provider>
      <Toaster
        position="top-center"
        reverseOrder={false}
        containerStyle={{
          zIndex: 9999999,
        }}
      />
    </>
  );
}
