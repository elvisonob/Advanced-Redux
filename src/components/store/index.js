import { createSlice, configureStore } from '@reduxjs/toolkit';

const initialState = { cart: false, cartContent: [], totalQuantity: 0 };
const shoppingOperations = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    toggleCart(state) {
      state.cart = !state.cart;
    },
    // when button clicked, all the items should be added to cart
    addToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.cartContent.find(
        (eachItem) => eachItem.id === newItem.id
      );
      if (!existingItem) {
        state.cartContent.push({
          itemId: newItem.id,
          name: newItem.name,
          price: newItem.price,
          totalPrice: newItem.price,
          quantity: 1,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
    },
  },
});

const store = configureStore({
  reducer: { shoppingReducer: shoppingOperations.reducer },
});

export const shoppingAction = shoppingOperations.actions;

export default store;
