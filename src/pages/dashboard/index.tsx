import { dayData, monthData, weekData, yearData } from "@/shared/test";
import LayoutAdmin from "@/components/Layout/LayoutAdmin/LayoutAdmin";
import ChartComponent from "@/components/Dashboard/ChartComponent";
import ChartWithSwitcher from "@/components/Dashboard/ChartWithSwitcher";
import { useAppDispatch } from "@/states/store";
import { useSelector } from "react-redux";
import {
  cleanUpDataDashboard,
  getAllData,
  selectDataDashboard,
  selectDataDashboardStatus,
} from "@/states/dashboard/dashboardSlice";
import { useEffect } from "react";
import { EStateGeneric } from "@/shared/types";
import ChartComponentCategories from "@/components/Dashboard/ChartComponentCategories";
import SummaryDashboard from "@/components/Dashboard/SummaryDashboard";

type Props = {};

const Dashboard = (props: Props) => {
  const dispatch = useAppDispatch();
  const status = useSelector(selectDataDashboardStatus);
  const data = useSelector(selectDataDashboard);
  useEffect(() => {
    (async () => {
      if (status === EStateGeneric.IDLE) {
        await dispatch(getAllData());
      }
    })();
    return () => {
      if (status === EStateGeneric.SUCCEEDED) {
        dispatch(cleanUpDataDashboard());
      }
    };
  }, [dispatch, status]);
  return (
    <LayoutAdmin title="Dashboard">
      {status === EStateGeneric.SUCCEEDED && (
        <div className="flex flex-wrap justify-center items-center bg-rose-500 w-full min-h-full overflow-auto">
          <SummaryDashboard />

          <div className="w-full max-w-[95%] p-4">
            <h2 className="text-xl sm:text-4xl text-gray-600 my-4">
              Gráfico de Ventas
            </h2>
            <ChartWithSwitcher
              dayData={data.dayData}
              monthData={data.monthData}
              yearData={data.yearData}
            />
          </div>
          <div className="w-full max-w-[95%] p-4">
            <h2 className="text-xl sm:text-4xl text-gray-600 my-4">
              Ventas por Categorías: Las 5 Más Vendidas
            </h2>
            <ChartComponentCategories
              category1={data.category1.data}
              category2={data.category2.data}
              category3={data.category3.data}
              category4={data.category4.data}
              category5={data.category5.data}
            />
          </div>
        </div>
      )}
    </LayoutAdmin>
  );
};

export default Dashboard;
