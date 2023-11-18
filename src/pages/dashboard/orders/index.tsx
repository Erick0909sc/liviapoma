import LayoutAdmin from "@/components/Layout/LayoutAdmin/LayoutAdmin";
import useDebounce from "@/hooks/useDebounce";
import { useSelector } from "react-redux";
import { selectSearch } from "@/states/globalSlice";
import OrdersComponent from "@/components/Dashboard/Orders/Orders";
import { GetServerSideProps } from "next";

type Props = {
  state: string;
};

const Orders = ({ state }: Props) => {
  const search = useDebounce(useSelector(selectSearch));
  return (
    <LayoutAdmin title="Orders">
      <div className="w-full h-full">
        <OrdersComponent search={search} state={state} />
      </div>
    </LayoutAdmin>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { state } = context.query;
  return {
    props: {
      state: state || "PENDIENTE",
    },
  };
};
export default Orders;
