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
        const brands = await prisma.brand.findMany();
        brands.length
          ? res.status(200).json(brands)
          : res.status(400).json({ message: "brands not found" });
      } catch (error) {
        res.status(500).json(error);
      }
      break;
    default:
      res.status(500).json({ message: "HTTP METHOD NOT SUPPORTED" });
      break;
  }
}
