import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { EStateGeneric, ICategory, IEditUser, IOneUser, IOrders, } from '@/shared/types'
import { getorderAPI, orderUserHistoryAPI, postUserApi, putUserDataApi } from './usersApi';
import { processImage } from '@/shared/ultis';
import { getoneUserApi } from '../dashboard/users/usersApi';

export const postUser = createAsyncThunk(
  "users/postUser",
  async ({ name, email, password, photo }: { name: string, email: string, password: string, photo: File | null }, { rejectWithValue }) => {
    try {
      let responseImage
      if (photo) {
        responseImage = await processImage(photo);
      }
      const response = await postUserApi({ name, email, password, image: responseImage?.data });
      const statusCode = response.status;
      if (statusCode === 201) {
        return response.data;
      } else {
        return rejectWithValue(response.data);
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);



export const putUser = createAsyncThunk(
  "users/putUser",
  async ({ id, email, password, image, name }: { id: string, name: string, email: string, password: string, image: File | null }, { rejectWithValue }) => {
    try {
      let responseImage
      if (image) {
        responseImage = await processImage(image);
      }
      const response = await putUserDataApi({ id, name, email, password, image: responseImage?.data })
      const statusCode = response.status;
      if (statusCode === 200) {
        return response.data;
      } else {
        return rejectWithValue(response.data);
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getoneUser = createAsyncThunk(
  "users/getoneUser",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await getoneUserApi(id)
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);




export const getOrdersPending = createAsyncThunk(
  "users/getOrdersPending",
  async (userId: string, { rejectWithValue }) => {
    console.log(userId);
    try {
      const response = await getorderAPI(userId)
      console.log(response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


export const getOrdersHistory = createAsyncThunk(
  "users/getOrdersHistory",
  async (userId: string, { rejectWithValue }) => {
    console.log(userId);
    try {
      const response = await orderUserHistoryAPI(userId)
      console.log(response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);





interface IUsersState {
  userStatus: EStateGeneric,
  orderStatus: EStateGeneric,
  OneUser: IOneUser
  EditUser: IEditUser
  ordersPending: IOrders[]
  orderHistory: IOrders[]
}

const initialState: IUsersState = {
  userStatus: EStateGeneric.IDLE,
  EditUser: {} as IEditUser,
  OneUser: {} as IOneUser,
  ordersPending: [],
  orderHistory: [],
  orderStatus: EStateGeneric.IDLE
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},


  extraReducers(builder) {

    builder.addCase(postUser.fulfilled, (state, action) => {
      state.userStatus = EStateGeneric.SUCCEEDED;
    });
    builder.addCase(postUser.pending, (state, action) => {
      state.userStatus = EStateGeneric.PENDING;
    });
    builder.addCase(postUser.rejected, (state, action) => {
      state.userStatus = EStateGeneric.FAILED;
    });


    builder.addCase(putUser.fulfilled, (state, action) => {
      state.EditUser = action.payload
      state.userStatus = EStateGeneric.SUCCEEDED;
    });
    builder.addCase(putUser.pending, (state, action) => {
      state.userStatus = EStateGeneric.PENDING;
    });
    builder.addCase(putUser.rejected, (state, action) => {
      state.userStatus = EStateGeneric.FAILED;
    });




    builder.addCase(getoneUser.fulfilled, (state, action) => {
      state.OneUser = action.payload
      state.userStatus = EStateGeneric.SUCCEEDED;
    });
    builder.addCase(getoneUser.pending, (state, action) => {
      state.userStatus = EStateGeneric.PENDING;
    });
    builder.addCase(getoneUser.rejected, (state, action) => {
      state.userStatus = EStateGeneric.FAILED;
    });


    builder.addCase(getOrdersPending.fulfilled, (state, action) => {
      state.ordersPending = action.payload
      state.orderStatus = EStateGeneric.SUCCEEDED;
    });
    builder.addCase(getOrdersPending.pending, (state, action) => {
      state.orderStatus = EStateGeneric.PENDING;
    });
    builder.addCase(getOrdersPending.rejected, (state, action) => {
      state.orderStatus = EStateGeneric.FAILED;
    });


    builder.addCase(getOrdersHistory.fulfilled, (state, action) => {
      state.orderHistory = action.payload
      state.orderStatus = EStateGeneric.SUCCEEDED;
    });
    builder.addCase(getOrdersHistory.pending, (state, action) => {
      state.orderStatus = EStateGeneric.PENDING;
    });
    builder.addCase(getOrdersHistory.rejected, (state, action) => {
      state.orderStatus = EStateGeneric.FAILED;
    });


  },

})


// export const {  } = usersSlice.actions

export const UserEdit = (state: RootState) => state.users.EditUser;

export const getOneUser = (state: RootState) => state.users.OneUser

export const getordersPendint = (state: RootState) => state.users.ordersPending

export const getordersHistory = (state: RootState) => state.users.orderHistory
export const  StatusOrders = (state: RootState) => state.users.orderStatus

export default usersSlice.reducer