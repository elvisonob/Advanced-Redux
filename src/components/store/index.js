import { createSlice, configureStore } from '@reduxjs/toolkit';

const initialState = { cart: false };
const shoppingOperations = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    toggleCart(state) {
      state.cart = !state.cart;
    },
  },
});

const store = configureStore({
  reducer: shoppingOperations.reducer,
});

export const shoppingAction = shoppingOperations.actions;

export default store;
