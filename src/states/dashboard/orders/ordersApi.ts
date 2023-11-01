import axios from "axios";
export const getOrdersDashboardByApi = ({
  page,
  status,
  count,
  search,
}: {
  page: number;
  status: string;
  count?: number;
  search?: string;
}) =>
  axios.get(
    `/api/v1/dashboard/orders?page=${page}&count=${count}&status=${status}&search=${search}`
  );
export const patchOrderStatusDashboardByApi = ({
  id,
  status,
}: {
  id: number;
  status: string;
}) =>
  axios.patch(`/api/v1/orders/${id}`, {
    status,
  });
