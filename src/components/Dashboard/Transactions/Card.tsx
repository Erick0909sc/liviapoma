import { codeStatusOrderTranslation } from "@/shared/translate";
import { IOrderDetail, Order } from "@/shared/types";
import { formatFechaISO, formatPrice } from "@/shared/ultis";
import { getDetailsOrderByApi } from "@/states/globalApi";
import { useState } from "react";
import toast from "react-hot-toast";

type Props = {
  order: Order;
};

const Card = ({ order }: Props) => {
  const [open, setOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [data, setData] = useState<IOrderDetail | null>();

  const handleData = async () => {
    try {
      setIsProcessing(true);
      const res = await getDetailsOrderByApi(order.id);
      setData(res.data);
      setOpen(!open);
    } catch (error) {
      toast.error("Intente nuevamente");
    } finally {
      setIsProcessing(false);
    }
  };
  return (
    <div className="bg-white rounded-md p-4 mb-4 shadow-md max-w-[380px] hover:shadow-green-800 hover:shadow-lg">
      <div className="flex justify-between items-center">
        <span className="text-xl font-semibold">Pedido ID: {order.id}</span>
        <span className="text-gray-600">{formatFechaISO(order.createdAt)}</span>
      </div>
      <div className="mt-2">
        <span className="text-lg">
          <strong>Usuario ID: </strong>
          {order.userId}
        </span>
      </div>
      <div className="mt-2">
        <span className="text-lg">
          <strong>Cantidad total: </strong>{" "}
          {formatPrice(order.orderTotalAmount / 100)}
        </span>
      </div>
      {order.checkoutUuid && (
        <div className="mt-2">
          <span className="text-lg">
            <strong>Pago ID:</strong> {order.checkoutUuid}
          </span>
        </div>
      )}
      <div className="mt-2 flex justify-end">
        <span
          className={`text-lg px-3 py-1 rounded-full ${
            order.orderStatus === "PROCESS"
              ? "bg-orange-200 text-orange-600"
              : "bg-green-200 text-green-600"
          } font-bold`}
        >
          {codeStatusOrderTranslation[order.orderStatus]}
        </span>
      </div>
      <div className="mt-4">
        {data && (
          <div className="max-h-72 overflow-auto">
            <h2 className="text-2xl font-semibold">{data.user.name}</h2>
            <p className="text-gray-600">{data.user.email}</p>
            <h3 className="text-lg font-semibold mt-4">
              Detalles del Carrito de Compras:
            </h3>
            <ul className="list-disc pl-6 mt-2">
              {data.shoppingCart.map((item, index) => (
                <li key={index} className="mt-2">
                  <p>
                    <span className="font-semibold">Producto:</span>{" "}
                    <a
                      href={item.productRef}
                      className="text-blue-500 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.productLabel}
                    </a>
                  </p>
                  <p>
                    <span className="font-semibold">Costo Total:</span>{" "}
                    {formatPrice(parseInt(item.productAmount) / 100)}
                  </p>
                  <p>
                    <span className="font-semibold">Cantidad:</span>{" "}
                    {item.productQty}
                  </p>
                </li>
              ))}
            </ul>
            <p className="mt-4">
              <span className="font-semibold">Monto Total:</span>{" "}
              {formatPrice(data.amount / 100)}
            </p>
          </div>
        )}
      </div>
      <div className="mt-2 flex justify-center">
        {!order.checkoutUuid && !open && (
          <button
            type="button"
            className={`mt-2 px-3 py-1 font-bold bg-gray-300 text-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring focus:border-gray-400 hover:bg-gray-400 disabled:opacity-50 cursor-not-allowed`}
            disabled
          >
            Sin Datos que mostrar
          </button>
        )}
        {order.checkoutUuid && !open && (
          <button
            type="button"
            className={`mt-2 px-3 py-1 font-bold bg-gray-300 text-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring focus:border-gray-400 hover:bg-gray-400`}
            onClick={handleData}
            disabled={isProcessing}
          >
            {isProcessing ? "Cargando..." : "Ver más detalles"}
          </button>
        )}
        {open && (
          <button
            type="button"
            className={`mt-2 px-3 py-1 font-bold bg-red-500 text-white border border-red-600 rounded-md focus:outline-none focus:ring focus:border-red-400 hover:bg-red-600`}
            onClick={() => {
              setData(null);
              setOpen(false);
            }}
          >
            Cerrar
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;
