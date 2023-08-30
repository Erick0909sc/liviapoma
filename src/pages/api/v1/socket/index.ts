import { Server } from 'socket.io';  // El módulo es 'socket.io', no 'Socket.IO'
import type { NextApiRequest, NextApiResponse } from 'next';
import type { Server as HTTPServer } from 'http'
import type { Socket as NetSocket } from 'net'
import type { Server as IOServer } from 'socket.io'

interface SocketServer extends HTTPServer {
  io?: IOServer | undefined
}

interface SocketWithIO extends NetSocket {
  server: SocketServer
}

interface NextApiResponseWithSocket extends NextApiResponse {
  socket: SocketWithIO
}
const SocketHandler = (req: NextApiRequest, res: NextApiResponseWithSocket) => {
  if (res.socket.server['io']) {
    console.log('Socket is already running');
  } else {
    console.log('Socket is initializing');
    const io = new Server(res.socket.server, {
      cors: {
        origin: '*'  // Esto permite conexiones desde cualquier origen, se debe ajustar en producción.
      }
    });
    res.socket.server['io'] = io;

    io.on('connection', socket => {
      socket.on('input-change', async msg => {
        socket.broadcast.emit('update-input', msg);
      });
    });
  }
  res.end();
};

export default SocketHandler;
