import { formatPrice } from "@/shared/ultis";
import React from "react";

type Props = {
  summary: {
    totalRevenue: string;
    percentageChange: string;
    numberOfTransactions: number;
    numberOfUsers: number;
  };
};

const SummaryDashboard = ({ summary }: Props) => {
  return (
    <div className="p-2 sm:p-4 w-full">
      <h2 className="text-3xl text-gray-800 font-semibold mb-4">
        Dashboard - Liviapoma EIRL
      </h2>
      <div className="flex flex-wrap justify-center gap-4">
        <div className="bg-slate-100 p-4 rounded-lg drop-shadow-lg border-b-4 border-b-blue-600">
          <h3 className="text-lg text-gray-800">
            Ingresos totales desde el último mes:
          </h3>
          <p className="text-2xl text-blue-600 font-bold">
            {formatPrice(parseFloat(summary.totalRevenue))}
          </p>
        </div>
        <div className="bg-slate-100 p-4 rounded-lg drop-shadow-lg border-b-4 border-b-green-600">
          <h3 className="text-lg text-gray-800">
            Porcentaje de cambio en las ventas:
          </h3>
          <p className="text-2xl text-green-600 font-bold">
            {summary.percentageChange} %
          </p>
        </div>
        <div className="bg-slate-100 p-4 rounded-lg drop-shadow-lg border-b-4 border-b-yellow-600">
          <h3 className="text-lg text-gray-800">
            Número total de transacciones:
          </h3>
          <p className="text-2xl text-yellow-600 font-bold">
            {summary.numberOfUsers}
          </p>
        </div>
        <div className="bg-slate-100 p-4 rounded-lg drop-shadow-lg border-b-4 border-b-purple-600">
          <h3 className="text-lg text-gray-800">Total de clientes:</h3>
          <p className="text-2xl text-purple-600 font-bold">
            {summary.numberOfUsers}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SummaryDashboard;
