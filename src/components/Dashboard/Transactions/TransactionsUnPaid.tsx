import { useAppDispatch } from "@/states/store";
import { useEffect } from "react";
import { EStateGeneric } from "@/shared/types";
import {
  cleanUpUnPaidTransactions,
  getAllUnPaidTransactions,
  selectAllDashboardUnPaidTransactions,
  selectAllDashboardUnPaidTransactionsStatus,
} from "@/states/dashboard/transactions/transactionsSlice";
import { useSelector } from "react-redux";
import Pending from "@/components/StatesComponents/Pending";
import Failed from "@/components/StatesComponents/Failed";
import Pagination from "@/components/pagination";
import { selectCurrentPage, setCurrentPage } from "@/states/globalSlice";
import Card from "./Card";
type Props = {
  search: string;
};

const TransactionsUnPaid = ({ search }: Props) => {
  const dispatch = useAppDispatch();
  const status = useSelector(selectAllDashboardUnPaidTransactionsStatus);
  const data = useSelector(selectAllDashboardUnPaidTransactions);
  const currentPage = useSelector(selectCurrentPage);
  const itemsPerPage = 12; // min 10 max 100 items per page
  const setCurrentPageRedux = (page: number) => {
    dispatch(setCurrentPage(page));
  };
  useEffect(() => {
    (async () => {
      if (status === EStateGeneric.IDLE) {
        await dispatch(
          getAllUnPaidTransactions({ page: currentPage, count: itemsPerPage, search })
        );
      }
    })();
    return () => {
      if (status === EStateGeneric.SUCCEEDED) {
        dispatch(cleanUpUnPaidTransactions());
      }
    };
  }, [dispatch, status, currentPage, search]);
  return (
    <div className="flex flex-col justify-between h-full">
      {status === EStateGeneric.PENDING && <Pending />}
      {status === EStateGeneric.FAILED && (
        <Failed
          text="Las transacciones no pudieron ser cargados correctamente"
          title="Transacciones no encontradas"
        />
      )}
      {status === EStateGeneric.SUCCEEDED && (
        <>
          {search && !data.orders?.length && (
            <Failed
              text="No encontramos transacciones relacionados con tu búsqueda"
              title="Transacciones no encontradas"
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

export default TransactionsUnPaid;
