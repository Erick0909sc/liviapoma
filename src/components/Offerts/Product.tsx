import { calcularPrecioConDescuento, formatPrice } from "@/shared/ultis";
type Props = { oferta: any };

const Product = ({ oferta }: Props) => {
  return (
    <div className="bg-crema-100 p-4 rounded-lg shadow-md w-full xs:w-11/12 ss:w-10/12 sm:w-9/12 md:w-8/12 lg:w-10/12 xl:w-11/12 max-w-6xl mx-auto border-4 border-green-600">
      <div className="relative p-0 sm:pt-16 lg:p-0">
        <div className="sm:absolute my-2 md:m-0 top-0 left-0 bg-green-700 text-white text-lg md:text-3xl font-semibold px-4 py-2 rounded-tr-lg rounded-bl-lg">
          ¡OFERTA IMPERDIBLE!
        </div>
        <img
          src={oferta.image}
          alt={oferta.name}
          className="w-72 h-72 sm:w-96 sm:h-96 object-cover rounded-3xl mx-auto mb-4 aspect-square"
        />
        <div className="sm:absolute my-2 md:m-0 top-0 right-0 bg-red-600 text-white md:text-lg font-semibold px-3 py-1 rounded-tl-md rounded-br-md">
          {oferta.discount}% de descuento
        </div>
      </div>
      <h2 className="text-black text-2xl font-semibold">{oferta.name}</h2>
      <p className="text-black text-sm mt-2">{oferta.description}</p>
      <div className="flex items-center mt-4">
        <span className="text-green-500 text-lg mr-2">
          &#9733; {oferta.rating}
        </span>
        <span className="text-crema-500 text-sm">
          ({oferta.rating} reseñas)
        </span>
      </div>

      <div className="flex flex-col xs:flex-row justify-between items-center mt-4">
        <div className="flex items-center space-x-2 mt-2 xs:mt-0">
          <span className="text-crema-600 text-sm line-through">
            {formatPrice(oferta.price)}
          </span>
          <span className="text-green-700 text-xl font-semibold">
            {formatPrice(calcularPrecioConDescuento(oferta))}
          </span>
        </div>
        <span className="text-green-500 text-base font-semibold">
          Ahorra{" "}
          {formatPrice(oferta.price - calcularPrecioConDescuento(oferta))}
        </span>
      </div>
    </div>
  );
};

export default Product;
