import axios from "axios";

export const getProductsByApi = () => axios.get(`/api/products`);
export const getProductByApi = (code: string) => axios.get(`/api/products/${code}`);
export const getcategoriesByApi = () => axios.get(`/api/categories`);