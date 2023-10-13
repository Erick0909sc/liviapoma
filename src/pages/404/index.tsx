import Head from "next/head";
import Link from "next/link";

type Props = {};

const Page404 = (props: Props) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Head>
        <title>Liviapoma - Página no encontrada</title>
      </Head>
      <h1 className="text-4xl font-extrabold text-gray-800">
        404 - Página no encontrada
      </h1>
      <p className="text-gray-600 mt-2">
        La página que estás buscando no existe.
      </p>
      <Link href="/">
        <span className="mt-4 text-green-600 hover:underline">
          Volver a la página de inicio
        </span>
      </Link>
    </div>
  );
};

export default Page404;
