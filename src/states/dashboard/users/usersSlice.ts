import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { EStateGeneric, IUser } from "@/shared/types";
// import { RootState } from "@/states/store";
import { getallUsersApi, getoneUserApi } from "./usersApi";
import type { RootState } from "../../store";

export const getAllUsers = createAsyncThunk(
  "dashboardUsers/getAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getallUsersApi();
      // console.log(response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getoneUser = createAsyncThunk(
  "dashboardUsers/getoneUser",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await getoneUserApi(id);
      // console.log(response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

interface IDashboardUsersState {
  Users: IUser[];
  OneUser: IUser;
  alluserStatus: EStateGeneric;
}

const initialState: IDashboardUsersState = {
  Users: [],
  OneUser: {} as IUser,
  alluserStatus: EStateGeneric.IDLE,
};

export const dashboardusersSlice = createSlice({
  name: "dashboardUsers",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.Users = action.payload;
      state.alluserStatus = EStateGeneric.SUCCEEDED;
    });

    builder.addCase(getAllUsers.pending, (state, action) => {
      state.alluserStatus = EStateGeneric.PENDING;
    });

    builder.addCase(getAllUsers.rejected, (state, action) => {
      state.alluserStatus = EStateGeneric.FAILED;
    });
  },
});

// export const {  } = dashboardUsersSlice.actions

export const selectDashboardAllUsers = (state: RootState) =>
  state.dashboard.users.Users;

export const selectusersStatus = (state: RootState) =>
  state.dashboard.users.alluserStatus;

export const selectEditUser = (state: RootState) =>
  state.dashboard.users.OneUser;

export const selectoneUserDashboard = (state: RootState) =>
  state.dashboard.users.OneUser;

export default dashboardusersSlice.reducer;
