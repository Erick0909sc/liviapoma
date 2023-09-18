import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  switch (method) {
    case "POST":
      try {
        //   {
        //     "startDate": "2023-09-18T13:58",
        //     "endDate": "2023-09-19T13:58",
        //     "discount": 50,
        //     "image": null,
        //     "category": [],
        //     "brand": [
        //         "SIDERPERU",
        //         "ETERNIT",
        //         "FIBRAFORTE"
        //     ]
        // }
        const { startDate, endDate, discount, image, category, brand } =
          req.body;

        if (category.length && brand.length) {
          return res
            .status(503)
            .json({ message: "La ruta está en proceso de desarrollo." });
        }
        // if (category.length) {
        //   const offert = await prisma.offert.create({
        //     data: {
        //       startDate,
        //       endDate,
        //       discount,
        //       image,
        //       category,
        //     },
        //   });
        //   return res.status(201).json(offert);
        // }
        // if (brand.length) {
        //   const offert = await prisma.offert.create({
        //     data: {
        //       startDate,
        //       endDate,
        //       discount,
        //       image,
        //       brand,
        //     },
        //   });
        //   return res.status(201).json(offert);
        // }
        res
          .status(200)
          .json({ message: `HTTP METHOD ${method} NOT SUPPORTED` });
      } catch (error) {
        res.status(500).json(error);
      }
      break;
    default:
      res.status(500).json({ message: `HTTP METHOD ${method} NOT SUPPORTED` });
      break;
  }
}
