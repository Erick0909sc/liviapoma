import { generateReportsPDF } from "@/shared/reports/PDF";
import { IOrderDataDashboard } from "@/shared/types";
import { formatPrice } from "@/shared/ultis";
import { useState } from "react";
import {
  FaMoneyBillAlt,
  FaChartLine,
  FaExchangeAlt,
  FaUserFriends,
  FaDownload,
} from "react-icons/fa";
import { FaFilePdf, FaFileExcel } from "react-icons/fa6";

type Props = {
  data: IOrderDataDashboard;
};

const SummaryDashboard = ({ data }: Props) => {
  const handleDownload = () => {
    try {
      generateReportsPDF(data);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div className="p-2 sm:p-4 w-full">
      <div className="flex justify-between mb-4 border-b-2 border-gray-300 pb-2">
        <h2 className="text-lg sm:text-3xl text-gray-800 font-bold">
          Dashboard - Liviapoma EIRL
        </h2>
        <button
          type="button"
          onClick={() => handleDownload()}
          className="px-4 py-2 text-sm text-gray-700 bg-green-400 hover:bg-green-200 text-left flex items-center"
        >
          <FaFilePdf className="mr-2 text-lg" /> Descargar PDF
        </button>
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        <div className="w-full sm:max-w-[300px] flex flex-col gap-1 sm:gap-4 justify-between text-center bg-rose-200 p-1 sm:p-4 rounded-lg drop-shadow-lg border-b-4 border-b-rose-600">
          <h3 className="text-lg sm:text-xl text-gray-800 font-bold">
            Ingresos en el último mes:
          </h3>
          <p className="text-2xl sm:text-4xl text-rose-600 font-bold inline-flex items-center gap-4 justify-center">
            <FaMoneyBillAlt />{" "}
            {formatPrice(parseFloat(data.summary.totalRevenue))}
          </p>
        </div>
        <div className="w-full sm:max-w-[300px] flex flex-col gap-1 sm:gap-4 justify-between text-center bg-green-200 p-1 sm:p-4 rounded-lg drop-shadow-lg border-b-4 border-b-green-600">
          <h3 className="text-lg sm:text-xl text-gray-800 font-bold">
            Variación porcentual en las ventas:
          </h3>
          <p className="text-2xl sm:text-4xl text-green-600 font-bold inline-flex items-center gap-4 justify-center">
            <FaChartLine /> {data.summary.percentageChange} %
          </p>
        </div>
        <div className="w-full sm:max-w-[300px] flex flex-col gap-1 sm:gap-4 justify-between text-center bg-yellow-200 p-1 sm:p-4 rounded-lg drop-shadow-lg border-b-4 border-b-yellow-600">
          <h3 className="text-lg sm:text-xl text-gray-800 font-bold">
            Número de Transacciones Mensuales:
          </h3>
          <p className="text-2xl sm:text-4xl text-yellow-600 font-bold inline-flex items-center gap-4 justify-center">
            <FaExchangeAlt /> {data.summary.numberOfTransactions}
          </p>
        </div>
        <div className="w-full sm:max-w-[300px] flex flex-col gap-1 sm:gap-4 justify-between text-center bg-purple-200 p-1 sm:p-4 rounded-lg drop-shadow-lg border-b-4 border-b-purple-600">
          <h3 className="text-lg sm:text-xl text-gray-800 font-bold">
            {" "}
            Total de Clientes:
          </h3>
          <p className="text-2xl sm:text-4xl text-purple-600 font-bold inline-flex items-center gap-4 justify-center">
            <FaUserFriends /> {data.summary.numberOfUsers}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SummaryDashboard;
