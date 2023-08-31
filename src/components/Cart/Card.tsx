import { IProductCart } from "@/shared/types"
import { formatPrice } from "@/shared/ultis"
import Image from "next/image"
import { BsFillTrash3Fill } from "react-icons/bs"

const Card = (props: IProductCart) => {
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
          <button type="button" className="p-2 text-white bg-red-600">-</button>
          <input className="text-center p-2 w-[80px]" type="text" value={props.quantity} />
          <button type="button" className="p-2 text-white bg-blue-950">+</button>
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