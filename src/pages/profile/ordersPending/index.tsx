import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getOrdersPending, getordersPendint } from "@/states/users/usersSlice";
import EditUser from "@/components/Modals/EditUser";
import { useAppDispatch } from "@/states/store";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import MenuEditUser from "@/components/Modals/MenuEditUser";
import { codeStatusOrdersTranslation } from "@/shared/translate";

const Index = () => {
  const dispatch = useAppDispatch();
  const { data: session } = useSession();
  const ordersPending = useSelector(getordersPendint);
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
    <div className="h-screen flex flex-col justify-center items-center p-5">
      <div className="w-full  pl-3 ">
        <button
          className="flex absolute  top-3  lg:top-5  text-[30px] lg:text-[35px] items-center"
          onClick={handleGoBack}
        >
          <BsFillArrowLeftCircleFill />
        </button>
      </div>

      <div className="sm:flex  lg:flex gap-3 h-[90%]">
        <div>
          <EditUser />
        </div>

        <div className="bg-white shadow-lg w-full lg:w-[60vw] h-full lg:p-3 rounded-b-lg  sm:border-b-[20px]   lg:border-b-[20px]   sm:border-t-[40px]  lg:border-t-[40px] border-green-700  overflow-y-scroll ">
          <div className="bg-green-700">
            <button
              className="sm:hidden lg:text-[18px] flex items-center font-semibold text-white bg-black p-2"
              onClick={openModal}
            >
              <h2>Menu de opciones</h2>
            </button>
          </div>

          <div className="overflow-y-hidden">
            {ordersPending.map((order, i) => (
              <div key={i} className="overflow-y-auto snap-y">
                {order.products.flatMap((product, j) => (
                  <div
                    key={j}
                    className="flex flex-col gap-3  items-center p-2"
                  >
                    <div className="border-2 w-[90%]  p-2 fon">
                      <div className="font-semibold">
                        {product.product.name}
                      </div>

                      <div className="flex  flex-col lg:flex-row justify-between items-center">
                        <div className="relative lg:w-[20%]">
                          <img src={product.product.image} alt="" />
                        </div>
                        <div className="   lg:w-[50%]">
                          {product.product.description}
                        </div>
                        <div className="flex flex-col gap-7">
                          <div className=" flex justify-end h-4 p-3 items-center rounded-lg bg-orange-300">
                            {codeStatusOrdersTranslation[order.productsStatus]}
                          </div>
                          <div className=" flex justify-end h-4 p-3 items-center rounded-lg bg-yellow-300">
                            CANTIDAD: {product.quantity}
                          </div>
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

      {isModalOpen && (
        <MenuEditUser isOpen={isModalOpen} onClose={closeModal} />
      )}
    </div>
  );
};

export default Index;
