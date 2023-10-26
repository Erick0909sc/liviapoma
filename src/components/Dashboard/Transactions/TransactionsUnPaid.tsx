import { useAppDispatch } from "@/states/store";
import { useEffect } from "react";
import { EStateGeneric } from "@/shared/types";
import {
  cleanUpUnPaidOrders,
  getAllUnPaidOrders,
  selectAllDashboardUnPaidOrders,
  selectAllDashboardUnPaidOrdersStatus,
} from "@/states/dashboard/orders/ordersSlice";
import { useSelector } from "react-redux";
import { formatFechaISO } from "@/shared/ultis";
import Pending from "@/components/StatesComponents/Pending";
import Failed from "@/components/StatesComponents/Failed";
import Pagination from "@/components/pagination";
import { selectCurrentPage, setCurrentPage } from "@/states/globalSlice";
import useSearchTransactions from "@/hooks/useSearchTransactions";
import Card from "./Card";
type Props = {
  search: string;
};

const TransactionsUnPaid = ({ search }: Props) => {
  const dispatch = useAppDispatch();
  const status = useSelector(selectAllDashboardUnPaidOrdersStatus);
  // const data = useSelector(selectAllDashboardUnPaidOrders);
  const data = useSearchTransactions(
    useSelector(selectAllDashboardUnPaidOrders),
    search
  );
  const currentPage = useSelector(selectCurrentPage);
  const itemsPerPage = 12; // min 10 max 100 items per page
  const setCurrentPageRedux = (page: number) => {
    dispatch(setCurrentPage(page));
  };
  useEffect(() => {
    (async () => {
      if (status === EStateGeneric.IDLE) {
        await dispatch(
          getAllUnPaidOrders({ page: currentPage, count: itemsPerPage })
        );
      }
    })();
    return () => {
      if (status === EStateGeneric.SUCCEEDED) {
        dispatch(cleanUpUnPaidOrders());
      }
    };
  }, [dispatch, status, currentPage]);
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
      {data.orders?.length > 0 && (
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPageRedux}
          items={data.totalOrdersCount}
          itemsPerPage={itemsPerPage}
        />
      )}
    </div>
  );
};

export default TransactionsUnPaid;
