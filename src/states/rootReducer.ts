import { combineReducers } from "@reduxjs/toolkit";
import productsSlice from "./products/productsSlice";
import globalSlice from "./globalSlice";
import usersSlice from "./users/usersSlice";

export const rootReducer = combineReducers({
  products: productsSlice,
  users: usersSlice,
  global: globalSlice
});
