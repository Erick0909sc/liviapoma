
// import Link from 'next/link';
// import { useState } from 'react';

// type Props = {
//     isOpen: boolean;
//     onClose: () => void;
// };

// const MenuEditUser = (props: Props) => {
//   const [selectedOption, setSelectedOption] = useState<string | null>(null);

//   const handleMenuOptionClick = (option: string) => {
//     setSelectedOption(option);
//     handleCloseModal();
//   };

//   const handleCloseModal = () => {
//     setSelectedOption(null);
//     props.onClose();
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center overflow-y-auto bg-gray-500 bg-opacity-75">
//       <div className="relative bg-white rounded-lg shadow-xl max-w-lg w-full">
//         <div className="p-4">
//           <h2 className="text-2xl font-semibold mb-4">Menu de Opciones</h2>
//           <button
//             className={`p-2 lg:text-[15px] rounded-lg font-semibold`}
//             onClick={() => handleMenuOptionClick('Datos Personales')}
//           >
//             <Link href="/editUser">
//               <h2>Datos Personales</h2>
//             </Link>
//           </button>
//           <button
//             className={`p-2 lg:text-[15px] font-semibold`}
//             onClick={() => handleMenuOptionClick('Cambio de Contraseña')}
//           >
//             <Link href="/editPassword">
//               <h2>Cambio de Contraseña</h2>
//             </Link>
//           </button>
//           <button
//             className={`p-2 lg:text-[15px] font-semibold`}
//             onClick={() => handleMenuOptionClick('Productos pendientes')}
//           >
//             <Link href="#">
//               <h2>Productos pendientes</h2>
//             </Link>
//           </button>
//           <button
//             className={`p-2 lg:text-[15px] font-semibold`}
//             onClick={() => handleMenuOptionClick('Historial de compra')}
//           >
//             <Link href="#">
//               <h2>Historial de compra</h2>
//             </Link>
//           </button>
//         </div>
//         <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse">
//           <button
//             onClick={handleCloseModal}
//             type="button"
//             className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:w-auto sm:text-sm"
//           >
//             Cerrar
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MenuEditUser;
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const MenuEditUser = (props: Props) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const router = useRouter(); // Obtener la ruta actual

  const handleMenuOptionClick = (option: string) => {
    setSelectedOption(option);
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setSelectedOption(null);
    props.onClose();
  };

  return (
    <div className="fixed z-10 inset-0 flex items-center justify-center overflow-y-auto bg-gray-500 bg-opacity-75 p-2">
      <div className="relative bg-white rounded-lg shadow-xl max-w-lg w-full">
        <div className="p-4 flex flex-col">
          <h2 className="text-2xl font-semibold mb-4">Menu de Opciones</h2>
          <button
            className={`p-2 lg:text-[15px] rounded-lg font-semibold ${
              router.pathname === '/editUser' ? 'bg-sky-900 text-white' : ''
            }`}
            onClick={() => handleMenuOptionClick('Datos Personales')}
          >
            <Link href="/editUser">
              <h2>Datos Personales</h2>
            </Link>
          </button>
          <button
            className={`p-2 lg:text-[15px] font-semibold ${
              router.pathname === '/editPassword' ? 'bg-sky-900 text-white' : ''
            }`}
            onClick={() => handleMenuOptionClick('Cambio de Contraseña')}
          >
            <Link href="/editPassword">
              <h2>Cambio de Contraseña</h2>
            </Link>
          </button>
          <button
            className={`p-2 lg:text-[15px] font-semibold ${
              router.pathname === '/SomeOtherRoute' ? 'bg-sky-900 text-white' : ''
            }`}
            onClick={() => handleMenuOptionClick('Productos pendientes')}
          >
            <Link href="#">
              <h2>Productos pendientes</h2>
            </Link>
          </button>
          <button
            className={`p-2 lg:text-[15px] font-semibold ${
              router.pathname === '/AnotherRoute' ? 'bg-sky-900 text-white' : ''
            }`}
            onClick={() => handleMenuOptionClick('Historial de compra')}
          >
            <Link href="#">
              <h2>Historial de compra</h2>
            </Link>
          </button>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse">
          <button
            onClick={handleCloseModal}
            type="button"
            className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:w-auto sm:text-sm"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuEditUser;
