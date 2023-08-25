import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import type { RootState } from './store'
import { EStateGeneric, IProduct } from '@/shared/types'

interface IGlobalState {
  currentPage: number;
}

const initialState: IGlobalState = {
  currentPage: 1,
}

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        currentPage: action.payload
      };
    },
  },
  extraReducers(builder) {
  },
})


export const { setCurrentPage } = globalSlice.actions


export const selectCurrentPage = (state: RootState) => state.global.currentPage

export default globalSlice.reducer