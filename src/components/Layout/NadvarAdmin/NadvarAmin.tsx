import React, { useState } from 'react'
import { ImMenu } from "react-icons/im";
import { GoBellFill } from "react-icons/go";
import { FaUserCircle } from "react-icons/fa";
import { GoTriangleDown } from "react-icons/go";
import { AiFillHome } from "react-icons/ai";
import { MdInventory } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { TbReportMoney } from "react-icons/tb";
import { FaStar } from "react-icons/fa";
import Link from 'next/link';


type Props = {}

const NadvarAmin = (props: Props) => {

    const [visibleSidebar, setVisibleSidebar] = useState(true);



    const toggleSidebar = () => {
        setVisibleSidebar(!visibleSidebar);
    }



    return (
        <div className='flex'>
            {visibleSidebar && (
                <div className={`bg-teal-700 text-white shadow h-screen transition-all duration-300 ${visibleSidebar ? 'w-1/4' : ''}`}>

                    <div className=' flex items-center justify-center h-[7.5%] font-bold border-b-4 gap-1 '>
                        <AiFillHome className='text-[20px]' />
                        <Link href={'#'} ><h2 className='text-[25px] cursor-pointer '> Ferreteria Liviapoma</h2></Link>
                    </div>

                    <div className=' flex flex-col  h-[90%] '>
                        <Link href={'/'} >
                            <div className='flex items-center justify-center gap-2  h-16 hover:bg-teal-600 cursor-pointer'>
                                <FaUsers className='text-[23px]' />
                                <h2 className='text-[18px]'>Usuarios</h2>
                            </div>
                        </Link>

                        <Link href={'/adminProducts'} >
                            <div className='flex items-center justify-center gap-2  h-16  hover:bg-teal-600 cursor-pointer'>
                                <MdInventory className='text-[23px]' />
                                <h2 className='text-[18px]' >Productos </h2>
                            </div>


                        </Link>

                        <Link href={'/'} >
                            <div className='flex items-center justify-center gap-2  h-16  hover:bg-teal-600 cursor-pointer'>
                                <FaStar className='text-[23px]' />
                                <h2 className='text-[18px]' >Favoritos </h2>
                            </div>


                        </Link>

                        <Link href={'/'}  >
                            <div className='flex items-center justify-center gap-2  h-16  hover:bg-teal-600 cursor-pointer'>
                                <TbReportMoney className='text-[23px]' />
                                <h2 className='text-[18px]'>Reporte de Ventas</h2>
                            </div>


                        </Link>

                    </div>

                </div>
            )}
            <nav className={`w-full h-14 bg-teal-600  flex text-white items-center transition-all duration-300 `}>


                <div className='text-white text-[25px] pl-2 flex items-center h-full w-[15%]'>
                    <button onClick={toggleSidebar}>
                        <ImMenu />
                    </button>
                </div>

                <div className='w-[25%] flex justify-center'>
                    <form className='bg-transparent  border-white border rounded-[10px] w-[70%]'>
                        <input type="text " className='bg-transparent rounded-[10px] p-2 focus:outline-none w-[75%] placeholder-white' placeholder='Ingrese su busqedad' />
                        <button className='pl-1 w-[25%] border-l text-center' type='button'>Buscar</button>
                    </form>
                </div>

                <div className='w-[60%] flex justify-end p-4 gap-3 '>
                    <button className='text-[25px]'><GoBellFill /></button>
                    <div className='flex items-center '>
                        <button className='flex gap-2 items-center'>
                            <FaUserCircle className='text-[28px]' />
                            <div className='flex items-center'>
                                <h2>Welcome,Admin Robert Henrry</h2>
                                <GoTriangleDown />
                            </div>
                        </button>

                    </div>
                </div>


            </nav>
        </div>
    )
}

export default NadvarAmin