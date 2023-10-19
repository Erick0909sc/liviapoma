import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

type Props = {
  token: string;
};

const Token = ({ token }: Props) => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const initialValues = {
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    password: Yup.string()
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .required("La contraseña es requerida"),
    confirmPassword: Yup.string()
      .required("La confirmación de contraseña es requerida")
      .test(
        "passwords-match",
        "Las contraseñas no coinciden",
        function (value) {
          return value === this.parent.password;
        }
      ),
  });
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await fetch("/api/auth/changePassword", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token, password: values.password }),
        });
        const data = await response.json();
        if (response.ok) {
          resetForm();
          toast.success(data.message, {
            duration: 5000,
          });
          router.push("/login");
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
            <div className="mb-4 relative">
              <label className="capitalize block text-gray-600">
                Contraseña:
              </label>
              <input
                className={`block w-full px-5 py-3 text-black bg-white border rounded-lg font-semibold focus:border-green-500 focus:ring-green-600 focus:outline-none focus:ring focus:ring-opacity-80 ${
                  formik.touched.password && formik.errors.password
                    ? "border-red-500 placeholder:text-red-500"
                    : "border-gray-700"
                }`}
                type={showPassword ? "text" : "password"}
                {...formik.getFieldProps("password")}
                onBlur={(e) => {
                  formik.handleBlur(e);
                  if (formik.touched.password && formik.errors.password)
                    return toast.error(formik.errors.password as string);
                }}
                required
              />
              <span
                className=" absolute mt-6 inset-y-0 right-0 flex items-center justify-center pr-2 cursor-pointer"
                onClick={handleTogglePassword}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
            <div className="mb-4 relative">
              <label className="capitalize block text-gray-600">
                Confirmar contraseña:
              </label>
              <input
                className={`block w-full px-5 py-3 text-black bg-white border rounded-lg font-semibold focus:border-green-500 focus:ring-green-600 focus:outline-none focus:ring focus:ring-opacity-80 ${
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                    ? "border-red-500 placeholder:text-red-500"
                    : "border-gray-700"
                }`}
                type={showConfirmPassword ? "text" : "password"}
                {...formik.getFieldProps("confirmPassword")}
                onBlur={(e) => {
                  formik.handleBlur(e);
                  if (
                    formik.touched.confirmPassword &&
                    formik.errors.confirmPassword
                  )
                    return toast.error(formik.errors.confirmPassword as string);
                }}
                required
              />
              <span
                className=" absolute mt-6 inset-y-0 right-0 flex items-center justify-center pr-2 cursor-pointer"
                onClick={handleToggleConfirmPassword}
              >
                {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
            <button
              type="submit"
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            >
              Restablecer Contraseña
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Token;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { token } = context.query;
  return {
    props: {
      token: token,
    },
  };
}
