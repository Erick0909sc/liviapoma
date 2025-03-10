import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prismadb";
import { ProductsStatus } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  switch (method) {
    case "GET":
      try {
        const { page, count, search, status } = req.query;
        const countInt = parseInt(count as string) || 10;
        const itemsPerPage = Math.min(100, Math.max(10, countInt)); // min 10 max 100 items per page
        if (parseInt(page as string) < 1) {
          return res.status(400).json({ error: "Número de página no válido" });
        }
        const skip = (parseInt(page as string) - 1) * itemsPerPage;
        if (search) {
          const searchValue = parseInt(search as string);
          const isNumericSearch = !isNaN(searchValue);
          const totalOrdersCount = await prisma.order.count({
            where: {
              productsStatus: status as ProductsStatus,
              OR: [
                { id: isNumericSearch ? searchValue : undefined },
                {
                  checkoutUuid: search as string,
                },
                { userId: search as string },
              ].filter(Boolean),
            },
          });
          const orders = await prisma.order.findMany({
            where: {
              productsStatus: status as ProductsStatus,
              OR: [
                { id: isNumericSearch ? searchValue : undefined },
                {
                  checkoutUuid: search as string,
                },
                { userId: search as string },
              ].filter(Boolean),
            },
            include: {
              user: true,
            },
            orderBy: {
              createdAt: "desc",
            },
            skip,
            take: itemsPerPage,
          });
          return res
            .status(200)
            .json({ page: parseInt(page as string), orders, totalOrdersCount });
        }
        const totalOrdersCount = await prisma.order.count({
          where: {
            productsStatus: status as ProductsStatus,
          },
        });
        const orders = await prisma.order.findMany({
          where: {
            productsStatus: status as ProductsStatus,
          },
          orderBy: {
            createdAt: "desc",
          },
          skip,
          include: {
            user: true,
          },
          take: itemsPerPage,
        });
        orders.length > 0
          ? res.status(200).json({
              page: parseInt(page as string),
              orders,
              totalOrdersCount,
            })
          : res.status(404).json({
              message: "orders not found",
            });
      } catch (error) {
        res.status(500).json(error);
      }
      break;
    default:
      res.status(405).json({ message: `HTTP METHOD ${method} NOT SUPPORTED` });
      break;
  }
}
