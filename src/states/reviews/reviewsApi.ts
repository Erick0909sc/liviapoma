import axios from "axios";

export const getAllReviewsByApi = (productCode: string) =>
  axios.get(`/api/v1/reviews/${productCode}`);

export const postOneReviewByApi = ({
  productCode,
  userId,
  description,
  rating,
}: {
  productCode: string;
  userId: string;
  description: string;
  rating: number;
}) =>
  axios.post(`/api/v1/reviews`, {
    productCode,
    userId,
    description,
    rating,
  });
