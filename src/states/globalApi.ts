import { IProductCart } from "@/shared/types";
import {
  BASE_URL,
  calcularDescuento,
  calcularSubtotal,
  calcularSubtotalItem,
  calcularTotalCentimos,
} from "@/shared/ultis";
import axios from "axios";
import { Session } from "next-auth";

export const getOffersByApi = () => axios.get(`/api/v1/offers`);
export const deleteCartByApi = (id: string) =>
  axios.delete(`/api/v1/cart?deleteCartUser=${id}`);
export const getOrderByApi = (id: number, userId: string) =>
  axios.get(`${BASE_URL}/api/v1/orders/${id}?userId=${userId}`);

export const postOrder = ({
  userId,
  formToken,
  orderTotalAmount,
  orderCurrency,
  products,
}: {
  userId: string;
  formToken: string;
  orderTotalAmount: number;
  orderCurrency: string;
  products: IProductCart[];
}) =>
  axios.post(`/api/v1/orders`, {
    userId,
    formToken,
    orderTotalAmount,
    orderCurrency,
    products,
  });

export const postPayment = async ({
  cart,
  session,
}: {
  cart: IProductCart[];
  session: Session;
}) => {
  const subtotalTotal = calcularSubtotal(cart);
  const descuentoTotal = calcularDescuento(cart);
  const total = subtotalTotal - descuentoTotal;
  const totalCentimos = calcularTotalCentimos(total);

  const response = await axios.post(`/api/v1/orders`, {
    userId: session.user.id,
    orderTotalAmount: totalCentimos,
    orderCurrency: "PEN",
    products: cart,
  });
  const res = await axios.post(`/api/v1/izipay/createPayment`, {
    paymentConf: {
      amount: totalCentimos,
      currency: "PEN",
      customer: {
        email: session.user.email,
        shoppingCart: {
          cartItemInfo: cart.map((e) => ({
            productLabel: e.product.name,
            productQty: e.quantity,
            productAmount: `${calcularTotalCentimos(calcularSubtotalItem(e))}`,
            productRef: `https://liviapoma-pi.vercel.app/products/${e.productCode}`,
          })),
        },
        billingDetails: {
          firstName: session.user.name,
        },
        reference: session.user.id,
      },
      orderId: response.data.order.id,
    },
  });
  return axios.patch(`/api/v1/orders`, {
    id: response.data.order.id,
    formToken: res.data.formToken,
  });
};

export const updateTokenFormPayment = async ({
  cart,
  session,
  orderId,
}: {
  cart: IProductCart[];
  session: Session;
  orderId: number;
}) => {
  const subtotalTotal = calcularSubtotal(cart);
  const descuentoTotal = calcularDescuento(cart);
  const total = subtotalTotal - descuentoTotal;
  const totalCentimos = calcularTotalCentimos(total);

  const res = await axios.post(`/api/v1/izipay/createPayment`, {
    paymentConf: {
      amount: totalCentimos,
      currency: "PEN",
      customer: {
        email: session.user.email,
        shoppingCart: {
          cartItemInfo: cart.map((e) => ({
            productLabel: e.product.name,
            productQty: e.quantity,
            productAmount: `${calcularTotalCentimos(calcularSubtotalItem(e))}`,
            productRef: `https://liviapoma-pi.vercel.app/products/${e.productCode}`,
          })),
        },
        billingDetails: {
          firstName: session.user.name,
        },
        reference: session.user.id,
      },
      orderId: orderId,
    },
  });
  return axios.patch(`/api/v1/orders`, {
    id: orderId,
    formToken: res.data.formToken,
  });
};

export const postPaymentValidate = ({
  paymentData,
}: {
  paymentData: KRPaymentResponse;
}) => axios.post(`/api/v1/izipay/validatePayment`, paymentData);

export const getDetailsOrderByApi = (id: number) =>
  axios.get(`/api/v1/orders/${id}?detail=true`);

export const getNotifications = (count?: number) =>
  axios.get(`/api/pusher?count=${count}`);
