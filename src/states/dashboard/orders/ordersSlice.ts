import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { EStateGeneric, IOfferDashboard, IOrders } from "@/shared/types";
import {
  getPaidOrdersDashboardByApi,
  getUnPaidOrdersDashboardByApi,
} from "./ordersApi";
import type { RootState } from "../../store";

export const getAllOrders = createAsyncThunk(
  "dashboardOrders/getAllOrders",
  async (
    { page, count, search }: { page: number; count?: number; search?: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await getPaidOrdersDashboardByApi({
        page,
        count,
        search,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getAllUnPaidOrders = createAsyncThunk(
  "dashboardOrders/getAllUnPaidOrders",
  async (
    { page, count, search }: { page: number; count?: number; search?: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await getUnPaidOrdersDashboardByApi({
        page,
        count,
        search,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

interface IDashboardUsersState {
  orders: IOrders;
  unPaidOrders: IOrders;
  ordersStatus: EStateGeneric;
  unPaidOrdersStatus: EStateGeneric;
}

const initialState: IDashboardUsersState = {
  orders: {} as IOrders,
  unPaidOrders: {} as IOrders,
  ordersStatus: EStateGeneric.IDLE,
  unPaidOrdersStatus: EStateGeneric.IDLE,
};

export const dashboardOrdersSlice = createSlice({
  name: "dashboardOrders",
  initialState,
  reducers: {
    cleanUpOrders: (state) => {
      return {
        ...state,
        orders: {} as IOrders,
        ordersStatus: EStateGeneric.IDLE,
      };
    },
    cleanUpUnPaidOrders: (state) => {
      return {
        ...state,
        unPaidOrders: {} as IOrders,
        unPaidOrdersStatus: EStateGeneric.IDLE,
      };
    },
  },
  extraReducers(builder) {
    builder.addCase(getAllOrders.fulfilled, (state, action) => {
      state.orders = action.payload;
      state.ordersStatus = EStateGeneric.SUCCEEDED;
    });

    builder.addCase(getAllOrders.pending, (state, action) => {
      state.ordersStatus = EStateGeneric.PENDING;
    });

    builder.addCase(getAllOrders.rejected, (state, action) => {
      state.ordersStatus = EStateGeneric.FAILED;
    });

    builder.addCase(getAllUnPaidOrders.fulfilled, (state, action) => {
      state.unPaidOrders = action.payload;
      state.unPaidOrdersStatus = EStateGeneric.SUCCEEDED;
    });

    builder.addCase(getAllUnPaidOrders.pending, (state, action) => {
      state.unPaidOrdersStatus = EStateGeneric.PENDING;
    });

    builder.addCase(getAllUnPaidOrders.rejected, (state, action) => {
      state.unPaidOrdersStatus = EStateGeneric.FAILED;
    });
  },
});

export const { cleanUpOrders, cleanUpUnPaidOrders } =
  dashboardOrdersSlice.actions;

export const selectAllDashboardOrders = (state: RootState) =>
  state.dashboard.orders.orders;
export const selectAllDashboardOrdersStatus = (state: RootState) =>
  state.dashboard.orders.ordersStatus;
export const selectAllDashboardUnPaidOrders = (state: RootState) =>
  state.dashboard.orders.unPaidOrders;
export const selectAllDashboardUnPaidOrdersStatus = (state: RootState) =>
  state.dashboard.orders.unPaidOrdersStatus;

export default dashboardOrdersSlice.reducer;
