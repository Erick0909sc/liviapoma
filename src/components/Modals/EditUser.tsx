

import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';


const EditUser = () => {
  const router = useRouter();
  const [activeButton, setActiveButton] = useState('Datos Personales');

  useEffect(() => {
    const currentPath = router.pathname;
    if (currentPath === '/editUser') {
      setActiveButton('Datos Personales');
    } else if (currentPath === '/editPassword') {
      setActiveButton('Cambio de Contraseña');
    } else if (currentPath === '/ordersPending') {
      setActiveButton('Productos pendientes');
    } else {
      setActiveButton('Historial de compra');
    }
  }, [router.pathname]);

  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName);
  };

  return (
    <div className='flex gap-2 text-center flex-col bg-white w-[20vw]'>
      <div className='hidden sm:block lg:text-[18px] lg:flex items-center font-semibold text-white bg-green-700 p-2'>
        <h2>Menu de opciones</h2>
      </div>

      <div className='hidden sm:block lg:block p-2  flex-col'>
        <div className='flex flex-col'>
          <Link href='/editUser'>
            <button
              className={`p-2 lg:text-[15px] rounded-lg font-semibold ${activeButton === 'Datos Personales' ? 'bg-sky-900 text-white' : ''}`}
              onClick={() => handleButtonClick('Datos Personales')}
            >
              <h2>Datos Personales</h2>
            </button>
          </Link>


          <Link href='/editPassword'>
            <button
              className={`p-2 lg:text-[15px] font-semibold rounded-lg ${activeButton === 'Cambio de Contraseña' ? 'bg-sky-900 text-white' : ''}`}
              onClick={() => handleButtonClick('Cambio de Contraseña')}
            >
              <h2>Cambio de Contraseña</h2>
            </button>
          </Link>


          <Link href='/ordersPending'>
            <button
              className={`p-2 lg:text-[15px] font-semibold rounded-lg ${activeButton === 'Productos pendientes' ? 'bg-sky-900 text-white' : ''}`}
              onClick={() => handleButtonClick('Productos pendientes')}
            >
              <h2>Productos pendientes</h2>
            </button>
          </Link>


          <Link href='/historyOrders'>
            <button
              className={`p-2 lg:text-[15px] font-semibold rounded-lg ${activeButton === 'Historial de compra' ? 'bg-sky-900 text-white' : ''}`}
              onClick={() => handleButtonClick('Historial de compra')}
            >
              <h2>Historial de compra</h2>
            </button>
          </Link>

        </div>


      </div>
    </div>
  );
};

export default EditUser;
