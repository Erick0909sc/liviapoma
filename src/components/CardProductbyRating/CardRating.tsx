import { Rating } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Session } from "next-auth";
import toast from "react-hot-toast";
import { addOneProductToCart } from "@/states/cart/cartApi";
import LoaderBtn from "../Cart/LoaderBtn";
import { hanldeItemCart } from "@/shared/ultis";
import { TiSpanner } from "react-icons/ti";

type Props = {
  session: Session | null;
  name: string;
  code: string;
  image: string;
  rating: number;
  description: string;
};

const CardRating = ({
  code,
  session,
  name,
  image,
  rating,
  description,
}: Props) => {
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  return (
    <div className=" flex w-full items-center">
      <div className="relative h-[100%] w-[50%]">
        <Image
          src={image}
          alt={image}
          height={500}
          width={500}
          className="w-full"
        />
      </div>
      <div className=" flex flex-col w-[50%] gap-6 justify-center">
        <div className="md:h-28 lg:h-28  flex items-center justify-center  text-[15px]  md:text-[22px] lg:text-[22px]  font-bold font-serif">
          <h2>{name} </h2>
        </div>

        <div className="flex flex-col gap-5 items-center text-[10px] font-bold lg:text-[18px] pb-9">
          <p>{description}</p>
          {/* <h2>{rating}</h2> */}
          <Rating name="size-large" readOnly defaultValue={2} size="large" />
          <div className="inline-flex gap-4">
            <button
              onClick={() =>
                hanldeItemCart({
                  code,
                  session,
                  isProcessing,
                  setIsProcessing,
                })
              }
              type="button"
            >
              <h2 className="block bg-green-500 hover:bg-green-600 text-white font-semibold text-center py-2 px-4 rounded-full mt-4">
                {isProcessing ? <LoaderBtn /> : "Añadir al carro"}
              </h2>
            </button>
            <Link href={`products/${code}`}>
              <h2 className="block border-2 text-green-500 border-green-500 text-center py-2 px-4 rounded-full mt-4 hover:bg-green-600 hover:text-white hover:border-green-600">
                Ver detalles
              </h2>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardRating;
