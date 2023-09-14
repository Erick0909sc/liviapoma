import Link from 'next/link'
import React from 'react'
import { MdInventory } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { TbReportMoney } from "react-icons/tb";
import { FaStar } from "react-icons/fa";
import { AiFillDelete } from 'react-icons/ai';

type Props = {}

const Sidebar = (props: Props) => {
    return (
        <div className='h-screen flex '>

            <div className="bg-teal-700 text-white flex flex-col flex-shrink-0 w-64">
                <div className='flex items-center text-center h-[10%] font-bold border-b-4 gap-1'>
                    <Link href={'#'}><h2 className='text-[25px] cursor-pointer'>Ferreteria Liviapoma</h2></Link>
                </div>

                <div className='flex flex-col flex-grow'>
                    <Link href={'/dashboard'}>
                        <div className='flex items-center justify-center gap-2 h-16 hover:bg-teal-600 cursor-pointer'>
                            <FaUsers className='text-[23px]' />
                            <h2 className='text-[18px]'>Usuarios</h2>
                        </div>
                    </Link>

                    <Link href={'/dashboard/products'}>
                        <div className='flex items-center justify-center gap-2 h-16 hover:bg-teal-600 cursor-pointer'>
                            <MdInventory className='text-[23px]' />
                            <h2 className='text-[18px]'>Productos</h2>
                        </div>
                    </Link>

                    <Link href={'/dashboard'}>
                        <div className='flex items-center justify-center gap-2 h-16 hover:bg-teal-600 cursor-pointer'>
                            <FaStar className='text-[23px]' />
                            <h2 className='text-[18px]'>Favoritos</h2>
                        </div>
                    </Link>

                    <Link href={'/dashboard/hiddenproducts'}>
                        <div className='flex items-center justify-center gap-2 h-16 hover:bg-teal-600 cursor-pointer'>
                            <AiFillDelete className='text-[23px]' />
                            <h2 className='text-[18px]'>Productos Deshabilitados</h2>
                        </div>
                    </Link>

                    <Link href={'/'}>
                        <div className='flex items-center justify-center gap-2 h-16 hover:bg-teal-600 cursor-pointer'>
                            <TbReportMoney className='text-[23px]' />
                            <h2 className='text-[18px]'>Reporte de Ventas</h2>
                        </div>
                    </Link>
                </div>
            </div>
        </div>

    )
}

export default Sidebar