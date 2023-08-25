
import Link from 'next/link';
import React, { useState } from 'react'
import { FaSearch } from "react-icons/fa";
import { BsFillBookmarkStarFill } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import UserModal from '@/components/Modals/users';


type Props = {}

const Nadvar = (props: Props) => {

  const [userModalOpen, setUserModalOpen] = useState(false);

  const toggleUserModal = () => {
    setUserModalOpen(!userModalOpen);
  };




  return (
    <nav >
      <div className='bg-blue-950 flex text-white h-16 w-ful'>
        <div className='title flex items-center font-serif w-[32%] justify-start pl-4 text-[25px] font-bold'>
          <Link href={'#'}><h2 className='cursor-pointer'>Ferreteria Liviapoma</h2></Link>
        </div>

        <div className='NAVEGACION  w-[30%] flex justify-center items-center gap-2'>
          <input type="text" placeholder='¿Que estas buscando hoy?' className='p-1 rounded-2xl w-[80%] text-center text-black' />
          <button><FaSearch className='text-[20px]' /></button>
        </div>

        <div className='w-[38%] flex justify-end items-center gap-7 pr-6 text-[35px]'>
          <button><BsFillBookmarkStarFill /></button>
          <button onClick={toggleUserModal}><FaUserCircle /></button>
          <UserModal isOpen={userModalOpen} onClose={toggleUserModal} />
        </div>
      </div>
      <div className='  h-10 w-full  flex justify-end absolute z-10 '>
        <div className='bg-slate-300 bg-opacity-70 w-[40%] flex    rounded-bl-[100px] text-[18px] items-center text-center font-semibold font-serif'>
          <div className='w-[22%] '>
            <Link href={'/'}><h2 className='cursor-pointer hover:text-red-500'>Inicio</h2></Link>
          </div>

          <div className='w-[22%]'>
            <Link href={'/card'}><h2 className='cursor-pointer hover:text-red-500'>Productos</h2></Link>
          </div>

          <div className='w-[22%]'>
            <Link href={'#'}><h2 className='cursor-pointer hover:text-red-500'>Carrito</h2></Link>
          </div>

          <div className='w-[22%]'>
            <Link href={'#'}><h2 className='cursor-pointer hover:text-red-500'>Contacto</h2></Link>
          </div>

        </div>
      </div>

    </nav>
  )
}

export default Nadvar
