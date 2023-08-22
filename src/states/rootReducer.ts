import { combineReducers } from "@reduxjs/toolkit";
import productsSlice from "./products/productsSlice";

export const rootReducer = combineReducers({

  products: productsSlice,

});
