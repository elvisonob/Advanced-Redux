import { createSlice, configureStore } from '@reduxjs/toolkit';

const initialState = {
  cart: false,
  notification: null,
  cartContent: [],
  totalQuantity: 0,
};
const shoppingOperations = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    toggleCart(state) {
      state.cart = !state.cart;
    },

    showNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },

    addToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.cartContent.find(
        (eachItem) => eachItem.id === newItem.id
      );
      state.totalQuantity++;
      if (!existingItem) {
        state.cartContent.push({
          id: newItem.id,
          name: newItem.title,
          price: newItem.price,
          totalPrice: newItem.price,
          quantity: 1,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
    },
    removeFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.cartContent.find(
        (eachItem) => eachItem.id === id
      );
      if (existingItem.quantity === 1) {
        state.cartContent = state.cartContent.filter(
          (eachItem) => eachItem.id !== id
        );
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
      state.totalQuantity--;
    },
  },
});

const store = configureStore({
  reducer: { shoppingReducer: shoppingOperations.reducer },
});

export const shoppingAction = shoppingOperations.actions;

export default store;
