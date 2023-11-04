import axios from "axios";
export const getAllReviewsByApi = (code: string) =>
  axios.get(`/api/v1/reviews/${code}`);
