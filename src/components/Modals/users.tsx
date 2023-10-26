
import React from 'react';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';

interface UserModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const UserModal: React.FC<UserModalProps> = ({ isOpen, onClose }) => {
    const { data: session } = useSession();
    // console.log(session);

    const handleLogout = async () => {
        await signOut();
    };

    const renderUserName = () => {
        if (session?.user) {
            const names = session.user.name.split(' ');
            if (names.length >= 2) {
                return `${names[0]} ${names[1]}`;
            } else {
                return `${session.user.name}`;
            }
        } else {
            return null;
        }
    };

    const renderContent = () => {
        if (session?.user) {
            const isAdmin = session.user.role === 'Admin';
            return (
                <>
                    <ul className="space-y-3 text-center font-semibold">
                        <li className='border-b-2 border-black'>
                            <h2 className="text-lg font-bold  pt-1">{renderUserName()}</h2>
                        </li>
                        <Link href="/EditUser" >
                            <li className='  hover:bg-green-800 p-2 hover:text-white  cursor-pointer '>
                                <a onClick={onClose}> Perfil del Usuario</a>
                            </li>
                        </Link>

                        <Link href="/cart" >
                            <li className='  hover:bg-green-800 p-2 hover:text-white  cursor-pointer '>
                                <a onClick={onClose}> Carrito de Compras</a>
                            </li>
                        </Link>

                        <Link href="/Contactanos" >
                            <li className='  hover:bg-green-800 p-2 hover:text-white  cursor-pointer '>
                                <a onClick={onClose}> Contactanos</a>
                            </li>
                        </Link>


                        {isAdmin && ( // Verifica si el usuario es administrador
                            <Link href="/dashboard">
                                <li className='hover:bg-green-800 p-2 hover:text-white  cursor-pointer'>
                                    <a onClick={onClose}>dashboard</a>
                                </li>
                            </Link>
                        )}

                        <Link href="/">
                            <li className='hover:bg-green-800 p-2 hover:text-white  cursor-pointer'>
                                <a onClick={handleLogout}>Cerrar Sesión</a>
                            </li>
                        </Link>
                    </ul>
                </>
            );
        } else {
            return (
                <ul className="space-y-2 text-center font-semibold">
                    <li className=' p-2 rounded-[10px] text-gray-500'>

                        <a onClick={onClose}>SIN USUARIO</a>

                    </li>
                    <li className=' p-2 hover:bg-blue-950 hover:text-white rounded-[10px]'>
                        <button onClick={() => {
                            onClose()
                            signIn()
                        }}>Iniciar Sesión</button>
                    </li>
                </ul >
            );
        }
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className="absolute  top-16 right-0 z-50">
            <div className="bg-white rounded-lg  p-2 text-black  text-[15px] text-center animate-fade-down">
                {renderContent()}
            </div>
        </div>
    );
};

export default UserModal;
