import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  total: 0,
  amounts: 0
};

// Load from localStorage
const savedCart = JSON.parse(localStorage.getItem("cart-products"));
if (savedCart) {
  initialState.cartItems = savedCart;
  for (let item of savedCart) {
    initialState.amounts += item.amount || 1;
    initialState.total += (item.price * (item.amount || 1));
  }
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, price, quantity = 1 } = action.payload;
      const existingIndex = state.cartItems.findIndex(item => item.id === id);

      if (existingIndex >= 0) {
        state.cartItems[existingIndex].amount += quantity;
      } else {
        state.cartItems.unshift({ ...action.payload, amount: quantity });
      }
      state.amounts += quantity;
      state.total += price * quantity;
      localStorage.setItem("cart-products", JSON.stringify(state.cartItems));
    },

    decreaseAmount: (state, action) => {
      const { id, price } = action.payload;
      const index = state.cartItems.findIndex(item => item.id === id);
      if (index !== -1) {
        if (state.cartItems[index].amount > 1) {
          state.cartItems[index].amount -= 1;
        } else {
          state.cartItems.splice(index, 1);
        }
        state.amounts -= 1;
        state.total -= price;
        localStorage.setItem("cart-products", JSON.stringify(state.cartItems));
      }
    },

    increaseAmount: (state, action) => {
      const { id, price } = action.payload;
      const index = state.cartItems.findIndex(item => item.id === id);
      if (index !== -1) {
        state.cartItems[index].amount += 1;
        state.amounts += 1;
        state.total += price;
        localStorage.setItem("cart-products", JSON.stringify(state.cartItems));
      }
    },

    removeFromCart: (state, action) => {
      const { id, price, amount } = action.payload;
      const index = state.cartItems.findIndex(item => item.id === id);
      if (index !== -1) {
        state.amounts -= state.cartItems[index].amount;
        state.total -= state.cartItems[index].price * state.cartItems[index].amount;
        state.cartItems.splice(index, 1);
        localStorage.setItem("cart-products", JSON.stringify(state.cartItems));
      }
    },

    clearCart: state => {
      state.cartItems = [];
      state.amounts = 0;
      state.total = 0;
      localStorage.setItem("cart-products", JSON.stringify(state.cartItems));
    }
  }
});

export const { addToCart, decreaseAmount, increaseAmount, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
