import { combineReducers } from "@reduxjs/toolkit";
import productsSlice from "./products/productsSlice";
import globalSlice from "./globalSlice";
import usersSlice from "./users/usersSlice";
import cartSlice from "./cart/cartSlice";
import dashboardProductsSlice from "./dashboard/products/productsSlice";

export const rootReducer = combineReducers({
  products: productsSlice,
  users: usersSlice,
  cart: cartSlice,
  dashboard: combineReducers({
    products: dashboardProductsSlice,
    // reviews: reviewsSlice,
    // users: usersSlice,
  }),
  global: globalSlice,
});
