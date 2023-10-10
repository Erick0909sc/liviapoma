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
    <>
      {offersDisabledStatus === EStateGeneric.SUCCEEDED && (
        <div className="grid place-items-center p-1 sm:p-3">
          {!offersDisabled.length && (
            <h2 className="text-2xl font-bold mb-4">
              No hay ofertas desactivadas en este momento
            </h2>
          )}
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
      )}
    </>
  );
};

export default OffersDisabled;
