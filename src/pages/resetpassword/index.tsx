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
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Head>
        <title>Liviapoma - Restablecimiento de contraseña</title>
      </Head>
      <h1 className="text-4xl font-extrabold text-gray-800">
        Restablecimiento de contraseña
      </h1>
      <p className="text-gray-600 mt-2">
        Por favor escriba su Email registrado
      </p>
      <form onSubmit={formik.handleSubmit}>
        <CustomInput
          formik={formik}
          fieldName={"email"}
          fieldNameTranslate={"Email"}
        />
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Restablecer Contraseña
        </button>
      </form>
      <Link href="/">
        <span className="mt-4 text-green-600 hover:underline">
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
  );
};

export default Resetpassword;
