import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { EStateGeneric, ICategory, IProduct } from '@/shared/types'
import { postUserApi } from './usersApi';
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


interface IUsersState {
  userStatus: EStateGeneric,
}

const initialState: IUsersState = {
  userStatus: EStateGeneric.IDLE,
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
  },
})


// export const {  } = usersSlice.actions


export default usersSlice.reducer