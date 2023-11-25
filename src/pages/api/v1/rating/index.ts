// api/rating/index.ts
import prisma from "@/lib/prismadb";
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { productCode } = req.query;

    try {
      const product = await prisma.product.findUnique({
        where: {
          code: productCode as string,
        },
        include: {
          reviews: true,
        },
      });

      if (product) {
        const totalRatings = product.reviews.length;
        const averageRating =
          totalRatings > 0
            ? product.reviews.reduce((sum, review) => sum + review.rating, 0) / totalRatings
            : 0;

        res.status(200).json({ averageRating, totalRatings });
      } else {
        res.status(404).json({ error: 'Product not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
