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
  sorts: { name: string; value: string }[];
  filters: { name: string; value: string }[];
  search: string;
  currentPage: number;
  offers: IOffer[];
  allOffersStatus: EStateGeneric;
}

const initialState: IGlobalState = {
  sorts: [],
  filters: [],
  search: "",
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
    setSearch: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        search: action.payload,
      };
    },
    setOrders: (
      state,
      action: PayloadAction<{ name: string; value: string }>
    ) => {
      const existingFilter = state.sorts[0];

      if (
        existingFilter &&
        existingFilter.name === action.payload.name &&
        existingFilter.value === action.payload.value
      ) {
        return {
          ...state,
          sorts: [],
        };
      } else {
        return {
          ...state,
          sorts: [action.payload],
        };
      }
    },
    setFilters: (
      state,
      action: { payload: { name: string; value: string } }
    ) => {
      const { name, value } = action.payload;

      // Verificar si el filtro ya existe en el array
      const existingFilterIndex = state.filters.findIndex(
        (filter) => filter.name === name
      );

      if (existingFilterIndex !== -1) {
        // Si el filtro ya existe y el valor es diferente, actualiza su valor
        if (state.filters[existingFilterIndex].value !== value) {
          const updatedFilters = [...state.filters];
          updatedFilters[existingFilterIndex] = { name, value };
          return {
            ...state,
            filters: updatedFilters,
          };
        } else {
          // Si el valor es el mismo, elimina el filtro del array
          const updatedFilters = [...state.filters];
          updatedFilters.splice(existingFilterIndex, 1);
          return {
            ...state,
            filters: updatedFilters,
          };
        }
      } else {
        return {
          ...state,
          filters: [...state.filters, { name, value }],
        };
      }
    },
    cleanUpOfferts: (state) => {
      return {
        ...state,
        offers: [],
        allOffersStatus: EStateGeneric.IDLE,
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

export const {
  setCurrentPage,
  setSearch,
  setOrders,
  setFilters,
  cleanUpOfferts,
} = globalSlice.actions;

export const selectAllSorts = (state: RootState) => state.global.sorts;
export const selectAllFilters = (state: RootState) => state.global.filters;
export const selectCurrentPage = (state: RootState) => state.global.currentPage;
export const selectAllOffers = (state: RootState) => state.global.offers;
export const selectAllOffersStatus = (state: RootState) =>
  state.global.allOffersStatus;
export const selectSearch = (state: RootState) => state.global.search;

export default globalSlice.reducer;
