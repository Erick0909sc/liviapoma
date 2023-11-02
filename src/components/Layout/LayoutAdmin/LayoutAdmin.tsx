import React, { ReactNode, useEffect, useState } from "react";
import NadvarAmin from "../NadvarAdmin/NadvarAmin";
import FooterAdmin from "../FooterAdmin/FooterAdmin";
import Sidebar from "@/components/Sidebar/Sidebar";
import Head from "next/head";
import { useSession } from "next-auth/react";

type Props = {
  children: ReactNode;
  title: string;
};

const LayoutAdmin = ({ children, title }: Props) => {
  const { data: session } = useSession();
  const [visibleSidebar, setVisibleSidebar] = useState(true);

  const toggleSidebar = () => {
    setVisibleSidebar(!visibleSidebar);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVisibleSidebar(false); // Ocultar en pantallas pequeñas
      } else {
        setVisibleSidebar(true);
      }
    };

    handleResize(); // Llamarlo una vez al cargar la página

    window.addEventListener("resize", handleResize); // Escuchar cambios en el tamaño de la pantalla

    return () => {
      window.removeEventListener("resize", handleResize); // Limpieza al desmontar el componente
    };
  }, []);

  const containerClass = visibleSidebar ? "" : "";

  if (!session) return null;
  return (
    <div className={`flex w-full h-screen fixed ${containerClass}`}>
      <Head>
        <title>{`Liviapoma - ${title}`}</title>
      </Head>

      {visibleSidebar && <Sidebar session={session} />}
      <div className="max-h-screen flex-grow flex flex-col">
        <NadvarAmin toggleSidebar={toggleSidebar} session={session} />
        <div className="overflow-y-auto h-screen flex-grow ">{children}</div>
        <FooterAdmin />
      </div>
    </div>
  );
};

export default LayoutAdmin;
