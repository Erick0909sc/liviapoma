import { processImage } from "@/shared/ultis";
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
  brandId: number | null;
  image: string;
  discount: number;
  categoryId: number;
  unitOfMeasureId: number;
}) =>
  axios.put(`/api/v1/dashboard/products/${productData.code}`, {
    ...productData,
  });

export const postProductByApi = async (productData: {
  code: string;
  name: string;
  description: string;
  price: number;
  brandId: number | null;
  image: File;
  discount: number;
  categoryId: number;
}) => {
  const responseImage: { data: string } = await processImage(productData.image);
  return axios.post(`/api/v1/dashboard/products`, {
    ...productData,
    image: responseImage.data,
  });
};

export const deleteProductByApi = (code: string) =>
  axios.delete(`/api/v1/dashboard/products/${code}`);

export const getAllCategoryApi = () =>
  axios.get(`/api/v1/dashboard/categories`);
