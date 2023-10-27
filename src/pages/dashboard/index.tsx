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
        <div className="flex justify-center items-center">
          <div className="w-full max-w-5xl">
            <ChartComponent data={data.dayData} />
            <ChartWithSwitcher
              dayData={data.dayData}
              monthData={data.monthData}
              yearData={data.yearData}
            />
          </div>
        </div>
      )}
    </LayoutAdmin>
  );
};

export default Dashboard;
