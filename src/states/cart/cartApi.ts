import axios from "axios";

export const getCartUserByApi = ({ userId }: { userId: string }) => axios.get(`/api/v1/cart?userId=${userId}`);
