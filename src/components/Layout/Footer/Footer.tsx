import Link from 'next/link'
import React from 'react'
import { BsTelephoneForwardFill } from "react-icons/bs";
import { CgMail } from "react-icons/cg";
import { BiSolidTimeFive } from "react-icons/bi";
import { FaMapMarkerAlt } from "react-icons/fa";


type Props = {}

const Footer = (props: Props) => {
  return (
    <div className=' flex flex-col  bg-green-700  w-full   justify-center items-center pt-4'>

      <div className='text-white flex gap-6  lg:w-[90%]  border-b border-slate-400   justify-center h-[20%] items-center pb-4'>

        <div className='flex flex-col w-[35%] text-center  text-[12px] md:text-[18px] lg:text-[18px]'>
          <div className='hover:text-crema-400 font-semibold w-[100%] flex items-center justify-center gap-1'>
            <span className='ml-2 '>
              <BsTelephoneForwardFill />
            </span>
            <span>
              <Link href={'#'}>+51 999 999 999</Link>
            </span>
          </div>
          <p>consultas y mas</p>
        </div>

        <div className='flex flex-col w-[35%] text-center text-[12px] md:text-[18px] lg:text-[18px]'>
          <div className='hover:text-crema-400 font-semibold w-[100%] flex items-center justify-center gap-1'>
            <span className='ml-2 '><CgMail /></span>
            <span> <Link href={'#'}>ferreteria@gmail.com</Link></span>



          </div>
          <p>correo electronico </p>
        </div>

        <div className='flex flex-col w-[30%] text-center text-[12px] md:text-[18px] lg:text-[18px]' >
          <div className='w-[100%] flex items-center justify-center gap-1'>
            <span className='ml-2 '>
              <BiSolidTimeFive />
            </span>
            <span>
              <h2>
                7:00 am - 8:00 pm
              </h2>
            </span>
          </div>
          {/* <p>
            horario de atencion
          </p> */}
        </div>

      </div>
      {/* <div className=' w-full text-white flex justify-center md:p-4 lg:p-4'>
        <div className='flex flex-col items-center w-[39%] text-center'>
          <h2 className='text-[18px] md:text-[23px] lg:text-[23px] font-bold'>Ferreteria Liviapoma</h2>
          <p>
            Bienvenido a Ferretería Liviapoma! Somos tu socio confiable en herramientas y suministros para cada tarea. Desde el inicio hasta el acabado, estamos aquí para hacer que tus proyectos brillen con calidad y atención personalizada. Descubre soluciones que marcan la diferencia en cada visita.
          </p>
        </div>

        <div className='w-[50%] flex   items-center gap-3 text-center'>
          <h2 className='font-bold  text-[18px] md:text-[23px] lg:text-[23px] '>Encuentranos Rapido</h2>
          <div className='flex flex-col'>
            <Link href={'#'}><h2 className='hover:text-red-500 cursor-pointer font-semibold'>Contacto</h2></Link>

            <div className='hover:text-red-600 font-semibold w-[100%] flex items-center justify-center gap-1'>
              <span className='ml-2 '>
                <FaMapMarkerAlt />
              </span>
              <span>
                <Link href={'#'}><h2 >Ubicanos</h2></Link>
              </span>
            </div>
          </div>

        </div>


        <div className='w-[50%] flex flex-col  items-center justify-center gap-3'>
          <Link href={'#'}><h2 className='hover:text-red-500 cursor-pointer font-semibold'>Novedades</h2></Link>
        </div>
      </div> */}


    </div>
  )
}

export default Footer