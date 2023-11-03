

import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import MenuEditUser from './MenuEditUser';

const EditUser = () => {
  const router = useRouter();
  const [activeButton, setActiveButton] = useState('Datos Personales');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const currentPath = router.pathname;
    if (currentPath === '/editUser') {
      setActiveButton('Datos Personales');
    } else if (currentPath === '/editPassword') {
      setActiveButton('Cambio de Contraseña');
    }
  }, [router.pathname]);

  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName);
  };


  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className='flex gap-2 text-center bg-green-700'>
      <div className=' hidden sm:block  lg:text-[18px] lg:flex items-center font-semibold text-white bg-black p-2'>
        <h2>Menu de opciones</h2>
      </div>

      <button className='  sm:hidden  lg:text-[18px] flex items-center font-semibold text-white bg-black p-2' onClick={openModal}>
        <h2>Menu de opciones</h2>
      </button>

      <div className='hidden sm:block lg:block p-2'>
        <button
          className={`p-2 lg:text-[15px] rounded-lg font-semibold ${activeButton === 'Datos Personales' ? 'bg-sky-900 text-white' : ''
            }`}
          onClick={() => handleButtonClick('Datos Personales')}
        >
          <Link href={'/editUser'}>
            <h2>Datos Personales</h2>
          </Link>
        </button>
        <button
          className={`p-2 lg:text-[15px] font-semibold rounded-lg ${activeButton === 'Cambio de Contraseña' ? 'bg-sky-900 text-white' : ''
            }`}
          onClick={() => handleButtonClick('Cambio de Contraseña')}
        >
          <Link href={'/editPassword'}>
            <h2>Cambio de Contraseña</h2>
          </Link>
        </button>
        <button
          className={`p-2 lg:text-[15px] font-semibold rounded-lg ${activeButton === 'Productos pendientes' ? 'bg-sky-900 text-white' : ''
            }`}
          onClick={() => handleButtonClick('Productos pendientes')}
        >
          <Link href={'#'}>
            <h2>Productos pendientes</h2>
          </Link>
        </button>
        <button
          className={`p-2 lg:text-[15px] font-semibold rounded-lg ${activeButton === 'Historial de compra' ? 'bg-sky-900 text-white' : ''
            }`}
          onClick={() => handleButtonClick('Historial de compra')}
        >
          <Link href={'#'}>
            <h2>Historial de compra</h2>
          </Link>
        </button>
      </div>
      {isModalOpen && <MenuEditUser isOpen={isModalOpen} onClose={closeModal}  />}
    </div>
  );
};

export default EditUser;

