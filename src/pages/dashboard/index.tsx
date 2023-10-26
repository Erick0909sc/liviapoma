import { dayData, monthData, weekData, yearData } from "@/shared/test";
import LayoutAdmin from "@/components/Layout/LayoutAdmin/LayoutAdmin";
import ChartComponent from "@/components/Dashboard/ChartComponent";
import ChartWithSwitcher from "@/components/Dashboard/ChartWithSwitcher";
import { useAppDispatch } from "@/states/store";
import { useEffect } from "react";
import { EStateGeneric } from "@/shared/types";
import {
  getAllOrders,
  selectAllDashboardOrders,
  selectAllDashboardOrdersStatus,
} from "@/states/dashboard/orders/ordersSlice";
import { useSelector } from "react-redux";
import { formatFechaISO } from "@/shared/ultis";

type Props = {};

const Dashboard = (props: Props) => {
  const dispatch = useAppDispatch();
  const status = useSelector(selectAllDashboardOrdersStatus);
  const data = useSelector(selectAllDashboardOrders);

  useEffect(() => {
    const fetchData = async () => {
      if (status === EStateGeneric.IDLE) {
        await dispatch(getAllOrders(1));
      }
    };

    fetchData();
  }, [dispatch, status]);
  const initialData = [
    { time: "2018-12-22", value: 32.51 },
    { time: "2018-12-23", value: 31.11 },
    { time: "2018-12-24", value: 27.02 },
    { time: "2018-12-25", value: 27.32 },
    { time: "2018-12-26", value: 25.17 },
    { time: "2018-12-27", value: 28.89 },
    { time: "2018-12-28", value: 25.46 },
    { time: "2018-12-29", value: 23.92 },
    { time: "2018-12-30", value: 22.68 },
    { time: "2018-12-31", value: 22.67 },
  ];
  return (
    <LayoutAdmin title="Dashboard">
      <div className="flex justify-center items-center">
        <div className="w-full max-w-5xl">
          <ChartComponent data={initialData} />
          <ChartWithSwitcher
            dayData={dayData}
            weekData={weekData}
            monthData={monthData}
            yearData={yearData}
          />
        </div>
      </div>
      {/* {status === EStateGeneric.SUCCEEDED && (
        <div className="w-full h-full bg-gray-100 p-4">
          {data.orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-md p-4 mb-4 shadow-md"
            >
              <div className="flex justify-between items-center">
                <span className="text-xl font-semibold">
                  Order ID: {order.id}
                </span>
                <span className="text-gray-600">
                  {formatFechaISO(order.createdAt)}
                </span>
              </div>
              <div className="mt-2">
                <span className="text-lg">User ID: {order.userId}</span>
              </div>
              <div className="mt-2">
                <span className="text-lg">
                  Total Amount: {order.orderTotalAmount} {order.orderCurrency}
                </span>
              </div>
              <div className="mt-2">
                <span className="text-lg">order ID: {order.checkoutUuid}</span>
              </div>
              <div className="mt-2">
                <span className="text-lg">Status: {order.orderStatus}</span>
              </div>
            </div>
          ))}
        </div>
      )} */}
    </LayoutAdmin>
  );
};

export default Dashboard;
