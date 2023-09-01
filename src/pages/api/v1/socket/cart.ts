// import prisma from "@/lib/prismadb";
// import { Server } from 'socket.io';
// import type { NextApiRequest, NextApiResponse } from 'next';
// import type { Server as HTTPServer } from 'http'
// import type { Socket as NetSocket } from 'net'
// import type { Server as IOServer } from 'socket.io'

// interface SocketServer extends HTTPServer {
//   io?: IOServer | undefined
// }

// interface SocketWithIO extends NetSocket {
//   server: SocketServer
// }

// interface NextApiResponseWithSocket extends NextApiResponse {
//   socket: SocketWithIO
// }
// const SocketHandler = async (req: NextApiRequest, res: NextApiResponseWithSocket) => {
//   if (res.socket.server['io']) {
//     console.log('Socket is already running');
//   } else {
//     console.log('Socket is initializing');
//     const io = new Server(res.socket.server, {
//       cors: {
//         origin: '*'
//       }
//     });
//     res.socket.server['io'] = io;

//     io.on('connection', socket => {
//       socket.on('cart', async code => {
//         if (code) {
//           const productCode = code
//           const quantity = 21
//           const userId = "cllwjus0k0000t3zkujmxt2uk"
//           const cart = await prisma.cart.upsert({
//             where: {
//               userId: userId,
//             },
//             update: {},
//             create: {
//               userId: userId,
//             },
//           });
//           await prisma.cartItem.upsert({
//             where: {
//               productCode_cartId: {
//                 cartId: cart.id,
//                 productCode: productCode,
//               },
//             },
//             update: {
//               quantity: { increment: quantity },
//             },
//             create: {
//               product: {
//                 connect: {
//                   code: productCode,
//                 },
//               },
//               cart: {
//                 connect: {
//                   id: cart.id,
//                 },
//               },
//               quantity: quantity,
//             },
//           });
//         }
//         // Asumiendo que el usuario está autenticado y tienes su ID
//         const userId = "cllwjus0k0000t3zkujmxt2uk";
//         // Realiza las operaciones de Prisma para obtener el carrito del usuario
//         const carrito = await prisma.cart.findUnique({
//           where: { userId },
//           include: {
//             products: {
//               include: {
//                 product: true
//               }
//             }
//           }
//         });
//         // Emitir el carrito actualizado al cliente conectado
//         socket.broadcast.emit('update-cart', carrito);
//       });
//     });
//   }
//   res.end();
// };

// export default SocketHandler;



import prisma from "@/lib/prismadb";
import { Server } from 'socket.io';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { Server as HTTPServer } from 'http'
import type { Socket as NetSocket } from 'net'
import type { Server as IOServer } from 'socket.io'
import { getSession } from "next-auth/react";
import { addItemToCart, getAllCartByUser } from "@/controllers/cartController";

interface SocketServer extends HTTPServer {
  io?: IOServer | undefined
}

interface SocketWithIO extends NetSocket {
  server: SocketServer
}

interface NextApiResponseWithSocket extends NextApiResponse {
  socket: SocketWithIO
}


export default async function handler(req: NextApiRequest, res: NextApiResponseWithSocket) {
  const session = await getSession({ req });
  if (!session) {
    return res.status(403).send("forbidden");
  }
  if (!res.socket.server['io']) {
    console.log('Socket is initializing');
    const io = new Server(res.socket.server);
    res.socket.server['io'] = io;

    io.on('connection', socket => {
      socket.on('cart-get', async () => {
        const result = await getAllCartByUser({ userId: session.user.id })
        socket.broadcast.emit('update-cart', result.data);
      });
      socket.on('add-to-cart', async (productCode) => {
        await addItemToCart({ productCode, userId: session.user.id })
        const result = await getAllCartByUser({ userId: session.user.id })
        socket.broadcast.emit('update-cart', result.data);
      });
    });
  }
  res.end();
};

