import { formatPrice } from "@/shared/ultis";
import {
  disableProducts,
  restoreProducts,
  selecthiddenproducts,
} from "@/states/dashboard/products/productsSlice";
import { useAppDispatch } from "@/states/store";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {  AiFillEdit, AiFillEye } from "react-icons/ai";
import { useSelector } from "react-redux";

type Props = {
  code: string;
  name: string;
  description: string;
  price: number;
  brand: string;
  image: string;
  discount: number;
  category: string;
};

function ProductsAdmin({
  code,
  name,
  description,
  price,
  brand,
  image,
  discount,
  category,
}: Props) {
  const [view, setView] = useState(true);
  const dispatch = useAppDispatch();
  const hiddenProducts = useSelector(selecthiddenproducts);

  useEffect(() => {
    const isProductHidden = hiddenProducts.some(
      (product) => product.code === code
    );
    setView(!isProductHidden);
  }, [hiddenProducts, code]);

  const handleToggleProductVisibility = () => {
    if (view) {
      dispatch(disableProducts(code)); 
    }
  
    setView(!view); 
  };
  return (
    <div className="card bg-opacity-60 hover:bg-opacity-100  w-80  transform transition-transform duration-500 hover:scale-105 active:scale-95 rotate-1.7  rounded-lg overflow-hidden border-gray-600 border mb-6 bg-white">
      <div className=" p-2 bg-green-800 flex">
        <div className="w-[30%]">
          <button onClick={handleToggleProductVisibility} className="text-white p-2 bg-orange-800 rounded-[10px]">
            <AiFillEye className="inline-block mr-1" />
            Ocultar
          </button>
        </div>
        <div className="w-[30%] ">
          <button className="text-white p-2 bg-blue-800 rounded-[10px]">
            <AiFillEdit className="inline-block mr-1" />
            Editar
          </button>
        </div>

        <div className="w-[40%] text-end text-white flex items-center">
          <h2 className="text-[15px] w-full font-bold "> cod:{code}</h2>
        </div>
      </div>

      <div className=" p-2 ">
        <div className="text-center ">
          <h2 className="text-[20px] font-bold">{name}</h2>
        </div>

        <div className="relative w-72 h-36 mx-auto my-4">
          <Image src={image} layout="fill" className="object-cover" alt={name} />
        </div>

        <div>
          <p className="text-sm">{description}</p>
        </div>

        <div>
          <h2 className="text-lg font-semibold">Marca:{brand}</h2>
        </div>

        <div>
          <h2 className="text-lg font-semibold">Categoría: {category}</h2>
        </div>

        <div>
          <h2 className="text-lg font-semibold">Precio: {formatPrice(price)}</h2>
        </div> 

        <div>
          <h2 className="text-lg font-semibold">Descuento: {discount}</h2>
        </div>
      </div>
    </div>

  );
}




export default ProductsAdmin;
