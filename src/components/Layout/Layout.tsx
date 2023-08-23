import React, { ReactNode } from 'react'
import Nadvar from './Nadvar/Nadvar'
import Footer from './Footer/Footer'

type Props = {
    children: ReactNode;
}

const Layout = (props: Props) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Nadvar />
            <div className="flex-grow">
                {props.children}
            </div>
            <Footer />
        </div>
    )
}

export default Layout