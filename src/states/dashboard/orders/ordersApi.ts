import axios from "axios";
export const getPaidOrdersDashboardByApi = (page: number, count?: number) =>
  axios.get(`/api/v1/dashboard/orders?page=${page}&count=${count}&paid=true`);

export const getUnPaidOrdersDashboardByApi = (page: number, count?: number) =>
  axios.get(`/api/v1/dashboard/orders?page=${page}&count=${count}`);

export const searchOrdersDashboardByApi = (
  page: number,
  search: string,
  count?: number
) =>
  axios.get(
    `/api/v1/dashboard/orders?page=${page}&count=${count}&search=${search}`
  );
