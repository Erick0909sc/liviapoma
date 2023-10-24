import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prismadb";
import { getAllCartByUser } from "@/controllers/cartController";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  switch (method) {
    case "GET":
      try {
        const { id } = req.query;
        const order = await prisma.order.findUnique({
          where: {
            id: parseInt(id as string),
          },
        });
        if (!order) {
          return res.status(404).json({ message: "order not found" });
        }
        const result = await getAllCartByUser({ userId: order.userId });
        if (result.success) {
          return res.status(200).json({ order, cart: result.data?.products });
        } else {
          return res.status(400).json({ message: result.error });
        }
      } catch (error) {
        res.status(500).json(error);
      }
      break;
    default:
      res.status(405).json({ message: `HTTP METHOD ${method} NOT SUPPORTED` });
      break;
  }
}
