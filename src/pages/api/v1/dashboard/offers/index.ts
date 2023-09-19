import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prismadb";
type Category = {
  name: string;
  discount: number;
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  switch (method) {
    case "POST":
      try {
        // {
        //   startDate: '2023-09-19T10:55',
        //   endDate: '2023-09-21T10:55',
        //   discount: '',
        //   image: "https://image.npg",
        //   category: [
        //     { name: 'Varillas', discount: 10 },
        //     { name: 'Cementos', discount: 15 },
        //     { name: 'Alambres', discount: 25 },
        //     { name: 'Eternits', discount: 30 },
        //     { name: 'Cumbreras', discount: 50 }
        //   ],
        //   brand: []
        // }
        const { startDate, endDate, image, category, brand } = req.body;
        console.log(startDate, endDate, image, category, brand);

        const startDateTime = new Date(startDate);
        const endDateTime = new Date(endDate);
        console.log(startDateTime, endDateTime);

        // if (category.length) {
        //   const newOffer = await prisma.offer.create({
        //     data: {
        //       startDate,
        //       endDate,
        //       image: image || "imagen_oferta.jpg",
        //       categories: {
        //         create: category.map((cat: Category) => ({
        //           name: cat.name,
        //           discount: cat.discount,
        //         })),
        //       },
        //       brand,
        //     },
        //   });

        //   return res.status(201).json(newOffer);
        // }
        if (category.length && brand.length) {
          return res
            .status(503)
            .json({ message: "La ruta está en proceso de desarrollo." });
        }
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
