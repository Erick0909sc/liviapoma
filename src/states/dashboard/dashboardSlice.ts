import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { EStateGeneric, IOrderDataDashboard } from "@/shared/types";
import { getAllDataDashboardApi } from "./dashboardApi";

export const getAllData = createAsyncThunk(
  "dashboard/getAllData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllDataDashboardApi();
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
interface IGlobalState {
  data: IOrderDataDashboard;
  dataStatus: EStateGeneric;
}

const initialState: IGlobalState = {
  data: {} as IOrderDataDashboard,
  dataStatus: EStateGeneric.IDLE,
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    cleanUpDataDashboard: (state) => {
      return {
        ...state,
        data: {} as IOrderDataDashboard,
        dataStatus: EStateGeneric.IDLE,
      };
    },
  },
  extraReducers(builder) {
    builder.addCase(getAllData.fulfilled, (state, action) => {
      state.data = action.payload;
      state.dataStatus = EStateGeneric.SUCCEEDED;
    });
    builder.addCase(getAllData.pending, (state, action) => {
      state.dataStatus = EStateGeneric.PENDING;
    });
    builder.addCase(getAllData.rejected, (state, action) => {
      state.dataStatus = EStateGeneric.FAILED;
    });
  },
});

export const { cleanUpDataDashboard } = dashboardSlice.actions;

export const selectDataDashboard = (state: RootState) =>
  state.dashboard.dashboard.data;
export const selectDataDashboardStatus = (state: RootState) =>
  state.dashboard.dashboard.dataStatus;

export default dashboardSlice.reducer;
