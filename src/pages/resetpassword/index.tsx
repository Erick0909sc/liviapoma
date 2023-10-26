import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import CustomInput from "@/components/Custom/CustomInput";
import { useState } from "react";
import ResetPassSuccess from "@/components/Modals/ResetPassSuccess";
import { AiOutlineInfoCircle } from "react-icons/ai";

type Props = {};

const Resetpassword = (props: Props) => {
  const [successModal, setSuccessModal] = useState(false);
  const initialValues = {
    email: "",
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Ingrese un correo válido")
      .required("El correo es requerido"),
  });
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await fetch("/api/auth/resetPassword", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: values.email }),
        });
        const data = await response.json();
        if (response.ok) {
          resetForm();
          setSuccessModal(true);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error("Error al cambiar la contraseña");
      }
    },
  });
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Head>
        <title>Liviapoma - Restablecimiento de contraseña</title>
      </Head>
      <img
        className="absolute top-0 z-10 left-0 w-full h-full object-cover"
        src="https://6430607.fs1.hubspotusercontent-na1.net/hubfs/6430607/articulos%20indispensables%20para%20una%20ferreteria.jpg"
      />
      <div className="relative flex flex-col z-50 bg-white  w-full max-w-xl h-80 rounded-xl bg-clip-border">
        <div className="p-6">
          <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
            Restablecimiento de Contraseña
          </h5>

          <form onSubmit={formik.handleSubmit}>
            <CustomInput
              formik={formik}
              fieldName={"email"}
              fieldNameTranslate={"Email"}
            />
            <button
              type="submit"
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 ease-in-out"
            >
              Restablecer Contraseña
            </button>
          </form>
          <Link href="/">
            <span className="mt-4 text-green-600 hover:underline hover:cursor-pointer">
              Volver a la página de inicio
            </span>
          </Link>
          {successModal && (
            <ResetPassSuccess
              title={"Siga estos pasos"}
              message={
                "Hemos enviado un correo electrónico con instrucciones para restablecer su contraseña. Puede cerrar esta ventana en cualquier momento."
              }
              icon={<AiOutlineInfoCircle className="text-9xl" />}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Resetpassword;
