import { useAppDispatch } from "@/states/store";
import { useEffect, useState } from "react";
import { EStateGeneric } from "@/shared/types";
import {
  cleanUpOrders,
  getAllOrders,
  selectAllDashboardOrders,
  selectAllDashboardOrdersStatus,
} from "@/states/dashboard/orders/ordersSlice";
import { useSelector } from "react-redux";
import Pending from "@/components/StatesComponents/Pending";
import Failed from "@/components/StatesComponents/Failed";
import Pagination from "@/components/pagination";
import { selectCurrentPage, setCurrentPage } from "@/states/globalSlice";
import Card from "./Card";
import { pusher } from "@/shared/pusherInstance";

type Props = {
  search: string;
};

const OrdersComponent = ({ search }: Props) => {
  const dispatch = useAppDispatch();
  const ordersStatus = useSelector(selectAllDashboardOrdersStatus);
  const data = useSelector(selectAllDashboardOrders);
  const currentPage = useSelector(selectCurrentPage);
  const [status, setStatus] = useState("PENDIENTE");

  const handleEstadoChange = (estado: string) => {
    setStatus(estado);
  };
  const itemsPerPage = 12; // min 10 max 100 items per page
  const setCurrentPageRedux = (page: number) => {
    dispatch(setCurrentPage(page));
  };
  useEffect(() => {
    (async () => {
      if (ordersStatus === EStateGeneric.IDLE) {
        await dispatch(
          getAllOrders({
            page: currentPage,
            count: itemsPerPage,
            search,
            status,
          })
        );
      }
    })();
    return () => {
      if (
        ordersStatus === EStateGeneric.SUCCEEDED ||
        ordersStatus === EStateGeneric.FAILED
      ) {
        dispatch(cleanUpOrders());
      }
    };
  }, [dispatch, ordersStatus, currentPage, search, status]);

  useEffect(() => {
    const channel = pusher.subscribe("liviapoma-orders");
    channel.bind("update-orders", async () => {
      await dispatch(
        getAllOrders({
          page: currentPage,
          count: itemsPerPage,
          search,
          status,
        })
      );
    });
    return () => {
      pusher.unsubscribe("liviapoma-orders");
    };
  }, [data, ordersStatus]);
  console.log(ordersStatus);
  return (
    <div className="flex flex-col justify-between h-full">
      <div className="p-2 flex flex-wrap gap-4 items-center justify-center">
        <label className="flex items-center">
          <input
            type="checkbox"
            value="PENDIENTE"
            checked={status === "PENDIENTE"}
            onChange={() => handleEstadoChange("PENDIENTE")}
            className="form-checkbox h-5 w-5 text-indigo-600"
          />
          <span className="ml-2 text-gray-700">PENDIENTE</span>
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            value="POR_RECOGER"
            checked={status === "POR_RECOGER"}
            onChange={() => handleEstadoChange("POR_RECOGER")}
            className="form-checkbox h-5 w-5 text-indigo-600"
          />
          <span className="ml-2 text-gray-700">POR_RECOGER</span>
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            value="ENTREGADO"
            checked={status === "ENTREGADO"}
            onChange={() => handleEstadoChange("ENTREGADO")}
            className="form-checkbox h-5 w-5 text-indigo-600"
          />
          <span className="ml-2 text-gray-700">ENTREGADO</span>
        </label>
        {/* <label className="flex items-center">
          <input
            type="checkbox"
            value="CANCELADO"
            checked={status === "CANCELADO"}
            onChange={() => handleEstadoChange("CANCELADO")}
            className="form-checkbox h-5 w-5 text-indigo-600"
          />
          <span className="ml-2 text-gray-700">CANCELADO</span>
        </label> */}
      </div>
      {ordersStatus === EStateGeneric.PENDING && <Pending />}
      {ordersStatus === EStateGeneric.FAILED && (
        <Failed
          text="Los pedidos no pudieron ser cargados correctamente"
          tittle="Pedidos no encontrados"
        />
      )}
      {ordersStatus === EStateGeneric.SUCCEEDED && (
        <>
          {search && !data.orders?.length && (
            <Failed
              text="No encontramos pedidos relacionados con tu búsqueda"
              tittle="Pedidos no encontrados"
            />
          )}
          <div
            className={`flex flex-wrap gap-4 justify-center w-full h-auto ${
              data.orders?.length ? "p-6" : ""
            }`}
          >
            {data.orders?.map((order) => (
              <Card key={order.id} order={order} />
            ))}
          </div>
        </>
      )}
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPageRedux}
        items={data.totalOrdersCount}
        itemsPerPage={itemsPerPage}
      />
    </div>
  );
};

export default OrdersComponent;
