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
        const categories = await prisma.category.findMany()
        const products = await prisma.product.findMany({
          where: {
            deletedAt: null
          }
        })
        res.status(200).json({ products: products.length, categories: categories.length })
      } catch (error) {
        res.status(500).json(error)
      }
      break;
    case 'POST':
      try {
        const categories = await prisma.category.findMany()
        const products = await prisma.product.findMany()
        if (!products.length && !categories.length) {
          const categories = await prisma.category.createMany({
            data: categoriesData
          })
          const products = await prisma.product.createMany({
            data: productsData
          })
          return res.status(200).json({ products, categories })
        }
        res.status(400).json({ message: 'The data already exists' })
      } catch (error) {
        res.status(500).json(error)
      }
      break;
    default:
      res.status(500).json({ message: `HTTP METHOD ${method} NOT SUPPORTED` })
      break;
  }
}
