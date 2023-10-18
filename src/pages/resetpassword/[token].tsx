import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

type Props = {
  token: string;
};

const Token = ({ token }: Props) => {
  const router = useRouter();
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
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Head>
        <title>Liviapoma - Restablecimiento de contraseña</title>
      </Head>
      <h1 className="text-4xl font-extrabold text-gray-800">
        Restablecimiento de contraseña
      </h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label className="capitalize block text-gray-600">Contraseña:</label>
          <input
            className={`block w-full px-5 py-3 text-black bg-white border rounded-lg font-semibold focus:border-green-500 focus:ring-green-600 focus:outline-none focus:ring focus:ring-opacity-80 ${
              formik.touched.password && formik.errors.password
                ? "border-red-500 placeholder:text-red-500"
                : "border-gray-700"
            }`}
            type="password"
            {...formik.getFieldProps("password")}
            onBlur={(e) => {
              formik.handleBlur(e);
              if (formik.touched.password && formik.errors.password)
                return toast.error(formik.errors.password as string);
            }}
            required
          />
        </div>
        <div className="mb-4">
          <label className="capitalize block text-gray-600">
            Confirmar contraseña:
          </label>
          <input
            className={`block w-full px-5 py-3 text-black bg-white border rounded-lg font-semibold focus:border-green-500 focus:ring-green-600 focus:outline-none focus:ring focus:ring-opacity-80 ${
              formik.touched.confirmPassword && formik.errors.confirmPassword
                ? "border-red-500 placeholder:text-red-500"
                : "border-gray-700"
            }`}
            type="password"
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
        </div>
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
