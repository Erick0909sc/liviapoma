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
    <LayaoutAdmin>
      <div className="w-full h-full">
        <div className="flex justify-between bg-green-500">
          <button
            onClick={() =>
              setComponent({
                ...states,
                new: true,
              })
            }
            className="hover:bg-yellow-500 bg-blue-500 p-2 w-full text-center"
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
            className="hover:bg-yellow-500 bg-blue-500 p-2 w-full text-center"
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
            className="hover:bg-yellow-500 bg-blue-500 p-2 w-full text-center"
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
