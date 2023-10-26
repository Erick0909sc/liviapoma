import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  switch (method) {
    case "GET":
      try {
        const reviews = await prisma.review.findMany();
        reviews.length > 0
          ? res.status(200).json(reviews)
          : res.status(404).json({ message: "no hay review" });
      } catch (error) {
        res.status(500).json(error);
      }
      break;
    case "POST":
      try {
        const reviews = await prisma.review.findMany();
        res.status(200).json(reviews);
      } catch (error) {
        res.status(500).json(error);
      }
      break;
    default:
      res.status(405).json({ message: `HTTP METHOD ${method} NOT SUPPORTED` });
      break;
  }
}
