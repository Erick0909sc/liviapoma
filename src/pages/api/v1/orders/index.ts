import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prismadb";
import { IProductCart } from "@/shared/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  switch (method) {
    case "GET":
      try {
        const { userId } = req.query;
        const orders = await prisma.order.findMany({
          where: {
            userId: userId as string,
          },
          include: {
            products: true,
            user: true,
          },
        });
        res.status(200).json(orders);
      } catch (error) {
        res.status(500).json(error);
      }
      break;
    case "POST":
      try {
        const {
          userId,
          orderTotalAmount,
          orderCurrency,
          products,
        }: {
          userId: string;
          orderTotalAmount: number;
          orderCurrency: string;
          products: IProductCart[];
        } = req.body;
        const order = await prisma.order.create({
          data: {
            userId,
            orderTotalAmount,
            orderCurrency,
            products: {
              createMany: {
                data: products.map((item) => ({
                  quantity: item.quantity,
                  productCode: item.productCode,
                })),
              },
            },
          },
        });

        res.status(201).json({ order });
      } catch (error) {
        res.status(500).json({ error: "Error al crear la orden" });
      }
      break;
    case "PATCH":
      try {
        const {
          id,
          formToken,
        }: {
          id: number;
          formToken: string;
        } = req.body;
        const order = await prisma.order.update({
          where: { id: id },
          data: {
            formToken,
          },
        });
        res.status(200).json(order);
      } catch (error) {
        res.status(500).json(error);
      }
      break;
    default:
      res.status(405).json({ message: `HTTP METHOD ${method} NOT SUPPORTED` });
      break;
  }
}
