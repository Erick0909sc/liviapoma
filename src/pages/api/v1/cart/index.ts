import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from "@/lib/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  switch (method) {
    case 'GET':
      try {
        const cart = await prisma.cart.findMany({
          include: {
            products: {
              include: {
                product: true
              }
            },
          }
        })
        cart.length ? res.status(200).json(cart) : res.status(400).json({ message: 'cart is empty' })
      } catch (error) {
        res.status(500).json(error)
      }
      break;
    case 'POST':
      try {
        const { productCode, quantity, userId }: { productCode: string, quantity: number, userId: string } = req.body;
        const cart = await prisma.cart.upsert({
          where: {
            userId: userId,
          },
          update: {},
          create: {
            userId: userId,
          },
        });
        const product = await prisma.product.findUnique({
          where: {
            code: productCode,
          },
        });
        if (!product) {
          res.status(400).json({ message: 'product not found' })
        }
        const cartItem = await prisma.cartItem.upsert({
          where: {
            productCode_cartId: {
              cartId: cart.id,
              productCode: productCode,
            },
          },
          update: {
            quantity: { increment: quantity },
          },
          create: {
            product: {
              connect: {
                code: productCode,
              },
            },
            cart: {
              connect: {
                id: cart.id,
              },
            },
            quantity: quantity,
          },
        });
        res.status(201).json(cartItem)
      } catch (error) {
        res.status(500).json(error)
      }
      break;
    case 'DELETE':
      try {
        res.status(404).json({ message: 'route in process' })
      } catch (error) {
        res.status(500).json(error)
      }
      break;
    default:
      res.status(500).json({ message: 'HTTP METHOD NOT SUPPORTED' })
      break;
  }
}
