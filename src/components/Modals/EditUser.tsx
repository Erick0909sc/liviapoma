import Link from 'next/link'
import React from 'react'

type Props = {}

const EditUser = (props: Props) => {
    return (
        <div className='bg-white shadow-lg p-4 flex flex-col gap-2 text-center rounded-lg h-[64vh]'>
            <div className='text-[28px]'>
                <h2 >Menu de Navegacion</h2>
            </div>
            <hr />
            <button className=' p-2 hover:bg-gray-300 text-[20px]'><Link href={'#'}><h2>Datos Personales</h2></Link></button>
            <button className='p-2 hover:bg-gray-300 text-[20px]'><Link href={'#'} ><h2>Cambio de Contraseña</h2></Link></button>
        </div>
    )
}

export default EditUser