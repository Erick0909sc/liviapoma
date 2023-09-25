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
}: {
  startDate: string;
  endDate: string;
  image: File;
  categories: { [key: string]: string }[];
}) => {
  const validation = await validationOfferDashboardByApi({
    startDate,
    endDate,
    categories,
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
