import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { ICart } from '../../types';

type CartState = {
  cart: ICart[];
  quantity: number;
};

const initialState: CartState = {
  cart: [],
  quantity: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  selectors: {
    selectCart: state => state.cart,
    selectQuantity: state => state.quantity,
  },
  reducers: {
    addProductToCart(state, action: PayloadAction<ICart>) {
      state.cart.push({
        ...action.payload,
      });
      state.quantity += 1;
    },
    incrementProductQauntity(state, action: PayloadAction<number>) {
      const product = state.cart.find(item => item.id === action.payload);

      if (product) {
        product.quantity += 1;
        state.quantity += 1;
      }
    },
    decrementProductQauntity(state, action: PayloadAction<number>) {
      const product = state.cart.find(item => item.id === action.payload);

      if (product) {
        if (product.quantity === 1) {
          state.cart = state.cart.filter(item => item.id !== action.payload);
          state.quantity -= 1;
        } else {
          product.quantity -= 1;
          state.quantity -= 1;
        }
      }
    },
    removeProductFromCart(state, action: PayloadAction<number>) {
      const product = state.cart.find(item => item.id === action.payload);

      if (product) {
        state.cart = state.cart.filter(item => item.id !== action.payload);
        state.quantity -= product.quantity;
      }
    },
  },
});

export const {
  addProductToCart,
  incrementProductQauntity,
  decrementProductQauntity,
  removeProductFromCart,
} = cartSlice.actions;

export const { selectCart, selectQuantity } = cartSlice.selectors;

export default cartSlice.reducer;
