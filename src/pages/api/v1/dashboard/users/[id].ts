import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prismadb";
import { Role } from "@prisma/client";
import { getSession } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  switch (method) {
    case "GET":
      try {
        const { id } = req.query;
        const user = await prisma.user.findUnique({
          where: {
            id: id as string,
          },
          include: { cart: { include: { products: true } } },
        });
        user
          ? res.status(200).json(user)
          : res.status(404).json({ message: "user not found" });
      } catch (error) {
        res.status(500).json(error);
      }
      break;
    case "PATCH":
      const session = await getSession({ req });
      if (!session) {
        return res.status(403).json({
          message:
            "La sesión ha expirado o no está autorizado para acceder a esta página.",
        });
      }
      try {
        const { id, role } = req.query;
        if (session.user.role !== Role.Admin) {
          return res.status(403).json({
            message: `No tienes permiso para asignar el rol de ${role}. Tu rol actual es ${session.user.role}.`,
          });
        }
        if (session.user.id === id) {
          return res.status(403).json({
            message: "No puedes realizar cambios en tu propio usuario.",
          });
        }
        const user = await prisma.user.update({
          where: {
            id: id as string,
          },
          data: { role: role as Role },
        });
        user
          ? res.status(200).json({ message: "Rol asignado con éxito", user })
          : res.status(404).json({ message: "Usuario no encontrado" });
      } catch (error) {
        res.status(500).json(error);
      }
      break;
    case "DELETE":
      try {
        const { id } = req.query;
        const user = await prisma.user.delete({
          where: {
            id: id as string,
          },
        });
        user
          ? res.status(200).json(user)
          : res.status(404).json({ message: "user not found" });
      } catch (error) {
        res.status(500).json(error);
      }
      break;
    default:
      res.status(405).json({ message: `HTTP METHOD ${method} NOT SUPPORTED` });
      break;
  }
}
