import { combineReducers } from "@reduxjs/toolkit";
import productsSlice from "./products/productsSlice";
import globalSlice from "./globalSlice";
import usersSlice from "./users/usersSlice";
import cartSlice from "./cart/cartSlice";
import dashboardProductsSlice from "./dashboard/products/productsSlice";
import  dashboardusersSlice  from "./dashboard/users/usersSlice";



export const rootReducer = combineReducers({
  products: productsSlice,
  users: usersSlice,
  cart: cartSlice,
  dashboard: combineReducers({
    products: dashboardProductsSlice,
    users: dashboardusersSlice, //
    // reviews: reviewsSlice,
  
  }),
  global: globalSlice,
});
