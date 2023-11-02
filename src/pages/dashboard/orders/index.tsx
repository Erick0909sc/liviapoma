import LayoutAdmin from "@/components/Layout/LayoutAdmin/LayoutAdmin";
import useDebounce from "@/hooks/useDebounce";
import { useSelector } from "react-redux";
import { selectSearch } from "@/states/globalSlice";
import OrdersComponent from "@/components/Dashboard/Orders/Orders";

type Props = {};

const Orders = (props: Props) => {
  const search = useDebounce(useSelector(selectSearch));
  return (
    <LayoutAdmin title="Orders">
      <div className="w-full h-full">
        <OrdersComponent search={search} />
      </div>
    </LayoutAdmin>
  );
};

export default Orders;
