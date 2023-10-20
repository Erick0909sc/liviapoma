import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { EStateGeneric, ICategory, IEditUser, } from '@/shared/types'
import { postUserApi, putUserDataApi } from './usersApi';
import { processImage } from '@/shared/ultis';

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

      // Realiza acciones basadas en el código de estado
      if (statusCode === 201) {
        // El registro se completó con éxito
        return response.data;
      } else {
        // Puedes manejar otros códigos de estado aquí si es necesario
        return rejectWithValue(response.data); // Rechaza con el cuerpo de la respuesta
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);



export const putUser = createAsyncThunk(
  "users/putUser",
  async ({ id, email, password, image,name }: { id: string,name:string, email: string, password: string, image:string },{ rejectWithValue }) => {
    console.log("Datos para editar el usuario:", {name, id, email, password, image });
    try {
      const response = await putUserDataApi({ id,name, email, password, image})
      console.log(response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


interface IUsersState {
  userStatus: EStateGeneric,

  EditUser: IEditUser
}

const initialState: IUsersState = {
  userStatus: EStateGeneric.IDLE,
  EditUser: {} as IEditUser
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
      // console.log(state.EditUser)
      state.userStatus = EStateGeneric.SUCCEEDED;
      console.log(state.userStatus);
    });
    builder.addCase(putUser.pending, (state, action) => {
      state.userStatus = EStateGeneric.PENDING;
      // console.log(state.userStatus);
    });
    builder.addCase(putUser.rejected, (state, action) => {
      state.userStatus = EStateGeneric.FAILED;
      // console.log(state.userStatus);
    });


  },

})


// export const {  } = usersSlice.actions

export const UserEdit = (state: RootState) => state.users.EditUser;


export default usersSlice.reducer