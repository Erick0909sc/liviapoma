import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from 'react';
import Foto from "@/assets/pictures/profile.png"
import { useAppDispatch } from '@/states/store';
import { postUser } from '@/states/users/usersSlice';
import Image from "next/image";

type Props = {};

const Register = (props: Props) => {
  const backgroundImageStyle: React.CSSProperties = {
    backgroundImage:
      "url(https://6430607.fs1.hubspotusercontent-na1.net/hubfs/6430607/articulos%20indispensables%20para%20una%20ferreteria.jpg)",
  };

  const dispatch = useAppDispatch();

  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    photo: null as File | null
  });


  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setInput((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handlePhotoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setInput((prevData) => ({
      ...prevData,
      photo: file
    }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    dispatch(postUser({ ...input }))
  };

  // Vista previa de la foto
  const photoPreview = input.photo ? URL.createObjectURL(input.photo) : Foto;
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

              <form onSubmit={handleSubmit} className="grid flex flex-wrap gap-6 mt-8">
                <div>
                  <label htmlFor="photo">Foto:</label>
                  <input type="file" id="photo" name="photo" accept="image/*" onChange={handlePhotoChange} />
                </div>
                {photoPreview && (
                  <div>
                    <h2>Vista Previa de la Foto</h2>
                    <div className="relative w-[300px] h-[300px]">
                      <Image src={photoPreview} alt="Vista Previa" style={{ maxWidth: "300px" }} layout='fill' />
                    </div>
                  </div>
                )}
                <div>
                  <label className="block mb-2 text-sm text-gray-600 dark:text-gray-100">
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    placeholder="ejemplo"
                    name="name"
                    value={input.name}
                    onChange={handleInputChange}
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
                    name="email"
                    value={input.email}
                    onChange={handleInputChange}
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
                    name="password"
                    value={input.password}
                    onChange={handleInputChange}
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
                <button type="submit" className="mt-8 inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 bg-yellow-500 rounded-lg hover:bg-yellow-600focus:shadow-outline focus:outline-none">Registrar</button>
              </form>
              <div className="text-right text-gray-100 hover:underline hover:text-gray-100">
                <a href="#">¿Olvidaste tu contraseña?</a>
              </div>
              <Link href="/login">
                <div className="text-right text-gray-100 hover:underline hover:text-gray-100">
                  <a href="#">Ya tengo cuenta</a>
                </div>
              </Link>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
