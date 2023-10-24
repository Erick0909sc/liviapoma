import { IProductCart } from "@/shared/types";
import {
  calcularDescuento,
  calcularSubtotal,
  calcularSubtotalItem,
  formatPrice,
} from "@/shared/ultis";
import { Session } from "next-auth";
import Link from "next/link";

type Props = {
  cart: IProductCart[];
  session: Session;
};

const Summary = ({ cart }: Props) => {
  const subtotalTotal = calcularSubtotal(cart);
  const descuentoTotal = calcularDescuento(cart);
  const total = subtotalTotal - descuentoTotal;

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
      <Link href="/checkout">
        <span className="text-white p-4 bg-green-700 hover:bg-green-500 text-center">
          Continuar compra
        </span>
      </Link>
    </div>
  );
};

export default Summary;
