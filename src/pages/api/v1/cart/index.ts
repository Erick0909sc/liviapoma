import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from "@/lib/prismadb";
import { addItemToCart, getAllCartByUser } from '@/controllers/cartController';

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
        const result = await getAllCartByUser({ userId: userId as string })
        if (result.success) {
          return res.status(200).json(result.data);
        } else {
          return res.status(400).json({ message: result.error });
        }
      } catch (error) {
        res.status(500).json(error)
      }
      break;
    case 'POST':
      try {
        const { productCode, userId }: { productCode: string, userId: string } = req.body;
        const result = await addItemToCart({ productCode, userId })
        if (result.success) {
          return res.status(201).json(result.data);
        } else {
          return res.status(400).json({ message: result.error });
        }
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
        res.status(200).json(updateCartItem)
      } catch (error) {
        res.status(500).json(error)
      }
      break;
    case 'DELETE':
      try {
        const { productCode, userId } = req.query;
        const cart = await prisma.cart.findUnique({
          where: {
            userId: userId as string,
          }
        });
        if (!cart) {
          return res.status(400).json({ message: 'cart not found' })
        }
        const cartItem = await prisma.cartItem.findUnique({
          where: {
            productCode_cartId: {
              cartId: cart.id,
              productCode: productCode as string,
            },
          },
        });
        if (!cartItem) {
          return res.status(400).json({ message: 'product not found in the cart' })
        }

        // Eliminar el CartItem
        const deletedCartItem = await prisma.cartItem.delete({
          where: {
            id: cartItem.id
          },
        });

        // Verificar si el carro está vacío
        const remainingCartItems = await prisma.cartItem.count({
          where: {
            cartId: cart.id,
          },
        });

        if (remainingCartItems === 0) {
          // Si no hay más CartItems en el carro, eliminar el carro
          await prisma.cart.delete({
            where: {
              id: cart.id,
            },
          });
        }

        res.status(200).json(deletedCartItem);
      } catch (error) {
        res.status(500).json(error);
      }
      break;
    default:
      res.status(500).json({ message: 'HTTP METHOD NOT SUPPORTED' })
      break;
  }
}
