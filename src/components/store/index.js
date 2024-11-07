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
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.cartContent = action.payload.items;
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

// to keep my components lean, so i bring the codes here

export const sendCartData = (cartContent) => {
  return async (dispatch) => {
    dispatch(
      shoppingAction.showNotification({
        status: 'pending',
        title: 'Sending...',
        message: 'Sending Cart data',
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        'https://redux-server-dce7e-default-rtdb.firebaseio.com/cart.json',
        {
          method: 'PUT',
          body: JSON.stringify(cartContent),
        }
      );

      if (!response.ok) {
        throw new Error('Sending cart data failed');
      }

      dispatch(
        shoppingAction.showNotification({
          status: 'success',
          message: 'success',
          title: 'Sent cart data successful',
        })
      );
    };

    await sendRequest().catch(() => {
      dispatch(
        shoppingAction.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Sending Cart Data failed',
        })
      );
    });
  };
};

export const fetchRequest = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        'https://redux-server-dce7e-default-rtdb.firebaseio.com/cart.json'
      );

      if (!response.ok) {
        throw new Error('Could not load data');
      }

      const data = await response.json();
      return data;
    };
    try {
      const cartData = await fetchData();
      dispatch(shoppingAction.replaceCart(cartData));
    } catch (error) {
      dispatch(
        shoppingAction.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Fetching Cart Data failed',
        })
      );
    }
  };
};

const store = configureStore({
  reducer: { shoppingReducer: shoppingOperations.reducer },
});

export const shoppingAction = shoppingOperations.actions;

export default store;
