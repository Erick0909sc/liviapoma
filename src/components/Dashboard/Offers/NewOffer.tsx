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
import useCategoriesData from "@/hooks/useCategoriesData";
import useBrandsData from "@/hooks/useBrandsData";
type Props = {};

const NewOffer = (props: Props) => {
  const categories = useCategoriesData();
  const brands = useBrandsData();
  const states = {
    categoria: false,
    marca: false,
  };
  const [offertBy, setOffertBy] = useState({
    ...states,
  });
  const initialPhoto =
    "https://view.publitas.com/40824/1026433/pages/11096d18-d5a1-4920-be41-d5d0d5b031d2-at1000.jpg";
  const initialValues = {
    startDate: "",
    endDate: "",
    discount: "",
    image: null as File | null,
    categories: [],
    brands: [],
  };
  const validationSchema = Yup.object({
    startDate: Yup.date().required("La fecha de inicio es requerida"),
    endDate: Yup.date().required("La fecha de finalización es requerida"),
    brands: Yup.array().optional(),
  });
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      7;
      try {
        const res = await postOfferDashboardByApi({
          ...values,
          image: values.image as File,
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
      } finally {
      }
    },
  });
  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setOffertBy({
      ...states,
      [e.target.value]: true,
    });
    formik.setFieldValue("categories", []);
    formik.setFieldValue("brands", []);
  };
  return (
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
              <option value="categoria">Ofertas en Toda una Categoría</option>
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
                fieldNameTranslate={OfferTranslation["brands"]}
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
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg"
          type="submit"
        >
          Crear Oferta
        </button>
      </form>
    </div>
  );
};

export default NewOffer;
