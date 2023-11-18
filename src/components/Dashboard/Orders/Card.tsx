import { generatePDF } from "@/shared/generatePDF";
import { codeStatusOrdersTranslation } from "@/shared/translate";
import { IOrderDetail, Order } from "@/shared/types";
import { formatFechaISO, formatPrice } from "@/shared/ultis";
import { patchOrderStatusDashboardByApi } from "@/states/dashboard/orders/ordersApi";
import { getDetailsOrderByApi, getOrderByApi } from "@/states/globalApi";
import { ProductsStatus } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

type Props = {
  order: Order;
};

const Card = ({ order }: Props) => {
  const [open, setOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Order | null>();
  const [showOptionsMenu, setShowOptionsMenu] = useState(false);
  const [selectedOption, setSelectedOption] = useState(order.productsStatus); // Aquí puedes almacenar la opción seleccionada
  const statusStyles = {
    PENDIENTE: "bg-orange-200 text-orange-600",
    ENTREGADO: "bg-green-200 text-green-600",
    CANCELADO: "bg-red-200 text-red-600",
    POR_RECOGER: "bg-blue-200 text-blue-600",
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    // setShowOptionsMenu(false);
  };

  const handleSaveButtonClick = async () => {
    try {
      setIsLoading(true);
      const res = await patchOrderStatusDashboardByApi({
        id: order.id,
        status: selectedOption,
      });
      if (res.status === 200)
        return toast.success(
          "¡El estado se ha actualizado satisfactoriamente!"
        );
    } catch (error) {
      toast.error("Intente nuevamente");
    } finally {
      setIsLoading(false);
    }
  };
  const handleData = async () => {
    try {
      setIsProcessing(true);
      const res = await getOrderByApi(order.id, order.userId);
      setData(res.data);
      setOpen(!open);
    } catch (error) {
      toast.error("Intente nuevamente");
    } finally {
      setIsProcessing(false);
    }
  };
  const handleDataForPDF = async () => {
    try {
      if (data) {
        generatePDF(data as Order);
      } else {
        const res = await getOrderByApi(order.id, order.userId);
        generatePDF(res.data);
      }
    } catch (error) {
      toast.error("Intente nuevamente");
    }
  };
  return (
    <div className="bg-white rounded-md p-4 mb-4 shadow-md max-w-[380px] w-[380px] hover:shadow-green-800 hover:shadow-lg">
      <div className="flex justify-between items-center">
        <span className="text-xl font-semibold">Pedido ID: {order.id}</span>
        <span className="text-gray-600">{formatFechaISO(order.updatedAt)}</span>
      </div>
      <div className="mt-2">
        <span className="text-lg">
          <strong>Usuario: </strong>
          {order.user.name}
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
      <div className="mt-2 flex flex-col">
        <div className="flex justify-between items-center gap-4">
          <label className="text-xl font-semibold">Estado:</label>
          <span
            className={`text-lg px-3 py-1 rounded-full hover:cursor-pointer ${
              statusStyles[selectedOption as ProductsStatus]
            } font-bold`}
            onClick={() => setShowOptionsMenu(!showOptionsMenu)}
          >
            {codeStatusOrdersTranslation[selectedOption]}
          </span>
        </div>
        {showOptionsMenu && (
          <div className="mt-2 flex flex-col gap-1 justify-center items-center">
            <button
              onClick={() => handleOptionClick(ProductsStatus.PENDIENTE)}
              className={`rounded-3xl px-3 ${
                statusStyles[ProductsStatus.PENDIENTE]
              }`}
            >
              - {ProductsStatus.PENDIENTE}
            </button>
            <button
              onClick={() => handleOptionClick(ProductsStatus.POR_RECOGER)}
              className={`rounded-3xl px-3 ${
                statusStyles[ProductsStatus.POR_RECOGER]
              }`}
            >
              - {codeStatusOrdersTranslation[ProductsStatus.POR_RECOGER]}
            </button>
            <button
              onClick={() => handleOptionClick(ProductsStatus.ENTREGADO)}
              className={`rounded-3xl px-3 ${
                statusStyles[ProductsStatus.ENTREGADO]
              }`}
            >
              - {ProductsStatus.ENTREGADO}
            </button>
            <div className="flex gap-4">
              <button
                onClick={handleSaveButtonClick}
                disabled={isLoading}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
              >
                Guardar
              </button>
              <button
                onClick={() => {
                  setShowOptionsMenu(false);
                  setSelectedOption(order.productsStatus);
                }}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="mt-4">
        {data && (
          <div className="max-h-72 overflow-auto">
            <h3 className="text-lg font-semibold mt-4">Detalles del pedido:</h3>
            <div className="pl-6 mt-2 flex flex-col gap-2">
              {data.products.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col justify-center items-center"
                >
                  <Image src={item.product.image} height={150} width={150} />
                  <p>
                    <span className="font-semibold">Producto:</span>{" "}
                    <Link
                      href={`/products/${item.productCode}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="text-blue-500 hover:underline">
                        {item.product.name}
                      </span>
                    </Link>
                  </p>
                  <p>
                    <span className="font-semibold">Costo Total:</span>{" "}
                    {formatPrice(item.product.price)}
                  </p>
                  <p>
                    <span className="font-semibold">Cantidad:</span>{" "}
                    {item.quantity}
                  </p>
                  <hr />
                </div>
              ))}
            </div>
            <p className="mt-4">
              <span className="font-semibold">Monto Total:</span>{" "}
              {/* {formatPrice(data.amount / 100)} */}
              {formatPrice(order.orderTotalAmount / 100)}
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
        {order.checkoutUuid && (
          <button
            type="button"
            className={`mt-2 ml-2 px-3 py-1 font-bold bg-blue-500 text-white border border-blue-600 rounded-md focus:outline-none focus:ring focus:border-blue-400 hover:bg-blue-600`}
            onClick={handleDataForPDF}
            disabled={isProcessing}
          >
            Imprimir orden
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;
