// import React from 'react';
// import Link from 'next/link';
// import { signIn, signOut, useSession } from 'next-auth/react';

// interface AdminModalProps {
//     isOpen: boolean;
//     onClose: () => void;
// }

// const AdminModal: React.FC<AdminModalProps> = ({ isOpen, onClose }) => {
//     const { data: session } = useSession();

//     const handleLogout = async () => {
//         await signOut();
//     };

//     const renderUserName = () => {
//         if (session?.user) {
//             const names = session.user.name.split(' ');
//             if (names.length >= 2) {
//                 return `${names[0]} ${names[1]}`;
//             } else {
//                 return `${session.user.name}`;
//             }
//         } else {
//             return null;
//         }
//     };

//     const renderContent = () => {
//         if (session?.user) {
//             return (
//                 <>
//                     <ul className="space-y-3 text-center font-semibold">
//                         {/* <li className='hover:bg-blue-950 p-2 hover:text-white rounded-[10px]'>
//                             <Link href="#">
//                                 <a onClick={onClose}>Perfil de Usuario</a>
//                             </Link>
//                         </li> */}
//                          <li className='hover:bg-blue-950 p-2 hover:text-white rounded-[10px]'>
//                             <Link href="/">
//                                 <a>Notificaciones</a>
//                             </Link>
//                         </li>
//                         <li className='hover:bg-blue-950 p-2 hover:text-white rounded-[10px]'>
//                             <Link href="/">
//                                 <a onClick={handleLogout}>Cerrar Sesión</a>
//                             </Link>
//                         </li>

//                     </ul>
//                 </>
//             );
//         } else {
//             return (
//                 <ul className="space-y-2 text-center font-semibold">
//                     <li className='hover:bg-blue-950 p-2 hover:text-white rounded-[10px]'>
//                         <Link href="#">
//                             <a onClick={onClose}>Perfil de Usuario</a>
//                         </Link>
//                     </li>
//                     <li className='hover:bg-blue-950 p-2 hover:text-white rounded-[10px]'>
//                         <button onClick={() => {
//                             onClose()
//                             signIn()
//                         }}>Iniciar Sesión</button>
//                     </li>
//                 </ul >
//             );
//         }
//     };

//     if (!isOpen) {
//         return null;
//     }

//     return (
//         <div className="absolute top-16 right-0 z-50">
//             <div className="bg-white rounded-lg p-4 text-black text-[15px] text-center">
//                 {renderContent()}
//             </div>
//         </div>
//     );
// };

// export default AdminModal;

import React from "react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminModal: React.FC<AdminModalProps> = ({ isOpen, onClose }) => {
  const handleLogout = async () => {
    await signOut();
  };

  const renderContent = () => {
    return (
      <>
        <ul className="space-y-3 text-center font-semibold">
          {/* <li className='hover:bg-crema-400 p-2 hover-text-white rounded-[10px]'>
                        <Link href="#">
                            <a>Notificaciones</a>
                        </Link>
                    </li> */}

          <Link href="/">
            <li className="hover:bg-crema-400 p-2 hover-text-white border-b border-white cursor-pointer">
              <a>Mi pagina</a>
            </li>
          </Link>
          <Link href="/profile/editUser">
            <li className=" hover:bg-crema-400 p-2 hover-text-white border-b border-white cursor-pointer">
              <a onClick={onClose}> Perfil del Usuario</a>
            </li>
          </Link>
          <Link href="/dashboard">
            <li className="hover:bg-crema-400 p-2 hover-text-white  border-b border-white cursor-pointer">
              <a onClick={onClose}>dashboard</a>
            </li>
          </Link>
          <li className="hover:bg-crema-400 p-2 hover-text-white cursor-pointer ">
            <a onClick={handleLogout}>Cerrar Sesión</a>
          </li>
        </ul>
      </>
    );
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="absolute top-16 right-0 z-50 pr-1">
      <div className="bg-green-800 rounded-lg p-4 text-white text-[15px] text-center">
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminModal;
