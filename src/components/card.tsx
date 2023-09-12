import { formatPrice } from "@/shared/ultis";
import { addOneProductToCart } from "@/states/cart/cartApi";
import { Session } from "next-auth";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import LoaderBtn from "./Cart/LoaderBtn";
import Link from "next/link";

type Props = {
  session: Session | null;
  code: string;
  title: string;
  description: string;
  price: number;
  brand: string;
  image: string;
  category: string;
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
}) => {
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const hanldeItemCart = async () => {
    if (isProcessing) {
      return;
    }
    setIsProcessing(true);
    try {
      if (!session) {
        return toast.error("Por favor, inicie sesión para continuar.");
      }
      const response = await addOneProductToCart({
        userId: session.user.id,
        productCode: code,
      });
      if (response.status === 201) {
        toast.success("El artículo se ha añadido al carro con éxito.");
      }
    } catch (error) {
      toast.error("Ocurrió un error, por favor intente nuevamente.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="relative mt-8 rounded-xl shadow-lg p-3 max-w-full sm:max-w-6xl mx-auto border border-white bg-white">
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-yellow-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.950.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <p className="text-gray-600 font-bold text-sm ml-1">
                  4
                  <span className="text-gray-500 font-normal">
                    (76 opiniones)
                  </span>
                </p>
              </div>
              <div className="bg-gray-200 px-3 py-1 rounded-full text-xs font-medium text-gray-800 hidden sm:block">
                {brand}
              </div>
            </div>
            <h3 className="font-black text-gray-800 sm:text-3xl text-xl">
              {title}
            </h3>
            <p className="sm:text-lg text-gray-500 text-base">{description}</p>
            <p className="text-xl font-black text-gray-800">
              {formatPrice(price)}
            </p>
            <div className="sm:flex justify-end">
              <button
                type="button"
                className="bg-yellow-300 opacity-75 hover:opacity-100 text-yellow-900 hover:text-gray-900 rounded-full px-4 py-2 font-semibold"
                onClick={hanldeItemCart}
              >
                {isProcessing ? <LoaderBtn /> : "Comprar"}
              </button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
