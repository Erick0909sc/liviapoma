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
        const { code } = req.query
        const product = await prisma.product.findUnique({
          where: {
            code: code as string,
            deletedAt: null
          },
          include: { category: true }
        })
        res.status(200).json(product)
      } catch (error) {
        res.status(500).json(error)
      }
      break;
    default:
      res.status(500).json({ message: `HTTP METHOD ${method} NOT SUPPORTED` })
      break;
  }
}
