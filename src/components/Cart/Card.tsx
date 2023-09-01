import { IProductCart } from "@/shared/types"
import { formatPrice } from "@/shared/ultis"
import { patchOneProductToCart } from "@/states/cart/cartApi"
import { getCartUser } from "@/states/cart/cartSlice"
import { useAppDispatch } from "@/states/store"
import { Session } from "next-auth"
import Image from "next/image"
import { FocusEvent, useState } from "react"
import { BsFillTrash3Fill } from "react-icons/bs"
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai"
import LoaderBtn from "./LoaderBtn"

interface Props extends IProductCart {
  session: Session
}

const Card = ({ session, ...props }: Props) => {
  const dispatch = useAppDispatch();
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [input, setinput] = useState(props.quantity);
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
      //poner alerta aqui
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
        quantity: input,
      });
      if (response.status === 200) { dispatch(getCartUser(session.user.id)) }
    } catch (error) {
      //poner alerta aqui
    } finally {
      setIsProcessing(false);
    }
  };
  return (
    <div className="flex p-4 gap-4 bg-white">
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
          <button type="button" className="p-2 text-white bg-red-600" onClick={() => handleItemsCart(props.quantity - 1)}>
            <AiOutlineMinus className="text-2xl" />
          </button>
          {isProcessing ? <div className="bg-black/20 p-2"><LoaderBtn /></div> :
            <input className="text-center p-2 w-[80px]"
              type="text"
              onChange={(e) => setinput(parseInt(e.target.value))}
              value={input}
              onBlur={handleInputChange}
            />}
          <button
            type="button"
            className="p-2 text-white bg-blue-950"
            onClick={() => handleItemsCart(props.quantity + 1)}
            disabled={isProcessing}
          >
            <AiOutlinePlus className="text-2xl" />
          </button>
        </div>
        <div className="max-w-[50%] absolute bottom-0 left-0">
          <button type="button" className="flex gap-1 items-center text-gray-600"><BsFillTrash3Fill />Remove</button>
        </div>
        <div className="max-w-[50%] absolute bottom-0 right-0">
          {formatPrice(props.quantity * props.product.price)}
        </div>
      </div>

    </div>
  )
}

export default Card