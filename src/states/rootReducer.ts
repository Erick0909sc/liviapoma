import { combineReducers } from "@reduxjs/toolkit";
import productsSlice from "./products/productsSlice";
import globalSlice from "./globalSlice";

export const rootReducer = combineReducers({

  products: productsSlice,
  global: globalSlice
});
