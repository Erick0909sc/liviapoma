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
  const { method, query } = req;
  const { code } = query;

  switch (method) {
    case "GET":
      try {
        const reviews = await prisma.review.findMany({
          where: { productCode: code as string },
          include: {
            user: true // Esto incluirá los datos del usuario asociado a cada revisión
          }
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

    case "POST":
      try {
        const productCode = code as string;
        const { userId, description, rating } = req.body;

        const newReview = await prisma.review.create({
          data: {
            productCode,
            userId,
            description,
            rating,
          },
          include: {
            user: true // Esto asegura que el usuario asociado a la revisión sea incluido en la respuesta
          }
        });

        res.status(201).json(newReview);
      } catch (error) {
        res.status(500).json(error);
      }
      break;

    default:
      res.status(405).json({ message: `HTTP METHOD ${method} NOT SUPPORTED` });
      break;
  }
}

 //prueba 2



//  import { NextApiRequest, NextApiResponse } from "next";
// import prisma from "@/lib/prismadb";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   const { method, query } = req;
//   const { code } = query;

//   switch (method) {
//     case "GET":
//       try {
//         // ... código para obtener reseñas ...
//       } catch (error) {
//         res.status(500).json(error);
//       }
//       break;

//     case "POST":
//       try {
//         const { userId, description, rating } = req.body;

//         if (!userId) {
//           return res.status(400).json({ message: "El campo userId es obligatorio" });
//         }

//         // Crea el comentario con el userId proporcionado
//         const newReview = await prisma.review.create({
//           data: {
//             productCode: code as string,
//             userId,
//             description,
//             rating,
//           }
//         });

//         res.status(201).json(newReview);
//       } catch (error) {
//         res.status(500).json(error);
//       }
//       break;

//     default:
//       res.status(405).json({ message: `HTTP METHOD ${method} NOT SUPPORTED` });
//       break;
//   }
// }



