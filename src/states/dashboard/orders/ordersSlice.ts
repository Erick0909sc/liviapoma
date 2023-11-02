import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { EStateGeneric, IOrders } from "@/shared/types";
import { getOrdersDashboardByApi } from "./ordersApi";
import type { RootState } from "../../store";

export const getAllOrders = createAsyncThunk(
  "dashboardOrders/getAllOrders",
  async (
    {
      page,
      status,
      count,
      search,
    }: { page: number; status: string; count?: number; search?: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await getOrdersDashboardByApi({
        page,
        count,
        search,
        status,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

interface IDashboardUsersState {
  orders: IOrders;
  ordersStatus: EStateGeneric;
}

const initialState: IDashboardUsersState = {
  orders: {} as IOrders,
  ordersStatus: EStateGeneric.IDLE,
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
  },
});

export const { cleanUpOrders, cleanUpUnPaidOrders } =
  dashboardOrdersSlice.actions;

export const selectAllDashboardOrders = (state: RootState) =>
  state.dashboard.orders.orders;
export const selectAllDashboardOrdersStatus = (state: RootState) =>
  state.dashboard.orders.ordersStatus;

export default dashboardOrdersSlice.reducer;
