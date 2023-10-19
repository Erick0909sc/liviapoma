import prisma from "@/lib/prismadb";
import type { NextApiRequest, NextApiResponse } from "next";
import { hash } from "bcryptjs";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  switch (method) {
    case "POST":
      try {
        const { token, password }: { token: string; password: string } =
          req.body;
        const resetToken = await prisma.passwordResetToken.findUnique({
          where: { token },
          include: { user: true },
        });

        if (!resetToken || !resetToken.user) {
          return res
            .status(400)
            .json({
              message:
                "El token de restablecimiento de contraseña es inválido o ya ha sido utilizado.",
            });
        }

        const currentTimestamp = new Date();
        const tokenTimestamp = resetToken.timestamp;
        const tokenExpiration = 24 * 60 * 60 * 1000; // 24 horas en milisegundos

        if (
          currentTimestamp.getTime() - tokenTimestamp.getTime() >
          tokenExpiration
        ) {
          return res
            .status(400)
            .json({
              message:
                "El token de restablecimiento de contraseña ha expirado. Por favor, solicita un nuevo token.",
            });
        }

        const passwordhash = await hash(password, 5);
        await prisma.user.update({
          where: { id: resetToken.user.id },
          data: {
            ...resetToken.user,
            password: passwordhash,
          },
        });
        await prisma.passwordResetToken.delete({
          where: { token },
        });
        res.status(200).json({
          message: `Contraseña cambiada para el usuario ${resetToken.user.name}`,
        });
      } catch (error) {
        res.status(500).json({ error });
      }
      break;
    default:
      res.status(405).json({ message: `HTTP METHOD ${method} NOT SUPPORTED` });
      break;
  }
}
