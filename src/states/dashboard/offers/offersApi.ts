import { Brand, Category } from "@/shared/types";
import { processImage } from "@/shared/ultis";
import axios from "axios";
export const getOffersDashboardByApi = () =>
  axios.get(`/api/v1/dashboard/offers`);

export const getOffersDisabledDashboardByApi = () =>
  axios.get(`/api/v1/dashboard/offers?disabled=true`);

export const validationOfferDashboardByApi = ({
  startDate,
  endDate,
  categories = [],
  brands = [],
}: {
  startDate: string;
  endDate: string;
  categories?: { [key: string]: string }[];
  brands?: { [key: string]: string }[];
}) =>
  axios.post(`/api/v1/dashboard/offers/validation`, {
    startDate,
    endDate,
    brands,
    categories,
  });

export const postOfferDashboardByApi = async ({
  startDate,
  endDate,
  image,
  categories,
  brands,
}: {
  startDate: string;
  endDate: string;
  image: File;
  categories: { [key: string]: string }[];
  brands: { [key: string]: string }[];
}) => {
  const validation = await validationOfferDashboardByApi({
    startDate,
    endDate,
    categories,
    brands,
  });
  if (validation.status === 200) {
    const urlImage = await processImage(image);
    return axios.post(`/api/v1/dashboard/offers`, {
      startDate,
      endDate,
      image: urlImage.data,
      categories,
    });
  }
  return validation;
};

export const putOfferDashboardByApi = async ({
  image,
  id,
  categories,
  brands,
}: {
  id: number;
  image: File | string;
  categories: {
    name: string;
    id: number;
    offerId: number;
    categoryId: number;
    discount: number;
    category: Category;
  }[];
  brands: {
    name: string;
    id: number;
    offerId: number;
    brandId: number;
    discount: number;
    brand: Brand;
  }[];
}) => {
  if (typeof image === "string") {
    return axios.put(`/api/v1/dashboard/offers/${id}`, {
      image: image,
      categories,
      brands,
    });
  } else {
    const responseImage = await processImage(image);
    return axios.put(`/api/v1/dashboard/offers/${id}`, {
      image: responseImage?.data,
      categories,
      brands,
    });
  }
};
