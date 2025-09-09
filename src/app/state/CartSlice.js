// import { createSlice } from "@reduxjs/toolkit";

// const cartSlice = createSlice({
//   name: "cart",
//   initialState: {
//     items: [],
//   },
//   reducers: {
//     addToCart: (state, action) => {
//       state.items.push(action.payload);
//     },
//     removeFromCart: (state, action) => {
//       state.items = state.items.filter(item => item.id !== action.payload);
//     },
//     clearCart: (state) => {
//       state.items = [];
//     },
//   },
// });

// export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
// export default cartSlice.reducer;

// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   cartItems: [],
//   total: 0,
//   amounts: 0
// };

// if(JSON.parse(localStorage.getItem("cart-products"))){
// const cartProducts =JSON.parse(localStorage.getItem("cart-products"))
// initialState.cartItems = cartProducts
// for(let i =0;i< cartProducts.length; i++){
//   initialState.amounts += cartProducts[i].quantity
//   initialState.total += cartProducts[i].price * cartProducts[i].quantity
// }
// }

// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     addToCart: (state, action) => {
//       const { id, price, quantity} = action.payload;
    
//       const existingIndex = state.cartItems.findIndex(
//         item => item.id === id 
//       );
    
//       if (existingIndex >= 0) {
//         state.cartItems[existingIndex].quantity += quantity;
//         state.amounts += quantity
//         localStorage.setItem("cart-products", JSON.stringify(state.cartItems))
//       } else {
//         state.cartItems.unshift({ ...action.payload, amount: 1 });
//         state.amounts += quantity
//         localStorage.setItem("cart-products", JSON.stringify(state.cartItems))
//       }
//       state.total += price;
//     },
    
//     decreaseAmount: (state, action) => {
//       const { id, price } = action.payload;
    
//       const index = state.cartItems.findIndex(
//         item => item.id === id 
//       );
    
//       if (index !== -1) {
//         if (state.cartItems[index].quantity > 1) {
//           state.cartItems[index].quantity -= 1;
//           localStorage.setItem("cart-products", JSON.stringify(state.cartItems))

//           state.amounts -= 1
//         } else {
//           state.cartItems.splice(index, 1);
//           localStorage.setItem("cart-products", JSON.stringify(state.cartItems))
//           state.amounts -= 1
//         }
//         state.total -= price ;
//       }
//     },
// removeFromCart: (state, action) => {
//   const { id, price, quantity } = action.payload;
//   const itemIndex = state.cartItems.findIndex(item => item.id === id);
  
//   if (itemIndex !== -1) {
//     state.cartItems.splice(itemIndex, 1);
//     state.amounts -= quantity;
//     state.total -= price * quantity;
//     localStorage.setItem("cart-products", JSON.stringify(state.cartItems));
//   }
// },
    
//     increaseAmount: (state, action) => {
//       const { id, price } = action.payload;
    
//       const index = state.cartItems.findIndex(
//         item => item.id === id 
//       );
    
//       if (index !== -1) {
//         state.cartItems[index].quantity += 1;
//         localStorage.setItem("cart-products", JSON.stringify(state.cartItems))
//         state.total += price;
//         state.amounts += 1
//       }
//     },    
//     clearCart: state => {
//       state.cartItems = [];
//       localStorage.setItem("cart-products", JSON.stringify(state.cartItems))
//       state.total = 0
//       state.amounts = 0
//     }
//   }
// });

// export const { addToCart, decreaseAmount, increaseAmount, removeFromCart, clearCart } = cartSlice.actions;

// export default cartSlice.reducer;

// cartSlice.js
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
