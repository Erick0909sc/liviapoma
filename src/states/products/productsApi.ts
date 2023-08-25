import axios from "axios";

export const getProductsByApi = () => axios.get(`/api/products`);
export const getcategoriesByApi = () => axios.get(`/api/categories`);