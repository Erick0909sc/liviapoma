import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { EStateGeneric, IProduct } from '@/shared/types'
import { getProductsByApi } from './productsApi';


export const getAllProducts = createAsyncThunk(
  "products/getAllProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getProductsByApi();
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

interface IProductsState {
  
  products: IProduct[]
  allProductsStatus: EStateGeneric
}

const initialState: IProductsState = {
  products: [],
  allProductsStatus: EStateGeneric.IDLE
}

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    cleanUpProducts: (state) => {
      return {
        ...state,
        products: [],
        allProductsStatus: EStateGeneric.IDLE,
      };
    },
  },
  extraReducers(builder) {
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      state.products = action.payload;
      state.allProductsStatus = EStateGeneric.SUCCEEDED;
    });
    builder.addCase(getAllProducts.pending, (state, action) => {
      state.allProductsStatus = EStateGeneric.PENDING;
    });
    builder.addCase(getAllProducts.rejected, (state, action) => {
      state.allProductsStatus = EStateGeneric.FAILED;
    });
  },
})


export const { cleanUpProducts } = productsSlice.actions


export const selectAllProducts = (state: RootState) => state.products.products
export const selectAllProductsStatus = (state: RootState) => state.products.allProductsStatus

export default productsSlice.reducer