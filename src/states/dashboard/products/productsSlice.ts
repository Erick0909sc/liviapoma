import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import { EStateGeneric, ICategory, IProduct } from "@/shared/types";
import { getDashboardProductsByApi } from "./productsApi";

export const getAllProducts = createAsyncThunk(
  "dashboardProducts/getAllProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getDashboardProductsByApi();
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

interface IDashboardProductsState {
  products: IProduct[];
  allProductsStatus: EStateGeneric;
}

const initialState: IDashboardProductsState = {
  products: [],
  allProductsStatus: EStateGeneric.IDLE,
};

export const dashboardProductsSlice = createSlice({
  name: "dashboardProducts",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      state.allProductsStatus = EStateGeneric.SUCCEEDED;
    });
    builder.addCase(getAllProducts.pending, (state, action) => {
      state.allProductsStatus = EStateGeneric.PENDING;
    });
    builder.addCase(getAllProducts.rejected, (state, action) => {
      state.allProductsStatus = EStateGeneric.FAILED;
    });
  },
});

// export const {  } = dashboardProductsSlice.actions

export const selectAllDashboardProducts = (state: RootState) =>
  state.dashboard.products.products;

export const selectAllDashboardProductsStatus = (state: RootState) =>
  state.dashboard.products.allProductsStatus;

export default dashboardProductsSlice.reducer;
