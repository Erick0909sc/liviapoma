import Head from "next/head";
import KRGlue from "@lyracom/embedded-form-glue";
import { useState, useEffect } from "react";
import {
  deleteCartByApi,
  getOrderByApi,
  postPaymentValidate,
  updateTokenFormPayment,
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
import Timer from "@/components/Timer";
import { getSession } from "next-auth/react";
import { Session } from "next-auth";

type Props = {
  timestamp: number;
  formToken: string;
  orderId: number;
  cart: IProductCart[];
  session: Session;
};

const Checkout = ({ formToken, timestamp, cart, session, orderId }: Props) => {
  const [message, setMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

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
            await deleteCartByApi(session.user.id);
            router.push("/successPayment");
            setMessage("Payment successful!");
          }
          return false; // Return false to prevent the redirection
        });
      } catch (error) {
        setMessage(error + " (see console for more details)");
      }
    }

    setupPaymentForm();
  }, [formToken, cart, router]);

  const handleCheckout = async () => {
    try {
      setIsProcessing(true);
      const response = await updateTokenFormPayment({
        cart,
        session,
        orderId,
      });
      if (response.status === 200) {
        router.reload();
      }
    } catch (error) {
      toast.error("Ocurrió un error. Por favor, inténtelo nuevamente.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Head>
        <title>Liviapoma - Checkout</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          rel="stylesheet"
          href="https://static.lyra.com/static/js/krypton-client/V4.0/ext/classic-reset.css"
        />
      </Head>
      <Script src="https://static.lyra.com/static/js/krypton-client/V4.0/ext/classic.js"></Script>
      <div className="flex flex-col items-center">
        <div className="md:p-10 max-w-screen-2xl w-full">
          <div className="md:flex gap-4">
            <div className="flex-1 bg-white">
              <h2 className="text-2xl font-bold p-4">Productos a Comprar</h2>
              <hr />
              <div className="flex-1 flex flex-col">
                {cart.map((product, index) => (
                  <div key={index}>
                    <CardSummary {...product} />
                    <hr />
                  </div>
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
            <div className="md:w-1/4 relative">
              <div className="flex flex-col gap-y-8 sticky top-0">
                <div className="bg-white p-6 flex flex-col text-gray-600">
                  <div id="myPaymentForm" className="grid place-content-center">
                    {/* <div
                      className="kr-smart-form"
                      kr-card-form-expanded="true"
                    /> */}
                  </div>
                  <div data-test="payment-message">{message}</div>
                  <Timer
                    time={timestamp}
                    customFunction={handleCheckout}
                    isProcessing={isProcessing}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);
  const { orderId } = context.query;
  if (!orderId || !session)
    return {
      redirect: {
        destination: "/",
      },
    };
  try {
    const response = await getOrderByApi(
      parseInt(orderId as string),
      session.user.id
    );
    const { formToken, orderStatus, products, updatedAt } = response.data;
    if (orderStatus === "PAID") {
      return {
        redirect: {
          destination: "/",
        },
      };
    }
    const fechaCreacionToken = new Date(updatedAt);
    const fechaActual = new Date();
    const tiempoExpiracionEnSegundos: number =
      Math.floor(
        (fechaCreacionToken.getTime() - fechaActual.getTime()) / 1000
      ) + 600;

    return {
      props: {
        formToken: formToken,
        cart: products,
        orderId: parseInt(orderId as string),
        timestamp: tiempoExpiracionEnSegundos,
        session: session as Session,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }
}
