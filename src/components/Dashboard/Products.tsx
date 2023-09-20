import {
  disableProducts,
  restoreProducts,
  selecthiddenproducts,
} from "@/states/dashboard/products/productsSlice";
import { useAppDispatch } from "@/states/store";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { AiFillDelete, AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
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
    // Verificar si el producto está en la lista de productos deshabilitados
    const isProductHidden = hiddenProducts.some(
      (product) => product.code === code
    );
    setView(!isProductHidden);
  }, [hiddenProducts, code]);

  const handleToggleProductVisibility = () => {
    if (view) {
      dispatch(disableProducts(code)); // Deshabilitar el producto
    } else {
      dispatch(restoreProducts(code)); // Restaurar el producto
    }
    setView(!view); // Cambiar el estado local para mostrar/ocultar
  };

  return (
    <tr className="mb-2 text-center">
      <td className="px-2 py-1">{code}</td>
      <td className="px-2 py-1">{name}</td>
      <td className="px-2 py-1">{description}</td>
      <td className="px-2 py-1">{price}</td>
      <td className="px-2 py-1">{brand}</td>
      <td className="px-2 py-1">{category}</td>
      <td className="px-2 py-1">{discount}</td>
      <td className="relative w-16 h-20">
        <Image src={image} layout="fill" className="object-cover" alt={name} />
      </td>
      <td className="text-[25px] p-4 flex">
        {" "}
        {view ? (
          <button onClick={handleToggleProductVisibility}>
            <AiFillEye />
          </button>
        ) : (
          <button onClick={handleToggleProductVisibility}>
            <AiFillEyeInvisible />
          </button>
        )}
        {/* <button><AiFillDelete /></button> */}
      </td>
    </tr>
  );
}

export default ProductsAdmin;
