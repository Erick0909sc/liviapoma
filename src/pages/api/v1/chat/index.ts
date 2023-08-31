import { NextApiResponseWithSocket } from "@/shared/types";
import { NextApiRequest } from "next";


export default (req: NextApiRequest, res: NextApiResponseWithSocket) => {
  if (req.method === "POST") {
    // get message
    const message = req.body;

    // dispatch to channel "message"
    res.socket.server.io?.emit("message", message);

    // return message
    return res.status(201).json(message);
  }
};
