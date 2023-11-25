import LayoutAdmin from "@/components/Layout/LayoutAdmin/LayoutAdmin";
import ChartWithSwitcher from "@/components/Dashboard/ChartWithSwitcher";
import { useAppDispatch } from "@/states/store";
import { useSelector } from "react-redux";
import {
  cleanUpDataDashboard,
  getAllData,
  selectDataDashboard,
  selectDataDashboardStatus,
} from "@/states/dashboard/dashboardSlice";
import { useEffect, useState } from "react";
import { EStateGeneric } from "@/shared/types";
import ChartComponentCategories from "@/components/Dashboard/ChartComponentCategories";
import SummaryDashboard from "@/components/Dashboard/SummaryDashboard";
import Pending from "@/components/StatesComponents/Pending";
import Failed from "@/components/StatesComponents/Failed";

type Props = {};

const Dashboard = (props: Props) => {
  const dispatch = useAppDispatch();
  const status = useSelector(selectDataDashboardStatus);
  const data = useSelector(selectDataDashboard);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });
  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };
  useEffect(() => {
    (async () => {
      if (status === EStateGeneric.IDLE) {
        await dispatch(getAllData());
      }
    })();
    window.addEventListener("resize", handleResize);
    window.addEventListener("storage", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("storage", handleResize);
      if (status === EStateGeneric.SUCCEEDED) {
        dispatch(cleanUpDataDashboard());
      }
    };
  }, [windowSize, dispatch, status]);
  return (
    <LayoutAdmin title="Dashboard">
      {status === EStateGeneric.SUCCEEDED && (
        <div className="flex flex-wrap justify-center bg-white w-full min-h-full">
          <SummaryDashboard data={data} />
          <div className="w-full max-w-[95%] sm:p-4">
            <h2 className="text-xl sm:text-4xl text-gray-600 my-4">
              Gráfico de Ventas
            </h2>
            <ChartWithSwitcher
              dayData={data.dayData}
              monthData={data.monthData}
              yearData={data.yearData}
            />
          </div>
          <div className="w-full max-w-[95%] sm:p-4">
            <h2 className="text-xl sm:text-4xl text-gray-600 my-4">
              Gráfico Ventas de las 5 Categorías Más Vendidas
            </h2>
            <ChartComponentCategories
              category1={data.category1.data}
              category2={data?.category2?.data}
              category3={data?.category3?.data}
              category4={data?.category4?.data}
              category5={data?.category5?.data}
            />
          </div>
        </div>
      )}
      {status === EStateGeneric.PENDING && (
        <div className="flex flex-wrap justify-center bg-white w-full min-h-full">
          <Pending />
        </div>
      )}
      {status === EStateGeneric.FAILED && (
        <div className="flex flex-wrap justify-center bg-white w-full h-full">
          <Failed
            title="Tablero de Control"
            text="Lo siento, aún no hay información disponible en el panel. Estamos trabajando en obtener los datos necesarios. Vuelve a revisar más tarde, por favor"
          />
        </div>
      )}
    </LayoutAdmin>
  );
};

export default Dashboard;
