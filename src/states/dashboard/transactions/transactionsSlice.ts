import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { EStateGeneric, IOfferDashboard, IOrders } from "@/shared/types";
import {
  getPaidOrdersDashboardByApi,
  getUnPaidOrdersDashboardByApi,
} from "./transactionsApi";
import type { RootState } from "../../store";

export const getAllTransactions = createAsyncThunk(
  "dashboardTransactions/getAllTransactions",
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

export const getAllUnPaidTransactions = createAsyncThunk(
  "dashboardTransactions/getAllUnPaidTransactions",
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

interface IDashboardTransactionsState {
  transactions: IOrders;
  unPaidTransactions: IOrders;
  transactionsStatus: EStateGeneric;
  unPaidtransactionsStatus: EStateGeneric;
}

const initialState: IDashboardTransactionsState = {
  transactions: {} as IOrders,
  unPaidTransactions: {} as IOrders,
  transactionsStatus: EStateGeneric.IDLE,
  unPaidtransactionsStatus: EStateGeneric.IDLE,
};

export const dashboardTransactionsSlice = createSlice({
  name: "dashboardTransactions",
  initialState,
  reducers: {
    cleanUpTransactions: (state) => {
      return {
        ...state,
        transactions: {} as IOrders,
        transactionsStatus: EStateGeneric.IDLE,
      };
    },
    cleanUpUnPaidTransactions: (state) => {
      return {
        ...state,
        unPaidTransactions: {} as IOrders,
        unPaidtransactionsStatus: EStateGeneric.IDLE,
      };
    },
  },
  extraReducers(builder) {
    builder.addCase(getAllTransactions.fulfilled, (state, action) => {
      state.transactions = action.payload;
      state.transactionsStatus = EStateGeneric.SUCCEEDED;
    });

    builder.addCase(getAllTransactions.pending, (state, action) => {
      state.transactionsStatus = EStateGeneric.PENDING;
    });

    builder.addCase(getAllTransactions.rejected, (state, action) => {
      state.transactionsStatus = EStateGeneric.FAILED;
    });

    builder.addCase(getAllUnPaidTransactions.fulfilled, (state, action) => {
      state.unPaidTransactions = action.payload;
      state.unPaidtransactionsStatus = EStateGeneric.SUCCEEDED;
    });

    builder.addCase(getAllUnPaidTransactions.pending, (state, action) => {
      state.unPaidtransactionsStatus = EStateGeneric.PENDING;
    });

    builder.addCase(getAllUnPaidTransactions.rejected, (state, action) => {
      state.unPaidtransactionsStatus = EStateGeneric.FAILED;
    });
  },
});

export const { cleanUpTransactions, cleanUpUnPaidTransactions } =
  dashboardTransactionsSlice.actions;

export const selectAllDashboardTransactions = (state: RootState) =>
  state.dashboard.transactions.transactions;
export const selectAllDashboardTransactionsStatus = (state: RootState) =>
  state.dashboard.transactions.transactionsStatus;
export const selectAllDashboardUnPaidTransactions = (state: RootState) =>
  state.dashboard.transactions.unPaidTransactions;
export const selectAllDashboardUnPaidTransactionsStatus = (state: RootState) =>
  state.dashboard.transactions.unPaidtransactionsStatus;

export default dashboardTransactionsSlice.reducer;
