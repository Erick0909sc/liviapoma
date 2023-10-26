import { IOrders } from "@/shared/types";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/states/store";
import { setCurrentPage } from "@/states/globalSlice";
import { searchOrdersDashboardByApi } from "@/states/dashboard/orders/ordersApi";

const useSearchTransactions = (initialData: IOrders, filterString: string) => {
  const dispatch = useAppDispatch();
  const partesFecha = filterString.split(/[-/]/);
  const fechaFiltrar = `${partesFecha[2]}-${partesFecha[1]}-${partesFecha[0]}`;
  const [filteredData, setFilteredData] = useState<IOrders>({} as IOrders);
  useEffect(() => {
    if (filterString.trim() === "") {
      setFilteredData(initialData);
    } else {
      dispatch(setCurrentPage(1));
      searchOrdersDashboardByApi(1, filterString)
        .then((response) => {
          setFilteredData(response.data);
        })
        .catch((error) => {
          console.log(error);
          return;
        });
    }
  }, [initialData, filterString]);

  return filteredData;
};

export default useSearchTransactions;
