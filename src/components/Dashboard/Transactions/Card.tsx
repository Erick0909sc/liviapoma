import { codeStatusOrderTranslation } from "@/shared/translate";
import { Order } from "@/shared/types";
import { formatFechaISO, formatPrice } from "@/shared/ultis";
import { useState } from "react";

type Props = {
  order: Order;
};

const Card = ({ order }: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white rounded-md p-4 mb-4 shadow-md max-w-[380px]">
      <div className="flex justify-between items-center">
        <span className="text-xl font-semibold">Orden ID: {order.id}</span>
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
      <div className="mt-2 flex justify-center">
        <button
          type="button"
          className={`mt-2 px-3 py-1 font-bold bg-gray-300 text-gray-800 border-gray-800 border-2`}
        >
          Ver más detalles
        </button>
      </div>
    </div>
  );
};

export default Card;
