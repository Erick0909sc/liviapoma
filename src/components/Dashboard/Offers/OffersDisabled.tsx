import Failed from "@/components/StatesComponents/Failed";
import { EStateGeneric } from "@/shared/types";
import {
  getAllOffersDisabled,
  selectAllDashboardOffersDisabled,
  selectAllDashboardOffersDisabledStatus,
} from "@/states/dashboard/offers/offersSlice";
import { useAppDispatch } from "@/states/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";

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
  }, [dispatch, offersDisabledStatus]);
  return (
    <div className="flex flex-col h-full">
      {offersDisabledStatus === EStateGeneric.SUCCEEDED && (
        <>
          {!offersDisabled.length && (
            <Failed
              title="Ofertas"
              text="No hay ofertas desactivadas en este momento"
            />
          )}
          <div className="grid place-items-center p-1 sm:p-3">
            <div className="grid grid-cols-1 ss:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-7xl">
              {offersDisabled.map((offer, index) => (
                <div
                  className="w-full flex flex-col justify-between bg-white rounded-lg overflow-hidden shadow-md"
                  key={index}
                >
                  <img
                    src={offer.image}
                    alt="Oferta"
                    className="w-full h-auto object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default OffersDisabled;
