import { EStateGeneric } from "@/shared/types";
import {
  selectAllDashboardOffers,
  selectAllDashboardOffersStatus,
  getAllOffers,
} from "@/states/dashboard/offers/offersSlice";
import { useAppDispatch } from "@/states/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Card from "./Card";
import Failed from "@/components/StatesComponents/Failed";

type Props = {};

const OffersActives = (props: Props) => {
  const dispatch = useAppDispatch();
  const offers = useSelector(selectAllDashboardOffers);
  const offersStatus = useSelector(selectAllDashboardOffersStatus);
  useEffect(() => {
    (async () => {
      if (offersStatus === EStateGeneric.IDLE) {
        await dispatch(getAllOffers());
      }
    })();
    return () => {
      // if (offersStatus === EStateGeneric.SUCCEEDED) {
      //   dispatch(cleanUpOfferts());
      // }
    };
  }, [dispatch, offersStatus]);
  return (
    <div className="flex flex-col h-full">
      {offersStatus === EStateGeneric.SUCCEEDED && (
        <>
          {!offers.length && (
            <Failed
              tittle="Ofertas"
              text="No hay ofertas activas en este momento"
            />
          )}
          <div className="grid place-items-center p-1 sm:p-3">
            <div className="grid grid-cols-1 ss:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-7xl">
              {offers.map((offer, index) => (
                <Card key={index} {...offer} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default OffersActives;
