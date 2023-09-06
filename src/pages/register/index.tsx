import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";
import Foto from "@/assets/pictures/avatar.webp";
import { useAppDispatch } from "@/states/store";
import { postUser } from "@/states/users/usersSlice";
import Image from "next/image";
import { useRouter } from "next/router";
import { FaEye, FaEyeSlash } from "react-icons/fa";

type Props = {};

const Register = (props: Props) => {
  const [showPassword, setShowPassword] = useState(false); // Estado para controlar si se muestra la contraseña
  const handleTogglePassword = () => {
    setShowPassword(!showPassword); // Cambia el estado para alternar entre mostrar y ocultar
  };
  const backgroundImageStyle: React.CSSProperties = {
    backgroundImage:
      "url(https://6430607.fs1.hubspotusercontent-na1.net/hubfs/6430607/articulos%20indispensables%20para%20una%20ferreteria.jpg)",
  };

  const dispatch = useAppDispatch();
  const router = useRouter();

  const validationSchema = Yup.object({
    name: Yup.string()
      .matches(/^[A-Za-z\s]+$/, "Only letters are allowed")
      .required("Nombre es requerido"),
    email: Yup.string()
      .email("Ingrese un Email valido")
      .required("Email es requerido"),
    password: Yup.string()
      .min(8, "La contraseña debe tener minimo 8 caracteres")
      .required("Contraseña es requerida"),
  });
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    photo: null as File | null,
  });

  const formik = useFormik({
    initialValues: input,
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const data = await dispatch(postUser({ ...values }));
        console.log(data);
        if (data.payload.status === 201) {
          console.log(data);
          toast.success("Usuario registrado correctamente.");
          setInput({
            name: "",
            email: "",
            password: "",
            photo: null,
          });
  
          // Retrasa la redirección durante 2 segundos (ajusta el tiempo según tus necesidades)
          setTimeout(() => {
            router.push("/login");
          }, 1000);
        } else {
          toast.error("Correo ya registrado.");
        }
      } catch (error) {
        toast.error("Ocurrió un error, inténtelo nuevamente.");
        console.log(error);
      } finally {
        setSubmitting(false); // Asegura que el formulario se pueda enviar nuevamente si es necesario
      }
    },
  });
  

  const handlePhotoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    console.log("File selected:", file);
    setInput((prevData) => ({
      ...prevData,
      photo: file,
    }));
    formik.setFieldValue('photo', file);
  };

  const photoPreview = input.photo ? URL.createObjectURL(input.photo) : Foto;
  console.log("Form data:", input); // Verifica si la propiedad "photo" tiene el valor del archivo seleccionado


  return (
    <div>
      <section className="bg-gradient-to-t from-blue-300 via-cyan-600 to-cyan-800">
        <div className="flex justify-center min-h-screen">
          <div
            className="hidden bg-cover lg:block lg:w-2/5"
            style={backgroundImageStyle}
          ></div>

          <div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
            <div className="w-full">
              <h1 className="text-5xl mt-8 font-semibold text-gray-800 dark:text-white">
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
                  <label className="block mb-2 text-sm text-gray-600 dark:text-gray-100">
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    placeholder="Ejemplo"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="block w-full px-5 py-3 mt-2 text-black placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-400  dark:text-black font-semibold dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-purple-700 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                  {formik.touched.name && formik.errors.name && (
                    <div className="text-red-600">{formik.errors.name}</div>
                  )}
                </div>

                <div>
                  <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                    Correo Electronico
                  </label>
                  <input
                    name="email"
                    placeholder="Ejemplo@ejemplo.com"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="block w-full px-5 py-3 mt-2 text-black placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-400  dark:text-black font-semibold dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-purple-700 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                  {formik.touched.email && formik.errors.email && (
                    <div className="text-red-600">{formik.errors.email}</div>
                  )}
                </div>

                <div className="relative">
                  <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                    Contraseña
                  </label>
                  <input
                    type={showPassword ? "text" : "password"} //
                    placeholder="Ingrese Contraseña"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="block w-full px-5 py-3 mt-2 text-black placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-400  dark:text-black font-semibold dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-purple-700 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                  <span
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                    onClick={handleTogglePassword}
                  >
                    {" "}
                    {showPassword ? <FaEye /> : <FaEyeSlash />}{" "}
                    {/* Alterna entre los íconos */}
                  </span>
                  {formik.touched.password && formik.errors.password && (
                    <div className="text-red-600">{formik.errors.password}</div>
                  )}
                </div>

                <button
                  type="submit"
                  className="mt-8 inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 bg-yellow-500 rounded-lg hover:bg-yellow-600focus:shadow-outline focus:outline-none"
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