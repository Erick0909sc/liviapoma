import Google from "@/components/BTN/Google";
import { getSession, signIn } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { FaEye, FaEyeSlash } from "react-icons/fa";

type Props = {
  style: string;
};
interface FormValues {
  [key: string]: string;
}

const Login = (props: Props) => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false); // Estado para controlar si se muestra la contraseña
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword); // Cambia el estado para alternar entre mostrar y ocultar
  };
  const backgroundImageStyle: React.CSSProperties = {
    backgroundImage:
      "url(https://6430607.fs1.hubspotusercontent-na1.net/hubfs/6430607/articulos%20indispensables%20para%20una%20ferreteria.jpg)",
  };

  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Ingrese un correo válido")
      .required("El correo es requerido"),
    password: Yup.string()
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .required("La contraseña es requerida"),
  });
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });
  async function onSubmit(
    values: FormValues,
    { resetForm }: { resetForm: () => void }
  ) {
    try {
      setIsLoggingIn(true);
      const response = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });
      if (response?.ok) {
        resetForm();
        toast.loading("Redirigiendo...", { duration: 3000 });
        router.push((router.query.callbackUrl as string) || "/");
      } else {
        toast.error(response?.error as string);
      }
    } catch (error) {
      toast.error("Ocurrió un error, por favor intente nuevamente.");
    } finally {
      setIsLoggingIn(false); // Establece isLoggingIn en false al finalizar la autenticación
    }
  }

  return (
    <div>
      <Head>
        <title>{`Liviapoma - Inicio de sesión`}</title>
      </Head>
      <section className="min-h-screen flex items-stretch text-white ">
        <div
          className="lg:flex w-1/2 hidden  bg-no-repeat bg-cover relative items-center"
          style={backgroundImageStyle}
        >
          <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
          <div className="w-full px-24 z-10">
            <h1 className="text-5xl font-bold text-left tracking-wide">
              Bienvenido
            </h1>
            <p className="text-3xl my-4">
              Ingresa o Registrate para que ser parte de nuestra familia
            </p>
          </div>
        </div>
        <div className="lg:w-1/2 w-full flex items-center justify-center text-center md:px-16 px-0 z-0 bg-gradient-to-t from-green-600 to-emerald-600">
          <div className="absolute lg:hidden z-10 inset-0 bg-gradient-to-t from-green-600 to-emerald-600 items-center">
            <div className="absolute  inset-0 z-0"></div>
          </div>

          <div className="w-full py-6 z-20">
            <h1 className="my-6 flex flex-col justify-center text-5xl">
              Ferreteria Liviapoma
            </h1>
            <div className="py-6 space-x-2">
              <span className="w-10 h-10  rounded-full font-bold text-lg ">
                <Google />
              </span>
              <span className="w-5/6 px-4 py-3 font-bold text-center">
                Inicia sesion con Google
              </span>
            </div>
            <Link href="/register">
              <p className="text-gray-100 cursor-pointer">o Resgistrate aqui</p>
            </Link>
            <form
              onSubmit={formik.handleSubmit}
              className="sm:w-2/3 w-full px-4 lg:px-0 mx-auto"
            >
              <div className="pb-2 pt-4">
                <input
                  className={`block w-full p-4 text-lg rounded-sm bg-black ${
                    formik.touched.email && formik.errors.email
                      ? "border-2 border-red-500 placeholder:text-red-500"
                      : ""
                  }`}
                  placeholder={
                    formik.touched.email && formik.errors.email
                      ? formik.errors.email
                      : "Example123@gmail.com"
                  }
                  type="text"
                  {...formik.getFieldProps("email")}
                  onBlur={(e) => {
                    formik.handleBlur(e);
                    if (formik.touched.email && formik.errors.email)
                      return toast.error(formik.errors.email);
                  }}
                />
              </div>
              <div className="pb-2 pt-4 relative">
                <input
                  className={`block w-full p-4 text-lg rounded-sm bg-black ${
                    formik.touched.password && formik.errors.password
                      ? "border-2 border-red-500 placeholder:text-red-500"
                      : ""
                  }`}
                  placeholder={
                    formik.touched.password && formik.errors.password
                      ? formik.errors.password
                      : "Contraseña"
                  }
                  type={showPassword ? "text" : "password"}
                  {...formik.getFieldProps("password")}
                  onBlur={(e) => {
                    formik.handleBlur(e);
                    if (formik.touched.password && formik.errors.password)
                      return toast.error(formik.errors.password);
                  }}
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FaEyeSlash className="text-white text-xl cursor-pointer" />
                  ) : (
                    <FaEye className="text-white text-xl cursor-pointer" />
                  )}
                </button>
              </div>
              <div className="text-right text-gray-100 hover:underline hover:text-gray-100">
                <Link href="/resetpassword">¿Olvidaste tu contraseña?</Link>
              </div>
              <div className="px-4 pb-2 pt-4">
                <button
                  className="uppercase block w-full p-4 text-lg rounded-full bg-yellow-500 hover:bg-yellow-600 focus:outline-none"
                  disabled={isLoggingIn}
                >
                  {isLoggingIn ? "Ingresando..." : "Ingresar"}
                </button>
              </div>

              <div className="p-4 text-center right-0 left-0 flex justify-center space-x-4 mt-16 lg:hidden ">
                <a href="#">
                  <svg
                    fill="#fff"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a href="#">
                  <svg
                    fill="#fff"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                  </svg>
                </a>
                <a href="#">
                  <svg
                    fill="#fff"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {
      session,
    },
  };
};

export default Login;
