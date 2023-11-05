// import type { NextApiRequest, NextApiResponse } from "next";
// import prisma from "@/lib/prismadb";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   const { method } = req;
//   switch (method) {
//     case "GET":
//       try {
//         const { code } = req.query;
//         const reviews = await prisma.review.findMany({
//           where: { productCode: code as string },
//         });
//         reviews.length > 0
//           ? res.status(200).json(reviews)
//           : res.status(404).json({
//               message: "Este producto aún no ha recibido reseñas",
//             });
//       } catch (error) {
//         res.status(500).json(error);
//       }
//       break;
//     case "PUT":
//       try {
//         const reviews = await prisma.review.findMany();
//         res.status(200).json(reviews);
//       } catch (error) {
//         res.status(500).json(error);
//       }
//       break;
//     default:
//       res.status(405).json({ message: `HTTP METHOD ${method} NOT SUPPORTED` });
//       break;
//   }
// }

// pruebas 1
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  const { code } = req.query;
  switch (method) {
    case "GET":
      try {
        const reviews = await prisma.review.findMany({
          where: { productCode: code as string },
          include: {
            user: true, // Esto incluirá los datos del usuario asociado a cada revisión
          },
        });
        reviews.length > 0
          ? res.status(200).json(reviews)
          : res.status(404).json({
              message: "Este producto aún no ha recibido reseñas",
            });
      } catch (error) {
        res.status(500).json(error);
      }
      break;
    default:
      res.status(405).json({ message: `HTTP METHOD ${method} NOT SUPPORTED` });
      break;
  }
}
