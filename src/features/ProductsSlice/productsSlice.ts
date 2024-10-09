import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { BASE_URL } from '../../constants';
import { IProduct } from '../../types';

type ProductsState = {
  products: IProduct[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  category: string;
};

const initialState: ProductsState = {
  products: [],
  status: 'idle',
  error: null,
  category: 'all',
};

export const getProducts = createAsyncThunk<IProduct[], string>(
  'products/getProductsByCategory',
  async (category, { rejectWithValue }) => {
    try {
      const response =
        category === 'all'
          ? await axios(BASE_URL)
          : await axios(`${BASE_URL}/category/${category}`);

      return response.data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  selectors: {
    selectAllProducts: state => state.products,
    selectStatus: state => state.status,
    selectError: state => state.error,
    selectCategory: state => state.category,
  },
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getProducts.pending, state => {
        state.status = 'loading';
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message as string;
      });
  },
});

export const { selectAllProducts, selectStatus, selectError, selectCategory } =
  productsSlice.selectors;

export const { setCategory } = productsSlice.actions;

export default productsSlice.reducer;
