import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from "@/lib/prismadb";
import productsData from "@/data/products"
import categoriesData from "@/data/categories"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  switch (method) {
    case 'GET':
      try {
        const { name } = req.query
        if (name) {
          const products = await prisma.product.findMany({
            where: {
              name: {
                contains: name as string,
                mode: 'insensitive',
              },
            },
            include: {
              category: true,
            }
          })
          return products.length ? res.status(200).json(products) : res.status(400).json({ message: 'products not found' })
        }
        const products = await prisma.product.findMany({
          include: {
            category: true,
          }
        })
        products.length ? res.status(200).json(products) : res.status(400).json({ message: 'products not found' })
      } catch (error) {
        res.status(500).json(error)
      }
      break;
    case 'POST':
      try {
        const categories = await prisma.category.createMany({
          data: categoriesData
        })
        const products = await prisma.product.createMany({
          data: productsData
        })
        res.status(200).json({ products, categories })
      } catch (error) {
        res.status(500).json(error)
      }
      break;
    default:
      res.status(500).json({ message: 'METHOD NOT SUPPORTED' })
      break;
  }
}
