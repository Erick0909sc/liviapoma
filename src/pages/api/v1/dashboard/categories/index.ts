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
        const categories = await prisma.category.findMany()
        categories.length ? res.status(200).json(categories) : res.status(400).json({ message: 'categories not found' })
      } catch (error) {
        res.status(500).json(error)
      }
      break;
    default:
      res.status(500).json({ message: 'HTTP METHOD NOT SUPPORTED' })
      break;
  }
}
