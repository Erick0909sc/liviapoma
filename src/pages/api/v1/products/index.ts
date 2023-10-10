import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prismadb";
import { formatDate } from "@/shared/ultis";

type TypeP = {
  code: string;
  name: string;
  description: string;
  price: number;
  image: string;
  rating: number;
  discount: number;
  categoryId: number;
  deletedAt: Date | null;
  brandId: number | null;
  unitOfMeasureId: number;
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  switch (method) {
    case "GET":
      try {
        const { name, category, discount } = req.query;
        if (discount) {
          const now = formatDate(new Date());
          const offers = await prisma.offer.findMany({
            where: {
              endDate: {
                gt: now,
              },
            },
            include: {
              brands: { include: { brand: { include: { products: true } } } },
              categories: {
                include: { category: { include: { products: true } } },
              },
            },
          });
          const productos = offers.reduce((acumulador: TypeP[], objeto) => {
            const productosCategoria = objeto.categories.reduce(
              (arr: TypeP[], categoria) =>
                arr.concat(categoria.category.products),
              []
            );
            const productosMarca = objeto.brands.reduce(
              (arr: TypeP[], marca) => arr.concat(marca.brand.products),
              []
            );
            return acumulador.concat(productosCategoria, productosMarca);
          }, []);

          const products: TypeP[] = await prisma.product.findMany({
            where: {
              NOT: {
                discount: 0,
              },
              deletedAt: null,
            },
            include: {
              category: true,
              brand: true,
              unitOfMeasure: true,
            },
          });
          const productsWithDiscount = products
            .filter(
              (producto1) =>
                !productos.some(
                  (producto2) => producto2.code === producto1.code
                )
            )
            .concat(
              productos.filter(
                (producto2) =>
                  !products.some(
                    (producto1) => producto1.code === producto2.code
                  )
              )
            );
          return products.length
            ? res.status(200).json(productsWithDiscount)
            : res.status(404).json({ message: "products not found" });
        }
        if (name) {
          const products = await prisma.product.findMany({
            where: {
              name: {
                contains: name as string,
                mode: "insensitive",
              },
              deletedAt: null,
            },
            include: {
              category: true,
              brand: true,
              unitOfMeasure: true,
            },
          });
          return products.length
            ? res.status(200).json(products)
            : res.status(404).json({ message: "products not found" });
        }
        if (category) {
          const products = await prisma.product.findMany({
            where: {
              category: {
                name: {
                  contains: category as string,
                },
              },
              deletedAt: null,
            },
            include: {
              category: true,
              brand: true,
              unitOfMeasure: true,
            },
          });
          return products.length
            ? res.status(200).json(products)
            : res.status(404).json({ message: "products not found" });
        }
        const products = await prisma.product.findMany({
          where: {
            deletedAt: null,
          },
          include: {
            category: true,
            brand: true,
            unitOfMeasure: true,
          },
        });
        products.length
          ? res.status(200).json(products)
          : res.status(404).json({ message: "products not found" });
      } catch (error) {
        res.status(500).json(error);
      }
      break;
    default:
      res.status(405).json({ message: `HTTP METHOD ${method} NOT SUPPORTED` });
      break;
  }
}
