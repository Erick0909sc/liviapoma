import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { EStateGeneric, Iuser } from "@/shared/types";
// import { RootState } from "@/states/store";
import { EditUsersApi, getallUsersApi, getoneUserApi } from "./usersApi";
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

export const editRolUsers = createAsyncThunk(
  "dashboardUsers/editRolUsers",
  async ({ id, role }: { id: string; role: string }, { rejectWithValue }) => {
    console.log(id, role);
    try {
      const response = await EditUsersApi(id, role);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

interface IDashboardUsersState {
  Users: Iuser[];
  OneUser: Iuser;
  alluserStatus: EStateGeneric;
  userStatus: EStateGeneric;
}

const initialState: IDashboardUsersState = {
  Users: [],
  OneUser: {} as Iuser,
  alluserStatus: EStateGeneric.IDLE,
  userStatus: EStateGeneric.IDLE,
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

    builder.addCase(editRolUsers.fulfilled, (state, action) => {
      state.OneUser = action.payload;

      const userIndex = state.Users.findIndex(
        (user) => user.id === state.OneUser.id
      );
      console.log(userIndex);

      if (userIndex !== -1) {
        // Actualiza el rol del usuario en el estado
        state.Users[userIndex].role = state.OneUser.role;
        state.userStatus = EStateGeneric.SUCCEEDED;
      }
    });

    builder.addCase(editRolUsers.pending, (state, action) => {
      state.userStatus = EStateGeneric.PENDING;
    });

    builder.addCase(editRolUsers.rejected, (state, action) => {
      state.userStatus = EStateGeneric.FAILED;
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

export const SelectoneUserStatus = (state: RootState) =>
  state.dashboard.users.userStatus;

export default dashboardusersSlice.reducer;
