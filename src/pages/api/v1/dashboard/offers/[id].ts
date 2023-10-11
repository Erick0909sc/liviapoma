import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prismadb";
import {
  desactivateOfferProductsByBrand,
  desactivateOfferProductsByCategory,
  updateProductsOffer,
} from "@/controllers/offerController";

type Category = {
  name: string;
  discount: number;
};

type Brand = {
  name: string;
  discount: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  switch (method) {
    case "PUT":
      try {
        const { id } = req.query;
        const {
          image,
          categories,
          brands,
        }: {
          image: string;
          categories: Category[];
          brands: Brand[];
        } = req.body;
        // Primero, verifica si la oferta existe
        const offer = await prisma.offer.findUnique({
          where: { id: parseInt(id as string) },
        });
        if (!offer) {
          // Si la oferta no existe, devuelve un error 404
          return res.status(404).json({ mesage: "Oferta no encontrada" });
        }

        const updatedOferta = await prisma.offer.update({
          where: { id: offer.id },
          data: {
            image,
            brands: {
              updateMany: await Promise.all(
                brands.map(async (brand) => {
                  // Buscar la marca por nombre para obtener su ID
                  const existingBrand = await prisma.brand.findFirst({
                    where: { name: brand.name },
                  });

                  if (!existingBrand) {
                    throw new Error(`Marca no encontrada: ${brand.name}`);
                  }

                  return {
                    where: {
                      brandId: existingBrand.id, // Usar el ID de la marca
                      offerId: offer.id,
                    },
                    data: { discount: brand.discount },
                  };
                })
              ),
            },
            categories: {
              updateMany: await Promise.all(
                categories.map(async (category) => {
                  // Buscar la marca por nombre para obtener su ID
                  const existingCategory = await prisma.category.findFirst({
                    where: { name: category.name },
                  });

                  if (!existingCategory) {
                    throw new Error(`Marca no encontrada: ${category.name}`);
                  }

                  return {
                    where: {
                      categoryId: existingCategory.id,
                      offerId: offer.id,
                    },
                    data: { discount: category.discount },
                  };
                })
              ),
            },
          },
        });
        const response = await updateProductsOffer({
          items: [...categories, ...brands],
        });
        if (response.success) {
          return res.status(200).json({
            updatedOferta,
            message: "Oferta actualizada correctamente",
          });
        } else {
          return res.status(400).json({
            updatedOferta,
            message: "Algo salió mal. Por favor, inténtelo de nuevo.",
          });
        }
      } catch (error) {
        res.status(500).json(error);
      }
      break;
    case "DELETE":
      try {
        const { id } = req.query;
        const offer = await prisma.offer.findUnique({
          where: { id: parseInt(id as string) },
          include: {
            categories: { include: { category: true } },
            brands: { include: { brand: true } },
          },
        });
        if (!offer) {
          return res.status(404).json({ mesage: "Oferta no encontrada" });
        }
        const categoriesData = offer.categories;
        const brandsData = offer.brands;
        const categories = categoriesData.map((item) => {
          return {
            name: item.category.name,
            discount: item.discount,
          };
        });
        const brands = brandsData.map((item) => {
          return {
            name: item.brand.name,
            discount: item.discount,
          };
        });
        const deleteOffer = await prisma.offer.delete({
          where: { id: offer.id },
        });
        await desactivateOfferProductsByCategory({
          categories,
        });
        await desactivateOfferProductsByBrand({
          brands,
        });
        return res.status(200).json({
          message: `Oferta número ${deleteOffer.id} eliminada correctamente`,
        });
      } catch (error) {
        res.status(500).json({ error });
      }
      break;
    default:
      res.status(405).json({ message: `HTTP METHOD ${method} NOT SUPPORTED` });
      break;
  }
}
