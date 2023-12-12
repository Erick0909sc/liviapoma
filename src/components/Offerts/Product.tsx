import { IProduct } from "@/shared/types";
import { calcularPrecioConDescuento, formatPrice } from "@/shared/ultis";
import { Rating } from "@mui/material";
import Link from "next/link";
type Props = { oferta: IProduct };

const Product = ({ oferta }: Props) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-full xs:w-80 mx-auto border-4 border-green-600">
      <div className="relative p-0">
        <div className="bg-green-700 text-white text-lg font-semibold px-4 py-2 rounded-tr-lg rounded-bl-lg">
          ¡OFERTA IMPERDIBLE!
        </div>
        <img
          src={oferta.image}
          alt={oferta.name}
          className="w-full h-full object-cover rounded-3xl mx-auto mb-4 aspect-square"
        />
        <div className="bg-red-600 text-white font-semibold px-3 py-1 rounded-tl-md rounded-br-md">
          {oferta.discount}% de descuento
        </div>
      </div>
      <h2 className="text-black text-lg font-semibold h-14">{oferta.name}</h2>
      <div className="flex items-center mt-4">
        <Rating
          name="size-medium"
          value={oferta.rating}
          size="medium"
          readOnly
          precision={0.1}
        />
      </div>

      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center">
          <span className="text-crema-600 text-sm line-through">
            {formatPrice(oferta.price)}
          </span>
          <span className="ml-1 text-green-700 text-xl font-semibold">
            {formatPrice(calcularPrecioConDescuento(oferta))}
          </span>
        </div>
        <span className="text-green-500 text-base font-semibold">
          Ahorra{" "}
          {formatPrice(oferta.price - calcularPrecioConDescuento(oferta))}
        </span>
      </div>
      <Link href={`/products/${oferta.code}`}>
        <span className="block bg-green-500 hover:bg-green-600 text-white font-semibold text-center p-2 rounded-full mt-4 text-xl">
          Ver detalles del producto
        </span>
      </Link>
    </div>
  );
};

export default Product;
