import { formatFechaISO } from "@/shared/ultis";

type Props = {};

const Offert = (props: Props) => {
  const Offer = {
    id: 1, // Puedes asignar el valor que desees para el ID
    title: "Oferta de Herramientas",
    description: "Oferta especial en herramientas de ferretería.",
    startDate: "2023-09-17T08:00:00Z",
    endDate: "2023-09-30T23:59:59Z",
    discount: 15.0, // Descuento en porcentaje (por ejemplo, 15%)
    image:
      "https://assets.isu.pub/document-structure/230607120922-2c5c232729585842273d4d814d749bb8/v1/95016803dd58a8cab99a5d8bff5ab12e.jpeg", 
    // image:
    //   "https://view.publitas.com/40824/1026433/pages/11096d18-d5a1-4920-be41-d5d0d5b031d2-at1000.jpg", 
    category: "Ferretería", // Categoría de la oferta (opcional)
  };
  const formattedStartDate = formatFechaISO(Offer.startDate);
  const formattedEndDate = formatFechaISO(Offer.endDate);
  return (
    <div className="p-4 rounded-lg shadow-md flex flex-col md:flex-row justify-center flex-wrap">
      <img
        src={Offer.image}
        alt={Offer.title || "Oferta de tiempo limitado"}
        className="w-auto h-auto rounded-s-lg max-h-[700px]"
      />
      {/* <div className="p-5 rounded-e-lg bg-crema-100">
        <div className="mt-4">
          <h2 className="text-2xl lg:text-3xl xl:text-4xl font-semibold">
            {Offer?.title}
          </h2>
          <p className="text-sm lg:text-base xl:text-lg">{Offer?.description}</p>
          <p className="text-red-500 mt-2 text-lg">
            ¡Ahorra un {Offer?.discount}%!
          </p>
        </div>
        <div className="mt-4">
          <p className="text-xs lg:text-sm xl:text-base">
            Válido desde {formattedStartDate} hasta {formattedEndDate}
          </p>
        </div>
        {Offer?.category && (
          <div className="mt-4">
            <span className="bg-blue-500 px-2 py-1 rounded-full">
              {Offer?.category}
            </span>
          </div>
        )}
      </div> */}
    </div>
  );
};

export default Offert;
