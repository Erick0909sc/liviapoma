import { processImage } from "@/shared/ultis";
import axios from "axios";
export const getOffersDashboardByApi = () =>
  axios.get(`/api/v1/dashboard/offers`);
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
  const urlImage = await processImage(image);
  return axios.post(`/api/v1/dashboard/offers`, {
    startDate,
    endDate,
    image: urlImage.data,
    categories,
  });
};
