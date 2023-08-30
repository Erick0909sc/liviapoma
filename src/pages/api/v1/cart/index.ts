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
        const { userId } = req.query;
        if (!userId) {
          return res.status(400).json({ message: 'userId is requerid' })
        }
        const cart = await prisma.cart.findUnique({
          where: {
            userId: userId as string // Se puede hacer con nexthuath sin necesidad de pedir user
          },
          include: {
            products: {
              include: {
                product: true
              }
            },
          }
        })
        cart ? res.status(200).json(cart) : res.status(400).json({ message: 'cart is empty' })
      } catch (error) {
        res.status(500).json(error)
      }
      break;
    case 'POST':
      try {
        const { productCode, userId }: { productCode: string, userId: string } = req.body;
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
          return res.status(400).json({ message: 'product not found' })
        }
        const cartItem = await prisma.cartItem.upsert({
          where: {
            productCode_cartId: {
              cartId: cart.id,
              productCode: productCode,
            },
          },
          update: {
            quantity: { increment: 1 },
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
            quantity: 1,
          },
        });
        res.status(201).json(cartItem)
      } catch (error) {
        res.status(500).json(error)
      }
      break;
    case 'PATCH':
      try {
        const { productCode, quantity, userId }: { productCode: string, quantity: number, userId: string } = req.body;
        const cart = await prisma.cart.findUnique({
          where: {
            userId: userId,
          }
        });
        if (!cart) {
          return res.status(400).json({ message: 'cart not found' })
        }
        const cartItem = await prisma.cartItem.findUnique({
          where: {
            productCode_cartId: {
              cartId: cart.id,
              productCode: productCode,
            },
          },
        });
        if (!cartItem) {
          return res.status(400).json({ message: 'product not found in the cart' })
        }
        const updateCartItem = await prisma.cartItem.update({
          where: {
            id: cartItem.id
          },
          data: {
            quantity: quantity,
          }
        });
        res.status(201).json(updateCartItem)
      } catch (error) {
        res.status(500).json(error)
      }
      break;
    case 'DELETE':
      try {
        const { productCode, quantity, userId }: { productCode: string, quantity: number, userId: string } = req.body;
        const cart = await prisma.cart.findUnique({
          where: {
            userId: userId,
          }
        });
        if (!cart) {
          return res.status(400).json({ message: 'cart not found' })
        }
        const cartItem = await prisma.cartItem.findUnique({
          where: {
            productCode_cartId: {
              cartId: cart.id,
              productCode: productCode,
            },
          },
        });
        if (!cartItem) {
          return res.status(400).json({ message: 'product not found in the cart' })
        }
        const deleteCartItem = await prisma.cartItem.delete({
          where: {
            id: cartItem.id
          },
        });
        res.status(201).json(deleteCartItem)
      } catch (error) {
        res.status(500).json(error)
      }
      break;
    default:
      res.status(500).json({ message: 'HTTP METHOD NOT SUPPORTED' })
      break;
  }
}
