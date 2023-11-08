import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { EStateGeneric, IReview } from "@/shared/types";
import { getAllReviewsByApi } from "./reviewsApi";

export const getAllReviews = createAsyncThunk(
  "reviews/getAllReviews",
  async (productCode: string, { rejectWithValue }) => {
    try {
      const response = await getAllReviewsByApi(productCode);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

interface IReviewsState {
  reviews: IReview[];
  reviewsStatus: EStateGeneric;
}

const initialState: IReviewsState = {
  reviews: [],
  reviewsStatus: EStateGeneric.IDLE,
};

export const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    cleanUpReviews: (state) => {
      return {
        ...state,
        reviews: [],
        reviewsStatus: EStateGeneric.IDLE,
      };
    },
  },
  extraReducers(builder) {
    builder.addCase(getAllReviews.fulfilled, (state, action) => {
      state.reviews = action.payload;
      state.reviewsStatus = EStateGeneric.SUCCEEDED;
    });
    builder.addCase(getAllReviews.pending, (state, action) => {
      state.reviewsStatus = EStateGeneric.PENDING;
    });
    builder.addCase(getAllReviews.rejected, (state, action) => {
      state.reviewsStatus = EStateGeneric.FAILED;
    });
  },
});

export const { cleanUpReviews } = reviewsSlice.actions;

export const selectAllReviews = (state: RootState) => state.reviews.reviews;

export const selectAllReviewsStatus = (state: RootState) =>
  state.reviews.reviewsStatus;

export default reviewsSlice.reducer;
