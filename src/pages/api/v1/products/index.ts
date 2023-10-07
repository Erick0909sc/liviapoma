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
        const { name, category } = req.query;
        if (name) {
          const products = await prisma.product.findMany({
            where: {
              name: {
                contains: name as string,
                mode: "insensitive",
              },
              deletedAt: null,
            },
            include: {
              category: true,
              brand: true,
            },
          });
          return products.length
            ? res.status(200).json(products)
            : res.status(404).json({ message: "products not found" });
        }
        if (category) {
          const products = await prisma.product.findMany({
            where: {
              category: {
                name: {
                  contains: category as string,
                },
              },
              deletedAt: null,
            },
            include: {
              category: true,
              brand: true,
            },
          });
          return products.length
            ? res.status(200).json(products)
            : res.status(404).json({ message: "products not found" });
        }
        const products = await prisma.product.findMany({
          where: {
            deletedAt: null,
          },
          include: {
            category: true,
            brand: true,
          },
        });
        products.length
          ? res.status(200).json(products)
          : res.status(404).json({ message: "products not found" });
      } catch (error) {
        res.status(500).json(error);
      }
      break;
    default:
      res.status(405).json({ message: `HTTP METHOD ${method} NOT SUPPORTED` });
      break;
  }
}
