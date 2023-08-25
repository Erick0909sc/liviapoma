import Link from "next/link";
import React from "react";

type Props = {};

const Register = (props: Props) => {
  const backgroundImageStyle: React.CSSProperties = {
    backgroundImage:
      "url(https://6430607.fs1.hubspotusercontent-na1.net/hubfs/6430607/articulos%20indispensables%20para%20una%20ferreteria.jpg)",
  };

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

              <form className="grid  flex flex-wrap gap-6 mt-8">
                <div>
                  <label className="block mb-2 text-sm text-gray-600 dark:text-gray-100">
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    placeholder="ejemplo"
                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>

                {/* <div>
                  <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                    Numero
                  </label>
                  <input
                    type="text"
                    placeholder="XXX-XX-XXXX-XXX"
                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div> */}

                <div>
                  <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                    Correo Electronico
                  </label>
                  <input
                    type="email"
                    placeholder="ejemplo@ejemplo.com"
                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    placeholder="Ingrese Contraseña"
                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                    Confirmar Contraseña
                  </label>
                  <input
                    type="password"
                    placeholder="Confirmar Contraseña"
                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>
              </form>
              <div className="text-right text-gray-100 hover:underline hover:text-gray-100">
                <a href="#">¿Olvidaste tu contraseña?</a>
              </div>
              <Link href="/login">
                <div className="text-right text-gray-100 hover:underline hover:text-gray-100">
                  <a href="#">Ya tengo cuenta</a>
                </div>
              </Link>
              <button className="flex flex-col justify-center">
                <a
                  href="#_"
                  className="mt-8 inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 bg-yellow-500 rounded-lg hover:bg-yellow-600focus:shadow-outline focus:outline-none"
                >
                  Registrar
                </a>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
