import LayaoutAdmin from "@/components/Layout/LayoutAdmin/LayaoutAdmin";
import { signIn, useSession } from "next-auth/react";

type Props = {};

const Page403 = (props: Props) => {
  const { data: session, status } = useSession();

  return (
    <LayaoutAdmin title="No autorizado">
      {status === "unauthenticated" && (
        <div className="md:p-10 max-w-screen-2xl w-full h-full">
          <div className="md:flex justify-center items-center h-full">
            <div className="flex-1 bg-white p-4 rounded-lg shadow-md">
              <h1 className="text-2xl font-bold"> Acceso no autorizado</h1>
              <hr className="my-2" />
              <p className="text-gray-600 text-base my-4">
                Por favor, inicia sesión como administrador
              </p>
              <button
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded shadow"
                onClick={() => signIn()}
              >
                Iniciar sesión
              </button>
            </div>
          </div>
        </div>
      )}
      {session && (
        <div className="md:p-10 max-w-screen-2xl w-full h-full">
          <div className="md:flex justify-center items-center h-full">
            <div className="flex-1 bg-white p-4 rounded-lg shadow-md">
              <h1 className="text-2xl font-bold"> Acceso no autorizado</h1>
              <hr className="my-2" />
              <p className="text-gray-600 text-base my-4">
                Lo siento, no tienes permiso para acceder a esta página como{" "}
                {session.user.role}. Por favor, solicita ayuda de un usuario con
                un rol superior.
              </p>
            </div>
          </div>
        </div>
      )}
    </LayaoutAdmin>
  );
};

export default Page403;
