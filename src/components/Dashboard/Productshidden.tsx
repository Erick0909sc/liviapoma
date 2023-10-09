import { formatPrice } from "@/shared/ultis";
import {
  deleteProducts,
  disableProducts,
  restoreProducts,
  selecthiddenproducts,
} from "@/states/dashboard/products/productsSlice";
import { useAppDispatch } from "@/states/store";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { AiFillDelete, AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useSelector } from "react-redux";
import DeleteConfirmation from "../Modals/DeleteConfirmation";

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

function ProductsHidden({
  code,
  name,
  description,
  price,
  brand,
  image,

  discount,
  category,
}: Props) {
  const [view, setView] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [restoreConfirmation, setRestoreConfirmation] = useState(false);

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
    } else {
      dispatch(restoreProducts(code));
    }
    setView(!view);
  };

  return (
    <div className="bg-opacity-60 hover:bg-opacity-100 w-80  transition-transform duration-500 rotate-1.7 rounded-lg border-gray-600 border mb-6 bg-white">
      <div className=" p-2 bg-green-800 flex">
        <div className="w-[30%]">
          <button
            onClick={() => setRestoreConfirmation(true)}
            className="text-white p-2 bg-blue-800 rounded-[10px]"
          >
            <AiFillEyeInvisible className="inline-block mr-1" />
            Habilitar
          </button>
        </div>
        <div className="w-[30%] ">
          <button
            onClick={() => setDeleteConfirmation(true)}
            className="text-white p-2 bg-red-800 rounded-[10px]"
          >
            <AiFillDelete className="inline-block mr-1" />
            Eliminar
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
          <Image
            src={image}
            layout="fill"
            className="object-cover"
            alt={name}
          />
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
          <h2 className="text-lg font-semibold">
            Precio: {formatPrice(price)}
          </h2>
        </div>

        <div>
          <h2 className="text-lg font-semibold">Descuento: {discount}</h2>
        </div>
      </div>

      {restoreConfirmation && (
        <DeleteConfirmation
          title="Restaurar Producto"
          message="¿Estás seguro de que deseas restaurar este producto en la tienda? Ten en cuenta que este producto se mostrará nuevamente en la tienda."
          confirmText="Restaurar"
          cancelText="Cancelar"
          onConfirm={handleToggleProductVisibility}
          onCancel={() => setRestoreConfirmation(false)}
        />
      )}
      {deleteConfirmation && (
        <DeleteConfirmation
          title="Eliminar Producto"
          message="¿Estás seguro de que deseas eliminar este producto de la tienda? Esta acción no se puede deshacer."
          confirmText="Eliminar"
          cancelText="Cancelar"
          onConfirm={() => {
            dispatch(deleteProducts(code));
          }}
          onCancel={() => setDeleteConfirmation(false)}
        />
      )}
    </div>
  );
}

export default ProductsHidden;
