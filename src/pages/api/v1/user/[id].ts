import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prismadb";
import { compare, hash } from "bcryptjs";

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
          where: { id: id as string },
        });
        if (!user) return res.status(404).json({ message: "user not found" });
        res.status(200).json(user);
      } catch (error) {
        res.status(500).json(error);
      }
      break;




    case "PUT":
      try {
        const { id, passwordChange } = req.query;
        const findUser = await prisma.user.findUnique({
          where: { id: id as string },
        });
        if (!findUser)
          return res.status(404).json({ message: "user not found" });


        if (passwordChange) {
          const {
            password,
            newPassword
          }: {
            password: string;
            newPassword:string
          } = req.body;
          
          const verifyPassword = await compare(
            password ?? "",
            findUser.password ?? ""
          );

          if (!verifyPassword) {
            return res.status(401).json({
              message:
                "La contraseña es incorrecta. Para cambiarla es necesario ingresar la contraseña actual.",
            });
          }
          const passwordhash = await  hash(newPassword, 5);

          const userUpdate = await prisma.user.update({
            where: {
              id: findUser.id,
            },
            data: {
              password: passwordhash,
            },
          });
          return res
            .status(200)
            .json({ messag: "Contraseña Cambiada correctamente!", userUpdate });
        }




        const {
          name,
          email,
          image,
        }: {
          name: string;
          email: string;
          image: string;
        } = req.body;

        const user = await prisma.user.update({
          where: {
            id: findUser.id,
          },
          data: {
            name,
            email,
            image,
          },
        });

        res.status(200).json(user);
      } catch (error) {
        res.status(500).json(error);
      }
      break;
    default:
      res.status(405).json({ message: `HTTP METHOD ${method} NOT SUPPORTED` });
      break;
  }
}
