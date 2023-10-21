import CustomDatetime from "@/components/Custom/CustomDatetime";
import CustomImageInput from "@/components/Custom/CustomImageInput";
import CustomInput from "@/components/Custom/CustomInput";
import CustomNumber from "@/components/Custom/CustomNumber";
import CustomOptions from "@/components/Custom/CustomOptions";
import CustomOptionsWithInput from "@/components/Custom/CustomOptionsWithInput";
import CustomTextarea from "@/components/Custom/CustomTextarea";
import { ProductTranslation } from "@/shared/translate";
import { postOfferDashboardByApi } from "@/states/dashboard/offers/offersApi";
import { useFormik } from "formik";
import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";
import request from "axios";
import useCategoriesData from "@/hooks/useCategoriesData";
import useBrandsData from "@/hooks/useBrandsData";
import CustomOptionsWithOnlyValue from "@/components/Custom/CustomOptionsWithOnlyValue";
import { postProductByApi } from "@/states/dashboard/products/productsApi";
import useMeasuresData from "@/hooks/useMeasuresData";
type Props = {};

const NewProduct = (props: Props) => {
  const categories = useCategoriesData();
  const brands = useBrandsData();
  const meaures = useMeasuresData();
  const initialPhoto =
    "https://view.publitas.com/40824/1026433/pages/11096d18-d5a1-4920-be41-d5d0d5b031d2-at1000.jpg";
  const initialValues = {
    code: "",
    name: "",
    description: "",
    price: 0,
    brandId: "",
    image: null as File | null,
    discount: 0,
    categoryId: "",
    unitOfMeasureId: "",
  };
  const validationSchema = Yup.object({
    code: Yup.string().required("El código es requerido"),
    name: Yup.string().required("El nombre es requerido"),
    description: Yup.string().required("La descripción es requerida"),
    price: Yup.number()
      .typeError("El precio debe ser un número")
      .positive("El precio debe ser un número positivo")
      .required("El precio es requerido"),
    image: Yup.string().required("La imagen es requerida"),
    discount: Yup.number()
      .typeError("El descuento debe ser un número")
      .min(0, "El descuento no puede ser menor que 0")
      .max(100, "El descuento no puede ser mayor que 100"),
    categoryId: Yup.number().required("El ID de la categoría es requerido"),
    unitOfMeasureId: Yup.number().required("El ID de la medida es requerido"),
  });
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      7;
      try {
        console.log(values);
        const brandId = parseInt(values.brandId as string);
        const categoryId = parseInt(values.categoryId as string);
        const unitOfMeasureId = parseInt(values.categoryId as string);
        const res = await postProductByApi({
          ...values,
          image: values.image as File,
          categoryId,
          brandId,
          unitOfMeasureId,
        });
        if (res.status === 201) {
          resetForm();
          toast.success(res.data.message, { duration: 5000 });
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
  return (
    <div className="p-2 md:p-4 flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-4">Crear un nuevo producto</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!formik.values.image) {
            return toast.error(
              "Se requiere una imagen para el crear un producto"
            );
          }
          formik.handleSubmit(e);
        }}
        className="w-full h-auto max-w-4xl"
      >
        <CustomImageInput
          formik={formik}
          fieldName="image"
          fieldNameTranslate={ProductTranslation["image"]}
          initialPhoto={initialPhoto}
        />
        <CustomInput
          formik={formik}
          fieldName="code"
          fieldNameTranslate={ProductTranslation["code"]}
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
          fieldNameTranslate="categories"
          value={formik.values.categoryId}
        />
        <CustomOptionsWithOnlyValue
          formik={formik}
          fieldName="brandId"
          items={brands}
          fieldNameTranslate="brands"
          value={formik.values.brandId}
        />
        <CustomOptionsWithOnlyValue
          formik={formik}
          fieldName="unitOfMeasureId"
          items={meaures}
          fieldNameTranslate={ProductTranslation["measure"]}
          value={formik.values.unitOfMeasureId}
        />
        <button
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg"
          type="submit"
        >
          Crear Producto
        </button>
      </form>
    </div>
  );
};

export default NewProduct;
