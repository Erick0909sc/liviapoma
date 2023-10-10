import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from "../store";
import { EStateGeneric, ICategory, IProduct } from "@/shared/types";
import {
  getProductByApi,
  getProductsByApi,
  getProductsByCategoryByApi,
  getProductsWithDiscountByApi,
} from "./productsApi";

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

export const getAllProductsDiscount = createAsyncThunk(
  "products/getAllProductsDiscount",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getProductsWithDiscountByApi();
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getAllProductsByCategory = createAsyncThunk(
  "products/getAllProductsByCategory",
  async (category: string, { rejectWithValue }) => {
    try {
      const response = await getProductsByCategoryByApi(category);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getOneProduct = createAsyncThunk(
  "products/getOneProduct",
  async (code: string, { rejectWithValue }) => {
    try {
      const response = await getProductByApi(code);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

interface IProductsState {
  products: IProduct[];
  productsDiscount: IProduct[];
  productsByCategory: IProduct[];
  product: IProduct;
  allProductsStatus: EStateGeneric;
  allProductsDiscountStatus: EStateGeneric;
  allProductsByCategoryStatus: EStateGeneric;
  oneProductStatus: EStateGeneric;
}

const initialState: IProductsState = {
  products: [],
  productsDiscount: [],
  productsByCategory: [],
  product: {} as IProduct,
  allProductsStatus: EStateGeneric.IDLE,
  allProductsDiscountStatus: EStateGeneric.IDLE,
  allProductsByCategoryStatus: EStateGeneric.IDLE,
  oneProductStatus: EStateGeneric.IDLE,
};
export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    cleanUpProducts: (state) => {
      return {
        ...state,
        products: [],
        allProductsStatus: EStateGeneric.IDLE,
      };
    },
    cleanUpProductsByCategory: (state) => {
      return {
        ...state,
        productsByCategory: [],
        allProductsByCategoryStatus: EStateGeneric.IDLE,
      };
    },
    cleanUpProduct: (state) => {
      return {
        ...state,
        product: {} as IProduct,
        oneProductStatus: EStateGeneric.IDLE,
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

    builder.addCase(getAllProductsDiscount.fulfilled, (state, action) => {
      state.productsDiscount = action.payload;
      state.allProductsDiscountStatus = EStateGeneric.SUCCEEDED;
    });
    builder.addCase(getAllProductsDiscount.pending, (state, action) => {
      state.allProductsDiscountStatus = EStateGeneric.PENDING;
    });
    builder.addCase(getAllProductsDiscount.rejected, (state, action) => {
      state.allProductsDiscountStatus = EStateGeneric.FAILED;
    });

    builder.addCase(getAllProductsByCategory.fulfilled, (state, action) => {
      state.productsByCategory = action.payload;
      state.allProductsByCategoryStatus = EStateGeneric.SUCCEEDED;
    });
    builder.addCase(getAllProductsByCategory.pending, (state, action) => {
      state.allProductsByCategoryStatus = EStateGeneric.PENDING;
    });
    builder.addCase(getAllProductsByCategory.rejected, (state, action) => {
      state.allProductsByCategoryStatus = EStateGeneric.FAILED;
    });

    builder.addCase(getOneProduct.fulfilled, (state, action) => {
      state.product = action.payload;
      state.oneProductStatus = EStateGeneric.SUCCEEDED;
    });
    builder.addCase(getOneProduct.pending, (state, action) => {
      state.oneProductStatus = EStateGeneric.PENDING;
    });
    builder.addCase(getOneProduct.rejected, (state, action) => {
      state.oneProductStatus = EStateGeneric.FAILED;
    });
  },
});

export const { cleanUpProducts, cleanUpProduct } = productsSlice.actions;

export const selectAllProducts = (state: RootState) => state.products.products;
export const selectAllProductsDiscount = (state: RootState) =>
  state.products.productsDiscount;
export const selectAllProductsByCategory = (state: RootState) =>
  state.products.productsByCategory;
export const selectOneProduct = (state: RootState) => state.products.product;

export const selectAllProductsByCategoryStatus = (state: RootState) =>
  state.products.allProductsByCategoryStatus;
export const selectAllProductsStatus = (state: RootState) =>
  state.products.allProductsStatus;
export const selectAllProductsDiscountStatus = (state: RootState) =>
  state.products.allProductsDiscountStatus;
export const selectOneProductStatus = (state: RootState) =>
  state.products.oneProductStatus;

export default productsSlice.reducer;
