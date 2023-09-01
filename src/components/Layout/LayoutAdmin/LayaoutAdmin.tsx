import React, { ReactNode } from 'react'
import NadvarAmin from '../NadvarAdmin/NadvarAmin'
import FooterAdmin from '../FooterAdmin/FooterAdmin'

type Props = {
    children: ReactNode;
}

const LayaoutAdmin = ({ children }: Props) => {
    return (
        <div className='flex flex-col min-h-screen'>
            <NadvarAmin />
            <div className='flex-grow'>
                {children}
            </div>
            <FooterAdmin />
        </div>
    )
}

export default LayaoutAdmin