import { IProductCart } from "@/shared/types"
import { formatPrice } from "@/shared/ultis"
import { deleteOneProductToCart, patchOneProductToCart } from "@/states/cart/cartApi"
import { getCartUser } from "@/states/cart/cartSlice"
import { useAppDispatch } from "@/states/store"
import { Session } from "next-auth"
import Image from "next/image"
import { useEffect, useState } from "react"
import { BsFillTrash3Fill } from "react-icons/bs"
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai"
import LoaderBtn from "./LoaderBtn"
import toast from "react-hot-toast"
import DeleteConfirmation from "../Modals/DeleteConfirmation"

interface Props extends IProductCart {
  session: Session
}

const Card = ({ session, ...props }: Props) => {
  const dispatch = useAppDispatch();
  const [isProcessing, setIsProcessing] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [input, setInput] = useState<number | null>(props.quantity);
  const handleItemsCart = async (value: number) => {
    if (isProcessing) {
      return;
    }
    setIsProcessing(true);
    try {
      const response = await patchOneProductToCart({
        userId: session.user.id,
        productCode: props.product.code,
        quantity: value,
      });
      if (response.status === 200) { dispatch(getCartUser(session.user.id)) }
    } catch (error) {
      toast.error("Ocurrió un error, por favor intente nuevamente.");
    } finally {
      setIsProcessing(false);
    }
  };
  const handleInputChange = async () => {
    if (isProcessing) {
      return;
    }
    setIsProcessing(true);
    try {
      const response = await patchOneProductToCart({
        userId: session.user.id,
        productCode: props.product.code,
        quantity: input !== null ? input : 1,
      });
      if (response.status === 200) { dispatch(getCartUser(session.user.id)) }
    } catch (error) {
      toast.error("Ocurrió un error, por favor intente nuevamente.");
    } finally {
      setIsProcessing(false);
    }
  };
  const handleDelete = async () => {
    if (isProcessing) {
      return;
    }
    setIsProcessing(true);
    try {
      const response = await deleteOneProductToCart({
        userId: session.user.id,
        productCode: props.product.code,
      });
      console.log(response)
      if (response.status === 200) { dispatch(getCartUser(session.user.id)) }
    } catch (error) {
      toast.error("Ocurrió un error, por favor intente nuevamente.");
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    setInput(props.quantity)
  }, [props.quantity])

  return (
    <div className="flex p-2 md:p-4 gap-4 bg-white">
      <div className="relative w-[150px] aspect-square">
        <Image layout="fill" src={props.product.image} alt={props.product.name} />
      </div>
      <div className="flex-1 relative">
        <div className="max-w-[50%] flex flex-col absolute top-0 left-0">
          <span className="font-bold">{props.product.name}</span>
          <span className="text-gray-600">{props.product.category.name}</span>
          <span className="text-gray-600">{formatPrice(props.product.price)}
          </span>
        </div>
        <div className="max-w-[50%] flex absolute top-0 right-0 border-[1px] border-gray-400">
          <button
            type="button"
            className="p-1 md:p-2 text-white bg-red-600"
            onClick={() => handleItemsCart(props.quantity - 1)}
            disabled={isProcessing}
          >
            <AiOutlineMinus className="text-2xl" />
          </button>
          {isProcessing ? <div className="bg-black/20 p-2"><LoaderBtn /></div> :
            <input className="text-center p-2 w-full max-w-[80px]"
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
                handleInputChange();
              }}
            />}
          <button
            type="button"
            className="p-1 md:p-2 text-white bg-blue-950"
            onClick={() => handleItemsCart(props.quantity + 1)}
            disabled={isProcessing}
          >
            <AiOutlinePlus className="text-2xl" />
          </button>
        </div>
        <div className="max-w-[50%] absolute bottom-0 left-0">
          <button type="button" className="flex gap-1 items-center text-gray-600" onClick={() => setDeleteConfirmation(true)}><BsFillTrash3Fill />Remove</button>
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
          onConfirm={handleDelete}
          onCancel={() => setDeleteConfirmation(false)}
        />
      )}


    </div>
  )
}

export default Card