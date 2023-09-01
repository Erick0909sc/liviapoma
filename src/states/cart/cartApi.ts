import axios from "axios";

export const getCartUserByApi = ({ userId }: { userId: string }) => axios.get(`/api/v1/cart?userId=${userId}`);
export const addOneProductToCart = ({ userId, productCode }: { userId: string, productCode: string }) => axios.post(`/api/v1/cart`, {
  userId,
  productCode
});
export const patchOneProductToCart = ({ userId, productCode, quantity }: { userId: string, productCode: string, quantity: number }) => axios.patch(`/api/v1/cart`, {
  userId,
  productCode,
  quantity
});
export const deleteOneProductToCart = ({ userId, productCode }: { userId: string, productCode: string }) => axios.delete(`/api/v1/cart?productCode=${productCode}&userId=${userId}`);