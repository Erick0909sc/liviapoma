import Card from "@/components/Cart/Card";
import Layout from "@/components/Layout/Layout";
import { EStateGeneric } from "@/shared/types";
import { selectAllCartStatus, selectAllCart, getCartUser } from "@/states/cart/cartSlice";
import { useAppDispatch } from "@/states/store";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect } from "react";
import { useSelector } from "react-redux";

type Props = {}

const Cart = (props: Props) => {
  const { data: session } = useSession()
  const dispatch = useAppDispatch();
  const cartStatus = useSelector(selectAllCartStatus);
  const cart = useSelector(selectAllCart);
  useEffect(() => {
    (async () => {
      if (cartStatus === EStateGeneric.IDLE) {
        if (session) dispatch(getCartUser(session.user.id))
      }
    })();
  }, [session]);
  return (
    <Layout>
      {session &&
        <div className="p-10 max-w-screen-2xl">
          {cartStatus === EStateGeneric.SUCCEEDED &&
            <div className="flex gap-4">
              <div className="flex-1 bg-white">
                <h2 className="text-2xl font-bold p-4">Carrito de Compras</h2>
                <hr />
                <div className="flex-1 flex flex-col">
                  {cart.products.map((product, index) => <Card key={index} session={session} {...product} />)}
                </div>
              </div>
              <div className="md:w-1/4 relative">
                <div className="flex flex-col gap-y-8 sticky top-12">
                  <div className="bg-white p-6">
                    <div className="grid grid-cols-1 gap-y-6">
                      <Link href="/checkout">
                        <Link href="/checkout">Go to checkout</Link>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }
          {cartStatus === EStateGeneric.PENDING &&
            <div>
              ...PENDING
            </div>
          }
          {cartStatus === EStateGeneric.FAILED &&
            <div>
              ...FAILED
            </div>
          }
        </div>
      }
      {!session &&
        <div>
          <h2>Carrito de Compras</h2>
          Not signed in <br />
          <button onClick={() => signIn()}>Sign in</button>
        </div>
      }
    </Layout>
  )

}

export default Cart;
