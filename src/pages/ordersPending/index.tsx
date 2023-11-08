import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getOrdersPending, getordersPendint } from '@/states/users/usersSlice';
import EditUser from '@/components/Modals/EditUser';
import { useAppDispatch } from '@/states/store';
import {useSession } from "next-auth/react";
import { useRouter } from 'next/router';
import { BsFillArrowLeftCircleFill } from 'react-icons/bs';


const Index = () => {
    const dispatch = useAppDispatch();
    const { data: session } = useSession();
    const ordersPending = useSelector(getordersPendint);
    console.log(ordersPending)

    const router = useRouter();


    const handleGoBack = () => {
        router.back();
    };

    useEffect(() => {
        if (session) {
            const userId = session.user.id;
            dispatch(getOrdersPending(userId));
        }
    }, [dispatch, session]);

    return (
        <div className="h-screen flex flex-col justify-center items-center p-5">
            <div className="w-full  pl-3 ">
                <button
                    className="flex absolute  top-3  lg:top-5  text-[30px] lg:text-[35px] items-center"
                    onClick={handleGoBack}
                >
                    <BsFillArrowLeftCircleFill />
                </button>
            </div>
            <div className="bg-white shadow-lg w-full lg:w-[60vw] h-[70%] rounded-lg ">
                <div>
                    <EditUser />
                </div>
                <div className='overflow-y-auto snap-y h-[85%]'>
                    {ordersPending.map((order, i) => (
                        <div key={i} className='overflow-y-auto snap-y'>
                            {order.products.map((product, j) => (
                                <div key={j} className='flex flex-col gap-3  items-center p-2'>
                                    <div className='border-2 w-[90%]  p-2'>
                                        <div>{product.product.name}</div>

                                        <div className='flex  flex-col lg:flex-row justify-between items-center'>
                                            <div className='relative lg:w-[20%]'>
                                                <img src={product.product.image} alt="" />
                                            </div>
                                            <div className='   lg:w-[50%]'>{product.product.description}</div>
                                            <div className='flex flex-col gap-7'>
                                                <div className=' flex justify-end h-4 p-3 items-center rounded-lg bg-orange-300'>{order.productsStatus}</div>
                                                <div className=' flex justify-end h-4 p-3 items-center rounded-lg bg-yellow-300'>CANTIDAD: {product.quantity}</div>
                                            </div>

                                        </div>

                                    </div>

                                </div>
                            ))}

                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Index;
