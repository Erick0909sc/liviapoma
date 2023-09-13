import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  switch (method) {
    case "GET":
      try {
        const { code } = req.query;
        const product = await prisma.product.findUnique({
          where: {
            code: code as string,
            deletedAt: null,
          },
          include: { category: true },
        });
        product
          ? res.status(200).json(product)
          : res.status(400).json({ message: "product not found" });
      } catch (error) {
        res.status(500).json(error);
      }
      break;
    case "PATCH":
      try {
        const { code, restore } = req.query;
        if (restore) {
          const product = await prisma.product.update({
            where: {
              code: code as string,
            },
            data: { deletedAt: null },
          });
          return res.status(200).json(product);
        }
        const product = await prisma.product.update({
          where: {
            code: code as string,
          },
          data: { deletedAt: new Date() },
        });
        res.status(200).json(product);
      } catch (error) {
        res.status(500).json(error);
      }
      break;
    case "DELETE":
      try {
        const { code } = req.query;
        const product = await prisma.product.delete({
          where: {
            code: code as string,
          },
        });
        product
          ? res.status(200).json(product)
          : res.status(400).json({ message: "product not found" });
      } catch (error) {
        res.status(500).json(error);
      }
      break;
    default:
      res.status(500).json({ message: `HTTP METHOD ${method} NOT SUPPORTED` });
      break;
  }
}
