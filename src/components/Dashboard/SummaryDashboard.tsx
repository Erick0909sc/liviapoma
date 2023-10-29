import { formatPrice } from "@/shared/ultis";
import { FaMoneyBillAlt, FaChartLine, FaExchangeAlt, FaUserFriends } from 'react-icons/fa';

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
      <h2 className="text-xl sm:text-3xl text-gray-800 font-bold mb-4">
        Dashboard - Liviapoma EIRL
      </h2>
      <div className="flex flex-wrap justify-center gap-4">
        <div className="w-full sm:max-w-[300px] flex flex-col gap-1 sm:gap-4 justify-between text-center bg-rose-200 p-1 sm:p-4 rounded-lg drop-shadow-lg border-b-4 border-b-rose-600">
          <h3 className="text-lg sm:text-xl text-gray-800 font-bold">
            Ingresos en el último mes:
          </h3>
          <p className="text-2xl sm:text-4xl text-rose-600 font-bold inline-flex items-center gap-4 justify-center">
            <FaMoneyBillAlt /> {formatPrice(parseFloat(summary.totalRevenue))}
          </p>
        </div>
        <div className="w-full sm:max-w-[300px] flex flex-col gap-1 sm:gap-4 justify-between text-center bg-green-200 p-1 sm:p-4 rounded-lg drop-shadow-lg border-b-4 border-b-green-600">
          <h3 className="text-lg sm:text-xl text-gray-800 font-bold">
            Variación porcentual en las ventas:
          </h3>
          <p className="text-2xl sm:text-4xl text-green-600 font-bold inline-flex items-center gap-4 justify-center">
            <FaChartLine /> {summary.percentageChange} %
          </p>
        </div>
        <div className="w-full sm:max-w-[300px] flex flex-col gap-1 sm:gap-4 justify-between text-center bg-yellow-200 p-1 sm:p-4 rounded-lg drop-shadow-lg border-b-4 border-b-yellow-600">
          <h3 className="text-lg sm:text-xl text-gray-800 font-bold">
            Número de Transacciones Mensuales:
          </h3>
          <p className="text-2xl sm:text-4xl text-yellow-600 font-bold inline-flex items-center gap-4 justify-center">
            <FaExchangeAlt /> {summary.numberOfUsers}
          </p>
        </div>
        <div className="w-full sm:max-w-[300px] flex flex-col gap-1 sm:gap-4 justify-between text-center bg-purple-200 p-1 sm:p-4 rounded-lg drop-shadow-lg border-b-4 border-b-purple-600">
          <h3 className="text-lg sm:text-xl text-gray-800 font-bold"> Total de Clientes:</h3>
          <p className="text-2xl sm:text-4xl text-purple-600 font-bold inline-flex items-center gap-4 justify-center">
            <FaUserFriends /> {summary.numberOfUsers}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SummaryDashboard;
