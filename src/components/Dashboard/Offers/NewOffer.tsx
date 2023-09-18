import CustomDatetime from "@/components/Custom/CustomDatetime";
import CustomImageInput from "@/components/Custom/CustomImageInput";
import CustomInput from "@/components/Custom/CustomInput";
import CustomNumber from "@/components/Custom/CustomNumber";
import CustomOptions from "@/components/Custom/CustomOptions";
import CustomTextarea from "@/components/Custom/CustomTextarea";
import { OfferTranslation } from "@/shared/translate";
import { useFormik } from "formik";
import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";
type Props = {};

const NewOffer = (props: Props) => {
  const states = {
    marca_categoria: false,
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
    category: [],
    brand: [],
  };
  const validationSchema = Yup.object({
    startDate: Yup.date().required("La fecha de inicio es requerida"),
    endDate: Yup.date().required("La fecha de finalización es requerida"),
    discount: Yup.number()
      .required("El descuento es requerido")
      .moreThan(0, "El descuento no puede ser menor o igual a 0%")
      .max(100, "El descuento no puede ser mayor que 100"),
    category: Yup.array().optional(),
    brand: Yup.array().optional(),
  });
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      7;
      try {
        console.log(values);
        // const data = await dispatch(postUser({ ...values }));
        // if (data.payload.status === 201) {
        //   resetForm()
        //   toast.success("Usuario registrado correctamente.");
        //   // router.push("/login");
        // } else {
        //   toast.error("Correo ya registrado.");
        // }
      } catch (error) {
        toast.error("Ocurrió un error, inténtelo nuevamente.");
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
  return (
    <div className="p-2 md:p-4 flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-4">Crear una nueva oferta</h2>
      <form onSubmit={formik.handleSubmit} className="w-full h-auto max-w-4xl">
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
          <option value="categoria">Ofertas en Toda una Categoría</option>
          <option value="marca">Ofertas de Toda una Marca</option>
        </select>
        {offertBy.marca_categoria && (
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <CustomOptions
                formik={formik}
                fieldName="category"
                items={categories}
                fieldNameTranslate={OfferTranslation["category"]}
              />
            </div>
            <div>
              <CustomOptions
                formik={formik}
                fieldName="brand"
                items={brands}
                fieldNameTranslate={OfferTranslation["brand"]}
              />
            </div>
          </div>
        )}
        {offertBy.categoria && (
          <div className="grid gap-4 md:grid-cols-1">
            <div>
              <CustomOptions
                formik={formik}
                fieldName="category"
                items={categories}
                fieldNameTranslate={OfferTranslation["category"]}
              />
            </div>
          </div>
        )}
        {offertBy.marca && (
          <div className="grid gap-4 md:grid-cols-1">
            <div>
              <CustomOptions
                formik={formik}
                fieldName="brand"
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
        <div className="grid gap-4 md:grid-cols-3">
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
          <CustomNumber
            formik={formik}
            fieldName="discount"
            fieldNameTranslate={OfferTranslation["discount"]}
          />
        </div>
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
