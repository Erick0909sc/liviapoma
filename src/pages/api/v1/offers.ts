import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prismadb";
import { formatDate } from "@/shared/ultis";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  switch (method) {
    case "GET":
      try {
        const now = formatDate(new Date());
        const offers = await prisma.offer.findMany({
          where: {
            endDate: {
              gt: now,
            },
          },
        });
        res.status(200).json(offers);
      } catch (error) {
        res.status(500).json(error);
      }
      break;
    default:
      res.status(500).json({ message: `HTTP METHOD ${method} NOT SUPPORTED` });
      break;
  }
}
