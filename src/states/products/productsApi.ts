import axios from "axios";

export const getProductsByApi = () => axios.get(`/api/v1/products`);
export const getProductByApi = (code: string) => axios.get(`/api/v1/products/${code}`);
export const getcategoriesByApi = () => axios.get(`/api/v1/categories`);