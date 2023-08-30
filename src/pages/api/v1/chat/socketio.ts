import { NextApiRequest } from "next";
import { Server as ServerIO } from "socket.io";
import { Server as NetServer } from "http";
import { NextApiResponseWithSocket } from "@/shared/types";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req: NextApiRequest, res: NextApiResponseWithSocket) => {
  if (!res.socket.server.io) {
    console.log("New Socket.io server...");
    // adapt Next's net Server to http Server
    const httpServer: NetServer = res.socket.server;
    const io = new ServerIO(httpServer, {
      path: "/api/v1/chat/socketio",
    });
    // append SocketIO server to Next.js socket server response
    res.socket.server.io = io;
  }
  res.end();
};
