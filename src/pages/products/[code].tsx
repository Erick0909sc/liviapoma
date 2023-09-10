import Layout from "@/components/Layout/Layout";
import { EStateGeneric } from "@/shared/types";
import { hanldeItemCart } from "@/shared/ultis";
import {
  cleanUpProduct,
  getOneProduct,
  selectOneProduct,
  selectOneProductStatus,
} from "@/states/products/productsSlice";
import { useAppDispatch } from "@/states/store";
import { Rating } from "@mui/material";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

type Props = {};

const Detail = (props: Props) => {
  const router = useRouter();
  const { data: session } = useSession()
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const status = useSelector(selectOneProductStatus);
  const product = useSelector(selectOneProduct);
  const dispatch = useAppDispatch();
  useEffect(() => {
    (async () => {
      if (router.isReady) {
        const { code } = router.query;
        if (status === EStateGeneric.IDLE) {
          dispatch(getOneProduct(code as string));
        }
      }
    })();
    return () => {
      dispatch(cleanUpProduct());
    };
  }, [router.query.code, session]);

  return (
    <Layout>
      <div>
        {status === EStateGeneric.SUCCEEDED && (
          // <section className="text-gray-700 body-font overflow-hidden bg-white">
          //   <div className="container px-5 py-24 mx-auto">
          //     {product && (
          //       <div className="lg:w-4/5 mx-auto flex flex-wrap">
          //         {/* Imagen */}
          //         <div className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200">
          //           <Image
          //             alt={product.name}
          //             width={500}
          //             height={500}
          //             src={product.image}
          //           />
          //         </div>

          //         {/* Texto */}
          //         <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0 flex flex-col">
          //           <div className="flex-grow">
          //             <h2 className="text-sm title-font text-gray-500 tracking-widest">
          //               {product.name}
          //             </h2>
          //             <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
          //               {product.name}
          //             </h1>
          //             <div className="flex mb-4">
          //               {/* Resto del contenido de texto */}
          //               <span className="flex items-center">
          //                 <Rating
          //                   name="size-large"
          //                   defaultValue={2}
          //                   size="large"
          //                 />
          //                 <span className="text-gray-600 ml-3">4 Reviews</span>
          //               </span>
          //               <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
          //                 {product.marca}
          //               </span>
          //             </div>
          //             <p className="leading-relaxed">{product.description}</p>
          //           </div>

          //           <div className="mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
          //             {/* Contenido relacionado con la cantidad y botones */}
          //             <div className="flex ml-6 items-center">
          //               <span className="mr-3">Cantidad</span>
          //               <div className="relative">
          //                 <select className="rounded border appearance-none border-gray-400 py-2 focus:outline-none focus:border-red-500 text-base pl-3 pr-10">
          //                   <option>1</option>
          //                   <option>2</option>
          //                   <option>3</option>
          //                   <option>4</option>
          //                   <option>5</option>
          //                 </select>
          //                 <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
          //                   <svg
          //                     fill="none"
          //                     stroke="currentColor"
          //                     strokeLinecap="round"
          //                     strokeLinejoin="round"
          //                     strokeWidth="2"
          //                     className="w-4 h-4"
          //                     viewBox="0 0 24 24"
          //                   >
          //                     <path d="M6 9l6 6 6-6"></path>
          //                   </svg>
          //                 </span>
          //               </div>
          //             </div>

          //             <div className="flex">
          //               <button className="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded">
          //                 Añadir al carrito
          //               </button>
          //               <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
          //                 <svg
          //                   fill="currentColor"
          //                   strokeLinecap="round"
          //                   strokeLinejoin="round"
          //                   strokeWidth="2"
          //                   className="w-5 h-5"
          //                   viewBox="0 0 24 24"
          //                 >
          //                   <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
          //                 </svg>
          //               </button>
          //             </div>
          //           </div>
          //         </div>
          //       </div>
          //     )}
          //   </div>
          // </section>

          <section className="py-20 overflow-hidden bg-white font-poppins ">
            {product && (
              <div className="max-w-6xl px-4 py-4 mx-auto lg:py-8 md:px-6">
                <div className="flex flex-wrap -mx-4">
                  <div className="w-full px-4 md:w-1/2 flex justify-center">
                    <div className="sticky top-0 z-50 overflow-hidden ">
                      <div className="relative mb-6 lg:mb-10">
                        <Image
                          alt={product.name}
                          width={500}
                          height={500}
                          src={product.image}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="w-full px-4 md:w-1/2 flex justify-center">
                    <div className="lg:pl-20">
                      <div className="pb-6 mb-8 border-b border-gray-200">
                        <span className="text-lg font-mediumtext-gray-500 text-gray-500">
                          {product.marca}
                        </span>
                        <h2 className="max-w-xl mt-2 mb-6 text-xl font-bold text-gray-900 md:text-4xl">
                          {product.name}
                        </h2>
                        <div className="flex flex-wrap items-center mb-6">
                          <ul className="flex mb-4 mr-2 lg:mb-0">
                            <Rating
                              name="size-large"
                              defaultValue={2}
                              size="large"
                            />
                          </ul>
                          <a className="mb-4 text-xs underline lg:mb-0">
                            Productos de calidad
                          </a>
                        </div>
                        <p className="max-w-md mb-8 text-xl text-gray-700">
                          {product.description}
                        </p>
                        <p className="inline-block text-2xl font-semibold text-gray-700">
                          <span>S./{product.price}</span>
                          {/* <span className="text-base font-normal dark:text-gray-400">
                            $esto lo dejo por si hay descuento
                          </span> */}
                        </p>
                      </div>
                      <div className="flex flex-wrap items-center ">
                        <div className="mb-4 mr-4 lg:mb-0">
                          <div className="w-28">
                            <div className="relative flex flex-row w-full h-10 bg-transparent rounded-lg">
                              <button className="w-20 h-full text-gray-600 bg-gray-100 border-r rounded-l outline-none cursor-pointer dark:border-gray-700 hover:text-gray-700 hover:bg-gray-300">
                                <span className="m-auto text-2xl font-thin">
                                  -
                                </span>
                              </button>
                              <input
                                type="number"
                                className="flex items-center w-full font-semibold text-center text-gray-700 placeholder-gray-700 bg-gray-100 outline-none focus:outline-none text-md hover:text-black"
                                placeholder="1"
                              />
                              <button className="w-20 h-full text-gray-600 bg-gray-100 border-l rounded-r outline-none cursor-pointer hover:text-gray-700 hover:bg-gray-300">
                                <span className="m-auto text-2xl font-thin">
                                  +
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="mb-4 mr-4 lg:mb-0">
                          <button onClick={() => hanldeItemCart({
                            code: product.code,
                            session,
                            isProcessing,
                            setIsProcessing,
                          })} type="button" className="w-full h-10 p-2 mr-4 bg-blue-500 text-gray-50 hover:bg-blue-600">
                            Buy Now
                          </button>
                        </div>
                        <div className="mb-4 mr-4 lg:mb-0">
                          <button className="flex items-center justify-center w-full h-10 p-2 text-gray-400 border border-gray-300 lg:w-11 hover:text-gray-700">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-cart"
                              viewBox="0 0 16 16"
                            >
                              <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                            </svg>
                          </button>
                        </div>
                        <div className="mb-4 lg:mb-0">
                          <button className="flex items-center justify-center w-full h-10 p-2 text-gray-400 border border-gray-300 lg:w-11 hover:text-gray-700">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className=" bi bi-heart"
                              viewBox="0 0 16 16"
                            >
                              <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>
        )}
      </div>
    </Layout>
  );
};

export default Detail;
