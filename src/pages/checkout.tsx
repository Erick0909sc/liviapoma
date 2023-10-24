import Head from "next/head";
import KRGlue from "@lyracom/embedded-form-glue";
import { useState, useEffect } from "react";
import Script from "next/script";
import { postPayment, postPaymentValidate } from "@/states/globalApi";
import { useSession } from "next-auth/react";
import { useSelector } from "react-redux";
import { selectAllCart } from "@/states/cart/cartSlice";
import { Session } from "next-auth";

export default function MyPage() {
  const [message, setMessage] = useState("");
  const { data: session, status } = useSession();
  const cart = useSelector(selectAllCart);

  useEffect(() => {
    async function setupPaymentForm() {
      const endpoint = "https://static.lyra.com";
      const publicKey =
        "91463876:testpublickey_bOyCTTuPcncpzhhTQd72xpPjqG6m08znh8vcbuRX24cIe";
      try {
        // VALIDADR EL GALLINA TIENE HUEVOS 🥚
        if (status === "unauthenticated" || !cart.products.length) return;
        const response = await postPayment({
          cart: cart.products,
          session: session as Session,
        });
        const { formToken } = response.data;
        const { KR } = await KRGlue.loadLibrary(endpoint, publicKey);
        await KR.onSubmit(async (paymentData) => {
          const response = await postPaymentValidate({ paymentData });
          if (response.status === 200) setMessage("Payment successful!");
          return false; // Return false to prevent the redirection
        });
        await KR.setFormConfig({
          /* set the minimal configuration */
          formToken: formToken,
          "kr-language": "es-PE",
          // "kr-language": "en-US" /* to update initialization parameter */,
        });
        const { result } = await KR.attachForm(
          "#myPaymentForm"
        ); /* Attach a payment form  to myPaymentForm div*/

        await KR.showForm(result.formId); /* show the payment form */
      } catch (error) {
        setMessage(error + " (see console for more details)");
      }
    }

    setupPaymentForm();
  }, [status, cart.products]);

  return (
    <div>
      <Head>
        <title>NextJS</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          rel="stylesheet"
          href="https://static.lyra.com/static/js/krypton-client/V4.0/ext/classic-reset.css"
        />
      </Head>
      <Script src="https://static.lyra.com/static/js/krypton-client/V4.0/ext/neon.js"></Script>
      <div className="container">
        <h1>NextJS + KR.attachForm</h1>
        <div id="myPaymentForm">
          <div className="kr-smart-form" kr-card-form-expanded="true" />
        </div>
        <div data-test="payment-message">{message}</div>
      </div>
    </div>
  );
}
