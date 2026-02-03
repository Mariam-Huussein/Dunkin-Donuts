import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./CartSlice.js";
import wishlistReducer from './wishlistSlice.js'

export const store = configureStore({
  reducer: {
        cart: cartReducer,
        wishlist: wishlistReducer,
  },
});
