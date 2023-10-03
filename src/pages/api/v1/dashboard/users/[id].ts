import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prismadb";
import { Role } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  switch (method) {
    case "GET":
      try {
        const { id } = req.query;
        const user = await prisma.user.findUnique({
          where: {
            id: id as string,
          },
          include: { cart: { include: { products: true } } },
        });
        user
          ? res.status(200).json(user)
          : res.status(400).json({ message: "user not found" });
      } catch (error) {
        res.status(500).json(error);
      }
      break;
    case "PATCH":
      // Roles validar jerarquía "User" < "Manager" < "Admin"
      try {
        const { id, role } = req.query;
        const user = await prisma.user.update({
          where: {
            id: id as string,
          },
          data: { role: role as Role },
        });
        user
          ? res.status(200).json(user)
          : res.status(400).json({ message: "user not found" });
      } catch (error) {
        res.status(500).json(error);
      }
      break;
    case "DELETE":
      try {
        const { id } = req.query;
        const user = await prisma.user.delete({
          where: {
            id: id as string,
          },
        });
        user
          ? res.status(200).json(user)
          : res.status(400).json({ message: "user not found" });
      } catch (error) {
        res.status(500).json(error);
      }
      break;
    default:
      res.status(405).json({ message: `HTTP METHOD ${method} NOT SUPPORTED` });
      break;
  }
}
