// import axios from "axios";

// export const getAllReviewsByApi = (productCode: string) =>
//   axios.get(`/api/v1/reviews/${productCode}`);

// export const postOneReviewByApi = ({
//   productCode,
//   userId,
//   description,
//   rating,
// }: {
//   productCode: string;
//   userId: string;
//   description: string;
//   rating: number;
// }) =>
//   axios.post(`/api/v1/reviews`, {
//     productCode,
//     userId,
//     description,
//     rating,
//   });
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

export const putOneReviewByApi = ({
  id,
  productCode,
  userId,
  description,
  rating,
}: {
  id: number;
  productCode: string;
  userId: string;
  description: string;
  rating: number;
}) =>
  axios.put(`/api/v1/reviews`, {
    id,
    productCode,
    userId,
    description,
    rating,
  });

export const deleteReviewByApi = (id: number) =>
  axios.delete(`/api/v1/reviews?id=${id}`);
