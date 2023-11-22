import DeleteConfirmation from "@/components/Modals/DeleteConfirmation";
import EditProduct from "@/components/Modals/EditProduct";
import { formatPrice } from "@/shared/ultis";
import {
  disableProducts,
  restoreProducts,
  selecthiddenproducts,
} from "@/states/dashboard/products/productsSlice";
import { useAppDispatch } from "@/states/store";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { AiFillEdit, AiFillEye } from "react-icons/ai";
import { useSelector } from "react-redux";

type Props = {
  code: string;
  name: string;
  description: string;
  price: number;
  brand: { id: number; name: string };
  image: string;
  discount: number;
  category: { id: number; name: string };
  unitOfMeasure: { id: number; name: string };
};

function Card({
  code,
  name,
  description,
  price,
  brand,
  image,
  discount,
  unitOfMeasure,
  category,
}: Props) {
  const dispatch = useAppDispatch();
  const [view, setView] = useState(true);
  const hiddenProducts = useSelector(selecthiddenproducts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);

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

  const closeModal = () => {
    setIsModalOpen(false);
  };


  return (
    <div className="bg-opacity-60 w-80 h-[98%]  hover:bg-opacity-100  md:w-80 md:h-[98%]   lg:w-80 lg:h-[530px]   transition-transform duration-500 rotate-1.7 rounded-lg border-gray-600 border mb-6 bg-white ">
      <div className=" p-2 bg-slate-800 flex">
        <div className="w-[30%] ">
          <button
            onClick={() => setDeleteConfirmation(true)}
            className="text-white p-2 bg-orange-800 rounded-[10px] flex items-center"
          >
            <AiFillEye className="inline-block mr-1" />
            Ocultar
          </button>
        </div>

        <div className="w-[30%] ">
          <button
            className="text-white p-2 bg-blue-800 rounded-[10px]"
            onClick={() => setIsModalOpen(true)}
          >
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

        <div className="relative  h-40 mx-auto my-4 aspect-video">
          <Image
            src={image}
            layout="fill"
            // className="object-cover"
            alt={name}
          />
        </div>

        <div>
          <p className="text-sm line-clamp-6">{description}</p>
        </div>

        <div>
          {brand && (
            <h2 className="text-lg font-semibold">Marca: {brand.name}</h2>
          )}
        </div>

        <div>
          <h2 className="text-lg font-semibold">Categoría: {category.name}</h2>
        </div>

        <div>
          <h2 className="text-lg font-semibold">
            Precio: {formatPrice(price)}
          </h2>
        </div>

        {/* <div className="h-48 overflow-y-auto">
          <p className="text-sm">{description}</p>
          <h2 className="text-lg font-semibold">Marca:{brand?.name}</h2>
          <h2 className="text-lg font-semibold">Categoría: {category.name}</h2>
          <h2 className="text-lg font-semibold">Precio: {formatPrice(price)}</h2>
          <h2 className="text-lg font-semibold">Descuento: {discount}</h2>
        </div> */}

      </div>
      {isModalOpen && (
        <EditProduct
          productData={{
            code: code,
            name: name,
            description: description,
            price: price,
            brandId: brand?.id,
            image: image,
            discount: discount,
            categoryId: category.id,
            unitOfMeasureId: unitOfMeasure.id,
          }}
          closeModal={closeModal}
        />
      )}
      {deleteConfirmation && (
        <DeleteConfirmation
          title="Ocultar Producto"
          message="¿Estás seguro de que deseas ocultar este producto de la tienda? Ten en cuenta que este producto se ocultará de la tienda y nadie podrá verlo."
          confirmText="Confirmar"
          cancelText="Cancelar"
          onConfirm={handleToggleProductVisibility}
          onCancel={() => setDeleteConfirmation(false)}
        />
      )}
    </div>
  );
}

export default Card;
