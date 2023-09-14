import axios from "axios";

export const getDashboardProductsByApi = () =>
  axios.get(`/api/v1/dashboard/products`);
export const getDashboardProductsDisabledByApi = () =>
  axios.get(`/api/v1/dashboard/products?disabled=true`);
export const getDashboardProductByApi = () =>
  axios.get(`/api/v1/dashboard/products?disabled=true`);
export const disableProductByApi = (code: string) =>
  axios.patch(`/api/v1/dashboard/products/${code}`);
export const restoreProductByApi = (code: string) =>
  axios.patch(`/api/v1/dashboard/products/${code}?restore=true`);
export const deleteProductByApi = (code: string) =>
  axios.delete(`/api/v1/dashboard/products/${code}`);
