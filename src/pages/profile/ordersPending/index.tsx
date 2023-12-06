import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { StatusOrders, getOrdersPending, getordersPendint } from "@/states/users/usersSlice";
import EditUser from "@/components/Modals/EditUser";
import { useAppDispatch } from "@/states/store";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import MenuEditUser from "@/components/Modals/MenuEditUser";
import { codeStatusOrdersTranslation } from "@/shared/translate";
import Failed from "@/components/StatesComponents/Failed";
import { EStateGeneric } from "@/shared/types";
import Pending from "@/components/StatesComponents/Pending";
import { CalcularTotalSoles, formatPrice } from "@/shared/ultis";
import { IoLogoWhatsapp } from "react-icons/io";



const Index = () => {
  const dispatch = useAppDispatch();
  const { data: session } = useSession();
  const ordersPending = useSelector(getordersPendint);
  console.log(ordersPending)
  const orderstatus = useSelector(StatusOrders)
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className=" h-screen sm:h-screen  lg:h-screen flex flex-col justify-center items-center p-4 ">
      <div className="w-full  pl-3 ">
        <button
          className="flex absolute  top-3  lg:top-5  text-[30px] lg:text-[35px] items-center"
          onClick={handleGoBack}
        >
          <BsFillArrowLeftCircleFill />
        </button>
      </div>

      <div className="sm:flex  lg:flex gap-3 h-[80vh] sm:h-[80%]  lg:h-[90%] ">
        <div>
          <EditUser />
        </div>

        <div className="bg-white shadow-lg w-full lg:w-[60vw]  h-full lg:p-3 rounded-b-lg  sm:border-b-[20px]   lg:border-b-[20px]   sm:border-t-[40px]  lg:border-t-[40px] border-green-700  overflow-y-scroll ">
          <div className="bg-green-700">
            <button
              className="sm:hidden lg:text-[18px] flex items-center font-semibold text-white bg-black p-2"
              onClick={openModal}
            >
              <h2>Menu de opciones</h2>
            </button>
          </div>

          <div className="overflow-y-hidden flex flex-col gap-4">
            {orderstatus === EStateGeneric.PENDING && <Pending />}

            {orderstatus === EStateGeneric.FAILED && (
              <div className="flex  h-[500px] justify-center">
                <Failed text="No tienes productos pendientes" />
              </div>
            )}
            {orderstatus === EStateGeneric.SUCCEEDED &&
              ordersPending.flatMap((order, i) => (
                <div key={i} className="overflow-y-auto h-full">
                  <div className="border-2 border-gray-600 ">
                    {i === 0 || order.createdAt !== ordersPending[i - 1].createdAt ? (
                      <div className="justify-center flex items-center mb-1 text-lg font-semibold border-t-2 border-gray-500 h-10 bg-slate-300">
                        Fecha de pedido:  {new Date(order.createdAt).toLocaleDateString('es-ES', { year: 'numeric', month: 'numeric', day: 'numeric' })}
                      </div>
                    ) : null}
                    <div className=" grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 p-4 ">

                      {order.products.flatMap((product, j) => (
                        <div key={j} className="flex flex-col gap-3  items-center p-2 sm:p-4 ">
                          <div className=" border-2 border-slate-600 shadow-md rounded-md sm:h-72  lg:h-[300px] justify-between flex flex-col items-center  p-3 fon">
                            <div className="font-semibold h-[15%]  flex justify-center items-center">
                              {product.product.name}
                            </div>
                            <div className="flex flex-col  items-center">
                              <div className="relative w-[60%]  lg:w-[60%]">
                                <img src={product.product.image} alt="" />
                              </div>
                              <div className=" flex  h-4 p-3 items-center rounded-lg font-semibold">
                                CANTIDAD: {product.quantity}
                              </div>
                              <div className="flex  h-4 p-3 items-center rounded-lg font-semibold">
                                Precio:{formatPrice(product.product.price)}
                              </div>
                              <div className="flex flex-col gap-7">

                              </div>
                            </div>
                          </div>

                        </div>
                      ))}
                    </div>
                    <div className="flex flex-col sm:flex-row lg:flex-row  gap-8 justify-center p-2 items-center bg-slate-300 text-lg font-bold">
                      <div className=" flex  h-4 p-3 items-center justify-center rounded-lg bg-orange-500 text-white">
                        {codeStatusOrdersTranslation[order.productsStatus]}
                      </div>
                      <div>
                        Total a Pagar: {formatPrice(CalcularTotalSoles(order.orderTotalAmount))}
                      </div>
                      <div className="flex items-center gap-3">
                        consulta disponible de delivery:
                        <a href="https://wa.me/51935595949?text=Hola%20que%20tal,%20solicito%20informacion%20del%20delivery" target="_blank" rel="noopener noreferrer" className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded-full flex items-center">
                          <IoLogoWhatsapp />
                          whatsapp
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>

      {isModalOpen && (
        <MenuEditUser isOpen={isModalOpen} onClose={closeModal} />
      )}
    </div>
  );
};

export default Index;
