import CustomImageInput from "@/components/Custom/CustomImageInput";
import CustomOptionsWithInput from "@/components/Custom/CustomOptionsWithInput";
import { OfferTranslation } from "@/shared/translate";
import { useFormik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";
import request from "axios";
import { IOfferDashboard } from "@/shared/types";
import { putOfferDashboardByApi } from "@/states/dashboard/offers/offersApi";
import { useAppDispatch } from "@/states/store";
import { getAllOffers } from "@/states/dashboard/offers/offersSlice";
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
  const dispatch = useAppDispatch();
  const offertBy = {
    categoria: props.categories.length ? true : false,
    marca: props.brands.length ? true : false,
  };
  const [isIn, setIsIn] = useState(true);
  const initialPhoto = props.image;

  const categoriesData = props.categories.map((item) => {
    return {
      ...item,
      name: item.category.name,
    };
  });
  const brandssData = props.brands.map((item) => {
    return {
      ...item,
      name: item.brand.name,
    };
  });
  const categories = categoriesData.map((item) => item.name);
  const brands = brandssData.map((item) => item.name);

  const initialValues = {
    image: null as File | null,
    categories: categoriesData,
    brands: brandssData,
  };
  const validationSchema = Yup.object({
    brands: Yup.array().optional(),
    categories: Yup.array().optional(),
  });
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      7;
      try {
        const res = await putOfferDashboardByApi({
          id: props.id,
          ...values,
          image: values.image ? (values.image as File) : props.image,
        });
        if (res.status === 200) {
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
        await dispatch(getAllOffers());
      }
    },
  });
  const animationClass = isIn ? "animate-flip-down" : "animate-jump-out";
  return (
    <div className="flex justify-center items-center py-4 fixed top-0 right-0 w-screen h-screen bg-black/30 z-50">
      <div
        className={`bg-white max-h-[95vh] overflow-y-auto sm:p-6 rounded-lg ${animationClass}`}
      >
        <div className="p-2 md:p-4 flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold mb-4">Crear una nueva oferta</h2>
          <form
            onSubmit={formik.handleSubmit}
            className="w-full h-auto max-w-4xl"
          >
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
