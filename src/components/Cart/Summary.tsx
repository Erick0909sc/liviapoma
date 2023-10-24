import { IProductCart } from "@/shared/types";
import {
  calcularDescuento,
  calcularSubtotal,
  calcularSubtotalItem,
  formatPrice,
} from "@/shared/ultis";
import { postPayment } from "@/states/globalApi";
import { Session } from "next-auth";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import LoaderBtn from "./LoaderBtn";
import { useRouter } from "next/router";

type Props = {
  cart: IProductCart[];
  session: Session;
};

const Summary = ({ cart, session }: Props) => {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const subtotalTotal = calcularSubtotal(cart);
  const descuentoTotal = calcularDescuento(cart);
  const total = subtotalTotal - descuentoTotal;

  const handleCheckout = async () => {
    try {
      setIsProcessing(true);
      const response = await postPayment({
        cart: cart,
        session: session,
      });
      if (response.status === 200) {
        router.push(`/checkout?orderId=${response.data.id}`);
        toast.loading("Redirigiendo...", { duration: 3000 });
      }
    } catch (error) {
      toast.error("Ocurrió un error. Por favor, inténtelo nuevamente.");
    } finally {
      setIsProcessing(false);
    }
  };
  return (
    <div className="md:pt-6 pt-14 bg-white p-6 flex flex-col text-gray-600">
      <div>
        <p className="flex justify-between my-2 text-base">
          <span>Subtotal</span>
          <span>{formatPrice(subtotalTotal)}</span>
        </p>
        <p className="flex justify-between my-2">
          <span>Descuentos</span>
          <span>{formatPrice(descuentoTotal)}</span>
        </p>
        {/* <p className="flex justify-between my-2">
          <span>Taxes</span>
          <span>{formatPrice(0)}</span>
        </p> */}
        <hr className="my-4" />
        <p className="flex justify-between mb-4 text-base">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </p>
      </div>
      <button
        type="button"
        className="inline-flex justify-center text-white p-4 bg-green-700 hover:bg-green-500 text-center disabled:opacity-50 disabled:bg-black"
        onClick={handleCheckout}
        disabled={isProcessing}
      >
        {isProcessing ? <LoaderBtn /> : "Continuar compra"}
      </button>
    </div>
  );
};

export default Summary;
