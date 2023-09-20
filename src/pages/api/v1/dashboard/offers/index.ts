import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prismadb";
import cron from "node-cron";
import {
  desactivateOfferProductsByCategory,
  offerProductsByCategory,
  offerValidation,
} from "@/controllers/offerController";
import { formatFechaISO, peruDateTimeFormat } from "@/shared/ultis";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  switch (method) {
    case "GET":
      try {
        const currentDate = new Date();
        const offers = await prisma.offer.findMany({
          where: {
            endDate: {
              gt: currentDate,
            },
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
        const now = new Date();
        const startDateObj = new Date(startDate);
        const endDateObj = new Date(endDate);
        console.log(now);
        console.log(startDateObj);
        console.log(endDateObj);
        console.log(formatFechaISO(now));
        console.log(formatFechaISO(startDateObj));
        console.log(formatFechaISO(endDateObj));
        if (startDateObj < now || endDateObj <= startDateObj) {
          return res.status(400).json({
            message:
              "La fecha de inicio debe ser anterior a la fecha de fin y ambas deben ser posteriores a la fecha y hora actual.",
          });
        }
        if (categories.length) {
          const result = await offerValidation({
            startDate,
            endDate,
            categories,
            brands,
          });
          if (result.success) {
            res.status(201).json({ message: result.message });
          } else {
            return res.status(400).json({ message: result.error });
          }
          cron.schedule(peruDateTimeFormat(startDate), async () => {
            await offerProductsByCategory({
              startDate,
              endDate,
              image,
              categories,
            });
          });
          cron.schedule(peruDateTimeFormat(endDate), async () => {
            await desactivateOfferProductsByCategory({
              categories,
            });
          });
          break;
        }
        if (brands.length) {
          return res
            .status(503)
            .json({ message: "La ruta está en proceso de desarrollo." });
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
