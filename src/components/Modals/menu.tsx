import Link from 'next/link';
import React from 'react'

type Props = {
    isOpen: boolean;
    onClose: () => void;
}

const MenuModal: React.FC<Props> = ({ isOpen, onClose }) => {


    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed top-16 right-15 z-50 ">
            <div className="bg-white rounded-lg p-4 text-black text-[15px]">
                <ul className="space-y-2 text-center font-semibold">
                    <li className='hover:bg-blue-950 p-2 hover:text-white rounded-[10px]'>
                        <Link href="/">
                            <a onClick={onClose}>Inicio</a>
                        </Link>
                    </li>
                    <li className='hover:bg-blue-950 p-2 hover:text-white rounded-[10px]'>
                        <Link href="/products">
                            <a onClick={onClose}>Productos</a>
                        </Link>
                    </li>
                    <li className='hover:bg-blue-950 p-2 hover:text-white rounded-[10px]'>
                        <Link href="/login">
                            <a onClick={onClose}>Carrito</a>
                        </Link>
                    </li>
                    <li className='hover:bg-blue-950 p-2 hover:text-white rounded-[10px]'>
                        <Link href="/login">
                            <a onClick={onClose}>Contacto</a>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default MenuModal