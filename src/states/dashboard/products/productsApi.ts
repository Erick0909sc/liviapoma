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

export const editProductByApi = async (productData: {
  code: string;
  name: string;
  description: string;
  price: number;
  brandId: number;
  image: string;
  discount: number;
  categoryId: number;
}) => {
  try {
    console.log('Datos del producto a editar:', productData);
    console.log(productData.code);
    const response = await axios.put(`/api/v1/dashboard/products/${productData.code}`, { ...productData });
  
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteProductByApi = (code: string) =>
  axios.delete(`/api/v1/dashboard/products/${code}`);


export const getAllCategoryApi = () =>
  axios.get(`/api/v1/dashboard/categories`)