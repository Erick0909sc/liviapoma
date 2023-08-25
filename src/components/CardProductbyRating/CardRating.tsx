import { Rating } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {
    name: string,
    image: string,
    rating: number
    description: string
}

const CardRating = ({ name, image, rating, description }: Props) => {
    return (
        <div className=' flex  w-full  '>
            <div className='relative  h-[100%] w-[50%]'>
                <Image src={image} alt={image} height={500} width={500} className='w-full' />
            </div>
            <div className=' flex flex-col  w-[50%] gap-6 justify-center'>

                <div className='h-28 flex items-center justify-center text-[22px] font-bold font-serif'>
                    <h2>{name} </h2>
                </div>

                <div className='flex flex-col gap-5 items-center'>
                    <p>{description}</p>
                    {/* <h2>{rating}</h2> */}
                    <Rating name="size-large" defaultValue={2} size="large" />
                    <Link href={'#'}><h2 className='border border-black w-32 cursor-pointer bg-red-600 text-white rounded-[10px] p-1 hover:scale-110 hover:transition-transform duration-300'>Comprar</h2></Link>
                </div>

            </div>




        </div>
    )
}

export default CardRating