import {
  calcularDescuentoItemCart,
  calcularPrecioConDescuento,
  formatPrice,
  hanldeItemCart,
} from "@/shared/ultis";
import { addOneProductToCart } from "@/states/cart/cartApi";
import { Session } from "next-auth";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import LoaderBtn from "./Cart/LoaderBtn";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";
import { Rating } from "@mui/material";
import {
  getAllProducts,
  selectAllProducts,
  selectOneProduct,
} from "@/states/products/productsSlice";
import { useSelector } from "react-redux";
import { IReview, UnitOfMeasure } from "@/shared/types";

type Props = {
  session: Session | null;
  code: string;
  title: string;
  description: string;
  price: number;
  brand: string;
  image: string;
  category: string;
  discount: number;
  discountedPrice: number;
  rating: number;
  reviews: IReview[];
  unitOfMeasure: UnitOfMeasure;
};

const Card: React.FC<Props> = ({
  session,
  code,
  title,
  description,
  price,
  image,
  brand,
  category,
  discount,
  discountedPrice,
  rating,
  reviews,
  unitOfMeasure,
}) => {
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const products = useSelector(selectAllProducts);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    AOS.init({
      duration: 1000, // Duración de las animaciones en milisegundos
      offset: 100, // Desplazamiento en píxeles desde el borde superior del elemento para activar la animación
    });
  }, []); // Asegúrate de ejecutar esto solo una vez después del montaje del componente

  return (
    <>
      <div
        className="relative rounded-xl shadow-lg p-3 max-w-full sm:max-w-6xl  mx-auto border border-white bg-white"
        data-aos="fade-up"
      >
        <Link href={`products/${code}`}>
          <div className="cursor-pointer w-full sm:flex">
            <div className="w-full sm:w-1/3 bg-white flex justify-center">
              <Image
                src={image}
                alt="tailwind logo"
                className="rounded-xl mx-auto"
                width={500}
                height={480}
              />
            </div>
            <div className="w-full sm:w-2/3 sm:ml-1 bg-white p-3">
              <div className="flex justify-between items-center">
                <p className="text-gray-500 font-medium">{category}</p>

                <div className="flex items-center">
                  <Rating
                    name="size-large"
                    value={rating}
                    size="large"
                    readOnly
                    precision={0.1}
                  />
                  <p className="text-gray-600 font-bold text-sm ml-1">
                    <span className="text-gray-500 font-normal">
                      {" "}
                      {reviews.length} reseña(s)
                    </span>
                  </p>
                </div>

                <div className="bg-gray-200 px-3 py-1 rounded-full text-xs font-medium text-gray-800 hidden sm:block">
                  {brand ? brand : category}
                </div>
              </div>
              <h3 className="font-black text-gray-800 sm:text-3xl text-xl">
                {title}
              </h3>
              <p className="sm:text-lg text-gray-500 text-base">
                {description}
              </p>

              <p className="text-xl font-black text-gray-800 pt-5">
                {discount > 0 && (
                  <span className="text-sm  text-crema-600 line-through">
                    antes:{formatPrice(price)}
                  </span>
                )}
                &nbsp;
                <span className="text-xl  ">
                  {discount
                    ? `ahora: ${formatPrice(discountedPrice)}`
                    : formatPrice(price)}
                </span>
              </p>
              <div className="text-sm text-gray-500">
                venta por : {unitOfMeasure.name}
              </div>
            </div>
          </div>
        </Link>
        <div className="sm:flex justify-end">
          <button
            type="button"
            className="w-32 bg-yellow-300 opacity-75 hover:opacity-100 text-yellow-900 hover:text-gray-900 rounded-full px-10 py-2 font-semibold"
            onClick={() =>
              hanldeItemCart({
                code,
                session,
                isProcessing,
                setIsProcessing,
              })
            }
          >
            {isProcessing ? <LoaderBtn /> : "Comprar"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Card;
