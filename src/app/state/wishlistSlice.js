import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishlistItems: []
};

if(JSON.parse(localStorage.getItem("wishlist-products"))){
  const wishlistProducts =JSON.parse(localStorage.getItem("wishlist-products"));
  initialState.wishlistItems = wishlistProducts;
}


const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const { id } = action.payload;

      const exists = state.wishlistItems.some(item => item.id === id);
      if (!exists) {
        state.wishlistItems.unshift({ ...action.payload });
        localStorage.setItem("wishlist-products", JSON.stringify(state.wishlistItems));
      }
    },

    removeFromWishlist: (state, action) => {
      const { id } = action.payload;
      state.wishlistItems = state.wishlistItems.filter(item => item.id !== id);
      localStorage.setItem("wishlist-products", JSON.stringify(state.wishlistItems));
    },

    moveToCart: (state, action) => {
      const { id } = action.payload;
      state.wishlistItems = state.wishlistItems.filter(item => item.id !== id);
      localStorage.setItem("wishlist-products", JSON.stringify(state.wishlistItems));
    },

    clearWishlist: state => {
      state.wishlistItems = [];
      localStorage.setItem("wishlist-products", JSON.stringify(state.wishlistItems));
    },
  },
});

export const { addToWishlist, removeFromWishlist, moveToCart, clearWishlist } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;
