import { IProductCart } from "@/shared/types";
import {
  calcularDescuentoItemCart,
  calcularPrecioConDescuento,
  formatPrice,
  handleDelete,
  handleInputChange,
  handleItemsCart,
} from "@/shared/ultis";
import { getCartUser } from "@/states/cart/cartSlice";
import { useAppDispatch } from "@/states/store";
import { Session } from "next-auth";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BsFillTrash3Fill } from "react-icons/bs";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import LoaderBtn from "./LoaderBtn";
import DeleteConfirmation from "../Modals/DeleteConfirmation";

interface Props extends IProductCart {}

const CardSummary = ({ ...props }: Props) => {
  return (
    <div className="flex flex-wrap max-[365px]:h-[480px] max-[365px]:border-b-2 border-black p-2 md:p-4 gap-4 bg-white">
      <div className="relative max-[365px]:w-full w-[150px] max-[365px]:aspect-video aspect-square">
        <Image
          layout="fill"
          src={props.product.image}
          alt={props.product.name}
        />
      </div>
      <div className="flex-1 relative">
        <div className="max-w-[50%] flex flex-col absolute top-0 left-0">
          <span className="font-bold">{props.product.name}</span>
          <span className="text-gray-600">{props.product.category.name}</span>
          <span className="text-gray-600">
            {formatPrice(props.product.price)}{" "}
            {props.product.unitOfMeasure.name}
          </span>
          <span className="text-crema-600">
            {props.product.discount
              ? `${props.product.discount}% de descuento`
              : ``}
          </span>
        </div>
        <div className="max-w-[50%] absolute bottom-0 right-0">
          <span className="text-gray-600">
            {props.product.unitOfMeasure.name} (x{props.quantity})
          </span>{" "}
          {props.product.discount ? (
            <span className="text-crema-600 text-sm line-through">
              {formatPrice(props.quantity * props.product.price)}{" "}
            </span>
          ) : null}
          <span>
            {formatPrice(
              props.quantity * props.product.price -
                calcularDescuentoItemCart(props)
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CardSummary;
