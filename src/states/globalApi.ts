import axios from "axios";

export const getOffersByApi = () => axios.get(`/api/v1/offers`);
