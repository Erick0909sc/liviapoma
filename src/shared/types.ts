import type { NextApiResponse } from 'next';
import type { Server as HTTPServer } from 'http'
import type { Socket as NetSocket } from 'net'
import type { Server as IOServer } from 'socket.io'

interface SocketServer extends HTTPServer {
  io?: IOServer | undefined
}

interface SocketWithIO extends NetSocket {
  server: SocketServer
}

export interface NextApiResponseWithSocket extends NextApiResponse {
  socket: SocketWithIO
}

export enum EStateGeneric {
  IDLE = "idle",
  SUCCEEDED = "succeeded",
  PENDING = "pending",
  FAILED = "failed",
}

export interface IProduct {
  code: string;
  name: string;
  description: string;
  price: number;
  marca: string;
  image: string;
  rating: number;
  discount: number;
  categoryId: number;
  category: Category;

}

export interface Category {
  id: number;
  name: string;
}

export interface ICategory {
  name: string;
}


