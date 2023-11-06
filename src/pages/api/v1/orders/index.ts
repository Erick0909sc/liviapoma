import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prismadb";
import { IProductCart } from "@/shared/types";
import { ProductsStatus } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  switch (method) {
    case "GET":
      try {
        const { userId, history } = req.query;
        if (history) {
          const orders = await prisma.order.findMany({
            where: {
              userId: userId as string,
              productsStatus: "PENDIENTE", // agregar ESTATUS POR_RECOGER
              orderStatus: "PAID",
            },
            include: {
              products: true,
              user: true,
            },
          });
          return orders.length > 0
            ? res.status(200).json(orders)
            : res.status(400).json({ message: "orders not found" });
        }
        const orders = await prisma.order.findMany({
          where: {
            userId: userId as string,
            productsStatus: "PENDIENTE", // agregar ESTATUS POR_RECOGER
          },
          include: {
            products: true,
            user: true,
          },
        });
        orders.length > 0
          ? res.status(200).json(orders)
          : res.status(400).json({ message: "orders not found" });
      } catch (error) {
        res.status(500).json(error);
      }
      break;
    case "POST":
      try {
        const {
          userId,
          productsStatus,
          orderTotalAmount,
          orderCurrency,
          products,
        }: {
          userId: string;
          productsStatus: ProductsStatus;
          orderTotalAmount: number;
          orderCurrency: string;
          products: IProductCart[];
        } = req.body;
        const order = await prisma.order.create({
          data: {
            userId,
            productsStatus,
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
