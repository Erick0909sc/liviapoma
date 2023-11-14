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
import { codeStatusOrdersTranslation } from "@/shared/translate";

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

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="flex justify-between">
        <button
          onClick={() => handleEstadoChange("PENDIENTE")}
          className={`hover:bg-gray-700 bg-black p-2 w-full text-center text-white ${
            status === "PENDIENTE"
              ? "text-white font-bold bg-crema-500"
              : "text-black"
          }`}
        >
          PENDIENTE
        </button>
        <button
          onClick={() => handleEstadoChange("POR_RECOGER")}
          className={`hover:bg-gray-700 bg-black p-2 w-full text-center text-white ${
            status === "POR_RECOGER"
              ? "text-white font-bold bg-crema-500"
              : "text-black"
          }`}
        >
          {codeStatusOrdersTranslation["POR_RECOGER"]}
        </button>
        <button
          onClick={() => handleEstadoChange("ENTREGADO")}
          className={`hover:bg-gray-700 bg-black p-2 w-full text-center text-white ${
            status === "ENTREGADO"
              ? "text-white font-bold bg-crema-500"
              : "text-black"
          }`}
        >
          ENTREGADO
        </button>
      </div>
      {ordersStatus === EStateGeneric.PENDING && <Pending />}
      {ordersStatus === EStateGeneric.FAILED && (
        <Failed
          text="Los pedidos no pudieron ser cargados correctamente"
          title="Pedidos no encontrados"
        />
      )}
      {ordersStatus === EStateGeneric.SUCCEEDED && (
        <>
          {search && !data.orders?.length && (
            <Failed
              text="No encontramos pedidos relacionados con tu búsqueda"
              title="Pedidos no encontrados"
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
