import { IProductCart } from "@/shared/types";
import {
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

interface Props extends IProductCart {
  session: Session;
}

const Card = ({ session, ...props }: Props) => {
  const dispatch = useAppDispatch();
  const [isProcessing, setIsProcessing] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [input, setInput] = useState<number | null>(props.quantity);

  const propsForFunctions = {
    code: props.productCode,
    session,
    isProcessing,
    setIsProcessing,
    value: props.quantity,
    getCart: () => dispatch(getCartUser(session.user.id)),
  };

  useEffect(() => {
    setInput(props.quantity);
  }, [props.quantity]);

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
            {formatPrice(props.product.price)}
          </span>
        </div>
        <div className="max-w-[50%] flex absolute top-0 right-0 border-[1px] border-gray-400">
          <button
            type="button"
            className="p-1 md:p-2 text-white bg-red-600"
            onClick={
              props.quantity > 1
                ? () =>
                    handleItemsCart({
                      ...propsForFunctions,
                      value: props.quantity - 1,
                    })
                : () => setDeleteConfirmation(true)
            }
            disabled={isProcessing}
          >
            <AiOutlineMinus className="text-2xl" />
          </button>
          {isProcessing ? (
            <div className="bg-black/20 flex justify-center p-2 max-w-[80px] w-[80px]">
              <LoaderBtn />
            </div>
          ) : (
            <input
              className="text-center p-2 w-full max-w-[80px]"
              type="text"
              onChange={(e) => {
                const inputValue = e.target.value;
                if (inputValue === "") {
                  setInput(null);
                } else if (!Number.isNaN(parseInt(inputValue))) {
                  setInput(parseInt(inputValue));
                }
              }}
              value={input === null ? "" : input}
              onBlur={(e) => {
                if (e.target.value === "") {
                  setInput(1);
                }
                handleInputChange({
                  ...propsForFunctions,
                  value: input,
                });
              }}
            />
          )}
          <button
            type="button"
            className="p-1 md:p-2 text-white bg-blue-950"
            onClick={() =>
              handleItemsCart({
                ...propsForFunctions,
                value: props.quantity + 1,
              })
            }
            disabled={isProcessing}
          >
            <AiOutlinePlus className="text-2xl" />
          </button>
        </div>
        <div className="max-w-[50%] absolute bottom-0 left-0">
          <button
            type="button"
            className="flex gap-1 items-center text-gray-600"
            onClick={() => setDeleteConfirmation(true)}
          >
            <BsFillTrash3Fill />
            Remove
          </button>
        </div>
        <div className="max-w-[50%] absolute bottom-0 right-0">
          {formatPrice(props.quantity * props.product.price)}
        </div>
      </div>
      {deleteConfirmation && (
        <DeleteConfirmation
          title="Eliminar Producto"
          message="¿Estás seguro de que deseas eliminar este producto de tu carrito de compras? Ten en cuenta que este producto se eliminará del carrito, pero aún puedes agregarlo nuevamente en el futuro si lo necesitas."
          confirmText="Eliminar"
          cancelText="Cancelar"
          onConfirm={() =>
            handleDelete({
              ...propsForFunctions,
            })
          }
          onCancel={() => setDeleteConfirmation(false)}
        />
      )}
    </div>
  );
};

export default Card;
