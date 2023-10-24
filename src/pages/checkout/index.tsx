import Head from "next/head";
import KRGlue from "@lyracom/embedded-form-glue";
import { useState, useEffect } from "react";
import {
  deleteCartByApi,
  getOrderByApi,
  postPaymentValidate,
} from "@/states/globalApi";
import { useRouter } from "next/router";
import Script from "next/script";
import { GetServerSidePropsContext } from "next";
import toast from "react-hot-toast";
import { IProductCart } from "@/shared/types";
import CardSummary from "@/components/Cart/CardSummary";
import {
  calcularDescuento,
  calcularSubtotal,
  formatPrice,
} from "@/shared/ultis";

type Props = {
  formToken: string;
  open: boolean;
  cart: IProductCart[];
};

const Checkout = ({ formToken, open, cart }: Props) => {
  const [message, setMessage] = useState("");
  const router = useRouter();
  const subtotalTotal = calcularSubtotal(cart);
  const descuentoTotal = calcularDescuento(cart);
  const total = subtotalTotal - descuentoTotal;
  useEffect(() => {
    async function setupPaymentForm() {
      const endpoint = "https://static.lyra.com";
      const publickey =
        "91463876:testpublickey_bOyCTTuPcncpzhhTQd72xpPjqG6m08znh8vcbuRX24cIe";
      try {
        const { KR } = await KRGlue.loadLibrary(endpoint, publickey);
        await KR.setFormConfig({
          formToken: formToken,
          "kr-language": "es-ES",
        });
        const { result } = await KR.attachForm(
          "#myPaymentForm"
        ); /* Attach a payment form  to myPaymentForm div*/
        await KR.showForm(result.formId); /* show the payment form */
        await KR.onSubmit(async (paymentData) => {
          const response = await postPaymentValidate({ paymentData });
          if (response.status === 200) {
            await deleteCartByApi(cart[0].cartId);
            router.push("/success");
            setMessage("Payment successful!");
          }
          return false; // Return false to prevent the redirection
        });
      } catch (error) {
        setMessage(error + " (see console for more details)");
      }
    }

    setupPaymentForm();
  }, []);

  return (
    <div>
      <Head>
        <title>Liviapoma - Checkout</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          rel="stylesheet"
          href="https://static.lyra.com/static/js/krypton-client/V4.0/ext/classic-reset.css"
        />
      </Head>
      <Script src="https://static.lyra.com/static/js/krypton-client/V4.0/ext/neon.js"></Script>
      {open && (
        <div className="p-4 justify-center flex flex-wrap">
          <div className="flex-1 p-2 min-w-[500px] max-w-[800px]">
            <h1 className="text-2xl font-bold">Liviapoma - Checkout</h1>
            <hr />
            <div className="flex flex-col bg-white">
              <h2 className="text-xl font-bold p-4">Productos</h2>
              <hr />
              {cart.map((product, index) => (
                <>
                  <CardSummary key={index} {...product} />
                  <hr />
                </>
              ))}
              <div className="px-6">
                <p className="flex justify-between my-2 text-base">
                  <span className="font-bold">Subtotal</span>
                  <span>{formatPrice(subtotalTotal)}</span>
                </p>
                <p className="flex justify-between my-2">
                  <span className="font-bold">Descuentos</span>
                  <span>{formatPrice(descuentoTotal)}</span>
                </p>
                <hr className="my-4" />
                <p className="flex justify-between mb-4 text-base">
                  <span className="font-bold text-2xl">Total</span>
                  <span>{formatPrice(total)}</span>
                </p>
              </div>
            </div>
          </div>
          <div className="m-0 md:mt-10">
            <div id="myPaymentForm">
              <div className="kr-smart-form" kr-card-form-expanded="true" />
            </div>
            <div data-test="payment-message">{message}</div>
          </div>
        </div>
      )}
      {!open && <div>Este pago ya se efectuo</div>}
    </div>
  );
};

export default Checkout;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { orderId } = context.query;
  const response = await getOrderByApi(parseInt(orderId as string));
  const { formToken, orderStatus } = response.data.order;
  const { cart } = response.data;

  if (orderStatus === "PAID") {
    return {
      props: {
        formToken: formToken,
        open: false,
        cart: cart,
      },
    };
  }
  return {
    props: {
      formToken: formToken,
      open: true,
      cart: cart,
    },
  };
}
