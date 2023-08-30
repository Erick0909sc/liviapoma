import Layout from "@/components/Layout/Layout";
import { signIn, signOut, useSession } from "next-auth/react";
import { FormEvent, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

type Props = {}

let socket: Socket;
const Cart = (props: Props) => {
  const { data: session } = useSession()
  const [carrito, setCarrito] = useState<any | null>(null);
  const [input, setInput] = useState("");
  useEffect(() => {
    (async () => {
      try {
        if (session) {
          await fetch('/api/v1/socket/cart');
          socket = io();
          socket.on('connect', () => {
            console.log('connected');
          });
          socket.on("update-cart", (cart: any) => {
            setCarrito(cart);
          });
          socket.emit('cart-get');
        }
      } catch (error) {
        console.error('Error during socket connection:', error);
      }
    })();

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [session]);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log(input)
    socket.emit('add-to-cart', input)
  }
  return (
    <Layout>
      {session &&
        <div>
          <h2>Carrito de Compras</h2>
          <ul>
            {carrito?.products.map((product: any) => (
              <li key={product.id}>
                {product.product.name} - Cantidad: {product.quantity} - {product.product.code}
              </li>
            ))}
          </ul>
          <form onSubmit={handleSubmit}>
            <input
              placeholder="Type something"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit">Code</button>
          </form>
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
