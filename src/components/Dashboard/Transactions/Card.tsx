import { codeStatusOrderTranslation } from "@/shared/translate";
import { Order } from "@/shared/types";
import { formatFechaISO } from "@/shared/ultis";
import React from "react";

type Props = {
  order: Order;
};

const Card = ({ order }: Props) => {
  return (
    <div className="bg-white rounded-md p-4 mb-4 shadow-md max-w-[380px]">
      <div className="flex justify-between items-center">
        <span className="text-xl font-semibold">Order ID: {order.id}</span>
        <span className="text-gray-600">{formatFechaISO(order.createdAt)}</span>
      </div>
      <div className="mt-2">
        <span className="text-lg">ID de usuario: {order.userId}</span>
      </div>
      <div className="mt-2">
        <span className="text-lg">
          <strong>Cantidad total:</strong> {order.orderTotalAmount}{" "}
          {order.orderCurrency}
        </span>
      </div>
      {order.checkoutUuid && (
        <div className="mt-2">
          <span className="text-lg">
            <strong>ID de orden:</strong> {order.checkoutUuid}
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
    </div>
  );
};

export default Card;
