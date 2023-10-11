import axios from "axios";

export const getProductsByApi = () => axios.get(`/api/v1/products`);
export const getProductByApi = (code: string) =>
  axios.get(`/api/v1/products/${code}`);
export const getProductsByCategoryByApi = (category: string) =>
  axios.get(`/api/v1/products?category=${category}`);
export const getProductsWithDiscountByApi = () =>
  axios.get(`/api/v1/products?discount=true`);
export const getcategoriesByApi = () => axios.get(`/api/v1/categories`);
