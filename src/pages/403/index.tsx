import LayoutAdmin from "@/components/Layout/LayoutAdmin/LayoutAdmin";
import { signIn, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";

type Props = {};

const Page403 = (props: Props) => {
  const { data: session, status } = useSession();

  return (
    <>
      <Head>
        <title>Liviapoma - Acceso denegado</title>
      </Head>
      {status === "unauthenticated" && (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-4xl text-center font-extrabold text-gray-800">
            403 - Acceso no autorizado
          </h1>
          <p className="text-gray-600 mt-2 p-2 text-justify">
            Por favor, inicia sesión como administrador
          </p>
          <button
            className="mt-4 text-green-600 hover:underline hover:cursor-pointer"
            onClick={() => signIn()}
          >
            Iniciar sesión
          </button>
        </div>
      )}
      {session && (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-4xl text-center font-extrabold text-gray-800">
            403 - Acceso no autorizado
          </h1>
          <p className="text-gray-600 mt-2 p-2 text-justify">
            Lo siento, no tienes permiso para acceder a esta página como{" "}
            {session.user.role}. Por favor, solicita ayuda de un usuario con un
            rol superior.
          </p>
          <Link href="/">
            <span className="mt-4 text-green-600 hover:underline hover:cursor-pointer">
              Volver a la página de inicio
            </span>
          </Link>
        </div>
      )}
    </>
  );
};

export default Page403;
