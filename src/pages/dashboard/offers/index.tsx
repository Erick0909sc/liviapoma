import NewOffer from "@/components/Dashboard/Offers/NewOffer";
import OffersActives from "@/components/Dashboard/Offers/OffersActives";
import OffersDisabled from "@/components/Dashboard/Offers/OffersDisabled";
import LayaoutAdmin from "@/components/Layout/LayoutAdmin/LayaoutAdmin";
import { useState } from "react";

type Props = {};

const Offers = (props: Props) => {
  const states = {
    new: false,
    actives: false,
    disabled: false,
  };
  const [component, setComponent] = useState({ ...states, new: true });
  return (
    <LayaoutAdmin title="Ofertas">
      <div className="w-full h-full">
        <div className="flex justify-between">
          <button
            onClick={() =>
              setComponent({
                ...states,
                new: true,
              })
            }
            className={`hover:bg-green-600 bg-green-500 p-2 w-full text-center ${
              component.new ? "text-white font-bold bg-green-600" : "text-black"
            }`}
          >
            Nueva
          </button>
          <button
            onClick={() =>
              setComponent({
                ...states,
                actives: true,
              })
            }
            className={`hover:bg-green-600 bg-green-500 p-2 w-full text-center ${
              component.actives ? "text-white font-bold bg-green-600" : "text-black"
            }`}
          >
            Activas
          </button>
          <button
            onClick={() =>
              setComponent({
                ...states,
                disabled: true,
              })
            }
            className={`hover:bg-green-600 bg-green-500 p-2 w-full text-center ${
              component.disabled ? "text-white font-bold bg-green-600" : "text-black"
            }`}
          >
            Desactivadas
          </button>
        </div>
        {component.new && <NewOffer />}
        {component.actives && <OffersActives />}
        {component.disabled && <OffersDisabled />}
      </div>
    </LayaoutAdmin>
  );
};

export default Offers;
