import { combineReducers } from "@reduxjs/toolkit";
import productsSlice from "./products/productsSlice";
import globalSlice from "./globalSlice";
import usersSlice from "./users/usersSlice";
import cartSlice from "./cart/cartSlice";
import dashboardProductsSlice from "./dashboard/products/productsSlice";
import dashboardusersSlice from "./dashboard/users/usersSlice";
import dashboardOffersSlice from "./dashboard/offers/offersSlice";
import dashboardOrdersSlice from "./dashboard/orders/ordersSlice";
import dashboardSlice from "./dashboard/dashboardSlice";

export const rootReducer = combineReducers({
  products: productsSlice,
  users: usersSlice,
  cart: cartSlice,
  dashboard: combineReducers({
    products: dashboardProductsSlice,
    users: dashboardusersSlice,
    offers: dashboardOffersSlice,
    orders: dashboardOrdersSlice,
    dashboard: dashboardSlice,
    // reviews: reviewsSlice,
  }),
  global: globalSlice,
});
