import CustomDatetime from "@/components/Custom/CustomDatetime";
import CustomImageInput from "@/components/Custom/CustomImageInput";
import CustomInput from "@/components/Custom/CustomInput";
import CustomNumber from "@/components/Custom/CustomNumber";
import CustomOptions from "@/components/Custom/CustomOptions";
import CustomTextarea from "@/components/Custom/CustomTextarea";
import { OfferTranslation } from "@/shared/translate";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import * as Yup from "yup";
type Props = {};

const NewOffer = (props: Props) => {
  const initialPhoto =
    "https://view.publitas.com/40824/1026433/pages/11096d18-d5a1-4920-be41-d5d0d5b031d2-at1000.jpg";
  const initialValues = {
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    discount: "",
    image: null as File | null,
    category: "",
  };
  const validationSchema = Yup.object({
    title: Yup.string().required("El título es requerido"),
    description: Yup.string().required("La descripción es requerida"),
    startDate: Yup.date().required("La fecha de inicio es requerida"),
    endDate: Yup.date().required("La fecha de finalización es requerida"),
    discount: Yup.number().required("El descuento es requerido"),
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
  const test = [
    "Categoria (opcional)",
    "spring",
    "easter",
    "summer",
    "4th of July",
    "fall",
    "thanksgiving",
    "winter",
    "christmas",
    "new year's eve",
    "other",
  ];
  return (
    <div className="p-2 md:p-4 flex flex-col items-center justify-center">
      <h2>Crear una nueva oferta</h2>
      <form onSubmit={formik.handleSubmit} className="w-full h-auto max-w-4xl">
        <div className="grid gap-4 md:grid-cols-2">
          <CustomInput
            formik={formik}
            fieldName="title"
            fieldNameTranslate={OfferTranslation["title"]}
          />
          <div>
            <CustomOptions
              formik={formik}
              fieldName="category"
              items={test}
              fieldNameTranslate={OfferTranslation["category"]}
            />
          </div>
        </div>
        <CustomImageInput
          formik={formik}
          fieldName="image"
          fieldNameTranslate={OfferTranslation["image"]}
          initialPhoto={initialPhoto}
        />
        <CustomTextarea
          formik={formik}
          fieldName="description"
          fieldNameTranslate={OfferTranslation["description"]}
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
