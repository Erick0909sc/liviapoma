import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from "../store";
import { EStateGeneric, ICategory, IProduct } from "@/shared/types";
import {
  getProductByApi,
  getProductsByApi,
  getcategoriesByApi,
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

export const getAllCategories = createAsyncThunk(
  "products/getAllCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getcategoriesByApi();
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

interface IProductsState {
  products: IProduct[];
  product: IProduct;
  topRatedProducts: IProduct[];
  categories: ICategory[];
  allProductsStatus: EStateGeneric;
  oneProductStatus: EStateGeneric;
  allCategoryStatus: EStateGeneric;
}

const initialState: IProductsState = {
  products: [],
  product: {} as IProduct,
  categories: [],
  topRatedProducts: [],
  allProductsStatus: EStateGeneric.IDLE,
  oneProductStatus: EStateGeneric.IDLE,
  allCategoryStatus: EStateGeneric.IDLE,
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
    cleanUpProduct: (state) => {
      return {
        ...state,
        product: {} as IProduct,
        oneProductStatus: EStateGeneric.IDLE,
      };
    },
    selectTopRatedProducts: (state) => {
      const topRatedProducts = [...state.products].sort(
        (a, b) => b.rating - a.rating
      );
      const orderbyratin = topRatedProducts.slice(0, 5);
      return {
        ...state,
        topRatedProducts: orderbyratin,
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

    builder.addCase(getAllCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
      state.allCategoryStatus = EStateGeneric.SUCCEEDED;
    });
    builder.addCase(getAllCategories.pending, (state, action) => {
      state.allCategoryStatus = EStateGeneric.PENDING;
    });
    builder.addCase(getAllCategories.rejected, (state, action) => {
      state.allCategoryStatus = EStateGeneric.FAILED;
    });
  },
});

export const { cleanUpProducts, selectTopRatedProducts, cleanUpProduct } =
  productsSlice.actions;

export const selectAllProducts = (state: RootState) => state.products.products;
export const selectOneProduct = (state: RootState) => state.products.product;
export const selectProductByrating = (state: RootState) =>
  state.products.topRatedProducts;
export const selectAllCategory = (state: RootState) =>
  state.products.categories;

export const selectAllCategoriesStatus = (state: RootState) =>
  state.products.allCategoryStatus;
export const selectAllProductsStatus = (state: RootState) =>
  state.products.allProductsStatus;
export const selectOneProductStatus = (state: RootState) =>
  state.products.oneProductStatus;

export default productsSlice.reducer;
