
import Link from 'next/link';
import React, { useState } from 'react'
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import UserModal from '@/components/Modals/users';
import { signOut, useSession } from 'next-auth/react';
import { ImMenu } from 'react-icons/im';
import MenuModal from '@/components/Modals/menu';
import { AiFillHome } from "react-icons/ai";
import { MdContactPhone, MdInventory } from 'react-icons/md';


type Props = {

}

const Nadvar = (props: Props) => {

  const [userModalOpen, setUserModalOpen] = useState(false);
  const [menuModalOpen, setMenuModalOpen] = useState(false);

  const { data: session } = useSession();

  const toggleMenuModal = () => {
    setMenuModalOpen(!menuModalOpen);
  };

  const toggleUserModal = () => {
    setUserModalOpen(!userModalOpen);
  };




  return (
    <nav >
      <div className='bg-blue-950 flex text-white h-16 w-ful'>
        <div className='title flex items-center font-serif w-[32%] md:w-[33%] lg:w-[32%] text-[15px] pl-1 justify-start md:pl-4 lg:pl-4  md:text-[20px] font-bold'>
          <Link href={'#'}><h2 className='cursor-pointer'>Ferreteria Liviapoma</h2></Link>
        </div>

        <div className='NAVEGACION  w-[53%]   md:w-[30%]  lg:w-[30%] flex justify-center items-center gap-2'>
          <input type="text" placeholder='¿Que Buscas?' className='p-1 rounded-2xl w-[80%] text-center text-black' />
          <button><FaSearch className='text-[20px]' /></button>
        </div>

        <div className=' flex md:hidden lg:hidden w-[38%]  justify-end items-center gap-7 pr-6 text-[25px] lg:text-[35px]'>

          <button onClick={toggleMenuModal}><ImMenu /></button>
          <MenuModal isOpen={menuModalOpen} onClose={toggleMenuModal} />

          {session?.user?.image ? (
            <button onClick={toggleUserModal}><img src={session.user.image} alt="User" className="w-[35px] h-[35px] rounded-full" /></button>
          ) : <button onClick={toggleUserModal}><FaUserCircle /></button>}
          <UserModal isOpen={userModalOpen} onClose={toggleUserModal} />
        </div>

        <div className='hidden sm:flex w-[40%] justify-end items-center md:gap-3 md:pr-1  lg:gap-7 lg:pr-6 text-[25px] md:text-[13px] lg:text-[18px]'>
          <Link href={'/'}>
            <div className='flex gap-2 items-center cursor-pointer hover:text-red-500'>
              <AiFillHome />
              <h2 >Inicio</h2>
            </div>
          </Link>

          <Link href={'/products'}>
            <div className='flex gap-2 items-center cursor-pointer hover:text-red-500'>
              <MdInventory />
              <h2>Productos</h2>
            </div>
          </Link>

          <Link href={'#'}>
            <div className='flex gap-2 items-center cursor-pointer hover:text-red-500'>
              <FaShoppingCart />
              <h2>Carrito</h2>
            </div>
          </Link>

          <Link href={'#'}>
            <div className='flex gap-2 items-center cursor-pointer hover:text-red-500'>
              <MdContactPhone />
              <h2>Contacto</h2>
            </div>
          </Link>

        </div>


      </div>

      {/* <div className='  h-10 w-full  flex justify-end absolute z-10 '>
        <div className='bg-slate-300 bg-opacity-70 w-[40%] flex    rounded-bl-[100px] text-[18px] items-center text-center font-semibold font-serif'>
          <div className='w-[22%] '>
            <Link href={'/'}><h2 className='cursor-pointer hover:text-red-500'>Inicio</h2></Link>
          </div>

          <div className='w-[22%]'>
            <Link href={'/products'}><h2 className='cursor-pointer hover:text-red-500'>Productos</h2></Link>
          </div>

          <div className='w-[22%]'>
            <Link href={'#'}><h2 className='cursor-pointer hover:text-red-500'>Carrito</h2></Link>
          </div>

          <div className='w-[22%]'>
            <Link href={'#'}><h2 className='cursor-pointer hover:text-red-500'>Contacto</h2></Link>
          </div>

        </div>
      </div> */}

    </nav>
  )
}

export default Nadvar
