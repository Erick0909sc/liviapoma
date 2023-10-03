import Link from "next/link";

type Props = {};

const Page404 = (props: Props) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-extrabold text-gray-800">
        404 - Página no encontrada
      </h1>
      <p className="text-gray-600 mt-2">
        La página que estás buscando no existe.
      </p>
      <Link href="/">
        <a className="mt-4 text-blue-600 hover:underline">
          Volver a la página de inicio
        </a>
      </Link>
    </div>
  );
};

export default Page404;
