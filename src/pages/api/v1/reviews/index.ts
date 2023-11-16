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
        const {
          productCode,
          userId,
          description,
          rating,
        }: {
          productCode: string;
          userId: string;
          description: string;
          rating: number;
        } = req.body;
        const order = await prisma.order.findFirst({
          where: {
            userId: userId,
            productsStatus: "ENTREGADO",
            orderStatus: "PAID",
          },
          include: {
            products: {
              include: {
                product: true,
              },
            },
            user: true,
          },
        });

        if (!order) {
          return res.status(400).json({
            message:
              "Antes de dejar una reseña, asegúrate de haber realizado una compra del producto.",
          });
        }

        const productInOrder = order.products.find(
          (orderItem) => orderItem.productCode === productCode
        );

        if (!productInOrder) {
          return res.status(400).json({
            message:
              "Antes de dejar una reseña, asegúrate de haber realizado una compra del producto.",
          });
        }
        const review = await prisma.review.create({
          data: {
            productCode,
            userId,
            description,
            rating,
          },
        });
        let newRating = 0;
        const product = await prisma.product.findUnique({
          where: { code: productCode },
          include: { reviews: true },
        });
        if (!product) return;
        const numReviews = product.reviews.length;
        if (numReviews > 0) {
          const totalRating = product.reviews.reduce(
            (sum, review) => sum + review.rating,
            0
          );
          newRating = totalRating / numReviews;
        }
        // Update the corresponding product record with the new review and rating
        const updatedProduct = await prisma.product.update({
          where: { code: productCode },
          data: {
            rating: parseFloat(newRating.toFixed(1)),
          },
          include: { reviews: true },
        });

        res.status(201).json({ review, updatedProduct });
      } catch (error) {
        res.status(500).json(error);
      }
      break;
    case "PUT":
      try {
        const {
          userId,
          productCode,
          id,
          description,
          rating,
        }: {
          userId: string;
          productCode: string;
          id: number;
          description: string;
          rating: number;
        } = req.body;
        const editReview = await prisma.review.update({
          where: { id },
          data: {
            productCode,
            userId,
            description,
            rating,
          },
        });
        let newRating = 0;
        const product = await prisma.product.findUnique({
          where: { code: productCode },
          include: { reviews: true },
        });
        if (!product) return;
        const numReviews = product.reviews.length;
        if (numReviews > 0) {
          const totalRating = product.reviews.reduce(
            (sum, review) => sum + review.rating,
            0
          );
          newRating = totalRating / numReviews;
        }
        // Update the corresponding product record with the new review and rating
        const updatedProduct = await prisma.product.update({
          where: { code: productCode },
          data: {
            rating: parseFloat(newRating.toFixed(1)),
          },
          include: { reviews: true },
        });

        res.status(200).json({ editReview, updatedProduct });
      } catch (error) {
        res.status(500).json(error);
      }
      break;
    case "DELETE":
      try {
        const { id } = req.query;
        const deleteReview = await prisma.review.delete({
          where: {
            id: parseInt(id as string),
          },
        });
        let newRating = 0;
        const product = await prisma.product.findUnique({
          where: { code: deleteReview.productCode },
          include: { reviews: true },
        });
        if (!product) return;
        const numReviews = product.reviews.length;
        if (numReviews > 0) {
          const totalRating = product.reviews.reduce(
            (sum, review) => sum + review.rating,
            0
          );
          newRating = totalRating / numReviews;
        }
        // Update the corresponding product record with the new review and rating
        const updatedProduct = await prisma.product.update({
          where: { code: deleteReview.productCode },
          data: {
            rating: parseFloat(newRating.toFixed(1)),
          },
          include: { reviews: true },
        });

        res.status(200).json({ deleteReview, updatedProduct });
      } catch (error) {
        res.status(500).json(error);
      }
      break;
    default:
      res.status(405).json({ message: `HTTP METHOD ${method} NOT SUPPORTED` });
      break;
  }
}
