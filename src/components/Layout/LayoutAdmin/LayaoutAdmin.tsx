import React, { ReactNode, useState } from 'react'
import NadvarAmin from '../NadvarAdmin/NadvarAmin'
import FooterAdmin from '../FooterAdmin/FooterAdmin'
import Sidebar from '@/components/Sidebar/Sidebar';

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
            {visibleSidebar && (
                <div className="w-[250px]">
                    <Sidebar />
                </div>
            )}
            <div className="flex-grow flex flex-col">
                <div className="flex-grow">
                    <NadvarAmin toggleSidebar={toggleSidebar} />
                    <div className="p-4 flex-grow">{children}</div>
                </div>
                <FooterAdmin />
            </div>
        </div>
    )
}

export default LayaoutAdmin