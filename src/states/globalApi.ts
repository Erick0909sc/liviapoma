import { IProductCart } from "@/shared/types";
import {
  calcularDescuento,
  calcularSubtotal,
  calcularSubtotalItem,
} from "@/shared/ultis";
import axios from "axios";
import { Session } from "next-auth";

export const getOffersByApi = () => axios.get(`/api/v1/offers`);

export const postPayment = ({
  cart,
  session,
}: {
  cart: IProductCart[];
  session: Session;
}) => {
  const subtotalTotal = calcularSubtotal(cart);
  const descuentoTotal = calcularDescuento(cart);
  const total = subtotalTotal - descuentoTotal;
  const totalCentimos = total * 100;

  return axios.post(`/api/createPayment`, {
    paymentConf: {
      amount: totalCentimos,
      currency: "PEN",
      customer: {
        email: session.user.email,
        shoppingCart: {
          cartItemInfo: cart.map((e) => ({
            productLabel: e.product.name,
            productQty: e.quantity,
            productAmount: `${calcularSubtotalItem(e) * 100}`,
            productRef: `https://liviapoma.vercel.app/products/${e.productCode}`,
          })),
        },
        billingDetails: {
          firstName: session.user.name,
        },
        reference: session.user.id,
      },
      orderId: "myOrderId-610455", // GENERAR ID RELATIVO
    },
    orderId: "myOrderId-610455", // GENERAR ID RELATIVO
  });
};

export const postPaymentValidate = ({
  paymentData,
}: {
  paymentData: KRPaymentResponse;
}) => axios.post(`/api/validatePayment`, paymentData);
