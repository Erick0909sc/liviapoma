import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prismadb";
import productsData from "@/data/products";
import categoriesData from "@/data/categories";
import brandsData from "@/data/brands";
import { measuresData } from "@/data/measures";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  switch (method) {
    case "GET":
      try {
        const categories = await prisma.category.findMany();
        const unitOfMeasure = await prisma.unitOfMeasure.findMany();
        const brands = await prisma.brand.findMany();
        const products = await prisma.product.findMany({
          where: {
            deletedAt: null,
          },
        });
        res.status(200).json({
          products: products.length,
          unitOfMeasure: unitOfMeasure.length,
          categories: categories.length,
          brands: brands.length,
        });
      } catch (error) {
        res.status(500).json(error);
      }
      break;
    case "POST":
      try {
        const unitOfMeasure = await prisma.unitOfMeasure.findMany();
        const categories = await prisma.category.findMany();
        const brands = await prisma.brand.findMany();
        const products = await prisma.product.findMany();
        if (
          !products.length &&
          !categories.length &&
          !brands.length &&
          !unitOfMeasure.length
        ) {
          const unitOfMeasure = await prisma.unitOfMeasure.createMany({
            data: measuresData,
          });
          const categories = await prisma.category.createMany({
            data: categoriesData,
          });
          const brands = await prisma.brand.createMany({
            data: brandsData,
          });
          const products = await prisma.product.createMany({
            data: productsData,
          });
          return res
            .status(200)
            .json({ products, categories, brands, unitOfMeasure });
        }
        res.status(400).json({ message: "The data already exists" });
      } catch (error) {
        res.status(500).json(error);
      }
      break;
    default:
      res.status(405).json({ message: `HTTP METHOD ${method} NOT SUPPORTED` });
      break;
  }
}
