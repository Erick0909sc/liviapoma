import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prismadb";
import { offerValidation } from "@/controllers/offerController";
import { formatDate, formatDateOfInputDate } from "@/shared/ultis";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  switch (method) {
    case "POST":
      try {
        const { startDate, endDate, categories, brands } = req.body;
        const nowInPeru = formatDate(new Date());
        const startDateFormat = formatDateOfInputDate(new Date(startDate));
        const endDateFormat = formatDateOfInputDate(new Date(endDate));
        if (startDateFormat < nowInPeru || endDateFormat <= startDateFormat) {
          return res.status(400).json({
            message:
              "La fecha de inicio debe ser anterior a la fecha de fin y ambas deben ser posteriores a la fecha y hora actual.",
          });
        }
        const result = await offerValidation({
          startDate,
          endDate,
          categories,
          brands,
        });
        if (result.success) {
          return res.status(200).json({
            message: `validacion correcta, ${result.message}`,
          });
        } else {
          return res.status(400).json({ message: result.error });
        }
      } catch (error) {
        res.status(500).json(error);
      }
      break;
    default:
      res.status(405).json({ message: `HTTP METHOD ${method} NOT SUPPORTED` });
      break;
  }
}
