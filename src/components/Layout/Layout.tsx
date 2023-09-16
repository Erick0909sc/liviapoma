import React, { ReactNode } from "react";
import Nadvar from "./Nadvar/Nadvar";
import Footer from "./Footer/Footer";
import Head from "next/head";

type Props = {
  children: ReactNode;
  title: string;
};

const Layout = (props: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>{`Liviapoma - ${props.title}`}</title>
      </Head>
      <Nadvar />
      <div className="flex-grow">{props.children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
