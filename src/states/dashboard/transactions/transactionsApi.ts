import axios from "axios";
export const getPaidOrdersDashboardByApi = ({
  page,
  count,
  search,
}: {
  page: number;
  count?: number;
  search?: string;
}) =>
  axios.get(
    `/api/v1/dashboard/transactions?page=${page}&count=${count}&paid=true&search=${search}`
  );

export const getUnPaidOrdersDashboardByApi = ({
  page,
  count,
  search,
}: {
  page: number;
  count?: number;
  search?: string;
}) =>
  axios.get(
    `/api/v1/dashboard/transactions?page=${page}&count=${count}&search=${search}`
  );
