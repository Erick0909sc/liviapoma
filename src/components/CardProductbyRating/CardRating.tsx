import { Rating } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from "react";
import { Session } from "next-auth";
import toast from "react-hot-toast";
import { addOneProductToCart } from '@/states/cart/cartApi';
import LoaderBtn from '../Cart/LoaderBtn';

type Props = {
    session: Session | null,
    name: string,
    code: string,
    image: string,
    rating: number
    description: string
}

const CardRating = ({ code, session, name, image, rating, description }: Props) => {
    const [isProcessing, setIsProcessing] = useState<boolean>(false);

    const hanldeItemCart = async () => {
        if (isProcessing) {
            return;
        }
        setIsProcessing(true);
        try {
            if (!session) {
                return toast.error("Por favor, inicie sesión para continuar.");
            }
            const response = await addOneProductToCart({
                userId: session.user.id,
                productCode: code,
            });
            if (response.status === 201) {
                toast.success("El artículo se ha añadido al carro con éxito.");
            }
        } catch (error) {
            toast.error("Ocurrió un error, por favor intente nuevamente.");
        } finally {
            setIsProcessing(false);
        }
    };

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
                    <button onClick={hanldeItemCart} type='button'><h2 className='border border-black w-32 cursor-pointer bg-red-600 text-white rounded-[10px] p-1 hover:scale-110 hover:transition-transform duration-300 flex justify-center'>{isProcessing ? <LoaderBtn /> : "Comprar"}</h2></button>
                </div>

            </div>




        </div>
    )
}

export default CardRating