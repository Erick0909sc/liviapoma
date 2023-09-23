import { EStateGeneric } from "@/shared/types";
import {
  getAllOffersDisabled,
  selectAllDashboardOffersDisabled,
  selectAllDashboardOffersDisabledStatus,
} from "@/states/dashboard/offers/offersSlice";
import { useAppDispatch } from "@/states/store";
import { useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import Card from "./Card";

type Props = {};

const OffersDisabled = (props: Props) => {
  const dispatch = useAppDispatch();
  const offersDisabled = useSelector(selectAllDashboardOffersDisabled);
  const offersDisabledStatus = useSelector(
    selectAllDashboardOffersDisabledStatus
  );
  useEffect(() => {
    (async () => {
      if (offersDisabledStatus === EStateGeneric.IDLE) {
        await dispatch(getAllOffersDisabled());
      }
    })();
    return () => {
      // if (offersDisabledStatus === EStateGeneric.SUCCEEDED) {
      //   dispatch(cleanUpOfferts());
      // }
    };
  }, [dispatch, offersDisabledStatus]);
  return (
    <div className="grid place-items-center p-1 sm:p-3">
      <div className="grid grid-cols-1 ss:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl">
        {offersDisabled.map((offer, index) => (
          <Card key={index} {...offer} />
        ))}
      </div>
    </div>
  );
};

export default OffersDisabled;
