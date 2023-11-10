import { getOrdersHistory, getordersHistory } from '@/states/users/usersSlice';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { BsFillArrowLeftCircleFill } from 'react-icons/bs'
import { useSelector } from 'react-redux';
import { useSession } from "next-auth/react";
// import { useAppDispatch } from '@/states/store';
import EditUser from '@/components/Modals/EditUser';
import { useAppDispatch } from '@/states/store';
import MenuEditUser from '@/components/Modals/MenuEditUser';

type Props = {}

const Index = (props: Props) => {

    const dispatch = useAppDispatch();
    const { data: session } = useSession();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const orderhistory = useSelector(getordersHistory)

    const router = useRouter();


    const handleGoBack = () => {
        router.back();
    };


    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        if (session) {
            const userID = session.user.id;
            dispatch(getOrdersHistory(userID));
        }
    })


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


            <div className='  sm:flex lg:flex gap-3 h-[90%]'>
                <div className=' lg:W-[40vw]'>
                    <EditUser />
                </div>

                <div className="bg-white shadow-lg w-full    lg:w-[60vw] h-full lg:p-3 rounded-b-lg sm:border-b-[20px]    lg:border-b-[20px] sm:border-t-[40px] lg:border-t-[40px] border-green-700  overflow-y-scroll">

                    <div className='bg-green-700'>
                        <button className='sm:hidden lg:text-[18px] flex items-center font-semibold text-white bg-black p-2' onClick={openModal}>
                            <h2>Menu de opciones</h2>
                        </button>
                    </div>


                    <div className='overflow-y-hidden'>
                        {orderhistory.map((order, i) => (
                            <div key={i} >
                                {order.products.map((product, j) => (
                                    <div key={j} className='flex flex-col gap-3 items-center p-2'>
                                        <div className='border-2 w-[90%] p-2 gap-3'>
                                            <div className='font-semibold' >{product.product.name}</div>
                                            <div className='flex flex-col gap-4 lg:flex-row lg:justify-between items-center'>
                                                <div className='relative lg:w-[20%]'>
                                                    <img src={product.product.image} alt="" />
                                                </div>
                                                <div className='lg:w-[50%]'>{product.product.description}</div>
                                                <div className='flex justify-end h-4 p-3 items-center rounded-lg bg-green-300'>{order.productsStatus}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>


                </div>

            </div>

            {isModalOpen && <MenuEditUser isOpen={isModalOpen} onClose={closeModal} />}

        </div>
    )
}

export default Index