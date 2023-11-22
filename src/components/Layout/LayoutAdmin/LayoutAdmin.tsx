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
  const [visibleSidebar, setVisibleSidebar] = useState<boolean>(() => {
    try {
      const storedValue = localStorage.getItem("visibleSidebar");
      return storedValue ? JSON.parse(storedValue) : true;
    } catch (error) {
      return true;
    }
  });
  const toggleSidebar = () => {
    const newValue = !visibleSidebar;
    setVisibleSidebar(newValue);
    localStorage.setItem("visibleSidebar", JSON.stringify(newValue));
  };

  useEffect(() => {
    const handleResize = () => {
      const storedValue = localStorage.getItem("visibleSidebar");
      if (window.innerWidth < 768 && !storedValue) {
        setVisibleSidebar(false);
        localStorage.setItem("visibleSidebar", JSON.stringify(false));
      }
    };
    handleResize();
  }, []);

  if (!session) return null;
  return (
    <div className={`flex w-full h-screen fixed`}>
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
