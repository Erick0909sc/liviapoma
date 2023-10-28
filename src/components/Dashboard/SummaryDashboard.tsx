import { formatPrice } from "@/shared/ultis";
import React from "react";

type Props = {};

const SummaryDashboard = (props: Props) => {
  return (
    <div className="p-2 sm:p-4 bg-red-500 w-full">
      <h2 className="text-3xl text-gray-800 font-semibold mb-4">
        Dashboard - Liviapoma EIRL
      </h2>
      <div className="flex flex-wrap justify-center gap-4">
        <div className="bg-green-500 p-4">
          <h3 className="text-lg text-gray-800">
            Ingresos totales desde el último mes:
          </h3>
          <p className="text-2xl text-blue-600 font-bold">
            {formatPrice(15500)}
          </p>
        </div>
        <div className="bg-green-500 p-4">
          <h3 className="text-lg text-gray-800">
            Porcentaje de cambio en las ventas:
          </h3>
          <p className="text-2xl text-green-600 font-bold">+15%</p>
        </div>
        <div className="bg-green-500 p-4">
          <h3 className="text-lg text-gray-800">
            Número total de transacciones:
          </h3>
          <p className="text-2xl text-indigo-600 font-bold">XXXX</p>
        </div>
        <div className="bg-green-500 p-4">
          <h3 className="text-lg text-gray-800">Total de clientes:</h3>
          <p className="text-2xl text-red-600 font-bold">XXXX</p>
        </div>
        <div className="bg-green-500 p-4">
          <h3 className="text-lg text-gray-800">
            Valor promedio de compra por cliente:
          </h3>
          <p className="text-2xl text-purple-600 font-bold">$XXXX</p>
        </div>
      </div>
    </div>
  );
};

export default SummaryDashboard;
