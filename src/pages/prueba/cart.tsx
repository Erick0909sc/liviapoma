import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

let socket: Socket;

const CarritoCompras = () => {
  const [carrito, setCarrito] = useState<any | null>(null);
  const [input, setInput] = useState("");

  useEffect(() => {
    (async () => {
      try {
        await fetch('/api/v1/socket/cart');
        socket = io();

        socket.on('connect', () => {
          console.log('connected');
        });

        socket.on('update-cart', (cart: any) => {
          setCarrito(cart);
        });
        socket.emit('cart');
      } catch (error) {
        console.error('Error during socket connection:', error);
      }
    })()
  }, []);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    // console.log(input)
    socket.emit('cart', input)
  }
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    // socket.emit('input-change', e.target.value);
  };

  return (
    <div>
      {carrito ? (
        <div>
          <h2>Carrito de Compras</h2>
          <ul>
            {carrito.products.map((product: any) => (
              <li key={product.id}>
                {product.product.name} - Cantidad: {product.quantity} - {product.product.code}
              </li>
            ))}
          </ul>
          <form onSubmit={handleSubmit}>
            <input
              placeholder="Type something"
              value={input}
              onChange={onChangeHandler}
            />
            <button type="submit">Code</button>
          </form>
        </div>
      ) : (
        <div>Cargando carrito...
        </div>
      )}
    </div>
  );
};

export default CarritoCompras;
