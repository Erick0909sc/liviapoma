import useBrandsData from "@/hooks/useBrandsData";
import useCategoriesData from "@/hooks/useCategoriesData";
import { ProductTranslation } from "@/shared/translate";
import {
  editproduct,
  getAllProducts,
} from "@/states/dashboard/products/productsSlice";
import { RootState, useAppDispatch } from "@/states/store";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import CustomImageInput from "../Custom/CustomImageInput";
import CustomInput from "../Custom/CustomInput";
import CustomNumber from "../Custom/CustomNumber";
import CustomOptionsWithOnlyValue from "../Custom/CustomOptionsWithOnlyValue";
import CustomTextarea from "../Custom/CustomTextarea";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import * as Yup from "yup";
import request from "axios";
import { processImage } from "@/shared/ultis";
import useMeasuresData from "@/hooks/useMeasuresData";

type Props = {
  productData: {
    code: string;
    name: string;
    description: string;
    price: number;
    brandId: number;
    image: string;
    discount: number;
    categoryId: number;
    unitOfMeasureId: number;
  };
  closeModal: () => void;
};

const EditProduct = ({ productData, closeModal }: Props) => {
  const dispatch = useAppDispatch();
  const categories = useCategoriesData();
  const brands = useBrandsData();
  const meaures = useMeasuresData();
  const initialValues = {
    code: productData.code,
    name: productData.name,
    description: productData.description,
    price: productData.price,
    brandId: productData.brandId ? productData.brandId : "",
    unitOfMeasureId: productData.unitOfMeasureId
      ? productData.unitOfMeasureId
      : "",
    image: null as File | null,
    discount: productData.discount,
    categoryId: productData.categoryId ? productData.categoryId : "",
  };
  const validationSchema = Yup.object({
    code: Yup.string().required("El código es requerido"),
    name: Yup.string().required("El nombre es requerido"),
    description: Yup.string().required("La descripción es requerida"),
    price: Yup.number()
      .typeError("El precio debe ser un número")
      .positive("El precio debe ser un número positivo")
      .required("El precio es requerido"),
    discount: Yup.number()
      .typeError("El descuento debe ser un número")
      .min(0, "El descuento no puede ser menor que 0")
      .max(99, "El descuento no puede ser mayor que 99")
      .optional(),
    categoryId: Yup.number().required("El ID de la categoría es requerido"),
    unitOfMeasureId: Yup.number().required("El ID de la medida es requerido"),
  });
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        const categoryId = parseInt(values.categoryId as string);
        const brandId = parseInt(values.brandId as string);
        const unitOfMeasureId = parseInt(values.unitOfMeasureId as string);
        let responseImage;
        if (values.image) {
          responseImage = await processImage(values.image);
        }
        const res = await dispatch(
          editproduct({
            ...values,
            categoryId,
            unitOfMeasureId,
            brandId: brandId ? brandId : null,
            image: values.image ? responseImage?.data : productData.image,
          })
        );
        if (res.meta.requestStatus === "fulfilled") {
          closeModal();
          await dispatch(getAllProducts());
          return toast.success("Producto actualizado correctamente");
        }
      } catch (error) {
        if (request.isAxiosError(error) && error.response) {
          toast.error(
            (
              error.response?.data as {
                message: string;
              }
            ).message
          );
        }
      }
    },
  });
  const [isIn, setIsIn] = useState(true);
  const animationClass = isIn ? "animate-flip-down" : "animate-jump-out";
  return (
    <div className="flex justify-center items-center fixed top-0 right-0 w-screen h-screen bg-black/30 z-50">
      <div
        className={`w-full xs:w-[60%] max-w-[800px] h-auto max-h-[95vh] overflow-y-auto bg-white p-6 rounded-lg ${animationClass}`}
      >
        <h2 className="text-2xl font-bold mb-4">Editar Producto</h2>
        <form onSubmit={formik.handleSubmit}>
          <CustomImageInput
            formik={formik}
            fieldName="image"
            fieldNameTranslate={ProductTranslation["image"]}
            initialPhoto={productData.image}
          />
          <CustomInput
            formik={formik}
            fieldName="name"
            fieldNameTranslate={ProductTranslation["name"]}
          />
          <CustomTextarea
            formik={formik}
            fieldName="description"
            fieldNameTranslate={ProductTranslation["description"]}
          />
          <CustomNumber
            formik={formik}
            fieldName="price"
            fieldNameTranslate={ProductTranslation["price"]}
          />
          <CustomNumber
            formik={formik}
            fieldName="discount"
            fieldNameTranslate={ProductTranslation["discount"]}
          />
          <CustomOptionsWithOnlyValue
            formik={formik}
            fieldName="categoryId"
            items={categories}
            fieldNameTranslate={ProductTranslation["category"]}
            value={formik.values.categoryId}
          />
          <CustomOptionsWithOnlyValue
            formik={formik}
            fieldName="brandId"
            items={brands}
            fieldNameTranslate={ProductTranslation["brand"]}
            value={formik.values.brandId}
          />
          <CustomOptionsWithOnlyValue
            formik={formik}
            fieldName="unitOfMeasureId"
            items={meaures}
            fieldNameTranslate={ProductTranslation["measure"]}
            value={formik.values.unitOfMeasureId}
          />
          <div className="col-span-2 text-center mt-4">
            <button
              type="submit"
              className="bg-blue-800 text-white p-2 rounded-md mr-4"
            >
              Guardar
            </button>
            <button
              type="button"
              className="bg-red-600 text-white p-2 rounded-md"
              onClick={() => {
                setIsIn(false);
                setTimeout(() => {
                  closeModal();
                }, 500);
              }}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
