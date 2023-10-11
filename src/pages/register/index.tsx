import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import Link from "next/link";
import { ChangeEvent, useState } from "react";
import Foto from "@/assets/pictures/avatar.webp";
import { useAppDispatch } from "@/states/store";
import { postUser } from "@/states/users/usersSlice";
import Image from "next/image";
import { useRouter } from "next/router";
import { FaEye, FaEyeSlash } from "react-icons/fa";

type Props = {};

const Register = (props: Props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false); // Estado para controlar si se muestra la contraseña
  
  const handleTogglePassword = () => {
    setShowPassword(!showPassword); // Cambia el estado para alternar entre mostrar y ocultar
  };

  const backgroundImageStyle: React.CSSProperties = {
    backgroundImage:
      "url(https://6430607.fs1.hubspotusercontent-na1.net/hubfs/6430607/articulos%20indispensables%20para%20una%20ferreteria.jpg)",
  };

  const initialValues = {
    name: "",
    email: "",
    password: "",
    photo: null as File | null,
  }
  const validationSchema = Yup.object({
    name: Yup.string()
      .matches(/^[A-Za-z\s]+$/, "Solo se permiten letras")
      .required("El nombre es requerido"),
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
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const data = await dispatch(postUser({ ...values }));
        if (data.payload.status === 201) {
          resetForm()
          toast.success("Usuario registrado correctamente.");
          router.push("/login");
        } else {
          toast.error("Correo ya registrado.");
        }
      } catch (error) {
        toast.error("Ocurrió un error, inténtelo nuevamente.");
      } finally {
        setSubmitting(false); // Asegura que el formulario se pueda enviar nuevamente si es necesario
      }
    },
  });

  const handlePhotoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    formik.setFieldValue('photo', file);
  };
  const photoPreview = formik.values.photo ? URL.createObjectURL(formik.values.photo) : Foto;
  return (
    <div>
      <section className="bg-gradient-to-t from-green-600 to-emerald-600">
        <div className="flex justify-center min-h-screen">
          <div
            className="hidden bg-cover lg:block lg:w-2/5"
            style={backgroundImageStyle}
          ></div>

          <div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
            <div className="w-full">
              <h1 className="text-5xl mt-8 font-semibold text-white">
                Ferreteria Liviapoma
              </h1>

              <form
                onSubmit={formik.handleSubmit}
                className="grid  flex-wrap gap-6 mt-8"
                encType="multipart/form-data"
              >
                <div className=" flex justify-center">
                  <div className="relative w-44 h-44 rounded-full overflow-hidden cursor-pointer transition duration-300 group  ">
                    <label
                      htmlFor="photo"
                      className="absolute inset-0 flex items-center justify-center text-white text-2xl transition-opacity opacity-0 group-hover:opacity-100"
                    >
                      <span className="bg-black bg-opacity-50 rounded-full p-2 absolute z-[999] ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          ></path>
                        </svg>
                      </span>
                    </label>
                    <div className="w-full h-full filter  group-hover:blur">
                      {photoPreview ? (
                        <Image
                          src={photoPreview}
                          alt="Vista Previa"
                          style={{ maxWidth: "300px" }}
                          layout="fill"
                        />
                      ) : (
                        <>
                          <Image
                            src={Foto}
                            alt="Lion"
                            className="w-[100%] h-[100%]"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-full ">
                            <label
                              htmlFor="photo"
                              className="flex items-center justify-center text-white cursor-pointer "
                            >
                              <span className="text-4xl cursor-pointer">+</span>
                            </label>
                          </div>
                        </>
                      )}
                    </div>
                    <input
                      type="file"
                      id="photo"
                      name="photo"
                      accept="image/*"
                      className="hidden"
                      onChange={handlePhotoChange}
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-2 text-sm text-gray-100">
                    Nombre Completo
                  </label>
                  <input
                    className={`block w-full px-5 py-3 mt-2 text-black bg-white border rounded-lg font-semibold focus:border-blue-400 focus:ring-purple-700 focus:outline-none focus:ring focus:ring-opacity-40 ${formik.touched.name && formik.errors.name
                      ? "border-2 border-red-500 placeholder:text-red-500" : "border-gray-700 placeholder-gray-400"}`}
                    placeholder={formik.touched.name && formik.errors.name ? formik.errors.name : "Example name"}
                    type="text"
                    {...formik.getFieldProps("name")}
                    onBlur={(e) => {
                      formik.handleBlur(e);
                      if (formik.touched.name && formik.errors.name) return toast.error(formik.errors.name)
                    }}
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm text-gray-200">
                    Correo Electronico
                  </label>
                  <input
                    className={`block w-full px-5 py-3 mt-2 text-black bg-white border rounded-lg font-semibold focus:border-blue-400 focus:ring-purple-700 focus:outline-none focus:ring focus:ring-opacity-40 ${formik.touched.email && formik.errors.email
                      ? "border-2 border-red-500 placeholder:text-red-500" : "border-gray-700 placeholder-gray-400"}`}
                    placeholder={formik.touched.email && formik.errors.email ? formik.errors.email : "Example123@gmail.com"}
                    type="text"
                    {...formik.getFieldProps("email")}
                    onBlur={(e) => {
                      formik.handleBlur(e);
                      if (formik.touched.email && formik.errors.email) return toast.error(formik.errors.email)
                    }}
                  />
                </div>

                <div className="relative">
                  <label className="block mb-2 text-sm text-gray-200">
                    Contraseña
                  </label>
                  <input
                    className={`block w-full px-5 py-3 mt-2 text-black bg-white border rounded-lg font-semibold focus:border-blue-400 focus:ring-purple-700 focus:outline-none focus:ring focus:ring-opacity-40 ${formik.touched.password && formik.errors.password
                      ? "border-2 border-red-500 placeholder:text-red-500" : "border-gray-700 placeholder-gray-400"}`}
                    placeholder={formik.touched.password && formik.errors.password ? formik.errors.password : "Contraseña"}
                    type={showPassword ? "text" : "password"}
                    {...formik.getFieldProps("password")}
                    onBlur={(e) => {
                      formik.handleBlur(e);
                      if (formik.touched.password && formik.errors.password) return toast.error(formik.errors.password)
                    }}
                  />
                  <button
                    className="absolute right-2 top-5 mt-8 transform -translate-y-1/2"
                    onClick={handleTogglePassword}
                  >
                    {" "}
                    {showPassword ? <FaEye /> : <FaEyeSlash />}{" "}
                    {/* Alterna entre los íconos */}
                  </button>
                </div>

                <button
                  type="submit"
                  className="mt-8 inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 bg-yellow-500 hover:bg-yellow-600 rounded-lg hover:bg-yellow-600focus:shadow-outline focus:outline-none"
                >
                  Registrar
                </button>
              </form>
              <div className=" justify-center flex pt-2 text-gray-100 gap-2 hover:text-gray-100 w-full">
                <h2>Si ya tienes cuenta </h2>
                <Link href="/login">
                  <h2 className="hover:underline cursor-pointer text-blue-600 font-bold">
                    Ingresa aqui
                  </h2>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;