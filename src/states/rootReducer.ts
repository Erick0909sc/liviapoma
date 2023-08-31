import { combineReducers } from "@reduxjs/toolkit";
import productsSlice from "./products/productsSlice";
import globalSlice from "./globalSlice";
import usersSlice from "./users/usersSlice";
import cartSlice from "./cart/cartSlice";

export const rootReducer = combineReducers({
  products: productsSlice,
  users: usersSlice,
  cart: cartSlice,
  global: globalSlice
});
