import prisma from "@/lib/prismadb";
import { resetPassword } from "@/shared/emails/resetPassword";
import { hash } from "bcryptjs";
import { randomBytes } from "crypto";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  switch (method) {
    case "POST":
      try {
        const { email } = req.body;
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
          return res
            .status(400)
            .json({ message: "El correo electrónico no está registrado." });
        }
        const token = randomBytes(32).toString("hex");
        const timestamp = new Date();
        await prisma.passwordResetToken.create({
          data: {
            token,
            timestamp,
            userId: user.id,
          },
        });
        const mail = await resetPassword(email, token);
        if (mail.success) {
          res.status(200).json({
            message:
              "Se ha generado con éxito el token para restablecer la contraseña.",
          });
        } else {
          res.status(400).json({
            message: "Se ha producido un error inesperado.",
          });
        }
      } catch (error) {
        res.status(500).json({ error });
      }
      break;
    default:
      res.status(405).json({ message: `HTTP METHOD ${method} NOT SUPPORTED` });
      break;
  }
}
