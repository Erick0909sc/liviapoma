import Layout from "@/components/Layout/Layout";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { BsBagCheckFill } from "react-icons/bs";

type Props = {};

const SuccessPayment = (props: Props) => {
  const router = useRouter();

  useEffect(() => {
    const replaceUrlInHistory = () => {
      const newUrl = "/";
      window.history.replaceState({}, document.title, newUrl);
      router.push(newUrl);
    };
    return () => {
      replaceUrlInHistory();
    };
  }, []);
  return (
    <Layout title="Compra Exitosa">
      <div className="flex items-center justify-center md:p-10">
        <div className="flex flex-col items-center p-4 gap-4 sm:gap-2 dark:bg-primary-500 bg-white">
          <p className="text-5xl sm:text-8xl">
            <BsBagCheckFill />
          </p>
          <h2 className="text-center text-4xl sm:text-5xl sm:text-start font-semibold">
            ¡Gracias por tu orden!
          </h2>
          <p className="text-lg sm:text-lg">
            Revisa tu bandeja de entrada de correo electrónico para el recibo.
          </p>
          <Link href="/">
            <button
              type="button"
              className="p-2 dark:bg-primary-600 bg-slate-200"
            >
              Continuar Comprando
            </button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default SuccessPayment;
