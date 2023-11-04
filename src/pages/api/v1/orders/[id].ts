import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prismadb";
import { getAllCartByUser } from "@/controllers/cartController";
import { getTransactionApiIziPay } from "@/controllers/paymentController";
import { ProductsStatus } from "@prisma/client";
import { updateOrdersForAdmins } from "@/controllers/notificationsController";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  switch (method) {
    case "GET":
      try {
        const { id, detail, userId } = req.query;
        if (detail) {
          const order = await prisma.order.findUnique({
            where: {
              id: parseInt(id as string),
            },
          });
          if (!order) {
            return res.status(404).json({ message: "order not found" });
          }
          const transaction = await getTransactionApiIziPay(
            order.checkoutUuid as string
          );
          const data = {
            user: {
              name: transaction.answer.customer.billingDetails.firstName,
              email: transaction.answer.customer.email,
            },
            shoppingCart: transaction.answer.customer.shoppingCart.cartItemInfo,
            amount: transaction.answer.amount,
          };
          return res.status(200).json(data);
        }
        const order = await prisma.order.findUnique({
          where: {
            id: parseInt(id as string),
            userId: userId as string,
          },
          include: {
            products: {
              include: {
                product: {
                  include: { category: true, brand: true, unitOfMeasure: true },
                },
              },
            },
          },
        });
        if (!order) {
          return res.status(404).json({ message: "order not found" });
        }
        return res.status(200).json(order);
      } catch (error) {
        res.status(500).json(error);
      }
      break;
    case "PATCH":
      try {
        const { id } = req.query;
        const { status } = req.body;
        const order = await prisma.order.update({
          where: { id: parseInt(id as string) },
          data: {
            productsStatus: status as ProductsStatus,
          },
        });
        await updateOrdersForAdmins()
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
