import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { EStateGeneric, IOffer, IProduct } from "@/shared/types";
import { getOffersByApi } from "./globalApi";

export const getAllOffers = createAsyncThunk(
  "global/getAllOffers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getOffersByApi();
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
interface IGlobalState {
  currentPage: number;
  offers: IOffer[];
  allOffersStatus: EStateGeneric;
}

const initialState: IGlobalState = {
  currentPage: 1,
  offers: [],
  allOffersStatus: EStateGeneric.IDLE,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        currentPage: action.payload,
      };
    },
  },
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
  },
});

export const { setCurrentPage } = globalSlice.actions;

export const selectCurrentPage = (state: RootState) => state.global.currentPage;
export const selectAllOffers = (state: RootState) => state.global.offers;
export const selectAllOffersStatus = (state: RootState) =>
  state.global.allOffersStatus;

export default globalSlice.reducer;
