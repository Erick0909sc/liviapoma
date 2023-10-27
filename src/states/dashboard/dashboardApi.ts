import axios from "axios";

export const getAllDataDashboardApi = () => axios.get(`/api/dashboard`);
