import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prismadb";
import {
  desactivateOfferProductsByBrand,
  desactivateOfferProductsByCategory,
  offerProductsByBrand,
  offerProductsByCategory,
  offerValidation,
} from "@/controllers/offerController";
import {
  executeAfterDate,
  formatDate,
  formatDateOfInputDate,
} from "@/shared/ultis";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  switch (method) {
    case "GET":
      try {
        const { disabled } = req.query;
        const now = formatDate(new Date());
        if (disabled) {
          const offers = await prisma.offer.findMany({
            where: {
              startDate: {
                lt: now,
              },
              endDate: {
                lt: now,
              },
            },
            include: {
              brands: { include: { brand: true } },
              categories: { include: { category: true } },
            },
          });
          return res.status(200).json(offers);
        }
        const offers = await prisma.offer.findMany({
          where: {
            endDate: {
              gt: now,
            },
          },
          include: {
            brands: { include: { brand: true } },
            categories: { include: { category: true } },
          },
        });
        res.status(200).json(offers);
      } catch (error) {
        res.status(500).json(error);
      }
      break;
    case "POST":
      try {
        const { startDate, endDate, image, categories, brands } = req.body;
        const nowInPeru = formatDate(new Date());
        const startDateFormat = formatDateOfInputDate(new Date(startDate));
        const endDateFormat = formatDateOfInputDate(new Date(endDate));
        if (startDateFormat < nowInPeru || endDateFormat <= startDateFormat) {
          return res.status(400).json({
            message:
              "La fecha de inicio debe ser anterior a la fecha de fin y ambas deben ser posteriores a la fecha y hora actual.",
          });
        }
        if (categories.length) {
          executeAfterDate(startDate, async () => {
            await offerProductsByCategory({
              startDate,
              endDate,
              image,
              categories,
            });
          });
          executeAfterDate(endDate, async () => {
            await desactivateOfferProductsByCategory({
              categories,
            });
          });
          return res.status(200);
        }
        if (brands.length) {
          executeAfterDate(startDate, async () => {
            await offerProductsByBrand({
              startDate,
              endDate,
              image,
              brands,
            });
          });
          executeAfterDate(endDate, async () => {
            await desactivateOfferProductsByBrand({
              brands,
            });
          });
          return res.status(200);
        }
        if (categories.length && brands.length) {
          return res
            .status(503)
            .json({ message: "La ruta está en proceso de desarrollo." });
        }
      } catch (error) {
        res.status(500).json(error);
      }
      break;
    case "PATCH":
      try {
        const { categories } = req.body;
        const result = await desactivateOfferProductsByCategory({
          categories,
        });
        if (result.success) {
          return res.status(201).json({ message: result.message });
        } else {
          return res.status(400).json({ message: result.error });
        }
      } catch (error) {
        res.status(500).json(error);
      }
      break;
    default:
      res.status(500).json({ message: `HTTP METHOD ${method} NOT SUPPORTED` });
      break;
  }
}
