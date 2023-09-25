import CustomDatetime from "@/components/Custom/CustomDatetime";
import CustomImageInput from "@/components/Custom/CustomImageInput";
import CustomInput from "@/components/Custom/CustomInput";
import CustomNumber from "@/components/Custom/CustomNumber";
import CustomOptions from "@/components/Custom/CustomOptions";
import CustomOptionsWithInput from "@/components/Custom/CustomOptionsWithInput";
import CustomTextarea from "@/components/Custom/CustomTextarea";
import { OfferTranslation } from "@/shared/translate";
import { postOfferDashboardByApi } from "@/states/dashboard/offers/offersApi";
import { useFormik } from "formik";
import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";
import request from "axios";
import { IOfferDashboard } from "@/shared/types";
import { formatToDatetimeLocal } from "@/shared/ultis";

interface Props extends IOfferDashboard {
  // title: string;
  // message: string;
  // confirmText: string;
  // cancelText: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const EditOffer = ({
  // title,
  // message,
  // confirmText,
  // cancelText,
  onConfirm,
  onCancel,
  ...props
}: Props) => {
  const states = {
    marca_categoria:
      props.categories.length && props.brands.length ? true : false,
    categoria: props.categories.length ? true : false,
    marca: props.brands.length ? true : false,
  };
  const [offertBy, setOffertBy] = useState({
    ...states,
  });
  const [isIn, setIsIn] = useState(true);
  const initialPhoto = props.image;
  const initialValues = {
    startDate: formatToDatetimeLocal(props.startDate),
    endDate: formatToDatetimeLocal(props.endDate),
    image: null as File | null,
    categories: props.categories,
    brands: props.brands,
  };
  const validationSchema = Yup.object({
    startDate: Yup.date().required("La fecha de inicio es requerida"),
    endDate: Yup.date().required("La fecha de finalización es requerida"),
    brand: Yup.array().optional(),
  });
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      7;
      try {
        console.log(values);
        // const res = await postOfferDashboardByApi({
        //   ...values,
        //   image: values.image as File,
        // });
        // if (res.status === 201) {
        //   resetForm();
        //   toast.success(res.data.message, { duration: 5000 });
        // }
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
      } finally {
      }
    },
  });
  const categories = [
    "Cementos",
    "Varillas",
    "Estribos",
    "Alambres",
    "Clavos",
    "Eternits",
    "Cumbreras",
  ];
  const brands = ["PACASMAYO", "SIDERPERU", "ETERNIT", "FIBRAFORTE"];

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setOffertBy({
      ...states,
      [e.target.value]: true,
    });
  };
  const animationClass = isIn ? "animate-jump-in" : "animate-jump-out";
  return (
    <div className="flex justify-center items-center py-4 fixed top-0 right-0 w-screen h-screen bg-black/30 z-50">
      <div
        className={`bg-white max-h-[95vh] overflow-y-auto sm:p-6 rounded-lg ${animationClass}`}
      >
        <div className="p-2 md:p-4 flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold mb-4">Crear una nueva oferta</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!formik.values.image) {
                return toast.error("Se requiere una imagen para la oferta");
              }
              formik.handleSubmit(e);
            }}
            className="w-full h-auto max-w-4xl"
          >
            <div className="grid items-center gap-4 md:grid-cols-3">
              <div>
                <label className="capitalize block text-gray-600">
                  Tipo de Oferta:
                </label>
                <select
                  className={`block w-full px-5 py-3 text-black bg-white border rounded-lg font-semibold focus:border-green-500 focus:ring-green-600 focus:outline-none focus:ring focus:ring-opacity-80 mb-4`}
                  onChange={handleSelect}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Seleccionar Tipo de Oferta
                  </option>
                  <option value="marca_categoria">
                    Ofertas de Marca en una Categoría
                  </option>
                  <option value="categoria">
                    Ofertas en Toda una Categoría
                  </option>
                  <option value="marca">Ofertas de Toda una Marca</option>
                </select>
              </div>
              <CustomDatetime
                formik={formik}
                fieldName="startDate"
                fieldNameTranslate={OfferTranslation["startDate"]}
              />
              <CustomDatetime
                formik={formik}
                fieldName="endDate"
                fieldNameTranslate={OfferTranslation["endDate"]}
              />
            </div>
            {offertBy.marca_categoria && (
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <CustomOptionsWithInput
                    formik={formik}
                    fieldName="categories"
                    items={categories}
                    fieldNameTranslate={OfferTranslation["categories"]}
                  />
                </div>
                <div>
                  <CustomOptionsWithInput
                    formik={formik}
                    fieldName="brands"
                    items={brands}
                    fieldNameTranslate={OfferTranslation["brand"]}
                  />
                </div>
              </div>
            )}
            {offertBy.categoria && (
              <div className="grid gap-4 md:grid-cols-1">
                <div>
                  <CustomOptionsWithInput
                    formik={formik}
                    fieldName="categories"
                    items={categories}
                    fieldNameTranslate={OfferTranslation["categories"]}
                  />
                </div>
              </div>
            )}
            {offertBy.marca && (
              <div className="grid gap-4 md:grid-cols-1">
                <div>
                  <CustomOptionsWithInput
                    formik={formik}
                    fieldName="brands"
                    items={brands}
                    fieldNameTranslate={OfferTranslation["brand"]}
                  />
                </div>
              </div>
            )}
            <CustomImageInput
              formik={formik}
              fieldName="image"
              fieldNameTranslate={OfferTranslation["image"]}
              initialPhoto={initialPhoto}
            />
            <button
              className="mx-2 p-3 rounded-lg bg-green-500 hover:bg-green-600 text-white"
              type="submit"
              onClick={() => {
                setIsIn(false);
                setTimeout(() => {
                  onCancel();
                }, 500);
              }}
            >
              Editar Oferta
            </button>
            <button
              className="mx-2 p-3 rounded-lg bg-red-500 hover:bg-red-600 text-white"
              type="button"
              onClick={() => {
                setIsIn(false);
                setTimeout(() => {
                  onCancel();
                }, 500);
              }}
            >
              Cancelar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditOffer;
