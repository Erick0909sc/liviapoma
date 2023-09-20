import axios from "axios";

export const getOffersByApi = () => axios.get(`/api/v1/offers`);
export const getOffersDashboardByApi = () =>
  axios.get(`/api/v1/dashboard/offers`);
export const postOfferDashboardByApi = ({
  startDate,
  endDate,
  image,
  categories,
}: {
  startDate: string;
  endDate: string;
  image: string;
  categories: { [key: string]: string }[];
}) =>
  axios.post(`/api/v1/dashboard/offers`, {
    startDate,
    endDate,
    image,
    categories,
  });
