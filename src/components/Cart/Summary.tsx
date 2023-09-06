import { IProductCart } from '@/shared/types'
import { calcularDescuento, calcularSubtotal, formatPrice } from '@/shared/ultis'
import Link from 'next/link'

type Props = {
  cart: IProductCart[]
}

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
      <button className="text-white p-4 bg-blue-950 hover:bg-blue-900" type="button">Continuar compra</button>
    </div>
  )
}

export default Summary