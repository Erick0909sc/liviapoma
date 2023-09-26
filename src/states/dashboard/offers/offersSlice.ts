import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { EStateGeneric, IOfferDashboard } from "@/shared/types";
import {
  getOffersDashboardByApi,
  getOffersDisabledDashboardByApi,
} from "./offersApi";
import type { RootState } from "../../store";

export const getAllOffers = createAsyncThunk(
  "dashboardOffers/getAllOffers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getOffersDashboardByApi();
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getAllOffersDisabled = createAsyncThunk(
  "dashboardOffers/getAllOffersDisabled",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getOffersDisabledDashboardByApi();
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

interface IDashboardUsersState {
  offers: IOfferDashboard[];
  allOffersStatus: EStateGeneric;
  offersDisabled: IOfferDashboard[];
  allOffersDisabledStatus: EStateGeneric;
}

const initialState: IDashboardUsersState = {
  offers: [],
  allOffersStatus: EStateGeneric.IDLE,
  offersDisabled: [],
  allOffersDisabledStatus: EStateGeneric.IDLE,
};

export const dashboardOffersSlice = createSlice({
  name: "dashboardOffers",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getAllOffers.fulfilled, (state, action) => {
      state.offers = action.payload;
      state.allOffersStatus = EStateGeneric.SUCCEEDED;
    });

    builder.addCase(getAllOffers.pending, (state, action) => {
      state.allOffersStatus = EStateGeneric.PENDING;
    });

    builder.addCase(getAllOffers.rejected, (state, action) => {
      state.allOffersStatus = EStateGeneric.FAILED;
    });

    builder.addCase(getAllOffersDisabled.fulfilled, (state, action) => {
      state.offersDisabled = action.payload;
      state.allOffersDisabledStatus = EStateGeneric.SUCCEEDED;
    });

    builder.addCase(getAllOffersDisabled.pending, (state, action) => {
      state.allOffersDisabledStatus = EStateGeneric.PENDING;
    });

    builder.addCase(getAllOffersDisabled.rejected, (state, action) => {
      state.allOffersDisabledStatus = EStateGeneric.FAILED;
    });
  },
});

// export const {  } = dashboardOffersSlice.actions

export const selectAllDashboardOffersStatus = (state: RootState) =>
  state.dashboard.offers.allOffersStatus;
export const selectAllDashboardOffers = (state: RootState) =>
  state.dashboard.offers.offers;
export const selectAllDashboardOffersDisabledStatus = (state: RootState) =>
  state.dashboard.offers.allOffersDisabledStatus;
export const selectAllDashboardOffersDisabled = (state: RootState) =>
  state.dashboard.offers.offersDisabled;

export default dashboardOffersSlice.reducer;
