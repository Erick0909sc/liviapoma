import Card from "@/components/Cart/Card";
import Summary from "@/components/Cart/Summary";
import Layout from "@/components/Layout/Layout";
import Pending from "@/components/StatesComponents/Pending";
import { EStateGeneric } from "@/shared/types";
import {
  selectAllCartStatus,
  selectAllCart,
  getCartUser,
  cleanUpCart,
} from "@/states/cart/cartSlice";
import { useAppDispatch } from "@/states/store";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

type Props = {};

const Cart = (props: Props) => {
  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const cartStatus = useSelector(selectAllCartStatus);
  const cart = useSelector(selectAllCart);
  useEffect(() => {
    (async () => {
      if (router.isReady) {
        if (session) {
          await dispatch(getCartUser(session.user.id));
        }
      }
    })();
    return () => {
      if (
        cartStatus === EStateGeneric.SUCCEEDED ||
        cartStatus === EStateGeneric.FAILED
      ) {
        dispatch(cleanUpCart());
      }
    };
  }, [session, dispatch]);
  return (
    <Layout title="Carro de compras">
      <div className="flex flex-col items-center">
        {session && (
          <div className="md:p-10 max-w-screen-2xl w-full">
            {cartStatus === EStateGeneric.SUCCEEDED && (
              <div className="md:flex gap-4">
                <div className="flex-1 bg-white">
                  <h2 className="text-2xl font-bold p-4">Carrito de Compras</h2>
                  <hr />
                  <div className="flex-1 flex flex-col">
                    {cart.products.map((product, index) => (
                      <div key={index}>
                        <Card session={session} {...product} />
                        <hr />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="md:w-1/4 relative">
                  <div className="flex flex-col gap-y-8 sticky top-0">
                    <Summary cart={cart.products} session={session} />
                  </div>
                </div>
              </div>
            )}
            {cartStatus === EStateGeneric.FAILED && (
              <div className="md:flex gap-4">
                <div className="flex-1 bg-white p-4 rounded-lg shadow-md">
                  <h2 className="text-2xl font-bold">Carrito de Compras</h2>
                  <hr className="my-2" />
                  <p className="text-gray-600">
                    Tu carrito de compras está vacío en este momento.
                  </p>
                  <Link href="/products">
                    <span className="text-blue-800 font-bold underline underline-offset-8 mt-4 inline-block hover:cursor-pointer">
                      Ver productos disponibles
                    </span>
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}
        {status === "loading" && <Pending />}
        {status === "unauthenticated" && (
          <div className="md:p-10 max-w-screen-2xl w-full">
            <div className="md:flex">
              <div className="flex-1 bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold">Carrito de Compras</h2>
                <hr className="my-2" />
                <p className="text-gray-600 text-base my-4">
                  Inicia sesión para ver y completar tu carrito de compras.
                </p>
                <button
                  className="bg-green-700 hover:bg-green-500 text-white font-semibold py-2 px-4 rounded shadow"
                  onClick={() => signIn()}
                >
                  Iniciar sesión
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Cart;
