import LayoutAdmin from "@/components/Layout/LayoutAdmin/LayoutAdmin";
import { useState } from "react";
import TransactionsPaid from "@/components/Dashboard/Transactions/TransactionsPaid";
import TransactionsUnPaid from "@/components/Dashboard/Transactions/TransactionsUnPaid";
import useDebounce from "@/hooks/useDebounce";
import { useSelector } from "react-redux";
import { selectSearch } from "@/states/globalSlice";

type Props = {};

const Transactions = (props: Props) => {
  const search = useDebounce(useSelector(selectSearch));

  const states = {
    paidTransactions: false,
    unpaidTransactions: false,
  };
  const [component, setComponent] = useState({
    ...states,
    paidTransactions: true,
  });
  return (
    <LayoutAdmin title="Transactions">
      <div className="w-full h-full">
        <div className="flex justify-between">
          <button
            onClick={() =>
              setComponent({
                ...states,
                paidTransactions: true,
              })
            }
            className={`hover:bg-gray-700 bg-black p-2 w-full text-center text-white ${
              component.paidTransactions
                ? "text-white font-bold bg-crema-500"
                : "text-black"
            }`}
          >
            Transacciones Completadas
          </button>
          <button
            onClick={() =>
              setComponent({
                ...states,
                unpaidTransactions: true,
              })
            }
            className={`hover:bg-gray-700 bg-black p-2 w-full text-center text-white ${
              component.unpaidTransactions
                ? "text-white font-bold bg-crema-500"
                : "text-black"
            }`}
          >
            Transacciones Incompletas
          </button>
        </div>
        {component.paidTransactions && <TransactionsPaid search={search} />}
        {component.unpaidTransactions && <TransactionsUnPaid search={search} />}
      </div>
    </LayoutAdmin>
  );
};

export default Transactions;
