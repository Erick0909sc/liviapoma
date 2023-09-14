import React, { ReactNode, useState } from 'react'
import NadvarAmin from '../NadvarAdmin/NadvarAmin'
import FooterAdmin from '../FooterAdmin/FooterAdmin'
import Sidebar from '@/components/Sidebar/Sidebar';
import Head from 'next/head';

type Props = {
    children: ReactNode;
}

const LayaoutAdmin = ({ children }: Props) => {

    const [visibleSidebar, setVisibleSidebar] = useState(true);

    const toggleSidebar = () => {
        setVisibleSidebar(!visibleSidebar);
    };
    const containerClass = visibleSidebar ? 'with-sidebar' : '';

    return (
        <div className={`flex min-h-screen ${containerClass}`}>

            {/* realizar tarea de head , que sea dinamico y que reciba un title */}
            <Head>
                <title>Hola</title>
            </Head>



            {visibleSidebar && (
                <div className=" h-full">
                    <Sidebar />
                </div>
            )}
            <div className="flex-grow flex flex-col ">

                <NadvarAmin toggleSidebar={toggleSidebar} />
                <div className=" flex-grow ">{children}</div>

                <FooterAdmin />
            </div>
        </div>
    )
}

export default LayaoutAdmin