import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { EStateGeneric, ICart } from '@/shared/types'
import { getCartUserByApi } from './cartApi';

export const getCartUser = createAsyncThunk(
  "cart/getCartUser",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await getCartUserByApi({ userId });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

interface IUsersState {
  cart: ICart,
  cartStatus: EStateGeneric,
}

const initialState: IUsersState = {
  cart: {} as ICart,
  cartStatus: EStateGeneric.IDLE,
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    cleanUpCart: (state) => {
      return {
        ...state,
        cart: {} as ICart,
        cartStatus: EStateGeneric.IDLE,
      };
    },
  },
  extraReducers(builder) {
    builder.addCase(getCartUser.fulfilled, (state, action) => {
      state.cart = action.payload;
      state.cartStatus = EStateGeneric.SUCCEEDED;
    });
    builder.addCase(getCartUser.rejected, (state, action) => {
      state.cartStatus = EStateGeneric.FAILED;
    });
  },
})


export const { cleanUpCart } = cartSlice.actions

export const selectAllCart = (state: RootState) => state.cart.cart


export const selectAllCartStatus = (state: RootState) => state.cart.cartStatus

export default cartSlice.reducer