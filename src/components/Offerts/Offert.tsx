import { formatFechaISO } from "@/shared/ultis";

type Props = {
  id: number;
  startDate: string;
  endDate: string;
  image: string;
};

const Offert = (props: Props) => {
  const formattedStartDate = formatFechaISO(props.startDate);
  const formattedEndDate = formatFechaISO(props.endDate);
  return (
    <div className="p-4 rounded-lg shadow-md flex flex-col md:flex-row justify-center flex-wrap">
      <img
        src={props.image}
        alt={"Oferta de tiempo limitado"}
        className="w-auto h-auto rounded-s-lg max-h-[700px]"
      />
      {/* <div className="p-5 rounded-e-lg bg-crema-100">
        <div className="mt-4">
          <h2 className="text-2xl lg:text-3xl xl:text-4xl font-semibold">
            {props?.title}
          </h2>
          <p className="text-sm lg:text-base xl:text-lg">{props?.description}</p>
          <p className="text-red-500 mt-2 text-lg">
            ¡Ahorra un {props?.discount}%!
          </p>
        </div>
        <div className="mt-4">
          <p className="text-xs lg:text-sm xl:text-base">
            Válido desde {formattedStartDate} hasta {formattedEndDate}
          </p>
        </div>
        {props?.category && (
          <div className="mt-4">
            <span className="bg-blue-500 px-2 py-1 rounded-full">
              {props?.category}
            </span>
          </div>
        )}
      </div> */}
    </div>
  );
};

export default Offert;
