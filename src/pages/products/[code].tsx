import Layout from "@/components/Layout/Layout";
import DeleteConfirmation from "@/components/Modals/DeleteConfirmation";
import { EStateGeneric } from "@/shared/types";
import {
  calcularPrecioConDescuento,
  formatPrice,
  handleDelete,
  handleInputChange,
  handleItemsCart,
  hanldeItemCart,
} from "@/shared/ultis";
import {
  getCartUser,
  selectAllCart,
  selectAllCartStatus,
} from "@/states/cart/cartSlice";
import {
  cleanUpProduct,
  getOneProduct,
  selectOneProduct,
  selectOneProductStatus,
} from "@/states/products/productsSlice";
import { useAppDispatch } from "@/states/store";
import { Rating } from "@mui/material";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

type Props = {};

const Detail = (props: Props) => {
  const router = useRouter();
  const { data: session } = useSession();
  const status = useSelector(selectOneProductStatus);
  const product = useSelector(selectOneProduct);
  const cartStatus = useSelector(selectAllCartStatus);
  const cart = useSelector(selectAllCart);
  const productFind = cart.products?.find(
    (item) => item.productCode === product.code
  );
  const [currentCode, setCurrentCode] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [checkout, setCheckout] = useState(false);
  const [input, setInput] = useState<number | null>(null);

  const propsForFunctions = {
    code: product.code,
    session: session as Session,
    isProcessing,
    setIsProcessing,
    value: productFind?.quantity,
    getCart: () => dispatch(getCartUser(session?.user.id as string)),
  };
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      if (router.isReady) {
        const { code } = router.query;
        if (currentCode !== code) {
          setCurrentCode(code as string);
          await dispatch(getOneProduct(code as string));
        }
        if (cartStatus === EStateGeneric.IDLE && session) {
          dispatch(getCartUser(session.user.id));
        }
      }
    })();
    if (currentCode !== router.query.code) {
      dispatch(cleanUpProduct());
    }
  }, [router.query.code, session]);

  useEffect(() => {
    if (productFind) {
      setInput(productFind.quantity);
    }
    if (!productFind) {
      setInput(null);
    }
  }, [productFind]);

  const handleBtns = async () => {
    if (!session) {
      return toast.error("Por favor, inicie sesión para continuar.");
    }
  };
  const handleFirstItem = async () => {
    await hanldeItemCart({
      code: product.code,
      session,
      isProcessing,
      setIsProcessing,
    });
    if (session) dispatch(getCartUser(session.user.id));
  };
  return (
    <Layout title={product.name || "Product not found"}>
      <div>
        {status === EStateGeneric.SUCCEEDED && (
          <section className="py-20 overflow-hidden bg-white font-poppins ">
            {product && (
              <div className="max-w-6xl px-4 py-4 mx-auto lg:py-8 md:px-6">
                <div className="flex flex-wrap -mx-4">
                  <div className="w-full px-4 md:w-1/2 flex justify-center">
                    <div className="sticky top-0 z-10 overflow-hidden ">
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
                          {product.brand?.name}
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
                          {/* <span>S./{product.price}</span> */}
                          {product.discount > 0 ? (
                            <>
                              <span className="line-through text-gray-500 text-base">
                                antes: {formatPrice(product.price)}
                              </span>
                              &nbsp;
                              <span className="text-xl text-black">
                                ahora:
                                {formatPrice(
                                  calcularPrecioConDescuento(product)
                                )}
                              </span>
                              <p className="text-sm font-black text-red-500 mt-2 ">
                                {product.discount > 0
                                  ? `Ahorrate! : ${formatPrice(
                                      product.price -
                                        calcularPrecioConDescuento(product)
                                    )}`
                                  : null}
                              </p>
                            </>
                          ) : (
                            `${formatPrice(product.price)}`
                          )}
                        </p>
                      </div>
                      <div className="flex flex-wrap items-center ">
                        <div className="mb-4 mr-4 lg:mb-0">
                          <div className="w-28">
                            <div className="relative flex flex-row w-full h-10 bg-transparent rounded-lg">
                              {session ? (
                                <>
                                  <button
                                    type="button"
                                    onClick={
                                      productFind && productFind.quantity > 1
                                        ? () =>
                                            handleItemsCart({
                                              ...propsForFunctions,
                                              value: productFind.quantity - 1,
                                            })
                                        : () => setDeleteConfirmation(true)
                                    }
                                    disabled={isProcessing || !productFind}
                                    className="w-20 h-full text-gray-600 bg-gray-100 border-r rounded-l outline-none cursor-pointer hover:text-gray-700 hover:bg-gray-300"
                                  >
                                    <span className="m-auto text-2xl font-thin">
                                      -
                                    </span>
                                  </button>
                                  <input
                                    className="flex items-center w-full font-semibold text-center text-gray-700 placeholder-gray-700 bg-gray-100 outline-none focus:outline-none text-md hover:text-black"
                                    type="text"
                                    onChange={(e) => {
                                      const inputValue = e.target.value;
                                      if (
                                        inputValue === "" ||
                                        inputValue === "0"
                                      ) {
                                        setInput(null);
                                      } else if (
                                        !Number.isNaN(parseInt(inputValue))
                                      ) {
                                        setInput(parseInt(inputValue));
                                      }
                                    }}
                                    value={input === null ? "0" : input}
                                    onBlur={(e) => {
                                      if (e.target.value === "") {
                                        setInput(1);
                                      }
                                      productFind && productFind.quantity
                                        ? handleInputChange({
                                            ...propsForFunctions,
                                            value: input,
                                          })
                                        : handleFirstItem();
                                    }}
                                  />
                                  <button
                                    type="button"
                                    onClick={() =>
                                      productFind && productFind.quantity
                                        ? handleItemsCart({
                                            ...propsForFunctions,
                                            value: productFind.quantity + 1,
                                          })
                                        : handleFirstItem()
                                    }
                                    disabled={isProcessing}
                                    className="w-20 h-full text-gray-600 bg-gray-100 border-l rounded-r outline-none cursor-pointer hover:text-gray-700 hover:bg-gray-300"
                                  >
                                    <span className="m-auto text-2xl font-thin">
                                      +
                                    </span>
                                  </button>
                                </>
                              ) : (
                                <>
                                  <button
                                    onClick={handleBtns}
                                    className="w-20 h-full text-gray-600 bg-gray-100 border-r rounded-l outline-none cursor-pointer hover:text-gray-700 hover:bg-gray-300"
                                  >
                                    <span className="m-auto text-2xl font-thin">
                                      -
                                    </span>
                                  </button>
                                  <input
                                    type="text"
                                    className="flex items-center w-full font-semibold text-center text-gray-700 placeholder-gray-700 bg-gray-100 outline-none focus:outline-none text-md hover:text-black"
                                    placeholder="0"
                                    onChange={handleBtns}
                                  />
                                  <button
                                    onClick={handleBtns}
                                    className="w-20 h-full text-gray-600 bg-gray-100 border-l rounded-r outline-none cursor-pointer hover:text-gray-700 hover:bg-gray-300"
                                  >
                                    <span className="m-auto text-2xl font-thin">
                                      +
                                    </span>
                                  </button>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="mb-4 mr-4 lg:mb-0">
                          <button
                            onClick={() => setCheckout(true)}
                            type="button"
                            className="w-full h-10 p-2 mr-4 bg-blue-500 text-gray-50 hover:bg-blue-600"
                          >
                            Comprar ahora
                          </button>
                        </div>
                        <div className="mb-4 mr-4 lg:mb-0">
                          <button
                            onClick={() =>
                              productFind && productFind.quantity
                                ? handleItemsCart({
                                    ...propsForFunctions,
                                    value: productFind.quantity + 1,
                                  })
                                : handleFirstItem()
                            }
                            type="button"
                            className="flex items-center justify-center w-full h-10 p-2 text-gray-400 border border-gray-300 lg:w-11 hover:text-gray-700"
                          >
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
      {deleteConfirmation && (
        <DeleteConfirmation
          title="Eliminar Producto"
          message="¿Estás seguro de que deseas eliminar este producto de tu carrito de compras? Ten en cuenta que este producto se eliminará del carrito, pero aún puedes agregarlo nuevamente en el futuro si lo necesitas."
          confirmText="Eliminar"
          cancelText="Cancelar"
          onConfirm={() =>
            handleDelete({
              ...propsForFunctions,
            })
          }
          onCancel={() => setDeleteConfirmation(false)}
        />
      )}
      {checkout && (
        <DeleteConfirmation
          title="Finalizar Compra"
          message="¿Estás seguro de que deseas confirmar tu compra? Una vez que confirmes, tu pedido será procesado y enviado. Si tienes alguna pregunta o necesitas ayuda adicional, no dudes en contactarnos. ¡Gracias por tu compra!"
          confirmText="Confirmar Compra"
          cancelText="Cancelar Compra"
          onConfirm={() => setCheckout(false)}
          onCancel={() => setCheckout(false)}
        />
      )}
    </Layout>
  );
};

export default Detail;
