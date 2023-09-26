import React, { ReactNode, useState } from "react";
import NadvarAmin from "../NadvarAdmin/NadvarAmin";
import FooterAdmin from "../FooterAdmin/FooterAdmin";
import Sidebar from "@/components/Sidebar/Sidebar";
import Head from "next/head";
import { useSession } from "next-auth/react";

type Props = {
  children: ReactNode;
};

const LayaoutAdmin = ({ children }: Props) => {
  const { data: session } = useSession();
  const [visibleSidebar, setVisibleSidebar] = useState(true);

  const toggleSidebar = () => {
    setVisibleSidebar(!visibleSidebar);
  };
  const containerClass = visibleSidebar ? "" : "";

  if (!session) return null;
  return (
    <div className={`flex w-full h-screen ${containerClass}`}>
      <Head>
        <title>Hola</title>
      </Head>

      {visibleSidebar && <Sidebar session={session} />}
      <div className="max-h-screen flex-grow flex flex-col">
        <NadvarAmin toggleSidebar={toggleSidebar} session={session} />
        <div className="overflow-y-auto h-screen flex-grow">{children}</div>
        <FooterAdmin />
      </div>
    </div>
  );
};

export default LayaoutAdmin;
