import prisma from "@/lib/prismadb";
import { Role } from "@prisma/client";
import axios from "axios";
import { hash } from "bcryptjs";
import type { NextApiRequest, NextApiResponse } from "next";
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  switch (method) {
    case "GET":
      try {
        const users = await prisma.user.findMany({
          include: { cart: { include: { products: true } } },
        });
        users.length
          ? res.status(200).json(users)
          : res.status(400).json({ message: "users not found" });
      } catch (error) {
        res.status(500).json(error);
      }
      break;
    default:
      res.status(405).json({ message: `HTTP METHOD ${method} NOT SUPPORTED` });
      break;
  }
}
