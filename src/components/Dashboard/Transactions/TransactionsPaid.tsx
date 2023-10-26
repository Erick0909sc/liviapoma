import { useAppDispatch } from "@/states/store";
import { useEffect } from "react";
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

type Props = {
  search: string;
};

const TransactionsPaid = ({ search }: Props) => {
  const dispatch = useAppDispatch();
  const status = useSelector(selectAllDashboardOrdersStatus);
  const data = useSelector(selectAllDashboardOrders);
  const currentPage = useSelector(selectCurrentPage);
  const itemsPerPage = 12; // min 10 max 100 items per page
  const setCurrentPageRedux = (page: number) => {
    dispatch(setCurrentPage(page));
  };
  useEffect(() => {
    (async () => {
      if (status === EStateGeneric.IDLE) {
        await dispatch(
          getAllOrders({ page: currentPage, count: itemsPerPage, search })
        );
      }
    })();
    return () => {
      if (status === EStateGeneric.SUCCEEDED) {
        dispatch(cleanUpOrders());
      }
    };
  }, [dispatch, status, currentPage, search]);
  return (
    <div className="flex flex-col h-full">
      {status === EStateGeneric.PENDING && <Pending />}
      {status === EStateGeneric.FAILED && <Failed />}
      {status === EStateGeneric.SUCCEEDED && (
        <>
          {search && !data.orders?.length && (
            <Failed
              text="No encontramos transacciones relacionados con tu búsqueda"
              tittle="Transacciones no encontradas"
            />
          )}
          <div
            className={`flex flex-wrap gap-4 justify-center w-full h-auto bg-gray-100 ${
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

export default TransactionsPaid;
